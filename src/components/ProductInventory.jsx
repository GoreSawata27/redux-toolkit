import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCard } from "../features/products/productSlice";
import ProductsCart from "./ProductsCart";

export default function ProductInventory() {
  const [productInventory, setProductInventory] = useState([]);
  const [productsDetails, setProductDetails] = useState({
    name: "",
    price: 0,
    stock: 0,
  });

  const dispatch = useDispatch();

  const handelChangeValues = (e) => {
    setProductDetails((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handelCreateProduct = (e) => {
    e.preventDefault();

    const isDuplicate = productInventory.some((prod) => prod.name === productsDetails.name);

    if (isDuplicate) return alert("Product already added");

    if (!productsDetails.name) return alert("Please fill all details");

    const newItem = {
      id: Date.now(),
      name: productsDetails.name,
      price: productsDetails.price,
      stock: productsDetails.stock,
    };
    setProductInventory((prev) => [...prev, newItem]);
  };

  return (
    <div>
      <div className="header">
        <h1>product Inventory</h1> - <ProductsCart />
      </div>
      <form onSubmit={handelCreateProduct}>
        <div className="from-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={productsDetails.name}
            name="name"
            onChange={(e) => handelChangeValues(e)}
            placeholder="Name of product"
          />
        </div>
        <div className="from-field">
          <label htmlFor="name">Price</label>
          <input
            type="number"
            value={productsDetails.price}
            onChange={(e) => handelChangeValues(e)}
            name="price"
            placeholder="Name of product"
            min={0}
          />
        </div>
        <div className="from-field">
          <label htmlFor="name">Stock</label>
          <input
            type="number"
            value={productsDetails.stock}
            onChange={(e) => handelChangeValues(e)}
            name="stock"
            placeholder="Name of product"
            min={0}
          />
        </div>
        <input type="submit" value="create a product" />
      </form>
      <h3> Products</h3>
      <ul className="products-list">
        {productInventory?.map((product, i) => (
          <li key={i}>
            <p>Name : {product.name} </p>
            <p>Price : {product.price} </p>
            <p>Stock : {product.stock} </p>

            <button onClick={() => dispatch(addProductToCard(product))}>Add to card</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
