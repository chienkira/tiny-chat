const readableTimestamp = (timestamp) => {
  const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
  const d = new Date(timestamp);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function Message({ user, content, timestamp }) {
  return (
    <>
      <div className="flex items-start mb-4 text-sm">
        {!user && (
          <>
            <div className="flex-1 overflow-hidden">
              <p className="text-blue-500 leading-normal">{content}</p>
            </div>
          </>
        )}
        {user && (
          <>
            <img src={user && user.image} className="w-10 h-10 rounded mr-3" />
            <div className="flex-1 overflow-hidden">
              <div>
                <span className="font-bold">{user && user.name}</span>
                <span className="text-grey-600 text-xs ml-1">
                  {readableTimestamp(timestamp)}
                </span>
              </div>
              <p className="text-black leading-normal">{content}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
