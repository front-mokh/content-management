import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  dictionary,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always add page 1
      pages.push(1);

      // Add ellipsis if needed
      if (showEllipsisStart) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (showEllipsisEnd) {
        pages.push(-2); // -2 represents ellipsis (different key from start)
      }

      // Always add last page if not already added
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-1 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="sr-only">
          {dictionary.mediaLibrary.previous || "Previous"}
        </span>
      </Button>

      {getPageNumbers().map((page) => {
        if (page < 0) {
          return (
            <span key={page} className="px-2">
              ...
            </span>
          );
        }

        return (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={
              page === currentPage ? "bg-website-primary text-white" : ""
            }
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center"
      >
        <ChevronRight className="w-4 h-4" />
        <span className="sr-only">
          {dictionary.mediaLibrary.next || "Next"}
        </span>
      </Button>
    </div>
  );
}
