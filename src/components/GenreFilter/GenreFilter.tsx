import { GenreFilterProps } from "./types";

export default function GenreFilter({
  filters,
  selectedGenre,
  onGenreChange,
}: GenreFilterProps) {
  return (
    <div className="mb-6 flex justify-end">
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="w-full max-w-xs p-2 border rounded hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
      >
        <option value="">All Genres</option>
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
}
