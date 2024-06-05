type LinkDescription = {
  title: string;
  path: string;
};

export type NavbarConfig = {
  title: string;
  links: Array<LinkDescription>;
};

const navbarConfig: NavbarConfig = {
  title: "Fill that gap please",
  links: [
    {
      title: "Home",
      path: "/",
    },
  ],
};

export default navbarConfig;
