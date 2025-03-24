import { Box } from "@mui/material";
import SearchFiltersSortBar from "../Components/Molecules/SearchFiltersSortBar";
import GovernanceActionsList from "../Components/Molecules/GovernanceActionsList";
import { useAppContext } from "../contexts/AppContext";
import { Typography } from "../Components/Atoms/Typography";
import { useScreenDimension } from "../hooks/useDimensions";

export default function Outcomes() {
  const { walletAPI } = useAppContext();
  const { isMobile } = useScreenDimension();

  return (
    <Box
      component="section"
      display={"flex"}
      flexDirection={"column"}
      flexGrow={1}
    >
      {!walletAPI?.isEnabled && (
        <Typography
          sx={{ paddingX: 1, paddingY: 2 }}
          variant={isMobile ? "title1" : "headline3"}
          component="h1"
        >
          Outcomes
        </Typography>
      )}
      <SearchFiltersSortBar />
      <Box marginTop={4}>
        <GovernanceActionsList />
      </Box>
    </Box>
  );
}
