/* eslint-disable react/prop-types */

export default function MessageList({ messages, userId }) {
  return (
    <div className="h-120 overflow-y-auto bg-gray-100 p-2 rounded-md">
      {messages.map((msg, index) => {
        const isCurrentUser = msg.userId === userId;
        return (
          <div
            key={index}
            className={`flex flex-col items-start mb-2 ${
              isCurrentUser ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`p-2 rounded-md flex flex-col ${
                isCurrentUser
                  ? "bg-green-500 text-white self-end ml-auto"
                  : "bg-blue-500 text-white"
              }`}
            >
              <span className="font-bold text-black text-xs opacity-90">
                {msg.username}
              </span>
              <strong className="text-2xl">{msg.text}</strong>
              {isCurrentUser && (
                <span className="text-xs text-white text-right opacity-80 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
            {!isCurrentUser && (
              <span className="text-gray-500 text-xs">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
