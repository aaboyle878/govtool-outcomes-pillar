import { Box, Typography, BoxProps } from "@mui/material";

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
          component="legend"
          color="textGray"
          sx={{
            position: "absolute",
            top: 0,
            transform: "translateY(-50%)",
            backgroundColor: "background.paper",
            px: 1,
            ml: 1,
            lineHeight: 1,
            fontWeight: "bold",
            fontSize: 13,
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
