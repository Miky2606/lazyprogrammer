import { Dispatch, SetStateAction, useState } from "react";
import { GettingStarted } from "../getting_started/gettting_started";

import { TemplatesView } from "../templates/template";

interface IMenu {
  id: number;
  text: string;
  view: JSX.Element;
  setMenu: Dispatch<SetStateAction<JSX.Element>>;
  setActive?: Dispatch<SetStateAction<boolean>>;
  activeMenu?: boolean;
}

type IMenuView = Omit<IMenu, "setMenu">;
type MenuOptions = Pick<IMenu, "setMenu" | "activeMenu" | "setActive">;

export const menu: IMenuView[] = [
  {
    id: 1,
    text: "Getting Started",
    view: <GettingStarted />,
  },
  {
    id: 2,
    text: "Templates",
    view: <TemplatesView />,
  },
];

export const Menu = ({ setMenu }: MenuOptions): JSX.Element => {
  const [active, setActive] = useState<string>(menu[0].text);
  const setView = (e: IMenuView) => {
    setActive(e.text);
    setMenu(e.view);
  };
  return (
    <div className=" hidden lg:flex flex-col h-full border-r-2 border-gray-600 p-2 text-white text-sm w-52">
      <ul className="space-y-5 cursor-pointer text-center">
        {menu.map((e) => (
          <li
            className={`${
              active === e.text ? "text-gray-400" : "text-white"
            } hover:text-gray-400`}
            key={e.id}
            onClick={() => setView(e)}
          >
            {e.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const MenuMobile = ({
  activeMenu,
  setMenu,
  setActive,
}: MenuOptions): JSX.Element => {
  const [activeColor, setActiveMenu] = useState<string>(menu[0].text);

  const setView = (e: IMenuView) => {
    setMenu(e.view);
    setActive!(!activeMenu);
    setActiveMenu(e.text);
  };

  return (
    <div
      className={`${
        !activeMenu ? "-left-[100%]" : "left-0"
      } visible lg:hidden h-screen w-full top-0  fixed filter-backdrop backdrop-blur-sm bg-gray-500 bg-opacity-10  text-white flex justify-center p-3  transition-all ease-out duration-300`}
    >
      <ul className="flex flex-col gap-3 mt-10">
        {menu.map((e) => (
          <li
            key={e.id}
            onClick={() => setView(e)}
            className={`${
              activeColor === e.text
                ? " bg-gradient-to-r from-red-500 to-pink-400 text-white"
                : "bg-slate-500 text-slate-800"
            }  p-2 text-center rounded  `}
          >
            {e.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
