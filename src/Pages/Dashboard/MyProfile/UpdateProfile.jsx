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
    paddingTop: 14,
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
  const { phone, address, email, linkedIn } = userInfo;
  const { classes } = useStyles();

  const [formValues, setFormValues] = useState({
    address: "",
    phone: Number,
    linkedIn: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { data } = await axiosPrivate.put(
      `${API_URL}users/${email}`,
      formValues
    );

    if (data.result.modifiedCount) {
      toast.success("Profile updated successfully");
      refetch();
      setFormValues({
        address: "",
        phone: Number,
        linkedIn: "",
      });
    }
  };

  return (
    <>
      <CustomDashboardTitle>Update Profile</CustomDashboardTitle>

      <form onSubmit={handleOnSubmit}>
        <TextInput
          label="Address"
          placeholder={address}
          classNames={classes}
          name="address"
          value={formValues.address}
          onChange={handleOnChange}
        />
        <TextInput
          label="LinkedIn"
          placeholder={linkedIn}
          classNames={classes}
          name="linkedIn"
          value={formValues.linkedIn}
          onChange={handleOnChange}
        />
        <NumberInput
          label="Phone Number"
          placeholder={phone}
          classNames={classes}
          hideControls
          name="phone"
          value={formValues.phone}
          onChange={handleOnChange}
        />
        <Button type="submit" mt="md" variant="light">
          Save
        </Button>
      </form>
    </>
  );
}
