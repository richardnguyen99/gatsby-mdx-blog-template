
import React from "react";

const Footer: React.FC = () => (
  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="#"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="#"
      target="_blank"
      rel="noopener noreferrer"
    >
      Examples
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="#"
      target="_blank"
      rel="noopener noreferrer"
    >
      Go to →
    </a>
  </footer>
);

export default Footer;
