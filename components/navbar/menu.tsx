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
    id: 3,
    text: "Usage",
    href: "/usage",
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
    <Section className=" hidden lg:flex  h-4/5   items-start justify-start p-7 gap-5 overflow-y-auto overflow-hidden border-r-2 text-white">
      <ul className="flex flex-col gap-2 w-1/2 ">
        {menu.map((e) => (
          <li
            key={e.id}
            className={`${
              name === e.href
                ? "  text-white  scale-120"
                : " text-gray-500 scale-110 hover:scale-120 transition-all duration-75"
            }  p-2 text-start rounded  `}
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
              name === e.href ? " text-white" : " text-gray-500"
            }  p-2 text-center rounded  `}
          >
            <Link href={e.href}>{e.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
