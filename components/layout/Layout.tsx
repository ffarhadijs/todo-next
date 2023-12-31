import { ReactElement } from "react";
import { useState } from "react";
import {
  AppShell,
  useMantineTheme,
  ColorScheme,
} from "@mantine/core";
import Header from "./Header";
import LeftNavbar from "./LeftNavbar";

function Layout({
  children,
  colorScheme,
  toggleColorScheme,
}: {
  children: ReactElement<any, any>;
  colorScheme?: ColorScheme;
  toggleColorScheme?: (value?: ColorScheme) => void;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const dark = colorScheme === "dark";

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="xs"
      navbar={<LeftNavbar opened={opened} />}
      header={
        <Header
          opened={opened}
          setOpened={setOpened}
          dark={dark}
          toggleColorScheme={toggleColorScheme!}
        />
      }
    >
      {children}
    </AppShell>
  );
}

export default Layout;
