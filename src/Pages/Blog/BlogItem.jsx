import {
  createStyles,
  Paper,
  Text,
  useMantineTheme,
  Button,
  Image,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    transition: "transform 300ms ease, box-shadow 200ms ease",
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,
    [theme.fn.smallerThan("md")]: {
      fontSize: 8,
      marginTop: theme.spacing.xl,
      padding: theme.spacing.md,
      paddingLeft: theme.spacing.md,
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
        theme.colors[theme.primaryColor][4],
        theme.colors[theme.primaryColor][2]
      ),
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: theme.spacing.md,
    [theme.fn.smallerThan("md")]: {
      marginTop: theme.spacing.sm,
    },
  },
  image: {
    width: "100%",
    marginBottom: theme.spacing.md,
    [theme.fn.smallerThan("md")]: {
      marginBottom: theme.spacing.sm,
    },
  },
}));

function BlogItem({ title, description, link, img }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Paper radius="md" className={classes.card}>
      <Text size="lg" weight={700} mt="md">
        {title}
      </Text>
      <div className={classes.content}>
        <Image
          src={img}
          height={100}
          width={370}
          alt="Blog post image"
          className={classes.image}
        />
        <Text size="md" mt="sm">
          {description}
        </Text>
      </div>
      <Button
        variant="light"
        radius="lg"
        size="xs"
        component="a"
        href={link}
        target="_blank"
      >
        Besuche Web Page
      </Button>
    </Paper>
  );
}

export default BlogItem;
