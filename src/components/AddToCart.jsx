import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editItem, removeFromCart } from "../features/cart/cartSlice";

function AddToCart() {
  const [item, setItem] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    if (!item.trim()) return alert("Add a product name");

    const isDuplicate = cartItems.some((i) => i.name.toLowerCase() === item.trim().toLowerCase());

    if (isDuplicate) return alert("Product already added");

    const newProduct = {
      id: Date.now(),
      name: item.trim(),
    };

    dispatch(addToCart(newProduct));
    setItem("");
  };

  const handleEditClick = (item) => {
    setItem(item.name);
    setUpdatingId(item.id);
  };

  const handleUpdate = () => {
    if (!item.trim()) return alert("Enter a name to update");

    dispatch(editItem({ id: updatingId, name: item.trim() }));
    setItem("");
    setUpdatingId(null);
  };

  return (
    <div>
      <h1>Cart Example</h1>

      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="Enter product name" />

      {updatingId ? <button onClick={handleUpdate}>Update</button> : <button onClick={handleAddToCart}>Add to Cart</button>}

      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleEditClick(item)}>Edit</button>
            <button onClick={() => dispatch(removeFromCart({ id: item.id }))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddToCart;
