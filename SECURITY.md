# 🔒 Security Policy — GRANTLY

Security and student data privacy are fundamental tenets of the **GRANTLY** educational assistance platform.

---

## 🛡️ Student Data Privacy & FERPA Alignment

The Family Educational Rights and Privacy Act (FERPA) governs access to educational records. GRANTLY adheres to the following privacy-by-design standards:

1. **Client-Side Data Storage**: All student profile data, household income figures, GPAs, application notes, and essay drafts are retained exclusively within the student's local browser environment via `localStorage` (encapsulated by `safeStorage`).
2. **Zero Third-Party Telemetry**: GRANTLY does not integrate third-party ad trackers, invasive analytics SDKs, or commercial tracking beacons.
3. **No Unsolicited Data Transmission**: Student essay drafts and document metadata are never transmitted to unauthorized external cloud servers.

---

## 🔐 Web Application Security Controls

| Threat Vector | Mitigation Strategy Implemented in GRANTLY |
| :--- | :--- |
| **Cross-Site Scripting (XSS)** | All dynamic inputs and user-generated text pass through strict HTML entity encoding (`sanitizeText()` in `src/utils/security.ts`). React's virtual DOM prevents raw injection. |
| **Malicious URL Protocols** | External links to scholarship application portals pass through `safeUrl()`, whitelisting only secure `https://` and `mailto:` protocols while rejecting `javascript:`, `data:`, or `vbscript:` vectors. |
| **Content Security Policy (CSP)** | Enforced via `<meta http-equiv="Content-Security-Policy">` restricting external script, style, font, and object execution domains. |
| **MIME Sniffing Prevention** | Enforced via `<meta http-equiv="X-Content-Type-Options" content="nosniff">`. |
| **Referrer Privacy** | Enforced via `<meta name="referrer" content="strict-origin-when-cross-origin">` and `rel="noopener noreferrer"` on all external links. |
| **Denial of Service via Storage Quota** | `safeStorage` catches `QuotaExceededError` and seamlessly pivots to an in-memory session dictionary. |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability or potential threat in GRANTLY, please report it privately:

- **Email**: `security@grantly.app` (or submit a confidential issue on GitHub marked `[SECURITY]`).
- **Response SLA**: We acknowledge all vulnerability reports within 24 hours and issue remediation patches within 72 hours.
- Please do not file public issues for active security vulnerabilities until a patched version has been released.
