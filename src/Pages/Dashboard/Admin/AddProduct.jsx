import { Box, Button,TextInput } from '@mantine/core';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import axiosPrivate from '../../../API/axiosPrivate';
import { API_URL } from '../../../API/rootURL';

import CustomDashboardTitle from '../../Components/CustomDashboardTitle';
import { useStyles } from './AddProduct.styles';

export default function AddInventory() {
   const { classes } = useStyles();

   const formRef = useRef();
   const nameRef = useRef();
   const priceRef = useRef();
   const minimumQuantityRef = useRef();
   const artikulRef = useRef();
   const weightRef = useRef();

   const handleOnSubmit = async () => {
      const values = {
        name: nameRef.current.value,
        price: priceRef.current.value,
        minimumQuantity: minimumQuantityRef.current.value,
        artikul: artikulRef.current.value,
        weight: weightRef.current.value,
      };
      try {
        const { data } = await axiosPrivate.post(`${API_URL}parts`, values);
        if (data?.insertedId) {
          toast.success('Produkt erfolgreich hinzugefügt');
          formRef.current.reset();
        } else {
          toast.error('Ein Fehler ist aufgetreten: keine Einfüge-ID zurückgegeben.');
        }
      } catch (error) {
        toast.error(`Ein Fehler ist aufgetreten: ${error.message}`);
      }
    };
    

   return (
      <>
         <Box
            my={20}
            size='xs'
            px='xs'
            style={{
               marginRight: '20%',
            }}>
            {' '}
            <CustomDashboardTitle>Produkt hinzufügen:</CustomDashboardTitle>
            <form ref={formRef} onSubmit={(e) => { e.preventDefault(); handleOnSubmit(); }}>

            <TextInput
                  label='Artikul'
                  placeholder='Artikulnummer Ihres Produkts'
                  classNames={classes}
                  required
                  ref={artikulRef}
               />
               <TextInput
                  label='Brand'
                  placeholder='Brand Name'
                  classNames={classes}
                  required
                  ref={nameRef}
               />

               <TextInput
                  classNames={classes}
                  my={20}
                  label='Price'
                  defaultValue={100}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  formatter={(value) =>
                     !Number.isNaN(parseFloat(value))
                        ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '$ '
                  }
                  required
                  ref={priceRef}
               />
               <TextInput
                  classNames={classes}
                  my={20}
                  max={100}
                  min={0}
                  label='Minimum Quantity'
                  required
                  ref={minimumQuantityRef}
               />

                  <TextInput
                  label='Gewicht'
                  placeholder='bitte mit Komma angeben'
                  classNames={classes}
                  required
                  ref={weightRef}
               />

               <Button type='submit' variant='light' mt='lg'>
                  Produkt hinzufügen
               </Button>
            </form>
         </Box>
      </>
   );
}
