import { forwardRef } from "react";
import { Box, Button, Typography } from "@mui/material";

import { useModal } from "../../contexts/modal";
import { useScreenDimension } from "../../hooks/useDimensions";
import { useTranslation } from "../../contexts/I18nContext";
import { theme } from "../../theme";
import { openInNewTab } from "../../lib/openInNewTab";
import { useAppContext } from "../../contexts/AppContext";
import { ModalWrapper } from "./ModalWrapper";
import { ModalHeader } from "./ModalHeader";
import { ModalContents } from "./ModalContents";

export interface ExternalLinkModalState {
  externalLink: string;
}

export const ExternalLinkModal = forwardRef<HTMLDivElement>((_, ref) => {
  const { state, closeModal } = useModal<ExternalLinkModalState>();
  const { isMobile } = useScreenDimension();
  const { t } = useTranslation();
  const { ipfsGateway } = useAppContext();
  const {
    palette: { primaryBlue, fadedPurple },
  } = theme;

  return (
    <ModalWrapper dataTestId="external-link-modal" ref={ref}>
      <img
        alt="Status icon"
        src="/images/WarningYellow.webp"
        style={{ height: "84px", margin: "0 auto", width: "84px" }}
      />
      <ModalHeader sx={{ marginTop: "34px" }}>
        {t(`modals.externalLink.${isMobile ? "safety" : "beCareful"}`)}
      </ModalHeader>
      <ModalContents>
        <Typography textAlign="center" sx={{ fontSize: "16px" }}>
          {t(
            `modals.externalLink.${isMobile ? "thisIs" : "youAreAboutToOpen"}`
          )}
        </Typography>
        <Typography
          textAlign="center"
          sx={{
            fontSize: "16px",
            marginBottom: "38px",
            color: primaryBlue,
            textDecoration: "underline",
            wordBreak: "break-word",
          }}
        >
          {state?.externalLink}
        </Typography>
        <Typography
          textAlign="center"
          sx={{
            fontSize: isMobile ? "16px" : "14px",
            marginBottom: "38px",
            color: fadedPurple,
          }}
        >
          {t("modals.externalLink.description")}
        </Typography>
      </ModalContents>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          gap: "38px",
        }}
      >
        <Button
          data-testid="continue-modal-button"
          onClick={() => {
            if (state?.externalLink) {
              openInNewTab(state?.externalLink, ipfsGateway);
            }
            closeModal();
          }}
          sx={{
            borderRadius: 50,
            textTransform: "none",
            height: "40px",
          }}
          variant="contained"
        >
          {t(`${isMobile ? "continue" : "modals.externalLink.continueTo"}`)}
        </Button>
        <Button
          data-testid="cancel-modal-button"
          onClick={() => {
            closeModal();
          }}
          sx={{
            borderRadius: 50,
            padding: "10px 26px",
            textTransform: "none",
            height: "40px",
            width: "117px",
          }}
          variant="outlined"
        >
          {t("cancel")}
        </Button>
      </Box>
    </ModalWrapper>
  );
});
