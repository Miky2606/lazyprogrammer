import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { CustomText } from "./custom_text";

export const Readme = (): JSX.Element => {
  const [readme, setReadme] = useState<string>("");
  const getMarkdown = () => {
    return fetch(
      "https://raw.githubusercontent.com/oren/node-website-template/master/readme.md"
    )
      .then((res) => res.text())
      .then((text) => setReadme(text));
  };

  useEffect(() => {
    getMarkdown();
  }, []);

  return (
    <ReactMarkdown
      children={readme}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        code: Component,
        a: (props) => {
          return (
            <Link
              href={props.href as string}
              target={
                !props.href?.toString().includes("#") ? "_blank" : "_self"
              }
              className="text-blue-400"
            >
              {props.children}
            </Link> // Render Twitter links // All other links
          );
        },
        h1: (props) => {
          return (
            <CustomText text={props.children as string} className="text-2xl" />
          );
        },
        h2: (props) => {
          return (
            <CustomText
              text={props.children as string}
              id={props.children
                .toLocaleString()
                .toLowerCase()
                .split(" ")
                .join("-")}
            />
          );
        },
      }}
      className="w-full lg:w-1/2 flex flex-col  mb-2 p-6 gap-3 border-[0.5px] border-slate-500  rounded   text-white  "
    />
  );
};

const Component = ({ children }: any) => {
  return (
    <SyntaxHighlighter language="javascript" style={dracula}>
      {children ?? ""}
    </SyntaxHighlighter>
  );
};
