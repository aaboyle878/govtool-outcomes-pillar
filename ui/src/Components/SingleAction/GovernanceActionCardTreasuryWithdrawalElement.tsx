import { Box } from "@mui/material";
import { Typography } from "../Atoms/Typography";
import CopyButton from "../Atoms/CopyButton";
import { correctVoteAdaFormat } from "../../lib/utils";
import { useTranslation } from "../../contexts/I18nContext";

type Props = {
  receivingAddress: string;
  amount: number;
};

export const GovernanceActionCardTreasuryWithdrawalElement = ({
  receivingAddress,
  amount,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography
          data-testid="receiving-address-label"
          sx={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "20px",
            color: "textGray",
          }}
        >
          {t("outcome.treasury.receivingAddress")}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <Typography
            data-testid="receiving-address"
            sx={{
              color: "primaryBlue",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "20px",
              wordBreak: "break-word",
              overflow: "hidden",
            }}
          >
            {receivingAddress}
          </Typography>
          <Box>
            <CopyButton text={receivingAddress} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "20px",
            color: "textGray",
          }}
          data-testid="amount-label"
        >
          {t("outcome.treasury.amount")}
        </Typography>
        <Typography
          data-testid="amount"
          sx={{
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "20px",
          }}
        >
          ₳ {correctVoteAdaFormat(amount) ?? 0}
        </Typography>
      </Box>
    </Box>
  );
};
