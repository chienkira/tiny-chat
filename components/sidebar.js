import Link from "next/link";
import { useSession } from "next-auth/client";

export default function Sidebar({ channels }) {
  const [session] = useSession();

  return (
    <>
      <div className="flex-none w-48 pb-6 block md:w-64">
        <div className="mb-2 mt-3 px-4 flex justify-between">
          <div className="flex-auto">
            <Link href="/">
              <a className="underline hover:italic font-extrabold text-xl leading-10">
                ← Tiny chat
              </a>
            </Link>
            <div className="flex items-center mb-6 mt-2">
              <svg
                className="h-2 w-2 fill-current text-green-400 mr-2"
                viewBox="0 0 20 20"
              >
                <circle cx={10} cy={10} r={10} />
              </svg>
              <svg
                className="h-2 w-2 fill-current text-green-400 mr-2 animate-ping absolute"
                viewBox="0 0 20 20"
              >
                <circle cx={10} cy={10} r={10} />
              </svg>
              <span className="opacity-75 text-md">{session.user.name}</span>
            </div>
          </div>
        </div>
        <div className="mb-8 text-blue-500 font-bold">
          <div className="px-4 mb-2 flex justify-between items-center">
            <div className="opacity-75">Channels</div>
          </div>
          {channels.map((channel) => {
            return <div key={channel} className="bg-teal-dark py-1 px-4"># {channel}</div>;
          })}
        </div>
      </div>
    </>
  );
}
