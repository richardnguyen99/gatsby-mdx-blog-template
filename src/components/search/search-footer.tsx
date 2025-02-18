import React, { type JSX } from "react";
import { CornerDownLeft, MoveDown, MoveUp } from "lucide-react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

function Kbd(props: { children: React.ReactNode }) {
  return <kbd className="ais-kbd">{props.children}</kbd>;
}

function SearchFooter(): JSX.Element {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
    },
  });

  const img = cld
    .image("gatsby-icon")
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(24).height(24));

  return (
    <div className="ais-footer">
      <div className="ais-logo">
        Powered by
        <AdvancedImage cldImg={img} alt="Gatsby Icon" />
      </div>

      <ul className="ais-commands">
        <li className="ais-command">
          <Kbd>
            <CornerDownLeft />
          </Kbd>
          to select
        </li>
        <li className="ais-command">
          <Kbd>
            <MoveDown />
          </Kbd>
          <Kbd>
            <MoveUp />
          </Kbd>
          to navigate
        </li>
        <li className="ais-command">
          <Kbd>Esc</Kbd>
          to close
        </li>
      </ul>
    </div>
  );
}

export default SearchFooter;
