# Smart Fraction Visual Tool - Math Year 3

Independent Math Year 3 edition based on the existing SJKC Year 3 Mathematics Jilid 1 tool.

- Fixed curriculum level: Math Year 3
- Modes: part of a group, pizza fractions, equivalent fractions, improper and mixed numbers, and hundred grid
- Languages: Bahasa Melayu, Chinese, and English
- Input: mouse, touch, and keyboard friendly
- Teacher controls: custom values within the existing activity limits

This edition intentionally remains Year 3 only. Shared interface and interaction changes should
be made in the source project and exported again so the deployed edition stays consistent.

## EdCloud authentication

The learning interface starts only after the EdCloud Tool protocol v1 handshake succeeds.
`auth-bootstrap.js` accepts the trusted EdCloud web launchers and the opaque parent used by the
native StudentApp wrapper, validates the short-lived Tools token through the same-origin
`/api/auth/me` endpoint, and then loads `app.js`.

The token remains in memory only. Do not add it to URLs, browser storage, logs, analytics, or
error messages. Any future protected request should use `createToolsAuthorizationHeader()` from
`edcloud-tool-auth.js` and a server endpoint protected by the EdCloud Tools authorization policy.

Direct navigation is intentionally denied. Local browser testing requires an EdCloud-compatible
launcher on the same `localhost` origin and a reverse proxy for `/api/auth/me`; serving these
static files by themselves is not enough to complete authentication.
