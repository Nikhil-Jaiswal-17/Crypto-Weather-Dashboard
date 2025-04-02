import Weather from "@/components/Weather";
import Crypto from "@/components/Crypto";
import News from "@/components/News";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-800 text-white">
      <Weather />
      <Crypto />
      <News />
    </main>
  );
}
