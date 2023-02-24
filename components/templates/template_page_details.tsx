import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Code } from "../code";
import { CustomText } from "../custom_text";
import { NotFound } from "../not_found/not_found";
import { ITemplate } from "./interface";
import { Readme } from "../readme";
import Link from "next/link";
import { deleteTemplate, getTemplateInfo } from "../../util/template_util";
import { ErrorView, Loading } from "../loading_error";
import { useSession } from "next-auth/react";

import { ModalCustom } from "../modal";
import { IUser } from "../../db/schema/user_schema";
import { toast } from "react-toastify";

export const TemplatesDetails = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const [template, setTemplate] = useState<ITemplate | undefined>();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const get = async () => {
    if (!id) return;

    const response = await getTemplateInfo<ITemplate[]>(id as string);

    response.error !== undefined
      ? setError(response.error)
      : setTemplate(response.data![0] as ITemplate);

    setLoading(false);
  };

  useEffect(() => {
    get();
  }, [id]);

  if (loading) return <Loading />;
  if (error !== undefined) return <ErrorView error={error} />;
  if (template === undefined)
    return (
      <div className="text-white">
        <NotFound />
      </div>
    );

  return (
    <div className=" w-full h-full flex flex-col gap-3  items-center text-white mt-10 p-2">
      <CustomText text={template!.name} />
      <Code text={`temp ${template?.name as string}`} />
      <Info info={template!} />
      <SubInfo info={template!} />
      <Code text={`tempjs -d ${template.name}`} />
      <Readme />
    </div>
  );
};

const Info = ({ info }: { info: ITemplate }): JSX.Element => {
  return (
    <div className="text-gray-400 text-xs flex  flex-col gap-2 items-center">
      <p>
        <span className="text-white">Created:</span> {info.created.toString()}
      </p>
      <p>
        <span className="text-white ">Author:</span>{" "}
        <Link
          href={`/${info.user![0].name!}`}
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

      {info.user![0].name === user.name ? (
        <div
          className="text-red-600 flex items-center gap-1 cursor-pointer"
          onClick={async () => {
            setModal(true);
          }}
        >
          <BsFillTrashFill />
        </div>
      ) : null}
    </div>
  );
};
