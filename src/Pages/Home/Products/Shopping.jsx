import React, { useState } from 'react';
import { Container, Grid, useMantineTheme, Button } from '@mantine/core';
import useParts from '../../../Hooks/useParts';
import Loading from '../../Shared/Loading';
import SectionTitle from '../../Shared/SectionTitle';
import Product from '../Products/Product';

const Shopping = () => {
  const theme = useMantineTheme();
  const { products, isLoading, error } = useParts();
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const { artikul, price } = product;
    setCartItems([...cartItems, { article: artikul, price }]);
  };
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  const handlePlaceOrder = () => {
    console.log(cartItems);
    alert('Order placed successfully!');
    setCartItems([]);
  };

  if (isLoading) return <Loading />;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Container mb={theme.spacing.md * 2}>
      <SectionTitle mb="sm">Warenkorb</SectionTitle>
      <Grid>
      {cartItems.map((item, index) => (
  <Product key={index} item={item} handleAddToCart={handleAddToCart} />
))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: theme.spacing.md }}>
      </div>
      <Container size="xl" px="md" mt={theme.spacing.md * 2}>
        <p>{cartItems.reduce((total, item) => total + item.price, 0)} €</p>
        <Button
          variant="outline"
          color="red"
          onClick={() => setCartItems([])}
          disabled={cartItems.length === 0}
          style={{ marginTop: theme.spacing.md }}
        >
          Warenkorb leeren
        </Button>
        <Button
          color="blue"
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          style={{ marginTop: theme.spacing.md }}
        >
          Bestellen
        </Button>
      </Container>
    </Container>
  );
};

export default Shopping;
