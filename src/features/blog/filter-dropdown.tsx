import React, { useCallback } from "react";
import { navigate } from "gatsby";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";

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

  const handleChange = useCallback((value: string) => {
    if (value === "all") {
      navigate(`/blog`, {
        replace: false,
      });
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.set("filter", value);

    navigate(`?${searchParams}`, {
      replace: false,
    });
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

        <DropdownMenuRadioGroup value={currentFilter} onValueChange={handleChange}>
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
