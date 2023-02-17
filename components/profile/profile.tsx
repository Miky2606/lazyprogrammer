import { Section } from "../section/section";
import { CgProfile } from "react-icons/cg";
import { BiPackage } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { CustomText } from "../custom_text";
import { TemplatesList } from "../templates/template";
import { fake_tab, TabBar } from "../tab_bar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { IUser } from "../../interface/user_interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiThink } from "react-icons/gi";
import { Loading } from "../loading";

const getUser = async (name: string) => {
  try {
    const response = await axios.get<{ data: IUser[] | string }>(
      `${process.env.API_URL}/get-user` ?? "none",
      {
        headers: {
          name: name,
        },
      }
    );

    if (typeof response.data.data === "string") return response.data.data;
    return response.data.data[0];
  } catch (error) {
    return "Error in the network";
  }
};

export const ProfileView = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data: session } = useSession();
  const user = session as IUser;
  const [user_data, setUserData] = useState<IUser | string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const get_user_data = async () => {
    setLoading(true);
    if (await getUser(name as string)) {
      setUserData(await getUser(name as string));
      setLoading(false);
    }
  };

  useEffect(() => {
    get_user_data();
  }, [name]);

  if (loading) return <Loading />;
  if (typeof user_data === "string") return <UserNotFound data={user_data} />;

  return (
    <Section className="w-full  mt-2 text-white flex justify-center items-center flex-col gap-3">
      <div className="w-1/2  mt-5 flex justify-center items-center  flex-col gap-5 ">
        <ImageView image={user_data.image!} user={user_data.name!} />
        <CustomText text={name as string} />
        <InfoProfile templates={user_data.templates?.length!} star={1} />

        {user?.name?.toLocaleLowerCase() === name ? (
          <TabBar items={fake_tab} />
        ) : (
          <TemplatesList template={user_data.templates!} />
        )}
      </div>
    </Section>
  );
};

const ImageView = ({
  image,
  user,
}: {
  image?: string;
  user?: string;
}): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 items-center">
      {image ? (
        <img src={image} alt={user!} className="w-32 rounded-full" />
      ) : (
        <CgProfile className="text-9xl text-gray-400" />
      )}
    </div>
  );
};

const InfoProfile = ({
  templates,
  star,
}: {
  templates: number;
  star: number;
}): JSX.Element => {
  return (
    <div className="flex  gap-6 items-start bg-slate-700 p-2 rounded-md">
      <div className="text-white flex gap-3">
        <BiPackage className="text-2xl" />
        {templates}
      </div>

      <div className="flex gap-3">
        <AiFillStar className="text-2xl text-yellow-300" />3
      </div>
    </div>
  );
};

const UserNotFound = ({ data }: { data: string }): JSX.Element => {
  return (
    <div className="w-full h-3/5 flex flex-col justify-center items-center text-white p-5  gap-5">
      <CustomText text={data} />
      <GiThink className="text-white text-7xl" />
      <p className="text-gray-500">Can you check the link?</p>
    </div>
  );
};
