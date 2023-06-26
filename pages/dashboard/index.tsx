import verifyToken from "@/utils/verifyToken";
import { Box } from "@mantine/core";

export default function Dashboard() {
  return <Box>home page</Box>;
}

export async function getServerSideProps(context: any) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const { email } = await verifyToken(token, secretKey!);
  if (!email) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  } else {
    return {
      props: {
        email,
      },
    };
  }
}
