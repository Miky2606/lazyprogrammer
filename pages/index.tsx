import { NextApiRequest } from "next";
import { HomeView } from "../components/home/home";
import { verifyToken } from "../controller/jwt_token";

export default function Home({ token_get }: { token_get: any }): JSX.Element {
  return (
    <>
      <HomeView />
    </>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token = req.cookies || undefined;

  if (token.token !== undefined)
    return {
      props: { token_get: token.token },
    };

  return {
    props: {},
  };
}
