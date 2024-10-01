"use client";
import axios, { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInterafce {
  user: {
    username: string;
    role: string;
  } | null;
  error: AxiosError | null;
}

const UserContext = createContext<UserInterafce["user"]>(null);
export const useUser = () => useContext(UserContext);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserInterafce["user"]>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error) {
        router.push("/");
        return;
      }
      setUserData(user);
      setIsLoading(false);
    })();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <UserContext.Provider value={userData}>
      <main>{children}</main>
    </UserContext.Provider>
  );
}

async function getUser(): Promise<UserInterafce> {
  try {
    const { data } = await axios.get("/api/me");
    return { user: data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { user: null, error: error };
  }
}
