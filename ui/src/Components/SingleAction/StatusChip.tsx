import { Box, Typography } from "@mui/material";
import { errorRed, primaryBlue, successGreen } from "../../consts/colors";

type StatusChip = {
  status: "Live" | "Ratified" | "Enacted" | "Expired" | "Not Ratified";
  isUppercase?: boolean;
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

function StatusChip({ status, isUppercase }: StatusChip) {
  return (
    <Box
      py={0.75}
      px={2.25}
      borderRadius={100}
      border={1}
      borderColor={borderColorMap[status]}
      bgcolor={bgColorMap[status]}
      textAlign="center"
    >
      <Typography
        fontSize={12}
        fontWeight={400}
        lineHeight="16px"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {isUppercase ? status.toLocaleUpperCase() : status}
      </Typography>
    </Box>
  );
}

export default StatusChip;
