import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import { Code } from "../code";
import { CustomText } from "../custom_text";
import { NotFound } from "../not_found/not_found";
import { ITemplate, template_fake } from "./interface";
import { Readme } from "../readme";
import Link from "next/link";
import { ButtonBasic } from "../buttons";
import axios from "axios";

export const TemplatesDetails = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const [template, setTemplate] = useState<ITemplate | undefined>();

  const getTemplate = async () => {
    const response = await axios.get<{ data: ITemplate[] }>(
      `${process.env.API_URL}/${id}`
    );

    if (!response) return setTemplate(undefined);

    return setTemplate(response.data.data[0]);
  };

  useEffect(() => {
    getTemplate();
  }, []);

  if (template === undefined)
    return (
      <div className="text-white">
        <NotFound />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center text-white mt-10 p-2">
      <CustomText text={template!.name} />
      <Code text={`temp ${template?.name as string}`} />
      <Info info={template!} />
      <SubInfo info={template!} />

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
  const [star, setStar] = useState<boolean>(false);
  return (
    <div className="flex justify-center items-center gap-4 w-1/4 text-md mt-2">
      <div className="text-gray-400 flex items-center gap-1 ">
        <div onClick={() => setStar(!star)}>
          {star ? (
            <AiFillStar className="cursor-pointer text-yellow-400" />
          ) : (
            <AiOutlineStar className="cursor-pointer text-yellow-400" />
          )}
        </div>{" "}
        {info?.star}
      </div>
      <div className="text-green-600 flex items-center gap-1">
        <AiOutlineCloudDownload />
        {info?.star}
      </div>
    </div>
  );
};
