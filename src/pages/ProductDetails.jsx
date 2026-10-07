
import { Link, useParams, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, loading, addToCart } = useCart();

  if (loading) {
    return <main><p>Loading product details...</p></main>;
  }

  const product = products.find(
    (item) => item.id === Number(productId)
  );

  if (!product) {
    return (
      <main>
        <p>Product not found.</p>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  const isAvailable = product.quantity > 0;

  return (
    <main>
      <p><Link to="/">← Back to Products</Link></p>

      <section className="product-card">
        <h2>{product.name}</h2>
        <p>Product ID: {product.id}</p>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price}</p>
        <p>Stock: {product.quantity}</p>

        <p className={isAvailable ? "available" : "unavailable"}>
          {isAvailable ? "Available" : "Out of Stock"}
        </p>

        <button
          type="button"
          disabled={!isAvailable}
          onClick={() => addToCart(product)}
        >
          {isAvailable ? "Add to Cart" : "Out of Stock"}
        </button>

        <p>
          <button
            type="button"
            onClick={() => navigate("/cart")}
          >
            View Cart
          </button>
        </p>
      </section>
    </main>
  );
}

export default ProductDetails;