import Link from "next/link";

export const NotFound = (): JSX.Element => {
  return (
    <div className=" flex flex-col text-3xl justify-center items-center w-full  h-1/2 mt-10  absolute text-center gap-5">
      <div className="text-white text-5xl ">Not Found</div>
      <Link
        href={"/"}
        className="text-xs text-red-500 cursor-pointer hover:text-gray-400 hover:text-opacity-40"
      >
        Go Home
      </Link>
    </div>
  );
};
