import { Button, createStyles, NumberInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";
import CustomDashboardTitle from "../../Components/CustomDashboardTitle";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    width: theme.spacing.xl * 10,
    marginTop: theme.spacing.md,
  },
  input: {
    height: "auto",
    paddingTop: 6,
  },
  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export default function UpdateProfile({ userInfo, refetch }) {
  const { phone, address, email } = userInfo ?? {};
  const { classes } = useStyles();

  const [formValues, setFormValues] = useState({
    address: address || "",
    phone: phone || Number,
    updatedAt: new Date(),
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target ?? {};
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { data } = await axiosPrivate.put(
      `${API_URL}users/${email}`,
      { ...formValues, updatedAt: new Date() } // Include the updatedAt field in the request body
    );

    if (data.result.modifiedCount) {
      toast.success("Profil erfolgreich aktualisiert");
      refetch();
      setFormValues({
        address: "",
        phone: Number,
        updatedAt: new Date(), // Update the updatedAt field in the state as well
      });
    }
  };

  return (
    <>
      <CustomDashboardTitle>Profile Erneuen</CustomDashboardTitle>

      <form onSubmit={handleOnSubmit}>
        <TextInput
          label="Address"
          placeholder={address}
          className={classes.input} // Use className instead of classNames
          name="address"
          value={formValues.address}
          onChange={handleOnChange}
        />
        <NumberInput
          label="Phone Number"
          placeholder={phone}
          className={classes.input} // Use className instead of classNames
          hideControls
          name="phone"
          value={formValues.phone}
          onChange={handleOnChange}
        />
        <Button type="submit" mt="md" variant="light">
          Speichern
        </Button>
      </form>
    </>
  );
}
