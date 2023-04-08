import { ScrollArea, Table } from "@mantine/core";
import useParts from "../../../Hooks/useParts";
import CustomDashboardTitle from "../../Components/CustomDashboardTitle";
import Loading from "../../Shared/Loading";
import ManageProduct from "./components/ManageProduct";

const ManageProducts = () => {
   const { products, isLoading, refetch } = useParts();

   if (isLoading) return <Loading />;

   return (
      <>
         <CustomDashboardTitle>Produkt verwalten</CustomDashboardTitle>

         <ScrollArea>
            <Table
               sx={{ minWidth: 600 }}
               verticalSpacing="xs"
               highlightOnHover
               withColumnBorders
               striped
               mb="lg"
            >
               <thead>
                  <tr>
                     <th>Produktbezeichnung</th>
                     <th>Preis</th>
                     <th>Verfügbar</th>
                     <th>Entfernen</th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((product, index) => (
                     <ManageProduct
                        product={product}
                        key={product._id}
                        index={index}
                        refetch={refetch}
                     />
                  ))}
               </tbody>
            </Table>
         </ScrollArea>
      </>
   );
};

export default ManageProducts;
