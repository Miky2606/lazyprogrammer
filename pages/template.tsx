import { GetServerSidePropsContext } from "next";
import { useState, useEffect, useReducer } from "react";
import { CustomText } from "../components/custom_text";
import { InputSearch } from "../components/inputs/inputs";
import { Loading } from "../components/loading_error";
import { ITemplate } from "../interface/interface";
import { ResponseServer } from "../interface/api_interface";
import { getAllTemplates } from "../util/template_util";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicError = dynamic(() =>
  import("../components/loading_error").then((get) => get.ErrorView)
);

export default function Template(
  props: ResponseServer<ITemplate[]>
): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(props?.loading ?? false);
  }, []);

  if (loading) return <Loading />;
  if (props?.error !== undefined)
    return (
      <DynamicError error={props.error} text="We are waiting for templates" />
    );

  return (
    <div className="flex flex-col gap-3 items-center text-center w-1/2  lg:w-3/5">
      <Head>
        <title>Templates | LazyTemplates</title>
        <meta name="description" content="Template   by Lazytemps" />
        <meta property="og:title" content="Templates | LazyTemps" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="Template   by Lazytemps" />
      </Head>
      <CustomText text={"Templates"} />
      <InputSearch template={props?.user_data as ITemplate[]} />
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: ResponseServer<ITemplate[]> }> {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const resp = await getAllTemplates<ITemplate[]>();

  if (resp.error !== undefined)
    return {
      props: {
        loading: false,
        error: resp.error,
      },
    };

  return {
    props: {
      loading: false,
      user_data: resp.data,
    },
  };
}
