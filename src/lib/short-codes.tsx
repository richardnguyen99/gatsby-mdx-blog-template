import React from "react";
import { MDXProvider } from "@mdx-js/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Callout from "@/components/callout";

const shortCodes: React.ComponentPropsWithRef<
  typeof MDXProvider
>["components"] = {
  // Overriding the default components
  table: (props) => <Table {...props} />,

  thead: (props) => <TableHeader {...props} />,

  th: (props) => <TableHead {...props} />,

  tr: (props) => <TableRow {...props} />,

  tbody: (props) => <TableBody {...props} />,

  td: (props) => <TableCell {...props} />,

  // Passing any additional components to MDX
  Callout,
};

export default shortCodes;
