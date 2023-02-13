import { CustomsInput } from "../inputs/inputs";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";
import { MdAttachEmail } from "react-icons/md";
import { ButtonBasic } from "../buttons";
import { FaUserCircle } from "react-icons/fa";
import { FormEvent, useRef, useState } from "react";
import { verifyEmail, verifyPassword } from "../../controller/controller_login";
import Link from "next/link";
import { loginUser } from "../../controller/controller_api_get";
import { LoginData } from "../../interface/user_interface";
import { Loading } from "../loading";
import { useAccountStore } from "../../store/store";
import { shallow } from "zustand/shallow";

export const LoginView = (): JSX.Element => {
  const { createToken } = useAccountStore(
    (state) => ({ createToken: state.createToken }),
    shallow
  );
  const email = useRef<HTMLInputElement | null>(null);
  const pwd = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  const [show_pwd, setShowPWD] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const user: LoginData = {
      email: email.current!.value,
      password: pwd.current!.value,
    };

    if (!verifyEmail(user.email)) return setError("!!Email incorrect");

    let response = await loginUser(user);
    console.log(typeof response?.token);

    if (response?.error !== undefined) return setError(response.error);
    if (typeof response!.token === "undefined") {
      setLoading(false);
      return setError(response!.msg);
    }

    return setError("");
  };

  if (loading) return <Loading />;

  return (
    <form
      className="w-full h-full flex flex-col items-center gap-6 justify-center p-5"
      onSubmit={submit}
    >
      {error !== "" ? (
        <div className="bg-red-500 py-1 px-2 rounded">{error}</div>
      ) : null}

      <CustomsInput
        type={"text"}
        placeholder={"Email"}
        required={false}
        Icon={MdAttachEmail}
        ref={email}
      />
      <CustomsInput
        type={show_pwd ? "text" : "password"}
        placeholder={"Password"}
        required={false}
        Icon={!show_pwd ? AiFillLock : AiFillUnlock}
        ref={pwd}
        onClick={() => setShowPWD(!show_pwd)}
      />
      <div className="flex justify-end w-1/2 text-xs text-red-400 ">
        <Link href={"/"} className={"hover:text-red-600"}>
          Forget The Password?
        </Link>
      </div>
      <ButtonBasic text="Login" type="submit" />
    </form>
  );
};

//Signin
export const Signin = (): JSX.Element => {
  const username = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const pwd = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  const [show_pwd, setShowPWD] = useState<boolean>(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.current?.value === "") return setError("Username Required");
    if (!verifyEmail(email.current?.value as string))
      return setError("!!Email incorrect");
    if (!verifyPassword(pwd.current?.value as string))
      return setError(
        "Password must contain at least one uppercase and one special character"
      );

    return setError("");
  };

  return (
    <form
      className="w-full h-full flex flex-col items-center gap-6 justify-center p-5"
      onSubmit={submit}
    >
      {error !== "" ? (
        <div className="bg-red-500 py-1 px-2 rounded">{error}</div>
      ) : null}
      <CustomsInput
        type={"text"}
        placeholder={"Username"}
        required={false}
        Icon={FaUserCircle}
        ref={username}
      />
      <CustomsInput
        type={"text"}
        placeholder={"Email"}
        required={false}
        Icon={MdAttachEmail}
        ref={email}
      />
      <CustomsInput
        type={show_pwd ? "text" : "password"}
        placeholder={"Password"}
        required={false}
        Icon={!show_pwd ? AiFillLock : AiFillUnlock}
        ref={pwd}
        onClick={() => setShowPWD(!show_pwd)}
      />
      <div className="flex justify-end w-1/2 text-xs text-red-400 hover:text-red-600">
        <Link href={"/"}>Forget The Password?</Link>
      </div>
      <ButtonBasic text="Login" type="submit" />
    </form>
  );
};
