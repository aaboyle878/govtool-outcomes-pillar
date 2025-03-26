import { Box, Tooltip as MUIToolTip } from "@mui/material";
import { Typography } from "./Typography";
import React from "react";

export type TooltipProps = {
  heading?: string;
  paragraphOne?: string;
  paragraphTwo?: string;
  children: React.ReactElement<any>;
};

export const Tooltip = ({
  heading,
  paragraphOne,
  paragraphTwo,
  children,
}: TooltipProps) => (
  <MUIToolTip
    enterTouchDelay={0}
    leaveTouchDelay={1000}
    title={
      <>
        {heading && (
          <Typography variant="body1" fontWeight={400} color={"arcticWhite"}>
            {heading}
          </Typography>
        )}
        <Typography
          variant="body2"
          fontWeight={400}
          color={"rgb(170, 170, 170)"}
          sx={{
            mt: heading ? 0.5 : 0,
          }}
        >
          {paragraphOne && <>{paragraphOne}</>}
          {paragraphTwo && (
            <>
              <br></br>
              {paragraphTwo}
            </>
          )}
        </Typography>
      </>
    }
    arrow
    slotProps={{
      tooltip: {
        sx: {
          backgroundColor: "rgb(36, 34, 50)",
          borderRadius: 1,
          p: 1,
          m: 0,
        },
      },
      arrow: {
        sx: {
          color: "rgb(36, 34, 50)",
        },
      },
    }}
  >
    {children}
  </MUIToolTip>
);
