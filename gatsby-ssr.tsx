import React from "react";
import { GatsbySSR } from "gatsby";

import Header from "./src/components/header";
import Footer from "./src/components/footer";

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element }) => {
  return (
    <>
      <Header />
      {element}
      <Footer />
    </>
  );
};

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({
    lang: "en",
    className: "dark",
  });
};
