const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  // Process a POST request
  if (req.method === "POST") {
    const { channel, user, content, timestamp = +new Date() } = req.body;
    const payload = { channel, user, content, timestamp };

    // tell pusher about new message
    await pusher.trigger(channel, "new-message", payload);

    res.status(200).json(payload);
  }
}
