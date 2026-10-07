export async function fetchProducts() {
  const response = await fetch("/products.json");

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  const products = await response.json();

  return products;
}

export function getProductById(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetchProducts()
        .then((products) => {
          const product = products.find(
            (item) => item.id === productId
          );

          if (product) {
            resolve(product);
          } else {
            reject(new Error("Product not found"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    }, 500);
  });
}

export function processOrder(cart) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!cart || cart.length === 0) {
        reject(
          new Error("Cart is empty. Add products first.")
        );
        return;
      }

      resolve("Order placed successfully!");
    }, 1500);
  });
}