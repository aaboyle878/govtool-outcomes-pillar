import { Avatar, Box } from "@mui/material";
import { Typography } from "../Atoms/Typography";
import { errorRed, successGreen } from "../../consts/colors";
import { useTranslation } from "../../contexts/I18nContext";

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
  const { t } = useTranslation();

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
          opacity: !isDisplayed ? 0.6 : 1,
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ gap: 1 }}
        >
          <Typography
            data-testid="voter-type-label"
            sx={{
              fontWeight: 400,
              fontSize: 13,
            }}
            color="white"
          >
            {title}:
          </Typography>
          <Typography
            color="textBlack"
            sx={{
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {" "}
            {!isDisplayed
              ? "-"
              : passed
              ? t("outcome.votes.yes")
              : t("outcome.votes.no")}
          </Typography>
        </Box>
      </Avatar>
    </Box>
  );
};
