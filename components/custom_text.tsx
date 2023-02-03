interface ICustomText {
  text: string;
  id?: string;
  className?: string;
}

export const CustomText = ({ text, id, className }: ICustomText) => {
  return (
    <div
      className={`${className} bg-clip-text bg-gradient-to-r from-red-500 to-pink-500`}
      id={id}
    >
      <h2 className="text-4xl text-transparent font-extrabold capitalize">
        {text}
      </h2>
    </div>
  );
};
