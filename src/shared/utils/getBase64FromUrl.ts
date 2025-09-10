import axios from "axios";

export async function getBase64FromUrl(url: string): Promise<string> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data, "binary");

  const extension = url.split(".").pop()?.toLowerCase();
  let mimeType = "image/png";

  if (extension === "jpg" || extension === "jpeg") mimeType = "image/jpeg";
  if (extension === "gif") mimeType = "image/gif";
  if (extension === "svg") mimeType = "image/svg+xml";

  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}
