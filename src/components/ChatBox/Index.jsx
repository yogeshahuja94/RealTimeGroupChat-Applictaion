import { useEffect, useState } from "react";
import MessageInput from "./../MessageInput/Index";
import MessageList from "./../MessageList/Index";
import { useApiContext } from "../../context/ApiContext";

// Connect to Socket.io server

export default function ChatBox() {
  const {
    messages,
    userId,
    username,
    setUsername,
    sendMessage,
    joinGroup,
    setGroupId,
    groupId,
  } = useApiContext();
  const [groupInput, setGroupInput] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Get stored username
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [setUsername]);

  const handleJoinGroup = () => {
    if (groupInput.trim() !== "") {
      joinGroup(groupInput);
      setGroupId(groupInput);
      setGroupInput("");
    }
  };

  // console.log("user", username);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-lg shadow-lg w-150">
        <h2 className="text-xl font-bold mb-4">Welcome, {username}!</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Group ID"
            className="px-2 py-1 border rounded-l-md"
            value={groupInput}
            onChange={(e) => setGroupInput(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white 
             font-semibold rounded-lg shadow-md transition-all duration-300 
             hover:from-green-600 hover:to-green-800 hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={handleJoinGroup}
          >
            {groupId ? "Switch Group" : "Join Group"}
          </button>
        </div>

        <p className="text-gray-600">
          {groupId
            ? `Chatting in Group: ${groupId}`
            : "Chatting in Public Room"}
        </p>

        <MessageList messages={messages} userId={userId} username={username} />
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
