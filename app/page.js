'use client';
import Image from "next/image";
// import {signIn} from 'next-auth/client';

export default async function Home() {

  // const ion =  { Email: "mail2@mail.com", Password: "pass" };

  // async function dd() {
  //   const res = await signIn('credentials',{
  //     redirect: false,
  //    ...ion
  //   })

  //   console.log(res);
  // }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input type="text" className="border-2" />
      {/* <button onClick={dd}>hi button</button>  */}
    </main>
  );
}
