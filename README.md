# WhatsApp Compact

A Chrome extension that restyles WhatsApp Web to look like Discord's compact mode: a darker theme, one line per message (time, name, text), Discord-style reply lines and link cards, and community subgroups shown as `Community ›` + `# channel`.

## Install

1. Open `chrome://extensions` and turn on Developer mode.
2. Click **Load unpacked** and select this folder.
3. Reload web.whatsapp.com.

## Known limits

- Chat list rows keep WhatsApp's fixed heights (its virtualized list hard-codes them), so the extra space shows a two-line preview instead.
- The colors are for the dark theme only.
- People who aren't in your contacts show by name only after WhatsApp has shown that name once in the chat.
