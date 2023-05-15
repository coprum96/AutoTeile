import { useMantineTheme, Button, Tooltip, Indicator, Badge, Table } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash } from "tabler-icons-react";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";

const MyOrder = ({ order, index, refetch }) => {
  const theme = useMantineTheme();
  const cartItems = order?.products || [];
  const totalSum = cartItems.reduce((acc, product) => acc + product.total, 0);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const handleDeleteItem = async (id) => {
    const { data } = await axiosPrivate.delete(`${API_URL}orders/${id}`);
    if (data.deletedCount) {
      toast.success("Bestellung erfolgreich entfernt");
      refetch();
    }
  };

  return (
    <>
        <Table
    striped
    highlightOnHover
    withBorder
    withColumnBorders
    horizontalSpacing="xl"
    verticalSpacing="xl"
    fontSize="sm"
    style={{ marginTop: '40px', border: '3px solid black', 
    borderRadius: '4px',
    overflow: 'hidden'
   }}
  >
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Product Name</th>
        <th>Product Code</th>
        <th>Price, in Euro</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {cartItems.map((product, idx) => (
        <tr key={idx}>
          {idx === 0 && (
            <>
              <td rowSpan={cartItems.length}>
                {order._id}
                {!order?.paid ? (
                  <Button
                    variant="light"
                    color="violet"
                    compact
                    onClick={() => navigate(`/dashboard/payment/${product}`)}
                  >
                    Bezahlen
                  </Button>
                ) : (
                  <>
                    <Tooltip
                      label={`Transaction ID:  ${order?.transactionId}`}
                      transition="slide-up"
                      transitionDuration={300}
                      transitionTimingFunction="ease"
                      withArrow
                    >
                      <Indicator size={10} withBorder>
                        <Badge>Schon bezahlt</Badge>
                      </Indicator>
                    </Tooltip>
                  </>
                )}
              </td>
            </>
          )}
          <td color="violet">{product.name}</td>
          <td>{product.artikul}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          <td>{product.total}</td>
        </tr>
      ))}
      <tr>
              <td colSpan={5} style={{ textAlign: "right" }}>
          <strong>Total Sum:</strong>
        </td>
        <td>{order.totalSum}</td>
      </tr>
    </tbody>
  </Table>

    </>
  );
};

export default MyOrder;
