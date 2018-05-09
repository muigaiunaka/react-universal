Workbox is a collection of libraries and build tools that make it easy to store your website’s files locally, on your users’ devices. Consider Workbox if you want to:

Make your site work offline.
Improve load performance on repeat-visits. Even if you don’t want to go fully-offline, you can use Workbox to store and serve common files locally, rather than from the network.
We use workbox webpack plugin (we already installed it and added it to webpack/plugins.js). Now we need to install workbox-sw — a service worker library to make managing fetch requests and caching as easy as possible. It provides a high-level wrapper on top of a number of individual modules, giving you a consistent, powerful interface.

```
npm i -D workbox-sw
```

To work with workbox-sw we already added another plugin — copy-webpack-plugin. It should copy workbox-sw module to dist/workbox-sw.prod.js where we have our files after building.