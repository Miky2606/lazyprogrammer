import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Section } from "../layout/layout";

interface IMenu {
  id: number;
  text: string;
  href: string;
}

type IMenuView = Omit<IMenu, "setMenu">;

export const menu: IMenuView[] = [
  {
    id: 1,
    text: "Getting Started",
    href: "/",
  },
  {
    id: 2,
    text: "Templates",
    href: "/template",
  },
];

export const Menu = (): JSX.Element => {
  const router = useRouter();
  const name = router.pathname;
  return (
    <Section className=" hidden lg:flex w-1/5 h-4/5   items-start justify-center p-5 gap-5 overflow-y-auto overflow-hidden border-r-2 text-white">
      <ul className="flex flex-col gap-3 ">
        {menu.map((e) => (
          <li
            key={e.id}
            className={`${
              name === e.href
                ? " bg-gradient-to-r from-red-500 to-pink-400 text-white"
                : "bg-slate-500 text-slate-800"
            }  p-2 text-center rounded  `}
          >
            <Link href={e.href}>{e.text}</Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export const MenuMobile = ({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const router = useRouter();
  const name = router.pathname;

  useEffect(() => {
    if (activeMenu) {
      setActiveMenu(!activeMenu);
    }
  }, [router.asPath]);

  return (
    <div
      className={`${
        !activeMenu ? "-left-[100%]" : "left-0"
      }  lg:hidden h-screen w-full top-0  fixed filter-backdrop backdrop-blur-sm bg-gray-500 bg-opacity-10  text-white flex justify-center p-3  transition-all ease-out duration-300 z-10`}
    >
      <ul className="flex flex-col gap-3 mt-10">
        {menu.map((e) => (
          <li
            key={e.id}
            className={`${
              name === e.href
                ? " bg-gradient-to-r from-red-500 to-pink-400 text-white"
                : "bg-slate-500 text-slate-800"
            }  p-2 text-center rounded  `}
          >
            <Link href={e.href}>{e.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
