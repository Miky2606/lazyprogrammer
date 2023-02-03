import { ReactNode, useState } from "react";
import { menu, MenuMobile } from "../menu/menu";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Navbar } from "../navbar/navbar";

export interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  const [View, setView] = useState<JSX.Element>(menu[0].view);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  return (
    <div className="w-screen h-screen overflow-x-hidden  bg-slate-900">
      <Navbar />
      <div
        className="text-white fixed bg-gray-600 px-2 py-1 right-1 bottom-1 rounded z-10"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        {activeMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <MenuMobile
        activeMenu={activeMenu}
        setMenu={setView}
        setActive={setActiveMenu}
      />

      {children}
    </div>
  );
};
