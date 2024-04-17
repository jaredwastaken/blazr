'use server';

import { db } from '@/db/client';
import { activities } from '@/db/schema';
import { randomize } from '@/lib/randomize';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { decrypt, encrypt } from './encryption';
import { sanitizeInput } from '@/lib/utils';

export async function insert(name: string, isProtected: boolean) {
  name = sanitizeInput(name);
  try {
    let protected_title;
    if (isProtected) {
      protected_title = randomize(name);
      name = await encrypt(name);
    }

    await db.insert(activities).values({
      name,
      protected: isProtected,
      protected_title: isProtected ? protected_title : null,
    });
    revalidatePath('/');
    return true;
  } catch (err) {
    // Log this error to Sentry
    console.log(err);
    return false;
  }
}

export async function getRestrictedName({
  password,
  key,
}: {
  password: string;
  key: string;
}) {
  if (process.env.PROTECTED_PASS !== password) {
    console.log('Invalid Password');
    return false;
  }

  const index = Number(key.split('AC')[1]);
  try {
    const result = await db
      .select()
      .from(activities)
      .where(eq(activities.id, index));

    if (result.length == 0) {
      return false;
    }

    const record = result[0];

    record.name = await decrypt(record.name as string);

    return record;
  } catch (err) {
    return false;
  }
}
