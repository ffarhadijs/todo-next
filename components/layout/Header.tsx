import { useGetUser } from "@/hooks/auth/auth.hooks";
import {
  Text,
  MediaQuery,
  Burger,
  ActionIcon,
  Flex,
  Box,
  Header as MantineHeader,
  useMantineTheme,
  ColorScheme,
  Tooltip,
  UnstyledButton,
  Center,
  Loader,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { Sun, MoonStars, Power, UserCircle } from "tabler-icons-react";

const Header = ({
  dark,
  opened,
  setOpened,
  toggleColorScheme,
}: {
  dark: boolean;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  toggleColorScheme: (colorScheme?: ColorScheme | undefined) => void;
}) => {
  const theme = useMantineTheme();
  const { push } = useRouter();
  const [logout, setLogout] = useState(false);
  const { data, isLoading } = useGetUser({
    refetchOnMount: "always",
  });

  const logoutApi = useQuery({
    enabled: logout,
  });

  const logoutHandler = () => {
    setLogout(true);
  };
  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <Flex
        direction={"row"}
        justify={"right"}
        align={"center"}
        h={"100%"}
        w="100%"
      >
        <Box w={{ base: 180, lg: 280 }} mr="auto">
          <MediaQuery largerThan="xs" styles={{ display: "none" }}>
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
          <Text component={Link} href={"/dashboard"} fz={"xl"} fw={700}>
            {" "}
            Task-Next{" "}
          </Text>
          <Flex gap={"md"} align={"center"}>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <Sun size="1.1rem" /> : <MoonStars size="1.1rem" />}
            </ActionIcon>
            <UnstyledButton
              onClick={() => push("/profile")}
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
              {isLoading ? (
                <Center>
                  <Loader />
                </Center>
              ) : (
                <Flex
                  direction={"row"}
                  align={"center"}
                  justify={"space-between"}
                  gap={"xs"}
                >
                  <UserCircle size={"1.8rem"} />
                  <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                    <Box>
                      <Text fw="600" fz="sm">
                        {data?.data?.data?.firstName
                          ? data?.data?.data?.firstName
                          : "User Name"}
                      </Text>
                      <Text
                        fw={600}
                        fz="xs"
                        c={theme.colorScheme === "dark" ? "gray.6" : "gray.7"}
                      >
                        {data?.data?.data.email}
                      </Text>
                    </Box>
                  </MediaQuery>
                </Flex>
              )}
            </UnstyledButton>
            <Tooltip label="Logout">
              <ActionIcon onClick={logoutHandler}>
                <Power />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </MantineHeader>
  );
};

export default Header;
