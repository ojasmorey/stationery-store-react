
import {
  useMemo,
  useRef,
  useState
} from "react";

import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import useCart from "../hooks/useCart";

function HomePage() {
  const { products, loading, addToCart } = useCart();

  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return products;

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
      );
    });
  }, [products, search]);

  const handleSearch = () => {
    searchInputRef.current?.focus();
  };

  return (
    <main>
      <SearchBar
        search={search}
        setSearch={setSearch}
        searchInputRef={searchInputRef}
        onSearch={handleSearch}
      />

      <section>
        <h2>Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <ProductList
            products={filteredProducts}
            onAddToCart={addToCart}
          />
        )}
      </section>
    </main>
  );
}

export default HomePage;