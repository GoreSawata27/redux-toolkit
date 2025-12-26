"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/store/features/auth/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("1234");

  const dispatch = useDispatch();
  const { isLoading, user, error } = useSelector((state) => state.auth);

  const handelLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col gap-2 max-w-100">
        <h1 className="mb-10">Login </h1>
        <Label>Email</Label>
        <Input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handelLogin}>Login</Button>
      </div>

      {error && <div>Something went wrong</div>}
    </div>
  );
}
