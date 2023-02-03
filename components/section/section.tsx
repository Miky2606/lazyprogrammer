import { ILayout } from "../layout/layout";
interface ISection extends ILayout {
  className?: string;
}

export const Section = ({ children, className }: ISection): JSX.Element => {
  return <section className={`${className} p-4 mt-4 `}>{children} </section>;
};
