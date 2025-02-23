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

const shortCodes: React.ComponentPropsWithRef<
  typeof MDXProvider
>["components"] = {
  table: (props) => <Table {...props} />,

  thead: (props) => <TableHeader {...props} />,

  th: (props) => <TableHead {...props} />,

  tr: (props) => <TableRow {...props} />,

  tbody: (props) => <TableBody {...props} />,

  td: (props) => <TableCell {...props} />,
};

export default shortCodes;
