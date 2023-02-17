import {
  ChangeEvent,
  forwardRef,
  HTMLInputTypeAttribute,
  LegacyRef,
  useState,
} from "react";
import { BsSearch, BsUnlockFill } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { Code } from "../code";
import { BsLockFill } from "react-icons/bs";

export interface ICustomsInput {
  Icon: IconType;
  required?: boolean;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  ref?: LegacyRef<HTMLInputElement>;
  value?: string;
  onClick?: () => void;
}

export const InputSearch = (): JSX.Element => {
  return (
    <div className=" w-1/2 lg:w-1/5 flex justify-start gap-2 px-2 py-2 items-center rounded-full border-[0.5px] border-gray-500 ">
      <span className="h-full   border-r-[0.5px] border-gray-700  p-1">
        {" "}
        <BsSearch />
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="w-full outline-none text-xs text-gray-600 bg-transparent"
      />
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
