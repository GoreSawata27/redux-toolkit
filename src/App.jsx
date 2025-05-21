import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./features/cart/cartSlice";

function App() {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handelAddToCart = () => {
    if (!item) return alert("Add a product name");
    const checkDuplicate = cartItems.some((items) => items.name === item);

    if (checkDuplicate) return alert("product already added ");

    const newProduct = {
      id: Date.now(),
      name: item,
    };

    dispatch(addToCart(newProduct));
    setItem("");
  };

  return (
    <div>
      <h1>Cart Example</h1>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={handelAddToCart}>Add Apple to Cart</button>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => dispatch(removeFromCart({ id: item.id }))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
