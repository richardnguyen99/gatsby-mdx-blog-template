import React from "react";
import { type GatsbySSR } from "gatsby";

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
  setPreBodyComponents,
  setHeadComponents,
}) => {
  setHtmlAttributes({
    lang: "en",
    suppressHydrationWarning: true,
  });

  setHeadComponents([
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css"
      integrity="sha512-fHwaWebuwA7NSF5Qg/af4UeDx9XqUpYpOGgubo3yWu+b2IQR4UeQwbb42Ti7gVAjNtVoI/I9TEoYeu9omwcC6g=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />,
  ]);

  setPreBodyComponents([
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{
        __html: /*js*/ `
void function () {
  /**
   * Callback fired when window.__theme was set or updated
   */
  window.__onThemeChange = function () {};

  /**
   * Sets the theme on the <body> element
   * @param {string} newTheme - The new theme to set
   */
  let preferredTheme;
  try {
    preferredTheme = localStorage.getItem("theme");
  } catch (err) { }

  function setTheme(newTheme) {
    const oldTheme = window.__theme;
    const darkOrLight = 
      newTheme === "system" 
        ? (
            window.matchMedia("(prefers-color-scheme: dark)").matches 
            ? "dark" 
            : "light"
          ) 
        : newTheme;

    if (preferredTheme && document.documentElement.classList.contains(preferredTheme) && preferredTheme !== darkOrLight) {
      document.documentElement.classList.replace(preferredTheme, darkOrLight);
    } else {
      document.documentElement.classList.add(darkOrLight);
    }

    window.__theme = newTheme;
    preferredTheme = darkOrLight;
    window.__onThemeChange(darkOrLight);
  }

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (err) {}
  }

  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkQuery.addListener(function (e) {
    window.__setPreferredTheme(e.matches ? "dark" : "light");
  });

  setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"))
}();
        `,
      }}
    />,
  ]);
};
