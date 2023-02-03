import { InputSearch } from "../inputs/inputs";
import { AiFillFileImage } from "react-icons/ai";
import { template_fake } from "./interface";
import Link from "next/link";
import { CustomText } from "../custom_text";

export const TemplatesView = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <CustomText text={"Templates"} />
      <InputSearch />
      <TemplatesList />
    </div>
  );
};

export const TemplatesList = (): JSX.Element => {
  return (
    <div className="flex flex-col   items-center w-full h-full gap-3">
      {template_fake.map((e) => (
        <Link
          href={`/templates/${e.id}`}
          className="flex  shadow-stone-400 h-24 lg:h-full  overflow-hidden w-full lg:w-[60%]   border-[0.5px] rounded  border-gray-400 opacity-40 hover:opacity-100 hover:scale-105 cursor-pointer transition-all ease-in-out duration-500"
        >
          <div className=" p-2 flex flex-col gap-3  ">
            <h2>{e.name}</h2>

            <p>{e.description}</p>
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
