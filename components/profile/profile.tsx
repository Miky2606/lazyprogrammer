import Image from "next/image";
import { BiPackage } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiThink } from "react-icons/gi";
import { CustomText } from "../custom_text";

export const ImageView = ({
  image,
  user,
}: {
  image?: string;
  user?: string;
}): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 items-center">
      {image ? (
        <Image
          src={image}
          alt={user!}
          width={100}
          height={100}
          className="rounded-full"
          blurDataURL={image}
          placeholder="blur"
          loading="lazy"
        />
      ) : (
        <CgProfile className="text-9xl text-gray-400" />
      )}
    </div>
  );
};

export const InfoProfile = ({
  templates,
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
    </div>
  );
};

export const UserNotFound = ({ data }: { data: string }): JSX.Element => {
  return (
    <div className="w-full h-3/5 flex flex-col justify-center items-center text-white p-5  gap-5">
      <CustomText text={data} />

      <GiThink className="text-white text-7xl" />
      <p className="text-gray-500">Can you check the link?</p>
    </div>
  );
};
