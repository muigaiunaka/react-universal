## Helmet
```
yarn add helmet
```
Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

Helmet is actually just a collection of nine smaller middleware functions that set security-related HTTP headers:

- csp sets the Content-Security-Policy header to help prevent cross-site scripting attacks and other cross-site injections.
- hidePoweredBy removes the X-Powered-By header.
- hpkp Adds Public Key Pinning headers to prevent man-in-the-middle attacks with forged certificates.
- hsts sets Strict-Transport-Security header that enforces secure (HTTP over SSL/TLS) connections to the server.
- ieNoOpen sets X-Download-Options for IE8+.
- noCache sets Cache-Control and Pragma headers to disable client-side caching.
- noSniff sets X-Content-Type-Options to prevent browsers from MIME-sniffing a response away from the declared content-type.
- frameguard sets the X-Frame-Options header to provide clickjacking protection.
- xssFilter sets X-XSS-Protection to enable the Cross-site scripting (XSS) filter in most recent web browsers.

If you don’t want to use Helmet, then at least disable the X-Powered-By header. Attackers can use this header (which is enabled by default) to detect apps running Express and then launch specifically-targeted attacks.