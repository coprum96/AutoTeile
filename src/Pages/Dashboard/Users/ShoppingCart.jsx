import React, { useState, useEffect } from "react";
import { Table, NumberInput, Button, Container } from "@mantine/core";
import CustomBadge from "../../Components/CustomBadge";
import Loading from "../../Shared/Loading";
import { useLocation, Link } from "react-router-dom";
import { Minus } from "tabler-icons-react";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SectionTitle from "../../Shared/SectionTitle";
import {ShoppingCartPlus} from "tabler-icons-react";

const ShoppingCart = ({ isLoading, error }) => {
  const location = useLocation();
  const { selectedProducts = [] } = location.state || {};

  const [cartItems, setCartItems] = useState(selectedProducts);

  const [user] = useAuthState(auth);
  const userId = user ? user.uid : null;
  const [localStorageWorking, setLocalStorageWorking] = useState(false);


  useEffect(() => {
    if (userId) {
      const savedData = JSON.parse(localStorage.getItem(userId));
      if (savedData && savedData.length) {
        setCartItems(savedData);
        setLocalStorageWorking(true);
      }
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(userId, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const handleQuantityChange = (index, value) => {
    const updatedCartItems = [...cartItems];
    const product = updatedCartItems[index];
    product.quantity = value;
    const price = parseFloat(product.price.replace(",", "."));
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

  const handleClearCart = () => {
    setCartItems([]);
    setLocalStorageWorking(false);
  };

  const handleSendToBackend = async (email) => {
    try {
      const currentDate = new Date().toLocaleDateString('en-GB'); // Format the current date as "DD/MM/YYYY"
      const order = {
        email: email,
        products: cartItems.map((product) => ({
          name: product.name,
          artikul: product.artikul,
          price: product.price,
          quantity: product.quantity,
          total: product.total,
        })),
        totalSum: totalSum,
        date: currentDate, // Add the formatted date to the order
      };
      console.log('Sending cart items to backend:', order);
      const { data } = await axiosPrivate.post(`${API_URL}orders`, order);
      if (data.success) {
        toast.success("Bestellung erfolgreich aufgegeben");
      }
      if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log("Error sending data to backend:", error);
      toast.error("Error sending data to backend");
    }
    handleClearCart();
  };
  
  
  
  if (isLoading) return <div><Loading/>.</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalSum = cartItems.reduce((acc, product) => {
    const productTotal = parseFloat(product.total);
    return !isNaN(productTotal) ? acc + productTotal : acc;
  }, 0);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {localStorageWorking ? (
        <Container size="xl" px="sm">
          <SectionTitle><ShoppingCartPlus
          size={60}
          strokeWidth={2}
          color={'#408abf'}/></SectionTitle>
          <Table
            striped
            highlightOnHover
            withBorder
            withColumnBorders
            horizontalSpacing="xl"
            verticalSpacing="xl"
            fontSize="sm"
          >
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
                      description="Wie viel brauchst du?"
                      required
                      radius="md"
                      size="sm"
                      withAsterisk
                      mt="md"
                      onChange={(value) => handleQuantityChange(index, value)}
                    />
                  </td>
                  <td>
                    <CustomBadge color="red" size="lg">
                      €{product.total}
                    </CustomBadge>
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
                <td>
                  Total Sum{" "}
                  <CustomBadge color="yellow" size="xl">
                    €{totalSum.toFixed(2)}
                  </CustomBadge>
                </td>
              </tr>
            </tbody>
          </Table>
          <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      padding: "10px",
                    }}
                  >

          <Button  variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                      size="lg"
          onClick={() => handleSendToBackend(user.email)}>
            Bestellung aufgeben
          </Button>
                  </div>
        </Container>
        ) : (
        <Button 
        radius="lg" size="lg" color="blue"
        component={Link} to="/parts">Suche oder wähl dir Teile</Button>
        )}
    </div>
  );
  
};

export default ShoppingCart;
