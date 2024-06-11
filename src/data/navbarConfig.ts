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
      title: "Explore",
      path: "/explore",
    },
    {
      title: "My Flats",
      path: "/my-flats",
    },
    {
      title: "My Applications",
      path: "/my-applications",
    }
  ],
};

export default navbarConfig;
