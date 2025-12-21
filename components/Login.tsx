import { loginUser, logout } from "@/store/features/auth/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Login() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("1234");

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>Login Example</h1>
      <div className="flex gap-2">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <div>
          <h2>Welcome {user.name}</h2>
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        </div>
      )}
    </div>
  );
}
