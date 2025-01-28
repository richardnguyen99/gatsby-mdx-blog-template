import React from "react";
import { GatsbyBrowser } from "gatsby";
import Header from "./src/components/header";

import "./src/styles/global.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
    return (
        <>
            <Header />
            {element}
        </>
    )
};
