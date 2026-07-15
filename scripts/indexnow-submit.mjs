// Submit the site's URLs to IndexNow (Bing, Yandex, et al.), pulled from the
// live sitemap. Run automatically after each production deploy by
// .github/workflows/indexnow.yml, or manually:  node scripts/indexnow-submit.mjs
//
// Non-fatal by design: logs and exits 0 on any error, so it can never break CI.
// The key is public (it's hosted at /<key>.txt to prove domain ownership), so
// it's fine to keep here in plain sight.

const KEY = "6ac34c5852f442998868663fb2efb1b9";
const HOST = "www.tryswitchbooks.co.uk";

try {
  const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urls.length === 0) {
    console.log("[indexnow] No URLs found in sitemap; nothing to submit.");
    process.exit(0);
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  console.log(`[indexnow] Submitted ${urls.length} URLs -> ${res.status} ${res.statusText}`);
} catch (err) {
  console.warn("[indexnow] Skipped (error):", err?.message ?? err);
}
