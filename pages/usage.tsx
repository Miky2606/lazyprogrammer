import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Code } from "../components/code";
import { CustomText } from "../components/custom_text";
import { Readme } from "../components/readme";
import { IUser } from "../db/schema/user_schema";

export default function Usage(): JSX.Element {
  return (
    <div className="w-full flex">
      <Head>
        <title>Usage | LazyTemps</title>
        <meta name="description" content="Template documentation and usage " />
        <meta property="og:title" content="Usage | LazyTemps" />
        <meta property="og:url" content="" />
        <meta
          property="og:description"
          content="Template documentation and usage "
        />
      </Head>
      <div className="flex flex-col items-center p-4  gap-4 scroll-smooth ml-auto mr-auto text-white">
        <LayoutUsage title="Init" id="init">
          <Init />
        </LayoutUsage>
        <LayoutUsage title="Upload" id="upload">
          <UploadView />
        </LayoutUsage>
        <LayoutUsage title="Download" id="download">
          <DownloadView />
        </LayoutUsage>
      </div>

      <div className="hidden md:flex flex-col gap-3 p-3 fixed top-36 right-10 text-white   backdrop-filter backdrop-blur-sm bg-gray-500 bg-opacity-40 rounded">
        <CustomText text="Usage" />

        <ul className="flex flex-col justify-around gap-3  ">
          <li>
            <Link href={"#init"} className="hover:text-gray-500">
              #Init
            </Link>
          </li>
          <li>
            <Link href={"#upload"} className="hover:text-gray-500">
              #Upload
            </Link>
          </li>
          <li>
            <Link href={"#download"} className="hover:text-gray-500">
              #Download
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

const LayoutUsage = ({
  children,
  title,
  id,
}: {
  children: ReactNode;
  title: string;
  id: string;
}): JSX.Element => {
  return (
    <div id={id} className=" flex flex-col gap-3 text-start w-full   py-4">
      <h3 className="text-start text-[2.5rem] text-gray-500">{title}:</h3>
      {children}
    </div>
  );
};

const Init = (): JSX.Element => {
  return (
    <div className="text-start flex flex-col gap-4 ">
      <p>In LazyTemps you have 3 diferent commands:</p>
      <ul className="flex flex-col gap-5">
        <li>
          <span className="text-gray-500 text-lg">-init: </span> used to create
          a default readme.md and command.json{" "}
        </li>
        <li>
          <span className="text-gray-500 text-lg space-x-3">
            -d or --download:{" "}
          </span>
          used to download the template. For this command you can use{" "}
          <span className="text-gray-500 text-lg">-n or --name </span>
        </li>
        <li>
          <span className="text-gray-500 text-lg">-u or --upload: </span>
          used to upload a template. For this command you need a code auth and
          use the command{" "}
          <span className="text-gray-500 text-lg">-n or --name </span>
        </li>
        <li>
          <span className="text-gray-500 text-lg">-n or --name: </span>
          used to create a name for the templates
        </li>
      </ul>

      <div className="flex  flex-col gap-5">
        {" "}
        <p>Files:</p>
        <ul>
          <li>
            {" "}
            <span className="text-gray-500 text-lg">Readme.md: </span>
            you must create a readme.md to show the people your template. If you
            use the command{" "}
            <span className="text-gray-500 text-lg">-init </span>
            it will generate a default readme.md like this.
          </li>
          <li>
            {" "}
            <span className="text-gray-500 text-lg">Command.json: </span>
            This file is created so that when someone downloads your template,
            the console executes the necessary commands for your app or web
          </li>
        </ul>
        <div className="flex flex-col gap-4 mt-5">
          <h4 className="text-gray-400 text-xl">Default Readme.md:</h4>
          <Image
            src={"/readme.md.png"}
            alt="default-readme.md"
            width={500}
            height={200}
            className="rounded"
          />

          <h4 className="text-gray-400 text-xl">Default Command.json</h4>
          <Image
            src={"/command.json.png"}
            alt="default-command.json"
            width={700}
            height={300}
            className="rounded"
          />

          <p>
            You can create your own command.json and readme.md. The readme.md
            and command.json must be in the root of project before upload
          </p>

          <Image
            src={"/show.png"}
            alt="example-root"
            width={400}
            height={300}
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

const UploadView = (): JSX.Element => {
  const { data } = useSession();
  const user = data as IUser;
  return (
    <div>
      <p>
        To Upload template you only need open the root folder and write this
        command on the console:
      </p>
      <Code
        text={`tempjs -u ${
          user ? user.code_auth : "[your code auth]"
        } -n [name template]`}
      />
    </div>
  );
};

const DownloadView = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-3">
      <p>
        To Download template you only need write this command on the console:
      </p>
      <Code
        text=" -d [name template]
          -n  [name folder]"
      />
      or
      <Code
        text=" -d [name template]
        "
      />
    </div>
  );
};
