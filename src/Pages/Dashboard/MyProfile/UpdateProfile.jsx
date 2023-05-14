import { Button, createStyles, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { toast } from "react-toastify";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";

const useStyles = createStyles((theme) => ({
   root: {
      position: "absolut",
      width: theme.spacing.xl * 10,
      marginTop: theme.spacing.md,
   },

   input: {
      height: "auto",
      paddingTop: 15,
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
   const { phone, address, email, country, rsin, zip, firma, ustID, handelskammer, web} = userInfo ?? {};

   const { classes } = useStyles();

   const form = useForm({
      initialValues: {
         country: "",
         address: "",
         rsin: Number,
         zip: Number,
         firma: "",
         phone: Number,
         ustID: "",
         handelskammer: "",
         web: "",
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
               required
               {...form.getInputProps("country")}
            />
            <NumberInput
               label="Zip"
               placeholder={zip}
               classNames={classes}
               hideControls
               required
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
               label="Rsin"
               placeholder={rsin}
               classNames={classes}
               hideControls
               required
               {...form.getInputProps("rsin")}
            />
            <NumberInput
               label="Phone Number"
               placeholder={phone}
               classNames={classes}
               hideControls
               required
               {...form.getInputProps("phone")}
            />
            <TextInput
               label="Firma"
               placeholder={firma}
               classNames={classes}
               required
               {...form.getInputProps("firma")}
            />
            <TextInput
               label="Ust-ID"
               placeholder={ustID}
               classNames={classes}
               required
               {...form.getInputProps("ustID")}
            />
            <TextInput
               label="Handelskammer"
               placeholder={handelskammer}
               classNames={classes}
               {...form.getInputProps("handelskammer")}
            />
            <TextInput
               label="Web"
               placeholder={web}
               classNames={classes}
               {...form.getInputProps("web")}
            />
            <Button type="submit" mt="md" variant="light">
               Speichern
            </Button>
         </form>
      </>
   );
}