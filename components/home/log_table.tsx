import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { InferResultType } from '@/lib/infer-types';
import LogPagination from '../logs/pagination';
import { getLogCount, getRecentLogs } from '@/rsc/logs';

export async function LogTable({ offset }: { offset: number }) {
  const log_records = await getRecentLogs(offset);

  const totalLogs = await getLogCount();

  return (
    <div className='w-full flex flex-col gap-2'>
      <h2 className='flex mb-1 ml-1 font-semibold text-black'>Logs</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[150px]'>Index</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {log_records.map(
            (log: InferResultType<'logs', { activity: true }>) => {
              return (
                <TableRow key={log.id}>
                  <TableCell className='font-medium'>LG0{log.id}</TableCell>
                  <TableCell className='font-medium'>
                    {log.activity?.protected
                      ? log.activity.protected_title
                      : log.activity?.name}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {new Date(log.date as string).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>

      {totalLogs[0].count > 5 && <LogPagination count={totalLogs[0].count} />}
    </div>
  );
}
