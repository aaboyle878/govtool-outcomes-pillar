import { IconInformationCircle } from "@intersect.mbo/intersectmbo.org-icons-set";
import { Box, Icon, Tooltip, Typography } from "@mui/material";
import { GovernanceAction, Status } from "../../types/api";
import { formatTimeStamp, getProposalStatus } from "../../lib/utils";

interface GovActionDatesInfoProps {
  action: GovernanceAction;
}

const GovActionDatesInfo = ({ action }: GovActionDatesInfoProps) => {
  const proposalStatus = getProposalStatus(action.status);

  const isExpired = ["Expired", "Not Ratified", "Enacted"].includes(proposalStatus);

  const renderSubmissionInfoTooltip = () => {
    return (
      <Tooltip
        title={
          <Box sx={{ bgcolor: "black", p: 1 }}>
            <Typography variant="body1" color="white">
              Submission Date
            </Typography>
            <Typography variant="body2" color="gray">
              The date when the governance action was submitted on-chain.{" "}
            </Typography>
          </Box>
        }
        arrow
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "transparent",
              p: 0,
              m: 0,
            },
          },
        }}
      >
        <Icon>
          <IconInformationCircle />
        </Icon>
      </Tooltip>
    );
  };

  const renderExpirationInfoTooltip = () => {
    return (
      <Tooltip
        title={
          <Box sx={{ bgcolor: "black", p: 1 }}>
            <Typography variant="body1" color="white">
              {isExpired ? "Expired Date" : "Expiry Date"}
            </Typography>
            <Typography variant="body2" color="gray">
              The date when the governance action will expiry if it doesn&apos;t
              reach ratification thresholds.
              <br /> IMPORTANT: If the governance action is ratified before the
              expiry date it will be considered ratified and it will not be
              available to vote on afterwards.
            </Typography>
          </Box>
        }
        arrow
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "transparent",
              p: 0,
              m: 0,
            },
          },
        }}
      >
        <Icon>
          <IconInformationCircle />
        </Icon>
      </Tooltip>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #D6E2FF",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#D6E2FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: "6px 0",
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
        }}
      >
        <Typography variant="caption">
          Submitted:{" "}
          <Typography component="span" fontWeight={500} variant="caption">
            {formatTimeStamp(action.time)}
          </Typography>
        </Typography>
        {action.epoch_no && (
          <Typography variant="caption">
            (Epoch{" "}
            <Typography component="span" variant="caption">
              {action.epoch_no}
            </Typography>
            )
          </Typography>
        )}
        {renderSubmissionInfoTooltip()}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: "6px 0",
          borderBottomLeftRadius: "inherit",
          borderBottomRightRadius: "inherit",
        }}
      >
        <Typography variant="caption">
          {isExpired ? "Expired: " : "Expires: "}
          <Typography component="span" fontWeight={500} variant="caption">
            {action.status.expired_epoch !== null
              ? formatTimeStamp(action.status_times.expired_time as string)
              : formatTimeStamp(action.expiry_date)}
          </Typography>
        </Typography>
        <Typography variant="caption">
          (Epoch{" "}
          <Typography component="span" variant="caption">
            {action.status.expired_epoch !== null
              ? action.status.expired_epoch
              : action.expiration}
          </Typography>
          )
        </Typography>
        {renderExpirationInfoTooltip()}
      </Box>
    </Box>
  );
};

export default GovActionDatesInfo;
