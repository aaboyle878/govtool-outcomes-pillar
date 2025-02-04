import axiosInstance from "../axiosInstance";

export const getGovernanceActions = async (search: string) => {
  const response = await axiosInstance.get("/governance-actions", {
    params: { search },
  });
  return response.data;
};
