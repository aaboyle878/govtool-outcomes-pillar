import { Box, Link } from "@mui/material";
import { Typography } from "../Atoms/Typography";
import { useTranslation } from "../../contexts/I18nContext";
import { useModal } from "../../contexts/modal";
interface Reference {
  "@type": string;
  label: string;
  uri: string;
}
type ReferencesProps = {
  links: Reference[];
};
function References({ links }: ReferencesProps) {
  const { t } = useTranslation();
  const { openModal } = useModal();

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          color: "textGray",
          fontWeight: 600,
        }}
      >
        {t("outcome.supportingLinks")}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {links &&
          links.map((link, index) => (
            <Box key={index}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "textGray",
                  wordBreak: "break-word",
                }}
              >
                {link?.label}
              </Typography>
              <Link
                onClick={() => {
                  openModal({
                    type: "externalLink",
                    state: {
                      externalLink: link?.uri,
                    },
                  });
                }}
                style={{ textDecoration: "none" }}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap="4px"
                >
                  <img
                    alt="Link icon."
                    height={15}
                    width={15}
                    src="/icons/Link.svg"
                  />
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      overflow: "hidden",
                      width: "100%",
                      color: "primaryBlue",
                      wordBreak: "break-word",
                    }}
                  >
                    {link?.uri}
                  </Typography>
                </Box>
              </Link>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default References;
