import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import "../../components/media.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    console.log(screenSize);
    if (screenSize.width < 500) {
      setShowSidebar(!showSidebar);
    }
  };
  const button = screenSize.width < 500 && (
    <button onClick={toggleSidebar} className="toggle-button">
      {showSidebar ? "Hide Chats" : "Show Chats"}
    </button>
  );

  return (
    <div className="media-home flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {showSidebar && <Sidebar toggleSidebar={toggleSidebar} />}
      <MessageContainer button={button} />
    </div>
  );
};

export default Home;
