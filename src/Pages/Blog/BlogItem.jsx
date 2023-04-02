import {
    createStyles,
    Paper,
    Text,
    ThemeIcon,
    useMantineTheme,
    Button,
    Image,
 } from "@mantine/core";
 import { BrandBlogger } from "tabler-icons-react";
 
 const useStyles = createStyles((theme) => ({
    card: {
       position: "relative",
       cursor: "pointer",
      //  overflow: "hidden",
       transition: "transform 300ms ease, box-shadow 200ms ease",
       padding: theme.spacing.xl,
       marginTop: theme.spacing.xl,
       paddingLeft: theme.spacing.xl * 2,
       [theme.fn.smallerThan("md")]: {
          fontSize: 8,
          marginTop: theme.spacing.xl,
       },
       "&:hover": {
          boxShadow: theme.shadows.md,
          transform: "scale(1.02)",
       },
 
       "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 6,
          backgroundImage: theme.fn.linearGradient(
             0,
             theme.colors[theme.primaryColor][1],
             theme.colors[theme.primaryColor][6]
          ),
       },
    },
 }));
 
 function BlogItem({ title, description, link, img}) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
       <Paper withBorder radius="md" className={classes.card}>
          <ThemeIcon
             size="xl"
             radius="md"
             variant="gradient"
             gradient={{
                deg: 0,
                from: theme.colors[theme.primaryColor][8],
                to: theme.colors[theme.primaryColor][3],
             }}
          >
             <BrandBlogger size={38} />
          </ThemeIcon>
          <Text size="lg" weight={700} mt="md">
             {title}
          </Text>
          <Image src={img} height={300} width={800} alt="Blog post image">
          </Image>
          <Text size="md" mt="sm">
             {description}
          </Text>
          <Button component="a" href={link} target="_blank">
            Visit Web Page
         </Button>
       </Paper>
    );
 }
 export default BlogItem;