import { Section } from "../section/section";
import { CgProfile } from "react-icons/cg";
import { BiPackage } from "react-icons/bi";
import { ButtonBasic } from "../buttons";
import { AiFillStar } from "react-icons/ai";
import { IoLinkSharp } from "react-icons/io5";
import { CustomText } from "../custom_text";
import Link from "next/link";
import { TemplatesList, TemplatesView } from "../templates/template";
import { fake_tab, TabBar } from "../tab_bar";
import { useRouter } from "next/router";
import { NotFound } from "../not_found/not_found";

const getUser = (name: string) => {
  const x: any = {
    pedro: "pedro",
    jonathan: "jonathan",
  };

  return x[name] ?? "no";
};

export const ProfileView = () => {
  const router = useRouter();
  const { name } = router.query;
  const x = "mario";

  if (getUser(name as string) === "no") return <NotFound />;

  return (
    <Section className="w-full  mt-2 text-white flex justify-center items-center flex-col gap-3">
      <div className="w-1/2  mt-5 flex justify-center items-center  flex-col gap-5 ">
        <ImageView />
        <CustomText text={name as string} />
        <InfoProfile />
        <PortfolioLink />

        {name === "jonathan" ? <TabBar items={fake_tab} /> : <TemplatesList />}
      </div>
    </Section>
  );
};

const ImageView = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <CgProfile className="text-9xl text-gray-400" />
      <ButtonBasic text="change" />
    </div>
  );
};

const InfoProfile = (): JSX.Element => {
  return (
    <div className="flex  gap-6 items-start bg-slate-700 p-2 rounded-md">
      <div className="text-white flex gap-3">
        <BiPackage className="text-2xl" />
        1200
      </div>

      <div className="flex gap-3">
        <AiFillStar className="text-2xl text-yellow-300" />3
      </div>
    </div>
  );
};

const PortfolioLink = (): JSX.Element => {
  return (
    <Link
      href={""}
      target="_blank"
      className="text-blue-500 hover:text-opacity-40 flex items-center gap-2  w-1/4"
    >
      <IoLinkSharp className="text-6xl" />
      <span className="truncate">
        https://docs.google.com/spreadsheets/d/166Q06MpNeSnJWoktoGGRGcGI9e9NhjT7/edit#gid=1138657404
      </span>
    </Link>
  );
};
