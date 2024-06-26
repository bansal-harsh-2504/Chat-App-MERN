import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = ({toggleSidebar}) => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto media-conv-box">

      {conversations.map((conversation, idx) => (
        <Conversation 
          key={conversation._id}
          conversation={conversation} 
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
          toggleSidebar={toggleSidebar}
        />
      ))}

      { loading ? <span className="loading loading-spinner"></span>: null}
    </div>
  )
}

export default Conversations