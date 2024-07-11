"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validations/registerSchema';

interface User {
  username: string;
  email: string;
  password: string;
}

interface ComponentProps {
  user: User;
  setUser: (user: User) => void;
}

export default function Component({ user, setUser }: ComponentProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<User>({
    resolver: zodResolver (registerSchema)
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    setUser(data);
    setIsEditModalOpen(false);
  };

  const handleEditClick = () => {
    reset(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button onClick={handleEditClick}>Edit Profile</Button>
        </div>
      </main>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information and settings.</DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register('username')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="text" {...register('password')} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
