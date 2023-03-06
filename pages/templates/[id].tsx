import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { Code } from "../../components/code";
import { CustomText } from "../../components/custom_text";
import { Loading, ErrorView } from "../../components/loading_error";
import { ModalCustom } from "../../components/modal";
import { NotFound } from "../../components/not_found/not_found";
import { Readme } from "../../components/readme";
import { ITemplate } from "../../interface/interface";
import { IUser } from "../../db/schema/user_schema";
import { ResponseServer } from "../../interface/api_interface";
import { deleteTemplate, getTemplateInfo } from "../../util/template_util";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicError = dynamic(() =>
  import("../../components/loading_error").then((get) => get.ErrorView)
);

export default function Templates(
  props: ResponseServer<ITemplate>
): JSX.Element {
  const url = `C:/Users/Jonathan/Desktop/tempjs/user/${
    props.user_data?.user![0].name
  }/${props.user_data?.name}/readme.md`;

  if (props.loading) return <Loading />;
  if (props.error !== undefined)
    return <DynamicError error={props.error} text="Can you check the link?" />;
  if (props.user_data === undefined)
    return (
      <div className="text-white">
        <NotFound />
      </div>
    );

  return (
    <div className=" w-full h-full flex flex-col gap-3  items-center text-white mt-10 p-2">
      <Head>
        <title>
          {props.user_data.name} | {props.user_data!.user![0].name}
        </title>
        <meta
          name="description"
          content={`Template  ${props.user_data.name} by Lazytemps created by ${
            props.user_data!.user![0].name
          } `}
        />
        <meta
          property="og:title"
          content={`  {props.user_data.name} | {props.user_data!.user![0].name}`}
        />
        <meta
          property="og:url"
          content={`Template  ${props.user_data.name} by Lazytemps created by ${
            props.user_data!.user![0].name
          } `}
        />
        <meta property="og:description" content="" />
      </Head>
      <CustomText text={props.user_data.name} />
      <Info info={props.user_data ?? []} />
      <SubInfo info={props.user_data!} />
      <Code text={`tempjs -d ${props.user_data?.name}`} />
      <Readme url={url} />
    </div>
  );
}

const Info = ({ info }: { info: ITemplate }): JSX.Element => {
  const date = new Date(info.created);
  const new_date = new Date().getDate() - date.getDate();

  return (
    <div className="text-gray-400 text-xs flex  flex-col gap-2 items-center">
      <p>
        <span className="text-white">Created:</span> {new_date} days ago
      </p>
      <p>
        <span className="text-white ">Author:</span>{" "}
        <Link
          href={`/user/${info.user![0].name}`}
          className="text-blue-500 hover:text-opacity-40"
        >
          {info.user![0].name!}
        </Link>
      </p>
    </div>
  );
};

const SubInfo = ({ info }: { info: ITemplate }): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session as IUser;
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div className="flex justify-center items-center gap-4 w-1/4 text-md mt-2">
      {modal ? (
        <ModalCustom
          text={`Are you sure you want delete`}
          name={info.name}
          deleteFunc={async () => {
            const response = await deleteTemplate(info._id as string);
            if (response.error !== undefined)
              return toast.error(response.error);
            return router.replace("/");
          }}
          setModal={setModal}
        />
      ) : null}
      <div className="text-green-600 flex items-center gap-1">
        <AiOutlineCloudDownload />
        {info?.downloads}
      </div>
      {user !== undefined ? (
        info.user![0].name === user.name ? (
          <div
            className="text-red-600 flex items-center gap-1 cursor-pointer"
            onClick={async () => {
              setModal(true);
            }}
          >
            <BsFillTrashFill />
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: ResponseServer<ITemplate> }> {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const { id } = context.query;

  const resp = await getTemplateInfo<ITemplate[]>(id as string);

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
      user_data: resp.data![0],
    },
  };
}
