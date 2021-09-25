import React, { useState, useEffect } from "react";
import "./Rightbar.css";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PhoneIcon from "@material-ui/icons/Phone";
import VideocamIcon from "@material-ui/icons/Videocam";
import SearchIcon from "@material-ui/icons/Search";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicNoneIcon from "@material-ui/icons/MicNone";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "@firebase/app-compat";

const Rightbar = () => {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [rooomName, setRooomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("Chatroom")
        .doc(roomId)
        .onSnapshot((snapshot) => setRooomName(snapshot.data().name));

      db.collection("Chatroom")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendmsg = (e) => {
    e.preventDefault();
    console.log(input);

    db.collection("Chatroom").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="RightSide__Bar">
      <div className="RightSide_Header">
        <img
          src={`https://avatars.dicebear.com/api/male/sdsnjdsd.svg`}
          alt="dp"
        />
        <div className="RightSide_Info">
          <h3>{rooomName}</h3>
          <p>
            Last Seen {""}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="RightSide_Icons">
          <VideocamIcon className="i" />
          <PhoneIcon className="i" />
          <SearchIcon className="i" />
          <MoreHorizIcon className="i" />
        </div>
      </div>

      {/*     {user ? (
        <div
          className="RightSide_ChatBody"
          style={{
            backgroundImage: "./rightsidechat",
            backgroundSize: "conatin",
          }}
        ></div>
      ) : ( */}
      <div className="RightSide_ChatBody">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_Name">{message.name}</span>
            {message.message}
            <span className="time">
              {new Date(message.timestamp?.toDate()).toUTCString()}{" "}
            </span>
          </p>
        ))}
      </div>
      {/* )} */}

      <div className="footer">
        <InsertEmoticonIcon className="i" />
        <AttachFileIcon className="im" />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="  Type a messsage"
          />
          <button onClick={sendmsg} type="submit" className="send">
            Send
          </button>
        </form>
        <MicNoneIcon className="i" />
      </div>
    </div>
  );
};

export default Rightbar;
