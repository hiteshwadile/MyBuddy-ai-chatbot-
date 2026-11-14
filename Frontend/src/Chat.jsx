// import "./Chat.css";
// import {useContext, useEffect, useState } from "react";
// import {MyContext} from "./MyContext";
// import ReactMarkdown from "react-markdown";
// import rehypeHightlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";


// function Chat() {
//     const {newChat, prevChats, reply} = useContext(MyContext);
//     const [latestReply, setLatestReply]= useState(null);

//     useEffect(()=> {
//         if(reply === null){
//             setLatestReply(null);
//             return;
//         }

//         if(!reply) return;

//         const content = reply.split(" "); //individual words.

//         let index = 0;

//         setLatestReply("");
//         const interval = setInterval(()=> {
//             setLatestReply(content.slice(0, index + 1).join(" "));
//             index++;
//             if(index >= content.length) {
//                 clearInterval(interval);
//             }
//         }, 40);

//         return () => clearInterval(interval);

//     }, [ reply]);

// // [prevChats, reply])

//     return (
//         <>
//         {newChat && <h1>Start a new chat!</h1> }
//         <div className="chats">

//             {
//                 prevChats?.map((chat, index) => ( 
//                     <div 
//                     className = {chat.role === "user"? "userDiv" : "gptDiv"} 
//                     key = {index}
//                     >
//                         {
//                             chat.role === "user"? (
//                              <p className = "userMassage">{chat.content}</p> ) : (
//                             //    <p className = "gptMassage">{chat.content}</p>

//                             <ReactMarkdown rehypePlugins={[rehypeHightlight]}>
//                                 {chat.content}
//                             </ReactMarkdown>
//                        ) }
//                     </div>
                
//                 ) )
//             }

//             {
//     prevChats?.map((chat, index) => (
//         <div
//             className={chat.role === "user" ? "userDiv" : "gptDiv"}
//             key={index}
//         >
//             {chat.role === "user" ? (
//                 <p className="userMassage">{String(chat.content)}</p>
//             ) : (
//                 <ReactMarkdown rehypePlugins={[rehypeHightlight]}>
//                     {String(chat.content)}
//                 </ReactMarkdown>
//             )}
//         </div>
//     ))
// }

//         </div>
//         </>
//     )
// }

// export default Chat;


import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHightlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { newChat, prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    // Word-by-word typing animation
    useEffect(() => {
        if (reply === null) {
            setLatestReply(null);
            return;
        }

        if (!reply) return;

        const content = reply.split(" ");
        let index = 0;

        setLatestReply("");

        const interval = setInterval(() => {
            setLatestReply(content.slice(0, index + 1).join(" "));
            index++;

            if (index >= content.length) {
                clearInterval(interval);
            }
        }, 40);

        return () => clearInterval(interval);
    }, [reply]);

    return (
        <>
            {newChat && <h1>Start a new chat!</h1>}

            <div className="chats">
                {prevChats?.map((chat, index) => {
                    const isLastAssistant =
                        index === prevChats.length - 1 &&
                        chat.role === "assistant";

                    return (
                        <div
                            className={chat.role === "user" ? "userDiv" : "gptDiv"}
                            key={index}
                        >
                            {chat.role === "user" ? (
                                <p className="userMassage">
                                    {chat.content}
                                </p>
                            ) : (
                                <ReactMarkdown rehypePlugins={[rehypeHightlight]}>
                                    {String(
                                        isLastAssistant && latestReply !== null
                                            ? latestReply
                                            : chat.content
                                    )}
                                </ReactMarkdown>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Chat;
