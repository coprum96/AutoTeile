import React from "react";
import { Table, NumberInput, Button } from "@mantine/core";
import CustomBadge from "../../Components/CustomBadge";
import useAllTeile from "../../../Hooks/useAllTeile";

const ShoppingCart = ({ removeProduct }) => {
    const { products: allProducts, isLoading, error } = useAllTeile();
  
    const handleRemoveProduct = (index) => {
      removeProduct(index);
    };
  
    if (isLoading) return <div>Loading...</div>;
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
        {allProducts.map((product, index) => (
          <tr key={index}>
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
