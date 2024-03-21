import type { MetaFunction } from "@remix-run/cloudflare";
import { Login } from "~/login/Login";
import "~/styles/reset.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Noice" },
    {
      name: "description",
      content: "Noice frontend assignment by Kimmo Taskinen",
    },
  ];
};

export default function Index() {
  return <Login />;
}
