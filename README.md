# Wheel of Time Security Practice App

## Overview
This Wheel of Time-themed application allows students to explore and test common web application vulnerabilities, including SQL Injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF). Built with Electron and Express.js, the app provides a safe environment to learn and experiment.

---

## Features
- **SQL Injection:** Simulated vulnerable endpoint where students can run SQLMap to exploit the database.
- **XSS:** Input fields vulnerable to JavaScript injection.
- **CSRF:** Simulated forged requests demonstrating unauthorized actions.

---

## Deployment Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)
- A modern operating system (Windows, macOS, or Linux)

### Installing Node.js

#### On Windows:
1. Go to the [Node.js official website](https://nodejs.org/).
2. Download the Windows Installer (LTS version recommended).
3. Run the installer and follow the setup wizard:
   - Accept the license agreement.
   - Choose the installation path.
   - Ensure the box for adding Node.js to the system PATH is checked.
4. Verify the installation:
   ```cmd
   node -v
   npm -v
   ```
   This should display the installed versions of Node.js and npm.

#### On macOS:
1. Open Terminal.
2. Install Node.js via Homebrew (if Homebrew is not installed, first install it by running the command: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`):
   ```bash
   brew install node
   ```
3. Verify the installation:
   ```bash
   node -v
   npm -v
   ```
   This should display the installed versions of Node.js and npm.

### Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo-name/wheel-of-time-security.git
   cd wheel-of-time-security
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Application:**
   ```bash
   npm start
   ```
   This will:
   - Start the Express backend on `http://localhost:3000`
   - Launch the Electron app, rendering the vulnerable web application.

4. **Test the Application:**
   - Open the app window or navigate to `http://localhost:3000` in your browser.
   - Begin interacting with the vulnerabilities in the app.

---

## Walkthrough for Students

### 1. SQL Injection
**Objective:** Demonstrate how attackers can manipulate SQL queries to gain unauthorized access or retrieve sensitive data.

**Steps:**
1. Navigate to the SQL Injection section.
2. Enter the following credentials:
   - **Username:** `Rand`
   - **Password:** `al'Thor`
   - You should see a successful login message.
3. Now, simulate an attack:
   - **Username:** `any_value`
   - **Password:** `' OR '1'='1` (classic SQL injection payload).
   - Observe the message: "SQL Injection Successful! Database compromised."
4. **Advanced Testing:**
   - Use [SQLMap](https://sqlmap.org/) against the `/login` endpoint to explore automated SQL injection exploitation.
     ```bash
     sqlmap -u http://localhost:3000/login --data="username=test&password=test" --batch
     ```

### 2. Cross-Site Scripting (XSS)
**Objective:** Show how malicious scripts can be injected into a web application to affect other users.

**Steps:**
1. Navigate to the XSS section.
2. Enter any plain text (e.g., `Hello, world!`) and submit to see it rendered below.
3. Inject a script:
   - Input: `<script>alert('PWNED');</script>`
   - Observe how the script executes in the browser.
4. **Discussion:**
   - Explain how unsanitized inputs can lead to session hijacking, credential theft, or phishing attacks.

### 3. Cross-Site Request Forgery (CSRF)
**Objective:** Understand how attackers trick users into performing unauthorized actions.

**Steps:**
1. Navigate to the CSRF section.
2. Click on the "Simulate Forged Request" link.
3. Observe the simulated result: "You just sent a forged request to the server!"
4. **Discussion:**
   - Explain how CSRF tokens can prevent these attacks by validating the source of a request.

---

## Additional Notes
- **Environment Safety:** This app is designed for local use only. Do not expose it to the internet as it contains intentional vulnerabilities.
- **Customization:** Feel free to modify the code to add more vulnerability types or enhance existing ones.
- **Learning Resources:**
  - [OWASP Top 10](https://owasp.org/www-project-top-ten/)
  - [SQLMap Documentation](https://sqlmap.org/documentation/)
  - [XSS Cheat Sheet](https://owasp.org/www-community/attacks/xss/)
