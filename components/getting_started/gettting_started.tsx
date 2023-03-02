import { Code } from "../code";
import { CustomText } from "../custom_text";

export const GettingStarted = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-6 items-center w-full p-3  lg:w-3/5 text-white ">
      <CustomText text={"Getting started"} />

      <div className="w-full    text-start  flex-col flex gap-5">
        <p className="text-start">
          Welcome to{" "}
          <span className="text-green-400 capitalize text-lg  space-x-3">
            lazytemps
          </span>{" "}
          documentation!
        </p>
        <p>
          <span className="text-green-400 capitalize text-lg  space-x-3">
            lazytemps
          </span>{" "}
          is a web to upload and downloads templates from other peoples.
        </p>
        <p>
          The proposite is make the creation of a new project more easy and
          fast. With{" "}
          <span className="text-green-400 capitalize text-lg  space-x-3">
            lazytemps
          </span>{" "}
          you can upload yours init projects and then downloads when you needed.
        </p>
        <p>
          {" "}
          This can be used when you init project and you don't want write all
          the code for the initialization. Code like your reset css ,tailwind
          config, or database connect, you can upload and when you need use you
          don't need write the code again only download from your Lazytemp's
          profile or other users profile and save time.
        </p>

        <p className="">
          To install{" "}
          <span className="text-green-400 capitalize text-lg  space-x-3">
            lazytemps
          </span>
          use:
        </p>
        <Code text="npm -g tempjs" />
      </div>

      <p></p>
    </div>
  );
};
