# Finovo Legal Safety Runbook

This runbook is an operational checklist for bugs, data incidents, and a possible app wind-down. It is not legal advice; use it to keep actions consistent, privacy-preserving, and ready for lawyer review.

## Incident Response

Classify every report before replying publicly or changing legal wording:

- `P0 data loss/security`: possible loss, exposure, or unauthorized sharing of financial, income, CSV, note, or identity data.
- `P1 paid feature unavailable`: Partner Mode, purchase restore, subscription entitlement, or sharing is materially broken.
- `P2 calculation/display bug`: balances, savings, salary split, imports, forecasts, or insights may be wrong.
- `P3 cosmetic/support`: UI, copy, or help-text issues without data or payment impact.

Default handling:

1. Record date, app version, iOS version, affected feature, and reproduction steps.
2. Do not request full bank statements, salary data, CSV files, names, or notes unless absolutely necessary.
3. If sample data is required, ask the user to redact or create a minimal artificial example.
4. Preserve technical context without personal data: counts, feature state, error type, and timestamps are preferred.
5. For P0/P1, stop any risky marketing claim until verified, prioritize a fix, and keep a plain-language support response ready.
6. After a fix, update Support FAQ or Terms/Privacy only when the public promise changed or users need new instructions.

## Calculation Or Import Bugs

- Tell users Finovo is a budgeting tool for personal planning, not financial/tax/legal advice.
- Ask users to check important decisions against bank records or original documents.
- Patch deterministic calculation/import issues before changing legal copy.
- If imported data may be duplicated, skipped, or categorized incorrectly, point users to backup export, CSV skipped-row review, and import undo where applicable.
- Do not promise compensation or refunds in support email. For subscription refunds, direct users to Apple and escalate internally.

## Data Loss Or Sharing Bugs

- First response should prioritize export/restore/delete instructions, not liability discussion.
- Check whether the issue is local data, CloudKit private database, shared CloudKit zone, subscription state, or user-initiated deletion.
- If user data may still exist in iCloud, guide the user to iOS Settings → Apple ID → iCloud → Manage Storage → Finovo.
- If Partner Mode sharing is involved, verify owner vs participant state before advising removal or re-invite.
- Avoid asking users to email raw backups unless there is no other way and they explicitly understand the sensitivity.

## Subscription And Refund Issues

- Purchases, refunds, billing disputes, cancellation, and renewal are handled by Apple.
- Standard refund link: https://reportaproblem.apple.com
- App flow must keep visible access to restore purchases and manage subscriptions.
- If Partner Mode is broken for many users, fix the entitlement/service issue first, then update Support with status guidance.
- Do not manually promise refunds outside Apple’s process.

## Planned Discontinuation

Use this sequence before permanently stopping Finovo or Partner Mode:

1. Decide whether stopping affects the entire app, only Partner Mode, or only new purchases.
2. Disable new subscriptions or remove the paywall before removing paid functionality.
3. Keep existing paid users’ access for the already-paid period unless Apple refund handling or mandatory legal process says otherwise.
4. Publish a notice on the website and, where feasible, in the app or App Store metadata.
5. Tell users how to export a JSON backup and how to delete local/iCloud data.
6. Keep Terms, Privacy, Support, and contact email available for a defined period after delisting.
7. Update App Store metadata, screenshots, pricing, subscription availability, and support links before delisting.
8. Archive the final website/legal pages and final app build metadata.

Suggested notice period for a planned shutdown: at least 30 days for free-only functionality and at least one full billing period for paid Partner Mode, unless urgent security, Apple policy, or legal requirements require faster action.

## Pre-Launch Legal Checklist

- Terms, Privacy, Support, Impressum, App Store metadata, paywall, and in-app links say the same thing.
- Pricing is either dynamic from Apple or explicitly verified against App Store Connect.
- Paywall shows product name, duration, price, auto-renewal disclosure, restore purchases, and Terms/Privacy links.
- Settings/About links to Terms, Privacy, Support, and Impressum.
- Data Management offers export, restore, and local/account deletion with iCloud deletion guidance.
- Partner sharing copy explains that shared household data can include income data.
- Production logs do not include names, salary values, notes, CSV rows, transaction descriptions, or account-like data.
- A German/EU lawyer reviews final Terms and Privacy before launch if maximum legal certainty is required.
