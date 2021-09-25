import React, { useState, useEffect } from "react";
import "./Leftbar.css";

import AddIcon from "@material-ui/icons/Add";
import LoopIcon from "@material-ui/icons/Loop";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";

import Chat from "./Chats";
import { useStateValue } from "./StateProvider";
import db from "./firebase";

const Leftbar = () => {
  const [room, setRoom] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("Chatroom").onSnapshot((snapshot) =>
      setRoom(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="leftSide__Bar">
      <div className="leftSide_Header">
        <img alt="dp" src={user?.photoURL} />
        <div className="leftSide_HeaderIcons">
          <LoopIcon className="i" />
          <AddIcon className="i" />
          <MoreHorizIcon className="i" />
        </div>
      </div>

      <div className="leftSide_Search">
        <div className="search_icon">
          <SearchIcon className="i"/>
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="leftSide_Chats">
        <Chat addNewChat />
        {room.map((Chatroom) => (
          <Chat key={Chatroom.id} id={Chatroom.id} name={Chatroom.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Leftbar;
