import axiosInstance from "../axiosInstance";

export const getGovernanceActions = async (
  search: string,
  filters: string[],
  sort: string,
  page: number,
  limit: number
) => {
  const response = await axiosInstance.get("/governance-actions", {
    params: { 
      search, 
      filters, 
      sort,
      page,
      limit
    },
  });
  return response.data;
};
