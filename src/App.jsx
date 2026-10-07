import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import StoreLayout from "./components/StoreLayout";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent route */}
        <Route path="/" element={<StoreLayout />}>
          {/* Default child route */}
          <Route index element={<HomePage />} />

          {/* Product details with route parameter */}
          <Route
            path="products/:productId"
            element={<ProductDetails />}
          />

          {/* Shopping cart */}
          <Route path="cart" element={<Cart />} />

          {/* Unknown routes */}
          <Route
            path="*"
            element={
              <main>
                <h2>404 - Page Not Found</h2>
                <Link to="/">Back to Home</Link>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;