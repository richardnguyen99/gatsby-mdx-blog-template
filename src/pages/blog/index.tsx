import React from "react";

import { FilterDropdown } from "./filter-dropdown";
import { SortDropdown } from "./sort-dropdown";

export default function Blog() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto pr-4 pl-8 mt-8">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold">Blog</h1>

          <div className="flex items-center justify-between mt-8">
            <h3>All posts</h3>

            <div className="flex items-center gap-2">
              <FilterDropdown />
              <SortDropdown />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

