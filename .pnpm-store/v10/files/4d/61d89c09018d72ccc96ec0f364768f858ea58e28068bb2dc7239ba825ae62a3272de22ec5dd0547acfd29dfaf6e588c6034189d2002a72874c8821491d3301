/**
 * Scrollable element detection utilities
 * Detects elements with overflow scrolling for enhanced accessibility tree
 */
import type { Page, Frame } from 'playwright-core';
import type { CDPSession } from '../../cdp';
/**
 * Browser-side functions to detect scrollable elements
 * These will be injected into the page context
 */
export declare const scrollableDetectionScript = "\n/**\n * Tests if an element can actually scroll\n * by attempting a scroll and checking if scrollTop changes\n */\nfunction canElementScroll(elem) {\n  if (typeof elem.scrollTo !== 'function') {\n    return false;\n  }\n\n  try {\n    const originalTop = elem.scrollTop;\n\n    // Try to scroll\n    elem.scrollTo({\n      top: originalTop + 100,\n      left: 0,\n      behavior: 'instant',\n    });\n\n    // If scrollTop never changed, it's not scrollable\n    if (elem.scrollTop === originalTop) {\n      return false;\n    }\n\n    // Scroll back to original position\n    elem.scrollTo({\n      top: originalTop,\n      left: 0,\n      behavior: 'instant',\n    });\n\n    return true;\n  } catch (error) {\n    return false;\n  }\n}\n\n/**\n * Finds and returns a list of scrollable elements on the page,\n * ordered from the element with the largest scrollHeight to the smallest.\n *\n * @param topN Optional maximum number of scrollable elements to return\n * @returns Array of scrollable HTMLElements sorted by descending scrollHeight\n */\nfunction getScrollableElements(topN) {\n  // Get the root <html> element\n  const docEl = document.documentElement;\n\n  // Initialize array to hold all scrollable elements\n  // Always include the root <html> element as a fallback\n  const scrollableElements = [docEl];\n\n  // Scan all elements to find potential scrollable containers\n  const allElements = document.querySelectorAll('*');\n  for (const elem of allElements) {\n    const style = window.getComputedStyle(elem);\n    const overflowY = style.overflowY;\n\n    const isPotentiallyScrollable =\n      overflowY === 'auto' ||\n      overflowY === 'scroll' ||\n      overflowY === 'overlay';\n\n    if (isPotentiallyScrollable) {\n      const candidateScrollDiff = elem.scrollHeight - elem.clientHeight;\n      // Only consider if it has extra scrollable content and can truly scroll\n      if (candidateScrollDiff > 0 && canElementScroll(elem)) {\n        scrollableElements.push(elem);\n      }\n    }\n  }\n\n  // Sort scrollable elements from largest scrollHeight to smallest\n  scrollableElements.sort((a, b) => b.scrollHeight - a.scrollHeight);\n\n  // If a topN limit is specified, return only the first topN elements\n  if (topN !== undefined) {\n    return scrollableElements.slice(0, topN);\n  }\n\n  // Return all found scrollable elements\n  return scrollableElements;\n}\n\n/**\n * Generate XPath for an element\n */\nfunction generateXPathForElement(element) {\n  if (element.id && element.id.toString().trim() !== '') {\n    return `//${element.tagName.toLowerCase()}[@id=\"${element.id}\"]`;\n  }\n\n  const segments = [];\n  let currentElement = element;\n\n  while (currentElement && currentElement.nodeType === Node.ELEMENT_NODE) {\n    let index = 0;\n    let hasSiblings = false;\n    let sibling = currentElement.previousSibling;\n\n    while (sibling) {\n      if (\n        sibling.nodeType === Node.ELEMENT_NODE &&\n        sibling.nodeName === currentElement.nodeName\n      ) {\n        index++;\n        hasSiblings = true;\n      }\n      sibling = sibling.previousSibling;\n    }\n\n    if (!hasSiblings) {\n      sibling = currentElement.nextSibling;\n      while (sibling) {\n        if (\n          sibling.nodeType === Node.ELEMENT_NODE &&\n          sibling.nodeName === currentElement.nodeName\n        ) {\n          hasSiblings = true;\n          break;\n        }\n        sibling = sibling.nextSibling;\n      }\n    }\n\n    const tagName = currentElement.nodeName.toLowerCase();\n    const xpathIndex = hasSiblings ? `[${index + 1}]` : '';\n    segments.unshift(`${tagName}${xpathIndex}`);\n\n    currentElement = currentElement.parentElement;\n  }\n\n  return '/' + segments.join('/');\n}\n\n/**\n * Get XPaths for all scrollable elements\n */\nfunction getScrollableElementXpaths(topN) {\n  const scrollableElems = getScrollableElements(topN);\n  const xpaths = [];\n  for (const elem of scrollableElems) {\n    const xpath = generateXPathForElement(elem);\n    xpaths.push(xpath);\n  }\n  return xpaths;\n}\n\n// Expose to window for CDP evaluation\nwindow.__hyperagent_getScrollableElementXpaths = getScrollableElementXpaths;\n";
/**
 * Inject scrollable detection functions into the page context
 */
export declare function injectScrollableDetection(page: Page): Promise<void>;
/**
 * Get XPaths of scrollable elements from the page or frame
 */
export declare function getScrollableElementXpaths(pageOrFrame: Page | Frame, topN?: number): Promise<string[]>;
/**
 * Find backend node IDs for scrollable elements
 * This is called during accessibility tree extraction to mark scrollable elements
 */
export declare function findScrollableElementIds(pageOrFrame: Page | Frame, client: CDPSession): Promise<Set<number>>;
/**
 * Decorate a role string with "scrollable" prefix if the element is scrollable
 */
export declare function decorateRoleIfScrollable(role: string, backendNodeId: number | undefined, scrollableIds: Set<number>): string;
