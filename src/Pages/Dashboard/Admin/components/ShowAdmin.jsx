import { Avatar, Badge, Button, Group, Text } from "@mantine/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosPrivate from "../../../../API/axiosPrivate";
import { API_URL } from "../../../../API/rootURL";
const ShowAdmin = ({ user: userInfo, index, refetch }) => {
   const { email, img, phone } = userInfo;
   const [loading, setLoading] = useState(false);

   const handleMakeAdmin = async (email) => {
      const res = await axiosPrivate.put(
         `${API_URL}users/admin/${email}`,
         email
      );

      if (res.status === 403) {
         toast.error("Du bist nicht berechtigt, diesen Benutzer zum Administrator zu machen");
      }

      if (res?.data?.modifiedCount > 0) {
         toast.success("Jawohl!! Erfolgreich einen Administrator erstellt");
         refetch();
         setLoading(!loading);
      }
   };

   return (
      <>
         <tr>
            <td>
               <Group spacing="sm">
                  <Text size="sm" weight={500}>
                     {index + 1}
                  </Text>
               </Group>
            </td>
            <td>
               <Group spacing="sm">
                  <Avatar size={30} src={img} />
               </Group>
            </td>

            <td>
               <Badge size="md" weight={500} color="gray">
                  {email}
               </Badge>
            </td>
            <td>
               <Text size="sm" weight={500} color="gray">
                  {phone === null ? "Not Given" : phone}
               </Text>
            </td>

            <td>
               {userInfo.role === "admin" ? (
                  <Badge size="md" weight={500} color="green">
                     Admin
                  </Badge>
               ) : (
                  <Button
                     variant="light"
                     color="violet"
                     compact
                     loading={loading}
                     onClick={() => {
                        handleMakeAdmin(email);
                        setLoading(!loading);
                     }}
                  >
                     Machen Admin
                  </Button>
               )}
            </td>
         </tr>
      </>
   );
};

export default ShowAdmin;