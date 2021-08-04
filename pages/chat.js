import MainLayout from "../layouts/main-layout";
import { getSession } from "next-auth/client";
import Sidebar from "../components/sidebar";
import Channel from "../components/channel";
import { useState } from "react";

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
  const [channels, setChannels] = useState(["#general"]);
  const [activeChannel, setActiveChannel] = useState("#general");

  return (
    <MainLayout title="Chat">
      <div className="font-sans antialiased h-screen flex">
        <Sidebar channels={channels}></Sidebar>
        <Channel channel={activeChannel}></Channel>
      </div>
    </MainLayout>
  );
}
