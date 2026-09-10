export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}