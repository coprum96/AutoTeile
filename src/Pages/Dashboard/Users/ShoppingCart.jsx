import React, { useState, useEffect } from "react";
import { Table, NumberInput, Button } from "@mantine/core";
import CustomBadge from "../../Components/CustomBadge";
import Loading from "../../Shared/Loading";
import { useLocation } from "react-router-dom";

const ShoppingCart = ({ data, isLoading, error }) => {
  const location = useLocation();
  const { selectedProducts } = location.state;

  const [cartItems, setCartItems] = useState(selectedProducts);

  const handleQuantityChange = (index, value) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = value;
    setCartItems(updatedCartItems);
  };

  const handleRemoveProduct = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  if (isLoading) return <div><Loading/>.</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Artikul</th>
          <th>Price, in €</th>
          <th>Min</th>
          <th>Menge</th>
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
              <CustomBadge color="red">{product.minimumQuantity}</CustomBadge>
            </td>
            <td>
              <NumberInput
                variant="unstyled"
                value={product.quantity}
                required
                mt="md"
                onChange={(value) => handleQuantityChange(index, value)}
              />
            </td>
            <td>
              <Button
                variant="outline"
                color="red"
                onClick={() => handleRemoveProduct(index)}
              >
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ShoppingCart;
