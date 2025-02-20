import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import { RssIcon, LinkExternalIcon, MoonIcon } from "@primer/octicons-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Search from "./search";
import ThemeSwitcher from "./theme-switcher";

const IconLink: React.FC<
  React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>
> = ({ href, children, ...rest }) => (
  <a
    href={href}
    className={buttonVariants({
      variant: "ghost",
      size: "icon",
      className: cn("dark:text-slate-200", "dark:hover:bg-sky-900"),
    })}
    {...rest}
  >
    {children}
  </a>
);

const NavLink: React.FC<GatsbyLinkProps<undefined>> = ({
  to,
  children,
  className,
  activeClassName,
  ref,
  ...rest
}) => (
  <Link
    to={to}
    className={cn(
      buttonVariants({
        variant: "link",
        className: cn(
          className,
          "dark:text-sky-50 dark:hover:text-sky-400",
          activeClassName
        ),
      })
    )}
    {...rest}
  >
    {children}
  </Link>
);

const Header: React.FC = () => (
  <div
    className={cn(
      "sticky top-0 z-5",
      "bg-slate-100 dark:bg-slate-900",
      "border-b border-border dark:border-slate-800"
    )}
  >
    <nav
      className={cn(
        "flex items-center justify-between",
        "px-4 py-2 max-w-3xl mx-auto"
      )}
    >
      <div className="flex items-center gap-2">
        <NavLink to="/">home</NavLink>
        <NavLink to="/blog">blog</NavLink>
        <NavLink to="/about">about</NavLink>
      </div>
      <div className="flex items-center gap-2">
        <Search />

        <IconLink href="#">
          <RssIcon />
        </IconLink>
        <IconLink href="#">
          <LinkExternalIcon />
        </IconLink>

        <ThemeSwitcher />
      </div>
    </nav>
  </div>
);

export default Header;
