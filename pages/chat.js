import MainLayout from "../layouts/main-layout";
import { getSession } from "next-auth/client";
import Link from "next/link";
import useFamousQuote from "../hooks/famous-quote";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // redirect to root if not logged in
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function Chat({ session }) {
  const { quote } = useFamousQuote();

  return (
    <MainLayout title="Chat">
      <div className="font-sans antialiased h-screen flex">
        {/* Sidebar */}
        <div className="flex-none w-48 pb-6 block">
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
                <span className="opacity-50 text-md">{session.user.name}</span>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="px-4 mb-2 flex justify-between items-center">
              <div className="opacity-75">Channels</div>
            </div>
            <div className="bg-teal-dark py-1 px-4"># general</div>
          </div>
        </div>
        {/* Chat content */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Top bar */}
          <div className="border-b flex px-6 py-2 items-center flex-none">
            <div className="flex flex-col">
              <h3 className="text-grey-darkest mb-1 font-extrabold">
                #general
              </h3>
              <div className="text-grey-dark text-sm truncate">
                Today's quote: {quote ? quote.content : "..."}
              </div>
            </div>
          </div>
          {/* Chat messages */}
          <div className="px-6 py-4 flex-1 overflow-y-scroll">
            {/* A message */}
            <div className="flex items-start mb-4 text-sm">
              <img
                src="https://pbs.twimg.com/profile_images/764702647836225537/GJdP6VHf_x96.jpg"
                className="w-10 h-10 rounded mr-3"
              />
              <div className="flex-1 overflow-hidden">
                <div>
                  <span className="font-bold">Steve Schoger</span>
                  <span className="text-grey text-xs">11:46</span>
                </div>
                <p className="text-black leading-normal">
                  The slack from the other side.
                </p>
              </div>
            </div>
            {/* A message */}
            <div className="flex items-start mb-4 text-sm">
              <img
                src="https://pbs.twimg.com/profile_images/764702647836225537/GJdP6VHf_x96.jpg"
                className="w-10 h-10 rounded mr-3"
              />
              <div className="flex-1 overflow-hidden">
                <div>
                  <span className="font-bold">Adam Wathan</span>
                  <span className="text-grey text-xs">12:45</span>
                </div>
                <p className="text-black leading-normal">
                  How are we supposed to control the marquee space without an
                  utility for it? I propose this:
                </p>
                <div className="bg-grey-lighter border border-grey-light text-grey-darkest text-sm font-mono rounded p-3 mt-2 whitespace-pre overflow-scroll">
                  .marquee-lightspeed {"{"} -webkit-marquee-speed: fast; {"}"}
                  .marquee-lightspeeder {"{"} -webkit-marquee-speed: faster;{" "}
                  {"}"}
                </div>
              </div>
            </div>
            {/* A message */}
            <div className="flex items-start mb-4 text-sm">
              <img
                src="https://pbs.twimg.com/profile_images/764702647836225537/GJdP6VHf_x96.jpg"
                className="w-10 h-10 rounded mr-3"
              />
              <div className="flex-1 overflow-hidden">
                <div>
                  <span className="font-bold">David Hemphill</span>
                  <span className="text-grey text-xs">12:46</span>
                </div>
                <p className="text-black leading-normal">
                  <a
                    href="#"
                    className="inline-block bg-blue-lightest text-blue no-underline"
                  >
                    @Adam Wathan
                  </a>{" "}
                  the size of the generated CSS is creating a singularity in
                  space/time, we must stop adding more utilities before it's too
                  late!
                </p>
              </div>
            </div>
          </div>
          <div className="pb-6 px-4 flex-none">
            <div className="flex rounded-lg border-2 border-grey overflow-hidden">
              <input
                type="text"
                className="w-full px-4"
                placeholder="Message #general"
              />
              <span className="text-3xl text-blue-500 border-l-2 border-grey p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
