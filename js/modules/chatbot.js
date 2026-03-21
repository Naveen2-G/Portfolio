/* ===== PERSONAL CHATBOT ===== */

(function () {
    const toggleButton = document.getElementById('chatbotToggle');
    const panel = document.getElementById('chatbotPanel');
    const closeButton = document.getElementById('chatbotClose');
    const messages = document.getElementById('chatbotMessages');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');

    if (!toggleButton || !panel || !closeButton || !messages || !form || !input) {
        return;
    }

    const quickActionButtons = panel.querySelectorAll('.chatbot-quick-actions button');
    const botReplyQueue = [];
    let isBotTyping = false;

    const botReplies = [
        {
            test: /who\s+is\s+naveen|about\s+naveen|about\s+me|about\s+yourself|tell\s+me\s+about\s+(naveen|you)|introduce\s+(naveen|yourself)|profile\s+summary/i,
            text: 'Naveen Kumar is a Computer Science student and aspiring Java Developer and Full Stack Web Developer. He builds scalable, user-focused applications using Java, React, Node.js, Express.js, MySQL, and MongoDB. He is passionate about clean code, real-world problem solving, and collaborative development, and is currently open to internships, entry-level, and full-time opportunities.<br><a href="#home">Go to Home</a> | <a href="#contact">Go to Contact</a>'
        },
        {
            test: /opportunit|open\s+to\s+work|hire|job|role|position|available/i,
            text: 'Naveen is actively open to internships, entry-level, and full-time roles in Java Development and Full Stack Web Development. He is flexible for remote, hybrid, and on-site opportunities based on role fit and project impact.<br><a href="#contact">Go to Contact</a> | <a href="#experience">Go to Experience</a>'
        },
        {
            test: /skills|tech|stack|technology|tools|competenc/i,
            text: 'Skills summary:<br>1) Languages: Java, C++, Python, JavaScript.<br>2) Full Stack: React, Node.js, Express.js, PHP, HTML, CSS.<br>3) Databases: MySQL, MongoDB.<br>4) Tools: Git, GitHub, VS Code, Eclipse, Postman, AWS.<br>5) Core strengths: OOP in Java, JDBC, role-based access control, CRUD workflows.<br><a href="#skills">Go to Skills</a>'
        },
        {
            test: /project|projects|case\s*study|work|portfolio|built|builds/i,
            text: 'Featured projects:<br>1) Music School Management System (MERN): Student enrollment, scheduling, teacher assignment, performance tracking, and role-based dashboards.<br>2) Movie Ticket Booking System (PHP/MySQL): Movie browsing, showtime booking, secure authentication, seat selection, and admin CRUD management.<br>3) Student Tracker (LPU Grading): CGPA calculator, CGPA predictor, and attendance tracking for semester planning.<br>4) Number Guessing Game (JavaFX): Interactive Java desktop game with scoring and retry flow.<br>GitHub project links are available in the Projects section.<br><a href="#projects">Go to Projects</a> | <a href="#case-study">Go to Case Study</a>'
        },
        {
            test: /experience|training|internship\s+experience|board\s+infinity/i,
            text: 'Experience and training:<br>Naveen completed Java Developer Core to Advanced training at Board Infinity (July 2025). The training covered Core Java, OOP, Collections, Exception Handling, Multithreading, File I/O, and JDBC, with mini applications for hands-on debugging and modular design practice.<br><a href="#experience">Go to Experience</a>'
        },
        {
            test: /achievement|highlights?|accomplish/i,
            text: 'Highlights:<br>1) Completed structured Java training with practical implementation.<br>2) Delivered full stack projects with role-based workflows (MERN and PHP/MySQL).<br>3) Contributed to community activities and continuous upskilling through web development and AI webinars.<br><a href="#achievements">Go to Highlights</a>'
        },
        {
            test: /certification|certificate|certificates?/i,
            text: 'Certifications include:<br>1) Java Developer Core to Advanced (Board Infinity).<br>2) Computer Communications Specialization (Coursera).<br>3) Master Generative AI and Generative AI Tools (Udemy).<br>4) Basic Python towards ML/AI (CSE Pathshala).<br>Certificate links are listed in the Certifications section.<br><a href="#certifications">Go to Certifications</a>'
        },
        {
            test: /education|college|university|study|academic/i,
            text: 'Education summary:<br>1) B.Tech in Computer Science, Lovely Professional University (since Aug 2023), CGPA: 7.28/10.<br>2) Intermediate, Sri Chaitanya Junior College, 96%.<br>3) Matriculation, Bheeram Sreedhar Reddy International School, 77%.<br><a href="#education">Go to Education</a>'
        },
        {
            test: /learning\s+now|currently\s+learning|learning/i,
            text: 'Currently learning: Spring Boot, System Design, and GenAI API integration patterns, with a focus on scalable backend architecture and production-ready application design.<br><a href="#learning-now">Go to Learning Now</a>'
        },
        {
            test: /resume|cv|download/i,
            text: 'You can download the latest resume here: <a href="assets/documents/NaveenKumarCV.pdf" target="_blank" rel="noopener noreferrer">Download CV</a>.'
        },
        {
            test: /contact|email|phone|reach|connect|linkedin|github/i,
            text: 'Contact details:<br>Email: <a href="mailto:naveengudela7@gmail.com">naveengudela7@gmail.com</a><br>Phone: <a href="tel:+919346226686">+91 93462 26686</a><br>LinkedIn: <a href="https://www.linkedin.com/in/naveen53/" target="_blank" rel="noopener noreferrer">naveen53</a><br>GitHub: <a href="https://github.com/Naveen2-G" target="_blank" rel="noopener noreferrer">Naveen2-G</a><br><a href="#contact">Go to Contact</a>'
        },
        {
            test: /location|based|where/i,
            text: 'Naveen is based in India and open to remote, hybrid, and on-site opportunities depending on project scope and role requirements.'
        },
        {
            test: /hello|hi|hey/i,
            text: 'Hi! I am Naveen Assistant. Ask me about projects, skills, opportunities, experience, certifications, education, resume, or contact details.'
        }
    ];

    const fallbackReply = 'I can help with detailed summaries from every section. Try asking: "Who is Naveen?", "Explain projects", "What opportunities is he looking for?", "Tell me about skills", "Show education", or "How can I contact him?"<br>Quick links: <a href="#projects">Projects</a> | <a href="#skills">Skills</a> | <a href="#experience">Experience</a> | <a href="#contact">Contact</a>';

    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    function createMessage(content, sender, allowHtml) {
        const bubble = document.createElement('div');
        bubble.className = `chatbot-message ${sender}`;

        if (allowHtml) {
            bubble.innerHTML = content;
        } else {
            bubble.textContent = content;
        }

        messages.appendChild(bubble);
        scrollToBottom();
        return bubble;
    }

    function toPlainText(htmlContent) {
        const parser = document.createElement('div');
        parser.innerHTML = htmlContent.replace(/<br\s*\/?>/gi, '\n');
        return (parser.textContent || parser.innerText || '').trim();
    }

    function typeBotReply(replyHtml) {
        const typingBubble = createMessage('', 'bot', false);
        const plainText = toPlainText(replyHtml);
        const typingSpeed = 16;
        const chunkSize = 2;
        let charIndex = 0;

        const stream = () => {
            if (charIndex < plainText.length) {
                charIndex = Math.min(charIndex + chunkSize, plainText.length);
                typingBubble.textContent = plainText.slice(0, charIndex);
                scrollToBottom();
                window.setTimeout(stream, typingSpeed);
                return;
            }

            typingBubble.innerHTML = replyHtml;
            scrollToBottom();
            isBotTyping = false;
            processBotQueue();
        };

        stream();
    }

    function processBotQueue() {
        if (isBotTyping || botReplyQueue.length === 0) {
            return;
        }

        isBotTyping = true;
        const nextReply = botReplyQueue.shift();
        typeBotReply(nextReply);
    }

    function enqueueBotReply(replyHtml) {
        botReplyQueue.push(replyHtml);
        processBotQueue();
    }

    function getReply(userText) {
        const normalized = userText.trim();
        for (let i = 0; i < botReplies.length; i += 1) {
            if (botReplies[i].test.test(normalized)) {
                return botReplies[i].text;
            }
        }
        return fallbackReply;
    }

    function handleUserMessage(rawText) {
        const trimmed = rawText.trim();
        if (!trimmed) {
            return;
        }

        createMessage(escapeHtml(trimmed), 'user', false);

        window.setTimeout(() => {
            enqueueBotReply(getReply(trimmed));
        }, 260);
    }

    function openChat() {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        toggleButton.setAttribute('aria-expanded', 'true');
        input.focus();
    }

    function closeChat() {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.focus();
    }

    toggleButton.addEventListener('click', () => {
        if (panel.classList.contains('open')) {
            closeChat();
        } else {
            openChat();
        }
    });

    closeButton.addEventListener('click', closeChat);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleUserMessage(input.value);
        input.value = '';
    });

    quickActionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const question = button.getAttribute('data-question') || '';
            handleUserMessage(question);
        });
    });

    messages.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLAnchorElement)) {
            return;
        }

        const href = target.getAttribute('href') || '';
        if (!href.startsWith('#')) {
            return;
        }

        const section = document.querySelector(href);
        if (!section) {
            return;
        }

        event.preventDefault();
        closeChat();
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && panel.classList.contains('open')) {
            closeChat();
        }
    });

    createMessage('Hi, I am your portfolio assistant. Ask me anything about Naveen\'s profile.', 'bot', false);
})();
