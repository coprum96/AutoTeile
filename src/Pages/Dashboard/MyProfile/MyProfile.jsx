import { Box, createStyles } from "@mantine/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import axiosPrivate from "../../../API/axiosPrivate";
import { API_URL } from "../../../API/rootURL";
import auth from "../../../firebase.init";
import SectionTitle from "../../Shared/SectionTitle";
import Loading from "../../Shared/Loading";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";

const useStyles = createStyles((theme) => ({
   wrapper: {
      display: "flex",

      alignItems: "center",

      marginTop: theme.spacing.md,
   },
   img: {
      [theme.fn.smallerThan("sm")]: {
         display: "none",
      },
   },
}));

const MyProfile = () => {
   const [user] = useAuthState(auth);
   const { classes } = useStyles();

   const { data, isLoading, refetch } = useQuery(
      "myProfile",
      async () => await axiosPrivate.get(`${API_URL}users/${user?.email}`)
   );

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         <SectionTitle >Mein Profil</SectionTitle>
         <div className={classes.wrapper}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                   }}
                  >
            <Box>
               <Profile fixedInfo={user} userInfo={data?.data} />
               <UpdateProfile userInfo={data?.data} refetch={refetch} />
            </Box>
         </div>
      </>
   );
};

export default MyProfile;