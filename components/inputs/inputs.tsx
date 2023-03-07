import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  HTMLInputTypeAttribute,
  LegacyRef,
  useMemo,
  useState,
} from "react";
import { BsSearch, BsUnlockFill } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { Code } from "../code";
import { BsLockFill } from "react-icons/bs";
import { ITemplate } from "../../interface/interface";
import { NotFound } from "../not_found/not_found";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { ButtonBasic } from "../buttons";

export interface ICustomsInput {
  Icon: IconType;
  required?: boolean;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  ref?: LegacyRef<HTMLInputElement>;
  value?: string;
  onClick?: () => void;
}

export const InputSearch = ({
  template,
}: {
  template: ITemplate[];
}): JSX.Element => {
  const [add, setAdd] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const filteredUsers = useMemo(
    () =>
      template?.filter((e) => {
        return e.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search]
  );

  const add_more = () => {
    if (add < filteredUsers.length) {
      setAdd(add + 10);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <div className=" w-full lg:w-1/5 flex justify-start gap-2 px-2 py-2 items-center rounded-full border-[0.5px] border-gray-500 ">
        <span className="h-full text-white   border-r-[0.5px] border-gray-700  p-1">
          {" "}
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none text-sm text-white bg-transparent"
          onChange={handleChange}
        />
      </div>
      <p className="text-xs text-gray-400">
        Found: {filteredUsers?.length} templates{" "}
      </p>
      <div className="flex flex-col   items-center w-full h-full gap-3 px-1">
        {template?.length === 0 || filteredUsers?.length === 0 ? (
          <div className="text-white text-lg">No Templates Found</div>
        ) : null}

        {filteredUsers?.slice(0, add).map((e) => (
          <Link
            href={`/templates/${e.name as string}`}
            className="flex flex-col shadow-stone-400  lg:h-34  overflow-hidden w-[90vw] lg:w-[40%]   border-[0.5px] rounded  border-gray-400 opacity-40 hover:opacity-100 hover:scale-105 cursor-pointer transition-all ease-in-out duration-500 text-white py-5 gap-1"
            key={e._id as string}
          >
            <div className=" p-3 flex justify-between gap-3 w-full  ">
              <h2>{e.name}</h2>

              <p className="flex gap-1 items-center justify-center">
                {e.user ? e.user![0].name : ""}
              </p>
            </div>
            {e.description !== undefined ? (
              <p
                className={`text-start   ${
                  e.description !== "" ? "p-2" : "p-0"
                }`}
              >
                {shortDesc(e.description)}
              </p>
            ) : null}
          </Link>
        ))}

        {filteredUsers?.length > 9 ? (
          <ButtonBasic onClick={add_more} text={"More"} />
        ) : null}
      </div>
    </div>
  );
};

const shortDesc = (desc: string) => {
  if (desc.length > 50) return `${desc.slice(0, 50)}...`;
  return desc;
};
