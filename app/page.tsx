"use client";
import { Box, Button, Center, Fieldset, TextInput, Title } from "@mantine/core";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("username:" + username + "\npassword:" + password);
    const payload = { username, password };
    try {
      const { data } = await axios.post("/api/login", payload);
      alert(JSON.stringify(data));
      router.push("/dashboard");
    } catch (e) {
      const error = e as AxiosError;
      alert(error.message);
    }
  };

  return (
    <Center w="100%" h="100vh" bg="var(--mantine-color-gray-light)">
      <Box
        w={300}
        mx="auto"
        bg="red.3"
        p={"xl"}
        style={{ "--radius": "0.5rem", borderRadius: "var(--radius)" }}
      >
        <Title order={1} style={{ justifyContent: "center" }} mb="lg">
          Login
        </Title>
        <form onSubmit={handleSubmit}>
          <Fieldset variant="unstyled" radius="xl">
            <TextInput
              required
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              label="Password"
              placeholder="Password"
              mt="md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type={"submit"}
              mt={"lg"}
              fullWidth
              variant="gradient"
              gradient={{ from: "red", to: "grape", deg: 140 }}
            >
              Login
            </Button>
          </Fieldset>
        </form>
      </Box>
    </Center>
  );
}
