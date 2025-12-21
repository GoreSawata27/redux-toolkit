import { useSelector } from "react-redux";

export default function ProductsCart() {
  const productsInCart = useSelector((state) => state.products.products);

  const productSummary = productsInCart.reduce((acc, product) => {
    if (acc[product.name]) {
      acc[product.name].quantity += 1;
    } else {
      acc[product.name] = { ...product, quantity: 1 };
    }
    return acc;
  }, {});

  const uniqueProducts = Object.values(productSummary);

  return (
    <div>
      <h2>Cart Items: {productsInCart.length}</h2>
      <ul>
        {uniqueProducts.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
