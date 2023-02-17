import { InputSearch } from "../inputs/inputs";
import { AiFillStar } from "react-icons/ai";
import { ITemplate } from "./interface";
import Link from "next/link";
import { CustomText } from "../custom_text";
import axios from "axios";
import { useEffect, useState } from "react";
import { NotFound } from "../not_found/not_found";

export const TemplatesView = (): JSX.Element => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const getAllTemplates = async () => {
    const response = await axios.get<{ data: ITemplate[] }>(
      `${process.env.API_URL}/get-all-templates`
    );

    setTemplates(response.data.data);
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center w-full lg:w-3/5">
      <CustomText text={"Templates"} />
      <InputSearch />
      <TemplatesList template={templates} />
    </div>
  );
};

export const TemplatesList = ({
  template,
}: {
  template: ITemplate[];
}): JSX.Element => {
  if (template.length === 0) return <NotFound />;

  return (
    <div className="flex flex-col   items-center w-full h-full gap-3">
      {template.map((e) => (
        <Link
          href={`/templates/${e._id as string}`}
          className="flex flex-col shadow-stone-400  lg:h-full  overflow-hidden w-full lg:w-[40%]   border-[0.5px] rounded  border-gray-400 opacity-40 hover:opacity-100 hover:scale-105 cursor-pointer transition-all ease-in-out duration-500"
        >
          <div className=" p-2 flex justify-between gap-3 w-full  ">
            <h2>{e.name}</h2>

            <p className="flex gap-1 items-center justify-center">
              <AiFillStar className="text-yellow-400" />
              {e.star}
            </p>
          </div>
        </Link>
      ))}
      <div className=" flex gap-3 items-center">
        <button className="bg-slate-600  px-2  rounded-full">-</button>
        <p className="text-xs text-gray-400">Found: 102 templates </p>
        <button className="bg-slate-600  px-2 text-center rounded-full">
          +
        </button>
      </div>
    </div>
  );
};
