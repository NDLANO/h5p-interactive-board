import { jQuery as $ } from './globals.js';

/**
 * Flattens a nested array
 *
 * Example:
 * [['a'], ['b']].flatten() -> ['a', 'b']
 * @param {Array} arr A nested array
 * @returns {Array} A flattened array
 */
export const flattenArray = (arr) => arr.concat.apply([], arr);

/**
 * Returns true if the argument is a function
 * @param {Function|*} f
 */
export const isFunction = (f) => typeof f === 'function';

/**
 * Makes a string kebab case
 * @param {string} str
 * @returns {string}
 */
export const kebabCase = (str) => str.replace(/[\W]/g, '-');

/**
 * Is true if the users device is an ipad
 * @constant {boolean}
 */
export const isIPad = navigator.userAgent.match(/iPad/i) !== null;

/**
 * Is true if the users device is an iOS device
 * @constant {boolean}
 */
export const isIOS = navigator.userAgent.match(/iPad|iPod|iPhone/i) !== null;

/**
 * Returns true if the array contains the value
 * @template T
 * @param {Array.<T>} arr
 * @param {T} val
 * @returns {boolean}
 */
export const contains = (arr, val) => arr.indexOf(val) !== -1;

/**
 * Returns a default value if provided value is undefined
 * @template T
 * @param {T} value
 * @param {T} fallback
 * @returns {T}
 */
export const defaultValue = (value, fallback) =>
  value !== undefined ? value : fallback;

/**
 * Enum for keyboard key codes
 * @readonly
 * @enum {number}
 */
export const keyCode = {
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
};

/**
 * Make a non-button element behave as a button. I.e handle enter and space
 * keydowns as click
 * @param  {H5P.jQuery} $element The "button" element
 * @param  {(event: MouseEvent | TouchEvent) => void} callback
 * @param  {*} [scope]
 */
export const addClickAndKeyboardListeners = function (
  $element,
  callback,
  scope,
) {
  $element.click(function (event) {
    callback.call(scope || this, event);
  });

  $element.keydown(function (event) {
    if (contains([keyCode.ENTER, keyCode.SPACE], event.which)) {
      event.preventDefault();
      callback.call(scope || this, event);
    }
  });
};

/**
 * @constant {H5P.jQuery}
 */
const $STRIP_HTML_HELPER = $('<div>');

/**
 * Strips the html from a string, using jquery
 * @param {string} str
 * @returns {string}
 */
export const stripHTML = (str) => $STRIP_HTML_HELPER.html(str).text().trim();

/**
 * Returns the ID of the current course presentation.
 * @returns {number | null}
 */
export const getContentId = () => {
  const h5pContentWrapper = document.querySelector('.h5p-content');

  if (!h5pContentWrapper) {
    return null;
  }

  const { contentId } = h5pContentWrapper.dataset;
  const hasContentId = contentId != null;
  if (!hasContentId) {
    return null;
  }

  return Number.parseInt(contentId);
};
