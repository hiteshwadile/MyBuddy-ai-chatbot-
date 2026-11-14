// import "dotenv/config";

// const getopenAiApiResponse = async(message) => {
//     const options = {
//       method:"POST",
//       headers:{
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",
//         messages: [{
//         role: "user",
//         content: message
//     }]
// })
//     }

//     try{
//      const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//      const data = await response.json();
//      if (!response.ok) {
//     throw new Error(data.error?.message || "OpenAI API request failed");
//         }
//      return data.choices[0].message.content;
//   }catch(err){
//      console.log(err);
//   }
// }

// export default getopenAiApiResponse;

// //-------------------------------------------------------------------------



import "dotenv/config";

const getOpenAiApiResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: message
                        }
                    ]
                }
            ]
        }),
        signal: AbortSignal.timeout(30000)
    };

    try {
        console.log("Sending request to Gemini...");

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
            options
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Gemini API request failed");
        }

        return data.candidates[0].content.parts[0].text;

    } catch (err) {
        console.error("Gemini API Error:", err.message);
        throw err;
    }
};

export default getOpenAiApiResponse;
