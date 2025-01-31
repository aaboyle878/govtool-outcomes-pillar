import { useQuery } from "react-query";
import { getGovActionMetadata } from "../services/requests/getGovActionMetadata";

export const useGetGovActionMetadataQuery = (url: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [url],
    queryFn: async () => await getGovActionMetadata(url),
    enabled: !!url,
    refetchOnWindowFocus: false,
  });

  return {
    metadata: data,
    isMetadataLoading: isLoading,
    metadataError: error,
  };
};
