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
import { getRestrictedName } from '@/rsc/activities';
import { useState } from 'react';

export function ProtectedLookup() {
  const [key, setKey] = useState('');
  const [password, setPassword] = useState('');

  async function lookup() {
    setKey('');
    setPassword('');
    const result = await getRestrictedName({
      password,
      key,
    });

    if (!result) {
      alert('Invalid Password or No Record Found');
      return;
    }

    alert(`Protected Title: ${result.name}`);
  }

  return (
    <Card className='w-[500px]'>
      <CardHeader>
        <CardTitle>Protected Lookup</CardTitle>
        <CardDescription>Lookup a protected key</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Activity Key</Label>
            <Input
              id='key'
              placeholder='Key associated with protected value'
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='Root password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={lookup}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
