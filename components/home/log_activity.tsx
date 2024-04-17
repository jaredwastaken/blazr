'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Activity } from '@/db/schema';
import { insert } from '@/rsc/logs';
import { useState } from 'react';

export function LogForm({ activities }: { activities: Activity[] }) {
  const [value, setValue] = useState('');

  async function log_activity() {
    if (!value) return false;
    try {
      await insert(Number(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <Card className='w-full md:w-[500px]'>
      <CardHeader>
        <CardTitle>Log an activity</CardTitle>
        <CardDescription>Add a log of a new activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>Activity</Label>
              <Select value={value} onValueChange={(value) => setValue(value)}>
                <SelectTrigger id='framework'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  {activities.map((activity) => {
                    return (
                      <SelectItem
                        key={activity.id}
                        value={JSON.stringify(activity.id)}
                      >
                        {activity.protected
                          ? activity.protected_title
                          : activity.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={log_activity}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
