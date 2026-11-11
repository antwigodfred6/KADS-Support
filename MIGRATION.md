# KADS Support: Domain Migration Plan

**Status: plan only. Nothing here has been executed.** Every step that changes a live system needs explicit approval from the client and whoever runs the account. Never share account passwords. The account owner should make the changes, or grant delegated access.

## What we know today (public lookups, 11 Nov 2026)

| Item | Current value |
|---|---|
| Registrar | Namecheap (per brief) |
| Nameservers | `nebula.dns-parking.com`, `aurora.dns-parking.com`: **DNS is hosted at Hostinger**, not Namecheap |
| Website | Hostinger hosting (WordPress/Divi) behind Hostinger CDN |
| `kadssupport.com` A | `195.200.9.90`, `185.77.97.62` (CDN; may change) |
| `www` | CNAME → `www.kadssupport.com.cdn.hstgr.net` |
| MX | `mx.zoho.eu` (10), `mx2.zoho.eu` (20), `mx3.zoho.eu` (50): **email is Zoho EU** |
| SPF | `v=spf1 include:_spf.mail.hostinger.com ~all` (**does not include Zoho**: an existing issue) |
| DMARC | `v=DMARC1; p=none` |
| DKIM | not found at common selectors; check Zoho admin for the real selector |

**The safest migration changes only two web records (`@` and `www`) inside the existing Hostinger DNS zone.** Nameservers, MX, SPF, DKIM, DMARC and all other records stay exactly as they are.

---

## 1. Inspect the Namecheap nameservers (read-only)

1. Sign in to Namecheap (account owner) → **Domain List** → **Manage** next to `kadssupport.com`.
2. Under **Nameservers**, note the setting. Expect "Custom DNS" with the two `dns-parking.com` servers.
3. Also note: domain expiry date, auto-renew status, and whether **Domain Lock** is on. Take a screenshot.
4. From any terminal (read-only):

```bash
dig +short NS kadssupport.com
```

## 2. Identify the current DNS host

`dns-parking.com` nameservers belong to **Hostinger**, so the live DNS zone is in **Hostinger hPanel → Domains → kadssupport.com → DNS / Nameservers**. Records shown in Namecheap's "Advanced DNS" tab are **not** used while custom nameservers are set. Don't edit them expecting an effect.

## 3. Record and preserve every DNS record

Before any change, take a complete snapshot:

1. In hPanel → DNS zone, **export** the zone file if offered, and take screenshots of every record.
2. Also record from the public DNS (read-only):

```bash
for t in A AAAA CNAME MX TXT CAA NS SOA; do echo "== $t"; dig +short $t kadssupport.com; done
```

```bash
for h in www mail autodiscover _dmarc zmail._domainkey; do echo "== $h"; dig +short ANY $h.kadssupport.com; done
```

3. Save the results as `dns-snapshot-YYYY-MM-DD.txt` with the screenshots, somewhere the client controls.
4. Note each record's **TTL**.

## 4. Preserve email (MX, SPF, DKIM, DMARC)

- **Do not touch** MX, SPF, DKIM, DMARC, or any `zmail`/`zoho` verification TXT records.
- Separately from the website work, and only with the client's approval, fix SPF so Zoho is authorised, for example `v=spf1 include:zoho.eu include:_spf.mail.hostinger.com ~all`. Keep the Hostinger include only if Hostinger still sends mail for the domain (e.g. WordPress notifications). Confirm the DKIM selector in **Zoho Mail Admin → Domains → Email Configuration**. Make this change at a different time from the web cutover, so any problem has one clear cause.
- After any DNS change, send test emails both ways (to and from `info@kadssupport.com`) and check the headers for `spf=pass`, `dkim=pass`.

## 5. Verify the new site on a preview domain first

1. Deploy to the **separate** Vercel project (see README). Use the `*.vercel.app` preview URL.
2. On the preview, check: every page, mobile layouts, contact form behaviour, `robots.txt` (should block all on preview), redirects (`/our-services/` → `/accommodation` etc.), and that unconfirmed content has been resolved.
3. Client sign-off in writing (email is fine).
4. Set **production** environment variables in Vercel: `NEXT_PUBLIC_SITE_URL=https://kadssupport.com`, `NEXT_PUBLIC_SHOW_CONTENT_FLAGS=false`, `ALLOW_INDEXING=true`, and a working `CONTACT_DELIVERY`, once a provider is approved. Redeploy.

## 6. Prepare the rollback plan

- Keep the **Hostinger hosting plan active and the WordPress site unchanged** for at least 30 days after cutover.
- Rollback = put the `@` and `www` records back to the values in the snapshot (step 3). With a low TTL, this takes effect within minutes.
- 24–48 hours before cutover, **lower the TTL** of the `@` and `www` records to 300 seconds (5 minutes). This is the only pre-change edit.
- Choose a low-traffic window, and have someone with Hostinger and Vercel access available.

## 7. Update only the necessary web records

1. In Vercel → Project → **Settings → Domains**, add `kadssupport.com` and `www.kadssupport.com`. Vercel shows the exact records to create (typically an **A record** for the apex and a **CNAME** for `www`; use the values Vercel displays at the time). Choose which hostname is primary (recommended: `kadssupport.com`, with `www` redirecting to it).
2. In Hostinger DNS, **edit only**:
   - `@` A record(s) → Vercel's value (remove the old Hostinger A records for `@` only)
   - `www` CNAME → Vercel's value
3. If Hostinger's CDN adds its own records for the apex, disable the CDN for this domain in hPanel first, and note it in the rollback plan.
4. If a **CAA** record exists, make sure it allows Vercel's certificate authority (Let's Encrypt). Add `letsencrypt.org` if needed, otherwise HTTPS will fail.
5. Don't change nameservers. Don't touch any other record.

## 8. Validate after launch

Within the first hour:

- [ ] `https://kadssupport.com` and `https://www.kadssupport.com` load the new site with a valid certificate (Vercel shows "Valid Configuration")
- [ ] `http://` redirects to `https://`; `www` redirects to the primary host
- [ ] Old URLs redirect with a 301:

```bash
for p in /our-services/ /support-programs/ /about-dacs/ /sample-page/ /contact/; do curl -s -o /dev/null -w "%{http_code} $p -> %{redirect_url}\n" https://kadssupport.com$p; done
```

- [ ] `https://kadssupport.com/robots.txt` allows crawling and lists the sitemap; `sitemap.xml` shows `https://kadssupport.com` URLs
- [ ] The contact form delivers a real test message to the approved inbox
- [ ] Email still works both ways (test send/receive, check SPF/DKIM pass)
- [ ] MX records unchanged:

```bash
dig +short MX kadssupport.com
```

Within the first week:

- [ ] Add the site to **Google Search Console** (verify via a DNS TXT record, which needs approval) and submit `sitemap.xml`
- [ ] Watch Search Console for crawl errors or 404s and add redirects if any old URL is missing
- [ ] Restore the `@`/`www` TTL to a normal value (e.g. 3600)
- [ ] After 30 days with no issues, the client may decide whether to cancel the old Hostinger hosting. **Keep the domain registration and Zoho email untouched.**
