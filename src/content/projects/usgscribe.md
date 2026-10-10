---
title: USGScribe
line: Voice dictation for ultrasound reports, typed straight into MS Word
year: '2026'
kind: Product
stack: [TypeScript, React, Electron, Whisper, Vercel]
links:
  - { label: usgscribe.tunedloop.com, href: 'https://usgscribe.tunedloop.com' }
  - { label: Windows app, href: 'https://github.com/Dydipanshu/usgscribe-desktop/releases/latest' }
  - { label: Source, href: 'https://github.com/Dydipanshu/medical-dict' }
featured: true
order: 2
---

Many doctors write ultrasound reports in MS Word, and a lot of that time goes into typing the same sentences again and again. USGScribe lets them speak instead. Press a shortcut, talk, and the text appears where the cursor is, each time they pause.

There are two parts. A small desktop app sits in the system tray and types into Word or any other program, then puts the doctor's clipboard back the way it was. There's also a web editor with report templates, printing and .docx export.

Speech goes to Whisper on Groq's free tier, with a prompt that leans it toward ultrasound terms. The part I spent the most time on is what happens after. Saying "10.2 by 4.5 centimetres" gives `10.2 x 4.5 cm`. "New paragraph" and "full stop" work as commands, and "insert normal liver" drops in the whole normal-liver sentence. Short segments that pile up are merged into one request, which keeps usage inside the free limits.

Reports stay in the browser. Only the audio leaves the device, and the API key stays on the server behind a per-IP rate limit.
