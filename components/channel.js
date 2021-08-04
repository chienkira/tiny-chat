import useFamousQuote from "../hooks/famous-quote";
import { useSession } from "next-auth/client";
import Message from "./message";

export default function Channel({ channel }) {
  const [session] = useSession();
  const { quote } = useFamousQuote();

  return (
    <>
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Top bar */}
        <div className="border-b flex px-6 py-2 items-center flex-none">
          <div className="flex flex-col">
            <h3 className="text-grey-darkest mb-1 font-extrabold">{channel}</h3>
            <div className="text-grey-dark text-sm">
              Today's quote: {quote ? quote.content : "..."}
            </div>
          </div>
        </div>
        {/* Chat messages */}
        <div className="px-6 py-4 flex-1 overflow-y-scroll">
          <Message
            user={session.user}
            message={{
              time: "12:34",
              content: "The slack from the other side.",
            }}
          ></Message>
        </div>
        {/* Message input */}
        <div className="pb-6 px-4 flex-none">
          <div className="flex rounded-lg border-2 border-grey overflow-hidden">
            <input
              type="text"
              className="w-full px-4"
              placeholder={`Message ${channel}`}
            />
            <span className="text-3xl border-l-2 border-grey p-2">
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
    </>
  );
}
