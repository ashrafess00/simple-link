'use client';
import Image from "next/image";

export default function Home() {

  function dd() {
    console.log('hi there');
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input type="text" className="border-2" />
      <button onClick={dd}>hi button</button>
    </main>
  );
}
