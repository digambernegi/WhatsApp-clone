import React, { useState, useEffect } from "react";
import "./Chat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

const Chats = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("Chatroom").doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
      setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.floor() * 5000));
  }, []);


  const createChat = () => {
    const roomName = prompt("Name this chat");

    if (roomName) {
      db.collection("Chatroom").add({
        name: roomName,
      });
    } else {
    }
  };



  return !addNewChat ? (
    <Link to={`/Chatroom/${id}`}>
      <div className="chat">
        <img
          src={`https://avatars.dicebear.com/api/male/${seed}.svg`}
          alt="dp"
        />
        <div className="chat__Info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="add_new">
      <h2>Add new chat</h2>
    </div>
  );
};

export default Chats;
