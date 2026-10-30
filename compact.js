// Split WhatsApp's "[9:07 PM, 10/27/2026] Name: " prefix into attributes
// that compact.css renders as Discord-style "time  Name  message" lines.
// Non-contacts arrive as phone numbers; WhatsApp shows their profile name
// ("~ Alex") next to the number on the first message of a group, so we
// remember that pairing and use the name instead.
const names = new Map();

const learn = pair => {
  const [name, phone] = pair.querySelectorAll('[data-testid=author]');
  if (name && phone) names.set(phone.textContent.trim(), name.textContent.trim());
};

const tag = el => {
  const m = el.dataset.prePlainText.match(/^\[([^,]+),[^\]]*\] (.*): $/);
  const name = m ? names.get(m[2]) || m[2] : '';
  el.dataset.wrName = name;
  if (!m) return;
  el.dataset.wrTime = m[1];
  let hue = 0;
  for (const c of name) hue = (hue * 31 + c.charCodeAt(0)) % 360;
  el.style.setProperty('--wr-hue', hue);
};

new MutationObserver(() => {
  document.querySelectorAll('[data-testid=msg-container] div:has(> [data-testid=author] + [data-testid=author])').forEach(learn);
  document.querySelectorAll('[data-pre-plain-text]:not([data-wr-name])').forEach(tag);
}).observe(document.documentElement, { childList: true, subtree: true });
