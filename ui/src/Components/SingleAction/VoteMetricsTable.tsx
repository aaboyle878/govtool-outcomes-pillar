import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Fade,
} from "@mui/material";
import { useState } from "react";
import { Typography } from "../Atoms/Typography";
import { useTranslation } from "../../contexts/I18nContext";
import {
  IconCheveronUp,
  IconCheveronDown,
} from "@intersect.mbo/intersectmbo.org-icons-set";
import { theme } from "../../theme";
import { getRawAdaValue } from "../../lib/utils";
import { VoteMetric } from "./VoteSection";

const {
  palette: { primaryBlue },
  shadows: { "7": bottomBoxShadow },
} = theme;

type VoteMetricsTableProps = {
  collapsedMetrics: VoteMetric[];
  expandedMetrics: VoteMetric[];
  title: string;
  isCC?: boolean;
  defaultExpanded?: boolean;
};

const ExpandButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible?: boolean }>(({ isVisible = true }) => ({
  display: isVisible ? "flex" : "none",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: primaryBlue,
  padding: "8px 0",
  fontWeight: 600,
  fontFamily: "Poppins",
  fontSize: 14,
}));

const VoteMetricsTable = ({
  collapsedMetrics,
  expandedMetrics,
  title,
  isCC = false,
  defaultExpanded = false,
}: VoteMetricsTableProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [transitioning, setTransitioning] = useState(false);

  const toggleExpand = () => {
    setTransitioning(true);
    setTimeout(() => {
      setExpanded(!expanded);
      setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 150);
  };

  const getIndentUnits = (value: number) => {
    if (!value) return "0px";
    return `${value * 8}px`;
  };

  const displayMetrics = expanded ? expandedMetrics : collapsedMetrics;

  return (
    <Box>
      <Fade in={!transitioning} timeout={300}>
        <Table
          sx={{
            boxShadow: bottomBoxShadow,
            border: `1px solid #F1F1F4`,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#FCFCFC",
                py: 1,
                px: 2,
              }}
            >
              <TableCell
                sx={{
                  p: "inherit",
                  textAlign: "start",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {t("outcome.votes.metric")}
              </TableCell>
              <TableCell
                sx={{
                  p: "inherit",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {t("outcome.votes.value")} {!isCC && " (₳)"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayMetrics.map((metric, index) => (
              <TableRow
                key={`metric-${index}`}
                sx={{
                  backgroundColor: metric.isHighlighted ? "#F9F9FB" : "inherit",
                  py: metric.isHighlighted ? 1 : 2,
                  px: 2,
                }}
              >
                <TableCell sx={{ p: "inherit", textAlign: "start" }}>
                  <Typography
                    data-testid={metric.testId}
                    sx={{
                      fontWeight: metric.isHighlighted ? 600 : 400,
                      fontSize: 14,
                      lineHeight: 1.75,
                      marginLeft: metric.isIndented
                        ? getIndentUnits(metric.indentDepth as number)
                        : 0,
                    }}
                    color="textBlack"
                  >
                    {metric.label}
                  </Typography>
                </TableCell>
                <TableCell sx={{ p: "inherit", textAlign: "end" }}>
                  <Box
                    component="span"
                    sx={{
                      color: "textBlack",
                    }}
                  >
                    {isCC
                      ? metric.value
                      : getRawAdaValue(Number(metric.value)).toLocaleString()}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fade>

      <ExpandButton
        onClick={toggleExpand}
        data-testid={`${title}-expand-button`}
        isVisible={!isCC}
        sx={{
          mt: 2,
        }}
      >
        {expanded ? (
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {t("common.collapse")}
            <IconCheveronUp fontSize="medium" fill={primaryBlue} />
          </Box>
        ) : (
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {t("common.expand")}
            <IconCheveronDown fontSize="medium" fill={primaryBlue} />
          </Box>
        )}
      </ExpandButton>
    </Box>
  );
};

export default VoteMetricsTable;
