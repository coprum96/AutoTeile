import { Button, createStyles, NumberInput, TextInput, NativeSelect,  Switch  } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
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

   const [isSwitchOn, setSwitchOn] = useState(false);

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

      if (!isSwitchOn) {
         return; // If the switch is off, return early and prevent form submission
      }
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
      <div style={{display:"flex", justifyContent:"center"}}>
          <Switch
            onLabel="View mode"
            offLabel="Edit mode"
            size="lg"
            radius="md"
            variant="light"
            value={isSwitchOn}
            onChange={(value) => setSwitchOn(value)}
         />
      </div>
         <form onSubmit={form.onSubmit(handleOnSubmit)}>
            <div style={{display:"flex"}}>
         <NativeSelect
               label="Country"
               data={['Deutschland', 'Holland', 'Belgien', 'Frankreich', "Österreich", "Schweiz"  ]}
               placeholder={country}
               classNames={classes}
               required
               withAsterisk
               {...form.getInputProps("country")}
               disabled={!isSwitchOn}
            />
            <NumberInput
               label="Zip"
               placeholder={zip}
               classNames={classes}
               hideControls
               required
               {...form.getInputProps("zip")}
               disabled={!isSwitchOn}
            />
            <TextInput
               label="Address"
               placeholder={address}
               classNames={classes}
               {...form.getInputProps("address")}
               disabled={!isSwitchOn}
            />

            </div >
            <NumberInput
               label="Rsin"
               placeholder={rsin}
               classNames={classes}
               hideControls
               required
               {...form.getInputProps("rsin")}
               disabled={!isSwitchOn}
            />
            <NumberInput
               label="Phone Number"
               placeholder={phone}
               classNames={classes}
               hideControls
               required
               {...form.getInputProps("phone")}
               disabled={!isSwitchOn}
            />
            <TextInput
               label="Firma"
               placeholder={firma}
               classNames={classes}
               required
               {...form.getInputProps("firma")}
               disabled={!isSwitchOn}
            />
            <TextInput
               label="Ust-ID"
               placeholder={ustID}
               classNames={classes}
               required
               {...form.getInputProps("ustID")}
               disabled={!isSwitchOn}
            />
            <TextInput
               label="Handelskammer"
               placeholder={handelskammer}
               classNames={classes}
               {...form.getInputProps("handelskammer")}
               disabled={!isSwitchOn}
            />
            <TextInput
               label="Web"
               placeholder={web}
               classNames={classes}
               {...form.getInputProps("web")}
               disabled={!isSwitchOn}
            />
            <Button 
            type="submit" 
            mt="md" 
            radius="lg" size="md"
            variant="light">
               Speichern
            </Button>
         </form>
      </>
   );
}