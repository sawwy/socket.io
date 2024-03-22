import { http, delay, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/v1/joinroom", async () => {
    await delay("real");
    // return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    return HttpResponse.json({ roomToken: "asdf-1234" });
  }),
];
