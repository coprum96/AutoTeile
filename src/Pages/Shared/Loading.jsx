import { Center, Loader } from "@mantine/core";
import React from "react";

const Loading = (props) => {
   return (
      <Center my="xl">
         <Loader size="lg" variant="bars" {...props} />
      </Center>
   );
};

export default Loading;