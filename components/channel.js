import useFamousQuote from "../data_hooks/famous-quote";
import { useSession } from "next-auth/client";
import Message from "./message";
import Pusher from "pusher-js";
import { useState, useEffect, useRef } from "react";

export default function Channel({ channel }) {
  const [session] = useSession();
  const { quote } = useFamousQuote();
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    pusher.subscribe(channel).bind("new-message", (message) => {
      console.info(`Pusher: new message! (${message.content})`);
      setMessages((messages) => [...messages, message]);
    });
    pusher.connection.bind("connected", () => {
      console.info(`Pusher: connnected!`);
      postMessage(channel, null, `${session.user.name} has connected`);
    });

    return function cleanup() {
      console.info(`Pusher: disconnnected!`);
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyUp = (e) => {
    const content = e.target.value;
    if (!content || !content.trim()) return;
    if (e.keyCode === 13) {
      postMessage(channel, session.user, content);
      setMessage("");
    }
  };

  const handleSend = () => {
    const content = message;
    if (!content || !content.trim()) return;
    postMessage(channel, session.user, message);
    setMessage("");
  };

  const handleThumbsup = () => {
    postMessage(channel, session.user, "👍🏻");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Top bar */}
        <div className="border-b flex px-6 py-2 items-center flex-none">
          <div className="flex flex-col">
            <h3 className="text-grey-darkest mb-1 font-extrabold">
              # {channel}
            </h3>
            <div className="text-grey-dark text-sm">
              Today's quote: {quote ? quote.content : "..."}
            </div>
          </div>
        </div>
        {/* Chat messages */}
        <div className="px-6 py-4 flex-grow overflow-y-scroll">
          {messages &&
            messages.map((message, index) => {
              return <Message key={index} {...message}></Message>;
            })}
          <div ref={messagesEndRef} />
        </div>
        {/* Message input */}
        <div className="pb-6 px-4 flex-none">
          <div className="flex rounded-lg border-2 border-grey overflow-hidden p-1">
            <input
              type="text"
              className="w-full px-4 outline-none"
              placeholder={`Message # ${channel}`}
              value={message}
              onKeyUp={handleKeyUp}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="text-3xl border-l-2 border-grey p-2 ml-1"
              onClick={handleSend}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
            </button>
            <button
              className="text-3xl border-l-2 border-grey p-2 ml-1"
              onClick={handleThumbsup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-300"
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
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const postMessage = (channel, user, content) => {
  const params = {
    channel: channel,
    user: user,
    content: content,
  };
  fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error("Error:", error);
    });
};
