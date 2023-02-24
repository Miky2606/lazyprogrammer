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
import { ITemplate } from "../templates/interface";
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
      <div className="flex flex-col   items-center w-full h-full gap-3">
        {template?.length === 0 || filteredUsers?.length === 0 ? (
          <div className="text-white text-lg">No Templates Found</div>
        ) : null}
        {filteredUsers?.slice(0, add).map((e) => (
          <Link
            href={`/templates/${e._id as string}`}
            className="flex flex-col shadow-stone-400  lg:h-full  overflow-hidden w-full lg:w-[40%]   border-[0.5px] rounded  border-gray-400 opacity-40 hover:opacity-100 hover:scale-105 cursor-pointer transition-all ease-in-out duration-500 text-white"
            key={e._id as string}
          >
            <div className=" p-2 flex justify-between gap-3 w-full  ">
              <h2>{e.name}</h2>

              {/* <p className="flex gap-1 items-center justify-center">
                {e.user?[0]}
              </p> */}
            </div>
          </Link>
        ))}

        {filteredUsers?.length > 9 ? (
          <ButtonBasic onClick={add_more} text={"More"} />
        ) : null}
      </div>
    </div>
  );
};

export const UploadInput = (): JSX.Element => {
  const [show, setShow] = useState<HTMLInputTypeAttribute>("password");
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <article className="w-1/2 justify-center items-center flex flex-col gap-6 py-2">
        <p>
          For Upload templates you only need write this code in the terminal on
          the template folder:
        </p>
        <Code text="tempjs --sign <your sign code>" />

        <span className="space-x-3 w-full flex  justify-center items-center">
          <h5 className="text-gray-600 hover:text-gray-200">Sign Code</h5>
          <CustomsInput
            Icon={show === "password" ? BsLockFill : BsUnlockFill}
            type={show}
            value="saghjasghjgdhjfas"
            onClick={() => setShow(show === "password" ? "text" : "password")}
          />
        </span>
      </article>
    </div>
  );
};

export const CustomsInput = forwardRef(
  (
    { Icon, type, required, placeholder, onClick, value }: ICustomsInput,
    ref: LegacyRef<HTMLInputElement>
  ): JSX.Element => {
    // const [value, setValue] = useState<string>("");
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      // setValue(e.target.value);
    };
    return (
      <div className=" w-full lg:w-1/2  flex justify-start gap-2 px-3 py-2 items-center rounded-full border-[0.5px] border-gray-500 border-solid   ">
        <span className="h-full   border-r-[0.5px] border-gray-700  p-1">
          <Icon onClick={onClick} />
        </span>
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full h-full focus:text-blue-500 outline-none text-md text-white bg-transparent "
          ref={ref}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
);
