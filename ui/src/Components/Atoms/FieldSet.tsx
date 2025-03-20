import { Box, BoxProps } from "@mui/material";
import { Typography } from "./Typography";

type FieldSetProps = BoxProps & {
  title: string;
  children: React.ReactNode;
};

const FieldSet = ({ title, children, sx, ...props }: FieldSetProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: 1,
        padding: 2,
        mt: 1,
        ...sx,
      }}
      {...props}
    >
      {title && (
        <Typography
          variant="body2"
          color="textBlack"
          sx={{
            position: "absolute",
            top: 0,
            transform: "translateY(-50%)",
            backgroundColor: "background.paper",
            px: 1,
            lineHeight: 1,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default FieldSet;
