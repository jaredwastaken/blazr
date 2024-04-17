import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Activity } from '@/db/schema';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { getLogFrequency, getTodaysLogs } from '@/rsc/logs';

export async function ActivityTable({
  activities,
}: {
  activities: Activity[];
}) {
  const log_frequency_total = await getLogFrequency();
  const log_frequency_today = await getTodaysLogs();

  return (
    <div className='w-full flex flex-col gap-2'>
      <h2 className='flex mb-1 ml-1 font-semibold text-black'>Activities</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[150px]'>Index</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Today</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity: Activity) => {
            const frequency = log_frequency_total.find(
              (log) => log.name == activity.name
            );
            const today = log_frequency_today.find(
              (log) => log.name == activity.name
            );
            return (
              <TableRow key={activity.id}>
                <TableCell className='font-medium'>AC0{activity.id}</TableCell>
                <TableCell className='font-medium'>
                  {activity.protected ? (
                    <div className='flex gap-2 items-center'>
                      <span>{activity.protected_title}</span> <LockClosedIcon />
                    </div>
                  ) : (
                    activity.name
                  )}
                </TableCell>
                <TableCell>{frequency ? frequency.count : 0}</TableCell>
                <TableCell>{today ? today.count : 0}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
