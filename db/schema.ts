import { relations } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const activities = sqliteTable(
  'activities',
  {
    id: integer('id').primaryKey({
      autoIncrement: true,
    }),
    name: text('name'),
    protected: integer('protected', { mode: 'boolean' }),
    protected_title: text('protected_title'),
  },
  (activities) => ({
    nameIdx: uniqueIndex('nameIdx').on(activities.name),
  })
);

export const activitiesRelations = relations(activities, ({ many }) => ({
  logs: many(logs),
}));

export const logs = sqliteTable('logs', {
  id: integer('id').primaryKey({
    autoIncrement: true,
  }),
  date: text('date'),
  activity_id: integer('activity_id').references(() => activities.id),
});

export const logsRelations = relations(logs, ({ one }) => ({
  activity: one(activities, {
    fields: [logs.activity_id],
    references: [activities.id],
  }),
}));

export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;

export type Log = typeof logs.$inferSelect;
export type NewLog = typeof logs.$inferInsert;
