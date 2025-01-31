import axiosInstance from "../axiosInstance";

export const getGovernanceActions = async () => {
  const response = await axiosInstance.get("/governance-actions");
  return response.data;
};
