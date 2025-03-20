import { IconInformationCircle } from "@intersect.mbo/intersectmbo.org-icons-set";
import { Box, Button, Tooltip, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { formatTimeStamp } from "../../lib/utils";
import { theme } from "../../theme";

const ProposalCard = ({ proposal }: { proposal: any }) => {
  const {
    palette: { textColors, customDivider },
  } = theme;

  return (
    <Box
      data-testid={`proposal-${
        proposal?.attributes?.content?.attributes?.gov_action_type?.attributes
          ?.gov_action_type_name
          ? proposal?.attributes?.content?.attributes?.gov_action_type?.attributes?.gov_action_type_name?.toLowerCase()
          : ""
      }-card`}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Box display={"flex"} flexDirection={"row"} gap={2}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          py={1}
          px={1}
          sx={{
            backgroundColor: customDivider.primary,
            borderRadius: "14px",
          }}
        >
          <Tooltip title={"Proposal Date"}>
            <Box display={"flex"} alignItems={"center"}>
              <IconInformationCircle color="textBlack" />
            </Box>
          </Tooltip>
          <Typography
            variant="body2"
            component="p"
            color={textColors.black}
            data-testid="proposed-date-wrapper"
          >
            Proposed on:
            <span data-testid="proposed-date">
              {formatTimeStamp(proposal?.attributes?.createdAt, "short")}
            </span>
          </Typography>
        </Box>
        <Box>
          <Link
            to={`/proposal_discussion/${proposal?.id}`}
            data-testid={`proposal-${proposal?.id}-view-details-link-wrapper`}
          >
            <Button
              variant="contained"
              data-testid={`proposal-${proposal?.id}-view-details`}
              fullWidth
            >
              View Details
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProposalCard;
