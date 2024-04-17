'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

function LogPagination({ count }: { count: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const getOffset = (direction: 'next' | 'previous') => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOffset = Number(params.get('logs') || 0);
    if (direction == 'next') {
      if (currentOffset + 5 > count && count % 5 !== 0) {
        return JSON.stringify(count - 5);
      } else if (currentOffset + 5 < count) {
        return JSON.stringify(currentOffset + 5);
      }
      return JSON.stringify(currentOffset);
    } else {
      if (currentOffset == 0 || currentOffset - 5 < 0) return '0';
      return JSON.stringify(currentOffset - 5);
    }
  };

  // const getCurrentPage = () => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   const currentOffset = Number(params.get('logs') || 0);
  //   return (currentOffset + 5) / 5;
  // };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          onClick={() =>
            router.push(
              pathname + '?' + createQueryString('logs', getOffset('previous'))
            )
          }
        >
          <PaginationPrevious />
        </PaginationItem>

        {/* <PaginationItem className='text-sm'>{getCurrentPage()}</PaginationItem> */}

        <PaginationItem
          onClick={() =>
            router.push(
              pathname + '?' + createQueryString('logs', getOffset('next'))
            )
          }
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default LogPagination;
