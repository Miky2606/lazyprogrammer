import { GetServerSidePropsContext } from "next";
import { useState, useEffect } from "react";
import { CustomText } from "../components/custom_text";
import { InputSearch } from "../components/inputs/inputs";
import { Loading, ErrorView } from "../components/loading_error";
import { ITemplate } from "../components/templates/interface";
import { ResponseServer } from "../interface/api_interface";
import { getAllTemplates } from "../util/template_util";

export default function (props: ResponseServer<ITemplate[]>): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(props?.loading ?? false);
  }, [loading]);

  if (loading) return <Loading />;
  if (props?.error !== undefined) return <ErrorView error={props.error} />;

  return (
    <div className="flex flex-col gap-3 items-center text-center w-1/2  lg:w-3/5">
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
