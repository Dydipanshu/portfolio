---
title: Support triage agent
line: An AI support agent that knows which messages it must not answer alone
year: '2026'
kind: Project
stack: [Python, OpenAI API, Embeddings, pandas, scikit-learn]
links:
  - { label: Source and report, href: 'https://github.com/Dydipanshu/support-triage-agent' }
featured: true
order: 1
---

An agent for an airline's Twitter support desk, built on 23,000+ real Delta Air Lines threads from a public Kaggle dataset. For each opening tweet it picks one of nine intents, drafts a reply in the style of Delta's real replies to similar messages, and decides whether that reply can go out on its own or a person has to read it first.

The agent itself is about 200 lines. Most of the work went into knowing whether it was any good. I hand-labelled 220 tweets as a golden set, built two baselines to beat, and used a second model as a judge for reply quality. Then I scored 60 replies myself, blind, to check the judge. It agreed with me at Spearman 0.72 and was never more than one point off.

| | intent accuracy | escalation recall | unsafe replies (of 51) |
|---|---|---|---|
| Keyword baseline | 0.58 | 0.33 | 34 |
| This agent | 0.84 | 0.94 | 3 |

The escalation part is the one I care about most. Messages about money, personal data, legal or medical issues, or an angry customer hit fixed rules first, and the model can add an escalation but can never remove one. It still answers two out of three messages by itself, so it isn't safe just because it sends everything to a human.

Every model call is cached, so anyone can clone the repo and get the same numbers.
