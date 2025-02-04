import React from "react";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  rootUrl: string;
  queryName?: string;
  searchParams?: URLSearchParams;
};

export function Pagination({
  currentPage,
  totalPages,
  rootUrl,
  className,
  searchParams: currentSearchParams,
  queryName = "page",
  ...rest
}: React.ComponentProps<"nav"> & Props) {

  const pageUrl = (pageNumber: number) => {
    const searchParams = new URLSearchParams(currentSearchParams);
    if (searchParams.has(queryName)) {
      searchParams.delete(queryName);
    }

    searchParams.set(queryName, pageNumber.toString());

    return `${rootUrl}?${searchParams}`;
  };

  return (
    <PaginationRoot className={className} {...rest}>
      <PaginationContent>
        <PaginationItem>
          {currentPage === 1 ? (
            <PaginationPrevious to={pageUrl(1)} aria-disabled />
          ) : (
            <PaginationPrevious to={pageUrl(currentPage - 1)} />
          )}
        </PaginationItem>

        <PaginationItem>
          <PaginationLink to={pageUrl(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>

        {currentPage - 2 > 1 && <PaginationEllipsis />}

        {Array.from({ length: 3 }, (_, i) => i + currentPage - 1).map((i) =>
          i > 1 && i < totalPages ? (
            <PaginationItem key={i}>
              <PaginationLink to={pageUrl(i)} isActive={currentPage === i}>
                {i}
              </PaginationLink>
            </PaginationItem>
          ) : null
        )}

        {currentPage + 2 < totalPages && <PaginationEllipsis />}

        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              to={pageUrl(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          {currentPage === totalPages ? (
            <PaginationNext to={pageUrl(totalPages)} aria-disabled />
          ) : (
            <PaginationNext to={pageUrl(currentPage + 1)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

export default Pagination;
