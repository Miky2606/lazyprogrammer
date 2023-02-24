import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IUser } from "../../db/schema/user_schema";
import { getUserInfo } from "../../util/user_util";
import { CustomText } from "../../components/custom_text";
import { InputSearch } from "../../components/inputs/inputs";
import { Section } from "../../components/layout/layout";
import { Loading } from "../../components/loading_error";
import { GetServerSidePropsContext } from "next";

import dynamic from "next/dynamic";
import { Code } from "../../components/code";
import { ResponseServer } from "../../interface/api_interface";

const DynamicImage = dynamic(() =>
  import("../../components/profile/profile").then((get) => get.ImageView)
);
const DynamicUser = dynamic(() =>
  import("../../components/profile/profile").then((get) => get.UserNotFound)
);
const DynamicInfo = dynamic(() =>
  import("../../components/profile/profile").then((get) => get.InfoProfile)
);

export default function (props: ResponseServer<IUser>) {
  const router = useRouter();
  const { name } = router.query;
  const { data: session } = useSession();
  const user = session as IUser;

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  if (!router.isReady && props.loading) return <Loading />;
  if (props.error !== undefined) return <DynamicUser data={props.error} />;

  return (
    <Section className="w-full  mt-2 text-white flex justify-center items-center flex-col gap-3">
      <div className="w-1/2  mt-5 flex justify-center items-center  flex-col gap-5 ">
        <DynamicImage
          image={props.user_data?.image!}
          user={props.user_data?.name}
        />
        <CustomText text={name as string} />
        <DynamicInfo templates={props.user_data!.templates?.length!} star={1} />
        {user?.name === name ? (
          <Code
            text={`temp --upload ${user?.code_auth} --name 'name template'`}
          />
        ) : null}
        <InputSearch template={props.user_data?.templates!} />
      </div>
    </Section>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: ResponseServer<IUser> }> {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const { name } = context.query;
  if (!name)
    return {
      props: {},
    };
  const resp = await getUserInfo<IUser[]>(name as string);

  if (resp.error !== undefined)
    return {
      props: {
        loading: false,
        error: resp.error,
      },
    };

  return {
    props: {
      user_data: resp.data![0],
    },
  };
}
