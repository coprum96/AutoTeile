import React, { useState } from 'react';
import { Button, Table, Image } from '@mantine/core';
import SectionTitle from '../../Shared/SectionTitle';

const Invoices = () => {
  const [hasInvoices, setHasInvoices] = useState(false);

  const downloadCsv = (fileName, url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.type = 'text/csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTableContent = () => {
    if (hasInvoices) {
      return (
        <tbody>
          {/* Render table rows with invoice data */}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              Es gibt keine Rechnungen momentan.
            </td>
          </tr>
        </tbody>
      );
    }
  };

  return (
    <>
      <SectionTitle>Invoices</SectionTitle>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Table
          striped
          highlightOnHover
          withBorder
          withColumnBorders
          horizontalSpacing="xl"
          verticalSpacing="xl"
          fontSize="sm"
        >
          <thead>
            <tr>
              <th>Invoices Number</th>
              <th>Date</th>
              <th>Total Sum, €</th>
              <th>pdf herunterladen</th>
            </tr>
          </thead>
          {renderTableContent()}
        </Table>
      </div>
    </>
  );
};

export default Invoices;
