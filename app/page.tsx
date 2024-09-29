"use client";
import {
  AppShell,
  Burger,
  Fieldset,
  Group,
  Skeleton,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            LOGIN
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          {Array(5)
            .fill("page")
            .map((page, index) => (
              <Skeleton
                key={index}
                h={28}
                mt="sm"
                animate={true}
                visible={true}
              >
                {page}
              </Skeleton>
            ))}
        </AppShell.Navbar>
        <AppShell.Main>
          <Fieldset legend="Login" variant="unstyled" radius="xl">
            <TextInput label="Username" placeholder="Username" />
            <TextInput label="Password" placeholder="Password" mt="md" />
          </Fieldset>
        </AppShell.Main>
      </AppShell>
    </div>
  );
}
