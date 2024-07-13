import React, { useState } from "react";
import ConvertToValueUsedForCondition from "../../hooks/ConvertToValueUsedForCondition";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    }
  };

  const box_classes = "p-1 w-8 h-8 rounded flex justify-center items-center";

  // Function to generate an array of page numbers to display
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 2; // Maximum number of visible page numbers

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const middlePage = Math.max(2, Math.min(currentPage, totalPages - 1));
      const startPage = Math.max(
        1,
        middlePage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pageNumbers.push(1, null); // Show first page and ellipsis
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        pageNumbers.push(null, totalPages); // Show ellipsis and last page
      }
    }

    return pageNumbers;
  };

  const threeDotStyles = {
    backgroundColor: "white",
    padding: 0,
    width: "15px",
  };

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mr-2 ${box_classes}
        transition-all
       ${
         ConvertToValueUsedForCondition(currentPage) === "1"
           ? "bg-gray-100 "
           : "cursor-pointer bg-gray-200 hover:bg-gray-300"
       }
        `}
      >
        <img
          src={require(`../../assets/icons/previousIcon_s.png`)}
          alt=""
          width={15}
          height={15}
        />
      </button>

      <ul className="flex gap-2">
        {generatePageNumbers().map((pageNumber, index) => (
          <li
            key={index}
            className={`${box_classes} transition-all  ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            style={pageNumber === null ? threeDotStyles : null}
            onClick={() => pageNumber !== null && handlePageChange(pageNumber)}
          >
            {pageNumber === null ? "..." : pageNumber}
          </li>
        ))}
      </ul>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${box_classes} ml-2 
        transition-all
        ${
          ConvertToValueUsedForCondition(currentPage) ===
          ConvertToValueUsedForCondition(totalPages)
            ? "bg-gray-100 text-gray-300"
            : "cursor-pointer bg-gray-200 hover:bg-gray-300"
        }`}
      >
        <img
          src={require("../../assets/icons/nextIcon_s.png")}
          alt=""
          width={15}
          height={15}
        />
      </button>
    </div>
  );
};

export default Pagination;
