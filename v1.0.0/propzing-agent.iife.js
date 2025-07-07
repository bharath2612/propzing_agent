/*!
 * Propzing Chatbot Embed v1.1.0
 * https://agent.propzing.com/{chatbot_id}
 */
;(function() {
    // 1) locate our <script> tag
    var scripts = document.getElementsByTagName('script');
    var me = scripts[scripts.length - 1];
  
    // 2) read chatbot ID
    var botId = me.getAttribute('data-pz-chatbot-id');
    if (!botId) {
      console.error('Propzing Chatbot: missing data-pz-chatbot-id');
      return;
    }
  
    // 3) inject CSS
    var cssHref = me.getAttribute('data-pz-css') ||
      'https://cdn.jsdelivr.net/gh/<your-org>/propzing-chatbot-assets@v1.1.0/v1.1.0/propzing-chatbot.css';
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref;
    document.head.appendChild(link);
  
    // 4) create chatbot container (hidden by default)
    var container = document.createElement('div');
    container.id = 'propzing-chatbot-container';
    container.style.position = 'fixed';
    container.style.bottom = '80px';
    container.style.right = '24px';
    container.style.width = '360px';
    container.style.height = '600px';
    container.style.maxWidth = '90vw';
    container.style.maxHeight = '80vh';
    container.style.borderRadius = '16px';
    container.style.overflow = 'hidden';
    container.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
    container.style.background = 'white';
    container.style.display = 'none';
    container.style.zIndex = 99999;
    document.body.appendChild(container);
  
    // 5) insert iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'https://agent.propzing.com/' + encodeURIComponent(botId);
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'microphone; camera';
    container.appendChild(iframe);
  
    // 6) create toggle button
    var btn = document.createElement('div');
    btn.id = 'propzing-chatbot-toggle';
    btn.style.position = 'fixed';
    btn.style.bottom = '24px';
    btn.style.right = '24px';
    btn.style.width = '56px';
    btn.style.height = '56px';
    btn.style.borderRadius = '50%';
    btn.style.backgroundColor = '#8c2d0c'; // fallback background
    btn.style.backgroundImage = me.getAttribute('data-pz-icon-url')
      ? 'url(' + me.getAttribute('data-pz-icon-url') + ')'
      : 'url("https://cdn.jsdelivr.net/gh/<your-org>/propzing-chatbot-assets@v1.1.0/v1.1.0/chat-icon.svg")';
    btn.style.backgroundSize = '60%';
    btn.style.backgroundPosition = 'center';
    btn.style.backgroundRepeat = 'no-repeat';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    btn.style.zIndex = 99999;
    document.body.appendChild(btn);
  
    // 7) toggle behavior
    btn.addEventListener('click', function() {
      if (container.style.display === 'none') {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    });
  })();
  