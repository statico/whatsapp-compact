# WhatsApp Compact

<img src="icons/icon-128.png" width="64" alt="">

WhatsApp Compact is a Chrome extension that changes the look of WhatsApp Web. The result looks like the compact mode of Discord.

## What it changes

- The theme is darker and almost monochrome. Only the names of people have color.
- Each message shows on one line: the time, the name of the sender, and the text.
- A reply shows as one short line above the message, with a curved line that connects to it.
- Link previews show as cards under the message.
- Images keep their size and show under the name of the sender.
- A channel in a community shows as `Community ›` above `# channel`. This makes channels easy to tell apart from groups.
- All text uses the system font, in two sizes: 14px for messages and 12px for labels.

The extension does not read, store, or send your messages. It only changes the CSS of the page, and it reads names that are already on the screen.

## Install

1. Download or clone this repository.
2. In Chrome, open `chrome://extensions`.
3. Turn on **Developer mode**.
4. Click **Load unpacked**, then select the folder of this repository.
5. Reload `web.whatsapp.com`.

## Known limits

- The rows in the chat list keep the height that WhatsApp sets. WhatsApp sets these heights in its code, so CSS cannot make them smaller. The extension uses the extra space for a preview of two lines.
- The colors are for the dark theme of WhatsApp only.
- A person who is not in your contacts shows as a phone number. When WhatsApp shows the profile name of that person once, the extension uses that name.
- WhatsApp changes its page often. When WhatsApp changes the page, some styles can stop working.

## Development

The extension has three files:

- `manifest.json` gives the extension settings to Chrome.
- `compact.css` contains all the styles.
- `compact.js` splits the time and the name out of each message, so that the CSS can show them in columns.

WhatsApp uses class names that change with each release. Thus, the CSS uses only IDs, roles, `data-testid`, and `data-icon` attributes.

### Use a separate Chrome profile

Use a separate Chrome profile for development. Then your usual browser profile is not part of your tests.

1. Start a separate instance of Chrome from the folder of this repository. Your usual Chrome can stay open.

   ```sh
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --user-data-dir="$PWD/.chrome-profile" \
     --remote-debugging-port=9222 \
     https://web.whatsapp.com
   ```

2. Link WhatsApp in this instance with the QR code.
3. Load the extension in this instance with **Load unpacked** (see [Install](#install)). Google Chrome ignores the `--load-extension` flag, so you must use **Load unpacked**.

CAUTION: Do not commit the `.chrome-profile` folder. It contains your WhatsApp session. The `.gitignore` file already excludes it.

CAUTION: Do not open port 9222 to other computers. Any program that connects to this port can control your WhatsApp session. By default, Chrome accepts connections only from the same computer.

### Test a change

1. Edit `compact.css` or `compact.js`.
2. In `chrome://extensions`, click the reload button on WhatsApp Compact.
3. Reload `web.whatsapp.com`.

You can also inject a changed stylesheet without a reload. The debug port (9222) uses the Chrome DevTools Protocol. A script or a coding agent can connect to this port and add a `<style>` element to the page. A reload of the page removes styles that you add this way.
