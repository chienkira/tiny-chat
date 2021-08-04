export default function Message({ user, message }) {
  return (
    <>
      <div className="flex items-start mb-4 text-sm">
        <img src={user.image} className="w-10 h-10 rounded mr-3" />
        <div className="flex-1 overflow-hidden">
          <div>
            <span className="font-bold">{user.name}</span>
            <span className="text-grey-600 text-xs ml-1">{message.time}</span>
          </div>
          <p className="text-black leading-normal">{message.content}</p>
        </div>
      </div>
    </>
  );
}
