import { Button, createStyles, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { useStore } from "../Shared/store";

const useStyles = createStyles((theme) => ({
   text: {
      fontSize: 15,
      fontWeight: 600,

      [theme.fn.smallerThan("sm")]: {
         fontSize: 11,
      },
   },
   form: {
      display: "flex",
      alignItems: "center",
      margin: ` ${theme.spacing.xs}px 0px`,
   },
   button: {
      fontSize: 12,

      [theme.fn.smallerThan("sm")]: {
         fontSize: 8,
      },
   },
}));
const OrderSummary = ({ product }) => {
   const { price } = product;
   const { quantity, shipping, promotion } = useStore();

   const form = useForm({
      initialValues: {
         voucher: "",
      },
   });

   // calculation
   let subTotal = price * quantity;

   let total = subTotal + shipping + promotion;

   const handleVoucher = ({ voucher }) => {
      const configVoucher = process.env.REACT_APP_VOUCHER;

      voucher === configVoucher
         ? toast.success("gutschein angewendet")
         : toast.error("gutschein wurde nicht abgeglichen");

      form.reset();
   };

   const { classes } = useStyles();
   return (
      <>
         <Text className={classes.text} size="xl">
         Bestellübersicht:
         </Text>
         <Group className={classes.text} position="apart" mt="xs" mr={10}>
            <Text weight={400} color="dimmed" inherit>
            Zwischensummen
            </Text>
            <Text weight={800} color="gray" inherit>
            € {subTotal}
            </Text>
         </Group>
         <Group className={classes.text} position="apart" mt="xs" mr={10}>
            <Text weight={400} color="dimmed" inherit>
            Förderung
            </Text>
         </Group>
         <Group className={classes.text} position="apart" mt="xs" mr={10}>
            <Text weight={400} color="dimmed" inherit>
            Versandkosten:
            </Text>
            <Text weight={800} color="gray" inherit>
            €{shipping}
            </Text>
         </Group>
         <form
            action=""
            onSubmit={form.onSubmit(handleVoucher)}
            className={classes.form}
         >
            <TextInput
               placeholder="Gutscheincode eingeben"
               size="xs"
               onChange={(event) =>
                  form.setFieldValue("Gutschein", event.currentTarget.value)
               }
            ></TextInput>
            <Button
               type="submit"
               className={classes.button}
               variant="light"
               compact
               mx="xs"
            >
               Gelten
            </Button>
         </form>
         <Group className={classes.text} position="apart" mt="xs" mr={10}>
            <Text weight={400} color="dimmed" inherit>
               Total
            </Text>
            <Text weight={800} color="gray" inherit>
            € {total}
            </Text>
         </Group>
      </>
   );
};

export default OrderSummary;