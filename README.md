**CodePen Project**

The CodePen Clone project is a web-based code editor designed for web developers to create beautiful webpages and showcase their skills. Whether you’re a beginner or an experienced developer, this platform allows you to experiment, collaborate, and share your work with others.

 **Live Project Link**
  
  https://code-pen-project.vercel.app/home/auth

**Features:**
1. Authentication:
  Users can sign up and log in using email/password authentication via Firebase.
  Alternatively, sign in with Google or GitHub for a seamless experience.

3. Code Editor (CodeMirror):
  The heart of the project is the code editor powered by CodeMirror.
  CodeMirror supports syntax highlighting for various languages, making it easy to write HTML, CSS, and JavaScript.

4. Project Sections:
  Upon creating a new project, users have three separate sections:
  HTML: Write and preview your HTML markup.
  CSS: Style your webpage using CSS.
  JavaScript: Add interactivity and functionality.

5. Global State Management (Redux):
  Redux is used to manage global application state.
  Store user data, project details, and other relevant information.

6. Data Persistence (Firestore):
  Firestore, part of Firebase, is used for data storage and retrieval.
  Save and load project data seamlessly.

7. AI Chatbot:
  Our project includes an AI chatbot that assists developers.
  The chatbot can help troubleshoot issues, provide code suggestions, and answer common questions.

  **Getting Started**
  
1. Clone the repository:
  git clone https://github.com/your-username/codepen-clone.git

2. Below are the npm commands to install the listed dependencies for your CodePen clone project:

@codemirror/lang-html and @codemirror/lang-javascript:
  npm install @codemirror/lang-html @codemirror/lang-javascript

@reduxjs/toolkit:
  npm install @reduxjs/toolkit

@uiw/react-codemirror:
  npm install @uiw/react-codemirror
  
firebase:
  npm install firebase

framer-motion:
  npm install framer-motion

react, react-dom, and react-icons:
  npm install react react-dom react-icons

react-loader-spinner:
  npm install react-loader-spinner

react-redux:
  npm install react-redux

react-router-dom:
  npm install react-router-dom

react-split-pane:
  npm install react-split-pane

react-toastify:
  npm install react-toastify

redux:
  npm install redux

split-pane-react:
  npm install split-pane-react

uuid:
  npm install uuid


3. Set up Tailwind CSS:

Install tailwindcss and its peer dependencies, then generate your tailwind.config.js and postcss.config.js files.
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.

    /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }

Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

4. Set up Firebase:
Create a Firebase project and enable authentication (email/password, Google, GitHub).
Obtain your Firebase configuration (API key, project ID, etc.).

5. Configure your environment:
Create a .env file and add your Firebase configuration:
VITE_APP_API_KEY=your-api-key
VITE_APP_AUTH_DOMAIN=your-auth-domain
VITE_APP_PROJECT_ID=your-project-id

6. Run the app:
  npm run dev
  
