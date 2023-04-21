import { Box, Button } from '@mantine/core';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import axiosPrivate from '../../../API/axiosPrivate';
import { API_URL } from '../../../API/rootURL';

import CustomDashboardTitle from '../../Components/CustomDashboardTitle';
import { useStyles } from './AddProduct.styles';

export default function AddInventory() {
  const { classes } = useStyles();

  const fileInputRef = useRef();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Do something with the selected file, e.g. display its name
      console.log(`Selected file: ${file.name}`);
    }
  };

  const handleUploadButtonClick = async () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const { data } = await axiosPrivate.post(`${API_URL}parts`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (data?.insertedCount) {
          toast.success(`${data.insertedCount} Produkte erfolgreich hinzugefügt`);
          fileInputRef.current.value = null;
        } else {
          toast.error('Ein Fehler ist aufgetreten: keine Einfüge-Anzahl zurückgegeben.');
        }
      } catch (error) {
        toast.error(`Ein Fehler ist aufgetreten: ${error.message}`);
      }
    } else {
      toast.error('Bitte wählen Sie eine Datei aus.');
    }
  };

  return (
    <>
      <Box my={20} size='xs' px='xs' style={{ marginRight: '20%' }}>
        <CustomDashboardTitle>Produkte importieren:</CustomDashboardTitle>
        <Box mt='lg'>
          <label htmlFor='fileInput'>
            <Button component='span' variant='light' mr='md'>
              Datei auswählen
            </Button>
          </label>
          <input id='fileInput' type='file' accept='.csv' hidden ref={fileInputRef} onChange={handleFileInputChange} />
          <Button type='button' variant='light' disabled={!fileInputRef.current?.files?.length} onClick={handleUploadButtonClick}>
            Hochladen
          </Button>
        </Box>
      </Box>
    </>
  );
}
