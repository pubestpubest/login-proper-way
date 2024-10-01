"use client";
import { useUser } from "./layout";

export default function dashboard() {
  const user = useUser();
  if (!user) return null;
  const { username, role } = user;
  return (
    <div>
      <h1>Dashboard</h1>
      {user ? `Welcome, ${username}, ${role}!` : "Loading user..."}
    </div>
  );
}
