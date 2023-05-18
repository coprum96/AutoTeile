import { Flex, createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    feature: {
        position: "relative",
        paddingTop: theme.spacing.xl,
        paddingLeft: theme.spacing.xl,
    },


    content: {
        position: "relative",
        zIndex: 1,
    },

    icon: {
        color: theme.colors[theme.primaryColor][
            theme.colorScheme === "dark" ? 3 : 6
        ],
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
}));