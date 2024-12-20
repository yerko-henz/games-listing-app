export interface PaginationProps {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  gamesLength: number;
}
