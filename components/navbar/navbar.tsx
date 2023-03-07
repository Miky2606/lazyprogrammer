import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { IUser } from "../../db/schema/user_schema";
import Image from "next/image";

export const Navbar = (): JSX.Element => {
  const { data: session } = useSession();
  const user: IUser = session as IUser;

  return (
    <nav className="sticky top-0 w-full   bg-cover  ">
      <div className="w-full h-full flex justify-between items-center bg-gray-400 bg-opacity-10  p-4 backdrop-filter backdrop-blur-sm ">
        <div className="flex gap-4 text-white">
          <Link href={"/"} className="flex gap-3">
            <div>
              <span className="text-2xl italic text-gray-500 ">Lazy</span>
              <span className="text-green-500 font-bold text-2xl">Temps</span>
            </div>

            <Image
              src={"/favicon.ico"}
              width={30}
              height={10}
              alt="lazytemps ico"
            />
          </Link>
        </div>

        <ul className="flex gap-3">
          {session ? (
            <>
              <li
                className="bg-slate-700 px-2 py-1 text-center rounded-full text-white text-sm  lg:text-xs capitalize cursor-pointer"
                key={"account"}
              >
                <Link href={`/user/${user!.name}`}>{user.name}</Link>
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
