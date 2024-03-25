import { http, delay, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/v1/joinroom", async () => {
    await delay("real");
    // return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    return HttpResponse.json({ roomToken: "asdf-1234" });
  }),
  http.get("/api/v1/users", async () => {
    await delay("real");

    const lastSeenDate1 = new Date();
    lastSeenDate1.setMinutes(lastSeenDate1.getMinutes() - 5);
    const joinedDate1 = new Date();
    joinedDate1.setFullYear(2020);

    const lastSeenDate2 = new Date();
    lastSeenDate2.setMinutes(lastSeenDate2.getMinutes() - 120);
    const joinedDate2 = new Date();
    joinedDate2.setFullYear(2023);
    joinedDate2.setMonth(11);

    const lastSeenDate3 = new Date();
    lastSeenDate3.setMonth(1);
    const joinedDate3 = new Date();
    joinedDate3.setMinutes(-5);

    return HttpResponse.json([
      {
        isOnline: true,
        lastSeen: lastSeenDate1.toJSON(),
        joined: joinedDate1.toJSON(),
        username: "qwerty",
        description: "",
      },
      {
        isOnline: true,
        lastSeen: lastSeenDate2.toJSON(),
        joined: joinedDate2.toJSON(),
        username: "blarblar",
        description: "",
      },
      {
        isOnline: false,
        lastSeen: lastSeenDate3.toJSON(),
        joined: joinedDate3.toJSON(),
        username: "dendi",
        description: "",
      },
    ]);
  }),
];
