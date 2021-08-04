import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/client";
import Link from "next/link";

export default function Index() {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Welcome to Tiny Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-2 text-center">
        <div className="px-10 py-12 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl tracking-tight leading-10 font-extrabold sm:leading-none sm:text-4xl">
              {loading && (
                <>
                  <svg
                    className="animate-spin h-8 w-8 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </>
              )}
              {!session && (
                <>
                  <a
                    className="underline hover:italic"
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                  >
                    Please log in
                  </a>
                </>
              )}
              {session && (
                <>
                  <div className="mb-4">Welcome back {session.user.name}!</div>
                  <div className="mb-4">
                    <Link href="/chat">
                      <a className="text-blue-500 mr-4 underline hover:italic">
                        Enter app →
                      </a>
                    </Link>
                    <img
                      className="w-8 h-8 rounded-full inline-block animate-bounce sm:w-16 sm:h-16"
                      src={session.user.image}
                    />
                  </div>
                  <div className="text-right text-sm underline text-gray-400 hover:italic">
                    <a
                      href={`/api/auth/signout`}
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Sign out
                    </a>
                  </div>
                </>
              )}
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}
