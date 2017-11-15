import React from "react";
import {Link} from "react-router-dom";
import _ from "lodash";

const calculateTotalPages = (totalItems, pageSize) => Math.ceil(totalItems / pageSize);

const getPages = (totalPages, currentPage) => {
  currentPage = currentPage || 1;
  let startPage, endPage;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 5) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 3 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 3;
      endPage = currentPage + 3;
    }
  }
  return _.range(startPage, endPage + 1);
};

export const setPageWithItems = (items, currentPage, pageSize, totalItems) => {
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  let newItems = Object.keys(items).reduce((arr, key) => ([...arr, {...items[key]}]), []);
  return newItems.slice(startIndex, endIndex + 1);
};

export const Paging = ({urlPrefix, totalItems, currentPage, pageSize}) => {
  const totalPages = calculateTotalPages(totalItems.length, pageSize);
  return (
    <div className="paging">
      <ul className="pages-list">
        <li>
          <Link to={urlPrefix + "?page=" + String(1)}>
            {"<<"}
          </Link>
        </li>
        <li>
          <Link to={urlPrefix + "?page=" + String(currentPage - 1)}

                onClick={e => {
                  if (currentPage === 1) {
                    e.preventDefault();
                  }
                }}>
            {"<"}
          </Link>
        </li>
        {getPages(totalPages, currentPage).map((page, index) =>
          <li key={index}>
            <Link className={`${currentPage === page ? "activePage" : ""}`}
                  to={urlPrefix + "?page=" + String(page)}>{page}</Link>
          </li>
        )}
        <li>
          <Link to={urlPrefix + "?page=" + String(currentPage + 1)}
                onClick={e => {
                  if (currentPage === totalPages) {
                    e.preventDefault();
                  }
                }}>
            {">"}
          </Link>
        </li>
        <li>
          <Link to={urlPrefix + "?page=" + String(totalPages)}>
            {">>"}
          </Link>
        </li>
      </ul>
    </div>
  )
};