import { useState } from "react";

const usePagination = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  //   const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    currentItems,
    itemsPerPage,
    currentPage,
    paginate,
    totalItems: items.length,
  };
};

export default usePagination;
