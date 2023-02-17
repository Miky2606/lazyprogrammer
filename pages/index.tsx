import { RequestContext } from "next/dist/server/base-server";
import { HomeView } from "../components/home/home";

export default function Home(): JSX.Element {
  return (
    <>
      <HomeView />
    </>
  );
}

// export async function getServerSideProps(context: RequestContext) {
//   const token = context.req.cookies;
//   console.log(token.token);

//   return {
//     props: { token: token.token }, // will be passed to the page component as props
//   };
// }
