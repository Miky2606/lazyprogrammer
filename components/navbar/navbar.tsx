import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { IUser } from "../../interface/user_interface";

interface IItemsNav {
  id: string;
  text: string;
  url: string;
}

// const items_nav: IItemsNav[] = [
//   {
//     id: "1",
//     text: "Login",
//     url: "/login",
//   },
//   {
//     id: "2",
//     text: "Sign Up",
//     onClick: signIn(),
//   },
// ];

export const Navbar = (): JSX.Element => {
  const { data: session } = useSession();
  const user: IUser = session as IUser;

  return (
    <nav className="sticky top-0 w-full   bg-cover  ">
      <div className="w-full h-full flex justify-between items-center bg-gray-400 bg-opacity-10  p-4 backdrop-filter backdrop-blur-sm ">
        <div className="flex gap-4">logo</div>

        <ul className="flex gap-3">
          {session ? (
            <>
              {/* <ItemsNav
                key={"3"}
                text={user.username!}
                id="3"
                url={`/${user!.username?.toLowerCase()}`}
              /> */}

              <li
                className="bg-slate-700 px-2 py-1 text-center rounded-full text-white text-sm  lg:text-xs capitalize cursor-pointer"
                key={"account"}
              >
                <Link href={`/${user!.name}`}>{user.name}</Link>
              </li>

              <li
                className="bg-slate-700 px-2 py-1 text-center rounded-full text-white text-sm  lg:text-xs capitalize cursor-pointer"
                key={"signout"}
              >
                <button onClick={() => signOut()}>SignOut</button>
              </li>
            </>
          ) : (
            <li className="bg-slate-700 px-2 py-1 text-center rounded-full text-white text-sm  lg:text-xs capitalize cursor-pointer">
              <button onClick={() => signIn()}>SignIn</button>
            </li>
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
