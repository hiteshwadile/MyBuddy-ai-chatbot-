import "./ChatWindow.css"
import Chat from "./Chat.jsx";
import{ MyContext} from "./MyContext.jsx";
import { useContext,  useState , useEffect} from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
const {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    setNewChat,
    setIsSidebarOpen
} = useContext(MyContext);

const [loading, setLoading] = useState(false);
const [isOpen, setIsOpen] = useState(false);

    const  getReply = async ()=> {
        setLoading(true);
        setNewChat(false);

        console.log("message", prompt,"threadId", currThreadId);


        const options = {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try{

            console.log("Prompt:", prompt);
console.log("Thread ID:", currThreadId);


            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, options);
            const data = await response.json();
            console.log(data);
            setReply(data.reply);


        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }  
    }


    //append new chat to prevChats
    useEffect(() => {
    if (prompt && reply) {
        setPrevChats(prevChats => [
            ...prevChats,
            { role: "user", content: prompt },
            { role: "assistant", content: reply }
        ]);

        setPrompt("");
        setNewChat(false);
    }
}, [reply]);
    

const handleProfileClick = () => {
    setIsOpen(!isOpen);

}
    return (
        <div className="chatWindow">
            {/* <div className="navbar">
                <span>MyBuddy <i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                   <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div> */}

            <div className="navbar">
    <div className="navLeft">
        <button
            className="menuBtn"
            onClick={() => setIsSidebarOpen(true)}
        >
            <i className="fa-solid fa-bars"></i>
        </button>

        <span>MyBuddy <i className="fa-solid fa-angle-down"></i></span>
    </div>

    <div className="userIconDiv" onClick={handleProfileClick}>
        <span className="userIcon">
            <i className="fa-solid fa-user"></i>
        </span>
    </div>
</div>


            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"> <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plac</div>
                    <div className="dropDownItem"> <i className="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"> <i className="fa-solid fa-right-from-bracket"></i> Logout</div>
                </div>
               
            }

            <Chat></Chat>
            <ScaleLoader color="#fff" loading={loading}>

            </ScaleLoader>

            <div className="chatInput">
                
                <div className="inputBox">
                    <input placeholder="Ask anything.."
                    value={prompt}
                    onChange= {(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key ==='Enter'? getReply() : " "}
                    >
                    </input>
                    <div id="submit" onClick={getReply} ><i className="fa-solid fa-paper-plane"></i></div>
                </div>

                <p className="info">
                    MyBuddy can make mistake.See Cookie Preferance.
                </p>

            </div>
            
        </div>
    )
}

export default ChatWindow;