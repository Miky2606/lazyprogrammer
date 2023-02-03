import Link from "next/link";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useAccountStore } from "../../store/store";

interface IItemsNav {
  id: string;
  text: string;
  url: string;
}

const items_nav: IItemsNav[] = [
  {
    id: "1",
    text: "Login",
    url: "/login",
  },
  {
    id: "2",
    text: "Sign Up",
    url: "/login",
  },
];

export const Navbar = (): JSX.Element => {
  const { token, createToken } = useAccountStore(
    (state) => ({ token: state.token, createToken: state.createToken }),
    shallow
  );
  const [token_get, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(token === "" ? undefined : token);
  }, [token]);

  return (
    <nav className="sticky top-0 w-full   bg-cover  ">
      <div className="w-full h-full flex justify-between items-center bg-gray-400 bg-opacity-10  p-4 backdrop-filter backdrop-blur-sm ">
        <div className="flex gap-4">logo</div>

        <ul className="flex gap-3">
          {token_get !== undefined ? (
            <ItemsNav key={"3"} text="Account" url={`/${token_get}`} id="3" />
          ) : (
            items_nav.map((e) => <ItemsNav key={e.id} {...e} />)
          )}
        </ul>
      </div>
    </nav>
  );
};

const ItemsNav = ({ text, url, id }: IItemsNav): JSX.Element => {
  return (
    <li className="bg-slate-700 px-2 py-1 text-center rounded-full text-white text-sm  lg:text-xs capitalize cursor-pointer">
      <Link href={url}>{text}</Link>
    </li>
  );
};
