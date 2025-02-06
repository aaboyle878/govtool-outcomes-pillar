import axiosInstance from "../axiosInstance";

export const getGovernanceActions = async (
  search: string,
  filters: string[],
  sort: string
) => {
  const response = await axiosInstance.get("/governance-actions", {
    params: { search, filters, sort },
  });
  return response.data;
};
