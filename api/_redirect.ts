import type { VercelResponse } from '@vercel/node'

/**
 * Renders a minimal interstitial page that loads the Vercel Web Analytics
 * beacon (so the entry route registers a pageview) and then redirects to the
 * external URL. A 307 alone renders no HTML, so the client-side beacon never
 * runs and the route never shows up in Analytics.
 */
export function redirectWithBeacon(
  res: VercelResponse,
  url: string | undefined,
  label: string,
) {
  if (!url) {
    return res.status(404).send(`${label} link not configured.`)
  }

  // Escape for the inline <script> context: JSON.stringify alone does not
  // neutralize a '</script>' substring, which would terminate the tag early.
  const target = JSON.stringify(url).replace(/</g, '\\u003c')
  // Escape for HTML attribute contexts (href, meta refresh content).
  const safe = url
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Redirecionando…</title>
<script defer src="/_vercel/insights/script.js"></script>
<noscript><meta http-equiv="refresh" content="0;url=${safe}"></noscript>
<script>
(function () {
  var target = ${target};
  var done = false;
  function go() { if (done) return; done = true; window.location.replace(target); }
  // Redirect shortly after the page (incl. the analytics beacon) loads.
  window.addEventListener('load', function () { setTimeout(go, 200); });
  // Hard fallback if the beacon script is blocked and 'load' is delayed.
  setTimeout(go, 1500);
})();
</script>
<style>
  html, body { height: 100%; margin: 0; }
  body {
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a; color: #e5e5e5;
    font-family: system-ui, -apple-system, sans-serif; font-size: 15px;
  }
</style>
</head>
<body>
  <p>Redirecionando… <a href="${safe}" style="color:#e5e5e5">Toque aqui</a> se não for automático.</p>
</body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).send(html)
}
