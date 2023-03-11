import Head from "next/head";
import { GettingStarted } from "../components/getting_started/gettting_started";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>LazyTemps</title>
        <meta
          name="description"
          content="Templates created for the programmers"
        />
        <meta property="og:title" content="LazyTemps" />
        <meta
          property="og:url"
          content="Templates created for the programmers"
        />
        <meta
          property="og:description"
          content="Templates created for the programmers"
        />
      </Head>
      <GettingStarted />
    </>
  );
}
