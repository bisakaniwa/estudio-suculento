'use client'

import { AppShellHeader, Title } from "@mantine/core"
import { SwitchTheme } from "./SwitchTheme"

export const Header = () => {
  return (
    <AppShellHeader className="flex flex-row w-full items-center px-4">
      <Title order={3} className="flex grow justify-center">
        Estúdio Suculento
      </Title>

      <SwitchTheme />
    </AppShellHeader>
  )
}
