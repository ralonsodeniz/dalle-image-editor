"use server";

export const sendDalleRequest = async (data: FormData) => {
  const openAPIKey = process.env.OPENAPI_KEY;
  try {
    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAPIKey}`,
      },
      body: data,
    });
    return await response.json();
  } catch (error) {
    throw new Error("Failed to send request to DALL-E API", { cause: error });
  }
};
