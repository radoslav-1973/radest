---
title: 'Check basic settings of your domain by following best practices'
description: 'Simple diagnostics of the basic settings of the internet site using shell tools and a bash script.'
pubDate: 2026-08-26
tags: ['cURL', 'domain', 'bash']
---

First of all, we assumed that our domain was set up correctly. 
That’s mean A, AAAA, CNAME and / or DNS records point to the right host.

When I was young people used to say, “everything new is something old that we have forgotten”.

Today, there are many websites that claim to test our domain settings. 
But still, we can do it even better from the shell console using bash commands.

Since there are many type of documents like ```TLDR```(too long, don't read), it matters little that we don't 
know the Bash syntax very well. Just like FTP, there's a great command-line tool called cURL (connect to URL). 
What's truly impressive about cURL is its flexibility when working with different protocols.

Well, let's give it a try right away...

The first reasonable check with cURL is:

```bash
radoslav@zebra:~$ curl -sIL --max-redirs 8 http://radest.top 2>/dev/null || true
```

And the second is:

```bash
radoslav@zebra:~$ curl -svI --max-redirs 8 http://radest.top 2>/dev/null || true
```

The most important information from the output of the first request is the presence of permanent ```301``` or ```308```
redirect from ```HTTP``` to ```HTTPS```, but also missing elements such as:

```Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none';```<br />
It defines which sources of scripts, styles, images, frames and so on, the browser is allowed to load for your site.

>Why should you add it?<br />
Strongly reduces XSS and data injection risks by blocking unexpected or malicious resources (e.g., inline scripts, 
third party domains you don’t trust).

```Referrer-Policy: strict-origin-when-cross-origin```<br />
It controls how much referrer information (the URL of the previous page) the browser sends when navigating from 
your site to others.

>Why should you add it?<br />
Limits leakage of potentially sensitive URLs (query parameters, paths) to third parties while still allowing 
useful referrer data for your own analytics.

```X-Content-Type-Options: nosniff```<br />
It tells the browser: "Don't try to guess ('sniff') the content type; trust the Content-Type header I sent."

>Why should you add it?<br />
Prevents certain attacks where a server mislabels a file (e.g., sends an HTML page as text/plain), and the 
browser “helpfully” interprets it as HTML/JS, allowing XSS or content injection.

```X-Frame-Options: DENY # never allow framing```<br />
It controls whether your page can be embedded in a ```<frame>/<iframe>``` on other sites.

>Why should you add it?<br />
Helps prevent clickjacking, where an attacker embeds your site in a hidden frame and tricks users into clicking 
things they don't intend to.

The most significant data from the second query are presence of TLS protocol and its version.

So why not to use a simple set of bash commands that send the necessary requests, analyze the relevant 
information, and provide recommendations, just like in the script below:


```bash
#!/usr/bin/env bash
set -euo pipefail

# Usage: ./check-domain.sh [domain]
# Example: ./check-domain.sh www.example.com

DOMAIN="${1:-}"
if [[ -z "$DOMAIN" ]]; then
  echo "Usage: $0 <domain>"
  echo "Example: $0 www.example.com"
  exit 1
fi

# Normalize: ensure scheme for curl tests
HTTP_URL="http://${DOMAIN}"
HTTPS_URL="https://${DOMAIN}"

echo "## Domain: ${DOMAIN}"
echo

# ---------- 1. Redirect chain (http and https) ----------
echo "### 1. Redirect chain (HTTP)"
HTTP_CHAIN=$(curl -sIL --max-redirs 8 --write-out '\n%{http_code}|%{url_effective}' "$HTTP_URL" 2>/dev/null || true)
echo "$HTTP_CHAIN" | grep -E '^(HTTP|<|>|[0-9]{3}\|)' || echo "(no output or failed)"

echo
echo "### 1. Redirect chain (HTTPS)"
HTTPS_CHAIN=$(curl -sIL --max-redirs 8 --write-out '\n%{http_code}|%{url_effective}' "$HTTPS_URL" 2>/dev/null || true)
echo "$HTTPS_CHAIN" | grep -E '^(HTTP|<|>|[0-9]{3}\|)' || echo "(no output or failed)"

# Extract final status and effective URL for HTTPS
FINAL_LINE=$(echo "$HTTPS_CHAIN" | tail -n1)
FINAL_STATUS=$(echo "$FINAL_LINE" | cut -d'|' -f1)
FINAL_URL=$(echo "$FINAL_LINE" | cut -d'|' -f2)

echo
echo "Final HTTPS status: ${FINAL_STATUS}"
echo "Final URL: ${FINAL_URL}"

# ---------- 2. TLS / protocol info ----------
echo
echo "### 2. TLS / protocol details (HTTPS)"
TLS_INFO=$(curl -svI --max-redirs 8 "$HTTPS_URL" 2>&1 || true)

TLS_VERSION=$(echo "$TLS_INFO" | grep -i 'SSL connection using' | head -n1 || true)
ALPN_INFO=$(echo "$TLS_INFO" | grep -i 'ALPN:' | head -n1 || true)

if [[ -n "$TLS_VERSION" ]]; then
  echo "$TLS_VERSION"
else
  echo "TLS version: not detected (possible handshake failure or non-HTTPS)"
fi

if [[ -n "$ALPN_INFO" ]]; then
  echo "$ALPN_INFO"
fi

# ---------- 3. Key security & caching headers ----------
echo
echo "### 3. Key response headers (final HTTPS URL)"
HEADERS=$(curl -sI --max-redirs 10 "$FINAL_URL" 2>/dev/null || true)

# Important headers
STRICT_TRANSPORT=$(echo "$HEADERS" | grep -i '^strict-transport-security:' || true)
CONTENT_SECURITY=$(echo "$HEADERS" | grep -i '^content-security-policy:' || true)
X_FRAME=$(echo "$HEADERS" | grep -i '^x-frame-options:' || true)
X_CONTENT_TYPE=$(echo "$HEADERS" | grep -i '^x-content-type-options:' || true)
REFERRER_POLICY=$(echo "$HEADERS" | grep -i '^referrer-policy:' || true)
PERMISSIONS_POLICY=$(echo "$HEADERS" | grep -i '^permissions-policy:' || true)
CACHE_CONTROL=$(echo "$HEADERS" | grep -i '^cache-control:' || true)
SERVER_HEADER=$(echo "$HEADERS" | grep -i '^server:' || true)

echo "Strict-Transport-Security: ${STRICT_TRANSPORT:--}"
echo "Content-Security-Policy: ${CONTENT_SECURITY:--}"
echo "X-Frame-Options: ${X_FRAME:--}"
echo "X-Content-Type-Options: ${X_CONTENT_TYPE:--}"
echo "Referrer-Policy: ${REFERRER_POLICY:--}"
echo "Permissions-Policy: ${PERMISSIONS_POLICY:--}"
echo "Cache-Control: ${CACHE_CONTROL:--}"
echo "Server: ${SERVER_HEADER:--}"

# ---------- 4. Basic checks & recommendations ----------
echo
echo "### 4. Checks & recommendations"

# Redirect recommendations
HTTP_FIRST_STATUS=$(echo "$HTTP_CHAIN" | grep -E '^HTTP/' | head -n1 | awk '{print $2}')
HTTPS_FIRST_STATUS=$(echo "$HTTPS_CHAIN" | grep -E '^HTTP/' | head -n1 | awk '{print $2}')

if [[ "$HTTP_FIRST_STATUS" =~ ^3[0-9]{2}$ ]]; then
  HTTP_LOC=$(echo "$HTTP_CHAIN" | grep -i '^location:' | head -n1 | awk '{print $2}')
  echo "- HTTP redirects to: ${HTTP_LOC:-(unknown)}"
  if [[ "$HTTP_LOC" == https://* ]]; then
    echo "  ✅ HTTP → HTTPS redirect is present."
  else
    echo "  ⚠️ HTTP does not redirect to HTTPS. Recommend adding a permanent (301) redirect from HTTP to HTTPS."
  fi
else
  echo "  ⚠️ No HTTP redirect detected. Ensure http:// redirects to https:// with 301."
fi

# Redirect chain length
REDIRECT_COUNT=$(echo "$HTTPS_CHAIN" | grep -cE '^HTTP/' || echo 0)
if [[ "$REDIRECT_COUNT" -gt 3 ]]; then
  echo "  ⚠️ Long redirect chain (${REDIRECT_COUNT} hops). Aim for ≤ 2–3 redirects to avoid latency and SEO issues."
else
  echo "  ✅ Redirect chain length looks reasonable (${REDIRECT_COUNT} hops)."
fi

# HTTPS status
if [[ "$FINAL_STATUS" == "200" ]]; then
  echo "  ✅ Final HTTPS response is 200 OK."
elif [[ "$FINAL_STATUS" =~ ^3[0-9]{2}$ ]]; then
  echo "  ⚠️ Final HTTPS response is still a redirect (${FINAL_STATUS}). Check for redirect loops or unnecessary hops."
else
  echo "  ⚠️ Final HTTPS status is ${FINAL_STATUS}. Investigate errors (4xx/5xx)."
fi

# TLS version recommendation
if echo "$TLS_INFO" | grep -qi 'TLSv1\.3'; then
  echo "  ✅ TLS 1.3 is in use (good)."
elif echo "$TLS_INFO" | grep -qi 'TLSv1\.2'; then
  echo "  ⚠️ TLS 1.2 is in use. Consider enabling TLS 1.3 if your server supports it."
else
  echo "  ⚠️ TLS version unclear or outdated. Ensure only TLS 1.2 and 1.3 are enabled; disable SSLv3, TLS 1.0, 1.1."
fi

# HSTS
if [[ -n "$STRICT_TRANSPORT" ]]; then
  echo "  ✅ HSTS header present."
  if echo "$STRICT_TRANSPORT" | grep -qi 'includeSubDomains'; then
    echo "    ✅ includeSubDomains is enabled (good for full-domain coverage)."
  else
    echo "    ⚠️ Consider adding 'includeSubDomains' to HSTS if all subdomains support HTTPS."
  fi
  if echo "$STRICT_TRANSPORT" | grep -qi 'preload'; then
    echo "    ✅ preload directive present (can be submitted to browser preload lists)."
  fi
else
  echo "  ⚠️ No HSTS (Strict-Transport-Security) header. Recommend enabling HSTS once all endpoints work over HTTPS."
fi

# Other security headers
if [[ -n "$X_CONTENT_TYPE" ]]; then
  echo "  ✅ X-Content-Type-Options present."
else
  echo "  ⚠️ Consider adding 'X-Content-Type-Options: nosniff'."
fi

if [[ -n "$X_FRAME" ]]; then
  echo "  ✅ X-Frame-Options present."
else
  echo "  ⚠️ Consider adding X-Frame-Options (e.g., DENY or SAMEORIGIN) if clickjacking is a concern."
fi

if [[ -n "$CONTENT_SECURITY" ]]; then
  echo "  ✅ Content-Security-Policy present."
else
  echo "  ⚠️ Consider adding a Content-Security-Policy header to control resource loading."
fi

if [[ -n "$REFERRER_POLICY" ]]; then
  echo "  ✅ Referrer-Policy present."
else
  echo "  ⚠️ Consider adding a Referrer-Policy (e.g., strict-origin-when-cross-origin)."
fi

# Server header
if [[ -n "$SERVER_HEADER" ]]; then
  echo "  ⚠️ Server header reveals software/version. Consider hiding or genericizing it if not needed."
fi

echo
echo "Done."
```

## Highlighted code snippets

```bash
radoslav@zebra:~$ curl -sIL --max-redirs 8 http://example.top 2>/dev/null || true
```

```-sIL``` tells curl, "show me in silent mode the headers for each step in the redirect chain"

```--max-redirs 8``` says, “follow at most 8 redirects”, so it prevents infinite loops from hanging the script.

```2>/dev/null || true``` says, "redirect stderr to /dev/null, but don't fail if it fails". Logical || (OR) clarifies, 
"run the right side only if the left side fails (exits with a non‑zero status)". True is a command that always succeeds.

```bash
echo "$(curl -sIL https://example.com)" | grep -E '^(HTTP|<|>|[0-9]{3}\|)' || echo "(no output or failed)"
```
The regular expression pattern ```^(HTTP|<|>|[0-9]{3}\|)``` inside **grep** filter tells Bash to output the 
lines that match HTTP or three-digit numbers.

### Post Script:
By using a strict CSP (Content Security Policy), we instruct the server, "Allow styles and scripts from my own site 
(including inline ones), but block everything else from external sources unless explicitly allowed."

The security is always trade-off. Of course, the ```"value": unsafe-inline``` does weaken CSP's protection 
against XSS (cross-site scripting) attacks, but for a static Astro site where we control all the code and 
there's no user-generated content being injected, the risk is minimal. If we want to be more secure, 
we can use the hash that the browser is suggesting in the error message, but that becomes complex to manage.
The hash guarantees that the specific inline script hasn't been altered.
When we use a hash like ```'sha256-vB7A7ffHlQ58GZTJyS2cgCnlN7E/X5ml6To='```, the browser calculates the SHA-256 
hash of the actual inline script in our HTML and compares it to the hash in your CSP header. The browser
only executes the script if the hashes match. If someone modifies the inline script even slightly 
(even one character), the hash will change and the script won't execute — it will be blocked by the CSP policy.

```json
{
  "key": "Content-Security-Policy", 
  "value": "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'sha256-vB7A7ffHlQ58GZTJyS2cgCnlN7E/X5ml6To='; img-src 'self'"
}
```

Visit also my personal page, [Radoslav](https://radoslav.xyz/)
