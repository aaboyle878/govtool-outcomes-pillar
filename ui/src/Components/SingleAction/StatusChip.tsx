import { Box, Typography } from "@mui/material";
import { errorRed, primaryBlue, successGreen } from "../../consts/colors";

type StatusChip = {
  status: "Live" | "Ratified" | "Enacted" | "Expired" | "Not Ratified";
};

const borderColorMap: Record<StatusChip["status"], string> = {
  Live: successGreen.c200,
  Ratified: successGreen.c200,
  Enacted: successGreen.c200,
  Expired: errorRed.c200,
  "Not Ratified": primaryBlue.c200,
};

const bgColorMap: Record<StatusChip["status"], string> = {
  Live: successGreen.c50,
  Ratified: successGreen.c50,
  Enacted: successGreen.c50,
  Expired: errorRed.c50,
  "Not Ratified": primaryBlue.c50,
};

function StatusChip({ status }: StatusChip) {
  return (
    <Box
      sx={{
        backgroundColor: bgColorMap[status],
        padding: "0.375rem 1.125rem",
        borderRadius: 20,
        display: "inline-block",
        border: `1px solid ${borderColorMap[status]}`,
      }}
    >
      <Typography fontSize="0.75rem">{status}</Typography>
    </Box>
  );
}

export default StatusChip;
