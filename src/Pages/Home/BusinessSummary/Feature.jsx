import { Group, Highlight, Text} from "@mantine/core";
import { useStyles } from "./Feature.Styles";

export default function Feature({
   icon: Icon,
   title,
   description,
   className,
   ...others
}) {
   const { classes, cx } = useStyles();

   return (
      <div className={cx(classes.feature, className)} {...others}>
         <div className={classes.overlay} />

         <div className={classes.content}>
            <Icon size={58} className={classes.icon} />
            <Group noWrap>
               <Text
                  weight={700}
                  size="md"
                  mb="xs"
                  mt={1}
                  className={classes.title}
               >
                  {title}
               </Text>
            </Group>

            <Highlight
               color="gray"
               weight={600}
               size="md"
               mt="sm"
               highlightStyles={(theme) => ({
                  backgroundImage: theme.fn.linearGradient(
                     45,
                     theme.colors[theme.primaryColor][3],
                     theme.colors[theme.primaryColor][9]
                  ),
                  fontWeight: 600,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
               })}
            >
               {description}
            </Highlight>
         </div>
      </div>
   );
}