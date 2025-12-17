// services/assetMappingService.js
import httpRequest from "../helpers/httpRequest.js";

/**
 * Assign assets to an employee
 * @param {Object} params
 * @param {number} params.employeeId
 * @param {number[]} params.assetIds
 * @returns Promise
 */
export const assignAssetsToEmployeeApi = async ({ employeeId, assetIds }) => {
  try {
    const data = await httpRequest.post("/asset-mapping/", {
      employeeId,
      assetIds,
    });
    return data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err.message || "API Error");
  }
};
