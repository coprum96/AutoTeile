import React, { useState } from "react";
import { Input } from "@mantine/core";
import { parse } from "papaparse";
import readXlsxFile from "read-excel-file";

const FileInput = ({ onFileUpload }) => {
  const [fileType, setFileType] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    setFileType(fileType);

    if (fileType === "text/csv") {
      parse(file, {
        complete: (results) => {
          onFileUpload(results.data);
        },
      });
    } else if (
      fileType === "application/vnd.ms-excel" ||
      fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      readXlsxFile(file).then((rows) => {
        onFileUpload(rows);
      });
    }
  };

  return (
    <Input
      type="file"
      id="file-upload"
      accept=".csv,.xls,.xlsx"
      onChange={handleFileUpload}
    />
  );
};

export default FileInput;
