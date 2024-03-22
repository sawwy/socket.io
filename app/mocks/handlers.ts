import { http, delay, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/v1/joinroom", async () => {
    await delay("real");
    // return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    return HttpResponse.json({ roomToken: "asdf-1234" });
  }),
  http.get("/api/v1/users", async () => {
    await delay("real");

    const date1 = new Date();
    date1.setMinutes(-20);
    const date2 = new Date();
    date2.setMinutes(-5);
    const date3 = new Date();
    date3.setHours(-7);

    return HttpResponse.json([
      {
        isOnline: true,
        lastSeen: date1.toJSON(),
        joined: date1.toJSON(),
        username: "qwerty",
        avatar: "https://ui-avatars.com/api/?name=Qwer&size=32",
        description: "",
      },
      {
        isOnline: true,
        lastSeen: date2.toJSON(),
        joined: date2.toJSON(),
        username: "blarblar",
        avatar: "https://ui-avatars.com/api/?name=Blar&size=32",
        description: "",
      },
      {
        isOnline: false,
        lastSeen: date3.toJSON(),
        joined: date3.toJSON(),
        username: "dendi",
        avatar: "https://ui-avatars.com/api/?name=Dendi&size=32",
        description: "",
      },
    ]);
  }),
];
