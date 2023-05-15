import { useMantineTheme, Button, Tooltip, Indicator, Badge, Table } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBadgeDown, ArrowBadgeUp } from 'tabler-icons-react';

const MyOrder = ({ order, index, refetch }) => {
  const theme = useMantineTheme();
  const cartItems = order?.products || [];
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const toggleOpened = () => {
    setOpened(!opened);
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
        style={{
          marginTop: '40px',
          border: '3px solid black',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <thead>
          <tr onClick={toggleOpened}>
            <th>
              <Button
                variant="light"
                color="blue"
                compact
                onClick={toggleOpened}
              > 
                {opened ? <ArrowBadgeDown /> : <ArrowBadgeUp />}
              </Button>
            </th>
            <th>Product Name</th>
            <th>Product Code</th>
            <th>Price, in Euro</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1} style={{ fontSize: "20px" }}>
              {order._id}
              {!order?.paid ? (
                <Button
                  variant="light"
                  color="violet"
                  compact
                  onClick={() => navigate(`/dashboard/payment/`)}
                >
                  Bezahlen
                </Button>
              ) : (
                <>
                  <Tooltip
                    label={`Transaction ID: ${order?.transactionId}`}
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
          </tr>
          {opened &&
            cartItems.map((product, idx) => (
              <tr key={idx}>
                <td></td>
                <td color="violet">{product.name}</td>
                <td>{product.artikul}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          {opened && (
            <tr>
              <td colSpan={3} style={{ textAlign: "right" }}>
                <strong>Total Sum:</strong>
              </td>
              <td>{order.totalSum}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default MyOrder;
