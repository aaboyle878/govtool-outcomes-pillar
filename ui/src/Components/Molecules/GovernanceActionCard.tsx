import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Link,
} from "@mui/material";
import GovernanceActionCardElement from "./GovernanceActionCardElement";
import GovernanceActionCardIdElement from "./GovernanceActionCardIdElement";
import {
  encodeCIP129Identifier,
  getFullGovActionId,
  getProposalStatus,
} from "../../lib/utils";
import { useMetadata } from "../../hooks/useMetadata";
import { GovernanceAction } from "../../types/api";
import GovActionDatesInfo from "../Atoms/GovActionDatesInfo";
import GovernanceActionStatus from "./GovernanceActionStatus";

interface GovernanceActionCardProps {
  action: GovernanceAction;
}

function GovernanceActionCard({ action }: GovernanceActionCardProps) {
  const { metadata, metadataValid } = useMetadata(action);

  const idCIP129 = encodeCIP129Identifier({
    txID: action?.tx_hash,
    index: action?.index.toString(16).padStart(2, "0"),
    bech32Prefix: "gov_action",
  });

  const status = getProposalStatus(action?.status);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        display: "flex",
        padding: { xs: 1, sm: 2 },
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
        boxShadow: "0px 4px 15px 0px #DDE3F5",
        backgroundColor: !metadataValid
          ? "rgba(251, 235, 235, 0.50)"
          : "rgba(255, 255, 255, 0.3)",
        ...(!metadataValid && {
          border:
            status === "Live"
              ? "1px solid #FFCBAD"
              : !metadataValid
              ? "1px solid #F6D5D5"
              : "1px solid #C0E4BA",
        }),
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {metadataValid && (
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              {action.title || metadata?.body?.title}
            </Typography>
          </Box>
        )}
        <Box sx={{ marginTop: 2 }}>
          <GovActionDatesInfo action={action} />
        </Box>
        {metadataValid && (
          <Box sx={{ marginTop: 2 }}>
            <GovernanceActionCardElement
              title="Abstract"
              description={action.abstract || metadata?.body?.abstract}
            />
          </Box>
        )}
        {!metadataValid && (
          <Box sx={{ marginTop: 3 }}>
            <Typography sx={{ fontWeight: 600, color: "errorRed" }}>
              Data not processable!
            </Typography>
          </Box>
        )}
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ marginTop: 2 }}
        >
          <GovernanceActionCardElement
            title="Governance Action Type"
            description={action?.type}
          />

          <GovernanceActionStatus status={action?.status} />

          <GovernanceActionCardIdElement
            title="Governance Action ID"
            id={getFullGovActionId(action?.tx_hash, action?.index)}
          />

          <GovernanceActionCardIdElement
            title="(CIP-129) Governance Action ID"
            id={idCIP129}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Link
          href={`outcomes/governance_actions/${getFullGovActionId(
            action?.tx_hash,
            action?.index
          )}`}
          color="inherit"
          sx={{
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "50px",
              color: "neutralWhite",
              backgroundColor: "primaryBlue",
              width: "100%",
            }}
          >
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default GovernanceActionCard;
