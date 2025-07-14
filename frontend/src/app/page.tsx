import { redirect } from "next/navigation";

export default async function Home() {
 await redirect("/login");

  return <div className="bg-red-100">HI</div>;
}
