import Link from "next/link";
import { AiFillLinkedin } from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";
import { FiLink2 } from "react-icons/fi";
export const Footer = () => {
  return (
    <div className="fixed flex justify-center items-center bottom-0 w-full h-16 bg-gray-500 backdrop-blur-sm bg-opacity-40 ">
      <div className="flex justify-between items-center w-full px-7 text-white">
        <h1 className="hidden lg:block">LazyTemps</h1>
        <p>Copyright &copy; {new Date().getFullYear()}</p>
        <ul className="flex gap-3">
          <li className="hover:scale-125 hover:text-blue-500 cursor-pointer text-gray-500 text-2xl transition-all ease duration-150">
            <Link
              href={"https://www.linkedin.com/in/jonathan-garcia-2509771b3/"}
              target="_blank"
            >
              <AiFillLinkedin />
            </Link>
          </li>
          <li className="hover:scale-125 hover:text-green-500 cursor-pointer text-gray-500 text-2xl transition-all ease duration-150">
            <Link href={"https://jonathangarcnunez.com/"} target="_blank">
              <FiLink2 />
            </Link>
          </li>
          <li className="hover:scale-125 hover:text-yellow-500 cursor-pointer text-gray-500 text-2xl transition-all ease duration-150">
            <Link
              href={"https://www.buymeacoffee.com/miky2606"}
              target="_blank"
            >
              <BiCoffeeTogo />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
