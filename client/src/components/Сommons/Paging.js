import React from "react";
import {Link} from "react-router-dom";
import _ from "lodash";

const calculateTotalPages = (totalItems, pageSize) => Math.ceil(totalItems / pageSize);

const getPages = (totalPages, currentPage) => {
  currentPage = currentPage || 1;
  let startPage, endPage;
  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 10) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }
  return _.range(startPage, endPage + 1);
};

export const setPageWithItems = (items, currentPage, pageSize, totalItems) =>{
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  let newItems = Object.keys(items).reduce((arr, key) => ([...arr, { ...items[key] }]), []);
  return newItems.slice(startIndex, endIndex + 1);
};

export const Paging = ({urlPrefix, totalItems, currentPage, pageSize}) => {
  // console.log(currentPage, totalItems.length);
  const totalPages = calculateTotalPages(totalItems.length, pageSize);
  return (
    <div className="paging">
      <ul className="pages-list">
        <li>
          <Link to={urlPrefix + "?page=" + String(1)} className="link-for-page">
            First
          </Link>
        </li>
        <li>
          <Link to={urlPrefix + "?page=" + String(currentPage - 1)}
                className="link-for-page"
                onClick={e => {
                  if (currentPage === 1) {
                    e.preventDefault()
                  }
                }}>
            Previous
          </Link>
        </li>
        {getPages(totalPages, currentPage).map((page, index) =>
          <li key={index}>
            <Link to={urlPrefix + "?page=" + String(page)}>{page}</Link>
          </li>
        )}
        <li>
          <Link to={urlPrefix + "?page=" + String(currentPage + 1)} className="link-for-page"
                onClick={e => {
                  if (currentPage === totalPages) {
                    e.preventDefault();
                  }
                }}>
            Next
          </Link>
        </li>
        <li>
          <Link to={urlPrefix + "?page=" + String(totalPages)}
                className="link-for-page">
            Last
          </Link>
        </li>
      </ul>
    </div>
  )
};