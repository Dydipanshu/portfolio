---
title: AKTU Answer Copy
line: Download your checked answer sheets as one PDF
year: '2025'
kind: Web app
stack: [Next.js, TypeScript, Vercel]
links:
  - { label: aktucopy.vercel.app, href: 'https://aktucopy.vercel.app' }
  - { label: Source, href: 'https://github.com/Dydipanshu/AktuAnswerCopy' }
featured: true
order: 1
---

My university, AKTU, lets you look at your checked answer sheets online, but there's no way to download them. If you wanted a copy, you went through it page by page and saved each image yourself. That took about twenty minutes per subject.

So I built a small site that does it for you. You log in, pick a subject, and a minute later you have one PDF, with the marks table on the first page if the portal has one.

It's used by 40+ students so far.

## A few things that were harder than they looked

The portal is an old site with hidden form fields and session cookies, so the login and navigation all happen on the server. The browser never talks to the portal directly.

My first version matched semester names exactly. Then the portal renamed one and everything broke. Now the app reads whatever options the page actually shows.

Downloading thirty images takes a while, and a spinner made people think it had frozen. So it shows "18 of 30 pages" instead. That change got more thanks than anything else I did.

Every error comes with a short ID. When someone messages me that it didn't work, I ask for the ID and I can see what happened.

## What I'd change

Jobs are kept in memory. At this size that's fine, but a restart loses any download that's in progress. The next step is a small persistent queue, like a Postgres table or Redis, so jobs survive a restart and could run on more than one machine.
