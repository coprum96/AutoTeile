import { Box, Button, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { toast } from 'react-toastify';
import axiosPrivate from '../../../API/axiosPrivate';
import { API_URL } from '../../../API/rootURL';

import CustomDashboardTitle from '../../Components/CustomDashboardTitle';
import { useStyles } from './AddProduct.styles';

export default function AddInventory() {
   const { classes } = useStyles();

   const form = useForm({
      values: {
         name: '',
         price: 100,
         minimumQuantity: 0,
         availableQuantity: 0,
         artikul: '',
      },
   });

   const handleOnSubmit = async (values) => {
      const { data } = await axiosPrivate.post(`${API_URL}parts`, values);

      if (data?.insertedId) {
         toast.success('Produkt erfolgreich hinzugefügt');
         form.reset();
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
            <form onSubmit={form.onSubmit(handleOnSubmit)}>
               <TextInput
                  label='Name'
                  placeholder='Name Ihres Produkts'
                  classNames={classes}
                  required
                  {...form.getInputProps('name')}
               />

               <NumberInput
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
                  {...form.getInputProps('price')}
               />
               <NumberInput
                  classNames={classes}
                  my={20}
                  max={100}
                  min={0}
                  label='Minimum Quantity'
                  required
                  {...form.getInputProps('minimumQuantity')}
               />
               <NumberInput
                  classNames={classes}
                  my={20}
                  max={1000}
                  min={0}
                  label='Available Quantity'
                  required
                  {...form.getInputProps('availableQuantity')}
               />


               <TextInput
                  label='Artikul'
                  placeholder='Artikulnummer Ihres Produkts'
                  classNames={classes}
                  required
                  {...form.getInputProps('artikul')}
               />

               <Button type='submit' variant='light' mt='lg'>
                  Produkt hinzufügen
               </Button>
            </form>
         </Box>
      </>
   );
}
