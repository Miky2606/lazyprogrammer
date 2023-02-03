export interface IViewContent {
  view: JSX.Element;
}

export const ViewContent = ({ view }: IViewContent): JSX.Element => {
  return (
    <div className="w-full h-full text-white  flex flex-col gap-6 items-center p-2">
      {view}
    </div>
  );
};
