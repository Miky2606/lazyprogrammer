import { FormEventHandler } from "react";

export interface IButton {
  text: string;
  onClick?: () => void;
  onSubmit?: FormEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

export const ButtonBasic = ({
  text,
  onClick,
  type,
  onSubmit,
}: IButton): JSX.Element => {
  return (
    <button
      type={type}
      className="bg-gradient-to-r from-red-500 to-pink-500 px-1 py-1 w-full lg:w-1/2 rounded-full text-center text-white capitalize  cursor-pointer"
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {" "}
      {text}
    </button>
  );
};
