import { IconButton } from "@mui/material";
import CopyIcon from "../../Assets/Icons/CopyIcon";
import { useSnackbar } from "../../contexts/Snackbar";
import { Tooltip } from "./Tooltip";
import { useTranslation } from "../../contexts/I18nContext";

function CopyButton({ text }: { text: string }) {
  const { addSuccessAlert } = useSnackbar();
  const { t } = useTranslation();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    addSuccessAlert(t("copiedToClipboard"));
  };

  return (
    <Tooltip paragraphOne={t("copyToClipboard")}>
      <IconButton
        data-testid="copy-button"
        onClick={handleCopyClick}
        size="small"
      >
        <CopyIcon />
      </IconButton>
    </Tooltip>
  );
}

export default CopyButton;
