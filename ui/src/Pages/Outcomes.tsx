import { Box } from "@mui/material";
import SearchFiltersSortBar from "../Components/Molecules/SearchFiltersSortBar";
import GovernanceActionsList from "../Components/Molecules/GovernanceActionsList";

export default function OutcomesPage() {
  return (
    <Box>
      <SearchFiltersSortBar />
      <GovernanceActionsList />
    </Box>
  );
}
