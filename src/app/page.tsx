import Link from "next/link";

export default function Home() {
  return (
    <main>
      This is docs age
      <Link href={"/docs"} className="w-0 h-5 bg-red-500 cursor-pointer">
        visit documentatiob
      </Link>{" "}
    </main>
  );
}
