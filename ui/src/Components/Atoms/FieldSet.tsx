import { Box, BoxProps } from "@mui/material";
import { Typography } from "./Typography";

type FieldSetProps = BoxProps & {
  title: string;
  children: React.ReactNode;
};

const FieldSet = ({ title, children, sx, ...props }: FieldSetProps) => {
  return (
    <Box
      component="fieldset"
      sx={{
        position: "relative",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: 1,
        paddingX: 2,
        legend: {
          padding: "0 8px",
          lineHeight: 1,
          fontWeight: 600,
          fontSize: "14px",
        },
        ...sx,
      }}
      {...props}
    >
      <legend>
        {title && (
          <Typography
            variant="body2"
            color="textBlack"
            sx={{
              fontWeight: 600,
              px: 0,
              display: "inline-block",
            }}
          >
            {title}
          </Typography>
        )}
      </legend>
      <Box paddingY={0.5}>{children}</Box>
    </Box>
  );
};

export default FieldSet;
