import { Avatar, Box } from "@mui/material";
import { Typography } from "../Atoms/Typography";
import { errorRed, successGreen } from "../../consts/colors";
import {
  IconThumbDown,
  IconThumbUp,
} from "@intersect.mbo/intersectmbo.org-icons-set";

type OutcomeIndicatorProps = {
  title: string;
  passed: boolean;
  isDisplayed: boolean;
  isLoading?: boolean;
  dataTestId?: string;
};

export const OutcomeIndicator = ({
  title,
  passed,
  isDisplayed,
  isLoading = true,
  dataTestId,
}: OutcomeIndicatorProps) => {
  return (
    <Box data-testid={dataTestId} width="100%">
      <Avatar
        data-testid="outcome-icon"
        variant="rounded"
        sx={{
          bgcolor: isLoading
            ? "gray"
            : !isDisplayed
            ? "gray"
            : passed
            ? successGreen.c600
            : errorRed.c500,
          width: "auto",
          height: 24,
          borderRadius: 10,
          paddingY: 0.625,
          mb: 1,
          opacity: !isDisplayed ? 0.6 : 1,
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ gap: 0.5 }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: 20,
              height: 20,
            }}
          >
            {!isDisplayed ? (
              "-"
            ) : passed ? (
              <IconThumbUp fill="#0f5132" />
            ) : (
              <IconThumbDown fill="#7f1d1d" />
            )}
          </Box>
          <Typography
            data-testid="voter-type-label"
            sx={{
              fontWeight: 500,
              fontSize: 13,
              lineHeight: 1.75,
            }}
            color="white"
          >
            {title}
          </Typography>
        </Box>
      </Avatar>
    </Box>
  );
};
