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
            <Avatar src={userInfo?.img} size={120} radius="md" />
            <div>
               <Text size="lg" weight={800} color="dimmed">
                  {userInfo?.creationTime}
               </Text>

               <Text size="lg" weight={500} className={classes.name}>
                  {fixedInfo.displayName}
               </Text>

               <Group noWrap spacing={10} mt={10}>
                  <At size={36} className={classes.icon} />
                  <Text size="lg" weight={600} color="dimmed">
                     {fixedInfo?.email}
                  </Text>
               </Group>
               <Group noWrap spacing={10} mt={10}>
                  <Location size={36} className={classes.icon} />
                  <Text size="lg" color="dimmed">
                     {userInfo?.address}
                  </Text>
               </Group>

               <Group noWrap spacing={10} mt={10}>
                  <PhoneCall size={36} className={classes.icon} />
                  <Text size="lg" color="dimmed">
                     {userInfo?.phone}
                  </Text>
               </Group>
            </div>
         </Group>
      </>
   );
};

export default Profile;