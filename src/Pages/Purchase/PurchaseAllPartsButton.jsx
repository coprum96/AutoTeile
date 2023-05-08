import React, { useState } from "react";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const PurchaseAllPartsButton = ({ searchResults }) => {
  const [selectedPartIds, setSelectedPartIds] = useState([]);
  const navigate = useNavigate();

  const handlePurchaseAllParts = () => {
    const partsToPurchase = searchResults.filter((product) =>
      selectedPartIds.some((part) => part.artikul === product.artikul)
    );
    const partIds = partsToPurchase.map((part) => part._id).join(",");
    navigate(`/dashboard/shoppingcart`, { state: { selectedPartIds } }); // pass the selected part ids as state
    setSelectedPartIds([]);
  };

  return (
    <tr>
      <td colSpan={4}></td>
      <td>
      <Button
            variant="outline"
            onClick={handlePurchaseAllParts}
          >
            Purchase All Parts
          </Button>
      </td>
    </tr>
  );
};

export default PurchaseAllPartsButton;
