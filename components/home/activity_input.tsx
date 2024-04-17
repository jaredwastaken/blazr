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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { insert } from '@/rsc/activities';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export function ActivityForm() {
  const [value, setValue] = useState('');
  const [isProtected, setProtected] = useState(false);

  async function submitActivity() {
    const success = await insert(value, isProtected);
    if (!success) throw Error('Unable to add activity');
    setValue('');
  }

  return (
    <Card className='w-full md:w-[500px]'>
      <CardHeader>
        <CardTitle>Add a new activity</CardTitle>
        <CardDescription>Recurring activity for logs.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                placeholder='Name of your activity'
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />

              <div className='flex items-center space-x-2 pt-4'>
                <Switch
                  onCheckedChange={(isChecked) =>
                    setProtected(isChecked as boolean)
                  }
                  id='airplane-mode'
                />
                <Label htmlFor='airplane-mode'>Protected</Label>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={submitActivity}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
