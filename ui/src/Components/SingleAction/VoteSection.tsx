import { Box, Grid, LinearProgress, styled } from "@mui/material";
import { correctAdaFormatWithSuffix } from "../../lib/utils";
import { errorRed, successGreen } from "../../consts/colors";
import { Typography } from "../Atoms/Typography";
import { VoteSectionLoader } from "../Loaders/VoteSectionLoader";
import FieldSet from "../Atoms/FieldSet";
import { theme } from "../../theme";
import { useTranslation } from "../../contexts/I18nContext";

const {
  palette: { badgeColors },
} = theme;

type VoteSectionProps = {
  title: string;
  yesVotes?: number;
  noVotes?: number;
  totalControlled?: number;
  abstainVotes?: number;
  notVotedVotes?: number;
  threshold?: number | null;
  yesPercentage?: number;
  noPercentage?: number;
  isCC?: boolean;
  isDisplayed: boolean;
  isLoading?: boolean;
  isDataReady?: boolean;
  dataTestId?: string;
};

const ProgressWrapper = styled(Box)({
  position: "relative",
  width: "100%",
});

const ProgressContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: 32,
  borderRadius: 20,
  overflow: "hidden",
});

const StyledLinearProgress = styled(LinearProgress)({
  height: "100%",
  borderRadius: 10,
  backgroundColor: errorRed.c100,
  ".MuiLinearProgress-bar": {
    backgroundColor: successGreen.c100,
  },
});

const PercentageOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  pointerEvents: "none",
});

const PercentageText = styled(Typography)({
  fontSize: 13,
  fontWeight: 400,
  color: "textBlack",
  padding: "0 10px",
  zIndex: 10,
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    padding: "0 4px",
  },
});

const ThresholdLine = styled(Box)({
  position: "absolute",
  width: "2px",
  height: "100%",
  backgroundColor: badgeColors.lightPurple,
  zIndex: 4,
});

const ThresholdIndicator = styled(Box)<{ left: number }>(({ left }) => ({
  position: "absolute",
  left: `${left}%`,
  top: "-24px",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 5,
}));

const ThresholdBubble = styled(Box)({
  backgroundColor: badgeColors.lightPurple,
  borderRadius: "12px",
  padding: "2px 8px",
  border: `1px solid ${badgeColors.lightPurple}`,
  boxShadow: "0px 1px 2px rgba(0,0,0,0.08)",
});

const ThresholdText = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: "textBlack",
  lineHeight: 1.2,
});

const ThresholdArrow = styled(Box)({
  width: 0,
  height: 0,
  borderLeft: "6px solid transparent",
  borderRight: "6px solid transparent",
  borderTop: `6px solid ${badgeColors.lightPurple}`,
  marginTop: "-1px",
});

export const VoteSection = ({
  title,
  yesVotes = 0,
  noVotes = 0,
  totalControlled = 0,
  abstainVotes = 0,
  notVotedVotes = 0,
  threshold = null,
  yesPercentage = 0,
  noPercentage = 0,
  isCC = false,
  isDisplayed,
  isLoading = true,
  isDataReady = false,
  dataTestId,
}: VoteSectionProps) => {
  const { t } = useTranslation();
  const formatValue = (value: number) =>
    isCC ? value : `₳ ${correctAdaFormatWithSuffix(value)}`;
  if (!isDataReady || isLoading) {
    return <VoteSectionLoader title={title} />;
  }

  return (
    <Box data-testid={dataTestId} mb={3}>
      <Typography
        data-testid={`${title}-outcome-voter-label`}
        color="textBlack"
        sx={{
          fontWeight: 600,
          fontSize: 16,
          mb: 1.875,
        }}
      >
        {title}
      </Typography>
      {!isDisplayed && (
        <Typography
          data-testid="voting-not-available-label"
          sx={{
            fontWeight: 400,
            fontSize: 13,
          }}
          color="textBlack"
        >
          {t(title)}{" "}
          <span>
            <strong>{t("outcome.votes.votingNotAvailable")}</strong>{" "}
            {t("outcome.votes.onThisTypeOfAction")}
          </span>
        </Typography>
      )}
      {isDisplayed && (
        <Grid container spacing={1.875}>
          <Grid item xs={12}>
            <ProgressWrapper>
              {threshold !== null && (
                <>
                  <ThresholdIndicator left={threshold * 100}>
                    <ThresholdBubble>
                      <ThresholdText data-testid={`${title}-outcome-threshold`}>
                        {(threshold * 100).toFixed(0)}%
                      </ThresholdText>
                    </ThresholdBubble>
                    <ThresholdArrow />
                  </ThresholdIndicator>
                  <ThresholdLine
                    sx={{
                      left: `${threshold * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  />
                </>
              )}
              <ProgressContainer>
                <StyledLinearProgress
                  data-testid={`${title}-percentages-progress-bar`}
                  variant="determinate"
                  value={yesPercentage}
                />
                <PercentageOverlay>
                  <PercentageText>
                    {t("outcome.votes.yes")}:
                    <Box
                      data-testid={`${title}-yes-votes-submitted`}
                      component="span"
                      sx={{
                        fontWeight: 600,
                        marginLeft: 0.5,
                        fontSize: 13,
                        lineHeight: 1.75,
                      }}
                    >
                      {`${formatValue(yesVotes)} (${yesPercentage?.toFixed(
                        2
                      )}%)`}
                    </Box>
                  </PercentageText>
                  <PercentageText>
                    {t("outcome.votes.no")}:
                    <Box
                      data-testid={`${title}-no-votes-submitted`}
                      component="span"
                      sx={{
                        fontWeight: 600,
                        marginLeft: 0.5,
                        fontSize: 13,
                        lineHeight: 1.75,
                      }}
                    >
                      {`${formatValue(noVotes)} (${noPercentage?.toFixed(2)}%)`}
                    </Box>
                  </PercentageText>
                </PercentageOverlay>
              </ProgressContainer>
            </ProgressWrapper>
          </Grid>

          <Grid item xs={12}>
            <FieldSet title={t("outcome.votes.voteMetrics")}>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography
                  data-testid={`${title}-total-controlled-amount`}
                  sx={{
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: 1.75,
                  }}
                  color="textBlack"
                >
                  {isCC
                    ? t("outcome.votes.numberOfCCs")
                    : t("outcome.votes.totalStake")}
                  :
                  <Box
                    component="span"
                    sx={{
                      color: "textBlack",
                      fontWeight: 600,
                      ml: 1,
                    }}
                  >
                    {formatValue(totalControlled)}
                  </Box>
                </Typography>
                <Typography
                  data-testid={`${title}-outcome-abstain-votes`}
                  sx={{
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: 1.75,
                  }}
                  color="textBlack"
                >
                  {t("outcome.votes.abstainVotes")}:
                  <Box
                    component="span"
                    sx={{
                      color: "textBlack",
                      fontWeight: 600,
                      ml: 1,
                    }}
                  >
                    {formatValue(abstainVotes)}
                  </Box>
                </Typography>

                <Typography
                  data-testid={`${title}-outcome-not-voted-votes`}
                  sx={{
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: 1.75,
                  }}
                  color="textBlack"
                >
                  {t("outcome.votes.notVoted")}:
                  <Box
                    component="span"
                    sx={{
                      color: "textBlack",
                      fontWeight: 600,
                      ml: 1,
                    }}
                  >
                    {formatValue(notVotedVotes)}
                  </Box>
                </Typography>
              </Box>
            </FieldSet>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
