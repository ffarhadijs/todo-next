import {
  Navbar,
  Divider,
  UnstyledButton,
  Group,
  ActionIcon,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Lock, UserCircle } from "tabler-icons-react";
const LeftNavbar = ({ opened }: { opened: boolean }) => {
  const { push } = useRouter();
  const theme = useMantineTheme();
  return (
    <Navbar
      p={"md"}
      hiddenBreakpoint="xs"
      hidden={!opened}
      width={{ xs: 200, lg: 250 }}
      style={{
        width: opened ? "200px" : "0",
      }}
    >
      <Navbar.Section grow>
        <UnstyledButton
          onClick={() => push("/profile")}
          w="100%"
          my="xs"
          sx={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
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
            <UserCircle />
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
                ? theme.colors.dark[6]
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
            <Lock />
            <Text>Change Password</Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
};

export default LeftNavbar;
