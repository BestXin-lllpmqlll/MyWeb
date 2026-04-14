export type PortfolioItem = {
  id: string;
  title: string;
  storedName: string;
};

export type PortfolioMember = {
  id: string;
  name: string;
  emails: string[];
  items: PortfolioItem[];
};

export type PortfolioSection = {
  id: string;
  title: string;
  updatedAt: string;
  members?: PortfolioMember[];
  items?: PortfolioItem[];
};

export const portfolio: PortfolioSection[] = [
  {
    id: "members",
    title: "成员",
    updatedAt: "2026-03-23T00:00:00.000Z",
    members: [
      {
        id: "xinyu",
        name: "辛宇",
        emails: ["220640127@mail.dhu.edu.cn", "lllpmqlll2018@gmail.com"],
        items: [
          {
            id: "xinyu-portfolio",
            title: "作品集",
            storedName: "辛宇作品集.pdf",
          },
        ],
      },
      {
        id: "panjingru",
        name: "潘镜如",
        emails: ["220692209@mail.dhu.edu.cn"],
        items: [
          {
            id: "panjingru-portfolio",
            title: "作品集",
            storedName: "潘镜如作品集.pdf",
          },
        ],
      },
    ],
  },
  {
    id: "commercial",
    title: "商业项目",
    updatedAt: "2026-03-23T00:00:00.000Z",
    items: [
      {
        id: "intern",
        title: "实习作品集",
        storedName: "辛宇 潘镜如 实习作品集.pdf",
      },
    ],
  },
];
