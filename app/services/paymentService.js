import api from "../../lib/axios";

export const getQrCode = async (event_id) => {
  try {
    const resp = await api.get(`/payment/qr/${event_id}`, { params: { event_id } });
    console.log("api response for payment qr:",resp)
    return resp.data.data;
  } catch (error) {
    console.error("ERROR WITH PAYMENT API:",error)
    throw error;
  }
};

export const uploadPaymentScreenshot = async (event_id, screenshot, event_type = "event") => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: screenshot.uri,
      name: screenshot.fileName || "payment_proof.jpg",
      type: screenshot.mimeType || "image/jpeg",
    });

    const resp = await api.post(
      `/payment/upload/${event_type}/${event_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return resp.data;
  } catch (error) {
    console.error("ERROR UPLOADING PAYMENT SCREENSHOT:", error.response?.data || error);
    throw error;
  }
};