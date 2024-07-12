"use client";

import React, { useState } from 'react';
import Component from '@/components/component/profile';
/* import { string } from 'zod'; */

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: 'John Doe' ,
    email: 'jhondoe@gmail.com',
    password: '',
  });

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background text-foreground">
    
      <Component user={userData} setUser={setUserData} />
    </div>
  );
};

export default ProfilePage;
