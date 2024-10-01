"use client";
import { UseUser } from "./userContext";

export default function dashboard() {
  const user = UseUser();
  if (!user) return null;
  const { username, role } = user;
  return (
    <div>
      <h1>Dashboard</h1>
      {user ? `Welcome, ${username}, ${role}!` : "Loading user..."}
    </div>
  );
}
