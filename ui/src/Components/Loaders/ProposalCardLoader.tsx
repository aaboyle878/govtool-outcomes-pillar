import { Box, Skeleton } from "@mui/material";

const ProposalCardLoader = () => {
  return (
    <Box
      data-testid="proposal-card-loader"
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
            backgroundColor: "rgba(0, 0, 0, 0.11)",
            borderRadius: "14px",
          }}
        >
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" width={200} height={24} />
        </Box>
        <Box
          py={1}
          px={1}
          sx={{ borderRadius: "20px", backgroundColor: "rgba(0, 0, 0, 0.11)" }}
        >
          <Skeleton variant="text" width={100} height={24} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProposalCardLoader;
