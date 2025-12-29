import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/home/home";
import ProductsPage from "@/pages/products/products";
import ReelsPage from "@/pages/reels/reels";
import CartPage from "@/pages/cart/cart";
import WishlistPage from "@/pages/wishlist/wishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductsPage /> },
      { path: "reels", element: <ReelsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
