/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const ApiContext = createContext();
const socket = io("http://localhost:8080"); // Connect to the WebSocket server

export const Context = ({ children }) => {
  // Chat States
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [username, setUsername] = useState("");
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [groupId, setGroupId] = useState(""); // Store selected group ID

  // Handle Incoming Chat Messages
  useEffect(() => {
    socket.on("message", (msg) => {
      if (!msg.groupId || msg.groupId === groupId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [groupId]);

  // Join a group
  const joinGroup = (groupId) => {
    setGroupId(groupId);
    setMessages([]);
    socket.emit("joinGroup", { groupId, username });
  };

  // Function to Send Message
  const sendMessage = (messageInput) => {
    if (messageInput.trim() !== "" && groupId) {
      const message = {
        text: messageInput,
        timestamp: new Date(),
        userId,
        username,
        groupId,
      };
      socket.emit("message", message);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        messages,
        sendMessage,
        userId,
        setMessages,
        setMessageInput,
        messageInput,
        username,
        setUsername,
        groupId,
        setGroupId,
        joinGroup,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within a Context Provider");
  }
  return context;
};
