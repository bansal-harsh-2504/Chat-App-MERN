import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import "../../components/media.css";
import { useState } from "react";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const button = (
    <button onClick={toggleSidebar} className="toggle-button">
      {showSidebar ? "Hide Chats" : "Show Chats"}
    </button>
  );

  return (
    <div className="media-home flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {showSidebar && <Sidebar />}
      <MessageContainer button={button} />
    </div>
  );
};

export default Home;
