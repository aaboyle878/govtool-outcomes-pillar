import { Box, IconButton, Skeleton, Tooltip } from "@mui/material";
import { MetadataValidationStatus } from "../../types/api";
import { useSnackbar } from "../../contexts/Snackbar";
import { Typography } from "../Atoms/Typography";
import { getMetadataDataMissingStatusTranslation } from "../../lib/getMetadataDataMissingStatusTranslation";
import { IconShare } from "@intersect.mbo/intersectmbo.org-icons-set";
import { useState } from "react";
import { theme } from "../../theme";
import { useTranslation } from "../../contexts/I18nContext";

interface HeaderProps {
  title: string | null;
  isGovernanceActionLoading: boolean;
  isMetadataLoading: boolean;
  isDataMissing: MetadataValidationStatus | null;
}

export default function Header({
  title,
  isGovernanceActionLoading,
  isMetadataLoading,
  isDataMissing,
}: HeaderProps) {
  const [isShareHovered, setIsShareHovered] = useState<boolean>(false);
  const { addSuccessAlert } = useSnackbar();
  const { t } = useTranslation();
  const {
    palette: { textBlack, primaryBlue },
  } = theme;

  const onCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    addSuccessAlert(t("copiedToClipboard"));
  };

  return (
    <Box
      data-testid="single-action-header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {isGovernanceActionLoading || isMetadataLoading ? (
        <Skeleton variant="rounded" width="75%" height={32} />
      ) : (
        <Typography
          data-testid={`single-action-title`}
          sx={{
            fontSize: 22,
            fontWeight: 600,
            lineHeight: "24px",
            lineClamp: 2,
            wordBreak: "break-word",
            ...(isDataMissing && { color: "errorRed" }),
          }}
        >
          {(isDataMissing &&
            getMetadataDataMissingStatusTranslation(
              t,
              isDataMissing as MetadataValidationStatus
            )) ||
            title}
        </Typography>
      )}
      <Tooltip title={t("tooltips.shareAction")}>
        <IconButton
          sx={{
            width: 24,
            height: 24,
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={onCopy}
          onMouseEnter={() => setIsShareHovered(true)}
          onMouseLeave={() => setIsShareHovered(false)}
          data-testid="single-action-share-link"
        >
          <IconShare
            width="24"
            height="24"
            fill={isShareHovered ? primaryBlue : textBlack}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
