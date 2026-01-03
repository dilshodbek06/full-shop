import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/home/home";
import ProductsPage from "@/pages/products/products";
import ReelsPage from "@/pages/reels/reels";
import CartPage from "@/pages/cart/cart";
import WishlistPage from "@/pages/wishlist/wishlist";
import DiscountsPage from "@/pages/discounts/discounts";
import ProfilePage from "@/pages/profile/profile";
import OrdersPage from "@/pages/orders/orders";
import ProfileDetailsPage from "@/pages/profile/profile-details";
import AddressesPage from "@/pages/profile/addresses";
import AddressFormPage from "@/pages/profile/address-form";
import PromoCodesPage from "@/pages/profile/promocodes";
import ProductDetailPage from "@/pages/products/product-detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductsPage /> },
      { path: "discounts", element: <DiscountsPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "reels", element: <ReelsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/details", element: <ProfileDetailsPage /> },
      { path: "profile/addresses", element: <AddressesPage /> },
      { path: "profile/addresses/new", element: <AddressFormPage /> },
      { path: "profile/promocodes", element: <PromoCodesPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
