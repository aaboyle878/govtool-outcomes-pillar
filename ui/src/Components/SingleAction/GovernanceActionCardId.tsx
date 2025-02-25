import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CopyIcon from "../../Assets/Icons/CopyIcon";
import { useSnackbar } from "../../contexts/Snackbar";

interface GovernanceActionCardIdProps {
  title: string;
  id: string;
}

export default function GovernanceActionCardId({
  title,
  id,
}: GovernanceActionCardIdProps) {
  const { addSuccessAlert } = useSnackbar();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(id);
    addSuccessAlert("Copied to clipboard!");
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0.5 }}
    >
      <Typography
        sx={{
          color: "neutralGray",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1,
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            color: "primaryBlue",
            wordBreak: "break-word",
            overflow: "hidden",
            flexGrow: 1,
            flexShrink: 1,
            minWidth: 0,
          }}
        >
          {id}
        </Typography>
        <Tooltip title="Copy to clipboard">
          <IconButton onClick={handleCopyClick} size="small">
            <CopyIcon width={16} height={16} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
