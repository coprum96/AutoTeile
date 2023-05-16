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
  

  const handleExportCSV = () => {
    const csvContent = prepareCSVData(order, cartItems);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "order.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const prepareCSVData = (order, cartItems) => {
    const headers = ["Product Name", "Product Code", "Price (Euro)", "Quantity"];
    const rows = cartItems.map((product) => [
      product.name,
      product.artikul,
      product.price,
      product.quantity
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    return csvContent;
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
          borderRadius: '40px',
          overflow: 'hidden'
        }}
      >
        <tbody>
          <tr onClick={toggleOpened} colSpan={1} style={{ textAlign: "center" }}>
            <td>
              <Button
                variant="subtle"
                color="blue"
                size="xl"
                compact
                onClick={toggleOpened}
              > 
                {opened ? <ArrowBadgeDown /> : <ArrowBadgeUp />}
              </Button>
            </td>
            <td colSpan={1} style={{ fontSize: "15px", textAlign: "center" }}>
              {order._id}
              </td>
              <td colSpan={1} style={{ textAlign: "center" }}>
              {!order?.paid ? (
                <Button
                  color="violet"
                  radius="xl"
                  size="md"
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
            <td colSpan={1} style={{ textAlign: "center" }}>
                  <Button
                    variant="white"
                    compact
                    color="violet"
                    onClick={handleExportCSV}
                    radius="lg"
                  >
                    Export in .csv
                  </Button>
                </td>
          </tr>
          {opened && (
            <>
              <tr>
                <td>Name des Products</td>
                <td>Artikul</td>
                <td>Price, in Euro</td>
                <td>Menge</td>
              </tr>
              {order.products.map((product, idx) => (
                <tr key={idx}>
                  <td color="violet">{product.name}</td>
                  <td>{product.artikul}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={1} style={{ textAlign: "right" }}>
                  <strong>Datum:</strong>
                  {order.date}
                </td>
                <td>
                </td>
                <td colSpan={1} style={{ textAlign: "right" }}>
                  <strong>Total Sum:</strong>
                </td>
                <td>{order.totalSum}</td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default MyOrder;
