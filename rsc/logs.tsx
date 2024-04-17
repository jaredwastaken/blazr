'use server';

import { db } from '@/db/client';
import { activities, logs } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { sql, like, eq } from 'drizzle-orm';
import { count } from 'drizzle-orm/sql';

export async function insert(activity_id: number) {
  try {
    await db.insert(logs).values({
      date: `${new Date()}`,
      activity_id,
    });
    revalidatePath('/');
    return true;
  } catch (err) {
    // Log this error to Sentry
    console.log(err);
    return false;
  }
}

export async function getDateString() {
  return `${new Date()}`.split(' ').slice(0, 4).join(' ');
}

export async function getTodaysLogs() {
  const today = await getDateString();
  const todaysLogs = await db
    .select({
      name: activities.name,
      count: sql<number>`cast(count(${logs.activity_id}) as int)`,
    })
    .from(logs)
    .innerJoin(activities, eq(logs.activity_id, activities.id))
    .where(like(logs.date, `${today}%`))
    .groupBy(logs.activity_id);
  return todaysLogs;
}

export async function getLogFrequency() {
  return await db
    .select({
      name: activities.name,
      count: sql<number>`cast(count(${logs.activity_id}) as int)`,
    })
    .from(logs)
    .innerJoin(activities, eq(logs.activity_id, activities.id))
    .groupBy(logs.activity_id);
}

export async function getRecentLogs(offset: number) {
  return await db.query.logs.findMany({
    limit: 7,
    offset,
    orderBy: (logs, { desc }) => [desc(logs.date)],
    with: {
      activity: true,
    },
  });
}

export async function getLogCount() {
  return await db.select({ count: count() }).from(logs);
}
