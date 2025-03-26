import { IconInformationCircle } from "@intersect.mbo/intersectmbo.org-icons-set";
import { Box, Icon, Tooltip } from "@mui/material";
import { GovernanceAction } from "../../types/api";
import {
  encodeCIP129Identifier,
  formatTimeStamp,
  getProposalStatus,
} from "../../lib/utils";
import { Typography } from "../Atoms/Typography";
import { useScreenDimension } from "../../hooks/useDimensions";
import { useTranslation } from "../../contexts/I18nContext";

interface GovActionDatesInfoProps {
  action: GovernanceAction;
  isCard?: boolean;
}

const GovActionDatesInfo = ({
  action,
  isCard = false,
}: GovActionDatesInfoProps) => {
  const { isMobile } = useScreenDimension();
  const { t } = useTranslation();

  const proposalStatus = getProposalStatus(action.status);

  const isExpired = ["Expired", "Not Ratified", "Enacted"].includes(
    proposalStatus
  );

  const idCIP129 = encodeCIP129Identifier({
    txID: action?.tx_hash,
    index: action?.index.toString(16).padStart(2, "0"),
    bech32Prefix: "gov_action",
  });

  const renderSubmissionInfoTooltip = () => {
    return (
      <Tooltip
        title={
          <Box sx={{ bgcolor: "rgb(36, 34, 50)", p: 1, borderRadius: 1 }}>
            <Typography variant="body1" fontWeight={400} color={"white"}>
              {t("outcome.dates.submission.title")}
            </Typography>
            <Typography variant="body2" fontWeight={400} color={"gray"}>
              {t("outcome.dates.submission.description")}
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
          arrow: {
            sx: {
              color: "rgb(36, 34, 50)",
            },
          },
        }}
      >
        <Icon>
          <IconInformationCircle width={19} height={19} />
        </Icon>
      </Tooltip>
    );
  };

  const renderExpirationInfoTooltip = () => {
    return (
      <Tooltip
        title={
          <Box sx={{ bgcolor: "rgb(36, 34, 50)", p: 1, borderRadius: 1 }}>
            <Typography variant="body1" fontWeight={400} color={"white"}>
              {t("outcome.dates.expired.title")}
            </Typography>
            <Typography variant="body2" fontWeight={400} color={"gray"}>
              {t("outcome.dates.expired.paragraphOne")}
              <br />
              {t("outcome.dates.expired.paragraphTwo")}
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
          arrow: {
            sx: {
              color: "rgb(36, 34, 50)",
            },
          },
        }}
      >
        <Icon>
          <IconInformationCircle width={19} height={19} />
        </Icon>
      </Tooltip>
    );
  };

  return (
    <Box
      data-testid={`${idCIP129}-dates`}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: "12px",
        textAlign: "center",
        border: 1,
        borderColor: "lightblue",
      }}
    >
      <Box
        data-testid={`${idCIP129}-submitted-date`}
        sx={{
          backgroundColor: "#D6E2FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          padding: "6px 0",
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="caption" sx={{ fontSize: 12 }}>
          {t("outcome.dates.submitted")}{" "}
          <Typography component="span" fontWeight={600} variant="caption">
            {formatTimeStamp(
              action.time,
              isCard || isMobile ? "short" : "full"
            )}
          </Typography>
        </Typography>
        <Typography variant="caption">
          ({t("outcome.epoch")} {action.epoch_no})
        </Typography>
        {renderSubmissionInfoTooltip()}
      </Box>
      <Box
        data-testid={`${idCIP129}-${isExpired ? "Expired" : "Expires"}-date`}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          padding: "6px 0",
          borderBottomLeftRadius: "inherit",
          borderBottomRightRadius: "inherit",
        }}
      >
        <Typography variant="caption">
          {isExpired
            ? t("outcome.dates.expired.label")
            : t("outcome.dates.expires")}{" "}
          <Typography component="span" fontWeight={600} variant="caption">
            {action.status.expired_epoch !== null
              ? formatTimeStamp(
                  action.status_times.expired_time as string,
                  isCard || isMobile ? "short" : "full"
                )
              : formatTimeStamp(
                  action.expiry_date,
                  isCard || isMobile ? "short" : "full"
                )}
          </Typography>
        </Typography>
        <Typography variant="caption">
          ({t("outcome.epoch")}{" "}
          {action.status.expired_epoch !== null
            ? action.status.expired_epoch
            : action.expiration}
          )
        </Typography>
        {renderExpirationInfoTooltip()}
      </Box>
    </Box>
  );
};

export default GovActionDatesInfo;
