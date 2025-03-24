import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { Typography } from "../Atoms/Typography";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type GovernanceActionCardElementProps = {
  title: string;
  description: string;
  type: string;
  dataTestId: string;
};

export default function GovernanceActionCardElement({
  title,
  description,
  type,
  dataTestId,
}: GovernanceActionCardElementProps) {
  const renderContent = () => {
    if (type === "text") {
      return (
        <Typography
          sx={{
            fontSize: 14,
            overflow: "hidden",
            lineHeight: "20px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            maxWidth: "auto",
            fontWeight: 400,
          }}
        >
          {description}
        </Typography>
      );
    }

    if (type === "markdown") {
      const truncateMarkdown = (markdown: string) => {
        return markdown.split("\n").slice(0, 2).join("\n");
      };

      const truncatedDescription = truncateMarkdown(
        description?.toString() || ""
      );
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "unset",
            overflow: "hidden",
            flexDirection: "column",
            fontFamily: "Poppins, Arial",
          }}
        >
          <Markdown
            components={{
              p(props: PropsWithChildren) {
                const { children } = props;
                return (
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "20px",
                      maxWidth: "100%",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  >
                    {children}
                  </Typography>
                );
              },
            }}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {truncatedDescription}
          </Markdown>
        </Box>
      );
    }
  };
  return (
    <Box data-testid={dataTestId}>
      <Typography
        sx={{
          fontSize: 12,
          color: "textGray",
          lineHeight: "16px",
          marginBottom: "4px",
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
      {renderContent()}
    </Box>
  );
}
