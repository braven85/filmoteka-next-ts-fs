'use client';

import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center w-full h-full gap-5 py-10'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p className='flex justify-center items-center'>
        <Button variant='filmoteka' size='lg' onClick={() => router.back()} className='mr-2'>
          <MoveLeft className='h-[2rem] w-[2rem]' />
        </Button>
        <span className='text-2xl'>Go back</span>
      </p>
    </div>
  );
}
