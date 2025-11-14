import api from "../../lib/axios";

export const getQrCode = async (event_id) => {
  try {
    const resp = await api.get(`/payment/${event_id}`, { params: { event_id } });
    console.log("api response for payment qr:",resp)
    return resp.data.data;
  } catch (error) {
    throw error;
  }
};