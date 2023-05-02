import {
    AppShell,
    Box,
    Burger,
    MediaQuery,
    Navbar,
    useMantineTheme,
 } from "@mantine/core";
 import { useState } from "react";
 import { useAuthState } from "react-firebase-hooks/auth";
 import { Outlet } from "react-router-dom";
 import {
    Ballpen,
    BellRinging,
    BuildingStore,
    History,
    Users,
    ListSearch,
    Paperclip,
    Article,
    DatabaseImport,
    DoorExit,
    ShoppingCart
 } from "tabler-icons-react";
 import auth from "../../firebase.init";
 import useAdmin from "../../Hooks/useAdmin";
 import { MainLinks } from "./Dashboard/_MainLinks";
 import User from "./Dashboard/_User";
 import CustomSignInOutButton from '../../Pages/Components/CustomSignInOutButton';
 import { signOut } from 'firebase/auth';
 
 const handleSignOut = () => {
   signOut(auth);
 }; 

 //links for users
 const userLinks = [
    { link: "/dashboard/shoppingcart", label: "Shopping Card", icon: ShoppingCart },
    { link: "/dashboard/myorders", label: "Bestellungen", icon: BellRinging },
    { link: "/dashboard/pricelists", label: "Price Lists", icon: ListSearch },
    { link: "/dashboard/invoice", label: "Invoices", icon: Paperclip },
    
    { link: "", label: "Profile", icon: Users },
    { link: "/dashboard/addreview", label: "Bewertung hinzufügen", icon: Ballpen },

 ];
 
 //links for admin
 const adminLinks = [
    {
       link: "/dashboard/manageproducts",
       label: "Produkte verwalten",
       icon: BuildingStore,
    },
    { link: "/dashboard/addproduct", label: "Produkt hinzufügen", icon: Ballpen },
    { link: "/dashboard/addproductCSV", label: "CSV hinzufügen", icon: DatabaseImport },
    {
       link: "/dashboard/manageallorders",
       label: "Alle Bestellungen verwalten",
       icon: History,
    },
    {
      link: "/dashboard/clientinvoices",
      label: "Kunden Invoices",
      icon: Article,
   },
    { link: "", label: "Mein Profile", icon: Users },
 ];

 export default function Dashboard() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    
    
    return (
       <Box>
          <AppShell
             styles={{
                main: {
                   background:
                      theme.colorScheme === "dark"
                         ? theme.colors.dark[8]
                         : theme.colors.gray[0],
                },
             }}
             navbarOffsetBreakpoint="md"
             navbar={
                <Navbar
                   p="md"
                   hiddenBreakpoint="xs"
                   hidden={!opened}
                   width={{ sm: 300, lg: 300 }}
                   onClick={() => setOpened(!opened)}
                   style={{
                      position: "sticky",
                   }}
                >
                   <Navbar.Section grow mt="xs">
                      <MainLinks links={admin ? adminLinks : userLinks} />
                   </Navbar.Section>
                   <Navbar.Section>
                   <CustomSignInOutButton
                           color='pink'
                           onClick={handleSignOut}>
                              <DoorExit style={{ marginRight: '16px' }} />
                              Ausloggen
                     </CustomSignInOutButton>
                      <User />
                   </Navbar.Section>
                </Navbar>
             }
          >
             <MediaQuery largerThan="sm" styles={{ display: "none" }} >
               <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={
                     theme.colorScheme === "dark"
                        ? theme.white
                        : theme.colors[theme.primaryColor][7]
               }
               />
               </MediaQuery>
             <Outlet />
          </AppShell>
       </Box>
    );
 }