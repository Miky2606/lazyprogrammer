import { createRef, useState } from "react";

export const Code = ({ text }: { text: string }): JSX.Element => {
  const [text_tooltip, setText_Tooltip] = useState<string>("Copy");

  const tipRef = createRef<HTMLDivElement>();

  function handleMouseEnter() {
    tipRef.current!.style.opacity = "1";
    tipRef.current!.style.display = "inline-block";
    tipRef.current!.style.visibility = "visible";
  }

  function handleMouseLeave() {
    tipRef.current!.style.opacity = "0";
    tipRef.current!.style.display = "hidden";
    tipRef.current!.style.visibility = "invisible";
    setText_Tooltip("Copy");
  }

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setText_Tooltip("Copied");
  };

  return (
    <div className="flex ">
      <code
        data-tooltip-target="tooltip-default"
        className="bg-slate-600 p-2 text-white rounded text-sm text-center hover:opacity-50 cursor-pointer "
        onClick={() => copyCode(`${text}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </code>
      <div
        ref={tipRef}
        id="tooltip-default"
        role="tooltip"
        className="fixed  z-10 opacity-0 hidden invisible   px-1 py-1 text-xs font-medium text-white transition-opacity duration-300  bg-gray-600 rounded-lg shadow-sm opacity-1  rigth-10 bg-opacity-100 cursor-default "
      >
        {text_tooltip}
      </div>
    </div>
  );
};
