import React, { useState } from "react";
import { Button, Input, Table, Select } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

const ImportProducts = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [csvFormat, setCsvFormat] = useState("format1");
  const theme = useMantineTheme();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = {};
      if (csvFormat === "format1") {
        obj.ArtikelNr = values[0];
        obj.Price = values[1];
      } else if (csvFormat === "format2") {
        obj.ArtikelNr = values[0];
        obj.Price = values[1];
        obj.minimumQuantity = values[2];
      }
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  const formatOptions = [
    { value: "format1", label: "ArtikelNr Price; " },
    { value: "format2", label: "ArtikelNr Price minimumQuantity" },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <Select
        data={formatOptions}
        value={csvFormat}
        onChange={(value) => setCsvFormat(value)}
        placeholder="Select CSV format"
        style={{ marginLeft: theme.spacing.md }}
      />
      <h1 style={{ marginBottom: theme.spacing.xl }}>CSV IMPORT</h1>
      <form style={{ marginBottom: theme.spacing.md }}>
        <Input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
          style={{ marginRight: theme.spacing.sm }}
        />

        <Button
          variant="outline"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT Ergebnisse
        </Button>
      </form>

      <Table striped highlightOnHover withBorder withColumnBorders style={{ marginBottom: theme.spacing.lg, textAlign: "left" }}>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item, index) => (
            <tr key={index}>
              {headerKeys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ImportProducts;
