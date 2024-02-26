import { Workbox } from "workbox-window";

const swDest = "sw.js";
const swDefault = {
  sw: { swDest } || swDest
};

const devMode = process.env.NODE_ENV !== "production";

export async function serviceWorker ({ sw } = swDefault) {
  const scriptURL = typeof sw === "object" ? sw.swDest : sw;

  // Install our service worker.
  // Prevent "Caching with Service-Workers triggers infinite reload with webpack"
  if ("serviceWorker" in navigator && !devMode) {
    const wb = new Workbox(`/${scriptURL}`);

    // Unregister any other service workers that might be present.
    // Specifically, those with a different script URL.
    await navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        const [, registeredScriptURL] = registration.active.scriptURL.split(
          registration.scope
        );
        if (registration.active && registeredScriptURL !== scriptURL) {
          registration.unregister();

          const origin = new URL(registration.scope).origin;
          const cacheName = `workbox-precache-v2-${origin}`;
          caches.open(cacheName).then((cache) => {
            return cache.keys().then((keys) => {
              for (const key of keys) {
                cache.delete(key);
              }
            });
          });
        }
      });
    });

    const promptForUpdate = async () => {
      let updateAccepted = false;

      const updateButton = document.querySelector("#app-update");
      updateButton.classList.add("show");
      updateButton.addEventListener("click", () => {
        updateAccepted = true;
      });

      return updateAccepted;
    };

    const showSkipWaitingPrompt = async (event) => {
      // Assuming the user accepted the update, set up a listener
      // that will reload the page as soon as the previously waiting
      // service worker has taken control.
      wb.addEventListener("controlling", (event) => {
        location.reload();
      });

      // Send a message telling the service worker to skip waiting.
      // This will trigger the `controlling` event handler above.
      const updateAccepted = await promptForUpdate();
      if (updateAccepted) {
        await wb.messageSW({ type: "SKIP_WAITING" });
      }
    };

    addEventListener("load", () => {
      // Notify the user when a service worker update is available
      wb.addEventListener("waiting", (event) => {
        // Add an event listener to detect when the registered
        // service worker has installed but is waiting to activate.
        showSkipWaitingPrompt(event);
      });
      // .then((registration) => {
      //   // console.log("SW registered: ", registration);
      // })
      // .catch((registrationError) => {
      //   // console.log("SW registration failed: ", registrationError);
      // });
    });

    return wb.register();
  }
}
