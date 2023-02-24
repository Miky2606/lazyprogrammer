import { Code } from "../code";
import { CustomText } from "../custom_text";

export const GettingStarted = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-5 items-center w-1/2  lg:w-3/5 text-white">
      <CustomText text={"Install"} />
      <p>For all templates you only need write this code</p>
      <Code text="temp" />
    </div>
  );
};
