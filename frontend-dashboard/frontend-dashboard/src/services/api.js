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
    return { 
      total_attacks: 0, 
      unique_ips: 0, 
      severity_counts: { High: 0, Medium: 0, Low: 0 },
      network_activity: [],
      vulnerable_endpoints: [],
      risks_assessment: []
    };
  }
};

export const fetchIncidents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incidents`);
    return response.data.incidents;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
};

export const fetchMapData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/map-data`);
    return response.data.markers;
  } catch (error) {
    console.error("Error fetching map data:", error);
    return [];
  }
};

// Fetch network activity for Network page
export const fetchNetworkActivity = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/network-activity`);
    return response.data.activity;
  } catch (error) {
    console.error("Error fetching network activity:", error);
    return [];
  }
};
