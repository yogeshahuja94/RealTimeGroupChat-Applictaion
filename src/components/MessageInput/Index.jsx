/* eslint-disable react/prop-types */

import { useApiContext } from "../../context/ApiContext";

export default function MessageInput({ sendMessage }) {
  const { messageInput, setMessageInput, groupId } = useApiContext();

  const handleSend = () => {
    if (groupId) {
      sendMessage(messageInput);
      setMessageInput("");
    } else {
      alert("Please join a group before sending a message.");
    }
  };

  return (
    <div className="p-2 border-t border-gray-300">
      <div className="flex">
        <input
          type="text"
          className="w-full px-2 py-1 border rounded-l-md outline-none"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
