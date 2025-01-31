import { Box, Grid } from "@mui/material";
import GovernanceActionCard from "./GovernanceActionCard";
import { useGetGovernanceActions } from "../../hooks/useGetGovernanceActionsQuery";

export default function GovernanceActionsList({}) {
   const { govActions, isGovActionsLoading } = useGetGovernanceActions();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container spacing={{ xs: 4, sm: 6 }} sx={{ marginX: "auto" }}>
        {!isGovActionsLoading &&
          govActions?.map((action, index) => (
            <Grid item xs={12} md={6} xl={4} key={index}>
              <GovernanceActionCard action={action} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
