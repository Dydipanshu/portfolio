---
title: AKTU record extractor
line: Pulled 1,000+ student records that were being copied by hand
year: '2024'
kind: Script
stack: [TypeScript, Node.js, Cheerio, MongoDB]
links:
  - { label: Source, href: 'https://github.com/Dydipanshu/AKTU-DOB-FINDER' }
order: 4
---

Someone was copying student records out of the university portal by hand, one roll number at a time. It was taking days.

I wrote a Node script that goes through the roll numbers, reads each record and saves it to a database and a spreadsheet. It covered 1,000+ students in one run.

The portal is slow and drops sessions often, so the script waits between requests, notices when it's been logged out, logs back in and retries. You can start it and walk away.
