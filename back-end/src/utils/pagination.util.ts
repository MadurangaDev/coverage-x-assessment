import { IPaginationMetaData } from "@responses";

interface ICreatePaginationMetaDataProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
}

export const createPaginationMetaData = ({
  totalItems,
  pageSize,
  currentPage,
}: ICreatePaginationMetaDataProps): IPaginationMetaData => {
  const totalPages = pageSize ? Math.ceil(totalItems / pageSize) : 1;
  return {
    total_items: totalItems,
    page_size: pageSize ?? totalItems,
    total_pages: totalPages,
    page: currentPage,
    has_next_page: pageSize ? currentPage < totalPages : false,
    has_prev_page: pageSize ? currentPage > 1 : false,
  };
};
