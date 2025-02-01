import React, { useCallback } from "react";
import {
  DropdownMenuArrow,
} from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  currentFilter?: string;
  items: {
    id: string;
    label: string;
    value: string;
  }[];
};

export function FilterDropdown(props: Props) {
  const { items, currentFilter } = props;
  const [filter, setFilter] = React.useState(currentFilter);

  const handleChange = useCallback((value: string) => {
    setFilter(value);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full cursor-pointer">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom" align="end">
        <DropdownMenuLabel>Filter on category</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value={filter} onValueChange={handleChange}>
          {items.map(({ id, label, value }) => (
            <DropdownMenuRadioItem key={id} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuArrow className="dropdown-arrow" width="16" height="8" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
