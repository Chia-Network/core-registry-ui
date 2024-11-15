/**
 * gets the origin of an iframe
 * @param iframe current iframe reference (NOT Nil)
 */
export const getIframeOrigin = (iframe) => {
  try {
    const url = new URL(iframe.src);
    return url.origin;
  } catch (error) {
    console.error('Invalid iframe URL', error);
    return null;
  }
};

/**
 * sends message to child app
 * @param iframe current iframe reference (NOT Nil)
 * @param message content to send to iframe
 */
export const sendMessageToIframe = (iframe, message) => {
  const targetOrigin = getIframeOrigin(iframe);
  if (targetOrigin && iframe.contentWindow) {
    iframe.contentWindow.postMessage(message, targetOrigin);
  } else {
    console.error('Failed to determine target origin or iframe is not available');
  }
};
