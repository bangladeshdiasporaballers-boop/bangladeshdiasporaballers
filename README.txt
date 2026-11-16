BDB — GitHub Pages static website
==================================

FILES
-----
index.html          Main website page
assets/style.css    All visual styling and responsive layout
assets/app.js       Player search/filter, language toggle, mobile menu and email submission
README.txt          This guide

PUBLISH ON GITHUB PAGES
-----------------------
1. Extract this ZIP on your device.
2. Open your GitHub repository.
3. Upload index.html and the complete assets folder to the repository ROOT.
   Correct:
      repository/
        index.html
        assets/
          style.css
          app.js
   Incorrect:
      repository/BDB_GitHub_Files/index.html
4. Commit the uploaded files to the main branch.
5. Open repository Settings > Pages.
6. Under Build and deployment, choose "Deploy from a branch".
7. Choose Branch: main and Folder: /(root), then Save.
8. Wait for deployment, then open the Pages URL.

IMPORTANT LIMITATIONS
---------------------
GitHub Pages hosts static files only. This package does NOT include server-side
accounts, secure login, MySQL database, admin approval, or persistent player
submissions. The player submission form prepares an email using the visitor's
email application. The sample player profiles are demonstration content.
Before publishing real player details, especially details about minors, obtain
appropriate permission and avoid publishing private contact information.

The page uses Google Fonts as an optional external font source. If those fonts
cannot load, system fallback fonts are used.
