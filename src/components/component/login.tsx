"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/loginSchema";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from '@/api/calls';
import { useEffect} from "react";

type loginData = {
  username: string;
  password: string;
};

export function Login() {
  const { register, handleSubmit} = useForm<loginData>({
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  },[]);

  const onSubmit: SubmitHandler<loginData> = async (data: any) => {
    try{
      const datas = await login(data)

      if(localStorage.getItem("token")){
        toast.success("Login successful")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)

      }
      else{
        toast.error("Incorrect username or password")
      }
    }
    catch(err){
      toast.error("Internal server error, try again later")
    }
  };

  const onError = (err: any) => {
    console.log(err)
    toast.error("Invalid credentials, login"+ err)
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login with user</h2>
        <p className="text-center text-muted-foreground">Enter your username and password</p>
        <form onSubmit={handleSubmit(onSubmit,onError)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="Enter your username" {...register("username")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" {...register("password")} />
          </div>
          <div>
          <Button type="submit" className="w-full my-2">Login</Button>
          <Link href={'/register'}>
            <Button type="button" className="w-full ">Register</Button>
          </Link>
          </div>
        </form>
        <p className="text-xs text-center text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
