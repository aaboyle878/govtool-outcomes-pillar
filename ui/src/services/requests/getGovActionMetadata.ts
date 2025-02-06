import axiosInstance from "../axiosInstance";

export const getGovActionMetadata = async (url: string) => {
  const response = await axiosInstance.get("/governance-actions/metadata", {
    params: { url },
  });
  return response.data;
};
