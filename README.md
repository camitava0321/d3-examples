# d3-examples
Examples in D3

Howw to see these examples:

The html files uses local assets — data.json, d3.layout.orbit.js, and ../d3.min.js — such html files cannot be opened by just double-clicking (the d3.json() call will fail due to browser CORS restrictions on file:// URLs). You need a local HTTP server.

The simplest options:

Option 1 — VS Code Live Server (easiest)
If you have the Live Server extension installed in VS Code, right-click 01.html in the explorer and choose "Open with Live Server". It will serve the folder on http://127.0.0.1:5500.

Option 2 — Python (no install needed on most systems)
Open a terminal in the file's directory and run:

cd h:\DevelopmentWorkspaces\gitProjects\d3-examples\04-SolarSystem
python -m http.server 8080

Then open http://localhost:8080/01.html in your browser.

Option 3 — Node.js http-server
npx http-server h:\DevelopmentWorkspaces\gitProjects\d3-examples\04-SolarSystem -p 8080

Then open http://localhost:8080/01.html.

Browsers block fetch/XMLHttpRequest from file:// origins, so d3.json("data.json", ...) would silently fail. A local HTTP server sidesteps this completely.
