import { ReactElement } from "react";
import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  Flex,
  Divider,
  Box,
  UnstyledButton,
} from "@mantine/core";
import { Sun, MoonStars, UserCircle, ArrowRight } from "tabler-icons-react";

function Layout({ children }: { children: ReactElement<any, any> }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
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
      navbar={
        <Navbar
          p={"md"}
          hiddenBreakpoint="xs"
          hidden={!opened}
          width={{ xs: 200, lg: 300 }}
          style={{
            width: opened ? "200px" : "0",
          }}
        >
          <Navbar.Section grow>Navbar</Navbar.Section>
          <Divider my="md" />
          <Navbar.Section>
            <UnstyledButton
              w="100%"
              p="sm"
              sx={{
                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              }}
            >
              <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
              >
                <UserCircle size={"1.8rem"} />
                <Box>
                  <Text fw="600" fz="sm">
                    {" "}
                    User Name
                  </Text>
                  <Text
                    fw={600}
                    fz="xs"
                    c={theme.colorScheme === "dark" ? "gray.6" : "gray.7"}
                  >
                    User Email
                  </Text>
                </Box>
                <ArrowRight />
              </Flex>
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Flex
            direction={"row"}
            justify={"right"}
            align={"center"}
            h={"100%"}
            w="100%"
          >
            <Box w={{ base: 180, lg: 280 }} mr="auto">
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                />
              </MediaQuery>
            </Box>
            <Flex
              direction={"row"}
              align={"center"}
              justify={"space-between"}
              style={{ flex: "1" }}
            >
              <Text component="h1" fz={"xl"} fw={700}>
                {" "}
                Todo-Next{" "}
              </Text>
              <ActionIcon
                variant="outline"
                color={dark ? "yellow" : "blue"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? <Sun size="1.1rem" /> : <MoonStars size="1.1rem" />}
              </ActionIcon>
            </Flex>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default Layout;
