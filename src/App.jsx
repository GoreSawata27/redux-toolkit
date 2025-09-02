import "./App.css";
import AddToCart from "./components/AddToCart";
import Login from "./components/Login";
import ProductInventory from "./components/ProductInventory";

export default function App() {
  return (
    <main className="App">
      <Login />
      <hr />
      <AddToCart />
      <hr />
      <ProductInventory />
    </main>
  );
}
