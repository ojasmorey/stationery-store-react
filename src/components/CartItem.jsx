function CartItem({ product, onRemove }) {
  return (
    <div className="cart-item">
      <span>
        {product.name} - ₹{product.price}
      </span>

      <button
        type="button"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;