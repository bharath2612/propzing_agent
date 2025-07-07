/*!
 * Propzing Chatbot Embed v1.1.1 (SECURE)
 * https://agent.propzing.com/{org_code}
 */
(function () {
  // Prevent duplicate script execution
  if (window.propzingChatbotLoaded) {
    return;
  }
  window.propzingChatbotLoaded = true;

  // Locate the script tag by ID
  const scriptTag = document.getElementById("propzing-chatbot");
  const orgCode = scriptTag?.getAttribute("data-org-code");

  if (!orgCode) {
    console.error("Propzing Chatbot: Missing data-org-code attribute.");
    return;
  }

  // Preload notification sound (host this on a trusted CDN in production)
  const notificationSound = new Audio("/icons/new-notification-017-352293.mp3");
  notificationSound.preload = "auto";
  notificationSound.volume = 0.3;

  // === Create Toggle Button ===
  const button = document.createElement("div");
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.borderRadius = "50%";
  button.style.background = "#007bff";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.cursor = "pointer";
  button.style.zIndex = "10002";
  button.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  button.style.transition = "all 0.3s ease";

  const icon = document.createElement("span");
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square-icon lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>`;
  icon.style.fontSize = "24px";
  icon.style.display = "flex";
  icon.style.alignItems = "center";
  icon.style.justifyContent = "center";
  icon.style.pointerEvents = "none";
  icon.style.userSelect = "none";
  icon.style.color = "#ffffff";
  icon.style.webkitUserSelect = "none";
  button.appendChild(icon);
  document.body.appendChild(button);

  // === Create iframe with retry logic and secure attributes ===
  let iframe = null;
  let retryCount = 0;
  const maxRetries = 3;

  function createIframe() {
    iframe = document.createElement("iframe");
    iframe.src = `https://agent.propzing.com/${orgCode}`;
    iframe.style.position = "fixed";
    iframe.style.bottom = "75px";
    iframe.style.right = "20px";
    iframe.style.width = "340px";
    iframe.style.height = "calc(100vh - 10px)";
    iframe.style.maxHeight = "650px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "0";
    iframe.style.backgroundColor = "transparent";
    iframe.style.zIndex = "10001";
    iframe.style.boxShadow = "none";
    iframe.style.visibility = "hidden";
    iframe.style.opacity = "0";
    iframe.style.transition = "opacity 0.3s ease";
    iframe.setAttribute("allow", "microphone; camera; geolocation");
    iframe.setAttribute("allowfullscreen", "false");
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups allow-modals");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    iframe.setAttribute("data-loaded", "false");
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    document.body.appendChild(iframe);

    // Add load timeout
    const loadTimeout = setTimeout(() => {
      if (iframe && iframe.getAttribute("data-loaded") === "false") {
        console.warn("Propzing Chatbot: iframe load timeout");
        handleIframeError();
      }
    }, 10000); // 10 second timeout

    iframe.addEventListener("load", () => {
      clearTimeout(loadTimeout);
      iframe.setAttribute("data-loaded", "true");
      console.log("Propzing Chatbot: iframe loaded successfully");
      // Play notification sound when iframe loads
      notificationSound.play().catch(e => console.log('Audio play failed:', e));
    });

    iframe.addEventListener("error", handleIframeError);
  }

  function handleIframeError() {
    console.error("Propzing Chatbot: Failed to load iframe");
    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Propzing Chatbot: Retrying iframe load (${retryCount}/${maxRetries})`);
      setTimeout(() => {
        if (iframe) {
          iframe.remove();
        }
        createIframe();
      }, 2000 * retryCount); // Exponential backoff
    } else {
      console.error("Propzing Chatbot: Max retries reached, chatbot unavailable");
      button.style.display = "none";
    }
  }

  // Initialize iframe
  createIframe();

  function isIframeVisible() {
    return iframe && iframe.style.visibility === "visible" && iframe.style.opacity === "1";
  }

  function showChat() {
    if (!iframe || iframe.getAttribute("data-loaded") !== "true") {
      console.warn("Propzing Chatbot: iframe not ready");
      return;
    }
    iframe.style.display = "block";
    iframe.style.visibility = "visible";
    iframe.style.opacity = "1";
    iframe.style.pointerEvents = "auto";
    icon.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>`;
    icon.style.color = "#ffffff";
    icon.style.fontWeight = "bold";
    // Play notification sound
    notificationSound.currentTime = 0;
    notificationSound.play().catch(e => console.log('Audio play failed:', e));
    setTimeout(() => iframe.focus(), 100);
  }

  function hideChat() {
    if (!iframe) return;
    iframe.style.opacity = "0";
    iframe.style.visibility = "hidden";
    iframe.style.pointerEvents = "none";
    icon.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-bot-message-square-icon lucide-bot-message-square\"><path d=\"M12 6V2H8\"/><path d=\"m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z\"/><path d=\"M2 12h2\"/><path d=\"M9 11v2\"/><path d=\"M15 11v2\"/><path d=\"M20 12h2\"/></svg>`;
    icon.style.color = "#ffffff";
    icon.style.fontWeight = "normal";
  }

  button.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    isIframeVisible() ? hideChat() : showChat();
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (iframe) {
      iframe.remove();
    }
    window.propzingChatbotLoaded = false;
  });
})();
  