import { Badge, Button, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Product.styles";
import { ShoppingCart } from "tabler-icons-react";

export default function Product({ product }) {
  const navigate = useNavigate();
  const {
    name,
    artikul,
    minimumQuantity,
    _id,
    price,
    weight,
    pfand,
  } = product;
  const { classes } = useStyles();

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th colSpan={2}>
            <Text transform="uppercase" weight={500} size="xs">
              {name}
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Artikul:</td>
          <td>{artikul}</td>
        </tr>
        <tr>
          <td>Minimaler Auftrag:</td>
          <td>
            <Badge>{minimumQuantity}</Badge>
          </td>
        </tr>
        <tr>
          <td>Preis:</td>
          <td>
            <Text component="span" size="xl" weight={700}>
              {" "}
              €{price}
            </Text>
            / pro Einheit
          </td>
        </tr>
        <tr>
          <td>Gewicht:</td>
          <td>{weight}</td>
        </tr>
        <tr>
          <td>Pfand:</td>
          <td>{pfand}</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Group noWrap spacing="sm" position="apart">
              <Button
                uppercase
                variant="light"
                px="sm"
                leftIcon={<ShoppingCart size={18} />}
                onClick={() => {
                  navigate(`/purchase/${_id}`);
                }}
              >
                Add to cart
              </Button>
            </Group>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
