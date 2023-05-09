import React, { useState } from "react";
import { Table, NumberInput, Button} from "@mantine/core";
import CustomBadge from "../../Components/CustomBadge";
import Loading from "../../Shared/Loading";
import { useLocation } from "react-router-dom";
import { Minus } from "tabler-icons-react";
import UserDetails from "../../Purchase/UserDetails";

const ShoppingCart = ({ data, isLoading, error }) => {
  const location = useLocation();
  const { selectedProducts = [] } = location.state || {};

  const [cartItems, setCartItems] = useState(selectedProducts);

  const handleQuantityChange = (index, value) => {
    const updatedCartItems = [...cartItems];
    const product = updatedCartItems[index];
    product.quantity = value;
    const price = parseFloat(product.price.replace(',', '.'));
    if (!isNaN(price)) {
      product.total = (product.quantity * price).toFixed(2);
    } else {
      product.total = 0;
    }
    setCartItems(updatedCartItems);
  };

  const handleRemoveProduct = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  if (isLoading) return <div><Loading/>.</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalSum = cartItems.reduce((acc, product) => {
    const productTotal = parseFloat(product.total);
    return !isNaN(productTotal) ? acc + productTotal : acc;
  }, 0);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Artikul</th>
            <th>Price, in €</th>
            <th>Menge</th>
            <th>Sum, in €</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product, index) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.artikul}</td>
              <td>
                <CustomBadge color="violet">€{product.price}</CustomBadge>
              </td>
              <td>
                <NumberInput
                  value={product.quantity}
                  required
                  mt="md"
                  onChange={(value) => handleQuantityChange(index, value)}
                />
              </td>
              <td>
                <CustomBadge color="red" size="lg">€{product.total}</CustomBadge>
              </td>
              <td>
                <Minus
                  color="red"
                  onClick={() => handleRemoveProduct(index)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4"></td>
            <td>Total Sum <CustomBadge color="yellow" size="xl">€{totalSum.toFixed(2)}</CustomBadge></td>
            {/* <td> <UserDetails/> </td> */}
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ShoppingCart;
