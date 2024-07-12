import { Login } from "@/components/login";
import React from "react";
export default function LoginPage() {
  return (
    <div className="flex">
      <div className="basis-1/2 bg-red-600"></div>
      <div className="basis-1/2">
        <Login></Login>
      </div>
    </div>
  );
}
