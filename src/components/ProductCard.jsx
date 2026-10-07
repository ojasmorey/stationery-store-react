import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  const isAvailable = product.quantity > 0;

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.quantity}</p>

      <p className={isAvailable ? "available" : "unavailable"}>
        {isAvailable ? "Available" : "Out of Stock"}
      </p>

      <button
        type="button"
        onClick={() => onAddToCart(product)}
        disabled={!isAvailable}
      >
        {isAvailable ? "Add to Cart" : "Out of Stock"}
      </button>

      <p>
        <Link to={`/products/${product.id}`}>View Details</Link>
      </p>
    </div>
  );
}

export default ProductCard;