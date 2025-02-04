import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import GovernanceActionCard from "./GovernanceActionCard";
import { useGetGovernanceActions } from "../../hooks/useGetGovernanceActionsQuery";
import { useSearchParams } from "react-router-dom";
import { ActionsEmptyState } from "./ActionsEmptyState";

export default function GovernanceActionsList({}) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  const { govActions, isGovActionsLoading } = useGetGovernanceActions(search);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {isGovActionsLoading && (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            minHeight: "75vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isGovActionsLoading && govActions?.length === 0 && (
        <Box
          sx={{
            paddingY: 3,
          }}
        >
          <ActionsEmptyState />
        </Box>
      )}
      {!isGovActionsLoading && govActions && govActions?.length > 0 && (
        <Grid container spacing={{ xs: 4, sm: 6 }} sx={{ marginX: "auto" }}>
          {govActions &&
            govActions?.map((action, index) => (
              <Grid item xs={12} md={6} xl={4} key={index}>
                <GovernanceActionCard action={action} />
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
}
