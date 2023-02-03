import { useState } from "react";
import { menu, Menu, MenuMobile } from "../menu/menu";
import { Section } from "../section/section";
import { ViewContent } from "../viewcontent/view_content";

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
