import { createRef, useState } from "react";

export const Code = ({ text }: { text: string }): JSX.Element => {
  const [text_tooltip, setText_Tooltip] = useState<string>("Copy Text");

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
    setText_Tooltip("Copy Text");
  }

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setText_Tooltip("Copied");
  };

  return (
    <div className="flex justify-end">
      <code
        data-tooltip-target="tooltip-default"
        className=" w-64  bg-slate-600 p-2 text-white rounded text-sm text-center hover:opacity-50 cursor-pointer "
        onClick={() => copyCode(`npx tempjs ${text}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        npx tempjs {text}
      </code>
      <div
        ref={tipRef}
        id="tooltip-default"
        role="tooltip"
        className="fixed z-10 opacity-0 hidden invisible   px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  bg-gray-600 rounded-lg shadow-sm opacity-1  rigth-10 bg-opacity-100 cursor-default "
      >
        {text_tooltip}
      </div>
    </div>
  );
};
