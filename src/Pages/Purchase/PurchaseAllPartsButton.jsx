import React, { useState } from "react";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const PurchaseAllPartsButton = ({ searchResults }) => {
  const navigate = useNavigate();
  const [selectedPartIds, setselectedPartIds] = useState([]);

  const handlePurchaseAllParts = () => {
    const allPartIds = [...selectedPartIds, ...searchResults.map((part) => part.id)];
    navigate("/dashboard/shoppingcart", {
      state: { parts: allPartIds },
    });
    setselectedPartIds([]);
  };

  return (
    <Button
      uppercase
      variant="light"
      px="sm"
      onClick={handlePurchaseAllParts}
      fullWidth
    >
      Kaufen alle Teile
    </Button>
  );
};

export default PurchaseAllPartsButton;
