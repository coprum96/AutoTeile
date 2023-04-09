import React, { useState } from "react";
import { Button, Input, Table } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

const ImportProducts = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
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
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
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

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: theme.spacing.xl }}>REACTJS CSV IMPORT EXAMPLE </h1>
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
          IMPORT CSV
        </Button>
      </form>

      <Table style={{ marginBottom: theme.spacing.lg }}>
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
              {Object.values(item).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ImportProducts;
