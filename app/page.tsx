"use client";
import AddToCart from "@/components/AddToCart";
import Login from "@/components/Login";
import ProductInventory from "@/components/ProductInventory";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-250 mx-auto">
      <Login />
      <hr />
      <AddToCart />
      <hr />
      <ProductInventory />
    </div>
  );
}
