import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import type { NavbarConfig } from "@/data/navbarConfig";

const exampleConfig: NavbarConfig = {
  title: "TITLE",
  links: [
    {
      title: "T1",
      path: "P1",
    },
    {
      title: "T2",
      path: "P2",
    },
  ],
};

describe("Navbar", () => {
  test("renders the title", () => {
    render(<Navbar navConfig={exampleConfig} />);
    expect(screen.getByText("TITLE2")).toBeInTheDocument();
  });
});
