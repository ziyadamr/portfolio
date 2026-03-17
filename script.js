const apiKey = ""; // Environment provided

// --- Gemini API Logic ---
async function fetchGemini(prompt, systemInstruction = "") {
    // الرابط الصحيح والمختبر للـ API
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const payload = {
        contents: [{ parts: [{ text: prompt }] }]
    };
    
    // إضافة الـ systemInstruction فقط إذا كانت موجودة
    if (systemInstruction) {
        payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            // سطر يطبع تفاصيل الخطأ القادم من جوجل في الـ Console
            const errorDetails = await response.json();
            console.error("خطأ من جوجل:", errorDetails);
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
        
    } catch (err) {
        console.error("فشل الاتصال:", err);
        return "Connection error. Please try again later.";
        
    }
}
// --- AI Chat Features ---
const sysMsg =
  "You are the Digital Twin of Ziyad Amr, a Machine Learning Engineer. Your goal is to represent him professionally. His skills: Python, TensorFlow, Scikit-Learn, SQL. Education: Bachelor of CS (2020-2024). Projects: Sentiment Bot, Vision Monitor, Market Forecast. Be helpful, concise, and smart. If asked about contact, refer them to the contact section.";

function toggleAIChat() {
  const window = document.getElementById("ai-chat-window");
  const fab = document.getElementById("ai-fab");
  if (window.style.display === "flex") {
    window.style.display = "none";
    fab.style.display = "flex";
  } else {
    window.style.display = "flex";
    fab.style.display = "none";
  }
}

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const typing = document.getElementById("chat-typing");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  messages.innerHTML += `<div class="bg-sky-600/20 p-3 rounded-2xl rounded-tr-none ml-8 text-right self-end">${text}</div>`;
  messages.scrollTop = messages.scrollHeight;

  typing.style.display = "block";
  const aiResponse = await fetchGemini(text, sysMsg);
  typing.style.display = "none";

  messages.innerHTML += `<div class="bg-slate-800 p-3 rounded-2xl rounded-tl-none mr-8">${aiResponse}</div>`;
  messages.scrollTop = messages.scrollHeight;
}

document.getElementById("chat-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// --- Other AI Features ---
async function generateTechFact() {
  const insightBox = document.getElementById("tech-insight");
  insightBox.innerText = "✨ Thinking...";
  const fact = await fetchGemini(
    "Tell me one short, mind-blowing and professional fact about Machine Learning or AI in 2026."
  );
  insightBox.innerText = fact;
}

async function generateProjectIdea() {
  const ideaBox = document.getElementById("project-idea-box");
  const ideaText = document.getElementById("project-idea-text");
  ideaBox.classList.remove("hidden");
  ideaText.innerText = "✨ Generating a creative idea for Ziyad...";
  const idea = await fetchGemini(
    "Generate a unique and complex Machine Learning project idea that Ziyad Amr should build for his portfolio. Focus on generative AI or computer vision."
  );
  ideaText.innerText = idea;
}

function handleContact() {
  const name = document.getElementById("contact-name").value;
  const msg = document.getElementById("contact-msg").value;
  if (!name || !msg) return;
  // Fake send
  alert(
    `Thanks ${name}! (AI Note: This form is a demo, but Ziyad's AI twin would have liked your message!)`
  );
}

// --- Static Initializers ---
AOS.init({ duration: 1000, once: true });
AOS.init({ 
    duration: 800, // مدة الحركة بالملي ثانية
    once: true     // تشغيل الحركة مرة واحدة فقط عند النزول
});

new Typed("#typed-text", {
  strings: ["Machine Learning Engineer", "AI Enthusiast"],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1500,
  loop: true,
});

particlesJS("particles-js", {
  particles: {
    number: { value: 90, density: { enable: true, value_area: 800 } },
    color: { value: "#38bdf8" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 2, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#38bdf8",
      opacity: 0.1,
      width: 1,
    },
    move: { enable: true, speed: 1.5 },
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
    },
    modes: { grab: { distance: 200 } },
  },
});

// Mobile Menu Logic
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
// تشغيل مكتبة الحركات (Animate On Scroll)
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});
