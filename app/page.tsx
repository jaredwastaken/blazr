import { ActivityForm } from '@/components/home/activity_input';
import { ActivityTable } from '@/components/home/activity_table';
import { LogForm } from '@/components/home/log_activity';
import { LogTable } from '@/components/home/log_table';
import { ProtectedLookup } from '@/components/home/protected_lookup';
import { db } from '@/db/client';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { logs } = searchParams || 0;

  const activities = await db.query.activities.findMany();

  return (
    <main className='flex min-h-screen flex-col px-4 md:px-24 md:py-10'>
      <h1 className='font-semibold text-2xl hover:animate-pulse hover:bg-red-50 hover:cursor-pointer p-2 w-28 rounded-lg'>
        Blazr 🔥
      </h1>

      <div className='w-full flex flex-col md:flex-row gap-10 md:gap-20 my-8'>
        <ActivityTable activities={activities} />
        <LogTable offset={Number(logs)} />
      </div>

      <div className='w-full flex flex-col md:flex-row justify-evenly mt-4 gap-4'>
        <ActivityForm />
        <LogForm activities={activities} />
      </div>

      <div className='w-full flex justify-evenly mt-10'>
        <ProtectedLookup />
      </div>
    </main>
  );
}
