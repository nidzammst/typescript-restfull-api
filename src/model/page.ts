export type Paging = {
  size: number;
  total_pages: number;
  current_page: number;
};

export type Pageable<T> = {
  data: Array<T>;
  paging: Paging;
};
