import { Register } from '@/components/component/register'
import React from 'react'
export default function RegisterPage() {
  return (
    <div className='flex'>
        <div className='w-1/2 bg-foreground hidden md:block'>
        </div>
        <div className='w-full md:w-1/2'>
            <Register></Register>
        </div>
    </div>
  )
}
