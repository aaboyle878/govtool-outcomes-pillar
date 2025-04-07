import { Box, Typography } from "@mui/material";
import { useTranslation } from "../../contexts/I18nContext";

const AbstractLoader = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 12,
          color: "textGray",
          lineHeight: "16px",
          marginBottom: "4px",
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {t("outcome.abstract")}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: "20px",
          WebkitLineClamp: 2,
          maxWidth: "auto",
          fontWeight: 400,
          filter: "blur(2px) brightness(0.8) grayscale(0.2)",
          transition: "filter 0.5s ease-in-out",
          opacity: 0.7,
          color: "gray",
        }}
      >
        {t("loaders.loadingAbstract")}
      </Typography>
    </Box>
  );
};

export default AbstractLoader;
