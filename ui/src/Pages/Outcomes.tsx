import { Box } from "@mui/material";
import SearchFiltersSortBar from "../Components/Molecules/SearchFiltersSortBar";
import { GOVERNANCE_ACTION_FILTERS } from "../consts/filters";
import { GOVERNANCE_ACTION_STATUS_FILTERS } from "../consts/status-filters";
import { GOVERNANCE_ACTION_SORT_OPTIONS } from "../consts/sort-options";
import { useState } from "react";
import GovernanceActionsList from "../Components/Molecules/GovernanceActionsList";

export default function OutcomesPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSorting, setSelectedSorting] = useState("");

  return (
    <Box>
      <SearchFiltersSortBar
        filterOptions={GOVERNANCE_ACTION_FILTERS}
        statusOptions={GOVERNANCE_ACTION_STATUS_FILTERS}
        sortOptions={GOVERNANCE_ACTION_SORT_OPTIONS}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        selectedSorting={selectedSorting}
        setSelectedSorting={setSelectedSorting}
      />
      <GovernanceActionsList />
    </Box>
  );
}
