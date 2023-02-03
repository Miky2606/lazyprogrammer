import { Section } from "../section/section";
import { ITab, TabBar } from "../tab_bar";
import { LoginView, Signin } from "./login";

const tab_item: ITab[] = [
  {
    id: 1,
    text: "Login",
    view: <LoginView />,
  },
  {
    id: 2,
    text: "Sign",
    view: <Signin />,
  },
];

export const LayoutLogins = () => {
  return (
    <Section className="flex justify-center items-center h-3/4 w-full">
      <div className="w-full lg:w-1/2 h-full text-white flex items-center px-2 ">
        <TabBar items={tab_item} />
      </div>
    </Section>
  );
};
