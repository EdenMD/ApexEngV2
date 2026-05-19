module.exports = {
  output: {
    title: "Viral IQ Quiz Challenge",
    format: "portrait",
    fps: 30,
    width: 1080,
    height: 1920
  },
  defaults: {
    voice: "am_adam", 
    transition: "fade"
  },
  scenes: [
    {
      id: "intro",
      duration: 4,
      tts: "Only people with an IQ over 120 can pass this 3-question brain test. Let's see if you are a genius.",
      layers: [
        {
          type: "background",
          gradient: ["#111827", "#312e81"]
        },
        {
          type: "text",
          text: "🧠 3-QUESTION\nIQ TEST",
          color: "#ffff00",
          fontSize: 85,
          y: 700,
          animation: "pop"
        },
        {
          type: "text",
          text: "Can you pass?",
          color: "#ffffff",
          fontSize: 50,
          y: 1100
        }
      ]
    },
    {
      id: "question_1",
      duration: 6,
      tts: "Question 1. What has keys but cannot open a single lock?",
      layers: [
        {
          type: "background",
          gradient: ["#1e1b4b", "#4338ca"]
        },
        {
          type: "text",
          text: "QUESTION 1/3",
          color: "#6366f1",
          fontSize: 45,
          y: 400
        },
        {
          type: "text",
          text: "What has keys\nbut cannot open\na single lock?",
          color: "#ffffff",
          fontSize: 65,
          y: 800
        }
      ]
    },
    {
      id: "answer_1",
      duration: 4,
      tts: "The answer is a piano. Did you get it right?",
      layers: [
        {
          type: "background",
          gradient: ["#064e3b", "#059669"]
        },
        {
          type: "text",
          text: "ANSWER:",
          color: "#10b981",
          fontSize: 50,
          y: 600
        },
        {
          type: "text",
          text: "🎹 A PIANO",
          color: "#ffffff",
          fontSize: 85,
          y: 900,
          animation: "pop"
        }
      ]
    },
    {
      id: "question_2",
      duration: 6,
      tts: "Question 2. If an electric train is traveling south, which way is the smoke blowing?",
      layers: [
        {
          type: "background",
          gradient: ["#1e1b4b", "#4338ca"]
        },
        {
          type: "text",
          text: "QUESTION 2/3",
          color: "#6366f1",
          fontSize: 45,
          y: 400
        },
        {
          type: "text",
          text: "If an electric train\nis traveling south,\nwhich way is the\nsmoke blowing?",
          color: "#ffffff",
          fontSize: 60,
          y: 800
        }
      ]
    },
    {
      id: "answer_2",
      duration: 4,
      tts: "Nowhere. Electric trains do not make smoke. Don't feel bad if that fooled you.",
      layers: [
        {
          type: "background",
          gradient: ["#064e3b", "#059669"]
        },
        {
          type: "text",
          text: "ANSWER:",
          color: "#10b981",
          fontSize: 50,
          y: 600
        },
        {
          type: "text",
          text: "❌ NOWHERE\n(Electric trains\nhave no smoke)",
          color: "#ffffff",
          fontSize: 70,
          y: 900
        }
      ]
    },
    {
      id: "question_3",
      duration: 6,
      tts: "Question 3. I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      layers: [
        {
          type: "background",
          gradient: ["#1e1b4b", "#4338ca"]
        },
        {
          type: "text",
          text: "FINAL QUESTION",
          color: "#6366f1",
          fontSize: 45,
          y: 400
        },
        {
          type: "text",
          text: "I speak without a mouth\nand hear without ears.\nWhat am I?",
          color: "#ffffff",
          fontSize: 60,
          y: 800
        }
      ]
    },
    {
      id: "outro",
      duration: 5,
      tts: "The final answer is an Echo. Drop your score in the comments below right now.",
      layers: [
        {
          type: "background",
          gradient: ["#111827", "#312e81"]
        },
        {
          type: "text",
          text: "ANSWER: AN ECHO",
          color: "#ffff00",
          fontSize: 65,
          y: 600
        },
        {
          type: "text",
          text: "What was your score?\n👇 Comment Below 👇",
          color: "#ffffff",
          fontSize: 55,
          y: 1000
        }
      ]
    }
  ]
};
