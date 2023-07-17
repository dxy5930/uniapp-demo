import service from "./index.js";

export function getClassificationList(data) {
  return service({
    url: "/classification.json",
    method: "get",
    params: data,
    isRetry: true,
  });
}
