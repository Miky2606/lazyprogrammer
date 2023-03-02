import { ReactNode, useEffect, useState } from "react";
import { Menu, menu, MenuMobile } from "../navbar/menu";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Navbar } from "../navbar/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import Head from "next/head";
import { Footer } from "../footer/footer";

export interface ILayout {
  children: ReactNode;
}
interface ISection extends ILayout {
  className?: string;
}

export const Layout = ({ children }: ILayout) => {
  const router = useRouter();
  const name = router.pathname;

  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  useEffect(() => {
    if (activeMenu) {
      setActiveMenu(!activeMenu);
    }
  }, [router.asPath]);
  return (
    <div className="w-screen h-screen overflow-x-hidden  bg-slate-900">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Templates for programming" />
        <meta property="og:title" content="" />
        <meta property="og:url" content="Templates for programming" />
      </Head>
      <Navbar />
      <div
        className="text-white lg:hidden fixed bg-gray-600 px-2 py-1 right-1 bottom-1 rounded z-20"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        {activeMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <MenuMobile activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="w-full   flex gap-5 justify-center lg:justify-start mb-16">
        <Menu />

        {children}
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export const Section = ({ children, className }: ISection): JSX.Element => {
  return <section className={`${className} p-4 mt-4 `}>{children} </section>;
};
