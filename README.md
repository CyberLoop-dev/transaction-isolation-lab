<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0c1220,100:d97706&height=170&section=header&text=Transaction%20Isolation%20Lab&fontColor=fff7d6&fontSize=36" width="100%" alt="Transaction Isolation Lab banner"/>
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=900&color=FBBF24&center=true&vCenter=true&width=620&lines=Analyze+database+schedules;Explore+conflicts+and+read+anomalies" alt="Animated tagline"/>
<p><strong>A browser-based teaching tool for transaction schedules.</strong></p>
<img src="https://img.shields.io/github/license/CyberLoop-dev/transaction-isolation-lab?style=flat-square" alt="License"/> <img src="https://img.shields.io/github/languages/top/CyberLoop-dev/transaction-isolation-lab?style=flat-square" alt="Language"/> <img src="https://img.shields.io/github/stars/CyberLoop-dev/transaction-isolation-lab?style=flat-square" alt="Stars"/> <img src="https://img.shields.io/github/last-commit/CyberLoop-dev/transaction-isolation-lab?style=flat-square" alt="Last commit"/>
<br/><img src="./assets/mark.svg" width="90%" alt="Two transactions connected by conflict edges"/>
</div>

## 🧭 Overview
Transaction Isolation Lab analyzes small database operation schedules. It builds a precedence graph, checks conflict serializability, and highlights selected read anomalies. It does not connect to or execute SQL against a database.

## ✨ Features
- 🧾 Parse read, write, commit, and abort operations.
- 🔀 Build conflict edges between transactions.
- 🔁 Check whether the precedence graph contains a cycle.
- ⚠️ Detect basic dirty-read and non-repeatable-read patterns.
- 🔒 Run the analysis entirely in your browser.

## 🎬 Demo
Start the app and load either built-in example. Edit the schedule to see how operation order changes the graph and anomaly report.

## 🚀 Quick Start
Requires Node.js 20 or newer.

```bash
npm start
```

Open http://127.0.0.1:4176. Run checks with npm test.

## 🧰 Tech Stack
- 🟢 Node.js built-in HTTP server
- 🌐 Browser JavaScript modules
- 🧪 Node.js built-in test runner

## 🗂️ Folder Structure
```text
public/       Schedule parser, analyzer, and interface
test/         Analyzer tests
assets/       Original SVG artwork
.github/      CI workflow
server.js     Dependency-free local server
```

## 🛣️ Roadmap
- [ ] Add recoverability and cascadelessness checks.
- [ ] Export precedence graphs as SVG.
- [ ] Add schedule step-through playback.

## 🤝 Contributing
Contributions are welcome. Keep the supported schedule grammar explicit and add focused tests for each anomaly detector.

## 📄 License
MIT. See LICENSE.

<div align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:d97706,100:0c1220&height=100&section=footer" width="100%" alt="Animated wave footer"/></div>
