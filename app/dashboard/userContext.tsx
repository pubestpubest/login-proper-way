"use client";
import axios, { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInterface {
  user: {
    username: string;
    role: string;
  } | null;
  error: AxiosError | null;
}

const UserContext = createContext<UserInterface["user"]>(null);

export const UseUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserInterface["user"]>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error) {
        // Handle error here, e.g., redirect or show error
        router.push("/");
        return;
      }
      setUserData(user);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

async function getUser(): Promise<UserInterface> {
  try {
    const { data } = await axios.get("/api/me");
    return { user: data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { user: null, error };
  }
}
