import axiosInstance, { endpoints } from "../axios";
export const login = async (email, password) => {
  const loginEndpoints = [
    endpoints.auth.adminLogin,
    endpoints.auth.residentLogin,
    endpoints.auth.securityLogin,
  ];

  let success = false;

  for (const endpoint of loginEndpoints) {
    try {
      const response = await axiosInstance.post(endpoint, {
        email,
        password,
      });

      if (response.status === 200) {
        // Determine the role based on the endpoint
        const role = endpoint.includes("admin") ? "admin" : endpoint.includes("resident") ? "resident" : "security";
        
        success = true;
        return {
          token: response.data.token,
          adminId: response.data.adminId,
          residentId: response.data.residentId,
          securityId: response.data.securityId,
          role: role,
        };
      }
    } catch (error) {
      console.error(`Error logging in with ${endpoint}:`, error);
    }
  }

  if (!success) {
    throw new Error('Login failed for all categories.');
  }
};