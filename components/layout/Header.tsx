import { useGetUser, useSignout } from "@/hooks/auth/auth.hooks";
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
  Group,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { RiTaskLine } from "react-icons/ri";
import { BiSun } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";
import { FiPower } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";

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

  const logoutApi = useSignout({
    enabled: logout,
  });

  const logoutHandler = () => {
    setLogout(true);
  };
  return (
    <MantineHeader height={70} p="md">
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        h={"100%"}
        w="100%"
      >
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </MediaQuery>
        <Group position="left">
          <RiTaskLine size={25} />
          <Text component={Link} href={"/"} fz={"xl"} fw={700}>
            Task-Next
          </Text>
        </Group>
        <Flex gap={"md"} align={"center"}>
          <Tooltip label="Toggle color scheme">
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
            >
              {dark ? <BiSun size="1.1rem" /> : <BsMoonStars size="1.1rem" />}
            </ActionIcon>
          </Tooltip>
          <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
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
                  <BiUserCircle size={"1.8rem"} />
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
          </MediaQuery>

          <Tooltip label="Logout">
            <ActionIcon onClick={logoutHandler}>
              <FiPower size="20px"/>
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Flex>
    </MantineHeader>
  );
};

export default Header;
