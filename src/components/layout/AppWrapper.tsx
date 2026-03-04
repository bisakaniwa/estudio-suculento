'use client'

import { AppShell, AppShellMain, AppShellNavbar, Burger } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export const AppWrapper = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 40 }}
    >
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="sm"
      />

      <Header />

      <AppShellMain>
        {children}
      </AppShellMain>
    </AppShell>
  )
}
