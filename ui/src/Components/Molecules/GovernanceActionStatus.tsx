import { Box } from "@mui/material";
import { Status } from "../../types/api";
import StatusChip from "./StatusChip";
import { Typography } from "../Atoms/Typography";
import { useScreenDimension } from "../../hooks/useDimensions";
import { useTranslation } from "../../contexts/I18nContext";

interface GovernanceActionStatusProps {
  status: Status;
  actionId: string;
  isCard?: boolean;
}

export default function GovernanceActionStatus({
  status,
  actionId,
  isCard = true,
}: GovernanceActionStatusProps) {
  const { isMobile } = useScreenDimension();
  const { t } = useTranslation();

  const getStatusChips = () => {
    const { ratified_epoch, enacted_epoch, dropped_epoch, expired_epoch } =
      status;

    if (!ratified_epoch && !enacted_epoch && !dropped_epoch && !expired_epoch) {
      return <StatusChip status={t("outcome.status.inProgress")} />;
    }

    if (ratified_epoch && enacted_epoch) {
      return (
        <Box display="flex" flexDirection="row" gap={2}>
          <StatusChip status={t("outcome.status.ratified")} />
          <StatusChip status={t("outcome.status.enacted")} />
        </Box>
      );
    }

    if (ratified_epoch && !enacted_epoch) {
      return <StatusChip status={t("outcome.status.ratified")} />;
    }

    if (!ratified_epoch && enacted_epoch) {
      return <StatusChip status={t("outcome.status.enacted")} />;
    }

    if (expired_epoch && dropped_epoch) {
      return (
        <Box display="flex" flexDirection="row" gap={2}>
          <StatusChip status={t("outcome.status.expired")} />
          <StatusChip status={t("outcome.status.dropped")} />
        </Box>
      );
    }

    if (dropped_epoch) {
      return <StatusChip status={t("outcome.status.dropped")} />;
    }

    if (expired_epoch) {
      return <StatusChip status={t("outcome.status.expired")} />;
    }

    return null;
  };
  return (
    <Box
      data-testid={`${actionId}-status`}
      display="flex"
      justifyContent={isCard ? "space-between" : ""}
      gap={isCard ? 0 : isMobile ? 3 : 8.65}
      width="100%"
      alignItems="center"
      flexWrap="wrap"
      sx={{
        "& > .MuiTypography-root": {
          marginBottom: "4px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: isCard ? 12 : 14,
          color: "textGray",
          fontWeight: isCard ? 500 : 600,
        }}
      >
        {t("outcome.status.title")}
      </Typography>
      {getStatusChips()}
    </Box>
  );
}
