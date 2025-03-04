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
          fontSize: 12,
          color: "textGray",
          lineHeight: "16px",
          marginBottom: "4px",
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: "20px",
          WebkitLineClamp: 2,
          maxWidth: "auto",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
