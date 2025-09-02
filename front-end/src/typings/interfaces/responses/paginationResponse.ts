export interface IPaginationMetaData {
  total_items: number;
  page_size: number;
  total_pages: number;
  page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export interface IPaginatedResponse<T> {
  data: T | null;
  pagination: IPaginationMetaData;
}
