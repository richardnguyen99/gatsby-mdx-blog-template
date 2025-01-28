import React from "react";
import { GatsbySSR } from "gatsby";

import Header from "./src/components/header";

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({
  element,
}) => {
    return (
        <>
            <Header />
            {element}
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

