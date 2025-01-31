import { useQuery } from "react-query";
import { queryKeys } from "../consts/queryKeys";
import { getGovernanceActions } from "../services/requests/getGovernanceActions";

export const useGetGovernanceActions = () => {
  const { data, isLoading, error } = useQuery<GovernanceAction[]>({
    queryKey: [queryKeys.getGovernanceActions],
    queryFn: async () => await getGovernanceActions(),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  return {
    govActions: data,
    isGovActionsLoading: isLoading,
    govActionsError: error,
  };
};
