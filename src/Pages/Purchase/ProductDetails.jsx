import {
    createStyles,
    Group,
    Paper,
    Text,
 } from "@mantine/core";
 import CustomBadge from "../Components/CustomBadge";
 const useStyles = createStyles((theme) => ({
    main: {
       display: "inline",
    },
 
    text: {
       fontSize: 25,
       [theme.fn.smallerThan("xs")]: {
          fontSize: 25,
       },
    },
    control: {
       color: theme.colors.gray[1],
       textDecoration: "none",
       [theme.fn.smallerThan("sm")]: {
          fontSize: 13,
       },
    },
 }));
 const ProductDetails = ({ product }) => {
    const {
       name: productName,
       price,
       minimumQuantity,
       artikul,
    } = product;
 
    const { classes } = useStyles();
    return (
       <>
          <Paper className={classes.main} p="xl">
             <Group direction="column">
                <Group>
                   <Text className={classes.text} size="lg" weight="dimmed">
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
                   Preis: <CustomBadge color="violet">€{price}</CustomBadge>
                   </Text>
                </Group>
                <Group>
                   <Text className={classes.text} size="sm" color="dimmed">
                   Min:{" "}
                      <CustomBadge color="red">{minimumQuantity}</CustomBadge>
                   </Text>
                </Group>
             </Group>
          </Paper>
       </>
    );
 };
 
 export default ProductDetails;