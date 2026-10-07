
import { useState } from "react";

import useCart from "../hooks/useCart";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import { processOrder } from "../services/productService";

function Cart() {
  const {
    cart,
    cartTotal,
    removeFromCart,
    clearCart,
    cancelCart
  } = useCart();

  const [orderStatus, setOrderStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Place an order
  const handleCheckout = async (formData) => {
    try {
      setIsProcessing(true);
      setOrderStatus("");

      const message = await processOrder(cart);

      setOrderStatus(
        `${message} Thank you, ${formData.name}!`
      );

      // Order is successful, so stock stays deducted
      clearCart();
    } catch (error) {
      setOrderStatus(
        error.message || "Unable to place order."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Cancel cart and restore stock
  const handleCancelCart = () => {
    if (isProcessing) return;

    cancelCart();
    setOrderStatus("Cart cancelled. Stock has been restored.");
  };

  return (
    <main>
      <section className="cart-section">
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div id="cartItems">
              {cart.map((product, index) => (
                <CartItem
                  key={`${product.id}-${index}`}
                  product={product}
                  onRemove={() => removeFromCart(index)}
                />
              ))}
            </div>

            <h3>Total: ₹{cartTotal}</h3>
            <p>Items in cart: {cart.length}</p>

            <CheckoutForm
              onSubmit={handleCheckout}
              disabled={isProcessing}
            />

            {isProcessing && (
              <p>Processing your order...</p>
            )}

            <button
              type="button"
              onClick={handleCancelCart}
              disabled={isProcessing}
            >
              Cancel Cart and Restore Stock
            </button>
          </>
        )}

        {orderStatus && (
          <p id="orderStatus" role="status">
            {orderStatus}
          </p>
        )}
      </section>
    </main>
  );
}

export default Cart;