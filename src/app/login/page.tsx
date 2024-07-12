import { Login } from '@/components/component/login'
import React from 'react'

export default function LoginPage() {
  return (
    <div className='flex'>
        <div className='w-1/2 bg-foreground z-10 hidden md:block'>
        </div>
        <div className='w-full md:w-1/2'>
            <Login ></Login>
        </div>
    </div>
  );
};

