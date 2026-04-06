import axios from 'axios';

// Ensure this matches the FastAPI backend host and port.
// Since certificates are self-signed, we access it via HTTP for dev or handle ignore self-signed (which browsers warn about).
const API_BASE_URL = 'http://localhost:8000/api/dashboard';

export const fetchLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data.logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
};

export const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error("Error fetching stats:", error);
      return { total_attacks: 0, unique_ips: 0 };
    }
  };
