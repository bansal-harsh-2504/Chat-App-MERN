import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti"
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import '../media.css';

const MessageContainer = (props) => {
  const {button} = props;
  const { selectedConversation, setSelectedConversation} = useConversation();

  useEffect(() => {

    //cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation])
 
  return (
    <div className="flex flex-col media-msgcontainer">
      {!selectedConversation ? <NoChatSelected /> : (
        <>
          <div className="bg-green-800 px-4 py-2 mb-2 media-chat-header">
            <div className="flex items-center space-x-2  media-chat-header-image">
                <img 
                  src={selectedConversation.profilePic}
                  alt={selectedConversation.fullName}
                  className="h-8 w-8 rounded-full mb-1 mt-3"
                />
                <span className='text-white'>{selectedConversation.fullName}</span> 
                {button}
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center media-nochat">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName } ❄️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}