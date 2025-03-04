/**
 * Pagination Component
 * 
 * This component provides a user interface for navigating between pages of content.
 * It displays the current page, total pages, and allows users to navigate to specific pages
 * directly or move to the previous/next page.
 * 
 * Features:
 * - Previous and Next buttons for sequential navigation
 * - Direct page selection with numbered buttons
 * - Responsive design that adapts to different screen sizes
 * - Visual indicators for the current page
 * - Disabled states for buttons when at the first or last page
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.currentPage - The current active page
 * @param {number} props.totalPages - The total number of pages available
 * @param {function} props.onPageChange - Callback function when page is changed
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  /**
   * Generates an array of page numbers to display in the pagination
   * Shows a limited number of pages with ellipsis for large page counts
   * 
   * @returns {(number|string)[]} Array of page numbers and ellipsis indicators
   */
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // For small number of pages, show all pages
    if (totalPages <= 7) {
      for (let i = 2; i < totalPages; i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
      return pageNumbers;
    }
    
    // For larger number of pages, show a subset with ellipsis
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    
    // Pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    
    // Always show last page if more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      {/* Previous page button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="border-2 hover:bg-blue-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-all duration-300"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      
      {/* Page number buttons */}
      <div className="flex flex-wrap justify-center gap-2 mx-2">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === 'number' ? (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 p-0 ${
                  currentPage === page 
                    ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" 
                    : "border-2 hover:bg-blue-50 dark:hover:bg-gray-800 dark:border-gray-700"
                } transition-all duration-300`}
              >
                {page}
              </Button>
            ) : (
              <span className="flex items-center justify-center w-10 h-10">...</span>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Next page button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="border-2 hover:bg-blue-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-all duration-300"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
      
      {/* Current page indicator */}
      <span className="text-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-md ml-2 dark:text-gray-200">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}