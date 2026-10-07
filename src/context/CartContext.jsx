
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { fetchProducts } from "../services/productService";

const CartContext = createContext(null);

const STORAGE_KEY = "stationery-products";
const CART_STORAGE_KEY = "stationery-cart";

function getSavedData(key) {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [products, setProducts] = useState(() =>
    getSavedData(STORAGE_KEY)
  );

  const [cart, setCart] = useState(() =>
    getSavedData(CART_STORAGE_KEY)
  );

  const [loading, setLoading] = useState(true);

  // Load original products only if no saved inventory exists
  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
      return;
    }

    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Save inventory whenever stock changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
      );
    }
  }, [products]);

  // Save cart whenever its contents change
  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  }, [cart]);

  // Add product and decrease stock
  const addToCart = useCallback(
    (product) => {
      const currentProduct = products.find(
        (item) => item.id === product.id
      );

      if (!currentProduct || currentProduct.quantity <= 0) {
        return false;
      }

      const newQuantity = currentProduct.quantity - 1;

      setProducts((previousProducts) =>
        previousProducts.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: newQuantity,
                available: newQuantity > 0
              }
            : item
        )
      );

      setCart((previousCart) => [
        ...previousCart,
        { ...currentProduct }
      ]);

      return true;
    },
    [products]
  );

  // Remove one item and restore its stock
  const removeFromCart = useCallback(
    (indexToRemove) => {
      const removedProduct = cart[indexToRemove];

      if (!removedProduct) return;

      setProducts((previousProducts) =>
        previousProducts.map((item) =>
          item.id === removedProduct.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                available: true
              }
            : item
        )
      );

      setCart((previousCart) =>
        previousCart.filter(
          (_, index) => index !== indexToRemove
        )
      );
    },
    [cart]
  );

  // Successful checkout: keep stock deducted
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Cancel cart: restore stock for all cart items
  const cancelCart = useCallback(() => {
    setProducts((previousProducts) =>
      previousProducts.map((product) => {
        const removedCount = cart.filter(
          (item) => item.id === product.id
        ).length;

        const quantity = product.quantity + removedCount;

        return {
          ...product,
          quantity,
          available: quantity > 0
        };
      })
    );

    setCart([]);
  }, [cart]);

  // Calculate total
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, product) => total + product.price,
        0
      ),
    [cart]
  );

  const value = useMemo(
    () => ({
      products,
      cart,
      loading,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      cancelCart
    }),
    [
      products,
      cart,
      loading,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      cancelCart
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;