interface ICustomText {
  text: string;
  id?: string;
  className?: string;
}

export const CustomText = ({ text, id, className }: ICustomText) => {
  return (
    <div
      className={`${className} bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-pink-500 to-green-700 animate-move`}
      id={id}
    >
      <h2 className="text-4xl text-transparent font-extrabold capitalize ">
        {text}
      </h2>
    </div>
  );
};
