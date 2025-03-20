import { Box, Grid, LinearProgress, styled } from "@mui/material";
import { correctAdaFormatWithSuffix } from "../../lib/utils";
import { errorRed, successGreen } from "../../consts/colors";
import { Typography } from "../Atoms/Typography";
import { VoteSectionLoader } from "../Loaders/VoteSectionLoader";
import FieldSet from "../Atoms/FieldSet";

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
  fontSize: 14,
  color: "#242232",
  padding: "0 10px",
  zIndex: 10,
});

const ThresholdMarker = styled("div")<{ left: number }>(({ left }) => ({
  position: "absolute",
  left: `${left}%`,
  top: "0",
  height: "100%",
  width: "2px",
  backgroundColor: "#8E908E",
  zIndex: 3,
}));

const ThresholdText = styled(Typography)<{ left: number }>(({ left }) => ({
  position: "absolute",
  left: `${left}%`,
  top: "-24px",
  transform: "translateX(-50%)",
  fontSize: 13,
  color: "#525252",
  zIndex: 3,
}));

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
  dataTestId,
}: VoteSectionProps) => {
  const formatValue = (value: number) =>
    isCC ? value : `₳ ${correctAdaFormatWithSuffix(value)}`;
  if (isLoading) {
    return <VoteSectionLoader title={title} />;
  }

  return (
    <Box data-testid={dataTestId} mb={3}>
      <Typography
        data-testid="outcome-voter-label"
        color="textBlack"
        sx={{
          fontWeight: 600,
          fontSize: 18,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {!isDisplayed && (
        <Typography
          data-testid="voting-not-available-label"
          variant="body2"
          color="textGray"
        >
          {`Voting for this action is not available for ${title}`}
        </Typography>
      )}
      {isDisplayed && (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ProgressWrapper>
              <ProgressContainer>
                <StyledLinearProgress
                  data-testid="percentages-progress-bar"
                  variant="determinate"
                  value={yesPercentage}
                />
                <PercentageOverlay>
                  <PercentageText data-testid="yes-percentage-text">
                    {isCC ? "Constitutional" : "Yes"}:
                    <Box component="span" sx={{ fontWeight: 600, marginX: 1 }}>
                      {formatValue(yesVotes)}
                    </Box>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      ({yesPercentage?.toFixed(2)}%)
                    </Box>
                  </PercentageText>
                  <PercentageText data-testid="no-percentage-text">
                    {isCC ? "Unconstitutional" : "No"}:
                    <Box component="span" sx={{ fontWeight: 600, marginX: 1 }}>
                      {formatValue(noVotes)}
                    </Box>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      ({noPercentage?.toFixed(2)}%)
                    </Box>
                  </PercentageText>
                </PercentageOverlay>
                {threshold !== null && (
                  <>
                    <ThresholdMarker left={threshold * 100} />
                  </>
                )}
              </ProgressContainer>
              {threshold !== null && (
                <ThresholdText
                  left={threshold * 100}
                  data-testid="outcome-threshold"
                >
                  {(threshold * 100).toFixed(0)}%
                </ThresholdText>
              )}
            </ProgressWrapper>
          </Grid>

          <Grid item xs={12}>
            <FieldSet title="Vote Metrics">
              <Box display="flex" flexDirection="column" gap={0.5}>
                <Typography
                  data-testid="total-controlled-amount"
                  variant="body2"
                  color="textGray"
                >
                  {isCC ? "Number of Active CCs" : "Total Stake"}:
                  <Box
                    component="span"
                    sx={{
                      color: "textBlack",
                      fontWeight: 600,
                      fontSize: 14,
                      ml: 1,
                    }}
                  >
                    {formatValue(totalControlled)}
                  </Box>
                </Typography>
                <Typography
                  data-testid="outcome-abstain-votes"
                  variant="body2"
                  color="textGray"
                >
                  {isCC ? "Abstain Votes:" : "Abstain Vote Stake:"}
                  <Box
                    component="span"
                    sx={{
                      color: "textBlack",
                      fontWeight: 600,
                      fontSize: 14,
                      ml: 1,
                    }}
                  >
                    {formatValue(abstainVotes)}
                  </Box>
                </Typography>

                <Typography
                  data-testid="outcome-not-voted-votes"
                  variant="body2"
                  color="textGray"
                >
                  {isCC ? "Not Voted:" : "Not Voted Stake:"}
                  <Box
                    component="span"
                    sx={{
                      color: "textBlack",
                      fontWeight: 600,
                      fontSize: 14,
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
