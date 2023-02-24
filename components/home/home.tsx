import { useState } from "react";
import { Section } from "../layout/layout";
import { menu, Menu, MenuMobile } from "../navbar/menu";

export const HomeView = (): JSX.Element => {
  const [View, setView] = useState<JSX.Element>(menu[0].view);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  return (
    <Section>
      <div className=" w-full  h-[86vh] flex  items-center p-5 gap-5    overflow-y-auto overflow-hidden">
        <Menu setMenu={setView} activeMenu={activeMenu} />
        <ViewContent view={View} />
      </div>
    </Section>
  );
};

export interface IViewContent {
  view: JSX.Element;
}

export const ViewContent = ({ view }: IViewContent): JSX.Element => {
  return (
    <div className="w-full h-full text-white  flex flex-col gap-6 items-center p-2">
      {view}
    </div>
  );
};
