import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const Readme = ({ url }: { url: string }): JSX.Element => {
  const [readme, setReadme] = useState<string>("");

  const getMarkdown = () => {
    return axios
      .get(url)
      .then((res) => res.data)
      .then((text) => setReadme(text))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMarkdown();
  }, []);

  if (readme === "") return <div>No readme</div>;

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
            <h1 className="text-3xl text-green-500 font-extrabold">
              {props.children}
            </h1>
          );
        },
        h2: (props) => {
          return (
            <h2
              className="text-2xl text-gray-700 font-bold"
              id={props.children
                .toLocaleString()
                .toLowerCase()
                .split(" ")
                .join("-")}
            >
              -{props.children}
            </h2>
          );
        },
      }}
      className="w-full lg:w-1/2 flex flex-col  mb-2 p-6 gap-3 border-[0.2px] border-slate-500  rounded   text-white   "
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
