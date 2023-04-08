import {
    createStyles,
    Group,
    Paper,
    Text,
 } from "@mantine/core";
 import CustomBadge from "../Components/CustomBadge";
 const useStyles = createStyles((theme) => ({
    main: {
       display: "flex",
    },
 
    text: {
       fontSize: 15,
 
       [theme.fn.smallerThan("sm")]: {
          fontSize: 11,
       },
    },
    control: {
       color: theme.colors.gray[6],
       textDecoration: "none",
       [theme.fn.smallerThan("sm")]: {
          fontSize: 11,
       },
    },
 }));
 const ProductDetails = ({ product }) => {
    const {
       name: productName,
       price,
       minimumQuantity,
       availableQuantity,
       artikul,
    } = product;
 
    const { classes } = useStyles();
    return (
       <>
          <Paper className={classes.main} p="xl">
             <Group direction="column">
                <Group>
                   <Text className={classes.text} size="lg" weight="bold">
                      {productName}
                   </Text>
                </Group>
                <Group>
                   <Text className={classes.text} size="lg" weight="bold">
                      Artikul: {artikul}
                   </Text>
                </Group>
                <Group>
                   <Text className={classes.text} size="sm" color="dimmed">
                   Preis: <CustomBadge>€{price}</CustomBadge>
                   </Text>
                </Group>
                <Group>
                   <Text className={classes.text} size="sm" color="dimmed">
                   Mindestmenge:{" "}
                      <CustomBadge>{minimumQuantity}</CustomBadge>
                   </Text>
                </Group>
                <Group>
                   <Text className={classes.text} size="sm" color="dimmed">
                   Verfügbare Menge:{" "}
                      <CustomBadge color="red">{availableQuantity}</CustomBadge>
                   </Text>
                </Group>
             </Group>
          </Paper>
       </>
    );
 };
 
 export default ProductDetails;