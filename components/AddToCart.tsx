import { addToCart, editItem, removeFromCart } from "@/store/features/cart/cartSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    <div className="flex flex-col gap-2">
      <h1>Cart Example</h1>

      <Input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter product name"
      />

      {updatingId ? (
        <Button onClick={handleUpdate}>Update</Button>
      ) : (
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      )}

      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name}
            <Button onClick={() => handleEditClick(item)}>Edit</Button>
            <Button onClick={() => dispatch(removeFromCart({ id: item.id }))}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddToCart;
