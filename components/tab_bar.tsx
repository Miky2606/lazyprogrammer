import { useState } from "react";
import { IButton } from "./buttons";
import { IViewContent } from "./home/home";

export interface ITab extends IViewContent {
  text: string;
  id: number;
}

interface IItemsNav extends IButton {
  className?: string;
}

export const TabBar = ({ items }: { items: ITab[] }): JSX.Element => {
  const [view_tab_content, setViewTabContent] = useState<JSX.Element>(
    items[0].view
  );
  const [active_item, setActiveItem] = useState<string>(items[0].text);

  const changeContentTab = (e: ITab) => {
    setViewTabContent(e.view);
    setActiveItem(e.text);
  };

  return (
    <div className="flex flex-col gap-3 w-full items-center transition-all duration-200 ease-in-out">
      <div className="flex gap-5 bg-slate-700 p-2 rounded-md w-1/2 lg:w-1/5 justify-center ">
        {items.map((e) => (
          <ItemsTab
            text={e.text}
            key={e.id}
            onClick={() => changeContentTab(e)}
            className={`${
              e.text === active_item ? "border-pink-600" : "border-transparent"
            }`}
          />
        ))}
      </div>
      {view_tab_content}
    </div>
  );
};

export const ItemsTab = ({ text, onClick, className }: IItemsNav) => {
  return (
    <div
      className={` ${className} text-white border-t-2  transition-all duration-200 ease-in-out cursor-pointer px-1 hover:border-t-2 hover:border-pink-400 `}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
