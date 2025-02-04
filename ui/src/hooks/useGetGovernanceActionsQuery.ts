import { useQuery } from "react-query";
import { queryKeys } from "../consts/queryKeys";
import { getGovernanceActions } from "../services/requests/getGovernanceActions";
import { decodeCIP129Identifier, getFullGovActionId } from "../lib/utils";

export const useGetGovernanceActions = (search: string) => {
  const searchPhrase = (() => {
    if (search.startsWith("gov_action")) {
      try {
        const { txID } = decodeCIP129Identifier(search);
        return getFullGovActionId(txID, 0);
      } catch (error) {
        console.log("Failed to decode gov_action identifier:", error);
        return search;
      }
    }
    return search;
  })();

  const { data, isLoading, error } = useQuery<GovernanceAction[]>({
    queryKey: [queryKeys.getGovernanceActions, searchPhrase],
    queryFn: async () => await getGovernanceActions(searchPhrase),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  return {
    govActions: data,
    isGovActionsLoading: isLoading,
    govActionsError: error,
  };
};
