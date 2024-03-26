import { redirect, type MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Noice" },
    {
      name: "description",
      content: "Noice frontend assignment by Kimmo Taskinen",
    },
  ];
};

export async function loader() {
  return redirect("/joinroom");
}
