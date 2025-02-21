import { Box, Typography } from "@mui/material";

interface GovernanceActionCardElementProps {
  title: string;
  description: string;
  dataTestId: string;
}

export default function GovernanceActionCardElement({
  title,
  description,
  dataTestId,
}: GovernanceActionCardElementProps) {
  return (
    <Box data-testid={dataTestId}>
      <Typography
        sx={{
          fontSize: "0.875rem",
          color: "neutralGray",
          lineHeight: "1rem",
          marginBottom: 1,
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: "1.5rem",
          WebkitLineClamp: 2,
          width: "100%",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
