import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core"
import { IconBrightnessUpFilled, IconMoonFilled } from "@tabler/icons-react"

export const SwitchTheme = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  const isDark = computedColorScheme === "dark";

  return (
    <ActionIcon
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
      variant="light"
      size="lg"
      radius="xl"
      aria-label="Alternar tema"
      className="rounded-full transition-all dark:bg-gray-800 dark:text-yellow-400 dark:border-gray-700 bg-white text-blue-600 border-gray-200 shadow-sm hover:scale-105"
    >
      {isDark ? (
        <IconBrightnessUpFilled />
      ) : (
        <IconMoonFilled />
      )}
    </ActionIcon>
  )
}
