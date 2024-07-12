import { Register } from "@/components/register";
import React from "react";
export default function RegisterPage() {
  return (
    <div className="flex">
      <div className="basis-1/2 bg-midnight"></div>
      <div className="basis-1/2">
        <Register></Register>
      </div>
    </div>
  );
}
