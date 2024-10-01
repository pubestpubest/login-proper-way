"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInterafce {
  user: string | null;
  error: AxiosError | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error) {
        router.push("/");
        return;
      }
      setIsLoading(false);
    })();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <main>{children}</main>;
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
