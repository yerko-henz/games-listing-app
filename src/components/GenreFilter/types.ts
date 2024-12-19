export interface GenreFilterProps {
  filters: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}
