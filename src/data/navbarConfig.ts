type LinkDescription = {
  title: string;
  path: string;
};

export type NavbarConfig = {
  title: string;
  links: Array<LinkDescription>;
};

const navbarConfig: NavbarConfig = {
  title: "Fill that gap",
  links: [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Services",
      path: "/services",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ],
};

export default navbarConfig;
