import React from 'react';
import { Button, Table, Image } from '@mantine/core';
import BMWLogo from "../../../Assets/brands/BMW.svg.png";
import VolvoLogo from "../../../Assets/brands/volvo.png";
import VAGLogo from "../../../Assets/brands/vw.png";

const Priceslist = () => {
   const downloadCsv = (fileName, url) => {
     const link = document.createElement('a');
     link.href = url;
     link.download = fileName;
     link.type = 'text/csv';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   };
 
   return (
     <div>
       <h3>Price Lists</h3>
 
       <Table>
         <thead>
           <tr>
             <th>Logo</th>
             <th>AutoMarke</th>
             <th>Datum</th>
             <th>.csv herunterladen</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>
               <Image src={BMWLogo} alt="BMW Logo" width={60} height={60} />
             </td>
             <td>BMW</td>
             <td>04.04.2023</td>
             <td>
               <Button
                 variant="outline"
                 color="blue"
                 size="sm"
                 onClick={() =>
                   downloadCsv('Bmw.csv', '/static/media/Bmw.7aa604f89c475d287e35.csv')
                 }
               >
                 Download BMW Prices as CSV
               </Button>
             </td>
           </tr>
           <tr>
             <td>
               <Image src={VolvoLogo} alt="Volvo Logo" width={60} height={60} />
             </td>
             <td>Volvo</td>
             <td>04.04.2023</td>
             <td>
               <Button
                 variant="outline"
                 color="blue"
                 size="sm"
                 onClick={() => downloadCsv('Volvo.csv', '/static/media/Volvo.csv')}
               >
                 Download Volvo Prices as CSV
               </Button>
             </td>
           </tr>
           <tr>
             <td>
               <Image src={VAGLogo} alt="VAG Logo" width={60} height={60} />
             </td>
             <td>VAG</td>
             <td>04.04.2023</td>
             <td>
               <Button
                 variant="outline"
                 color="red"
                 size="sm"
                 onClick={() => downloadCsv('VAG.csv', '/static/media/VAG.csv')}
               >
                 Download VAG Prices as CSV
               </Button>
             </td>
           </tr>
         </tbody>
       </Table>
     </div>
   );
 };
 
 export default Priceslist;
