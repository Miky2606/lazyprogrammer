export type template_type = "web" | "app" | "file";

export interface ITemplate {
  id: string;
  name: string;
  autor: string;
  description: string;
  code: string;
  type: template_type;
  star: number;
  downloads: number;
  created: Date;
  modified: Date;
}

export const template_fake: ITemplate[] = [
  {
    id: "1",
    name: "React",
    autor: "Jonathan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nihil, ab commodi eveniet explicabo corrupti sunt consequuntur corporis eum at quos quas nam quaerat laudantium, dignissimos tempore. Voluptates, ipsa sed?",
    code: "react",
    type: "web",
    star: 5,
    downloads: 1200,
    created: new Date(),
    modified: new Date(),
  },
  {
    id: "2",
    name: "NextJS",
    autor: "Jonathan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nihil, ab commodi eveniet explicabo corrupti sunt consequuntur corporis eum at quos quas nam quaerat laudantium, dignissimos tempore. Voluptates, ipsa sed?",
    code: "nextjs",
    type: "web",
    star: 5,
    downloads: 1200,
    created: new Date(),
    modified: new Date(),
  },
  {
    id: "3",
    name: "Tailwind Nextjs",
    autor: "Jonathan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nihil, ab commodi eveniet explicabo corrupti sunt consequuntur corporis eum at quos quas nam quaerat laudantium, dignissimos tempore. Voluptates, ipsa sed?",
    code: "tailwind-nextjs",
    type: "web",
    star: 5,
    downloads: 1200,
    created: new Date(),
    modified: new Date(),
  },
];
