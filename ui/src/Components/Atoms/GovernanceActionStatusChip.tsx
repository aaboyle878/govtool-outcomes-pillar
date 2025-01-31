import { Box, Typography } from "@mui/material";

interface GovernanceActionStatusChipProps {
  status: string;
}

export default function GovernanceActionStatusChip({
  status,
}: GovernanceActionStatusChipProps) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "14px",
          color:
            status === "Ratified" || status === "Enacted" || status === "Live"
              ? "positiveGreen"
              : status === "Expired"
              ? "errorRed"
              : "accentYellow",
        }}
      >
        {status}
      </Typography>
    </Box>
  );
}
