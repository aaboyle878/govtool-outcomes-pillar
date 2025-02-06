const getGovToolsUrl = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.includes("preview.")
    ) {
      return "https://preview.gov.tools";
    }
    return "https://gov.tools";
  }

  return "https://gov.tools";
};

export const urls = {
  govtools: getGovToolsUrl(),
};
