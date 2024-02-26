import { skipWaiting } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
  (url) => {
    return url.origin === "https://api.yourbasket.co.ke/";
  },
  new NetworkFirst({
    cacheName: "yourbasket-api"
    // plugins: [
    //   new workbox.expiration.Plugin({
    //     maxAgeSeconds: 10 * 60, // 10 minutes
    //   }),
    // ],
  })
);

addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    skipWaiting();
  }
});
