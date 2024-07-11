"use client";

import React, { useState } from 'react';
import Component from '@/components/component/profile';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: '********',
  });

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background text-foreground">
      <h1>User Profile Page</h1>
      <Component user={userData} setUser={setUserData} />
    </div>
  );
};

export default ProfilePage;
