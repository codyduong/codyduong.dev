const utils = {
  focusFirstDescendant: function (element: Element): boolean {
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i] as Element;
      if (utils.attemptFocus(child) || utils.focusFirstDescendant(child)) {
        return true;
      }
    }
    return false;
  },
  focusLastDescendant: function (element: Element) {
    for (let i = element.childNodes.length - 1; i >= 0; i--) {
      const child = element.childNodes[i] as Element;
      if (utils.attemptFocus(child) || utils.focusLastDescendant(child)) {
        return true;
      }
    }
    return false;
  },
  attemptFocus: function (element: Element): boolean {
    if (!utils.isFocusable(element)) {
      return false;
    }

    try {
      // @ts-expect-error: caught in next block
      element.focus();
    } catch (e) {
      // continue regardless of error
    }
    return document.activeElement === element;
  },
  isFocusable: function (element: any): boolean {
    if (element.tabIndex < 0) {
      return false;
    }

    if (element.disabled) {
      return false;
    }

    switch (element.nodeName) {
      /**
       * Per usual, varies dependent on browser implementation:
       * https://stackoverflow.com/a/1600194/17954209
       * https://www.w3.org/TR/DOM-Level-2-HTML/html.html
       *
       * Following W3 ARIA's discretion utilized here: https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog
       */
      case 'A':
        return !!element.href && element.rel != 'ignore';
      case 'INPUT':
        return element.type != 'hidden';
      case 'BUTTON':
      case 'SELECT':
      case 'TEXTAREA':
        return true;
      default:
        return false;
    }
  },
};

export default utils;
