import { Highlight, Text, Box } from "@mantine/core";
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
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div className={classes.content} >
          {Icon && <Icon size={38} className={classes.icon} />} {/* Render the icon if it exists */}
            <Text weight={600} size="md" mb="xs" mt={4} className={classes.title}>
              {title}
            </Text>

          <Highlight
            color="gray"
            weight={600}
            size="md"
            mt="sm"
            highlightStyles={(theme) => ({
              backgroundImage: theme.gradient({
                from: theme.colors[theme.primaryColor][3],
                to: theme.colors[theme.primaryColor][9],
              }),
              fontWeight: 600,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            })}
          >
            {description}
          </Highlight>
        </div>
      </div>
    </Box>
  );
}
