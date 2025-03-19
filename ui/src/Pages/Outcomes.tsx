import { Box } from "@mui/material";
import SearchFiltersSortBar from "../Components/Molecules/SearchFiltersSortBar";
import GovernanceActionsList from "../Components/Molecules/GovernanceActionsList";
import { useAppContext } from "../contexts/AppContext";
import { Typography } from "../Components/Atoms/Typography";
import { useScreenDimension } from "../hooks/useDimensions";

export default function Outcomes() {
  const { walletAPI } = useAppContext();
  const { isEnabled } = walletAPI;
  const { isMobile } = useScreenDimension();

  return (
    <Box
      component="section"
      display={"flex"}
      flexDirection={"column"}
      flexGrow={1}
    >
      {!isEnabled && (
        <Typography
          sx={{ mb: isMobile ? 3.75 : 6 }}
          variant={isMobile ? "title1" : "headline3"}
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
