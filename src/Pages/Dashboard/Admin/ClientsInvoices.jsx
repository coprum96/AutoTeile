import { ScrollArea, Table } from "@mantine/core";
import CustomDashboardTitle from "../../Components/CustomDashboardTitle";

const ClientInvoices = ({ products }) => {
  return (
    <>
      <CustomDashboardTitle>Invoices</CustomDashboardTitle>
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
              <th>Invoice Nummer</th>
              <th>PDF</th>
              <th>Date</th>
              <th>Summe, €</th>
              <th>Bezahlen</th>
            </tr>
          </thead>

        </Table>
      </ScrollArea>
    </>
  );
};

export default ClientInvoices;
