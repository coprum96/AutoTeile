import { Button, createStyles, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
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
      paddingTop: 11,
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
   const { phone, address, email, country, tax, zip, firma} = userInfo ?? {};

   const { classes } = useStyles();

   const form = useForm({
      initialValues: {
         country: "",
         address: "",
         tax: Number,
         zip: Number,
         firma: "",
         phone: Number,
      },
   });

   const handleOnSubmit = async (values) => {
      const { data } = await axiosPrivate.put(
         `${API_URL}users/${email}`,
         values
      );

      if (data.result.modifiedCount) {
         toast.success("Toll! Alles is updated!");
         refetch();
         form.reset();
      }
   };

   return (
      <>

         <form onSubmit={form.onSubmit(handleOnSubmit)}>
            <div style={{display:"flex"}}>
         <TextInput
               label="Country"
               placeholder={country}
               classNames={classes}
               {...form.getInputProps("country")}
            />
            <NumberInput
               label="Zip"
               placeholder={zip}
               classNames={classes}
               hideControls
               {...form.getInputProps("zip")}
            />
            <TextInput
               label="Address"
               placeholder={address}
               classNames={classes}
               {...form.getInputProps("address")}
            />

            </div >
            <NumberInput
               label="TAX number"
               placeholder={tax}
               classNames={classes}
               hideControls
               {...form.getInputProps("tax")}
            />
            <NumberInput
               label="Phone Number"
               placeholder={phone}
               classNames={classes}
               hideControls
               {...form.getInputProps("phone")}
            />
            <TextInput
               label="Firma"
               placeholder={firma}
               classNames={classes}
               {...form.getInputProps("firma")}
            />
            <Button type="submit" mt="md" variant="light">
               Speichern
            </Button>
         </form>
      </>
   );
}