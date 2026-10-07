function SearchBar({
  search,
  setSearch,
  searchInputRef,
  onSearch
}) {
  return (
    <section className="controls">
      <input
        ref={searchInputRef}
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search stationery..."
      />

      <button type="button" onClick={onSearch}>
        Search
      </button>
    </section>
  );
}

export default SearchBar;