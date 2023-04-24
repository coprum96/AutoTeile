import {  Avatar, createStyles, Group, Text } from "@mantine/core";
import React from "react";
import { At, Location, PhoneCall } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
   icon: {
      color:
         theme.colorScheme === "dark"
            ? theme.colors.dark[3]
            : theme.colors.gray[5],
   },

   name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
   },
}));
const Profile = ({ fixedInfo, userInfo }) => {
   const { classes } = useStyles();

   return (
      <>
         <Group noWrap style={{ display: 'flex' }}>
            <div>
               <Text size="lg" weight={800} color="dimmed">
                  {userInfo?.creationTime}
               </Text>

               <Text size="lg" weight={500} className={classes.name}>
                  {fixedInfo.displayName}
               </Text>
            </div>
         </Group>
      </>
   );
};

export default Profile;