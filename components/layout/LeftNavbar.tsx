import { useGetUser } from "@/hooks/auth/auth.hooks";
import {
  Navbar,
  UnstyledButton,
  Group,
  Text,
  useMantineTheme,
  MediaQuery,
  Divider,
  Center,
  Loader,
  Flex,
  Box,
} from "@mantine/core";
import { useRouter } from "next/router";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BiLock } from "react-icons/bi";
const LeftNavbar = ({ opened }: { opened: boolean }) => {
  const { push, pathname } = useRouter();
  const theme = useMantineTheme();
  const { data, isLoading } = useGetUser({
    refetchOnMount: "always",
  });
  return (
    <Navbar
      p={"md"}
      hiddenBreakpoint="xs"
      hidden={!opened}
      width={{ xs: 250 }}
      style={{
        width: opened ? "250px" : "0",
      }}
    >
      <Navbar.Section grow>
        <UnstyledButton
          onClick={() => push("/")}
          w="100%"
          my="xs"
          sx={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? pathname === "/"
                  ? theme.colors.dark[4]
                  : theme.colors.dark[6]
                : pathname === "/"
                ? theme.colors.gray[4]
                : theme.colors.gray[2],
            padding: "10px",
            borderRadius: "10px",
            transition: "background-color 0.3s ease-in",
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[4],
              transition: "background-color 0.3s ease-in",
            },
          }}
        >
          <Group>
            <AiOutlineDashboard size={22} />
            <Text>Dashboard</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton
          onClick={() => push("/profile")}
          w="100%"
          my="xs"
          sx={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? pathname === "/profile"
                  ? theme.colors.dark[4]
                  : theme.colors.dark[6]
                : pathname === "/profile"
                ? theme.colors.gray[4]
                : theme.colors.gray[2],
            padding: "10px",
            borderRadius: "10px",
            transition: "background-color 0.3s ease-in",
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[4],
              transition: "background-color 0.3s ease-in",
            },
          }}
        >
          <Group>
            <BiUserCircle size={22} />
            <Text>Update Profile</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton
          onClick={() => push("/change-password")}
          w="100%"
          my="xs"
          sx={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? pathname === "/change-password"
                  ? theme.colors.dark[4]
                  : theme.colors.dark[6]
                : pathname === "/change-password"
                ? theme.colors.gray[4]
                : theme.colors.gray[2],
            padding: "10px",
            borderRadius: "10px",
            transition: "background-color 0.3s ease-in",
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[4],
              transition: "background-color 0.3s ease-in",
            },
          }}
        >
          <Group>
            <BiLock size={22} />
            <Text>Change Password</Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
      <Divider display={{ xs: "none" }} />
      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
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
              <BiUserCircle size={22} />
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
            </Flex>
          )}
        </UnstyledButton>
      </MediaQuery>
    </Navbar>
  );
};

export default LeftNavbar;
