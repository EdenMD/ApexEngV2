module.exports = {
  output: {
    title: "Viral Choose One Delete One",
    format: "portrait",
    fps: 30,
    width: 1080,
    height: 1920
  },
  defaults: {
    voice: "am_adam", // Deep American male voice for authority
    transition: "fade"
  },
  scenes: [
    {
      id: "intro",
      duration: 4,
      tts: "Choose one option, the other disappears forever. What is your choice?",
      layers: [
        {
          type: "background",
          gradient: ["#0f2027", "#203a43", "#2c5364"]
        },
        {
          type: "text",
          text: "CHOOSE ONE.\nDELETE ONE.",
          color: "#ffffff",
          fontSize: 80,
          y: 800,
          animation: "pop"
        }
      ]
    },
    {
      id: "option_red",
      duration: 5,
      tts: "Option Red. You get ten million dollars cash right now, but you can never travel outside your home country again.",
      layers: [
        {
          type: "background",
          gradient: ["#8a2387", "#e94057", "#f27121"]
        },
        {
          type: "text",
          text: "🔴 OPTION RED",
          color: "#ffffff",
          fontSize: 75,
          y: 500
        },
        {
          type: "text",
          text: "$10,000,000 Cash\n\nBUT:\nTrapped in your country.",
          color: "#ffffff",
          fontSize: 55,
          y: 900
        }
      ]
    },
    {
      id: "option_blue",
      duration: 5,
      tts: "Option Blue. You gain absolute perfect physical health for the rest of your life, but you will always have exactly zero dollars in your bank account.",
      layers: [
        {
          type: "background",
          gradient: ["#00c6ff", "#0072ff"]
        },
        {
          type: "text",
          text: "🔵 OPTION BLUE",
          color: "#ffffff",
          fontSize: 75,
          y: 500
        },
        {
          type: "text",
          text: "Perfect Health Forever\n\nBUT:\nForever $0 Bank Account.",
          color: "#ffffff",
          fontSize: 55,
          y: 900
        }
      ]
    },
    {
      id: "outro",
      duration: 4,
      tts: "Which one are you deleting? Tell me your choice in the comments right now.",
      layers: [
        {
          type: "background",
          gradient: ["#0f2027", "#203a43", "#2c5364"]
        },
        {
          type: "text",
          text: "WHICH ONE\nARE YOU DELETING?",
          color: "#ff007f",
          fontSize: 75,
          y: 700,
          animation: "shake"
        },
        {
          type: "text",
          text: "👇 Comment below 👇",
          color: "#ffffff",
          fontSize: 50,
          y: 1100
        }
      ]
    }
  ]
};
