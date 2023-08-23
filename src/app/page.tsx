import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  /*

  

  */
  const user = await currentUser();
  const id = JSON.parse(JSON.stringify(user)).id
  console.log(id)
  return (
    <main className="">
      <UserButton afterSignOutUrl="/"/>
    </main>
  );
}
