import { Box, Grid, Skeleton, styled } from "@mui/material";
import { Typography } from "../Atoms/Typography";

type VoteSectionLoaderProps = {
  title?: string;
};

const ProgressContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: 32,
  borderRadius: 20,
  overflow: "hidden",
});

export const VoteSectionLoader = ({
  title = "Loading...",
}: VoteSectionLoaderProps) => {
  return (
    <Box mb={3}>
      <Box mb={1}>
        <Typography
          color="textGray"
          sx={{
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ProgressContainer>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={32}
              sx={{ borderRadius: 20 }}
            />
          </ProgressContainer>
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={105}
            sx={{ borderRadius: 1 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
