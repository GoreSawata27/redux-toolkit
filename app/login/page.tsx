"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/features/auth/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("1234");

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      router.push("/dashboard");
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 flex flex-col gap-3">
        <h1>Login</h1>

        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />

        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="text-red-500">{error}</p>}

        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
}
