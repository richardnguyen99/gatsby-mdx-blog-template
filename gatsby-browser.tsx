import React from "react";
import { GatsbyBrowser } from "gatsby";

import Header from "./src/components/header";
import Footer from "./src/components/footer";

import "./src/styles/global.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return (
    <>
      <Header />
      {element}
      <Footer />
    </>
  );
};
