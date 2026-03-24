(function webpackUniversalModuleDefinition(root, factory) {

      if(typeof exports === 'object' && typeof module === 'object') {
          module.exports = factory();
      }else if(typeof define === 'function' && define.amd) {
          
          define([], factory);

          } else if(typeof exports === 'object'){

          
      exports["Apify"] = factory();

      } else {

          
      root["Apify"] = factory();
      }

      })(globalThis, () => {
          return (() => {
var __webpack_modules__ = ({
313(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
/* provided dependency */ var process = __webpack_require__(5606);


const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

/* eslint-disable no-control-regex */
// this is a modified version of https://github.com/chalk/ansi-regex (MIT License)
const ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;

const hasColor = () => {
  if (typeof process !== 'undefined') {
    return process.env.FORCE_COLOR !== '0';
  }
  return false;
};

const create = () => {
  const colors = {
    enabled: hasColor(),
    visible: true,
    styles: {},
    keys: {}
  };

  const ansi = style => {
    let open = style.open = `\u001b[${style.codes[0]}m`;
    let close = style.close = `\u001b[${style.codes[1]}m`;
    let regex = style.regex = new RegExp(`\\u001b\\[${style.codes[1]}m`, 'g');
    style.wrap = (input, newline) => {
      if (input.includes(close)) input = input.replace(regex, close + open);
      let output = open + input + close;
      // see https://github.com/chalk/chalk/pull/92, thanks to the
      // chalk contributors for this fix. However, we've confirmed that
      // this issue is also present in Windows terminals
      return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
    };
    return style;
  };

  const wrap = (style, input, newline) => {
    return typeof style === 'function' ? style(input) : style.wrap(input, newline);
  };

  const style = (input, stack) => {
    if (input === '' || input == null) return '';
    if (colors.enabled === false) return input;
    if (colors.visible === false) return '';
    let str = '' + input;
    let nl = str.includes('\n');
    let n = stack.length;
    if (n > 0 && stack.includes('unstyle')) {
      stack = [...new Set(['unstyle', ...stack])].reverse();
    }
    while (n-- > 0) str = wrap(colors.styles[stack[n]], str, nl);
    return str;
  };

  const define = (name, codes, type) => {
    colors.styles[name] = ansi({ name, codes });
    let keys = colors.keys[type] || (colors.keys[type] = []);
    keys.push(name);

    Reflect.defineProperty(colors, name, {
      configurable: true,
      enumerable: true,
      set(value) {
        colors.alias(name, value);
      },
      get() {
        let color = input => style(input, color.stack);
        Reflect.setPrototypeOf(color, colors);
        color.stack = this.stack ? this.stack.concat(name) : [name];
        return color;
      }
    });
  };

  define('reset', [0, 0], 'modifier');
  define('bold', [1, 22], 'modifier');
  define('dim', [2, 22], 'modifier');
  define('italic', [3, 23], 'modifier');
  define('underline', [4, 24], 'modifier');
  define('inverse', [7, 27], 'modifier');
  define('hidden', [8, 28], 'modifier');
  define('strikethrough', [9, 29], 'modifier');

  define('black', [30, 39], 'color');
  define('red', [31, 39], 'color');
  define('green', [32, 39], 'color');
  define('yellow', [33, 39], 'color');
  define('blue', [34, 39], 'color');
  define('magenta', [35, 39], 'color');
  define('cyan', [36, 39], 'color');
  define('white', [37, 39], 'color');
  define('gray', [90, 39], 'color');
  define('grey', [90, 39], 'color');

  define('bgBlack', [40, 49], 'bg');
  define('bgRed', [41, 49], 'bg');
  define('bgGreen', [42, 49], 'bg');
  define('bgYellow', [43, 49], 'bg');
  define('bgBlue', [44, 49], 'bg');
  define('bgMagenta', [45, 49], 'bg');
  define('bgCyan', [46, 49], 'bg');
  define('bgWhite', [47, 49], 'bg');

  define('blackBright', [90, 39], 'bright');
  define('redBright', [91, 39], 'bright');
  define('greenBright', [92, 39], 'bright');
  define('yellowBright', [93, 39], 'bright');
  define('blueBright', [94, 39], 'bright');
  define('magentaBright', [95, 39], 'bright');
  define('cyanBright', [96, 39], 'bright');
  define('whiteBright', [97, 39], 'bright');

  define('bgBlackBright', [100, 49], 'bgBright');
  define('bgRedBright', [101, 49], 'bgBright');
  define('bgGreenBright', [102, 49], 'bgBright');
  define('bgYellowBright', [103, 49], 'bgBright');
  define('bgBlueBright', [104, 49], 'bgBright');
  define('bgMagentaBright', [105, 49], 'bgBright');
  define('bgCyanBright', [106, 49], 'bgBright');
  define('bgWhiteBright', [107, 49], 'bgBright');

  colors.ansiRegex = ANSI_REGEX;
  colors.hasColor = colors.hasAnsi = str => {
    colors.ansiRegex.lastIndex = 0;
    return typeof str === 'string' && str !== '' && colors.ansiRegex.test(str);
  };

  colors.alias = (name, color) => {
    let fn = typeof color === 'string' ? colors[color] : color;

    if (typeof fn !== 'function') {
      throw new TypeError('Expected alias to be the name of an existing color (string) or a function');
    }

    if (!fn.stack) {
      Reflect.defineProperty(fn, 'name', { value: name });
      colors.styles[name] = fn;
      fn.stack = [name];
    }

    Reflect.defineProperty(colors, name, {
      configurable: true,
      enumerable: true,
      set(value) {
        colors.alias(name, value);
      },
      get() {
        let color = input => style(input, color.stack);
        Reflect.setPrototypeOf(color, colors);
        color.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
        return color;
      }
    });
  };

  colors.theme = custom => {
    if (!isObject(custom)) throw new TypeError('Expected theme to be an object');
    for (let name of Object.keys(custom)) {
      colors.alias(name, custom[name]);
    }
    return colors;
  };

  colors.alias('unstyle', str => {
    if (typeof str === 'string' && str !== '') {
      colors.ansiRegex.lastIndex = 0;
      return str.replace(colors.ansiRegex, '');
    }
    return '';
  });

  colors.alias('noop', str => str);
  colors.none = colors.clear = colors.noop;

  colors.stripColor = colors.unstyle;
  colors.symbols = __webpack_require__(9904);
  colors.define = define;
  return colors;
};

module.exports = create();
module.exports.create = create;


},
9904(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
/* provided dependency */ var process = __webpack_require__(5606);


const isHyper = typeof process !== 'undefined' && process.env.TERM_PROGRAM === 'Hyper';
const isWindows = typeof process !== 'undefined' && process.platform === 'win32';
const isLinux = typeof process !== 'undefined' && process.platform === 'linux';

const common = {
  ballotDisabled: '☒',
  ballotOff: '☐',
  ballotOn: '☑',
  bullet: '•',
  bulletWhite: '◦',
  fullBlock: '█',
  heart: '❤',
  identicalTo: '≡',
  line: '─',
  mark: '※',
  middot: '·',
  minus: '－',
  multiplication: '×',
  obelus: '÷',
  pencilDownRight: '✎',
  pencilRight: '✏',
  pencilUpRight: '✐',
  percent: '%',
  pilcrow2: '❡',
  pilcrow: '¶',
  plusMinus: '±',
  question: '?',
  section: '§',
  starsOff: '☆',
  starsOn: '★',
  upDownArrow: '↕'
};

const windows = Object.assign({}, common, {
  check: '√',
  cross: '×',
  ellipsisLarge: '...',
  ellipsis: '...',
  info: 'i',
  questionSmall: '?',
  pointer: '>',
  pointerSmall: '»',
  radioOff: '( )',
  radioOn: '(*)',
  warning: '‼'
});

const other = Object.assign({}, common, {
  ballotCross: '✘',
  check: '✔',
  cross: '✖',
  ellipsisLarge: '⋯',
  ellipsis: '…',
  info: 'ℹ',
  questionFull: '？',
  questionSmall: '﹖',
  pointer: isLinux ? '▸' : '❯',
  pointerSmall: isLinux ? '‣' : '›',
  radioOff: '◯',
  radioOn: '◉',
  warning: '⚠'
});

module.exports = (isWindows && !isHyper) ? windows : other;
Reflect.defineProperty(module.exports, 'common', { enumerable: false, value: common });
Reflect.defineProperty(module.exports, 'windows', { enumerable: false, value: windows });
Reflect.defineProperty(module.exports, 'other', { enumerable: false, value: other });


},
7336(module, __unused_rspack_exports, __webpack_require__) {
// Packages
var retrier = __webpack_require__(5617);

function retry(fn, opts) {
  function run(resolve, reject) {
    var options = opts || {};
    var op;

    // Default `randomize` to true
    if (!('randomize' in options)) {
      options.randomize = true;
    }

    op = retrier.operation(options);

    // We allow the user to abort retrying
    // this makes sense in the cases where
    // knowledge is obtained that retrying
    // would be futile (e.g.: auth errors)

    function bail(err) {
      reject(err || new Error('Aborted'));
    }

    function onError(err, num) {
      if (err.bail) {
        bail(err);
        return;
      }

      if (!op.retry(err)) {
        reject(op.mainError());
      } else if (options.onRetry) {
        options.onRetry(err, num);
      }
    }

    function runAttempt(num) {
      var val;

      try {
        val = fn(bail, num);
      } catch (err) {
        onError(err, num);
        return;
      }

      Promise.resolve(val)
        .then(resolve)
        .catch(function catchIt(err) {
          onError(err, num);
        });
    }

    op.attempt(runAttempt);
  }

  return new Promise(run);
}

module.exports = retry;


},
7526(__unused_rspack_module, exports) {
"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


},
8287(__unused_rspack_module, exports, __webpack_require__) {
"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(7526)
var ieee754 = __webpack_require__(251)
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()


},
3791(module) {
"use strict";


const callsites = () => {
	const _prepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;
	const stack = new Error().stack.slice(1);
	Error.prepareStackTrace = _prepareStackTrace;
	return stack;
};

module.exports = callsites;
// TODO: Remove this for the next major release
module.exports["default"] = callsites;


},
8597(__unused_rspack_module, exports) {
"use strict";
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */
var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g // eslint-disable-line no-control-regex
var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/ // eslint-disable-line no-control-regex
var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */
var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g // eslint-disable-line no-control-regex

/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */
var QUOTE_REGEXP = /([\\"])/g

/**
 * RegExp to match type in RFC 7231 sec 3.1.1.1
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */
var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * Module exports.
 * @public
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format (obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var type = obj.type

  if (!type || !TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  var string = type

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!TOKEN_REGEXP.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */

function parse (string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  // support req/res-like objects as argument
  var header = typeof string === 'object'
    ? getcontenttype(string)
    : string

  if (typeof header !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = header.indexOf(';')
  var type = index !== -1
    ? header.slice(0, index).trim()
    : header.trim()

  if (!TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid media type')
  }

  var obj = new ContentType(type.toLowerCase())

  // parse parameters
  if (index !== -1) {
    var key
    var match
    var value

    PARAM_REGEXP.lastIndex = index

    while ((match = PARAM_REGEXP.exec(header))) {
      if (match.index !== index) {
        throw new TypeError('invalid parameter format')
      }

      index += match[0].length
      key = match[1].toLowerCase()
      value = match[2]

      if (value.charCodeAt(0) === 0x22 /* " */) {
        // remove quotes
        value = value.slice(1, -1)

        // remove escapes
        if (value.indexOf('\\') !== -1) {
          value = value.replace(QESC_REGEXP, '$1')
        }
      }

      obj.parameters[key] = value
    }

    if (index !== header.length) {
      throw new TypeError('invalid parameter format')
    }
  }

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */

function getcontenttype (obj) {
  var header

  if (typeof obj.getHeader === 'function') {
    // res-like
    header = obj.getHeader('content-type')
  } else if (typeof obj.headers === 'object') {
    // req-like
    header = obj.headers && obj.headers['content-type']
  }

  if (typeof header !== 'string') {
    throw new TypeError('content-type header is missing from object')
  }

  return header
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function qstring (val) {
  var str = String(val)

  // no need to quote tokens
  if (TOKEN_REGEXP.test(str)) {
    return str
  }

  if (str.length > 0 && !TEXT_REGEXP.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(QUOTE_REGEXP, '\\$1') + '"'
}

/**
 * Class to represent a content type.
 * @private
 */
function ContentType (type) {
  this.parameters = Object.create(null)
  this.type = type
}


},
8486(module, __unused_rspack_exports, __webpack_require__) {
"use strict";

const isObj = __webpack_require__(8997);

const disallowedKeys = new Set([
	'__proto__',
	'prototype',
	'constructor'
]);

const isValidPath = pathSegments => !pathSegments.some(segment => disallowedKeys.has(segment));

function getPathSegments(path) {
	const pathArray = path.split('.');
	const parts = [];

	for (let i = 0; i < pathArray.length; i++) {
		let p = pathArray[i];

		while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.';
			p += pathArray[++i];
		}

		parts.push(p);
	}

	if (!isValidPath(parts)) {
		return [];
	}

	return parts;
}

module.exports = {
	get(object, path, value) {
		if (!isObj(object) || typeof path !== 'string') {
			return value === undefined ? object : value;
		}

		const pathArray = getPathSegments(path);
		if (pathArray.length === 0) {
			return;
		}

		for (let i = 0; i < pathArray.length; i++) {
			object = object[pathArray[i]];

			if (object === undefined || object === null) {
				// `object` is either `undefined` or `null` so we want to stop the loop, and
				// if this is not the last bit of the path, and
				// if it did't return `undefined`
				// it would return `null` if `object` is `null`
				// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
				if (i !== pathArray.length - 1) {
					return value;
				}

				break;
			}
		}

		return object === undefined ? value : object;
	},

	set(object, path, value) {
		if (!isObj(object) || typeof path !== 'string') {
			return object;
		}

		const root = object;
		const pathArray = getPathSegments(path);

		for (let i = 0; i < pathArray.length; i++) {
			const p = pathArray[i];

			if (!isObj(object[p])) {
				object[p] = {};
			}

			if (i === pathArray.length - 1) {
				object[p] = value;
			}

			object = object[p];
		}

		return root;
	},

	delete(object, path) {
		if (!isObj(object) || typeof path !== 'string') {
			return false;
		}

		const pathArray = getPathSegments(path);

		for (let i = 0; i < pathArray.length; i++) {
			const p = pathArray[i];

			if (i === pathArray.length - 1) {
				delete object[p];
				return true;
			}

			object = object[p];

			if (!isObj(object)) {
				return false;
			}
		}
	},

	has(object, path) {
		if (!isObj(object) || typeof path !== 'string') {
			return false;
		}

		const pathArray = getPathSegments(path);
		if (pathArray.length === 0) {
			return false;
		}

		// eslint-disable-next-line unicorn/no-for-loop
		for (let i = 0; i < pathArray.length; i++) {
			if (isObj(object)) {
				if (!(pathArray[i] in object)) {
					return false;
				}

				object = object[pathArray[i]];
			} else {
				return false;
			}
		}

		return true;
	}
};


},
7007(module) {
"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


},
251(__unused_rspack_module, exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


},
6698(module) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


},
8997(module) {
"use strict";


module.exports = value => {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
};


},
8142(module, exports, __webpack_require__) {
/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;


},
2202(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArgumentError = void 0;
const generate_stack_1 = __webpack_require__(5450);
const wrapStackTrace = (error, stack) => `${error.name}: ${error.message}\n${stack}`;
/**
@hidden
*/
class ArgumentError extends Error {
    constructor(message, context, errors = new Map()) {
        super(message);
        Object.defineProperty(this, "validationErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'ArgumentError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, context);
        }
        else {
            this.stack = wrapStackTrace(this, (0, generate_stack_1.generateStackTrace)());
        }
        this.validationErrors = errors;
    }
}
exports.ArgumentError = ArgumentError;


},
4980(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArgumentError = exports.Predicate = void 0;
const callsites_1 = __webpack_require__(3791);
const infer_label_1 = __webpack_require__(9843);
const predicate_1 = __webpack_require__(1830);
Object.defineProperty(exports, "Predicate", ({ enumerable: true, get: function () { return predicate_1.Predicate; } }));
const base_predicate_1 = __webpack_require__(7006);
const modifiers_1 = __webpack_require__(8422);
const predicates_1 = __webpack_require__(1384);
const test_1 = __webpack_require__(9514);
const ow = (value, labelOrPredicate, predicate) => {
    if (!(0, base_predicate_1.isPredicate)(labelOrPredicate) && typeof labelOrPredicate !== 'string') {
        throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof labelOrPredicate}\``);
    }
    if ((0, base_predicate_1.isPredicate)(labelOrPredicate)) {
        // If the second argument is a predicate, infer the label
        const stackFrames = (0, callsites_1.default)();
        (0, test_1.default)(value, () => (0, infer_label_1.inferLabel)(stackFrames), labelOrPredicate);
        return;
    }
    (0, test_1.default)(value, labelOrPredicate, predicate);
};
Object.defineProperties(ow, {
    isValid: {
        value: (value, predicate) => {
            try {
                (0, test_1.default)(value, '', predicate);
                return true;
            }
            catch {
                return false;
            }
        }
    },
    create: {
        value: (labelOrPredicate, predicate) => (value, label) => {
            if ((0, base_predicate_1.isPredicate)(labelOrPredicate)) {
                const stackFrames = (0, callsites_1.default)();
                (0, test_1.default)(value, label !== null && label !== void 0 ? label : (() => (0, infer_label_1.inferLabel)(stackFrames)), labelOrPredicate);
                return;
            }
            (0, test_1.default)(value, label !== null && label !== void 0 ? label : (labelOrPredicate), predicate);
        }
    }
});
// Can't use `export default predicates(modifiers(ow)) as Ow` because the variable needs a type annotation to avoid a compiler error when used:
// Assertions require every name in the call target to be declared with an explicit type annotation.ts(2775)
// See https://github.com/microsoft/TypeScript/issues/36931 for more details.
const _ow = (0, predicates_1.default)((0, modifiers_1.default)(ow));
exports["default"] = _ow;
__exportStar(__webpack_require__(1384), exports);
var argument_error_1 = __webpack_require__(2202);
Object.defineProperty(exports, "ArgumentError", ({ enumerable: true, get: function () { return argument_error_1.ArgumentError; } }));


},
8422(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const predicates_1 = __webpack_require__(1384);
exports["default"] = (object) => {
    Object.defineProperties(object, {
        optional: {
            get: () => (0, predicates_1.default)({}, { optional: true })
        }
    });
    return object;
};


},
6931(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.not = void 0;
const random_id_1 = __webpack_require__(4693);
const predicate_1 = __webpack_require__(1830);
/**
Operator which inverts the following validation.

@hidden

@param predictate - Predicate to wrap inside the operator.
*/
const not = (predicate) => {
    const originalAddValidator = predicate.addValidator;
    predicate.addValidator = (validator) => {
        const { validator: fn, message, negatedMessage } = validator;
        const placeholder = (0, random_id_1.default)();
        validator.message = (value, label) => (negatedMessage ?
            negatedMessage(value, label) :
            message(value, placeholder).replace(/ to /, '$&not ').replace(placeholder, label));
        validator.validator = (value) => !fn(value);
        predicate[predicate_1.validatorSymbol].push(validator);
        predicate.addValidator = originalAddValidator;
        return predicate;
    };
    return predicate;
};
exports.not = not;


},
1384(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnyPredicate = exports.DataViewPredicate = exports.ArrayBufferPredicate = exports.TypedArrayPredicate = exports.WeakSetPredicate = exports.SetPredicate = exports.WeakMapPredicate = exports.MapPredicate = exports.ErrorPredicate = exports.DatePredicate = exports.ObjectPredicate = exports.ArrayPredicate = exports.BooleanPredicate = exports.BigIntPredicate = exports.NumberPredicate = exports.StringPredicate = void 0;
const string_1 = __webpack_require__(2478);
Object.defineProperty(exports, "StringPredicate", ({ enumerable: true, get: function () { return string_1.StringPredicate; } }));
const number_1 = __webpack_require__(1110);
Object.defineProperty(exports, "NumberPredicate", ({ enumerable: true, get: function () { return number_1.NumberPredicate; } }));
const bigint_1 = __webpack_require__(7128);
Object.defineProperty(exports, "BigIntPredicate", ({ enumerable: true, get: function () { return bigint_1.BigIntPredicate; } }));
const boolean_1 = __webpack_require__(5679);
Object.defineProperty(exports, "BooleanPredicate", ({ enumerable: true, get: function () { return boolean_1.BooleanPredicate; } }));
const predicate_1 = __webpack_require__(1830);
const array_1 = __webpack_require__(2858);
Object.defineProperty(exports, "ArrayPredicate", ({ enumerable: true, get: function () { return array_1.ArrayPredicate; } }));
const object_1 = __webpack_require__(1632);
Object.defineProperty(exports, "ObjectPredicate", ({ enumerable: true, get: function () { return object_1.ObjectPredicate; } }));
const date_1 = __webpack_require__(7975);
Object.defineProperty(exports, "DatePredicate", ({ enumerable: true, get: function () { return date_1.DatePredicate; } }));
const error_1 = __webpack_require__(1661);
Object.defineProperty(exports, "ErrorPredicate", ({ enumerable: true, get: function () { return error_1.ErrorPredicate; } }));
const map_1 = __webpack_require__(9693);
Object.defineProperty(exports, "MapPredicate", ({ enumerable: true, get: function () { return map_1.MapPredicate; } }));
const weak_map_1 = __webpack_require__(1576);
Object.defineProperty(exports, "WeakMapPredicate", ({ enumerable: true, get: function () { return weak_map_1.WeakMapPredicate; } }));
const set_1 = __webpack_require__(9275);
Object.defineProperty(exports, "SetPredicate", ({ enumerable: true, get: function () { return set_1.SetPredicate; } }));
const weak_set_1 = __webpack_require__(9618);
Object.defineProperty(exports, "WeakSetPredicate", ({ enumerable: true, get: function () { return weak_set_1.WeakSetPredicate; } }));
const typed_array_1 = __webpack_require__(8187);
Object.defineProperty(exports, "TypedArrayPredicate", ({ enumerable: true, get: function () { return typed_array_1.TypedArrayPredicate; } }));
const array_buffer_1 = __webpack_require__(4089);
Object.defineProperty(exports, "ArrayBufferPredicate", ({ enumerable: true, get: function () { return array_buffer_1.ArrayBufferPredicate; } }));
const data_view_1 = __webpack_require__(1129);
Object.defineProperty(exports, "DataViewPredicate", ({ enumerable: true, get: function () { return data_view_1.DataViewPredicate; } }));
const any_1 = __webpack_require__(6905);
Object.defineProperty(exports, "AnyPredicate", ({ enumerable: true, get: function () { return any_1.AnyPredicate; } }));
exports["default"] = (object, options) => {
    Object.defineProperties(object, {
        string: {
            get: () => new string_1.StringPredicate(options)
        },
        number: {
            get: () => new number_1.NumberPredicate(options)
        },
        bigint: {
            get: () => new bigint_1.BigIntPredicate(options)
        },
        boolean: {
            get: () => new boolean_1.BooleanPredicate(options)
        },
        undefined: {
            get: () => new predicate_1.Predicate('undefined', options)
        },
        null: {
            get: () => new predicate_1.Predicate('null', options)
        },
        nullOrUndefined: {
            get: () => new predicate_1.Predicate('nullOrUndefined', options)
        },
        nan: {
            get: () => new predicate_1.Predicate('nan', options)
        },
        symbol: {
            get: () => new predicate_1.Predicate('symbol', options)
        },
        array: {
            get: () => new array_1.ArrayPredicate(options)
        },
        object: {
            get: () => new object_1.ObjectPredicate(options)
        },
        date: {
            get: () => new date_1.DatePredicate(options)
        },
        error: {
            get: () => new error_1.ErrorPredicate(options)
        },
        map: {
            get: () => new map_1.MapPredicate(options)
        },
        weakMap: {
            get: () => new weak_map_1.WeakMapPredicate(options)
        },
        set: {
            get: () => new set_1.SetPredicate(options)
        },
        weakSet: {
            get: () => new weak_set_1.WeakSetPredicate(options)
        },
        function: {
            get: () => new predicate_1.Predicate('Function', options)
        },
        buffer: {
            get: () => new predicate_1.Predicate('Buffer', options)
        },
        regExp: {
            get: () => new predicate_1.Predicate('RegExp', options)
        },
        promise: {
            get: () => new predicate_1.Predicate('Promise', options)
        },
        typedArray: {
            get: () => new typed_array_1.TypedArrayPredicate('TypedArray', options)
        },
        int8Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Int8Array', options)
        },
        uint8Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Uint8Array', options)
        },
        uint8ClampedArray: {
            get: () => new typed_array_1.TypedArrayPredicate('Uint8ClampedArray', options)
        },
        int16Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Int16Array', options)
        },
        uint16Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Uint16Array', options)
        },
        int32Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Int32Array', options)
        },
        uint32Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Uint32Array', options)
        },
        float32Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Float32Array', options)
        },
        float64Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Float64Array', options)
        },
        arrayBuffer: {
            get: () => new array_buffer_1.ArrayBufferPredicate('ArrayBuffer', options)
        },
        sharedArrayBuffer: {
            get: () => new array_buffer_1.ArrayBufferPredicate('SharedArrayBuffer', options)
        },
        dataView: {
            get: () => new data_view_1.DataViewPredicate(options)
        },
        iterable: {
            get: () => new predicate_1.Predicate('Iterable', options)
        },
        any: {
            value: (...predicates) => new any_1.AnyPredicate(predicates, options)
        }
    });
    return object;
};


},
6905(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnyPredicate = void 0;
const argument_error_1 = __webpack_require__(2202);
const base_predicate_1 = __webpack_require__(7006);
const generate_argument_error_message_1 = __webpack_require__(5810);
/**
@hidden
*/
class AnyPredicate {
    constructor(predicates, options = {}) {
        Object.defineProperty(this, "predicates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: predicates
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
    [base_predicate_1.testSymbol](value, main, label, idLabel) {
        const errors = new Map();
        for (const predicate of this.predicates) {
            try {
                main(value, label, predicate, idLabel);
                return;
            }
            catch (error) {
                if (value === undefined && this.options.optional === true) {
                    return;
                }
                // If we received an ArgumentError, then..
                if (error instanceof argument_error_1.ArgumentError) {
                    // Iterate through every error reported.
                    for (const [key, value] of error.validationErrors.entries()) {
                        // Get the current errors set, if any.
                        const alreadyPresent = errors.get(key);
                        // Add all errors under the same key
                        errors.set(key, new Set([...alreadyPresent !== null && alreadyPresent !== void 0 ? alreadyPresent : [], ...value]));
                    }
                }
            }
        }
        if (errors.size > 0) {
            // Generate the `error.message` property.
            const message = (0, generate_argument_error_message_1.generateArgumentErrorMessage)(errors, true);
            throw new argument_error_1.ArgumentError(`Any predicate failed with the following errors:\n${message}`, main, errors);
        }
    }
}
exports.AnyPredicate = AnyPredicate;


},
4089(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArrayBufferPredicate = void 0;
const predicate_1 = __webpack_require__(1830);
class ArrayBufferPredicate extends predicate_1.Predicate {
    /**
    Test an array buffer to have a specific byte length.

    @param byteLength - The byte length of the array buffer.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength
        });
    }
    /**
    Test an array buffer to have a minimum byte length.

    @param byteLength - The minimum byte length of the array buffer.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``
        });
    }
    /**
    Test an array buffer to have a minimum byte length.

    @param length - The minimum byte length of the array buffer.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``
        });
    }
}
exports.ArrayBufferPredicate = ArrayBufferPredicate;


},
2858(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArrayPredicate = void 0;
const isEqual = __webpack_require__(8142);
const predicate_1 = __webpack_require__(1830);
const match_shape_1 = __webpack_require__(4863);
const of_type_1 = __webpack_require__(6678);
class ArrayPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('array', options);
    }
    /**
    Test an array to have a specific length.

    @param length - The length of the array.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
            validator: value => value.length === length
        });
    }
    /**
    Test an array to have a minimum length.

    @param length - The minimum length of the array.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``
        });
    }
    /**
    Test an array to have a maximum length.

    @param length - The maximum length of the array.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``
        });
    }
    /**
    Test an array to start with a specific value. The value is tested by identity, not structure.

    @param searchElement - The value that should be the start of the array.
    */
    startsWith(searchElement) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to start with \`${searchElement}\`, got \`${value[0]}\``,
            validator: value => value[0] === searchElement
        });
    }
    /**
    Test an array to end with a specific value. The value is tested by identity, not structure.

    @param searchElement - The value that should be the end of the array.
    */
    endsWith(searchElement) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to end with \`${searchElement}\`, got \`${value[value.length - 1]}\``,
            validator: value => value[value.length - 1] === searchElement
        });
    }
    /**
    Test an array to include all the provided elements. The values are tested by identity, not structure.

    @param searchElements - The values that should be included in the array.
    */
    includes(...searchElements) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include all elements of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => searchElements.every(element => value.includes(element))
        });
    }
    /**
    Test an array to include any of the provided elements. The values are tested by identity, not structure.

    @param searchElements - The values that should be included in the array.
    */
    includesAny(...searchElements) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include any element of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => searchElements.some(element => value.includes(element))
        });
    }
    /**
    Test an array to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be empty, got \`${JSON.stringify(value)}\``,
            validator: value => value.length === 0
        });
    }
    /**
    Test an array to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: value => value.length > 0
        });
    }
    /**
    Test an array to be deeply equal to the provided array.

    @param expected - Expected value to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => isEqual(value, expected)
        });
    }
    /**
    Test all elements in the array to match to provided predicate.

    @param predicate - The predicate that should be applied against every individual item.

    @example
    ```
    ow(['a', 1], ow.array.ofType(ow.any(ow.string, ow.number)));
    ```
    */
    ofType(predicate) {
        // TODO [typescript@>=5] If higher-kinded types are supported natively by typescript, refactor `addValidator` to use them to avoid the usage of `any`. Otherwise, bump or remove this TODO.
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: value => (0, of_type_1.default)(value, 'values', predicate)
        });
    }
    /**
    Test if the elements in the array exactly matches the elements placed at the same indices in the predicates array.

    @param predicates - Predicates to test the array against. Describes what the tested array should look like.

    @example
    ```
    ow(['1', 2], ow.array.exactShape([ow.string, ow.number]));
    ```
    */
    exactShape(predicates) {
        const shape = predicates;
        return this.addValidator({
            message: (_, label, message) => `${message.replace('Expected', 'Expected element')} in ${label}`,
            validator: object => (0, match_shape_1.exact)(object, shape, undefined, true)
        });
    }
}
exports.ArrayPredicate = ArrayPredicate;


},
7006(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isPredicate = exports.testSymbol = void 0;
/**
@hidden
*/
exports.testSymbol = Symbol('test');
/**
@hidden
*/
const isPredicate = (value) => Boolean(value[exports.testSymbol]);
exports.isPredicate = isPredicate;


},
7128(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BigIntPredicate = void 0;
const predicate_1 = __webpack_require__(1830);
class BigIntPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('bigint', options);
    }
}
exports.BigIntPredicate = BigIntPredicate;


},
5679(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BooleanPredicate = void 0;
const predicate_1 = __webpack_require__(1830);
class BooleanPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('boolean', options);
    }
    /**
    Test a boolean to be true.
    */
    get true() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be true, got ${value}`,
            validator: value => value
        });
    }
    /**
    Test a boolean to be false.
    */
    get false() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be false, got ${value}`,
            validator: value => !value
        });
    }
}
exports.BooleanPredicate = BooleanPredicate;


},
1129(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataViewPredicate = void 0;
const predicate_1 = __webpack_require__(1830);
class DataViewPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('DataView', options);
    }
    /**
    Test a DataView to have a specific byte length.

    @param byteLength - The byte length of the DataView.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength
        });
    }
    /**
    Test a DataView to have a minimum byte length.

    @param byteLength - The minimum byte length of the DataView.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``
        });
    }
    /**
    Test a DataView to have a minimum byte length.

    @param length - The minimum byte length of the DataView.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``
        });
    }
}
exports.DataViewPredicate = DataViewPredicate;


},
7975(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatePredicate = void 0;
const predicate_1 = __webpack_require__(1830);
class DatePredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('date', options);
    }
    /**
    Test a date to be before another date.

    @param date - Maximum value.
    */
    before(date) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} ${value.toISOString()} to be before ${date.toISOString()}`,
            validator: value => value.getTime() < date.getTime()
        });
    }
    /**
    Test a date to be before another date.

    @param date - Minimum value.
    */
    after(date) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} ${value.toISOString()} to be after ${date.toISOString()}`,
            validator: value => value.getTime() > date.getTime()
        });
    }
}
exports.DatePredicate = DatePredicate;


},
1661(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorPredicate = void 0;
const predicate_1 = __webpack_require__(1830);
class ErrorPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('error', options);
    }
    /**
    Test an error to have a specific name.

    @param expected - Expected name of the Error.
    */
    name(expected) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} to have name \`${expected}\`, got \`${error.name}\``,
            validator: error => error.name === expected
        });
    }
    /**
    Test an error to have a specific message.

    @param expected - Expected message of the Error.
    */
    message(expected) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} message to be \`${expected}\`, got \`${error.message}\``,
            validator: error => error.message === expected
        });
    }
    /**
    Test the error message to include a specific message.

    @param message - Message that should be included in the error.
    */
    messageIncludes(message) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} message to include \`${message}\`, got \`${error.message}\``,
            validator: error => error.message.includes(message)
        });
    }
    /**
    Test the error object to have specific keys.

    @param keys - One or more keys which should be part of the error object.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} message to have keys \`${keys.join('`, `')}\``,
            validator: error => keys.every(key => Object.prototype.hasOwnProperty.call(error, key))
        });
    }
    /**
    Test an error to be of a specific instance type.

    @param instance - The expected instance type of the error.
    */
    instanceOf(instance) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} \`${error.name}\` to be of type \`${instance.name}\``,
            validator: error => error instanceof instance
        });
    }
    /**
    Test an Error to be a TypeError.
    */
    get typeError() {
        return this.instanceOf(TypeError);
    }
    /**
    Test an Error to be an EvalError.
    */
    get evalError() {
        return this.instanceOf(EvalError);
    }
    /**
    Test an Error to be a RangeError.
    */
    get rangeError() {
        return this.instanceOf(RangeError);
    }
    /**
    Test an Error to be a ReferenceError.
    */
    get referenceError() {
        return this.instanceOf(ReferenceError);
    }
    /**
    Test an Error to be a SyntaxError.
    */
    get syntaxError() {
        return this.instanceOf(SyntaxError);
    }
    /**
    Test an Error to be a URIError.
    */
    get uriError() {
        return this.instanceOf(URIError);
    }
}
exports.ErrorPredicate = ErrorPredicate;


},
9693(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MapPredicate = void 0;
const isEqual = __webpack_require__(8142);
const has_items_1 = __webpack_require__(3779);
const of_type_1 = __webpack_require__(6678);
const predicate_1 = __webpack_require__(1830);
class MapPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('Map', options);
    }
    /**
    Test a Map to have a specific size.

    @param size - The size of the Map.
    */
    size(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have size \`${size}\`, got \`${map.size}\``,
            validator: map => map.size === size
        });
    }
    /**
    Test an Map to have a minimum size.

    @param size - The minimum size of the Map.
    */
    minSize(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have a minimum size of \`${size}\`, got \`${map.size}\``,
            validator: map => map.size >= size,
            negatedMessage: (map, label) => `Expected ${label} to have a maximum size of \`${size - 1}\`, got \`${map.size}\``
        });
    }
    /**
    Test an Map to have a maximum size.

    @param size - The maximum size of the Map.
    */
    maxSize(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have a maximum size of \`${size}\`, got \`${map.size}\``,
            validator: map => map.size <= size,
            negatedMessage: (map, label) => `Expected ${label} to have a minimum size of \`${size + 1}\`, got \`${map.size}\``
        });
    }
    /**
    Test a Map to include all the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that should be a key in the Map.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: map => (0, has_items_1.default)(map, keys)
        });
    }
    /**
    Test a Map to include any of the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that could be a key in the Map.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: map => keys.some(key => map.has(key))
        });
    }
    /**
    Test a Map to include all the provided values. The values are tested by identity, not structure.

    @param values - The values that should be a value in the Map.
    */
    hasValues(...values) {
        return this.addValidator({
            message: (_, label, missingValues) => `Expected ${label} to have values \`${JSON.stringify(missingValues)}\``,
            validator: map => (0, has_items_1.default)(new Set(map.values()), values)
        });
    }
    /**
    Test a Map to include any of the provided values. The values are tested by identity, not structure.

    @param values - The values that could be a value in the Map.
    */
    hasAnyValues(...values) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any value of \`${JSON.stringify(values)}\``,
            validator: map => {
                const valueSet = new Set(map.values());
                return values.some(key => valueSet.has(key));
            }
        });
    }
    /**
    Test all the keys in the Map to match the provided predicate.

    @param predicate - The predicate that should be applied against every key in the Map.
    */
    keysOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: map => (0, of_type_1.default)(map.keys(), 'keys', predicate)
        });
    }
    /**
    Test all the values in the Map to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the Map.
    */
    valuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: map => (0, of_type_1.default)(map.values(), 'values', predicate)
        });
    }
    /**
    Test a Map to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to be empty, got \`${JSON.stringify([...map])}\``,
            validator: map => map.size === 0
        });
    }
    /**
    Test a Map to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: map => map.size > 0
        });
    }
    /**
    Test a Map to be deeply equal to the provided Map.

    @param expected - Expected Map to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify([...expected])}\`, got \`${JSON.stringify([...map])}\``,
            validator: map => isEqual(map, expected)
        });
    }
}
exports.MapPredicate = MapPredicate;


},
1110(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberPredicate = void 0;
const is_1 = __webpack_require__(5864);
const predicate_1 = __webpack_require__(1830);
class NumberPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('number', options);
    }
    /**
    Test a number to be in a specified range.

    @param start - Start of the range.
    @param end - End of the range.
    */
    inRange(start, end) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be in range [${start}..${end}], got ${value}`,
            validator: value => is_1.default.inRange(value, [start, end])
        });
    }
    /**
    Test a number to be greater than the provided value.

    @param number - Minimum value.
    */
    greaterThan(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be greater than ${number}, got ${value}`,
            validator: value => value > number
        });
    }
    /**
    Test a number to be greater than or equal to the provided value.

    @param number - Minimum value.
    */
    greaterThanOrEqual(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be greater than or equal to ${number}, got ${value}`,
            validator: value => value >= number
        });
    }
    /**
    Test a number to be less than the provided value.

    @param number - Maximum value.
    */
    lessThan(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be less than ${number}, got ${value}`,
            validator: value => value < number
        });
    }
    /**
    Test a number to be less than or equal to the provided value.

    @param number - Minimum value.
    */
    lessThanOrEqual(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be less than or equal to ${number}, got ${value}`,
            validator: value => value <= number
        });
    }
    /**
    Test a number to be equal to a specified number.

    @param expected - Expected value to match.
    */
    equal(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be equal to ${expected}, got ${value}`,
            validator: value => value === expected
        });
    }
    /**
    Test if a number is an element of the provided list.

    @param list - List of possible values.
    */
    oneOf(list) {
        return this.addValidator({
            message: (value, label) => {
                let printedList = JSON.stringify(list);
                if (list.length > 10) {
                    const overflow = list.length - 10;
                    printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
                }
                return `Expected ${label} to be one of \`${printedList}\`, got ${value}`;
            },
            validator: value => list.includes(value)
        });
    }
    /**
    Test a number to be an integer.
    */
    get integer() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be an integer, got ${value}`,
            validator: value => is_1.default.integer(value)
        });
    }
    /**
    Test a number to be finite.
    */
    get finite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be finite, got ${value}`,
            validator: value => !is_1.default.infinite(value)
        });
    }
    /**
    Test a number to be infinite.
    */
    get infinite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be infinite, got ${value}`,
            validator: value => is_1.default.infinite(value)
        });
    }
    /**
    Test a number to be positive.
    */
    get positive() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be positive, got ${value}`,
            validator: value => value > 0
        });
    }
    /**
    Test a number to be negative.
    */
    get negative() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be negative, got ${value}`,
            validator: value => value < 0
        });
    }
    /**
    Test a number to be an integer or infinite.
    */
    get integerOrInfinite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be an integer or infinite, got ${value}`,
            validator: value => is_1.default.integer(value) || is_1.default.infinite(value)
        });
    }
    /**
    Test a number to be in a valid range for a 8-bit unsigned integer.
    */
    get uint8() {
        return this.integer.inRange(0, 255);
    }
    /**
    Test a number to be in a valid range for a 16-bit unsigned integer.
    */
    get uint16() {
        return this.integer.inRange(0, 65535);
    }
    /**
    Test a number to be in a valid range for a 32-bit unsigned integer.
    */
    get uint32() {
        return this.integer.inRange(0, 4294967295);
    }
    /**
    Test a number to be in a valid range for a 8-bit signed integer.
    */
    get int8() {
        return this.integer.inRange(-128, 127);
    }
    /**
    Test a number to be in a valid range for a 16-bit signed integer.
    */
    get int16() {
        return this.integer.inRange(-32768, 32767);
    }
    /**
    Test a number to be in a valid range for a 32-bit signed integer.
    */
    get int32() {
        return this.integer.inRange(-2147483648, 2147483647);
    }
}
exports.NumberPredicate = NumberPredicate;


},
1632(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectPredicate = void 0;
const is_1 = __webpack_require__(5864);
const dotProp = __webpack_require__(8486);
const isEqual = __webpack_require__(8142);
const has_items_1 = __webpack_require__(3779);
const of_type_1 = __webpack_require__(6678);
const of_type_deep_1 = __webpack_require__(8921);
const match_shape_1 = __webpack_require__(4863);
const predicate_1 = __webpack_require__(1830);
class ObjectPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('object', options);
    }
    /**
    Test if an Object is a plain object.
    */
    get plain() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to be a plain object`,
            validator: object => is_1.default.plainObject(object)
        });
    }
    /**
    Test an object to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (object, label) => `Expected ${label} to be empty, got \`${JSON.stringify(object)}\``,
            validator: object => Object.keys(object).length === 0
        });
    }
    /**
    Test an object to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: object => Object.keys(object).length > 0
        });
    }
    /**
    Test all the values in the object to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the object.
    */
    valuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: object => (0, of_type_1.default)(Object.values(object), 'values', predicate)
        });
    }
    /**
    Test all the values in the object deeply to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the object.
    */
    deepValuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: object => (0, of_type_deep_1.default)(object, predicate)
        });
    }
    /**
    Test an object to be deeply equal to the provided object.

    @param expected - Expected object to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (object, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(object)}\``,
            validator: object => isEqual(object, expected)
        });
    }
    /**
    Test an object to be of a specific instance type.

    @param instance - The expected instance type of the object.
    */
    instanceOf(instance) {
        return this.addValidator({
            message: (object, label) => {
                var _a;
                let { name } = (_a = object === null || object === void 0 ? void 0 : object.constructor) !== null && _a !== void 0 ? _a : {};
                if (!name || name === 'Object') {
                    name = JSON.stringify(object);
                }
                return `Expected ${label} \`${name}\` to be of type \`${instance.name}\``;
            },
            validator: object => object instanceof instance
        });
    }
    /**
    Test an object to include all the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

    @param keys - The keys that should be present in the object.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: object => (0, has_items_1.default)({
                has: item => dotProp.has(object, item)
            }, keys)
        });
    }
    /**
    Test an object to include any of the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

    @param keys - The keys that could be a key in the object.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: object => keys.some(key => dotProp.has(object, key))
        });
    }
    /**
    Test an object to match the `shape` partially. This means that it ignores unexpected properties. The shape comparison is deep.

    The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

    @param shape - Shape to test the object against.

    @example
    ```
    import ow from 'ow';

    const object = {
        unicorn: '🦄',
        rainbow: '🌈'
    };

    ow(object, ow.object.partialShape({
        unicorn: ow.string
    }));
    ```
    */
    partialShape(shape) {
        return this.addValidator({
            // TODO: Improve this when message handling becomes smarter
            message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
            validator: object => (0, match_shape_1.partial)(object, shape)
        });
    }
    /**
    Test an object to match the `shape` exactly. This means that will fail if it comes across unexpected properties. The shape comparison is deep.

    The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

    @param shape - Shape to test the object against.

    @example
    ```
    import ow from 'ow';

    ow({unicorn: '🦄'}, ow.object.exactShape({
        unicorn: ow.string
    }));
    ```
    */
    exactShape(shape) {
        // TODO [typescript@>=5] If higher-kinded types are supported natively by typescript, refactor `addValidator` to use them to avoid the usage of `any`. Otherwise, bump or remove this TODO.
        return this.addValidator({
            // TODO: Improve this when message handling becomes smarter
            message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
            validator: object => (0, match_shape_1.exact)(object, shape)
        });
    }
}
exports.ObjectPredicate = ObjectPredicate;


},
1830(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Predicate = exports.validatorSymbol = void 0;
const is_1 = __webpack_require__(5864);
const argument_error_1 = __webpack_require__(2202);
const not_1 = __webpack_require__(6931);
const base_predicate_1 = __webpack_require__(7006);
const generate_argument_error_message_1 = __webpack_require__(5810);
/**
@hidden
*/
exports.validatorSymbol = Symbol('validators');
/**
@hidden
*/
class Predicate {
    constructor(type, options = {}) {
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: type
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                validators: []
            }
        });
        this.context = {
            ...this.context,
            ...this.options
        };
        const typeString = this.type.charAt(0).toLowerCase() + this.type.slice(1);
        this.addValidator({
            message: (value, label) => {
                // We do not include type in this label as we do for other messages, because it would be redundant.
                const label_ = label === null || label === void 0 ? void 0 : label.slice(this.type.length + 1);
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                return `Expected ${label_ || 'argument'} to be of type \`${this.type}\` but received type \`${(0, is_1.default)(value)}\``;
            },
            validator: value => is_1.default[typeString](value)
        });
    }
    /**
    @hidden
    */
    [base_predicate_1.testSymbol](value, main, label, idLabel) {
        // Create a map of labels -> received errors.
        const errors = new Map();
        for (const { validator, message } of this.context.validators) {
            if (this.options.optional === true && value === undefined) {
                continue;
            }
            let result;
            try {
                result = validator(value);
            }
            catch (error) {
                // Any errors caught means validators couldn't process the input.
                result = error;
            }
            if (result === true) {
                continue;
            }
            const label2 = is_1.default.function_(label) ? label() : label;
            const labelWithTick = (label2 && idLabel) ? `\`${label2}\`` : label2;
            const label_ = labelWithTick ?
                `${this.type} ${labelWithTick}` :
                this.type;
            const mapKey = label2 || this.type;
            // Get the current errors encountered for this label.
            const currentErrors = errors.get(mapKey);
            // Pre-generate the error message that will be reported to the user.
            const errorMessage = message(value, label_, result);
            // If we already have any errors for this label.
            if (currentErrors) {
                // If we don't already have this error logged, add it.
                currentErrors.add(errorMessage);
            }
            else {
                // Set this label and error in the full map.
                errors.set(mapKey, new Set([errorMessage]));
            }
        }
        // If we have any errors to report, throw.
        if (errors.size > 0) {
            // Generate the `error.message` property.
            const message = (0, generate_argument_error_message_1.generateArgumentErrorMessage)(errors);
            throw new argument_error_1.ArgumentError(message, main, errors);
        }
    }
    /**
    @hidden
    */
    get [exports.validatorSymbol]() {
        return this.context.validators;
    }
    /**
    Invert the following validators.
    */
    get not() {
        return (0, not_1.not)(this);
    }
    /**
    Test if the value matches a custom validation function. The validation function should return an object containing a `validator` and `message`. If the `validator` is `false`, the validation fails and the `message` will be used as error message. If the `message` is a function, the function is invoked with the `label` as argument to let you further customize the error message.

    @param customValidator - Custom validation function.
    */
    validate(customValidator) {
        return this.addValidator({
            message: (_, label, error) => typeof error === 'string' ?
                `(${label}) ${error}` :
                error(label),
            validator: value => {
                const { message, validator } = customValidator(value);
                if (validator) {
                    return true;
                }
                return message;
            }
        });
    }
    /**
    Test if the value matches a custom validation function. The validation function should return `true` if the value passes the function. If the function either returns `false` or a string, the function fails and the string will be used as error message.

    @param validator - Validation function.
    */
    is(validator) {
        return this.addValidator({
            message: (value, label, error) => (error ?
                `(${label}) ${error}` :
                `Expected ${label} \`${value}\` to pass custom validation function`),
            validator
        });
    }
    /**
    Provide a new error message to be thrown when the validation fails.

    @param newMessage - Either a string containing the new message or a function returning the new message.

    @example
    ```
    ow('🌈', 'unicorn', ow.string.equals('🦄').message('Expected unicorn, got rainbow'));
    //=> ArgumentError: Expected unicorn, got rainbow
    ```

    @example
    ```
    ow('🌈', ow.string.minLength(5).message((value, label) => `Expected ${label}, to have a minimum length of 5, got \`${value}\``));
    //=> ArgumentError: Expected string, to be have a minimum length of 5, got `🌈`
    ```
    */
    message(newMessage) {
        const { validators } = this.context;
        validators[validators.length - 1].message = (value, label) => {
            if (typeof newMessage === 'function') {
                return newMessage(value, label);
            }
            return newMessage;
        };
        return this;
    }
    /**
    Register a new validator.

    @param validator - Validator to register.
    */
    addValidator(validator) {
        this.context.validators.push(validator);
        return this;
    }
}
exports.Predicate = Predicate;


},
9275(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetPredicate = void 0;
const isEqual = __webpack_require__(8142);
const has_items_1 = __webpack_require__(3779);
const of_type_1 = __webpack_require__(6678);
const predicate_1 = __webpack_require__(1830);
class SetPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('Set', options);
    }
    /**
    Test a Set to have a specific size.

    @param size - The size of the Set.
    */
    size(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have size \`${size}\`, got \`${set.size}\``,
            validator: set => set.size === size
        });
    }
    /**
    Test a Set to have a minimum size.

    @param size - The minimum size of the Set.
    */
    minSize(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have a minimum size of \`${size}\`, got \`${set.size}\``,
            validator: set => set.size >= size,
            negatedMessage: (set, label) => `Expected ${label} to have a maximum size of \`${size - 1}\`, got \`${set.size}\``
        });
    }
    /**
    Test a Set to have a maximum size.

    @param size - The maximum size of the Set.
    */
    maxSize(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have a maximum size of \`${size}\`, got \`${set.size}\``,
            validator: set => set.size <= size,
            negatedMessage: (set, label) => `Expected ${label} to have a minimum size of \`${size + 1}\`, got \`${set.size}\``
        });
    }
    /**
    Test a Set to include all the provided items. The items are tested by identity, not structure.

    @param items - The items that should be a item in the Set.
    */
    has(...items) {
        return this.addValidator({
            message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
            validator: set => (0, has_items_1.default)(set, items)
        });
    }
    /**
    Test a Set to include any of the provided items. The items are tested by identity, not structure.

    @param items - The items that could be a item in the Set.
    */
    hasAny(...items) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
            validator: set => items.some(item => set.has(item))
        });
    }
    /**
    Test all the items in the Set to match the provided predicate.

    @param predicate - The predicate that should be applied against every item in the Set.
    */
    ofType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: set => (0, of_type_1.default)(set, 'values', predicate)
        });
    }
    /**
    Test a Set to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to be empty, got \`${JSON.stringify([...set])}\``,
            validator: set => set.size === 0
        });
    }
    /**
    Test a Set to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: set => set.size > 0
        });
    }
    /**
    Test a Set to be deeply equal to the provided Set.

    @param expected - Expected Set to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify([...expected])}\`, got \`${JSON.stringify([...set])}\``,
            validator: set => isEqual(set, expected)
        });
    }
}
exports.SetPredicate = SetPredicate;


},
2478(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringPredicate = void 0;
const is_1 = __webpack_require__(5864);
const valiDate = __webpack_require__(302);
const predicate_1 = __webpack_require__(1830);
class StringPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('string', options);
    }
    /**
    Test a string to have a specific length.

    @param length - The length of the string.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value}\``,
            validator: value => value.length === length
        });
    }
    /**
    Test a string to have a minimum length.

    @param length - The minimum length of the string.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value}\``
        });
    }
    /**
    Test a string to have a maximum length.

    @param length - The maximum length of the string.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value}\``
        });
    }
    /**
    Test a string against a regular expression.

    @param regex - The regular expression to match the value with.
    */
    matches(regex) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to match \`${regex}\`, got \`${value}\``,
            validator: value => regex.test(value)
        });
    }
    /**
    Test a string to start with a specific value.

    @param searchString - The value that should be the start of the string.
    */
    startsWith(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to start with \`${searchString}\`, got \`${value}\``,
            validator: value => value.startsWith(searchString)
        });
    }
    /**
    Test a string to end with a specific value.

    @param searchString - The value that should be the end of the string.
    */
    endsWith(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to end with \`${searchString}\`, got \`${value}\``,
            validator: value => value.endsWith(searchString)
        });
    }
    /**
    Test a string to include a specific value.

    @param searchString - The value that should be included in the string.
    */
    includes(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include \`${searchString}\`, got \`${value}\``,
            validator: value => value.includes(searchString)
        });
    }
    /**
    Test if the string is an element of the provided list.

    @param list - List of possible values.
    */
    oneOf(list) {
        return this.addValidator({
            message: (value, label) => {
                let printedList = JSON.stringify(list);
                if (list.length > 10) {
                    const overflow = list.length - 10;
                    printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
                }
                return `Expected ${label} to be one of \`${printedList}\`, got \`${value}\``;
            },
            validator: value => list.includes(value)
        });
    }
    /**
    Test a string to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be empty, got \`${value}\``,
            validator: value => value === ''
        });
    }
    /**
    Test a string to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: value => value !== ''
        });
    }
    /**
    Test a string to be equal to a specified string.

    @param expected - Expected value to match.
    */
    equals(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be equal to \`${expected}\`, got \`${value}\``,
            validator: value => value === expected
        });
    }
    /**
    Test a string to be alphanumeric.
    */
    get alphanumeric() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be alphanumeric, got \`${value}\``,
            validator: value => /^[a-z\d]+$/i.test(value)
        });
    }
    /**
    Test a string to be alphabetical.
    */
    get alphabetical() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be alphabetical, got \`${value}\``,
            validator: value => /^[a-z]+$/gi.test(value)
        });
    }
    /**
    Test a string to be numeric.
    */
    get numeric() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be numeric, got \`${value}\``,
            validator: value => /^[+-]?\d+$/i.test(value)
        });
    }
    /**
    Test a string to be a valid date.
    */
    get date() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be a date, got \`${value}\``,
            validator: valiDate
        });
    }
    /**
    Test a non-empty string to be lowercase. Matching both alphabetical & numbers.
    */
    get lowercase() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be lowercase, got \`${value}\``,
            validator: value => value.trim() !== '' && value === value.toLowerCase()
        });
    }
    /**
    Test a non-empty string to be uppercase. Matching both alphabetical & numbers.
    */
    get uppercase() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be uppercase, got \`${value}\``,
            validator: value => value.trim() !== '' && value === value.toUpperCase()
        });
    }
    /**
    Test a string to be a valid URL.
    */
    get url() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be a URL, got \`${value}\``,
            validator: is_1.default.urlString
        });
    }
}
exports.StringPredicate = StringPredicate;


},
8187(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypedArrayPredicate = void 0;
const predicate_1 = __webpack_require__(1830);
class TypedArrayPredicate extends predicate_1.Predicate {
    /**
    Test a typed array to have a specific byte length.

    @param byteLength - The byte length of the typed array.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength
        });
    }
    /**
    Test a typed array to have a minimum byte length.

    @param byteLength - The minimum byte length of the typed array.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``
        });
    }
    /**
    Test a typed array to have a minimum byte length.

    @param length - The minimum byte length of the typed array.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``
        });
    }
    /**
    Test a typed array to have a specific length.

    @param length - The length of the typed array.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
            validator: value => value.length === length
        });
    }
    /**
    Test a typed array to have a minimum length.

    @param length - The minimum length of the typed array.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``
        });
    }
    /**
    Test a typed array to have a maximum length.

    @param length - The maximum length of the typed array.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``
        });
    }
}
exports.TypedArrayPredicate = TypedArrayPredicate;


},
1576(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeakMapPredicate = void 0;
const has_items_1 = __webpack_require__(3779);
const predicate_1 = __webpack_require__(1830);
class WeakMapPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('WeakMap', options);
    }
    /**
    Test a WeakMap to include all the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that should be a key in the WeakMap.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: map => (0, has_items_1.default)(map, keys)
        });
    }
    /**
    Test a WeakMap to include any of the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that could be a key in the WeakMap.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: map => keys.some(key => map.has(key))
        });
    }
}
exports.WeakMapPredicate = WeakMapPredicate;


},
9618(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeakSetPredicate = void 0;
const has_items_1 = __webpack_require__(3779);
const predicate_1 = __webpack_require__(1830);
class WeakSetPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('WeakSet', options);
    }
    /**
    Test a WeakSet to include all the provided items. The items are tested by identity, not structure.

    @param items - The items that should be a item in the WeakSet.
    */
    has(...items) {
        return this.addValidator({
            message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
            validator: set => (0, has_items_1.default)(set, items)
        });
    }
    /**
    Test a WeakSet to include any of the provided items. The items are tested by identity, not structure.

    @param items - The items that could be a item in the WeakSet.
    */
    hasAny(...items) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
            validator: set => items.some(item => set.has(item))
        });
    }
}
exports.WeakSetPredicate = WeakSetPredicate;


},
9514(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_predicate_1 = __webpack_require__(7006);
/**
Validate the value against the provided predicate.

@hidden

@param value - Value to test.
@param label - Label which should be used in error messages.
@param predicate - Predicate to test to value against.
@param idLabel - If true, the label is a variable or type. Default: true.
*/
function test(value, label, predicate, idLabel = true) {
    predicate[base_predicate_1.testSymbol](value, test, label, idLabel);
}
exports["default"] = test;


},
5810(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateArgumentErrorMessage = void 0;
/**
Generates a complete message from all errors generated by predicates.

@param errors - The errors generated by the predicates.
@param isAny - If this function is called from the any argument.
@hidden
*/
const generateArgumentErrorMessage = (errors, isAny = false) => {
    const message = [];
    const errorArray = [...errors.entries()];
    const anyErrorWithoutOneItemOnly = errorArray.some(([, array]) => array.size !== 1);
    // If only one error "key" is present, enumerate all of those errors only.
    if (errorArray.length === 1) {
        const [, returnedErrors] = errorArray[0];
        if (!isAny && returnedErrors.size === 1) {
            const [errorMessage] = returnedErrors;
            return errorMessage;
        }
        for (const entry of returnedErrors) {
            message.push(`${isAny ? '  - ' : ''}${entry}`);
        }
        return message.join('\n');
    }
    // If every predicate returns just one error, enumerate them as is.
    if (!anyErrorWithoutOneItemOnly) {
        return errorArray.map(([, [item]]) => `  - ${item}`).join('\n');
    }
    // Else, iterate through all the errors and enumerate them.
    for (const [key, value] of errorArray) {
        message.push(`Errors from the "${key}" predicate:`);
        for (const entry of value) {
            message.push(`  - ${entry}`);
        }
    }
    return message.join('\n');
};
exports.generateArgumentErrorMessage = generateArgumentErrorMessage;


},
5450(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateStackTrace = void 0;
/**
Generates a useful stacktrace that points to the user's code where the error happened on platforms without the `Error.captureStackTrace()` method.

@hidden
*/
const generateStackTrace = () => {
    const stack = new RangeError('INTERNAL_OW_ERROR').stack;
    return stack;
};
exports.generateStackTrace = generateStackTrace;


},
3779(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
Retrieve the missing values in a collection based on an array of items.

@hidden

@param source - Source collection to search through.
@param items - Items to search for.
@param maxValues - Maximum number of values after the search process is stopped. Default: 5.
*/
exports["default"] = (source, items, maxValues = 5) => {
    const missingValues = [];
    for (const value of items) {
        if (source.has(value)) {
            continue;
        }
        missingValues.push(value);
        if (missingValues.length === maxValues) {
            return missingValues;
        }
    }
    return missingValues.length === 0 ? true : missingValues;
};


},
9843(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inferLabel = void 0;
const inferLabel = () => { };
exports.inferLabel = inferLabel;


},
4863(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exact = exports.partial = void 0;
const is_1 = __webpack_require__(5864);
const test_1 = __webpack_require__(9514);
const base_predicate_1 = __webpack_require__(7006);
/**
Test if the `object` matches the `shape` partially.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
function partial(object, shape, parent) {
    try {
        for (const key of Object.keys(shape)) {
            const label = parent ? `${parent}.${key}` : key;
            if ((0, base_predicate_1.isPredicate)(shape[key])) {
                (0, test_1.default)(object[key], label, shape[key]);
            }
            else if (is_1.default.plainObject(shape[key])) {
                const result = partial(object[key], shape[key], label);
                if (result !== true) {
                    return result;
                }
            }
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
}
exports.partial = partial;
/**
Test if the `object` matches the `shape` exactly.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
function exact(object, shape, parent, isArray) {
    try {
        const objectKeys = new Set(Object.keys(object));
        for (const key of Object.keys(shape)) {
            objectKeys.delete(key);
            const label = parent ? `${parent}.${key}` : key;
            if ((0, base_predicate_1.isPredicate)(shape[key])) {
                (0, test_1.default)(object[key], label, shape[key]);
            }
            else if (is_1.default.plainObject(shape[key])) {
                if (!Object.prototype.hasOwnProperty.call(object, key)) {
                    return `Expected \`${label}\` to exist`;
                }
                const result = exact(object[key], shape[key], label);
                if (result !== true) {
                    return result;
                }
            }
        }
        if (objectKeys.size > 0) {
            const firstKey = [...objectKeys.keys()][0];
            const label = parent ? `${parent}.${firstKey}` : firstKey;
            return `Did not expect ${isArray ? 'element' : 'property'} \`${label}\` to exist, got \`${object[firstKey]}\``;
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
}
exports.exact = exact;


},
8921(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(5864);
const test_1 = __webpack_require__(9514);
const ofTypeDeep = (object, predicate) => {
    if (!is_1.default.plainObject(object)) {
        (0, test_1.default)(object, 'deep values', predicate, false);
        return true;
    }
    return Object.values(object).every(value => ofTypeDeep(value, predicate));
};
/**
Test all the values in the object against a provided predicate.

@hidden

@param predicate - Predicate to test every value in the given object against.
*/
exports["default"] = (object, predicate) => {
    try {
        return ofTypeDeep(object, predicate);
    }
    catch (error) {
        return error.message;
    }
};


},
6678(__unused_rspack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const test_1 = __webpack_require__(9514);
/**
Test all the values in the collection against a provided predicate.

@hidden
@param source Source collection to test.
@param name The name to call the collection of values, such as `values` or `keys`.
@param predicate Predicate to test every item in the source collection against.
*/
exports["default"] = (source, name, predicate) => {
    try {
        for (const item of source) {
            (0, test_1.default)(item, name, predicate, false);
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
};


},
4693(__unused_rspack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = () => Math.random().toString(16).slice(2);


},
5864(module, exports) {
"use strict";

/// <reference lib="es2018"/>
/// <reference lib="dom"/>
/// <reference types="node"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typedArrayTypeNames = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array'
];
function isTypedArrayName(name) {
    return typedArrayTypeNames.includes(name);
}
const objectTypeNames = [
    'Function',
    'Generator',
    'AsyncGenerator',
    'GeneratorFunction',
    'AsyncGeneratorFunction',
    'AsyncFunction',
    'Observable',
    'Array',
    'Buffer',
    'Blob',
    'Object',
    'RegExp',
    'Date',
    'Error',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Promise',
    'URL',
    'FormData',
    'URLSearchParams',
    'HTMLElement',
    ...typedArrayTypeNames
];
function isObjectTypeName(name) {
    return objectTypeNames.includes(name);
}
const primitiveTypeNames = [
    'null',
    'undefined',
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol'
];
function isPrimitiveTypeName(name) {
    return primitiveTypeNames.includes(name);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isOfType(type) {
    return (value) => typeof value === type;
}
const { toString } = Object.prototype;
const getObjectType = (value) => {
    const objectTypeName = toString.call(value).slice(8, -1);
    if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
        return 'HTMLElement';
    }
    if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
    }
    return undefined;
};
const isObjectOfType = (type) => (value) => getObjectType(value) === type;
function is(value) {
    if (value === null) {
        return 'null';
    }
    switch (typeof value) {
        case 'undefined':
            return 'undefined';
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'function':
            return 'Function';
        case 'bigint':
            return 'bigint';
        case 'symbol':
            return 'symbol';
        default:
    }
    if (is.observable(value)) {
        return 'Observable';
    }
    if (is.array(value)) {
        return 'Array';
    }
    if (is.buffer(value)) {
        return 'Buffer';
    }
    const tagType = getObjectType(value);
    if (tagType) {
        return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError('Please don\'t use object wrappers for primitive types');
    }
    return 'Object';
}
is.undefined = isOfType('undefined');
is.string = isOfType('string');
const isNumberType = isOfType('number');
is.number = (value) => isNumberType(value) && !is.nan(value);
is.bigint = isOfType('bigint');
// eslint-disable-next-line @typescript-eslint/ban-types
is.function_ = isOfType('function');
is.null_ = (value) => value === null;
is.class_ = (value) => is.function_(value) && value.toString().startsWith('class ');
is.boolean = (value) => value === true || value === false;
is.symbol = isOfType('symbol');
is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
is.array = (value, assertion) => {
    if (!Array.isArray(value)) {
        return false;
    }
    if (!is.function_(assertion)) {
        return true;
    }
    return value.every(assertion);
};
is.buffer = (value) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.isBuffer) === null || _c === void 0 ? void 0 : _c.call(_b, value)) !== null && _d !== void 0 ? _d : false; };
is.blob = (value) => isObjectOfType('Blob')(value);
is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
is.object = (value) => !is.null_(value) && (typeof value === 'object' || is.function_(value));
is.iterable = (value) => { var _a; return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]); };
is.asyncIterable = (value) => { var _a; return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.asyncIterator]); };
is.generator = (value) => { var _a, _b; return is.iterable(value) && is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.next) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.throw); };
is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
is.nativePromise = (value) => isObjectOfType('Promise')(value);
const hasPromiseAPI = (value) => {
    var _a, _b;
    return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.then) &&
        is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.catch);
};
is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
is.generatorFunction = isObjectOfType('GeneratorFunction');
is.asyncGeneratorFunction = (value) => getObjectType(value) === 'AsyncGeneratorFunction';
is.asyncFunction = (value) => getObjectType(value) === 'AsyncFunction';
// eslint-disable-next-line no-prototype-builtins, @typescript-eslint/ban-types
is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty('prototype');
is.regExp = isObjectOfType('RegExp');
is.date = isObjectOfType('Date');
is.error = isObjectOfType('Error');
is.map = (value) => isObjectOfType('Map')(value);
is.set = (value) => isObjectOfType('Set')(value);
is.weakMap = (value) => isObjectOfType('WeakMap')(value);
is.weakSet = (value) => isObjectOfType('WeakSet')(value);
is.int8Array = isObjectOfType('Int8Array');
is.uint8Array = isObjectOfType('Uint8Array');
is.uint8ClampedArray = isObjectOfType('Uint8ClampedArray');
is.int16Array = isObjectOfType('Int16Array');
is.uint16Array = isObjectOfType('Uint16Array');
is.int32Array = isObjectOfType('Int32Array');
is.uint32Array = isObjectOfType('Uint32Array');
is.float32Array = isObjectOfType('Float32Array');
is.float64Array = isObjectOfType('Float64Array');
is.bigInt64Array = isObjectOfType('BigInt64Array');
is.bigUint64Array = isObjectOfType('BigUint64Array');
is.arrayBuffer = isObjectOfType('ArrayBuffer');
is.sharedArrayBuffer = isObjectOfType('SharedArrayBuffer');
is.dataView = isObjectOfType('DataView');
is.enumCase = (value, targetEnum) => Object.values(targetEnum).includes(value);
is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
is.urlInstance = (value) => isObjectOfType('URL')(value);
is.urlString = (value) => {
    if (!is.string(value)) {
        return false;
    }
    try {
        new URL(value); // eslint-disable-line no-new
        return true;
    }
    catch (_a) {
        return false;
    }
};
// Example: `is.truthy = (value: unknown): value is (not false | not 0 | not '' | not undefined | not null) => Boolean(value);`
is.truthy = (value) => Boolean(value);
// Example: `is.falsy = (value: unknown): value is (not true | 0 | '' | undefined | null) => Boolean(value);`
is.falsy = (value) => !value;
is.nan = (value) => Number.isNaN(value);
is.primitive = (value) => is.null_(value) || isPrimitiveTypeName(typeof value);
is.integer = (value) => Number.isInteger(value);
is.safeInteger = (value) => Number.isSafeInteger(value);
is.plainObject = (value) => {
    // From: https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
    if (toString.call(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.getPrototypeOf({});
};
is.typedArray = (value) => isTypedArrayName(getObjectType(value));
const isValidLength = (value) => is.safeInteger(value) && value >= 0;
is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
is.inRange = (value, range) => {
    if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
    }
    if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
    }
    throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
};
const NODE_TYPE_ELEMENT = 1;
const DOM_PROPERTIES_TO_CHECK = [
    'innerHTML',
    'ownerDocument',
    'style',
    'attributes',
    'nodeValue'
];
is.domElement = (value) => {
    return is.object(value) &&
        value.nodeType === NODE_TYPE_ELEMENT &&
        is.string(value.nodeName) &&
        !is.plainObject(value) &&
        DOM_PROPERTIES_TO_CHECK.every(property => property in value);
};
is.observable = (value) => {
    var _a, _b, _c, _d;
    if (!value) {
        return false;
    }
    // eslint-disable-next-line no-use-extend-native/no-use-extend-native
    if (value === ((_b = (_a = value)[Symbol.observable]) === null || _b === void 0 ? void 0 : _b.call(_a))) {
        return true;
    }
    if (value === ((_d = (_c = value)['@@observable']) === null || _d === void 0 ? void 0 : _d.call(_c))) {
        return true;
    }
    return false;
};
is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
is.infinite = (value) => value === Infinity || value === -Infinity;
const isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
is.evenInteger = isAbsoluteMod2(0);
is.oddInteger = isAbsoluteMod2(1);
is.emptyArray = (value) => is.array(value) && value.length === 0;
is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
is.emptyString = (value) => is.string(value) && value.length === 0;
const isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyString = (value) => is.string(value) && value.length > 0;
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyStringAndNotWhitespace = (value) => is.string(value) && !is.emptyStringOrWhitespace(value);
is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
// TODO: Use `not` operator here to remove `Map` and `Set` from type guard:
// - https://github.com/Microsoft/TypeScript/pull/29317
is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
is.emptySet = (value) => is.set(value) && value.size === 0;
is.nonEmptySet = (value) => is.set(value) && value.size > 0;
is.emptyMap = (value) => is.map(value) && value.size === 0;
is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
// `PropertyKey` is any value that can be used as an object key (string, number, or symbol)
is.propertyKey = (value) => is.any([is.string, is.number, is.symbol], value);
is.formData = (value) => isObjectOfType('FormData')(value);
is.urlSearchParams = (value) => isObjectOfType('URLSearchParams')(value);
const predicateOnArray = (method, predicate, values) => {
    if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
    if (values.length === 0) {
        throw new TypeError('Invalid number of values');
    }
    return method.call(values, predicate);
};
is.any = (predicate, ...values) => {
    const predicates = is.array(predicate) ? predicate : [predicate];
    return predicates.some(singlePredicate => predicateOnArray(Array.prototype.some, singlePredicate, values));
};
is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
const assertType = (condition, description, value, options = {}) => {
    if (!condition) {
        const { multipleValues } = options;
        const valuesMessage = multipleValues ?
            `received values of types ${[
                ...new Set(value.map(singleValue => `\`${is(singleValue)}\``))
            ].join(', ')}` :
            `received value of type \`${is(value)}\``;
        throw new TypeError(`Expected value which is \`${description}\`, ${valuesMessage}.`);
    }
};
exports.assert = {
    // Unknowns.
    undefined: (value) => assertType(is.undefined(value), 'undefined', value),
    string: (value) => assertType(is.string(value), 'string', value),
    number: (value) => assertType(is.number(value), 'number', value),
    bigint: (value) => assertType(is.bigint(value), 'bigint', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (value) => assertType(is.function_(value), 'Function', value),
    null_: (value) => assertType(is.null_(value), 'null', value),
    class_: (value) => assertType(is.class_(value), "Class" /* class_ */, value),
    boolean: (value) => assertType(is.boolean(value), 'boolean', value),
    symbol: (value) => assertType(is.symbol(value), 'symbol', value),
    numericString: (value) => assertType(is.numericString(value), "string with a number" /* numericString */, value),
    array: (value, assertion) => {
        const assert = assertType;
        assert(is.array(value), 'Array', value);
        if (assertion) {
            value.forEach(assertion);
        }
    },
    buffer: (value) => assertType(is.buffer(value), 'Buffer', value),
    blob: (value) => assertType(is.blob(value), 'Blob', value),
    nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined" /* nullOrUndefined */, value),
    object: (value) => assertType(is.object(value), 'Object', value),
    iterable: (value) => assertType(is.iterable(value), "Iterable" /* iterable */, value),
    asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable" /* asyncIterable */, value),
    generator: (value) => assertType(is.generator(value), 'Generator', value),
    asyncGenerator: (value) => assertType(is.asyncGenerator(value), 'AsyncGenerator', value),
    nativePromise: (value) => assertType(is.nativePromise(value), "native Promise" /* nativePromise */, value),
    promise: (value) => assertType(is.promise(value), 'Promise', value),
    generatorFunction: (value) => assertType(is.generatorFunction(value), 'GeneratorFunction', value),
    asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), 'AsyncGeneratorFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (value) => assertType(is.asyncFunction(value), 'AsyncFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (value) => assertType(is.boundFunction(value), 'Function', value),
    regExp: (value) => assertType(is.regExp(value), 'RegExp', value),
    date: (value) => assertType(is.date(value), 'Date', value),
    error: (value) => assertType(is.error(value), 'Error', value),
    map: (value) => assertType(is.map(value), 'Map', value),
    set: (value) => assertType(is.set(value), 'Set', value),
    weakMap: (value) => assertType(is.weakMap(value), 'WeakMap', value),
    weakSet: (value) => assertType(is.weakSet(value), 'WeakSet', value),
    int8Array: (value) => assertType(is.int8Array(value), 'Int8Array', value),
    uint8Array: (value) => assertType(is.uint8Array(value), 'Uint8Array', value),
    uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), 'Uint8ClampedArray', value),
    int16Array: (value) => assertType(is.int16Array(value), 'Int16Array', value),
    uint16Array: (value) => assertType(is.uint16Array(value), 'Uint16Array', value),
    int32Array: (value) => assertType(is.int32Array(value), 'Int32Array', value),
    uint32Array: (value) => assertType(is.uint32Array(value), 'Uint32Array', value),
    float32Array: (value) => assertType(is.float32Array(value), 'Float32Array', value),
    float64Array: (value) => assertType(is.float64Array(value), 'Float64Array', value),
    bigInt64Array: (value) => assertType(is.bigInt64Array(value), 'BigInt64Array', value),
    bigUint64Array: (value) => assertType(is.bigUint64Array(value), 'BigUint64Array', value),
    arrayBuffer: (value) => assertType(is.arrayBuffer(value), 'ArrayBuffer', value),
    sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), 'SharedArrayBuffer', value),
    dataView: (value) => assertType(is.dataView(value), 'DataView', value),
    enumCase: (value, targetEnum) => assertType(is.enumCase(value, targetEnum), 'EnumCase', value),
    urlInstance: (value) => assertType(is.urlInstance(value), 'URL', value),
    urlString: (value) => assertType(is.urlString(value), "string with a URL" /* urlString */, value),
    truthy: (value) => assertType(is.truthy(value), "truthy" /* truthy */, value),
    falsy: (value) => assertType(is.falsy(value), "falsy" /* falsy */, value),
    nan: (value) => assertType(is.nan(value), "NaN" /* nan */, value),
    primitive: (value) => assertType(is.primitive(value), "primitive" /* primitive */, value),
    integer: (value) => assertType(is.integer(value), "integer" /* integer */, value),
    safeInteger: (value) => assertType(is.safeInteger(value), "integer" /* safeInteger */, value),
    plainObject: (value) => assertType(is.plainObject(value), "plain object" /* plainObject */, value),
    typedArray: (value) => assertType(is.typedArray(value), "TypedArray" /* typedArray */, value),
    arrayLike: (value) => assertType(is.arrayLike(value), "array-like" /* arrayLike */, value),
    domElement: (value) => assertType(is.domElement(value), "HTMLElement" /* domElement */, value),
    observable: (value) => assertType(is.observable(value), 'Observable', value),
    nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream" /* nodeStream */, value),
    infinite: (value) => assertType(is.infinite(value), "infinite number" /* infinite */, value),
    emptyArray: (value) => assertType(is.emptyArray(value), "empty array" /* emptyArray */, value),
    nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array" /* nonEmptyArray */, value),
    emptyString: (value) => assertType(is.emptyString(value), "empty string" /* emptyString */, value),
    emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace" /* emptyStringOrWhitespace */, value),
    nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string" /* nonEmptyString */, value),
    nonEmptyStringAndNotWhitespace: (value) => assertType(is.nonEmptyStringAndNotWhitespace(value), "non-empty string and not whitespace" /* nonEmptyStringAndNotWhitespace */, value),
    emptyObject: (value) => assertType(is.emptyObject(value), "empty object" /* emptyObject */, value),
    nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object" /* nonEmptyObject */, value),
    emptySet: (value) => assertType(is.emptySet(value), "empty set" /* emptySet */, value),
    nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set" /* nonEmptySet */, value),
    emptyMap: (value) => assertType(is.emptyMap(value), "empty map" /* emptyMap */, value),
    nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map" /* nonEmptyMap */, value),
    propertyKey: (value) => assertType(is.propertyKey(value), 'PropertyKey', value),
    formData: (value) => assertType(is.formData(value), 'FormData', value),
    urlSearchParams: (value) => assertType(is.urlSearchParams(value), 'URLSearchParams', value),
    // Numbers.
    evenInteger: (value) => assertType(is.evenInteger(value), "even integer" /* evenInteger */, value),
    oddInteger: (value) => assertType(is.oddInteger(value), "odd integer" /* oddInteger */, value),
    // Two arguments.
    directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T" /* directInstanceOf */, instance),
    inRange: (value, range) => assertType(is.inRange(value, range), "in range" /* inRange */, value),
    // Variadic functions.
    any: (predicate, ...values) => {
        return assertType(is.any(predicate, ...values), "predicate returns truthy for any value" /* any */, values, { multipleValues: true });
    },
    all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values" /* all */, values, { multipleValues: true })
};
// Some few keywords are reserved, but we'll populate them for Node.js users
// See https://github.com/Microsoft/TypeScript/issues/2536
Object.defineProperties(is, {
    class: {
        value: is.class_
    },
    function: {
        value: is.function_
    },
    null: {
        value: is.null_
    }
});
Object.defineProperties(exports.assert, {
    class: {
        value: exports.assert.class_
    },
    function: {
        value: exports.assert.function_
    },
    null: {
        value: exports.assert.null_
    }
});
exports["default"] = is;
// For CommonJS default export support
module.exports = is;
module.exports["default"] = is;
module.exports.assert = exports.assert;


},
5606(module) {
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


},
5617(module, __unused_rspack_exports, __webpack_require__) {
module.exports = __webpack_require__(8303);

},
8303(__unused_rspack_module, exports, __webpack_require__) {
var RetryOperation = __webpack_require__(3961);

exports.operation = function(options) {
  var timeouts = exports.timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && (options.forever || options.retries === Infinity),
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

exports.timeouts = function(options) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error('minTimeout is greater than maxTimeout');
  }

  var timeouts = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(this.createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(this.createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function(a,b) {
    return a - b;
  });

  return timeouts;
};

exports.createTimeout = function(attempt, opts) {
  var random = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

exports.wrap = function(obj, options, methods) {
  if (options instanceof Array) {
    methods = options;
    options = null;
  }

  if (!methods) {
    methods = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        methods.push(key);
      }
    }
  }

  for (var i = 0; i < methods.length; i++) {
    var method   = methods[i];
    var original = obj[method];

    obj[method] = function retryWrapper(original) {
      var op       = exports.operation(options);
      var args     = Array.prototype.slice.call(arguments, 1);
      var callback = args.pop();

      args.push(function(err) {
        if (op.retry(err)) {
          return;
        }
        if (err) {
          arguments[0] = op.mainError();
        }
        callback.apply(this, arguments);
      });

      op.attempt(function() {
        original.apply(obj, args);
      });
    }.bind(obj, original);
    obj[method].options = options;
  }
};


},
3961(module) {
function RetryOperation(timeouts, options) {
  // Compatibility for the old (timeouts, retryForever) signature
  if (typeof options === 'boolean') {
    options = { forever: options };
  }

  this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
  this._timeouts = timeouts;
  this._options = options || {};
  this._maxRetryTime = options && options.maxRetryTime || Infinity;
  this._fn = null;
  this._errors = [];
  this._attempts = 1;
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;
  this._timer = null;

  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}
module.exports = RetryOperation;

RetryOperation.prototype.reset = function() {
  this._attempts = 1;
  this._timeouts = this._originalTimeouts.slice(0);
}

RetryOperation.prototype.stop = function() {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }
  if (this._timer) {
    clearTimeout(this._timer);
  }

  this._timeouts       = [];
  this._cachedTimeouts = null;
};

RetryOperation.prototype.retry = function(err) {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  if (!err) {
    return false;
  }
  var currentTime = new Date().getTime();
  if (err && currentTime - this._operationStart >= this._maxRetryTime) {
    this._errors.push(err);
    this._errors.unshift(new Error('RetryOperation timeout occurred'));
    return false;
  }

  this._errors.push(err);

  var timeout = this._timeouts.shift();
  if (timeout === undefined) {
    if (this._cachedTimeouts) {
      // retry forever, only keep last error
      this._errors.splice(0, this._errors.length - 1);
      timeout = this._cachedTimeouts.slice(-1);
    } else {
      return false;
    }
  }

  var self = this;
  this._timer = setTimeout(function() {
    self._attempts++;

    if (self._operationTimeoutCb) {
      self._timeout = setTimeout(function() {
        self._operationTimeoutCb(self._attempts);
      }, self._operationTimeout);

      if (self._options.unref) {
          self._timeout.unref();
      }
    }

    self._fn(self._attempts);
  }, timeout);

  if (this._options.unref) {
      this._timer.unref();
  }

  return true;
};

RetryOperation.prototype.attempt = function(fn, timeoutOps) {
  this._fn = fn;

  if (timeoutOps) {
    if (timeoutOps.timeout) {
      this._operationTimeout = timeoutOps.timeout;
    }
    if (timeoutOps.cb) {
      this._operationTimeoutCb = timeoutOps.cb;
    }
  }

  var self = this;
  if (this._operationTimeoutCb) {
    this._timeout = setTimeout(function() {
      self._operationTimeoutCb();
    }, self._operationTimeout);
  }

  this._operationStart = new Date().getTime();

  this._fn(this._attempts);
};

RetryOperation.prototype.try = function(fn) {
  console.log('Using RetryOperation.try() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = function(fn) {
  console.log('Using RetryOperation.start() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = RetryOperation.prototype.try;

RetryOperation.prototype.errors = function() {
  return this._errors;
};

RetryOperation.prototype.attempts = function() {
  return this._attempts;
};

RetryOperation.prototype.mainError = function() {
  if (this._errors.length === 0) {
    return null;
  }

  var counts = {};
  var mainError = null;
  var mainErrorCount = 0;

  for (var i = 0; i < this._errors.length; i++) {
    var error = this._errors[i];
    var message = error.message;
    var count = (counts[message] || 0) + 1;

    counts[message] = count;

    if (count >= mainErrorCount) {
      mainError = error;
      mainErrorCount = count;
    }
  }

  return mainError;
};


},
2861(module, exports, __webpack_require__) {
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(8287)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


},
8310(module, __unused_rspack_exports, __webpack_require__) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = (__webpack_require__(7007)/* .EventEmitter */.EventEmitter);
var inherits = __webpack_require__(6698);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(6891);
Stream.Writable = __webpack_require__(1999);
Stream.Duplex = __webpack_require__(8101);
Stream.Transform = __webpack_require__(9083);
Stream.PassThrough = __webpack_require__(3681);
Stream.finished = __webpack_require__(4257)
Stream.pipeline = __webpack_require__(7648)

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


},
2463(module) {
"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;


},
8101(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
};
/*</replacement>*/

module.exports = Duplex;
var Readable = __webpack_require__(6891);
var Writable = __webpack_require__(1999);
__webpack_require__(6698)(Duplex, Readable);
{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;
  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;
    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}
Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

// the no-half-open enforcer
function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  process.nextTick(onEndNT, this);
}
function onEndNT(self) {
  self.end();
}
Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

},
3681(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;
var Transform = __webpack_require__(9083);
__webpack_require__(6698)(PassThrough, Transform);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}
PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

},
6891(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



module.exports = Readable;

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = (__webpack_require__(7007)/* .EventEmitter */.EventEmitter);
var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(1396);
/*</replacement>*/

var Buffer = (__webpack_require__(8287)/* .Buffer */.Buffer);
var OurUint8Array = (typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*<replacement>*/
var debugUtil = __webpack_require__(9252);
var debug;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/

var BufferList = __webpack_require__(1766);
var destroyImpl = __webpack_require__(4347);
var _require = __webpack_require__(6644),
  getHighWaterMark = _require.getHighWaterMark;
var _require$codes = (__webpack_require__(2463)/* .codes */.codes),
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
  ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;

// Lazy loaded to improve the startup performance.
var StringDecoder;
var createReadableStreamAsyncIterator;
var from;
__webpack_require__(6698)(Readable, Stream);
var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}
function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(8101);
  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true;

  // Should close be emitted on destroy. Defaults to true.
  this.emitClose = options.emitClose !== false;

  // Should .destroy() be called after 'end' (and potentially 'finish')
  this.autoDestroy = !!options.autoDestroy;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = (__webpack_require__(3141)/* .StringDecoder */.StringDecoder);
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {
  Duplex = Duplex || __webpack_require__(8101);
  if (!(this instanceof Readable)) return new Readable(options);

  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5
  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex);

  // legacy
  this.readable = true;
  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }
  Stream.call(this);
}
Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;
  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }
  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};
function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  }

  // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.
  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}
function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }
  return er;
}
Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = (__webpack_require__(3141)/* .StringDecoder */.StringDecoder);
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder;
  // If setEncoding(null), decoder.encoding equals utf8
  this._readableState.encoding = this._readableState.decoder.encoding;

  // Iterate over current buffer to convert already stored Buffers:
  var p = this._readableState.buffer.head;
  var content = '';
  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }
  this._readableState.buffer.clear();
  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
};

// Don't raise the hwm > 1GB
var MAX_HWM = 0x40000000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }
  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }
  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;
  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }
  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }
  if (ret !== null) this.emit('data', ret);
  return ret;
};
function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;
  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;
    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}
function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);
  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  }

  // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.
  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}
function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};
Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;
  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }
  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);
    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);
  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }
  return dest;
};
function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}
Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    for (var i = 0; i < len; i++) dests[i].emit('unpipe', this, {
      hasUnpiped: false
    });
    return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;
  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0;

    // Try start flowing on next tick if stream isn't explicitly paused
    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);
      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }
  return res;
};
Readable.prototype.addListener = Readable.prototype.on;
Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);
  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }
  return res;
};
Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);
  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }
  return res;
};
function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;
  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true;

    // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}
function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()
    state.flowing = !state.readableListening;
    resume(this, state);
  }
  state.paused = false;
  return this;
};
function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}
function resume_(stream, state) {
  debug('resume', state.reading);
  if (!state.reading) {
    stream.read(0);
  }
  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}
Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  this._readableState.paused = true;
  return this;
};
function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null);
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;
  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }
    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };
  return this;
};
if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = __webpack_require__(5034);
    }
    return createReadableStreamAsyncIterator(this);
  };
}
Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
});

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}
function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);
  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}
function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length);

  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;
      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}
if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = __webpack_require__(968);
    }
    return from(Readable, iterable, opts);
  };
}
function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

},
9083(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;
var _require$codes = (__webpack_require__(2463)/* .codes */.codes),
  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
  ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
  ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
  ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
var Duplex = __webpack_require__(8101);
__webpack_require__(6698)(Transform, Duplex);
function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }
  ts.writechunk = null;
  ts.writecb = null;
  if (data != null)
    // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}
function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}
function prefinish() {
  var _this = this;
  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}
Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};
Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;
  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};
Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};
function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null)
    // single equals check for both `null` and `undefined`
    stream.push(data);

  // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}

},
1999(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;
  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(4643)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(1396);
/*</replacement>*/

var Buffer = (__webpack_require__(8287)/* .Buffer */.Buffer);
var OurUint8Array = (typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
var destroyImpl = __webpack_require__(4347);
var _require = __webpack_require__(6644),
  getHighWaterMark = _require.getHighWaterMark;
var _require$codes = (__webpack_require__(2463)/* .codes */.codes),
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
  ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
  ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
  ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
  ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
  ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
  ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
var errorOrDestroy = destroyImpl.errorOrDestroy;
__webpack_require__(6698)(Writable, Stream);
function nop() {}
function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(8101);
  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // Should close be emitted on destroy. Defaults to true.
  this.emitClose = options.emitClose !== false;

  // Should .destroy() be called after 'finish' (and potentially 'end')
  this.autoDestroy = !!options.autoDestroy;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}
function Writable(options) {
  Duplex = Duplex || __webpack_require__(8101);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.

  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5
  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex);

  // legacy.
  this.writable = true;
  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }
  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};
function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END();
  // TODO: defer error events consistently everywhere, not just the cb
  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var er;
  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }
  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }
  return true;
}
Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);
  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }
  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }
  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};
Writable.prototype.cork = function () {
  this._writableState.corked++;
};
Writable.prototype.uncork = function () {
  var state = this._writableState;
  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};
Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}
Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;
  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }
  return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}
function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}
function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;
    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }
    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}
function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;
  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }
    if (entry === null) state.lastBufferedRequest = null;
  }
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}
Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};
Writable.prototype._writev = null;
Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;
  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }
  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending) endWritable(this, state, cb);
  return this;
};
Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});
function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      errorOrDestroy(stream, err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}
function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;
        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }
  return need;
}
function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}
function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }

  // reuse the free corkReq.
  state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  cb(err);
};

},
5034(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
/* provided dependency */ var process = __webpack_require__(5606);


var _Object$setPrototypeO;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var finished = __webpack_require__(4257);
var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');
function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}
function readAndResolve(iter) {
  var resolve = iter[kLastResolve];
  if (resolve !== null) {
    var data = iter[kStream].read();
    // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'
    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}
function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}
function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }
      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}
var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },
  next: function next() {
    var _this = this;
    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];
    if (error !== null) {
      return Promise.reject(error);
    }
    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }
    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    }

    // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time
    var lastPromise = this[kLastPromise];
    var promise;
    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();
      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }
      promise = new Promise(this[kHandlePromise]);
    }
    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;
  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);
var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;
  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();
      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject];
      // reject if we are waiting for data in the Promise
      // returned by next() and store the error
      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }
      iterator[kError] = err;
      return;
    }
    var resolve = iterator[kLastResolve];
    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }
    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};
module.exports = createReadableStreamAsyncIterator;

},
1766(module, __unused_rspack_exports, __webpack_require__) {
"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = __webpack_require__(8287),
  Buffer = _require.Buffer;
var _require2 = __webpack_require__(2088),
  inspect = _require2.inspect;
var custom = inspect && inspect.custom || 'inspect';
function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}
module.exports = /*#__PURE__*/function () {
  function BufferList() {
    _classCallCheck(this, BufferList);
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;
      while (p = p.next) ret += s + p.data;
      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;
      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }
      return ret;
    }

    // Consumes a specified amount of bytes or characters from the buffered data.
  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;
      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }
      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    }

    // Consumes a specified amount of characters from the buffered data.
  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;
      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;
        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }
          break;
        }
        ++c;
      }
      this.length -= c;
      return ret;
    }

    // Consumes a specified amount of bytes from the buffered data.
  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;
      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;
        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }
          break;
        }
        ++c;
      }
      this.length -= c;
      return ret;
    }

    // Make sure the linked list only shows the minimal necessary information.
  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);
  return BufferList;
}();

},
4347(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
/* provided dependency */ var process = __webpack_require__(5606);


// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;
  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;
  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }
  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });
  return this;
}
function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}
function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}
function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }
  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}
function emitErrorNT(self, err) {
  self.emit('error', err);
}
function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.

  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}
module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};

},
4257(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).



var ERR_STREAM_PREMATURE_CLOSE = (__webpack_require__(2463)/* .codes.ERR_STREAM_PREMATURE_CLOSE */.codes.ERR_STREAM_PREMATURE_CLOSE);
function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    callback.apply(this, args);
  };
}
function noop() {}
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}
function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;
  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };
  var writableEnded = stream._writableState && stream._writableState.finished;
  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };
  var readableEnded = stream._readableState && stream._readableState.endEmitted;
  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };
  var onerror = function onerror(err) {
    callback.call(stream, err);
  };
  var onclose = function onclose() {
    var err;
    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };
  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };
  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }
  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}
module.exports = eos;

},
968(module) {
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};


},
7648(module, __unused_rspack_exports, __webpack_require__) {
"use strict";
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).



var eos;
function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}
var _require$codes = (__webpack_require__(2463)/* .codes */.codes),
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
  ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}
function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = __webpack_require__(4257);
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true;

    // request.destroy just do .end - .abort is what we want
    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}
function call(fn) {
  fn();
}
function pipe(from, to) {
  return from.pipe(to);
}
function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}
function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }
  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];
  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }
  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}
module.exports = pipeline;

},
6644(module, __unused_rspack_exports, __webpack_require__) {
"use strict";


var ERR_INVALID_OPT_VALUE = (__webpack_require__(2463)/* .codes.ERR_INVALID_OPT_VALUE */.codes.ERR_INVALID_OPT_VALUE);
function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }
    return Math.floor(hwm);
  }

  // Default value
  return state.objectMode ? 16 : 16 * 1024;
}
module.exports = {
  getHighWaterMark: getHighWaterMark
};

},
1396(module, __unused_rspack_exports, __webpack_require__) {
module.exports = __webpack_require__(7007)/* .EventEmitter */.EventEmitter;


},
3141(__unused_rspack_module, exports, __webpack_require__) {
"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = (__webpack_require__(2861)/* .Buffer */.Buffer);
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

},
4643(module, __unused_rspack_exports, __webpack_require__) {

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!__webpack_require__.g.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = __webpack_require__.g.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}


},
302(module) {
"use strict";

module.exports = function (str) {
	return !isNaN(Date.parse(str));
};


},
433(module) {
function webpackEmptyAsyncContext(req) {
  // Here Promise.resolve().then() is used instead of new Promise() to prevent
  // uncaught exception popping up in devtools
  return Promise.resolve().then(function() {
    var e = new Error("Cannot find module '" + req + "'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
  });
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 433;
module.exports = webpackEmptyAsyncContext;


},
1089(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApifyApiError: () => (ApifyApiError)
});
/* import */ var _swc_helpers_define_property__rspack_import_2 = __webpack_require__(467);
/* import */ var _body_parser__rspack_import_0 = __webpack_require__(732);
/* import */ var _utils__rspack_import_1 = __webpack_require__(9435);



/**
 * Examples of capturing groups for "...at ActorCollectionClient._list (/Users/..."
 * 0: "at ActorCollectionClient._list ("
 * 1: undefined
 * 2: "ActorCollectionClient"
 * 3: undefined
 * 4: "list"
 * @private
 */ const CLIENT_METHOD_REGEX = /at( async)? ([A-Za-z]+(Collection)?Client)\._?([A-Za-z]+) \(/;
/**
 * An `ApifyApiError` is thrown for successful HTTP requests that reach the API,
 * but the API responds with an error response. Typically, those are rate limit
 * errors and internal errors, which are automatically retried, or validation
 * errors, which are thrown immediately, because a correction by the user is
 * needed.
 */ class ApifyApiError extends Error {
    _safelyParsePathFromResponse(response) {
        var _response_config;
        const urlString = (_response_config = response.config) === null || _response_config === void 0 ? void 0 : _response_config.url;
        let url;
        try {
            url = new URL(urlString);
        } catch  {
            return urlString;
        }
        return url.pathname + url.search;
    }
    _extractClientAndMethodFromStack() {
        const match = this.stack.match(CLIENT_METHOD_REGEX);
        if (match) return `${match[2]}.${match[4]}`;
        return 'unknown';
    }
    /**
     * Creates a better looking and more informative stack that will be printed
     * out when API errors are thrown.
     *
     * Example:
     *
     * ApifyApiError: Actor task was not found
     *   clientMethod: TaskClient.start
     *   statusCode: 404
     *   type: record-not-found
     *   attempt: 1
     *   httpMethod: post
     *   path: /v2/actor-tasks/user~my-task/runs
     */ _createApiStack() {
        const { name, ...props } = this;
        const stack = Object.entries(props).map((param)=>{
            let [k, v] = param;
            // Rename originalStack to stack in the stack itself.
            // This is for better readability of errors in log.
            if (k === 'originalStack') k = 'stack';
            return `  ${k}: ${v}`;
        }).join('\n');
        return `${name}: ${this.message}\n${stack}`;
    }
    /**
     * @hidden
     */ constructor(response, attempt){
        var _response_config;
        let message;
        let type;
        let responseData = response.data;
        let errorData;
        // Some methods (e.g. downloadItems) set up forceBuffer on request response. If this request failed
        // the body buffer needs to parse to get the correct error.
        if ((0,_utils__rspack_import_1.isBuffer)(responseData)) {
            try {
                responseData = JSON.parse((0,_body_parser__rspack_import_0.isomorphicBufferToString)(response.data, 'utf-8'));
            } catch  {
            // This can happen. The data in the response body are malformed.
            }
        }
        if (responseData && responseData.error) {
            const { error } = responseData;
            message = error.message;
            type = error.type;
            errorData = error.data;
        } else if (responseData) {
            let dataString;
            try {
                dataString = JSON.stringify(responseData, null, 2);
            } catch  {
                dataString = `${responseData}`;
            }
            message = `Unexpected error: ${dataString}`;
        }
        super(message), (0,_swc_helpers_define_property__rspack_import_2._)(this, "name", void 0), /**
     * The invoked resource client and the method. Known issue: Sometimes it displays
     * as `unknown` because it can't be parsed from a stack trace.
     */ (0,_swc_helpers_define_property__rspack_import_2._)(this, "clientMethod", void 0), /**
     * HTTP status code of the error.
     */ (0,_swc_helpers_define_property__rspack_import_2._)(this, "statusCode", void 0), /**
     * The type of the error, as returned by the API.
     */ (0,_swc_helpers_define_property__rspack_import_2._)(this, "type", void 0), /**
     * Number of the API call attempt.
     */ (0,_swc_helpers_define_property__rspack_import_2._)(this, "attempt", void 0), /**
     * HTTP method of the API call.
     */ (0,_swc_helpers_define_property__rspack_import_2._)(this, "httpMethod", void 0), /**
     * Full path of the API endpoint (URL excluding origin).
     */ (0,_swc_helpers_define_property__rspack_import_2._)(this, "path", void 0), /**
     * Original stack trace of the exception. It is replaced
     * by a more informative stack with API call information.
     */ (0,_swc_helpers_define_property__rspack_import_2._)(this, "originalStack", void 0), /**
     * Additional data provided by the API about the error
     */ (0,_swc_helpers_define_property__rspack_import_2._)(this, "data", void 0);
        this.name = this.constructor.name;
        this.clientMethod = this._extractClientAndMethodFromStack();
        this.statusCode = response.status;
        this.type = type;
        this.attempt = attempt;
        this.httpMethod = (_response_config = response.config) === null || _response_config === void 0 ? void 0 : _response_config.method;
        this.path = this._safelyParsePathFromResponse(response);
        const stack = this.stack;
        this.originalStack = stack.slice(stack.indexOf('\n'));
        this.stack = this._createApiStack();
        this.data = errorData;
    }
}


},
1353(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApifyClient: () => (ApifyClient)
});
/* import */ var _swc_helpers_define_property__rspack_import_27 = __webpack_require__(467);
/* import */ var ow__rspack_import_26 = __webpack_require__(4980);
/* import */ var ow__rspack_import_26_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_26);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _apify_log__rspack_import_1 = __webpack_require__(1199);
/* import */ var _http_client__rspack_import_2 = __webpack_require__(1768);
/* import */ var _resource_clients_actor__rspack_import_3 = __webpack_require__(5121);
/* import */ var _resource_clients_actor_collection__rspack_import_4 = __webpack_require__(1504);
/* import */ var _resource_clients_build__rspack_import_5 = __webpack_require__(5400);
/* import */ var _resource_clients_build_collection__rspack_import_6 = __webpack_require__(6675);
/* import */ var _resource_clients_dataset__rspack_import_7 = __webpack_require__(9032);
/* import */ var _resource_clients_dataset_collection__rspack_import_8 = __webpack_require__(1075);
/* import */ var _resource_clients_key_value_store__rspack_import_9 = __webpack_require__(5419);
/* import */ var _resource_clients_key_value_store_collection__rspack_import_10 = __webpack_require__(5614);
/* import */ var _resource_clients_log__rspack_import_11 = __webpack_require__(4386);
/* import */ var _resource_clients_request_queue__rspack_import_12 = __webpack_require__(1117);
/* import */ var _resource_clients_request_queue_collection__rspack_import_13 = __webpack_require__(228);
/* import */ var _resource_clients_run__rspack_import_14 = __webpack_require__(8506);
/* import */ var _resource_clients_run_collection__rspack_import_15 = __webpack_require__(6084);
/* import */ var _resource_clients_schedule__rspack_import_16 = __webpack_require__(4011);
/* import */ var _resource_clients_schedule_collection__rspack_import_17 = __webpack_require__(158);
/* import */ var _resource_clients_store_collection__rspack_import_18 = __webpack_require__(1836);
/* import */ var _resource_clients_task__rspack_import_19 = __webpack_require__(355);
/* import */ var _resource_clients_task_collection__rspack_import_20 = __webpack_require__(502);
/* import */ var _resource_clients_user__rspack_import_21 = __webpack_require__(4057);
/* import */ var _resource_clients_webhook__rspack_import_22 = __webpack_require__(6829);
/* import */ var _resource_clients_webhook_collection__rspack_import_23 = __webpack_require__(5076);
/* import */ var _resource_clients_webhook_dispatch__rspack_import_24 = __webpack_require__(7958);
/* import */ var _resource_clients_webhook_dispatch_collection__rspack_import_25 = __webpack_require__(5821);
/* import */ var _statistics__rspack_import_28 = __webpack_require__(5663);
/* provided dependency */ var process = __webpack_require__(5606);





























const DEFAULT_TIMEOUT_SECS = 360;
/**
 * The official JavaScript client for the Apify API.
 *
 * Provides programmatic access to all Apify platform resources including Actors, runs, datasets,
 * key-value stores, request queues, and more. Works in both Node.js and browser environments.
 *
 * @example
 * ```javascript
 * import { ApifyClient } from 'apify-client';
 *
 * const client = new ApifyClient({ token: 'my-token' });
 *
 * // Start an Actor and wait for it to finish
 * const run = await client.actor('my-actor-id').call();
 *
 * // Fetch dataset items
 * const { items } = await client.dataset(run.defaultDatasetId).listItems();
 * ```
 *
 * @see https://docs.apify.com/api/v2
 */ class ApifyClient {
    _options() {
        return {
            baseUrl: this.baseUrl,
            publicBaseUrl: this.publicBaseUrl,
            apifyClient: this,
            httpClient: this.httpClient
        };
    }
    /**
     * Returns a client for managing Actors in your account.
     *
     * Provides access to the Actor collection, allowing you to list, create, and search for Actors.
     *
     * @returns A client for the Actors collection
     * @see https://docs.apify.com/api/v2/acts-get
     */ actors() {
        return new _resource_clients_actor_collection__rspack_import_4.ActorCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific Actor.
     *
     * Use this to get, update, delete, start, or call an Actor, as well as manage its builds,
     * runs, versions, and webhooks.
     *
     * @param id - Actor ID or username/name
     * @returns A client for the specific Actor
     * @see https://docs.apify.com/api/v2/act-get
     *
     * @example
     * ```javascript
     * // Call an Actor and wait for it to finish
     * const run = await client.actor('apify/web-scraper').call({ url: 'https://example.com' });
     * ```
     */ actor(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_actor__rspack_import_3.ActorClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for managing Actor builds in your account.
     *
     * Lists all builds across all of your Actors.
     *
     * @returns A client for Actor builds collection
     * @see https://docs.apify.com/api/v2/actor-builds-get
     */ builds() {
        return new _resource_clients_build_collection__rspack_import_6.BuildCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific Actor build.
     *
     * Use this to get details about a build, wait for it to finish, or access its logs.
     *
     * @param id - Build ID
     * @returns A client for the specified build
     * @see https://docs.apify.com/api/v2/actor-build-get
     */ build(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_build__rspack_import_5.BuildClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for managing datasets in your account.
     *
     * Datasets store structured data results from Actor runs. Use this to list or create datasets.
     *
     * @returns A client for the Datasets collection
     * @see https://docs.apify.com/api/v2/datasets-get
     */ datasets() {
        return new _resource_clients_dataset_collection__rspack_import_8.DatasetCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific dataset.
     *
     * Use this to read, write, and manage items in the dataset. Datasets contain structured
     * data stored as individual items (records).
     *
     * @template Data - Type of items stored in the dataset
     * @param id - Dataset ID or name
     * @returns A client for the specific Dataset
     * @see https://docs.apify.com/api/v2/dataset-get
     *
     * @example
     * ```javascript
     * // Push items to a dataset
     * await client.dataset('my-dataset').pushItems([
     *   { url: 'https://example.com', title: 'Example' },
     *   { url: 'https://test.com', title: 'Test' }
     * ]);
     *
     * // Retrieve items
     * const { items } = await client.dataset('my-dataset').listItems();
     * ```
     */ dataset(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_dataset__rspack_import_7.DatasetClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for managing key-value stores in your account.
     *
     * Key-value stores are used to store arbitrary data records or files.
     *
     * @returns A client for the Key-value stores collection
     * @see https://docs.apify.com/api/v2/key-value-stores-get
     */ keyValueStores() {
        return new _resource_clients_key_value_store_collection__rspack_import_10.KeyValueStoreCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific key-value store.
     *
     * Use this to read, write, and delete records in the store. Key-value stores can hold
     * any type of data including text, JSON, images, and other files.
     *
     * @param id - Key-value store ID or name
     * @returns A client for the specific key-value store
     * @see https://docs.apify.com/api/v2/key-value-store-get
     *
     * @example
     * ```javascript
     * // Save a record
     * await client.keyValueStore('my-store').setRecord({ key: 'OUTPUT', value: { foo: 'bar' } });
     *
     * // Get a record
     * const record = await client.keyValueStore('my-store').getRecord('OUTPUT');
     * ```
     */ keyValueStore(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_key_value_store__rspack_import_9.KeyValueStoreClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for accessing logs of an Actor build or run.
     *
     * @param buildOrRunId - Build ID or run ID
     * @returns A client for accessing logs
     * @see https://docs.apify.com/api/v2/log-get
     */ log(buildOrRunId) {
        ow__rspack_import_26_default()(buildOrRunId, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_log__rspack_import_11.LogClient({
            id: buildOrRunId,
            ...this._options()
        });
    }
    /**
     * Returns a client for managing request queues in your account.
     *
     * Request queues store URLs to be crawled, along with their metadata.
     *
     * @returns A client for the Request queues collection
     * @see https://docs.apify.com/api/v2/request-queues-get
     */ requestQueues() {
        return new _resource_clients_request_queue_collection__rspack_import_13.RequestQueueCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific request queue.
     *
     * Use this to add, retrieve, and manage requests in the queue. Request queues are used
     * by web crawlers to manage URLs that need to be visited.
     *
     * @param id - Request queue ID or name
     * @param options - Configuration options for the request queue client
     * @returns A client for the specific Request queue
     * @see https://docs.apify.com/api/v2/request-queue-get
     *
     * @example
     * ```javascript
     * // Add requests to a queue
     * const queue = client.requestQueue('my-queue');
     * await queue.addRequest({ url: 'https://example.com', uniqueKey: 'example' });
     *
     * // Get and lock the next request
     * const { items } = await queue.listAndLockHead({ lockSecs: 60 });
     * ```
     */ requestQueue(id) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        ow__rspack_import_26_default()(options, ow__rspack_import_26_default().object.exactShape({
            clientKey: (ow__rspack_import_26_default().optional.string.nonEmpty),
            timeoutSecs: (ow__rspack_import_26_default().optional.number)
        }));
        const apiClientOptions = {
            id,
            ...this._options()
        };
        return new _resource_clients_request_queue__rspack_import_12.RequestQueueClient(apiClientOptions, options);
    }
    /**
     * Returns a client for managing Actor runs in your account.
     *
     * Lists all runs across all of your Actors.
     *
     * @returns A client for the run collection
     * @see https://docs.apify.com/api/v2/actor-runs-get
     */ runs() {
        return new _resource_clients_run_collection__rspack_import_15.RunCollectionClient({
            ...this._options(),
            resourcePath: 'actor-runs'
        });
    }
    /**
     * Returns a client for a specific Actor run.
     *
     * Use this to get details about a run, wait for it to finish, abort it, or access its
     * dataset, key-value store, and request queue.
     *
     * @param id - Run ID
     * @returns A client for the specified run
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Wait for a run to finish
     * const run = await client.run('run-id').waitForFinish();
     *
     * // Access run's dataset
     * const { items } = await client.run('run-id').dataset().listItems();
     * ```
     */ run(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_run__rspack_import_14.RunClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for managing Actor tasks in your account.
     *
     * Tasks are pre-configured Actor runs with stored input that can be executed repeatedly.
     *
     * @returns A client for the task collection
     * @see https://docs.apify.com/api/v2/actor-tasks-get
     */ tasks() {
        return new _resource_clients_task_collection__rspack_import_20.TaskCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific Actor task.
     *
     * Use this to get, update, delete, or run a task with pre-configured input.
     *
     * @param id - Task ID or username/task-name
     * @returns A client for the specified task
     * @see https://docs.apify.com/api/v2/actor-task-get
     *
     * @example
     * ```javascript
     * // Run a task and wait for it to finish
     * const run = await client.task('my-task').call();
     * ```
     */ task(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_task__rspack_import_19.TaskClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for managing schedules in your account.
     *
     * Schedules automatically start Actor or task runs at specified times.
     *
     * @returns A client for the Schedules collection
     * @see https://docs.apify.com/api/v2/schedules-get
     */ schedules() {
        return new _resource_clients_schedule_collection__rspack_import_17.ScheduleCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific schedule.
     *
     * Use this to get, update, or delete a schedule.
     *
     * @param id - Schedule ID
     * @returns A client for the specific Schedule
     * @see https://docs.apify.com/api/v2/schedule-get
     */ schedule(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_schedule__rspack_import_16.ScheduleClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for accessing user data.
     *
     * By default, returns information about the current user (determined by the API token).
     *
     * @param id - User ID or username. Defaults to 'me' (current user)
     * @returns A client for the user
     * @see https://docs.apify.com/api/v2/user-get
     */ user() {
        let id = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _apify_consts__rspack_import_0.ME_USER_NAME_PLACEHOLDER;
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_user__rspack_import_21.UserClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for managing webhooks in your account.
     *
     * Webhooks notify external services when specific events occur (e.g., Actor run finishes).
     *
     * @returns A client for the Webhooks collection
     * @see https://docs.apify.com/api/v2/webhooks-get
     */ webhooks() {
        return new _resource_clients_webhook_collection__rspack_import_23.WebhookCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific webhook.
     *
     * Use this to get, update, delete, or test a webhook.
     *
     * @param id - Webhook ID
     * @returns A client for the specific webhook
     * @see https://docs.apify.com/api/v2/webhook-get
     */ webhook(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_webhook__rspack_import_22.WebhookClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for viewing webhook dispatches in your account.
     *
     * Webhook dispatches represent individual invocations of webhooks.
     *
     * @returns A client for the webhook dispatches collection
     * @see https://docs.apify.com/api/v2/webhook-dispatches-get
     */ webhookDispatches() {
        return new _resource_clients_webhook_dispatch_collection__rspack_import_25.WebhookDispatchCollectionClient(this._options());
    }
    /**
     * Returns a client for a specific webhook dispatch.
     *
     * @param id - Webhook dispatch ID
     * @returns A client for the specific webhook dispatch
     * @see https://docs.apify.com/api/v2/webhook-dispatch-get
     */ webhookDispatch(id) {
        ow__rspack_import_26_default()(id, (ow__rspack_import_26_default().string.nonEmpty));
        return new _resource_clients_webhook_dispatch__rspack_import_24.WebhookDispatchClient({
            id,
            ...this._options()
        });
    }
    /**
     * Returns a client for browsing Actors in Apify Store.
     *
     * Use this to search and retrieve information about public Actors.
     *
     * @returns A client for the Apify Store
     * @see https://docs.apify.com/api/v2/store-get
     */ store() {
        return new _resource_clients_store_collection__rspack_import_18.StoreCollectionClient(this._options());
    }
    /**
     * Sets a status message for the current Actor run.
     *
     * This is a convenience method that updates the status message of the run specified by
     * the `ACTOR_RUN_ID` environment variable. Only works when called from within an Actor run.
     *
     * @param message - The status message to set
     * @param options - Additional options for the status message
     * @throws {Error} If `ACTOR_RUN_ID` environment variable is not set
     */ async setStatusMessage(message, options) {
        const runId = process.env[_apify_consts__rspack_import_0.ACTOR_ENV_VARS.RUN_ID];
        if (!runId) {
            throw new Error(`Environment variable ${_apify_consts__rspack_import_0.ACTOR_ENV_VARS.RUN_ID} is not set!`);
        }
        await this.run(runId).update({
            statusMessage: message,
            ...options
        });
    }
    constructor(options = {}){
        (0,_swc_helpers_define_property__rspack_import_27._)(this, "baseUrl", void 0);
        (0,_swc_helpers_define_property__rspack_import_27._)(this, "publicBaseUrl", void 0);
        (0,_swc_helpers_define_property__rspack_import_27._)(this, "token", void 0);
        (0,_swc_helpers_define_property__rspack_import_27._)(this, "stats", void 0);
        (0,_swc_helpers_define_property__rspack_import_27._)(this, "logger", void 0);
        (0,_swc_helpers_define_property__rspack_import_27._)(this, "httpClient", void 0);
        ow__rspack_import_26_default()(options, ow__rspack_import_26_default().object.exactShape({
            baseUrl: (ow__rspack_import_26_default().optional.string),
            publicBaseUrl: (ow__rspack_import_26_default().optional.string),
            maxRetries: (ow__rspack_import_26_default().optional.number),
            minDelayBetweenRetriesMillis: (ow__rspack_import_26_default().optional.number),
            requestInterceptors: (ow__rspack_import_26_default().optional.array),
            timeoutSecs: (ow__rspack_import_26_default().optional.number),
            token: (ow__rspack_import_26_default().optional.string),
            userAgentSuffix: ow__rspack_import_26_default().optional.any((ow__rspack_import_26_default().string), ow__rspack_import_26_default().array.ofType((ow__rspack_import_26_default().string)))
        }));
        const { baseUrl = 'https://api.apify.com', publicBaseUrl = 'https://api.apify.com', maxRetries = 8, minDelayBetweenRetriesMillis = 500, requestInterceptors = [], timeoutSecs = DEFAULT_TIMEOUT_SECS, token } = options;
        const tempBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, baseUrl.length - 1) : baseUrl;
        this.baseUrl = `${tempBaseUrl}/v2`;
        const tempPublicBaseUrl = publicBaseUrl.endsWith('/') ? publicBaseUrl.slice(0, publicBaseUrl.length - 1) : publicBaseUrl;
        this.publicBaseUrl = `${tempPublicBaseUrl}/v2`;
        this.token = token;
        this.stats = new _statistics__rspack_import_28.Statistics();
        this.logger = _apify_log__rspack_import_1["default"].child({
            prefix: 'ApifyClient'
        });
        this.httpClient = new _http_client__rspack_import_2.HttpClient({
            apifyClientStats: this.stats,
            maxRetries,
            minDelayBetweenRetriesMillis,
            requestInterceptors,
            timeoutSecs,
            logger: this.logger,
            token: this.token,
            userAgentSuffix: options.userAgentSuffix
        });
    }
}


},
3346(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiClient: () => (ApiClient)
});
/* import */ var _swc_helpers_define_property__rspack_import_0 = __webpack_require__(467);

/** @private */ class ApiClient {
    _subResourceOptions(moreOptions) {
        const baseOptions = {
            baseUrl: this._url(),
            publicBaseUrl: this.publicBaseUrl,
            apifyClient: this.apifyClient,
            httpClient: this.httpClient,
            params: this._params()
        };
        return {
            ...baseOptions,
            ...moreOptions
        };
    }
    _url(path) {
        return path ? `${this.url}/${path}` : this.url;
    }
    _publicUrl(path) {
        const url = this.id ? `${this.publicBaseUrl}/${this.resourcePath}/${this.safeId}` : `${this.publicBaseUrl}/${this.resourcePath}`;
        return path ? `${url}/${path}` : url;
    }
    _params(endpointParams) {
        return {
            ...this.params,
            ...endpointParams
        };
    }
    _toSafeId(id) {
        // The id has the format `username/actor-name`, so we only need to replace the first `/`.
        return id.replace('/', '~');
    }
    /**
     * Returns async iterator to iterate through all items and Promise that can be awaited to get first page of results.
     */ _listPaginatedFromCallback(getPaginatedList) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const minForLimitParam = (a, b)=>{
            // API treats 0 as undefined for limit parameter
            if (a === 0) a = undefined;
            if (b === 0) b = undefined;
            if (a === undefined) return b;
            if (b === undefined) return a;
            return Math.min(a, b);
        };
        const paginatedListPromise = getPaginatedList({
            ...options,
            limit: minForLimitParam(options.limit, options.chunkSize)
        });
        async function* asyncGenerator() {
            let currentPage = await paginatedListPromise;
            yield* currentPage.items;
            const offset = options.offset ?? 0;
            const limit = Math.min(options.limit || currentPage.total, currentPage.total);
            let currentOffset = offset + currentPage.items.length;
            let remainingItems = Math.min(currentPage.total - offset, limit) - currentPage.items.length;
            while(currentPage.items.length > 0 && // Continue only if at least some items were returned in the last page.
            remainingItems > 0){
                const newOptions = {
                    ...options,
                    limit: minForLimitParam(remainingItems, options.chunkSize),
                    offset: currentOffset
                };
                currentPage = await getPaginatedList(newOptions);
                yield* currentPage.items;
                currentOffset += currentPage.items.length;
                remainingItems -= currentPage.items.length;
            }
        }
        return Object.defineProperty(paginatedListPromise, Symbol.asyncIterator, {
            value: asyncGenerator
        });
    }
    constructor(options){
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "id", void 0);
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "safeId", void 0);
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "baseUrl", void 0);
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "publicBaseUrl", void 0);
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "resourcePath", void 0);
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "url", void 0);
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "apifyClient", void 0);
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "httpClient", void 0);
        (0,_swc_helpers_define_property__rspack_import_0._)(this, "params", void 0);
        const { baseUrl, publicBaseUrl, apifyClient, httpClient, resourcePath, id, params = {} } = options;
        this.id = id;
        this.safeId = id && this._toSafeId(id);
        this.baseUrl = baseUrl;
        this.publicBaseUrl = publicBaseUrl;
        this.resourcePath = resourcePath;
        this.url = id ? `${baseUrl}/${resourcePath}/${this.safeId}` : `${baseUrl}/${resourcePath}`;
        this.apifyClient = apifyClient;
        this.httpClient = httpClient;
        this.params = params;
    }
}


},
2528(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DEFAULT_TIMEOUT_MILLIS: () => (DEFAULT_TIMEOUT_MILLIS),
  MEDIUM_TIMEOUT_MILLIS: () => (MEDIUM_TIMEOUT_MILLIS),
  ResourceClient: () => (ResourceClient),
  SMALL_TIMEOUT_MILLIS: () => (SMALL_TIMEOUT_MILLIS)
});
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _utils__rspack_import_1 = __webpack_require__(9435);
/* import */ var _api_client__rspack_import_2 = __webpack_require__(3346);



/**
 * We need to supply some number for the API,
 * because it would not accept "Infinity".
 * 999999 seconds is more than 10 days.
 */ const MAX_WAIT_FOR_FINISH = 999999;
const SMALL_TIMEOUT_MILLIS = 5 * 1000; // For fast and common actions. Suitable for idempotent actions.
const MEDIUM_TIMEOUT_MILLIS = 30 * 1000; // For actions that may take longer.
const DEFAULT_TIMEOUT_MILLIS = 360 * 1000; // 6 minutes
/**
 * Resource client.
 * @private
 */ class ResourceClient extends _api_client__rspack_import_2.ApiClient {
    async _get() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, timeoutMillis = arguments.length > 1 ? arguments[1] : void 0;
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(options),
            timeout: timeoutMillis
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_1.parseDateFields)((0,_utils__rspack_import_1.pluckData)(response.data));
        } catch (err) {
            (0,_utils__rspack_import_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    async _update(newFields, timeoutMillis) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'PUT',
            params: this._params(),
            data: newFields,
            timeout: timeoutMillis
        });
        return (0,_utils__rspack_import_1.parseDateFields)((0,_utils__rspack_import_1.pluckData)(response.data));
    }
    async _delete(timeoutMillis) {
        try {
            await this.httpClient.call({
                url: this._url(),
                method: 'DELETE',
                params: this._params(),
                timeout: timeoutMillis
            });
        } catch (err) {
            (0,_utils__rspack_import_1.catchNotFoundOrThrow)(err);
        }
    }
    /**
     * This function is used in Build and Run endpoints so it's kept
     * here to stay DRY.
     */ async _waitForFinish() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const { waitSecs = MAX_WAIT_FOR_FINISH } = options;
        const waitMillis = waitSecs * 1000;
        let job;
        const startedAt = Date.now();
        const shouldRepeat = ()=>{
            const millisSinceStart = Date.now() - startedAt;
            if (millisSinceStart >= waitMillis) return false;
            const hasJobEnded = job && _apify_consts__rspack_import_0.ACT_JOB_TERMINAL_STATUSES.includes(job.status);
            return !hasJobEnded;
        };
        do {
            const millisSinceStart = Date.now() - startedAt;
            const remainingWaitSeconds = Math.round((waitMillis - millisSinceStart) / 1000);
            const waitForFinish = Math.max(0, remainingWaitSeconds);
            const requestOpts = {
                url: this._url(),
                method: 'GET',
                params: this._params({
                    waitForFinish
                })
            };
            try {
                const response = await this.httpClient.call(requestOpts);
                job = (0,_utils__rspack_import_1.parseDateFields)((0,_utils__rspack_import_1.pluckData)(response.data));
            } catch (err) {
                (0,_utils__rspack_import_1.catchNotFoundOrThrow)(err);
                job = undefined;
            }
            // It might take some time for database replicas to get up-to-date,
            // so getRun() might return null. Wait a little bit and try it again.
            if (!job) await new Promise((resolve)=>{
                setTimeout(resolve, 250);
            });
        }while (shouldRepeat());
        if (!job) {
            const constructorName = this.constructor.name;
            const jobName = constructorName.match(/(\w+)Client/)[1].toLowerCase();
            throw new Error(`Waiting for ${jobName} to finish failed. Cannot fetch actor ${jobName} details from the server.`);
        }
        return job;
    }
}


},
577(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ResourceCollectionClient: () => (ResourceCollectionClient)
});
/* import */ var _utils__rspack_import_0 = __webpack_require__(9435);
/* import */ var _api_client__rspack_import_1 = __webpack_require__(3346);


/**
 * Resource collection client.
 * @private
 */ class ResourceCollectionClient extends _api_client__rspack_import_1.ApiClient {
    /**
     * @private
     */ async _list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'GET',
            params: this._params(options)
        });
        return (0,_utils__rspack_import_0.parseDateFields)((0,_utils__rspack_import_0.pluckData)(response.data));
    }
    /**
     * Returns async iterator to iterate through all items and Promise that can be awaited to get first page of results.
     */ _listPaginated() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return this._listPaginatedFromCallback(this._list.bind(this), options);
    }
    async _create(resource) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'POST',
            params: this._params(),
            data: resource
        });
        return (0,_utils__rspack_import_0.parseDateFields)((0,_utils__rspack_import_0.pluckData)(response.data));
    }
    async _getOrCreate(name, resource) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'POST',
            params: this._params({
                name
            }),
            data: resource
        });
        return (0,_utils__rspack_import_0.parseDateFields)((0,_utils__rspack_import_0.pluckData)(response.data));
    }
}


},
732(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isomorphicBufferToString: () => (isomorphicBufferToString),
  maybeParseBody: () => (maybeParseBody)
});
/* import */ var content_type__rspack_import_0 = __webpack_require__(8597);
/* import */ var _utils__rspack_import_1 = __webpack_require__(9435);
/* provided dependency */ var Buffer = __webpack_require__(8287)["Buffer"];


const CONTENT_TYPE_JSON = 'application/json';
const STRINGIFIABLE_CONTENT_TYPE_RXS = [
    new RegExp(`^${CONTENT_TYPE_JSON}`, 'i'),
    /^application\/.*xml$/i,
    /^text\//i
];
/**
 * Parses a Buffer or ArrayBuffer using the provided content type header.
 *
 * - application/json is returned as a parsed object.
 * - application/*xml and text/* are returned as strings.
 * - everything else is returned as original body.
 *
 * If the header includes a charset, the body will be stringified only
 * if the charset represents a known encoding to Node.js or Browser.
 */ function maybeParseBody(body, contentTypeHeader) {
    let contentType;
    let charset;
    try {
        const result = content_type__rspack_import_0.parse(contentTypeHeader);
        contentType = result.type;
        charset = result.parameters.charset;
    } catch  {
        // can't parse, keep original body
        return body;
    }
    // If we can't successfully parse it, we return
    // the original buffer rather than a mangled string.
    if (!areDataStringifiable(contentType, charset)) return body;
    const dataString = isomorphicBufferToString(body, charset);
    return contentType === CONTENT_TYPE_JSON ? JSON.parse(dataString) : dataString;
}
function isomorphicBufferToString(buffer, encoding) {
    if (buffer.constructor.name !== ArrayBuffer.name) {
        return buffer.toString(encoding);
    }
    // Browser decoding only works with UTF-8.
    const utf8decoder = new TextDecoder();
    return utf8decoder.decode(new Uint8Array(buffer));
}
function isCharsetStringifiable(charset) {
    if (!charset) return true; // hope that it's utf-8
    if ((0,_utils__rspack_import_1.isNode)()) return Buffer.isEncoding(charset);
    const normalizedCharset = charset.toLowerCase().replace('-', '');
    // Browsers only support decoding utf-8 buffers.
    return normalizedCharset === 'utf8';
}
function isContentTypeStringifiable(contentType) {
    if (!contentType) return false; // keep buffer
    return STRINGIFIABLE_CONTENT_TYPE_RXS.some((rx)=>rx.test(contentType));
}
function areDataStringifiable(contentType, charset) {
    return isContentTypeStringifiable(contentType) && isCharsetStringifiable(charset);
}


},
1768(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HttpClient: () => (HttpClient)
});
/* import */ var _swc_helpers_define_property__rspack_import_5 = __webpack_require__(467);
/* import */ var async_retry__rspack_import_0 = __webpack_require__(7336);
/* import */ var async_retry__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(async_retry__rspack_import_0);
/* import */ var axios__rspack_import_6 = __webpack_require__(3110);
/* import */ var _apify_consts__rspack_import_1 = __webpack_require__(6125);
/* import */ var _apify_api_error__rspack_import_2 = __webpack_require__(1089);
/* import */ var _interceptors__rspack_import_3 = __webpack_require__(4928);
/* import */ var _utils__rspack_import_4 = __webpack_require__(9435);
/* provided dependency */ var process = __webpack_require__(5606);







const { version } = (0,_utils__rspack_import_4.getVersionData)();
const RATE_LIMIT_EXCEEDED_STATUS_CODE = 429;
class HttpClient {
    async ensureNodeInit() {
        if (!(0,_utils__rspack_import_4.isNode)()) return;
        this.nodeInitPromise ?? (this.nodeInitPromise = this.initNode());
        return this.nodeInitPromise;
    }
    async initNode() {
        if (!(0,_utils__rspack_import_4.isNode)()) return;
        const [{ ProxyAgent }, os] = await Promise.all([
            // eslint-disable-next-line @typescript-eslint/consistent-type-imports
            (0,_utils__rspack_import_4.dynamicNodeImport)('proxy-agent'),
            // eslint-disable-next-line @typescript-eslint/consistent-type-imports
            (0,_utils__rspack_import_4.dynamicNodeImport)('node:os')
        ]);
        // We want to keep sockets alive for better performance.
        // Enhanced agent configuration based on agentkeepalive best practices:
        // - Nagle's algorithm disabled for lower latency
        // - Free socket timeout to prevent socket leaks
        // - LIFO scheduling to reuse recent sockets
        // - Socket TTL for connection freshness
        const agentOptions = {
            keepAlive: true,
            // Timeout for inactive sockets
            // Prevents socket leaks from idle connections
            timeout: this.timeoutMillis,
            // Keep alive timeout for free sockets (15 seconds)
            // Node.js will close unused sockets after this period
            keepAliveMsecs: 15000,
            // Maximum number of sockets per host
            maxSockets: 256,
            maxFreeSockets: 256,
            // LIFO scheduling - reuse most recently used sockets for better performance
            scheduling: 'lifo'
        };
        // Use ProxyAgent which automatically detects proxy from environment variables
        // and supports CONNECT tunneling
        const proxyAgent = new ProxyAgent(agentOptions);
        this.httpAgent = proxyAgent;
        this.httpsAgent = proxyAgent;
        // Disable Nagle's algorithm for lower latency
        // This sends data immediately instead of buffering small packets
        const setNoDelay = (socket)=>{
            socket.setNoDelay(true);
        };
        this.httpAgent.on('socket', setNoDelay);
        this.httpsAgent.on('socket', setNoDelay);
        this.axios.defaults.httpAgent = this.httpAgent;
        this.axios.defaults.httpsAgent = this.httpsAgent;
        // Works only in Node. Cannot be set in browser
        const isAtHome = !!process.env[_apify_consts__rspack_import_1.APIFY_ENV_VARS.IS_AT_HOME];
        let userAgent = `ApifyClient/${version} (${os.type()}; Node/${process.version}); isAtHome/${isAtHome}`;
        if (this.userAgentSuffix) {
            userAgent += `; ${(0,_utils__rspack_import_4.asArray)(this.userAgentSuffix).join('; ')}`;
        }
        this.axios.defaults.headers['User-Agent'] = userAgent;
    }
    async call(config) {
        await this.ensureNodeInit();
        this.stats.calls++;
        const makeRequest = this._createRequestHandler(config);
        return async_retry__rspack_import_0_default()(makeRequest, {
            retries: this.maxRetries,
            minTimeout: this.minDelayBetweenRetriesMillis,
            onRetry: this._onRequestRetry
        });
    }
    _informAboutStreamNoRetry() {
        this.logger.warningOnce('Request body was a stream - retrying will not work, as part of it was already consumed.');
        this.logger.warningOnce('If you want Apify client to handle retries for you, collect the stream into a buffer before sending it.');
    }
    /**
     * Successful responses are returned, errors and unsuccessful
     * status codes are retried. See the following functions for the
     * retrying logic.
     */ _createRequestHandler(config) {
        const makeRequest = async (stopTrying, attempt)=>{
            this.stats.requests++;
            let response;
            const requestIsStream = (0,_utils__rspack_import_4.isStream)(config.data);
            try {
                if (requestIsStream) {
                    // Handling redirects is not possible without buffering - part of the stream has already been sent and can't be recovered
                    // when server sends the redirect. Therefore we need to override this in Axios config to prevent it from buffering the body.
                    // see also axios/axios#1045
                    config = {
                        ...config,
                        maxRedirects: 0
                    };
                }
                // Increase timeout with each attempt. Max timeout is bounded by the client timeout.
                config.timeout = Math.min(this.timeoutMillis, (config.timeout ?? this.timeoutMillis) * 2 ** (attempt - 1));
                response = await this.axios.request(config);
                if (this._isStatusOk(response.status)) return response;
            } catch (err) {
                return (0,_utils__rspack_import_4.cast)(this._handleRequestError(err, config, stopTrying));
            }
            if (response.status === RATE_LIMIT_EXCEEDED_STATUS_CODE) {
                this.stats.addRateLimitError(attempt);
            }
            const apiError = new _apify_api_error__rspack_import_2.ApifyApiError(response, attempt);
            if (this._isStatusCodeRetryable(response.status)) {
                if (requestIsStream) {
                    this._informAboutStreamNoRetry();
                } else {
                    // allow a retry
                    throw apiError;
                }
            }
            stopTrying(apiError);
            return response;
        };
        return makeRequest;
    }
    _isStatusOk(statusCode) {
        return statusCode < 300;
    }
    /**
     * Handles all unexpected errors that can happen, but are not
     * Apify API typed errors. E.g. network errors, timeouts and so on.
     */ _handleRequestError(err, config, stopTrying) {
        if (this._isTimeoutError(err) && config.doNotRetryTimeouts) {
            return stopTrying(err);
        }
        if (this._isRetryableError(err)) {
            if ((0,_utils__rspack_import_4.isStream)(config.data)) {
                this._informAboutStreamNoRetry();
            } else {
                throw err;
            }
        }
        return stopTrying(err);
    }
    /**
     * Axios calls req.abort() on timeouts so timeout errors will
     * have a code ECONNABORTED.
     */ _isTimeoutError(err) {
        return err.code === 'ECONNABORTED';
    }
    /**
     * We don't want to retry every exception thrown from Axios.
     * The common denominator for retryable errors are network issues.
     * @param {Error} err
     * @private
     */ _isRetryableError(err) {
        return this._isNetworkError(err) || this._isResponseBodyInvalid(err);
    }
    /**
     * When a network connection to our API is interrupted in the middle of streaming
     * a response, the request often does not fail, but simply contains
     * an incomplete response. This can often be fixed by retrying.
     */ _isResponseBodyInvalid(err) {
        return err instanceof _interceptors__rspack_import_3.InvalidResponseBodyError;
    }
    /**
     * When a network request is attempted by axios and fails,
     * it throws an AxiosError, which will have the request
     * and config (and other) properties.
     */ _isNetworkError(err) {
        const hasRequest = err.request && typeof err.request === 'object';
        const hasConfig = err.config && typeof err.config === 'object';
        return hasRequest && hasConfig;
    }
    /**
     * We retry 429 (rate limit) and 500+.
     * For status codes 300-499 (except 429) we do not retry the request,
     * because it's probably caused by invalid url (redirect 3xx) or invalid user input (4xx).
     */ _isStatusCodeRetryable(statusCode) {
        const isRateLimitError = statusCode === RATE_LIMIT_EXCEEDED_STATUS_CODE;
        const isInternalError = statusCode >= 500;
        return isRateLimitError || isInternalError;
    }
    _onRequestRetry(error, attempt) {
        if (attempt === Math.round(this.maxRetries / 2)) {
            this.logger.warning(`API request failed ${attempt} times. Max attempts: ${this.maxRetries + 1}.\nCause:${error.stack}`);
        }
    }
    constructor(options){
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "stats", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "maxRetries", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "minDelayBetweenRetriesMillis", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "userProvidedRequestInterceptors", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "logger", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "timeoutMillis", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "httpAgent", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "httpsAgent", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "axios", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "workflowKey", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "nodeInitPromise", void 0);
        (0,_swc_helpers_define_property__rspack_import_5._)(this, "userAgentSuffix", void 0);
        const { token } = options;
        this.stats = options.apifyClientStats;
        this.maxRetries = options.maxRetries;
        this.minDelayBetweenRetriesMillis = options.minDelayBetweenRetriesMillis;
        this.userProvidedRequestInterceptors = options.requestInterceptors;
        this.timeoutMillis = options.timeoutSecs * 1000;
        this.logger = options.logger;
        this.workflowKey = options.workflowKey || process.env[_apify_consts__rspack_import_1.APIFY_ENV_VARS.WORKFLOW_KEY];
        this.userAgentSuffix = options.userAgentSuffix;
        this._onRequestRetry = this._onRequestRetry.bind(this);
        this.axios = axios__rspack_import_6["default"].create({
            // Disable axios's built-in proxy handling since we're using custom agents
            proxy: false,
            paramsSerializer: (params)=>{
                const formattedParams = Object.entries(params).filter((param)=>{
                    let [, value] = param;
                    return value !== undefined;
                }).map((param)=>{
                    let [key, value] = param;
                    if (value instanceof Date) {
                        return [
                            key,
                            value.toISOString()
                        ];
                    }
                    const updatedValue = typeof value === 'boolean' ? Number(value) : value;
                    return [
                        key,
                        String(updatedValue)
                    ];
                });
                return new URLSearchParams(formattedParams).toString();
            },
            validateStatus: null,
            // Using interceptors for this functionality.
            transformRequest: undefined,
            transformResponse: undefined,
            responseType: 'arraybuffer',
            timeout: this.timeoutMillis,
            // maxBodyLength needs to be Infinity, because -1 falls back to a 10 MB default
            // from an axios subdependency - 'follow-redirects'
            maxBodyLength: Infinity,
            // maxContentLength must be -1, because Infinity will cause axios to run super slow
            // thanks to a bug that's now fixed, but not released yet https://github.com/axios/axios/pull/3738
            maxContentLength: -1
        });
        // Clean all default headers because they only make a mess and their merging is difficult to understand and buggy.
        this.axios.defaults.headers = new axios__rspack_import_6.AxiosHeaders();
        // If workflow key is available, pass it as a header
        if (this.workflowKey) {
            this.axios.defaults.headers['X-Apify-Workflow-Key'] = this.workflowKey;
        }
        // Attach Authorization header for all requests if token was provided
        if (token) {
            this.axios.defaults.headers.Authorization = `Bearer ${token}`;
        }
        _interceptors__rspack_import_3.requestInterceptors.forEach((i)=>this.axios.interceptors.request.use(i));
        this.userProvidedRequestInterceptors.forEach((i)=>this.axios.interceptors.request.use(i));
        _interceptors__rspack_import_3.responseInterceptors.forEach((i)=>this.axios.interceptors.response.use(i));
    }
}


},
4928(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InvalidResponseBodyError: () => (InvalidResponseBodyError),
  requestInterceptors: () => (requestInterceptors),
  responseInterceptors: () => (responseInterceptors)
});
/* import */ var _swc_helpers_define_property__rspack_import_3 = __webpack_require__(467);
/* import */ var axios__rspack_import_4 = __webpack_require__(3110);
/* import */ var content_type__rspack_import_0 = __webpack_require__(8597);
/* import */ var _body_parser__rspack_import_1 = __webpack_require__(732);
/* import */ var _utils__rspack_import_2 = __webpack_require__(9435);





/**
 * This error exists for the quite common situation, where only a partial JSON response is received and
 * an attempt to parse the JSON throws an error. In most cases this can be resolved by retrying the
 * request. We do that by identifying this error in HttpClient.
 *
 * The properties mimic AxiosError for easier integration in HttpClient error handling.
 */ class InvalidResponseBodyError extends Error {
    constructor(response, cause){
        super(`Response body could not be parsed.\nCause:${cause.message}`), (0,_swc_helpers_define_property__rspack_import_3._)(this, "code", void 0), (0,_swc_helpers_define_property__rspack_import_3._)(this, "response", void 0);
        this.name = this.constructor.name;
        this.code = 'invalid-response-body';
        this.response = response;
        this.cause = cause;
    }
}
function serializeRequest(config) {
    const [defaultTransform] = axios__rspack_import_4["default"].defaults.transformRequest;
    // The function not only serializes data, but it also adds correct headers.
    const data = defaultTransform(config.data, config.headers);
    // Actor inputs can include functions and we don't want to omit those,
    // because it's convenient for users. JSON.stringify removes them.
    // It's a bit inefficient that we serialize the JSON twice, but I feel
    // it's a small price to pay. The axios default transform does a lot
    // of body type checks and we would have to copy all of them to the resource clients.
    if (config.stringifyFunctions) {
        var _config_headers, _config_headers1;
        const contentTypeHeader = ((_config_headers = config.headers) === null || _config_headers === void 0 ? void 0 : _config_headers['Content-Type']) || ((_config_headers1 = config.headers) === null || _config_headers1 === void 0 ? void 0 : _config_headers1['content-type']);
        try {
            const { type } = content_type__rspack_import_0.parse(contentTypeHeader);
            if (type === 'application/json' && typeof config.data === 'object') {
                config.data = stringifyWithFunctions(config.data);
            } else {
                config.data = data;
            }
        } catch  {
            config.data = data;
        }
    } else {
        config.data = data;
    }
    return config;
}
function ensureHeadersPrototype(config) {
    if (config.headers && !(config.headers instanceof axios__rspack_import_4.AxiosHeaders)) {
        Object.setPrototypeOf(config.headers, axios__rspack_import_4.AxiosHeaders.prototype);
    }
    return config;
}
/**
 * JSON.stringify() that serializes functions to string instead
 * of replacing them with null or removing them.
 */ function stringifyWithFunctions(obj) {
    return JSON.stringify(obj, (_key, value)=>{
        return typeof value === 'function' ? value.toString() : value;
    });
}
async function maybeGzipRequest(config) {
    var _config_headers;
    if ((_config_headers = config.headers) === null || _config_headers === void 0 ? void 0 : _config_headers['content-encoding']) return config;
    const maybeZippedData = await (0,_utils__rspack_import_2.maybeGzipValue)(config.data);
    if (maybeZippedData) {
        var _config;
        (_config = config).headers ?? (_config.headers = {});
        config.headers['content-encoding'] = 'gzip';
        config.data = maybeZippedData;
    }
    return config;
}
function parseResponseData(response) {
    if (!response.data || // Nothing to do here.
    response.config.responseType !== 'arraybuffer' || // We don't want to parse custom response types.
    response.config.forceBuffer // Apify custom property to prevent parsing of buffer.
    ) {
        return response;
    }
    const isBufferEmpty = (0,_utils__rspack_import_2.isNode)() ? !response.data.length : !response.data.byteLength;
    if (isBufferEmpty) {
        // undefined is better than an empty buffer
        response.data = undefined;
        return response;
    }
    const contentTypeHeader = response.headers['content-type'];
    try {
        response.data = (0,_body_parser__rspack_import_1.maybeParseBody)(response.data, contentTypeHeader);
    } catch (err) {
        throw new InvalidResponseBodyError(response, err);
    }
    return response;
}
const requestInterceptors = [
    maybeGzipRequest,
    serializeRequest,
    ensureHeadersPrototype
];
const responseInterceptors = [
    parseResponseData
];


},
5121(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActorClient: () => (ActorClient)
});
/* import */ var ow__rspack_import_11 = __webpack_require__(4980);
/* import */ var ow__rspack_import_11_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_11);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _apify_log__rspack_import_1 = __webpack_require__(1199);
/* import */ var _base_resource_client__rspack_import_2 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_3 = __webpack_require__(9435);
/* import */ var _actor_version__rspack_import_4 = __webpack_require__(822);
/* import */ var _actor_version_collection__rspack_import_5 = __webpack_require__(525);
/* import */ var _build__rspack_import_6 = __webpack_require__(5400);
/* import */ var _build_collection__rspack_import_7 = __webpack_require__(6675);
/* import */ var _run__rspack_import_8 = __webpack_require__(8506);
/* import */ var _run_collection__rspack_import_9 = __webpack_require__(6084);
/* import */ var _webhook_collection__rspack_import_10 = __webpack_require__(5076);












/**
 * Client for managing a specific Actor.
 *
 * Provides methods to start, call, build, update, and delete an Actor, as well as manage its
 * versions, builds, runs, and webhooks.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 *
 * // Start an Actor
 * const run = await actorClient.start(input, { memory: 256 });
 *
 * // Call an Actor and wait for it to finish
 * const finishedRun = await actorClient.call({ url: 'https://example.com' });
 * ```
 *
 * @see https://docs.apify.com/platform/actors
 */ class ActorClient extends _base_resource_client__rspack_import_2.ResourceClient {
    /**
     * Gets the Actor object from the Apify API.
     *
     * @returns The Actor object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/act-get
     */ async get() {
        return this._get();
    }
    /**
     * Updates the Actor with specified fields.
     *
     * @param newFields - Fields to update in the Actor
     * @returns The updated Actor object
     * @see https://docs.apify.com/api/v2/act-put
     */ async update(newFields) {
        ow__rspack_import_11_default()(newFields, (ow__rspack_import_11_default().object));
        return this._update(newFields);
    }
    /**
     * Deletes the Actor.
     *
     * @see https://docs.apify.com/api/v2/act-delete
     */ async delete() {
        return this._delete();
    }
    /**
     * Starts the Actor and immediately returns the Run object.
     *
     * The Actor run can be configured with optional input and various options. The run starts
     * asynchronously and this method returns immediately without waiting for completion.
     * Use the {@link call} method if you want to wait for the Actor to finish.
     *
     * @param input - Input for the Actor. Can be any JSON-serializable value (object, array, string, number).
     *                If `contentType` is specified in options, input should be a string or Buffer.
     * @param options - Run configuration options
     * @param options.build - Tag or number of the build to run (e.g., `'beta'` or `'1.2.345'`). If not provided, uses the default build.
     * @param options.memory - Memory in megabytes allocated for the run. If not provided, uses the Actor's default memory setting.
     * @param options.timeout - Timeout for the run in seconds. Zero means no timeout. If not provided, uses the Actor's default timeout.
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the run to finish on the API side before returning. Default is 0 (returns immediately).
     * @param options.webhooks - Webhooks to trigger when the Actor run reaches a specific state (e.g., `SUCCEEDED`, `FAILED`).
     * @param options.maxItems - Maximum number of dataset items that will be charged (only for pay-per-result Actors).
     * @param options.maxTotalChargeUsd - Maximum cost in USD (only for pay-per-event Actors).
     * @param options.contentType - Content type of the input. If specified, input must be a string or Buffer.
     * @returns The Actor run object with status, usage, and storage IDs
     * @see https://docs.apify.com/api/v2/act-runs-post
     *
     * @example
     * ```javascript
     * // Start Actor with simple input
     * const run = await client.actor('my-actor').start({ url: 'https://example.com' });
     * console.log(`Run started with ID: ${run.id}, status: ${run.status}`);
     *
     * // Start Actor with specific build and memory
     * const run = await client.actor('my-actor').start(
     *   { url: 'https://example.com' },
     *   { build: '0.1.2', memory: 512, timeout: 300 }
     * );
     * ```
     */ async start(input) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        // input can be anything, so no point in validating it. E.g. if you set content-type to application/pdf
        // then it will process input as a buffer.
        ow__rspack_import_11_default()(options, ow__rspack_import_11_default().object.exactShape({
            build: (ow__rspack_import_11_default().optional.string),
            contentType: (ow__rspack_import_11_default().optional.string),
            memory: (ow__rspack_import_11_default().optional.number),
            timeout: (ow__rspack_import_11_default().optional.number),
            waitForFinish: (ow__rspack_import_11_default().optional.number),
            webhooks: ow__rspack_import_11_default().optional.array.ofType((ow__rspack_import_11_default().object)),
            maxItems: (ow__rspack_import_11_default().optional.number.not.negative),
            maxTotalChargeUsd: (ow__rspack_import_11_default().optional.number.not.negative),
            restartOnError: (ow__rspack_import_11_default().optional.boolean),
            forcePermissionLevel: ow__rspack_import_11_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.ACTOR_PERMISSION_LEVEL))
        }));
        const { waitForFinish, timeout, memory, build, maxItems, maxTotalChargeUsd, restartOnError, forcePermissionLevel } = options;
        const params = {
            waitForFinish,
            timeout,
            memory,
            build,
            webhooks: (0,_utils__rspack_import_3.stringifyWebhooksToBase64)(options.webhooks),
            maxItems,
            maxTotalChargeUsd,
            restartOnError,
            forcePermissionLevel
        };
        const request = {
            url: this._url('runs'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            // TODO: remove this ts-expect-error once we migrate HttpClient to TS and define Apify
            // extension of Axios configs
            // @ts-expect-error Apify extension
            stringifyFunctions: true
        };
        if (options.contentType) {
            request.headers = {
                'content-type': options.contentType
            };
        }
        const response = await this.httpClient.call(request);
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
    }
    /**
     * Starts the Actor and waits for it to finish before returning the Run object.
     *
     * This is a convenience method that starts the Actor run and waits for its completion
     * by polling the run status. It optionally streams logs to the console or a custom Log instance.
     * By default, it waits indefinitely unless the `waitSecs` option is provided.
     *
     * @param input - Input for the Actor. Can be any JSON-serializable value (object, array, string, number).
     *                If `contentType` is specified in options, input should be a string or Buffer.
     * @param options - Run configuration options (extends all options from {@link start})
     * @param options.waitSecs - Maximum time to wait for the run to finish, in seconds. If omitted, waits indefinitely.
     * @param options.log - Log instance for streaming run logs. Use `'default'` for console output, `null` to disable logging, or provide a custom Log instance.
     * @param options.build - Tag or number of the build to run (e.g., `'beta'` or `'1.2.345'`).
     * @param options.memory - Memory in megabytes allocated for the run.
     * @param options.timeout - Maximum run duration in seconds.
     * @returns The finished Actor run object with final status (`SUCCEEDED`, `FAILED`, `ABORTED`, or `TIMED-OUT`)
     * @see https://docs.apify.com/api/v2/act-runs-post
     *
     * @example
     * ```javascript
     * // Run an Actor and wait for it to finish
     * const run = await client.actor('my-actor').call({ url: 'https://example.com' });
     * console.log(`Run finished with status: ${run.status}`);
     * console.log(`Dataset ID: ${run.defaultDatasetId}`);
     *
     * // Run with a timeout and log streaming to console
     * const run = await client.actor('my-actor').call(
     *   { url: 'https://example.com' },
     *   { waitSecs: 300, log: 'default' }
     * );
     *
     * // Run with custom log instance
     * import { Log } from '@apify/log';
     * const log = new Log({ prefix: 'My Actor' });
     * const run = await client.actor('my-actor').call({ url: 'https://example.com' }, { log });
     * ```
     */ async call(input) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        // input can be anything, so no point in validating it. E.g. if you set content-type to application/pdf
        // then it will process input as a buffer.
        ow__rspack_import_11_default()(options, ow__rspack_import_11_default().object.exactShape({
            build: (ow__rspack_import_11_default().optional.string),
            contentType: (ow__rspack_import_11_default().optional.string),
            memory: (ow__rspack_import_11_default().optional.number),
            timeout: (ow__rspack_import_11_default().optional.number.not.negative),
            waitSecs: (ow__rspack_import_11_default().optional.number.not.negative),
            webhooks: ow__rspack_import_11_default().optional.array.ofType((ow__rspack_import_11_default().object)),
            maxItems: (ow__rspack_import_11_default().optional.number.not.negative),
            maxTotalChargeUsd: (ow__rspack_import_11_default().optional.number.not.negative),
            log: ow__rspack_import_11_default().optional.any((ow__rspack_import_11_default()["null"]), ow__rspack_import_11_default().object.instanceOf(_apify_log__rspack_import_1.Log), ow__rspack_import_11_default().string.equals('default')),
            restartOnError: (ow__rspack_import_11_default().optional.boolean),
            forcePermissionLevel: ow__rspack_import_11_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.ACTOR_PERMISSION_LEVEL))
        }));
        const { waitSecs, log, ...startOptions } = options;
        const { id } = await this.start(input, startOptions);
        // Calling root client because we need access to top level API.
        // Creating a new instance of RunClient here would only allow
        // setting it up as a nested route under actor API.
        const newRunClient = this.apifyClient.run(id);
        const streamedLog = await newRunClient.getStreamedLog({
            toLog: options === null || options === void 0 ? void 0 : options.log
        });
        streamedLog === null || streamedLog === void 0 ? void 0 : streamedLog.start();
        return this.apifyClient.run(id).waitForFinish({
            waitSecs
        }).finally(async ()=>{
            await (streamedLog === null || streamedLog === void 0 ? void 0 : streamedLog.stop());
        });
    }
    /**
     * Builds the Actor.
     *
     * Creates a new build of the specified Actor version. The build compiles the Actor's
     * source code, installs dependencies, and prepares it for execution.
     *
     * @param versionNumber - Version number or tag to build (e.g., `'0.1'`, `'0.2'`, `'latest'`)
     * @param options - Build configuration options
     * @param options.betaPackages - If `true`, the build uses beta versions of Apify NPM packages.
     * @param options.tag - Tag to be applied to the build (e.g., `'latest'`, `'beta'`). Existing tag with the same name will be replaced.
     * @param options.useCache - If `false`, Docker build cache will be ignored. Default is `true`.
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the build to finish on the API side before returning. Default is 0 (returns immediately).
     * @returns The Build object with status and build details
     * @see https://docs.apify.com/api/v2/act-builds-post
     *
     * @example
     * ```javascript
     * // Start a build and return immediately
     * const build = await client.actor('my-actor').build('0.1');
     * console.log(`Build ${build.id} started with status: ${build.status}`);
     *
     * // Build and wait up to 120 seconds for it to finish
     * const build = await client.actor('my-actor').build('0.1', {
     *   waitForFinish: 120,
     *   tag: 'latest',
     *   useCache: true
     * });
     * ```
     */ async build(versionNumber) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_11_default()(versionNumber, (ow__rspack_import_11_default().string));
        ow__rspack_import_11_default()(options, ow__rspack_import_11_default().object.exactShape({
            betaPackages: (ow__rspack_import_11_default().optional.boolean),
            tag: (ow__rspack_import_11_default().optional.string),
            useCache: (ow__rspack_import_11_default().optional.boolean),
            waitForFinish: (ow__rspack_import_11_default().optional.number)
        }));
        const response = await this.httpClient.call({
            url: this._url('builds'),
            method: 'POST',
            params: this._params({
                version: versionNumber,
                ...options
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
    }
    /**
     * Retrieves the default build of the Actor.
     *
     * @param options - Options for getting the build.
     * @returns A client for the default build.
     * @see https://docs.apify.com/api/v2/act-build-default-get
     */ async defaultBuild() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const response = await this.httpClient.call({
            url: this._url('builds/default'),
            method: 'GET',
            params: this._params(options)
        });
        const { id } = (0,_utils__rspack_import_3.pluckData)(response.data);
        return new _build__rspack_import_6.BuildClient({
            baseUrl: this.apifyClient.baseUrl,
            publicBaseUrl: this.apifyClient.publicBaseUrl,
            httpClient: this.httpClient,
            apifyClient: this.apifyClient,
            id
        });
    }
    /**
     * Returns a client for the last run of this Actor.
     *
     * Provides access to the most recent Actor run, optionally filtered by status or origin.
     *
     * @param options - Options to filter the last run
     * @param options.status - Filter by run status (e.g., `'SUCCEEDED'`, `'FAILED'`, `'RUNNING'`, `'ABORTED'`, `'TIMED-OUT'`).
     * @param options.origin - Filter by run origin (e.g., `'DEVELOPMENT'`, `'WEB'`, `'API'`, `'SCHEDULER'`).
     * @returns A client for the last run
     * @see https://docs.apify.com/api/v2/act-runs-last-get
     *
     * @example
     * ```javascript
     * // Get the last successful run
     * const lastRun = await client.actor('my-actor').lastRun({ status: 'SUCCEEDED' }).get();
     * ```
     */ lastRun() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_11_default()(options, ow__rspack_import_11_default().object.exactShape({
            status: ow__rspack_import_11_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.ACT_JOB_STATUSES)),
            origin: ow__rspack_import_11_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.META_ORIGINS))
        }));
        return new _run__rspack_import_8.RunClient(this._subResourceOptions({
            id: 'last',
            params: this._params(options),
            resourcePath: 'runs'
        }));
    }
    /**
     * Returns a client for managing builds of this Actor.
     *
     * @returns A client for the Actor's build collection
     * @see https://docs.apify.com/api/v2/act-builds-get
     */ builds() {
        return new _build_collection__rspack_import_7.BuildCollectionClient(this._subResourceOptions({
            resourcePath: 'builds'
        }));
    }
    /**
     * Returns a client for managing runs of this Actor.
     *
     * @returns A client for the Actor's run collection
     * @see https://docs.apify.com/api/v2/act-runs-get
     */ runs() {
        return new _run_collection__rspack_import_9.RunCollectionClient(this._subResourceOptions({
            resourcePath: 'runs'
        }));
    }
    /**
     * Returns a client for a specific version of this Actor.
     *
     * @param versionNumber - Version number (e.g., '0.1', '1.2.3')
     * @returns A client for the specified Actor version
     * @see https://docs.apify.com/api/v2/act-version-get
     */ version(versionNumber) {
        ow__rspack_import_11_default()(versionNumber, (ow__rspack_import_11_default().string));
        return new _actor_version__rspack_import_4.ActorVersionClient(this._subResourceOptions({
            id: versionNumber
        }));
    }
    /**
     * Returns a client for managing versions of this Actor.
     *
     * @returns A client for the Actor's version collection
     * @see https://docs.apify.com/api/v2/act-versions-get
     */ versions() {
        return new _actor_version_collection__rspack_import_5.ActorVersionCollectionClient(this._subResourceOptions());
    }
    /**
     * Returns a client for managing webhooks associated with this Actor.
     *
     * @returns A client for the Actor's webhook collection
     * @see https://docs.apify.com/api/v2/act-webhooks-get
     */ webhooks() {
        return new _webhook_collection__rspack_import_10.WebhookCollectionClient(this._subResourceOptions());
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'acts',
            ...options
        });
    }
}


},
1504(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActorCollectionClient: () => (ActorCollectionClient),
  ActorListSortBy: () => (ActorListSortBy)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for managing the collection of Actors in your account.
 *
 * Provides methods to list and create Actors. To access an individual Actor,
 * use the `actor()` method on the main ApifyClient.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorsClient = client.actors();
 *
 * // List all Actors
 * const { items } = await actorsClient.list();
 *
 * // Create a new Actor
 * const newActor = await actorsClient.create({
 *   name: 'my-actor',
 *   title: 'My Actor'
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/actors
 */ class ActorCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists all Actors.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination options.
     * @returns A paginated iterator of Actors.
     * @see https://docs.apify.com/api/v2/acts-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_1_default()(options, ow__rspack_import_1_default().object.exactShape({
            my: (ow__rspack_import_1_default().optional.boolean),
            limit: (ow__rspack_import_1_default().optional.number.not.negative),
            offset: (ow__rspack_import_1_default().optional.number.not.negative),
            desc: (ow__rspack_import_1_default().optional.boolean),
            sortBy: ow__rspack_import_1_default().optional.string.oneOf(Object.values(ActorListSortBy))
        }));
        return this._listPaginated(options);
    }
    /**
     * Creates a new Actor.
     *
     * @param actor - The Actor data.
     * @returns The created Actor object.
     * @see https://docs.apify.com/api/v2/acts-post
     */ async create(actor) {
        ow__rspack_import_1_default()(actor, (ow__rspack_import_1_default().optional.object));
        return this._create(actor);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'acts',
            ...options
        });
    }
}
var ActorListSortBy = /*#__PURE__*/ function(ActorListSortBy) {
    ActorListSortBy["CREATED_AT"] = "createdAt";
    ActorListSortBy["LAST_RUN_STARTED_AT"] = "stats.lastRunStartedAt";
    return ActorListSortBy;
}({});


},
2923(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActorEnvVarClient: () => (ActorEnvVarClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_client__rspack_import_0 = __webpack_require__(2528);


/**
 * Client for managing a specific Actor environment variable.
 *
 * Environment variables are key-value pairs that are available to the Actor during execution.
 * This client provides methods to get, update, and delete environment variables.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 * const versionClient = actorClient.version('0.1');
 *
 * // Get an environment variable
 * const envVarClient = versionClient.envVar('MY_VAR');
 * const envVar = await envVarClient.get();
 *
 * // Update environment variable
 * await envVarClient.update({ value: 'new-value' });
 * ```
 *
 * @see https://docs.apify.com/platform/actors/development/programming-interface/environment-variables
 */ class ActorEnvVarClient extends _base_resource_client__rspack_import_0.ResourceClient {
    /**
     * Retrieves the environment variable.
     *
     * @returns The environment variable object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/act-version-env-var-get
     */ async get() {
        return this._get();
    }
    /**
     * Updates the environment variable.
     *
     * @param actorEnvVar - The updated environment variable data.
     * @returns The updated environment variable object.
     * @see https://docs.apify.com/api/v2/act-version-env-var-put
     */ async update(actorEnvVar) {
        ow__rspack_import_1_default()(actorEnvVar, (ow__rspack_import_1_default().object));
        return this._update(actorEnvVar);
    }
    /**
     * Deletes the environment variable.
     *
     * @see https://docs.apify.com/api/v2/act-version-env-var-delete
     */ async delete() {
        return this._delete();
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'env-vars',
            ...options
        });
    }
}


},
6001(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActorEnvVarCollectionClient: () => (ActorEnvVarCollectionClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for managing the collection of environment variables for an Actor version.
 *
 * Environment variables are key-value pairs that are available to the Actor during execution.
 * This client provides methods to list and create environment variables.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 * const versionClient = actorClient.version('0.1');
 *
 * // List all environment variables
 * const envVarsClient = versionClient.envVars();
 * const { items } = await envVarsClient.list();
 *
 * // Create a new environment variable
 * const newEnvVar = await envVarsClient.create({
 *   name: 'MY_VAR',
 *   value: 'my-value',
 *   isSecret: false
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/actors/development/programming-interface/environment-variables
 */ class ActorEnvVarCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists all environment variables of this Actor version.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list();
     *```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list()) {...}
     * ```
     *
     * @returns A paginated iterator of environment variables.
     * @see https://docs.apify.com/api/v2/act-version-env-vars-get
     */ list() {
        let _options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return this._listPaginated();
    }
    /**
     * Creates a new environment variable for this Actor version.
     *
     * @param actorEnvVar - The environment variable data.
     * @returns The created environment variable object.
     * @see https://docs.apify.com/api/v2/act-version-env-vars-post
     */ async create(actorEnvVar) {
        ow__rspack_import_1_default()(actorEnvVar, (ow__rspack_import_1_default().optional.object));
        return this._create(actorEnvVar);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'env-vars',
            ...options
        });
    }
}


},
822(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActorSourceType: () => (ActorSourceType),
  ActorVersionClient: () => (ActorVersionClient)
});
/* import */ var ow__rspack_import_3 = __webpack_require__(4980);
/* import */ var ow__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_3);
/* import */ var _base_resource_client__rspack_import_0 = __webpack_require__(2528);
/* import */ var _actor_env_var__rspack_import_1 = __webpack_require__(2923);
/* import */ var _actor_env_var_collection__rspack_import_2 = __webpack_require__(6001);




/**
 * Client for managing a specific Actor version.
 *
 * Actor versions represent specific builds or snapshots of an Actor's code. This client provides
 * methods to get, update, and delete versions, as well as manage their environment variables.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 *
 * // Get a specific version
 * const versionClient = actorClient.version('0.1');
 * const version = await versionClient.get();
 *
 * // Update version
 * await versionClient.update({ buildTag: 'latest' });
 * ```
 *
 * @see https://docs.apify.com/api/v2/act-versions-get
 */ class ActorVersionClient extends _base_resource_client__rspack_import_0.ResourceClient {
    /**
     * Retrieves the Actor version.
     *
     * @returns The Actor version object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/act-version-get
     */ async get() {
        return this._get();
    }
    /**
     * Updates the Actor version with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated Actor version object.
     * @see https://docs.apify.com/api/v2/act-version-put
     */ async update(newFields) {
        ow__rspack_import_3_default()(newFields, (ow__rspack_import_3_default().object));
        return this._update(newFields);
    }
    /**
     * Deletes the Actor version.
     *
     * @see https://docs.apify.com/api/v2/act-version-delete
     */ async delete() {
        return this._delete();
    }
    /**
     * Returns a client for the specified environment variable of this Actor version.
     *
     * @param envVarName - Name of the environment variable.
     * @returns A client for the environment variable.
     * @see https://docs.apify.com/api/v2/act-version-env-var-get
     */ envVar(envVarName) {
        ow__rspack_import_3_default()(envVarName, (ow__rspack_import_3_default().string));
        return new _actor_env_var__rspack_import_1.ActorEnvVarClient(this._subResourceOptions({
            id: envVarName
        }));
    }
    /**
     * Returns a client for the environment variables of this Actor version.
     *
     * @returns A client for the Actor version's environment variables.
     * @see https://docs.apify.com/api/v2/act-version-env-vars-get
     */ envVars() {
        return new _actor_env_var_collection__rspack_import_2.ActorEnvVarCollectionClient(this._subResourceOptions());
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'versions',
            ...options
        });
    }
}
var ActorSourceType = /*#__PURE__*/ function(ActorSourceType) {
    ActorSourceType["SourceFiles"] = "SOURCE_FILES";
    ActorSourceType["GitRepo"] = "GIT_REPO";
    ActorSourceType["Tarball"] = "TARBALL";
    ActorSourceType["GitHubGist"] = "GITHUB_GIST";
    return ActorSourceType;
}({});


},
525(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActorVersionCollectionClient: () => (ActorVersionCollectionClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for managing the collection of Actor versions.
 *
 * Actor versions represent specific builds or snapshots of an Actor's code. This client provides
 * methods to list and create versions for a specific Actor.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 *
 * // List all versions
 * const versionsClient = actorClient.versions();
 * const { items } = await versionsClient.list();
 *
 * // Create a new version
 * const newVersion = await versionsClient.create({
 *   versionNumber: '0.2',
 *   buildTag: 'latest'
 * });
 * ```
 *
 * @see https://docs.apify.com/api/v2/act-versions-get
 */ class ActorVersionCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists all Actor versions.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list();
     *```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list()) {...}
     * ```
     *
     * @returns A paginated iterator of Actor versions.
     * @see https://docs.apify.com/api/v2/act-versions-get
     */ list() {
        let _options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return this._listPaginated();
    }
    /**
     * Creates a new Actor version.
     *
     * @param actorVersion - The Actor version data.
     * @returns The created Actor version object.
     * @see https://docs.apify.com/api/v2/act-versions-post
     */ async create(actorVersion) {
        ow__rspack_import_1_default()(actorVersion, (ow__rspack_import_1_default().optional.object));
        return this._create(actorVersion);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'versions',
            ...options
        });
    }
}


},
5400(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BuildClient: () => (BuildClient)
});
/* import */ var ow__rspack_import_3 = __webpack_require__(4980);
/* import */ var ow__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_3);
/* import */ var _base_resource_client__rspack_import_0 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_1 = __webpack_require__(9435);
/* import */ var _log__rspack_import_2 = __webpack_require__(4386);




/**
 * Client for managing a specific Actor build.
 *
 * Builds are created when an Actor is built from source code. This client provides methods
 * to get build details, wait for the build to finish, abort it, and access its logs.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const buildClient = client.build('my-build-id');
 *
 * // Get build details
 * const build = await buildClient.get();
 *
 * // Wait for the build to finish
 * const finishedBuild = await buildClient.waitForFinish();
 *
 * // Access build logs
 * const log = await buildClient.log().get();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds#builds
 */ class BuildClient extends _base_resource_client__rspack_import_0.ResourceClient {
    /**
     * Gets the Actor build object from the Apify API.
     *
     * @param options - Get options
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the build to finish on the API side before returning. Default is 0 (returns immediately).
     * @returns The Build object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/actor-build-get
     *
     * @example
     * ```javascript
     * // Get build status immediately
     * const build = await client.build('build-id').get();
     * console.log(`Status: ${build.status}`);
     *
     * // Wait up to 60 seconds for build to finish
     * const build = await client.build('build-id').get({ waitForFinish: 60 });
     * ```
     */ async get() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_3_default()(options, ow__rspack_import_3_default().object.exactShape({
            waitForFinish: (ow__rspack_import_3_default().optional.number)
        }));
        return this._get(options);
    }
    /**
     * Aborts the Actor build.
     *
     * Stops the build process immediately. The build will have an `ABORTED` status.
     *
     * @returns The updated Build object with `ABORTED` status
     * @see https://docs.apify.com/api/v2/actor-build-abort-post
     *
     * @example
     * ```javascript
     * await client.build('build-id').abort();
     * ```
     */ async abort() {
        const response = await this.httpClient.call({
            url: this._url('abort'),
            method: 'POST',
            params: this._params()
        });
        return (0,_utils__rspack_import_1.cast)((0,_utils__rspack_import_1.parseDateFields)((0,_utils__rspack_import_1.pluckData)(response.data)));
    }
    /**
     * Deletes the Actor build.
     *
     * @see https://docs.apify.com/api/v2/actor-build-delete
     */ async delete() {
        return this._delete();
    }
    /**
     * Retrieves the OpenAPI definition for the Actor build.
     *
     * @returns The OpenAPI definition object.
     * @see https://docs.apify.com/api/v2/actor-build-openapi-json-get
     */ async getOpenApiDefinition() {
        const response = await this.httpClient.call({
            url: this._url('openapi.json'),
            method: 'GET',
            params: this._params()
        });
        return response.data;
    }
    /**
     * Waits for the Actor build to finish and returns the finished Build object.
     *
     * The promise resolves when the build reaches a terminal state (`SUCCEEDED`, `FAILED`, `ABORTED`, or `TIMED-OUT`).
     * If `waitSecs` is provided and the timeout is reached, the promise resolves with the unfinished
     * Build object (status will be `RUNNING` or `READY`). The promise is NOT rejected based on build status.
     *
     * Unlike the `waitForFinish` parameter in {@link get}, this method can wait indefinitely
     * by polling the build status. It uses the `waitForFinish` parameter internally (max 60s per call)
     * and continuously polls until the build finishes or the timeout is reached.
     *
     * This is useful when you need to immediately start a run after a build finishes.
     *
     * @param options - Wait options
     * @param options.waitSecs - Maximum time to wait for the build to finish, in seconds. If omitted, waits indefinitely.
     * @returns The Build object (finished or still building if timeout was reached)
     *
     * @example
     * ```javascript
     * // Wait indefinitely for build to finish
     * const build = await client.build('build-id').waitForFinish();
     * console.log(`Build finished with status: ${build.status}`);
     *
     * // Start a run immediately after build succeeds
     * const build = await client.build('build-id').waitForFinish();
     * if (build.status === 'SUCCEEDED') {
     *   const run = await client.actor('my-actor').start();
     * }
     * ```
     */ async waitForFinish() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_3_default()(options, ow__rspack_import_3_default().object.exactShape({
            waitSecs: (ow__rspack_import_3_default().optional.number)
        }));
        return this._waitForFinish(options);
    }
    /**
     * Returns a client for accessing the log of this Actor build.
     *
     * @returns A client for accessing the build's log
     * @see https://docs.apify.com/api/v2/actor-build-log-get
     *
     * @example
     * ```javascript
     * // Get build log
     * const log = await client.build('build-id').log().get();
     * console.log(log);
     * ```
     */ log() {
        return new _log__rspack_import_2.LogClient(this._subResourceOptions({
            resourcePath: 'log'
        }));
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'actor-builds',
            ...options
        });
    }
}


},
6675(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BuildCollectionClient: () => (BuildCollectionClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for managing the collection of Actor builds.
 *
 * Provides methods to list Actor builds across all Actors or for a specific Actor.
 * To access an individual build, use the `build()` method on the main ApifyClient.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 *
 * // List all builds
 * const buildsClient = client.builds();
 * const { items } = await buildsClient.list();
 *
 * // List builds for a specific Actor
 * const actorBuildsClient = client.actor('my-actor-id').builds();
 * const { items: actorBuilds } = await actorBuildsClient.list();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds#builds
 */ class BuildCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists all Actor builds.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination and sorting options.
     * @returns A paginated iterator of Actor builds.
     * @see https://docs.apify.com/api/v2/actor-builds-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_1_default()(options, ow__rspack_import_1_default().object.exactShape({
            limit: (ow__rspack_import_1_default().optional.number.not.negative),
            offset: (ow__rspack_import_1_default().optional.number.not.negative),
            desc: (ow__rspack_import_1_default().optional.boolean)
        }));
        return this._listPaginated(options);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            ...options,
            resourcePath: options.resourcePath || 'actor-builds'
        });
    }
}


},
9032(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DatasetClient: () => (DatasetClient),
  DownloadItemsFormat: () => (DownloadItemsFormat)
});
/* import */ var ow__rspack_import_3 = __webpack_require__(4980);
/* import */ var ow__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_3);
/* import */ var _apify_utilities__rspack_import_0 = __webpack_require__(7957);
/* import */ var _base_resource_client__rspack_import_1 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_2 = __webpack_require__(9435);




/**
 * Client for managing a specific Dataset.
 *
 * Datasets store structured data results from Actor runs. This client provides methods to push items,
 * list and retrieve items, download items in various formats (JSON, CSV, Excel, etc.), and manage
 * the dataset.
 *
 * @template Data - Type of items stored in the dataset
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const datasetClient = client.dataset('my-dataset-id');
 *
 * // Push items to the dataset
 * await datasetClient.pushItems([
 *   { url: 'https://example.com', title: 'Example' },
 *   { url: 'https://test.com', title: 'Test' }
 * ]);
 *
 * // List all items
 * const { items } = await datasetClient.listItems();
 *
 * // Download items as CSV
 * const buffer = await datasetClient.downloadItems('csv');
 * ```
 *
 * @see https://docs.apify.com/platform/storage/dataset
 */ class DatasetClient extends _base_resource_client__rspack_import_1.ResourceClient {
    /**
     * Gets the dataset object from the Apify API.
     *
     * @returns The Dataset object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/dataset-get
     */ async get() {
        return this._get({}, _base_resource_client__rspack_import_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Updates the dataset with specified fields.
     *
     * @param newFields - Fields to update in the dataset
     * @returns The updated Dataset object
     * @see https://docs.apify.com/api/v2/dataset-put
     */ async update(newFields) {
        ow__rspack_import_3_default()(newFields, (ow__rspack_import_3_default().object));
        return this._update(newFields, _base_resource_client__rspack_import_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Deletes the dataset.
     *
     * @see https://docs.apify.com/api/v2/dataset-delete
     */ async delete() {
        return this._delete(_base_resource_client__rspack_import_1.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Lists items in the dataset.
     *
     * Returns a paginated list of dataset items. You can use pagination parameters to retrieve
     * specific subsets of items, and various filtering and formatting options to customize
     * the output.
     *
     * @param options - Options for listing items
     * @param options.limit - Maximum number of items to return. Default is all items.
     * @param options.chunkSize - Maximum number of items returned in one API response. Relevant in the context of asyncIterator.
     * @param options.offset - Number of items to skip from the beginning. Default is 0.
     * @param options.desc - If `true`, items are returned in descending order (newest first). Default is `false`.
     * @param options.fields - Array of field names to include in the results. Omits all other fields.
     * @param options.omit - Array of field names to exclude from the results.
     * @param options.clean - If `true`, returns only non-empty items and skips hidden fields. Default is `false`.
     * @param options.skipEmpty - If `true`, skips empty items. Default is `false`.
     * @param options.skipHidden - If `true`, skips hidden fields (fields starting with `#`). Default is `false`.
     * @param options.flatten - Array of field names to flatten. Nested objects are converted to dot notation (e.g., `obj.field`).
     * @param options.unwind - Field name or array of field names to unwind. Each array value creates a separate item.
     * @param options.view - Name of a predefined view to use for field selection.
     * @returns A paginated list with `items`, `total` count, `offset`, `count`, and `limit`
     * @see https://docs.apify.com/api/v2/dataset-items-get
     *
     * @example
     * ```javascript
     * // Get first 100 items
     * const { items, total } = await client.dataset('my-dataset').listItems({ limit: 100 });
     * console.log(`Retrieved ${items.length} of ${total} total items`);
     *
     * // Get items with specific fields only
     * const { items } = await client.dataset('my-dataset').listItems({
     *   fields: ['url', 'title'],
     *   skipEmpty: true,
     *   limit: 50
     * });
     *
     * // Get items in descending order with pagination
     * const { items } = await client.dataset('my-dataset').listItems({
     *   desc: true,
     *   offset: 100,
     *   limit: 50
     * });
     * ```
     */ listItems() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var _this = this;
        ow__rspack_import_3_default()(options, ow__rspack_import_3_default().object.exactShape({
            clean: (ow__rspack_import_3_default().optional.boolean),
            desc: (ow__rspack_import_3_default().optional.boolean),
            flatten: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            fields: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            omit: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            limit: (ow__rspack_import_3_default().optional.number.not.negative),
            offset: (ow__rspack_import_3_default().optional.number.not.negative),
            chunkSize: (ow__rspack_import_3_default().optional.number.positive),
            skipEmpty: (ow__rspack_import_3_default().optional.boolean),
            skipHidden: (ow__rspack_import_3_default().optional.boolean),
            unwind: ow__rspack_import_3_default().optional.any((ow__rspack_import_3_default().string), ow__rspack_import_3_default().array.ofType((ow__rspack_import_3_default().string))),
            view: (ow__rspack_import_3_default().optional.string),
            signature: (ow__rspack_import_3_default().optional.string)
        }));
        const fetchItems = async function() {
            let datasetListOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            const response = await _this.httpClient.call({
                url: _this._url('items'),
                method: 'GET',
                params: _this._params(datasetListOptions),
                timeout: _base_resource_client__rspack_import_1.DEFAULT_TIMEOUT_MILLIS
            });
            return _this._createPaginationList(response, datasetListOptions.desc ?? false);
        };
        return this._listPaginatedFromCallback(fetchItems, options);
    }
    /**
     * Downloads dataset items in a specific format.
     *
     * Unlike {@link listItems} which returns a {@link PaginatedList} with an array of individual
     * dataset items, this method returns the items serialized to the provided format
     * (JSON, CSV, Excel, etc.) as a Buffer. Useful for exporting data for further processing.
     *
     * @param format - Output format: `'json'`, `'jsonl'`, `'csv'`, `'xlsx'`, `'xml'`, `'rss'`, or `'html'`
     * @param options - Download and formatting options (extends all options from {@link listItems})
     * @param options.attachment - If `true`, the response will have `Content-Disposition: attachment` header.
     * @param options.bom - If `true`, adds UTF-8 BOM to the beginning of the file (useful for Excel compatibility).
     * @param options.delimiter - CSV delimiter character. Default is `,` (comma).
     * @param options.skipHeaderRow - If `true`, CSV export will not include the header row with field names.
     * @param options.xmlRoot - Name of the root XML element. Default is `'items'`.
     * @param options.xmlRow - Name of the XML element for each item. Default is `'item'`.
     * @param options.fields - Array of field names to include in the export.
     * @param options.omit - Array of field names to exclude from the export.
     * @returns Buffer containing the serialized data in the specified format
     * @see https://docs.apify.com/api/v2/dataset-items-get
     *
     * @example
     * ```javascript
     * // Download as CSV with BOM for Excel compatibility
     * const csvBuffer = await client.dataset('my-dataset').downloadItems('csv', { bom: true });
     * require('fs').writeFileSync('output.csv', csvBuffer);
     *
     * // Download as Excel with custom options
     * const xlsxBuffer = await client.dataset('my-dataset').downloadItems('xlsx', {
     *   fields: ['url', 'title', 'price'],
     *   skipEmpty: true,
     *   limit: 1000
     * });
     *
     * // Download as XML with custom element names
     * const xmlBuffer = await client.dataset('my-dataset').downloadItems('xml', {
     *   xmlRoot: 'products',
     *   xmlRow: 'product'
     * });
     * ```
     */ async downloadItems(format) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_3_default()(format, ow__rspack_import_3_default().string.oneOf(validItemFormats));
        ow__rspack_import_3_default()(options, ow__rspack_import_3_default().object.exactShape({
            attachment: (ow__rspack_import_3_default().optional.boolean),
            bom: (ow__rspack_import_3_default().optional.boolean),
            clean: (ow__rspack_import_3_default().optional.boolean),
            delimiter: (ow__rspack_import_3_default().optional.string),
            desc: (ow__rspack_import_3_default().optional.boolean),
            flatten: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            fields: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            omit: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            limit: (ow__rspack_import_3_default().optional.number.not.negative),
            offset: (ow__rspack_import_3_default().optional.number.not.negative),
            skipEmpty: (ow__rspack_import_3_default().optional.boolean),
            skipHeaderRow: (ow__rspack_import_3_default().optional.boolean),
            skipHidden: (ow__rspack_import_3_default().optional.boolean),
            unwind: ow__rspack_import_3_default().any((ow__rspack_import_3_default().optional.string), ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string))),
            view: (ow__rspack_import_3_default().optional.string),
            xmlRoot: (ow__rspack_import_3_default().optional.string),
            xmlRow: (ow__rspack_import_3_default().optional.string),
            signature: (ow__rspack_import_3_default().optional.string)
        }));
        const { data } = await this.httpClient.call({
            url: this._url('items'),
            method: 'GET',
            params: this._params({
                format,
                ...options
            }),
            forceBuffer: true,
            timeout: _base_resource_client__rspack_import_1.DEFAULT_TIMEOUT_MILLIS
        });
        return (0,_utils__rspack_import_2.cast)(data);
    }
    /**
     * Stores one or more items into the dataset.
     *
     * Items can be objects, strings, or arrays thereof. Each item will be stored as a separate
     * record in the dataset. Objects are automatically serialized to JSON. If you provide an array,
     * all items will be stored in order. This method is idempotent - calling it multiple times
     * with the same data will not create duplicates, but will append items each time.
     *
     * @param items - A single item (object or string) or an array of items to store.
     *                Objects are automatically stringified to JSON. Strings are stored as-is.
     * @see https://docs.apify.com/api/v2/dataset-items-post
     *
     * @example
     * ```javascript
     * // Store a single object
     * await client.dataset('my-dataset').pushItems({
     *   url: 'https://example.com',
     *   title: 'Example Page',
     *   extractedAt: new Date()
     * });
     *
     * // Store multiple items at once
     * await client.dataset('my-dataset').pushItems([
     *   { url: 'https://example.com', title: 'Example' },
     *   { url: 'https://test.com', title: 'Test' },
     *   { url: 'https://demo.com', title: 'Demo' }
     * ]);
     *
     * // Store string items
     * await client.dataset('my-dataset').pushItems(['item1', 'item2', 'item3']);
     * ```
     */ async pushItems(items) {
        ow__rspack_import_3_default()(items, ow__rspack_import_3_default().any((ow__rspack_import_3_default().object), (ow__rspack_import_3_default().string), ow__rspack_import_3_default().array.ofType(ow__rspack_import_3_default().any((ow__rspack_import_3_default().object), (ow__rspack_import_3_default().string)))));
        await this.httpClient.call({
            url: this._url('items'),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            data: items,
            params: this._params(),
            doNotRetryTimeouts: true,
            timeout: _base_resource_client__rspack_import_1.MEDIUM_TIMEOUT_MILLIS
        });
    }
    /**
     * Gets statistical information about the dataset.
     *
     * Returns statistics for each field in the dataset, including information about
     * data types, null counts, and value ranges.
     *
     * @returns Dataset statistics, or `undefined` if not available
     * @see https://docs.apify.com/api/v2/dataset-statistics-get
     */ async getStatistics() {
        const requestOpts = {
            url: this._url('statistics'),
            method: 'GET',
            params: this._params(),
            timeout: _base_resource_client__rspack_import_1.SMALL_TIMEOUT_MILLIS
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_2.cast)((0,_utils__rspack_import_2.pluckData)(response.data));
        } catch (err) {
            (0,_utils__rspack_import_2.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Generates a public URL for accessing dataset items.
     *
     * If the client has permission to access the dataset's URL signing key,
     * the URL will include a cryptographic signature allowing access without authentication.
     * This is useful for sharing dataset results with external services or users.
     *
     * @param options - URL generation options (extends all options from {@link listItems})
     * @param options.expiresInSecs - Number of seconds until the signed URL expires. If omitted, the URL never expires.
     * @param options.fields - Array of field names to include in the response.
     * @param options.limit - Maximum number of items to return.
     * @param options.offset - Number of items to skip.
     * @returns A public URL string for accessing the dataset items
     *
     * @example
     * ```javascript
     * // Create a URL that expires in 1 hour with specific fields
     * const url = await client.dataset('my-dataset').createItemsPublicUrl({
     *   expiresInSecs: 3600,
     *   fields: ['url', 'title'],
     *   limit: 100
     * });
     * console.log(`Share this URL: ${url}`);
     *
     * // Create a permanent public URL for clean items only
     * const url = await client.dataset('my-dataset').createItemsPublicUrl({
     *   clean: true,
     *   skipEmpty: true
     * });
     * ```
     */ async createItemsPublicUrl() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_3_default()(options, ow__rspack_import_3_default().object.exactShape({
            clean: (ow__rspack_import_3_default().optional.boolean),
            desc: (ow__rspack_import_3_default().optional.boolean),
            flatten: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            fields: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            omit: ow__rspack_import_3_default().optional.array.ofType((ow__rspack_import_3_default().string)),
            limit: (ow__rspack_import_3_default().optional.number.not.negative),
            offset: (ow__rspack_import_3_default().optional.number.not.negative),
            skipEmpty: (ow__rspack_import_3_default().optional.boolean),
            skipHidden: (ow__rspack_import_3_default().optional.boolean),
            unwind: ow__rspack_import_3_default().optional.any((ow__rspack_import_3_default().string), ow__rspack_import_3_default().array.ofType((ow__rspack_import_3_default().string))),
            view: (ow__rspack_import_3_default().optional.string),
            expiresInSecs: (ow__rspack_import_3_default().optional.number)
        }));
        const dataset = await this.get();
        const { expiresInSecs, ...queryOptions } = options;
        let createdItemsPublicUrl = new URL(this._publicUrl('items'));
        if (dataset === null || dataset === void 0 ? void 0 : dataset.urlSigningSecretKey) {
            const signature = await (0,_apify_utilities__rspack_import_0.createStorageContentSignatureAsync)({
                resourceId: dataset.id,
                urlSigningSecretKey: dataset.urlSigningSecretKey,
                expiresInMillis: expiresInSecs ? expiresInSecs * 1000 : undefined
            });
            createdItemsPublicUrl.searchParams.set('signature', signature);
        }
        createdItemsPublicUrl = (0,_utils__rspack_import_2.applyQueryParamsToUrl)(createdItemsPublicUrl, queryOptions);
        return createdItemsPublicUrl.toString();
    }
    _createPaginationList(response, userProvidedDesc) {
        return {
            items: response.data,
            total: Number(response.headers['x-apify-pagination-total']),
            offset: Number(response.headers['x-apify-pagination-offset']),
            count: response.data.length,
            limit: Number(response.headers['x-apify-pagination-limit']),
            // TODO: Replace this once https://github.com/apify/apify-core/issues/3503 is solved
            desc: JSON.parse(response.headers['x-apify-pagination-desc'] ?? userProvidedDesc)
        };
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'datasets',
            ...options
        });
    }
}
/**
 * Supported formats for downloading dataset items.
 */ var DownloadItemsFormat = /*#__PURE__*/ function(DownloadItemsFormat) {
    DownloadItemsFormat["JSON"] = "json";
    DownloadItemsFormat["JSONL"] = "jsonl";
    DownloadItemsFormat["XML"] = "xml";
    DownloadItemsFormat["HTML"] = "html";
    DownloadItemsFormat["CSV"] = "csv";
    DownloadItemsFormat["XLSX"] = "xlsx";
    DownloadItemsFormat["RSS"] = "rss";
    return DownloadItemsFormat;
}({});
const validItemFormats = [
    ...new Set(Object.values(DownloadItemsFormat).map((item)=>item.toLowerCase()))
];


},
1075(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DatasetCollectionClient: () => (DatasetCollectionClient)
});
/* import */ var ow__rspack_import_2 = __webpack_require__(4980);
/* import */ var ow__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_2);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _base_resource_collection_client__rspack_import_1 = __webpack_require__(577);



/**
 * Client for managing the collection of datasets in your account.
 *
 * Datasets store structured data results from Actor runs. This client provides methods
 * to list, create, or get datasets by name.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const datasetsClient = client.datasets();
 *
 * // List all datasets
 * const { items } = await datasetsClient.list();
 *
 * // Get or create a dataset by name
 * const dataset = await datasetsClient.getOrCreate('my-dataset');
 * ```
 *
 * @see https://docs.apify.com/platform/storage/dataset
 */ class DatasetCollectionClient extends _base_resource_collection_client__rspack_import_1.ResourceCollectionClient {
    /**
     * Lists all Datasets.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination options.
     * @returns A paginated iterator of Datasets.
     * @see https://docs.apify.com/api/v2/datasets-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_2_default()(options, ow__rspack_import_2_default().object.exactShape({
            unnamed: (ow__rspack_import_2_default().optional.boolean),
            limit: (ow__rspack_import_2_default().optional.number.not.negative),
            offset: (ow__rspack_import_2_default().optional.number.not.negative),
            desc: (ow__rspack_import_2_default().optional.boolean),
            ownership: ow__rspack_import_2_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.STORAGE_OWNERSHIP_FILTER))
        }));
        return this._listPaginated(options);
    }
    /**
     * Gets or creates a dataset with the specified name.
     *
     * @param name - Name of the dataset. If not provided, a default dataset is used.
     * @param options - Additional options like schema.
     * @returns The dataset object.
     * @see https://docs.apify.com/api/v2/datasets-post
     */ async getOrCreate(name, options) {
        ow__rspack_import_2_default()(name, (ow__rspack_import_2_default().optional.string));
        ow__rspack_import_2_default()(options === null || options === void 0 ? void 0 : options.schema, (ow__rspack_import_2_default().optional.object)); // TODO: Add schema validatioon
        return this._getOrCreate(name, options);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'datasets',
            ...options
        });
    }
}


},
5419(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyValueStoreClient: () => (KeyValueStoreClient)
});
/* import */ var ow__rspack_import_4 = __webpack_require__(4980);
/* import */ var ow__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_4);
/* import */ var _apify_log__rspack_import_0 = __webpack_require__(1199);
/* import */ var _apify_utilities__rspack_import_1 = __webpack_require__(7957);
/* import */ var _base_resource_client__rspack_import_2 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_3 = __webpack_require__(9435);





/**
 * Client for managing a specific key-value store.
 *
 * Key-value stores are used to store arbitrary data records or files. Each record is identified by
 * a unique key and can contain any type of data. This client provides methods to get, set, and delete
 * records, list keys, and manage the store.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const storeClient = client.keyValueStore('my-store-id');
 *
 * // Set a record
 * await storeClient.setRecord({
 *   key: 'OUTPUT',
 *   value: { foo: 'bar' },
 *   contentType: 'application/json'
 * });
 *
 * // Get a record
 * const record = await storeClient.getRecord('OUTPUT');
 *
 * // List all keys
 * const { items } = await storeClient.listKeys();
 * ```
 *
 * @see https://docs.apify.com/platform/storage/key-value-store
 */ class KeyValueStoreClient extends _base_resource_client__rspack_import_2.ResourceClient {
    /**
     * Gets the key-value store object from the Apify API.
     *
     * @returns The KeyValueStore object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/key-value-store-get
     */ async get() {
        return this._get({}, _base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Updates the key-value store with specified fields.
     *
     * @param newFields - Fields to update in the key-value store
     * @param newFields.name - New name for the store
     * @param newFields.title - New title for the store
     * @param newFields.generalAccess - General resource access level ('FOLLOW_USER_SETTING', 'ANYONE_WITH_ID_CAN_READ' or 'RESTRICTED')
     * @returns The updated KeyValueStore object
     * @see https://docs.apify.com/api/v2/key-value-store-put
     */ async update(newFields) {
        ow__rspack_import_4_default()(newFields, (ow__rspack_import_4_default().object));
        return this._update(newFields, _base_resource_client__rspack_import_2.DEFAULT_TIMEOUT_MILLIS);
    }
    /**
     * Deletes the key-value store.
     *
     * @see https://docs.apify.com/api/v2/key-value-store-delete
     */ async delete() {
        return this._delete(_base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Lists all keys in the key-value store.
     *
     * Returns a paginated list of all record keys in the store. Use pagination parameters
     * to retrieve large lists efficiently.
     *
     * @param options - Listing options
     * @param options.limit - Maximum number of keys to return. Default is 1000.
     * @param options.exclusiveStartKey - Key to start listing from (for pagination). The listing starts with the next key after this one.
     * @param options.collection - Filter keys by collection name.
     * @param options.prefix - Filter keys that start with this prefix.
     * @returns Object containing `items` array of key metadata, pagination info (`count`, `limit`, `isTruncated`, `nextExclusiveStartKey`)
     * @see https://docs.apify.com/api/v2/key-value-store-keys-get
     *
     * @example
     * ```javascript
     * // List all keys
     * const { items, isTruncated } = await client.keyValueStore('my-store').listKeys();
     * items.forEach(item => console.log(`${item.key}: ${item.size} bytes`));
     *
     * // List keys with prefix
     * const { items } = await client.keyValueStore('my-store').listKeys({ prefix: 'user-' });
     *
     * // Paginate through all keys
     * let exclusiveStartKey;
     * do {
     *   const result = await client.keyValueStore('my-store').listKeys({
     *     limit: 100,
     *     exclusiveStartKey
     *   });
     *   // Process result.items...
     *   exclusiveStartKey = result.nextExclusiveStartKey;
     * } while (result.isTruncated);
     * ```
     */ listKeys() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var _this = this;
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            limit: (ow__rspack_import_4_default().optional.number.not.negative),
            exclusiveStartKey: (ow__rspack_import_4_default().optional.string),
            collection: (ow__rspack_import_4_default().optional.string),
            prefix: (ow__rspack_import_4_default().optional.string),
            signature: (ow__rspack_import_4_default().optional.string)
        }));
        const getPaginatedList = async function() {
            let kvsListOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            const response = await _this.httpClient.call({
                url: _this._url('keys'),
                method: 'GET',
                params: _this._params(kvsListOptions),
                timeout: _base_resource_client__rspack_import_2.MEDIUM_TIMEOUT_MILLIS
            });
            return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
        };
        const paginatedListPromise = getPaginatedList(options);
        async function* asyncGenerator() {
            let currentPage = await paginatedListPromise;
            yield* currentPage.items;
            let remainingItems = options.limit ? options.limit - currentPage.items.length : undefined;
            while(currentPage.items.length > 0 && // Continue only if at least some items were returned in the last page.
            currentPage.nextExclusiveStartKey !== null && // Continue only if there is some next key.
            (remainingItems === undefined || remainingItems > 0 // Continue only if the limit was not exceeded.
            )){
                const newOptions = {
                    ...options,
                    limit: remainingItems,
                    exclusiveStartKey: currentPage.nextExclusiveStartKey
                };
                currentPage = await getPaginatedList(newOptions);
                yield* currentPage.items;
                if (remainingItems) {
                    remainingItems -= currentPage.items.length;
                }
            }
        }
        return Object.defineProperty(paginatedListPromise, Symbol.asyncIterator, {
            value: asyncGenerator
        });
    }
    /**
     * Generates a public URL for accessing a specific record in the key-value store.
     *
     * If the client has permission to access the key-value store's URL signing key,
     * the URL will include a cryptographic signature for authenticated access without
     * requiring an API token.
     *
     * @param key - The record key
     * @returns A public URL string for accessing the record
     *
     * @example
     * ```javascript
     * const url = await client.keyValueStore('my-store').getRecordPublicUrl('OUTPUT');
     * console.log(`Public URL: ${url}`);
     * // You can now share this URL or use it in a browser
     * ```
     */ async getRecordPublicUrl(key) {
        ow__rspack_import_4_default()(key, (ow__rspack_import_4_default().string.nonEmpty));
        const store = await this.get();
        const recordPublicUrl = new URL(this._publicUrl(`records/${key}`));
        if (store === null || store === void 0 ? void 0 : store.urlSigningSecretKey) {
            const signature = await (0,_apify_utilities__rspack_import_1.createHmacSignatureAsync)(store.urlSigningSecretKey, key);
            recordPublicUrl.searchParams.append('signature', signature);
        }
        return recordPublicUrl.toString();
    }
    /**
     * Generates a public URL for accessing the list of keys in the key-value store.
     *
     * If the client has permission to access the key-value store's URL signing key,
     * the URL will include a cryptographic signature which allows access without authentication.
     *
     * @param options - URL generation options (extends all options from {@link listKeys})
     * @param options.expiresInSecs - Number of seconds until the signed URL expires. If omitted, the URL never expires.
     * @param options.limit - Maximum number of keys to return.
     * @param options.prefix - Filter keys by prefix.
     * @returns A public URL string for accessing the keys list
     *
     * @example
     * ```javascript
     * // Create a URL that expires in 1 hour
     * const url = await client.keyValueStore('my-store').createKeysPublicUrl({
     *   expiresInSecs: 3600,
     *   prefix: 'image-'
     * });
     * console.log(`Share this URL: ${url}`);
     * ```
     */ async createKeysPublicUrl() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            limit: (ow__rspack_import_4_default().optional.number.not.negative),
            exclusiveStartKey: (ow__rspack_import_4_default().optional.string),
            collection: (ow__rspack_import_4_default().optional.string),
            prefix: (ow__rspack_import_4_default().optional.string),
            expiresInSecs: (ow__rspack_import_4_default().optional.number)
        }));
        const store = await this.get();
        const { expiresInSecs, ...queryOptions } = options;
        let createdPublicKeysUrl = new URL(this._publicUrl('keys'));
        if (store === null || store === void 0 ? void 0 : store.urlSigningSecretKey) {
            const signature = await (0,_apify_utilities__rspack_import_1.createStorageContentSignatureAsync)({
                resourceId: store.id,
                urlSigningSecretKey: store.urlSigningSecretKey,
                expiresInMillis: expiresInSecs ? expiresInSecs * 1000 : undefined
            });
            createdPublicKeysUrl.searchParams.set('signature', signature);
        }
        createdPublicKeysUrl = (0,_utils__rspack_import_3.applyQueryParamsToUrl)(createdPublicKeysUrl, queryOptions);
        return createdPublicKeysUrl.toString();
    }
    /**
     * Tests whether a record with the given key exists in the key-value store without retrieving its value.
     *
     * This is more efficient than {@link getRecord} when you only need to check for existence.
     *
     * @param key - The record key to check
     * @returns `true` if the record exists, `false` if it does not
     * @see https://docs.apify.com/api/v2/key-value-store-record-get
     *
     * @example
     * ```javascript
     * const exists = await client.keyValueStore('my-store').recordExists('OUTPUT');
     * if (exists) {
     *   console.log('OUTPUT record exists');
     * }
     * ```
     */ async recordExists(key) {
        const requestOpts = {
            url: this._url(`records/${key}`),
            method: 'HEAD',
            params: this._params()
        };
        try {
            await this.httpClient.call(requestOpts);
            return true;
        } catch (err) {
            (0,_utils__rspack_import_3.catchNotFoundOrThrow)(err);
        }
        return false;
    }
    async getRecord(key) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_4_default()(key, (ow__rspack_import_4_default().string));
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            buffer: (ow__rspack_import_4_default().optional.boolean),
            stream: (ow__rspack_import_4_default().optional.boolean),
            disableRedirect: (ow__rspack_import_4_default().optional.boolean),
            signature: (ow__rspack_import_4_default().optional.string)
        }));
        if (options.stream && !(0,_utils__rspack_import_3.isNode)()) {
            throw new Error('The stream option can only be used in Node.js environment.');
        }
        if ('disableRedirect' in options) {
            _apify_log__rspack_import_0["default"].deprecated('The disableRedirect option for getRecord() is deprecated. ' + 'It has no effect and will be removed in the following major release.');
        }
        const queryParams = {
            attachment: 'true'
        };
        if (options.signature) queryParams.signature = options.signature;
        const requestOpts = {
            url: this._url(`records/${key}`),
            method: 'GET',
            params: this._params(queryParams),
            timeout: _base_resource_client__rspack_import_2.DEFAULT_TIMEOUT_MILLIS
        };
        if (options.buffer) requestOpts.forceBuffer = true;
        if (options.stream) requestOpts.responseType = 'stream';
        try {
            const response = await this.httpClient.call(requestOpts);
            return {
                key,
                value: response.data,
                contentType: response.headers['content-type']
            };
        } catch (err) {
            (0,_utils__rspack_import_3.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Stores a record in the key-value store.
     *
     * The record value can be any JSON-serializable object, a string, or a Buffer/Stream.
     * The content type is automatically determined based on the value type, but can be
     * overridden using the `contentType` property.
     *
     * **Note about streams:** If the value is a stream object (has `.pipe` and `.on` methods),
     * the upload cannot be retried on failure or follow redirects. For reliable uploads,
     * buffer the entire stream into memory first.
     *
     * @param record - The record to store
     * @param record.key - Record key (unique identifier)
     * @param record.value - Record value (object, string, Buffer, or Stream)
     * @param record.contentType - Optional MIME type. Auto-detected if not provided:
     *                             - Objects: `'application/json; charset=utf-8'`
     *                             - Strings: `'text/plain; charset=utf-8'`
     *                             - Buffers/Streams: `'application/octet-stream'`
     * @param options - Storage options
     * @param options.timeoutSecs - Timeout for the upload in seconds. Default varies by value size.
     * @param options.doNotRetryTimeouts - If `true`, don't retry on timeout errors. Default is `false`.
     * @see https://docs.apify.com/api/v2/key-value-store-record-put
     *
     * @example
     * ```javascript
     * // Store JSON object
     * await client.keyValueStore('my-store').setRecord({
     *   key: 'OUTPUT',
     *   value: { crawledUrls: 100, items: [...] }
     * });
     *
     * // Store text
     * await client.keyValueStore('my-store').setRecord({
     *   key: 'README',
     *   value: 'This is my readme text',
     *   contentType: 'text/plain'
     * });
     *
     * // Store binary data
     * const imageBuffer = await fetchImageBuffer();
     * await client.keyValueStore('my-store').setRecord({
     *   key: 'screenshot.png',
     *   value: imageBuffer,
     *   contentType: 'image/png'
     * });
     * ```
     */ async setRecord(record) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_4_default()(record, ow__rspack_import_4_default().object.exactShape({
            key: (ow__rspack_import_4_default().string),
            value: ow__rspack_import_4_default().any((ow__rspack_import_4_default()["null"]), (ow__rspack_import_4_default().string), (ow__rspack_import_4_default().number), (ow__rspack_import_4_default().object), (ow__rspack_import_4_default().boolean)),
            contentType: (ow__rspack_import_4_default().optional.string.nonEmpty)
        }));
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            timeoutSecs: (ow__rspack_import_4_default().optional.number),
            doNotRetryTimeouts: (ow__rspack_import_4_default().optional.boolean)
        }));
        const { key } = record;
        let { value, contentType } = record;
        const { timeoutSecs, doNotRetryTimeouts } = options;
        const isValueStreamOrBuffer = (0,_utils__rspack_import_3.isStream)(value) || (0,_utils__rspack_import_3.isBuffer)(value);
        // To allow saving Objects to JSON without providing content type
        if (!contentType) {
            if (isValueStreamOrBuffer) contentType = 'application/octet-stream';
            else if (typeof value === 'string') contentType = 'text/plain; charset=utf-8';
            else contentType = 'application/json; charset=utf-8';
        }
        const isContentTypeJson = /^application\/json/.test(contentType);
        if (isContentTypeJson && !isValueStreamOrBuffer && typeof value !== 'string') {
            try {
                value = JSON.stringify(value, null, 2);
            } catch (err) {
                const msg = `The record value cannot be stringified to JSON. Please provide other content type.\nCause: ${err.message}`;
                throw new Error(msg);
            }
        }
        const uploadOpts = {
            url: this._url(`records/${key}`),
            method: 'PUT',
            params: this._params(),
            data: value,
            headers: contentType ? {
                'content-type': contentType
            } : undefined,
            doNotRetryTimeouts,
            timeout: timeoutSecs !== undefined ? timeoutSecs * 1000 : _base_resource_client__rspack_import_2.DEFAULT_TIMEOUT_MILLIS
        };
        await this.httpClient.call(uploadOpts);
    }
    /**
     * Deletes a record from the key-value store.
     *
     * @param key - The record key to delete
     * @see https://docs.apify.com/api/v2/key-value-store-record-delete
     *
     * @example
     * ```javascript
     * await client.keyValueStore('my-store').deleteRecord('temp-data');
     * ```
     */ async deleteRecord(key) {
        ow__rspack_import_4_default()(key, (ow__rspack_import_4_default().string));
        await this.httpClient.call({
            url: this._url(`records/${key}`),
            method: 'DELETE',
            params: this._params(),
            timeout: _base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS
        });
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'key-value-stores',
            ...options
        });
    }
}


},
5614(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyValueStoreCollectionClient: () => (KeyValueStoreCollectionClient)
});
/* import */ var ow__rspack_import_2 = __webpack_require__(4980);
/* import */ var ow__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_2);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _base_resource_collection_client__rspack_import_1 = __webpack_require__(577);



/**
 * Client for managing the collection of Key-value stores in your account.
 *
 * Key-value stores are used to store arbitrary data records or files. This client provides
 * methods to list, create, or get key-value stores by name.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const storesClient = client.keyValueStores();
 *
 * // List all key-value stores
 * const { items } = await storesClient.list();
 *
 * // Get or create a key-value store by name
 * const store = await storesClient.getOrCreate('my-store');
 * ```
 *
 * @see https://docs.apify.com/platform/storage/key-value-store
 */ class KeyValueStoreCollectionClient extends _base_resource_collection_client__rspack_import_1.ResourceCollectionClient {
    /**
     * Lists all Key-value stores.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination options.
     * @returns A paginated iterator of Key-value stores.
     * @see https://docs.apify.com/api/v2/key-value-stores-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_2_default()(options, ow__rspack_import_2_default().object.exactShape({
            unnamed: (ow__rspack_import_2_default().optional.boolean),
            limit: (ow__rspack_import_2_default().optional.number.not.negative),
            offset: (ow__rspack_import_2_default().optional.number.not.negative),
            desc: (ow__rspack_import_2_default().optional.boolean),
            ownership: ow__rspack_import_2_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.STORAGE_OWNERSHIP_FILTER))
        }));
        return this._listPaginated(options);
    }
    /**
     * Gets or creates a key-value store with the specified name.
     *
     * @param name - Name of the key-value store. If not provided, a default store is used.
     * @param options - Additional options like schema.
     * @returns The key-value store object.
     * @see https://docs.apify.com/api/v2/key-value-stores-post
     */ async getOrCreate(name, options) {
        ow__rspack_import_2_default()(name, (ow__rspack_import_2_default().optional.string));
        ow__rspack_import_2_default()(options === null || options === void 0 ? void 0 : options.schema, (ow__rspack_import_2_default().optional.object)); // TODO: Add schema validatioon
        return this._getOrCreate(name, options);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'key-value-stores',
            ...options
        });
    }
}


},
4386(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LogClient: () => (LogClient),
  LoggerActorRedirect: () => (LoggerActorRedirect),
  StreamedLog: () => (StreamedLog)
});
/* import */ var _swc_helpers_define_property__rspack_import_4 = __webpack_require__(467);
/* import */ var ansi_colors__rspack_import_0 = __webpack_require__(313);
/* import */ var ansi_colors__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(ansi_colors__rspack_import_0);
/* import */ var _apify_log__rspack_import_1 = __webpack_require__(1199);
/* import */ var _base_resource_client__rspack_import_2 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_3 = __webpack_require__(9435);
/* provided dependency */ var Buffer = __webpack_require__(8287)["Buffer"];
// eslint-disable-next-line max-classes-per-file





/**
 * Client for accessing Actor run or build logs.
 *
 * Provides methods to retrieve logs as text or stream them in real-time. Logs can be accessed
 * for both running and finished Actor runs and builds.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const runClient = client.run('my-run-id');
 *
 * // Get the log content
 * const log = await runClient.log().get();
 * console.log(log);
 *
 * // Stream the log in real-time
 * const stream = await runClient.log().stream();
 * stream.on('line', (line) => console.log(line));
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds#logging
 */ class LogClient extends _base_resource_client__rspack_import_2.ResourceClient {
    /**
     * Retrieves the log as a string.
     *
     * @param options - Log retrieval options.
     * @param options.raw - If `true`, returns raw log content without any processing. Default is `false`.
     * @returns The log content as a string, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/log-get
     */ async get() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(options)
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_3.cast)(response.data);
        } catch (err) {
            (0,_utils__rspack_import_3.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Retrieves the log as a Readable stream. Only works in Node.js.
     *
     * @param options - Log retrieval options.
     * @param options.raw - If `true`, returns raw log content without any processing. Default is `false`.
     * @returns The log content as a Readable stream, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/log-get
     */ async stream() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const params = {
            stream: true,
            raw: options.raw
        };
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(params),
            responseType: 'stream'
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_3.cast)(response.data);
        } catch (err) {
            (0,_utils__rspack_import_3.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'logs',
            ...options
        });
    }
}
/**
 * Logger for redirected actor logs.
 */ class LoggerActorRedirect extends _apify_log__rspack_import_1.Logger {
    _log(level, message, data, exception) {
        let opts = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
        if (level > this.options.level) {
            return;
        }
        if (data || exception) {
            throw new Error('Redirect logger does not use other arguments than level and message');
        }
        let { prefix } = opts;
        prefix = prefix ? `${prefix}` : '';
        let maybeDate = '';
        if (!this.options.skipTime) {
            maybeDate = `${new Date().toISOString().replace('Z', '').replace('T', ' ')} `;
        }
        const line = `${ansi_colors__rspack_import_0_default().gray(maybeDate)}${ansi_colors__rspack_import_0_default().cyan(prefix)}${message || ''}`;
        // All redirected logs are logged at info level to avid any console specific formating for non-info levels,
        // which have already been applied once to the original log. (For example error stack traces etc.)
        this._outputWithConsole(_apify_log__rspack_import_1.LogLevel.INFO, line);
        return line;
    }
    constructor(options = {}){
        super({
            skipTime: true,
            level: _apify_log__rspack_import_1.LogLevel.DEBUG,
            ...options
        });
    }
}
/**
 * Helper class for redirecting streamed Actor logs to another log.
 */ class StreamedLog {
    /**
     * Start log redirection.
     */ start() {
        if (this.streamingTask) {
            throw new Error('Streaming task already active');
        }
        this.stopLogging = false;
        this.streamingTask = this.streamLog();
    }
    /**
     * Stop log redirection.
     */ async stop() {
        if (!this.streamingTask) {
            throw new Error('Streaming task is not active');
        }
        this.stopLogging = true;
        try {
            await this.streamingTask;
        } catch (err) {
            if (!(err instanceof Error && err.name === 'AbortError')) {
                throw err;
            }
        } finally{
            this.streamingTask = null;
        }
    }
    /**
     * Get log stream from response and redirect it to another log.
     */ async streamLog() {
        const logStream = await this.logClient.stream({
            raw: true
        });
        if (!logStream) {
            return;
        }
        const lastChunkRemainder = await this.logStreamChunks(logStream);
        // Process whatever is left when exiting. Maybe it is incomplete, maybe it is last log without EOL.
        const lastMessage = Buffer.from(lastChunkRemainder).toString().trim();
        if (lastMessage.length) {
            this.destinationLog.info(lastMessage);
        }
    }
    async logStreamChunks(logStream) {
        // Chunk may be incomplete. Keep remainder for next chunk.
        let previousChunkRemainder = new Uint8Array();
        for await (const chunk of logStream){
            // Handle possible leftover incomplete line from previous chunk.
            // Everything before last end of line is complete.
            const chunkWithPreviousRemainder = new Uint8Array(previousChunkRemainder.length + chunk.length);
            chunkWithPreviousRemainder.set(previousChunkRemainder, 0);
            chunkWithPreviousRemainder.set(chunk, previousChunkRemainder.length);
            const lastCompleteMessageIndex = chunkWithPreviousRemainder.lastIndexOf(0x0a);
            previousChunkRemainder = chunkWithPreviousRemainder.slice(lastCompleteMessageIndex);
            // Push complete part of the chunk to the buffer
            this.streamBuffer.push(Buffer.from(chunkWithPreviousRemainder.slice(0, lastCompleteMessageIndex)));
            this.logBufferContent();
            // Keep processing the new data until stopped
            if (this.stopLogging) {
                break;
            }
        }
        return previousChunkRemainder;
    }
    /**
     * Parse the buffer and log complete messages.
     */ logBufferContent() {
        const allParts = Buffer.concat(this.streamBuffer).toString().split(this.splitMarker).slice(1);
        // Parse the buffer parts into complete messages
        const messageMarkers = allParts.filter((_, i)=>i % 2 === 0);
        const messageContents = allParts.filter((_, i)=>i % 2 !== 0);
        this.streamBuffer = [];
        messageMarkers.forEach((marker, index)=>{
            const decodedMarker = marker;
            const decodedContent = messageContents[index];
            if (this.relevancyTimeLimit) {
                // Log only relevant messages. Ignore too old log messages.
                const logTime = new Date(decodedMarker);
                if (logTime < this.relevancyTimeLimit) {
                    return;
                }
            }
            const message = decodedMarker + decodedContent;
            // Original log level information is not available. Log all on info level. Log level could be guessed for
            // some logs, but for any multiline logs such guess would be probably correct only for the first line.
            this.destinationLog.info(message.trim());
        });
    }
    constructor(options){
        (0,_swc_helpers_define_property__rspack_import_4._)(this, "destinationLog", void 0);
        (0,_swc_helpers_define_property__rspack_import_4._)(this, "streamBuffer", []);
        (0,_swc_helpers_define_property__rspack_import_4._)(this, "splitMarker", /(?:\n|^)(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/g);
        (0,_swc_helpers_define_property__rspack_import_4._)(this, "relevancyTimeLimit", void 0);
        (0,_swc_helpers_define_property__rspack_import_4._)(this, "logClient", void 0);
        (0,_swc_helpers_define_property__rspack_import_4._)(this, "streamingTask", null);
        (0,_swc_helpers_define_property__rspack_import_4._)(this, "stopLogging", false);
        const { toLog, logClient, fromStart = true } = options;
        this.destinationLog = toLog;
        this.logClient = logClient;
        this.relevancyTimeLimit = fromStart ? null : new Date();
    }
}


},
1117(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RequestQueueClient: () => (RequestQueueClient)
});
/* import */ var _swc_helpers_define_property__rspack_import_5 = __webpack_require__(467);
/* import */ var ow__rspack_import_4 = __webpack_require__(4980);
/* import */ var ow__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_4);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _apify_log__rspack_import_1 = __webpack_require__(1199);
/* import */ var _base_resource_client__rspack_import_2 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_3 = __webpack_require__(9435);






const DEFAULT_PARALLEL_BATCH_ADD_REQUESTS = 5;
const DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS = 3;
const DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS = 500;
const DEFAULT_REQUEST_QUEUE_REQUEST_PAGE_LIMIT = 1000;
const SAFETY_BUFFER_PERCENT = 0.01 / 100; // 0.01%
/**
 * Client for managing a specific Request queue.
 *
 * Request queues store URLs to be crawled and their metadata. Each request in the queue has a unique ID
 * and can be in various states (pending, handled). This client provides methods to add, get, update,
 * and delete requests, as well as manage the queue itself.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const queueClient = client.requestQueue('my-queue-id');
 *
 * // Add a request to the queue
 * await queueClient.addRequest({
 *   url: 'https://example.com',
 *   uniqueKey: 'example-com'
 * });
 *
 * // Get the next request from the queue
 * const request = await queueClient.listHead();
 *
 * // Mark request as handled
 * await queueClient.updateRequest({
 *   id: request.id,
 *   handledAt: new Date().toISOString()
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/storage/request-queue
 */ class RequestQueueClient extends _base_resource_client__rspack_import_2.ResourceClient {
    /**
     * Gets the Request queue object from the Apify API.
     *
     * @returns The RequestQueue object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/request-queue-get
     */ async get() {
        return this._get({}, _base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Updates the Request queue with specified fields.
     *
     * @param newFields - Fields to update in the Request queue
     * @returns The updated RequestQueue object
     * @see https://docs.apify.com/api/v2/request-queue-put
     */ async update(newFields) {
        ow__rspack_import_4_default()(newFields, (ow__rspack_import_4_default().object));
        return this._update(newFields, _base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Deletes the Request queue.
     *
     * @see https://docs.apify.com/api/v2/request-queue-delete
     */ async delete() {
        return this._delete(_base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS);
    }
    /**
     * Lists requests from the beginning of the queue (head).
     *
     * Returns the first N requests from the queue without locking them. This is useful for
     * inspecting what requests are waiting to be processed.
     *
     * @param options - Options for listing (e.g., limit)
     * @returns List of requests from the queue head
     * @see https://docs.apify.com/api/v2/request-queue-head-get
     */ async listHead() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            limit: (ow__rspack_import_4_default().optional.number.not.negative)
        }));
        const response = await this.httpClient.call({
            url: this._url('head'),
            method: 'GET',
            timeout: Math.min(_base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            params: this._params({
                limit: options.limit,
                clientKey: this.clientKey
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
    }
    /**
     * Gets and locks the next requests from the queue head for processing.
     *
     * This method retrieves requests from the beginning of the queue and locks them for
     * the specified duration to prevent other clients from processing them simultaneously.
     * This is the primary method used by distributed web crawlers to coordinate work across
     * multiple workers. Locked requests won't be returned to other clients until the lock expires
     * or is explicitly released using {@link deleteRequestLock}.
     *
     * @param options - Lock configuration
     * @param options.lockSecs - **Required.** Duration in seconds to lock the requests. After this time, the locks expire and requests can be retrieved by other clients.
     * @param options.limit - Maximum number of requests to return. Default is 25.
     * @returns Object containing `items` (locked requests), `queueModifiedAt`, `hadMultipleClients`, and lock information
     * @see https://docs.apify.com/api/v2/request-queue-head-lock-post
     *
     * @example
     * ```javascript
     * // Get and lock up to 10 requests for 60 seconds
     * const { items, lockSecs } = await client.requestQueue('my-queue').listAndLockHead({
     *   lockSecs: 60,
     *   limit: 10
     * });
     *
     * // Process each locked request
     * for (const request of items) {
     *   console.log(`Processing: ${request.url}`);
     *   // ... process request ...
     *   // Delete lock after successful processing
     *   await client.requestQueue('my-queue').deleteRequestLock(request.id);
     * }
     * ```
     */ async listAndLockHead(options) {
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            lockSecs: (ow__rspack_import_4_default().number),
            limit: (ow__rspack_import_4_default().optional.number.not.negative)
        }));
        const response = await this.httpClient.call({
            url: this._url('head/lock'),
            method: 'POST',
            timeout: Math.min(_base_resource_client__rspack_import_2.MEDIUM_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            params: this._params({
                limit: options.limit,
                lockSecs: options.lockSecs,
                clientKey: this.clientKey
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
    }
    /**
     * Adds a single request to the queue.
     *
     * If a request with the same `uniqueKey` already exists, the method will return information
     * about the existing request without adding a duplicate. The `uniqueKey` is used for
     * deduplication - typically it's the URL, but you can use any string to identify the request.
     *
     * @param request - The request object to add (excluding `id`, which is assigned by the API)
     * @param request.url - URL to be crawled
     * @param request.uniqueKey - Unique identifier for request deduplication. If not provided, defaults to `url`.
     * @param request.method - HTTP method. Default is `'GET'`.
     * @param request.userData - Custom user data (arbitrary JSON object) associated with the request.
     * @param request.headers - HTTP headers to use for the request.
     * @param request.payload - HTTP payload for POST/PUT requests (string).
     * @param options - Additional options
     * @param options.forefront - If `true`, adds the request to the beginning of the queue. Default is `false` (adds to the end).
     * @returns Object with `requestId`, `wasAlreadyPresent`, and `wasAlreadyHandled` flags
     * @see https://docs.apify.com/api/v2/request-queue-requests-post
     *
     * @example
     * ```javascript
     * const result = await client.requestQueue('my-queue').addRequest({
     *   url: 'https://example.com',
     *   uniqueKey: 'example-page',
     *   method: 'GET',
     *   userData: { label: 'START', depth: 0 }
     * });
     * console.log(`Request ID: ${result.requestId}`);
     * console.log(`Already present: ${result.wasAlreadyPresent}`);
     * console.log(`Already handled: ${result.wasAlreadyHandled}`);
     *
     * // Add urgent request to the front of the queue
     * await client.requestQueue('my-queue').addRequest(
     *   { url: 'https://priority.com', uniqueKey: 'priority-page' },
     *   { forefront: true }
     * );
     * ```
     */ async addRequest(request) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_4_default()(request, ow__rspack_import_4_default().object.partialShape({
            id: (ow__rspack_import_4_default().undefined)
        }));
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            forefront: (ow__rspack_import_4_default().optional.boolean)
        }));
        const response = await this.httpClient.call({
            url: this._url('requests'),
            method: 'POST',
            timeout: Math.min(_base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            data: request,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
    }
    /**
     * Writes requests to Request queue in batch.
     *
     * @private
     */ async _batchAddRequests(requests) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_4_default()(requests, ow__rspack_import_4_default().array.ofType(ow__rspack_import_4_default().object.partialShape({
            id: (ow__rspack_import_4_default().undefined)
        })).minLength(1).maxLength(_apify_consts__rspack_import_0.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION));
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            forefront: (ow__rspack_import_4_default().optional.boolean)
        }));
        const { data } = await this.httpClient.call({
            url: this._url('requests/batch'),
            method: 'POST',
            timeout: Math.min(_base_resource_client__rspack_import_2.MEDIUM_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            data: requests,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(data)));
    }
    async _batchAddRequestsWithRetries(requests) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const { forefront, maxUnprocessedRequestsRetries = DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS, minDelayBetweenUnprocessedRequestsRetriesMillis = DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS } = options;
        // Keep track of the requests that remain to be processed (in parameter format)
        let remainingRequests = requests;
        // Keep track of the requests that have been processed (in api format)
        const processedRequests = [];
        // The requests we have not been able to process in the last call
        // ie. those we have not been able to process at all
        let unprocessedRequests = [];
        for(let i = 0; i < 1 + maxUnprocessedRequestsRetries; i++){
            try {
                const response = await this._batchAddRequests(remainingRequests, {
                    forefront
                });
                processedRequests.push(...response.processedRequests);
                unprocessedRequests = response.unprocessedRequests;
                // Consider request with unprocessed requests as rate limited.
                // NOTE: This is important for SDK, the rate limit errors are read by AutoScalePool and used to potentially downscale.
                if (unprocessedRequests.length !== 0) {
                    this.httpClient.stats.addRateLimitError(i + 1);
                }
                // Get unique keys of all requests processed so far
                const processedRequestsUniqueKeys = processedRequests.map((param)=>{
                    let { uniqueKey } = param;
                    return uniqueKey;
                });
                // Requests remaining to be processed are the all that remain
                remainingRequests = requests.filter((param)=>{
                    let { uniqueKey } = param;
                    return !processedRequestsUniqueKeys.includes(uniqueKey);
                });
                // Stop if all requests have been processed
                if (remainingRequests.length === 0) {
                    break;
                }
            } catch (err) {
                _apify_log__rspack_import_1["default"].exception(err, 'Request batch insert failed');
                // When something fails and http client does not retry, the remaining requests are treated as unprocessed.
                // This ensures that this method does not throw and keeps the signature.
                const processedRequestsUniqueKeys = processedRequests.map((param)=>{
                    let { uniqueKey } = param;
                    return uniqueKey;
                });
                unprocessedRequests = requests.filter((param)=>{
                    let { uniqueKey } = param;
                    return !processedRequestsUniqueKeys.includes(uniqueKey);
                }).map((param)=>{
                    let { method, uniqueKey, url } = param;
                    return {
                        method,
                        uniqueKey,
                        url
                    };
                });
                break;
            }
            // Exponential backoff
            const delayMillis = Math.floor((1 + Math.random()) * 2 ** i * minDelayBetweenUnprocessedRequestsRetriesMillis);
            await new Promise((resolve)=>{
                setTimeout(resolve, delayMillis);
            });
        }
        const result = {
            processedRequests,
            unprocessedRequests
        };
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)(result));
    }
    /**
     * Adds multiple requests to the queue in a single operation.
     *
     * This is significantly more efficient than calling {@link addRequest} multiple times, especially
     * for large batches. The method automatically handles batching (max 25 requests per API call),
     * retries on rate limiting, and parallel processing. Requests are sent in chunks respecting the
     * API payload size limit, and any unprocessed requests due to rate limits are automatically
     * retried with exponential backoff.
     *
     * @param requests - Array of request objects to add (excluding `id` fields)
     * @param options - Batch operation configuration
     * @param options.forefront - If `true`, adds all requests to the beginning of the queue. Default is `false`.
     * @param options.maxUnprocessedRequestsRetries - Maximum number of retry attempts for rate-limited requests. Default is 3.
     * @param options.maxParallel - Maximum number of parallel batch API calls. Default is 5.
     * @param options.minDelayBetweenUnprocessedRequestsRetriesMillis - Minimum delay before retrying rate-limited requests. Default is 500ms.
     * @returns Object with `processedRequests` (successfully added) and `unprocessedRequests` (failed after all retries)
     * @see https://docs.apify.com/api/v2/request-queue-requests-batch-post
     *
     * @example
     * ```javascript
     * // Add a batch of URLs to crawl
     * const requests = [
     *   { url: 'https://example.com', uniqueKey: 'page1', userData: { depth: 1 } },
     *   { url: 'https://example.com/2', uniqueKey: 'page2', userData: { depth: 1 } },
     *   { url: 'https://example.com/3', uniqueKey: 'page3', userData: { depth: 1 } }
     * ];
     * const result = await client.requestQueue('my-queue').batchAddRequests(requests);
     * console.log(`Successfully added: ${result.processedRequests.length}`);
     * console.log(`Failed: ${result.unprocessedRequests.length}`);
     *
     * // Batch add with custom retry settings
     * const result = await client.requestQueue('my-queue').batchAddRequests(
     *   requests,
     *   { maxUnprocessedRequestsRetries: 5, maxParallel: 10 }
     * );
     * ```
     */ async batchAddRequests(requests) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const { forefront, maxUnprocessedRequestsRetries = DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS, maxParallel = DEFAULT_PARALLEL_BATCH_ADD_REQUESTS, minDelayBetweenUnprocessedRequestsRetriesMillis = DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS } = options;
        ow__rspack_import_4_default()(requests, ow__rspack_import_4_default().array.ofType(ow__rspack_import_4_default().object.partialShape({
            id: (ow__rspack_import_4_default().undefined)
        })).minLength(1));
        ow__rspack_import_4_default()(forefront, (ow__rspack_import_4_default().optional.boolean));
        ow__rspack_import_4_default()(maxUnprocessedRequestsRetries, (ow__rspack_import_4_default().optional.number));
        ow__rspack_import_4_default()(maxParallel, (ow__rspack_import_4_default().optional.number));
        ow__rspack_import_4_default()(minDelayBetweenUnprocessedRequestsRetriesMillis, (ow__rspack_import_4_default().optional.number));
        const executingRequests = new Set();
        const individualResults = [];
        const payloadSizeLimitBytes = _apify_consts__rspack_import_0.MAX_PAYLOAD_SIZE_BYTES - Math.ceil(_apify_consts__rspack_import_0.MAX_PAYLOAD_SIZE_BYTES * SAFETY_BUFFER_PERCENT);
        // Keep a pool of up to `maxParallel` requests running at once
        let i = 0;
        while(i < requests.length){
            const slicedRequests = requests.slice(i, i + _apify_consts__rspack_import_0.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION);
            const requestsInBatch = (0,_utils__rspack_import_3.sliceArrayByByteLength)(slicedRequests, payloadSizeLimitBytes, i);
            const requestPromise = this._batchAddRequestsWithRetries(requestsInBatch, options);
            executingRequests.add(requestPromise);
            void requestPromise.then((batchAddResult)=>{
                executingRequests.delete(requestPromise);
                individualResults.push(batchAddResult);
            });
            if (executingRequests.size >= maxParallel) {
                await Promise.race(executingRequests);
            }
            i += requestsInBatch.length;
        }
        // Get results from remaining operations
        await Promise.all(executingRequests);
        // Combine individual results together
        const result = {
            processedRequests: [],
            unprocessedRequests: []
        };
        individualResults.forEach((param)=>{
            let { processedRequests, unprocessedRequests } = param;
            result.processedRequests.push(...processedRequests);
            result.unprocessedRequests.push(...unprocessedRequests);
        });
        return result;
    }
    /**
     * Deletes multiple requests from the queue in a single operation.
     *
     * Requests can be identified by either their ID or unique key.
     *
     * @param requests - Array of requests to delete (by id or uniqueKey)
     * @returns Result containing processed and unprocessed requests
     * @see https://docs.apify.com/api/v2/request-queue-requests-batch-delete
     */ async batchDeleteRequests(requests) {
        ow__rspack_import_4_default()(requests, ow__rspack_import_4_default().array.ofType(ow__rspack_import_4_default().any(ow__rspack_import_4_default().object.partialShape({
            id: (ow__rspack_import_4_default().string)
        }), ow__rspack_import_4_default().object.partialShape({
            uniqueKey: (ow__rspack_import_4_default().string)
        }))).minLength(1).maxLength(_apify_consts__rspack_import_0.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION));
        const { data } = await this.httpClient.call({
            url: this._url('requests/batch'),
            method: 'DELETE',
            timeout: Math.min(_base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            data: requests,
            params: this._params({
                clientKey: this.clientKey
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(data)));
    }
    /**
     * Gets a specific request from the queue by its ID.
     *
     * @param id - Request ID
     * @returns The request object, or `undefined` if not found
     * @see https://docs.apify.com/api/v2/request-queue-request-get
     */ async getRequest(id) {
        ow__rspack_import_4_default()(id, (ow__rspack_import_4_default().string));
        const requestOpts = {
            url: this._url(`requests/${id}`),
            method: 'GET',
            timeout: Math.min(_base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            params: this._params()
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
        } catch (err) {
            (0,_utils__rspack_import_3.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Updates a request in the queue.
     *
     * @param request - The updated request object (must include id)
     * @param options - Update options such as whether to move to front
     * @returns Information about the updated request
     * @see https://docs.apify.com/api/v2/request-queue-request-put
     */ async updateRequest(request) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_4_default()(request, ow__rspack_import_4_default().object.partialShape({
            id: (ow__rspack_import_4_default().string)
        }));
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            forefront: (ow__rspack_import_4_default().optional.boolean)
        }));
        const response = await this.httpClient.call({
            url: this._url(`requests/${request.id}`),
            method: 'PUT',
            timeout: Math.min(_base_resource_client__rspack_import_2.MEDIUM_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            data: request,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
    }
    /**
     * Deletes a specific request from the queue.
     *
     * @param id - Request ID
     */ async deleteRequest(id) {
        ow__rspack_import_4_default()(id, (ow__rspack_import_4_default().string));
        await this.httpClient.call({
            url: this._url(`requests/${id}`),
            method: 'DELETE',
            timeout: Math.min(_base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            params: this._params({
                clientKey: this.clientKey
            })
        });
    }
    /**
     * Prolongs the lock on a request to prevent it from being returned to other clients.
     *
     * This is useful when processing a request takes longer than expected and you need
     * to extend the lock duration to prevent other workers from picking it up. The lock
     * expiration time is reset to the current time plus the specified duration.
     *
     * @param id - Request ID (obtained from {@link listAndLockHead} or {@link getRequest})
     * @param options - Lock extension options
     * @param options.lockSecs - **Required.** New lock duration in seconds from now.
     * @param options.forefront - If `true`, moves the request to the beginning of the queue when the lock expires. Default is `false`.
     * @returns Object with new `lockExpiresAt` timestamp
     * @see https://docs.apify.com/api/v2/request-queue-request-lock-put
     *
     * @example
     * ```javascript
     * // Lock request for initial processing
     * const { items } = await client.requestQueue('my-queue').listAndLockHead({ lockSecs: 60, limit: 1 });
     * const request = items[0];
     *
     * // Processing takes longer than expected, extend the lock
     * await client.requestQueue('my-queue').prolongRequestLock(request.id, { lockSecs: 120 });
     * ```
     */ async prolongRequestLock(id, options) {
        ow__rspack_import_4_default()(id, (ow__rspack_import_4_default().string));
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            lockSecs: (ow__rspack_import_4_default().number),
            forefront: (ow__rspack_import_4_default().optional.boolean)
        }));
        const response = await this.httpClient.call({
            url: this._url(`requests/${id}/lock`),
            method: 'PUT',
            timeout: Math.min(_base_resource_client__rspack_import_2.MEDIUM_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            params: this._params({
                forefront: options.forefront,
                lockSecs: options.lockSecs,
                clientKey: this.clientKey
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
    }
    /**
     * Releases the lock on a request, allowing other clients to process it.
     *
     * This should be called after successfully processing a request or when you decide
     * not to process it.
     *
     * @param id - Request ID
     * @param options - Options such as whether to move to front
     * @see https://docs.apify.com/api/v2/request-queue-request-lock-delete
     */ async deleteRequestLock(id) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_4_default()(id, (ow__rspack_import_4_default().string));
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            forefront: (ow__rspack_import_4_default().optional.boolean)
        }));
        await this.httpClient.call({
            url: this._url(`requests/${id}/lock`),
            method: 'DELETE',
            timeout: Math.min(_base_resource_client__rspack_import_2.SMALL_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey
            })
        });
    }
    /**
     * Lists all requests in the queue.
     *
     * Returns a paginated list of all requests, allowing you to iterate through the entire
     * queue contents.
     *
     * @param options - Pagination options
     * @returns List of requests with pagination information
     * @see https://docs.apify.com/api/v2/request-queue-requests-get
     */ listRequests() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var _this = this;
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            limit: (ow__rspack_import_4_default().optional.number.not.negative),
            exclusiveStartId: (ow__rspack_import_4_default().optional.string)
        }));
        const getPaginatedList = async function() {
            let rqListOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            const response = await _this.httpClient.call({
                url: _this._url('requests'),
                method: 'GET',
                timeout: Math.min(_base_resource_client__rspack_import_2.MEDIUM_TIMEOUT_MILLIS, _this.timeoutMillis ?? Infinity),
                params: _this._params({
                    ...rqListOptions,
                    clientKey: _this.clientKey
                })
            });
            return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
        };
        const paginatedListPromise = getPaginatedList(options);
        async function* asyncGenerator() {
            let currentPage = await paginatedListPromise;
            yield* currentPage.items;
            let remainingItems = options.limit ? options.limit - currentPage.items.length : undefined;
            // RQ API response does not indicate whether there are more requests left, so we have to try and in case
            // of exhausting all requests we get response with empty items which ends the loop.
            while(currentPage.items.length > 0 && // Continue only if at least some items were returned in the last page.
            (remainingItems === undefined || remainingItems > 0 // Continue only if the limit was not exceeded.
            )){
                const exclusiveStartId = currentPage.items[currentPage.items.length - 1].id;
                const newOptions = {
                    ...options,
                    limit: remainingItems,
                    exclusiveStartId
                };
                currentPage = await getPaginatedList(newOptions);
                yield* currentPage.items;
                if (remainingItems) {
                    remainingItems -= currentPage.items.length;
                }
            }
        }
        return Object.defineProperty(paginatedListPromise, Symbol.asyncIterator, {
            value: asyncGenerator
        });
    }
    /**
     * Unlocks all requests locked by this client.
     *
     * This is useful for releasing all locks at once, for example when shutting down
     * a crawler gracefully.
     *
     * @returns Number of requests that were unlocked
     * @see https://docs.apify.com/api/v2/request-queue-requests-unlock-post
     */ async unlockRequests() {
        const response = await this.httpClient.call({
            url: this._url('requests/unlock'),
            method: 'POST',
            timeout: Math.min(_base_resource_client__rspack_import_2.MEDIUM_TIMEOUT_MILLIS, this.timeoutMillis ?? Infinity),
            params: this._params({
                clientKey: this.clientKey
            })
        });
        return (0,_utils__rspack_import_3.cast)((0,_utils__rspack_import_3.parseDateFields)((0,_utils__rspack_import_3.pluckData)(response.data)));
    }
    /**
     * Returns an async iterable for paginating through all requests in the queue.
     *
     * This allows you to efficiently process all requests using a for-await-of loop,
     * automatically handling pagination behind the scenes.
     *
     * @param options - Pagination options
     * @returns An async iterable of request pages
     * @see https://docs.apify.com/api/v2/request-queue-requests-get
     *
     * @example
     * ```javascript
     * for await (const { items } of client.requestQueue('my-queue').paginateRequests({ limit: 100 })) {
     *   items.forEach((request) => console.log(request.url));
     * }
     * ```
     */ paginateRequests() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_4_default()(options, ow__rspack_import_4_default().object.exactShape({
            limit: (ow__rspack_import_4_default().optional.number.not.negative),
            maxPageLimit: (ow__rspack_import_4_default().optional.number),
            exclusiveStartId: (ow__rspack_import_4_default().optional.string)
        }));
        const { limit, exclusiveStartId, maxPageLimit = DEFAULT_REQUEST_QUEUE_REQUEST_PAGE_LIMIT } = options;
        return new _utils__rspack_import_3.PaginationIterator({
            getPage: this.listRequests.bind(this),
            limit,
            exclusiveStartId,
            maxPageLimit
        });
    }
    /**
     * @hidden
     */ constructor(options, userOptions = {}){
        super({
            resourcePath: 'request-queues',
            ...options
        }), (0,_swc_helpers_define_property__rspack_import_5._)(this, "clientKey", void 0), (0,_swc_helpers_define_property__rspack_import_5._)(this, "timeoutMillis", void 0);
        this.clientKey = userOptions.clientKey;
        this.timeoutMillis = userOptions.timeoutSecs ? userOptions.timeoutSecs * 1e3 : undefined;
    }
}


},
228(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RequestQueueCollectionClient: () => (RequestQueueCollectionClient)
});
/* import */ var ow__rspack_import_2 = __webpack_require__(4980);
/* import */ var ow__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_2);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _base_resource_collection_client__rspack_import_1 = __webpack_require__(577);



/**
 * Client for managing the collection of Request queues in your account.
 *
 * Request queues store URLs to be crawled and their metadata. This client provides methods
 * to list, create, or get request queues by name.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const queuesClient = client.requestQueues();
 *
 * // List all request queues
 * const { items } = await queuesClient.list();
 *
 * // Get or create a request queue by name
 * const queue = await queuesClient.getOrCreate('my-queue');
 * ```
 *
 * @see https://docs.apify.com/platform/storage/request-queue
 */ class RequestQueueCollectionClient extends _base_resource_collection_client__rspack_import_1.ResourceCollectionClient {
    /**
     * Lists all Request queues.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination options.
     * @returns A paginated iterator of Request queues.
     * @see https://docs.apify.com/api/v2/request-queues-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_2_default()(options, ow__rspack_import_2_default().object.exactShape({
            unnamed: (ow__rspack_import_2_default().optional.boolean),
            limit: (ow__rspack_import_2_default().optional.number.not.negative),
            offset: (ow__rspack_import_2_default().optional.number.not.negative),
            desc: (ow__rspack_import_2_default().optional.boolean),
            ownership: ow__rspack_import_2_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.STORAGE_OWNERSHIP_FILTER))
        }));
        return this._listPaginated(options);
    }
    /**
     * Gets or creates a Request queue with the specified name.
     *
     * @param name - Name of the Request queue. If not provided, a default queue is used.
     * @returns The Request queue object.
     * @see https://docs.apify.com/api/v2/request-queues-post
     */ async getOrCreate(name) {
        ow__rspack_import_2_default()(name, (ow__rspack_import_2_default().optional.string));
        return this._getOrCreate(name);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'request-queues',
            ...options
        });
    }
}


},
8506(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RunClient: () => (RunClient)
});
/* import */ var ow__rspack_import_7 = __webpack_require__(4980);
/* import */ var ow__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_7);
/* import */ var _apify_log__rspack_import_0 = __webpack_require__(1199);
/* import */ var _base_resource_client__rspack_import_1 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_2 = __webpack_require__(9435);
/* import */ var _dataset__rspack_import_3 = __webpack_require__(9032);
/* import */ var _key_value_store__rspack_import_4 = __webpack_require__(5419);
/* import */ var _log__rspack_import_5 = __webpack_require__(4386);
/* import */ var _request_queue__rspack_import_6 = __webpack_require__(1117);








const RUN_CHARGE_IDEMPOTENCY_HEADER = 'idempotency-key';
/**
 * Client for managing a specific Actor run.
 *
 * Provides methods to get run details, abort, metamorph, resurrect, wait for completion,
 * and access the run's dataset, key-value store, request queue, and logs.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const runClient = client.run('my-run-id');
 *
 * // Get run details
 * const run = await runClient.get();
 *
 * // Wait for the run to finish
 * const finishedRun = await runClient.waitForFinish();
 *
 * // Access the run's dataset
 * const { items } = await runClient.dataset().listItems();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds
 */ class RunClient extends _base_resource_client__rspack_import_1.ResourceClient {
    /**
     * Gets the Actor run object from the Apify API.
     *
     * @param options - Get options
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the run to finish on the API side before returning. Default is 0 (returns immediately).
     * @returns The ActorRun object, or `undefined` if it does not exist
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Get run status immediately
     * const run = await client.run('run-id').get();
     * console.log(`Status: ${run.status}`);
     *
     * // Wait up to 60 seconds for run to finish
     * const run = await client.run('run-id').get({ waitForFinish: 60 });
     * ```
     */ async get() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_7_default()(options, ow__rspack_import_7_default().object.exactShape({
            waitForFinish: (ow__rspack_import_7_default().optional.number)
        }));
        return this._get(options);
    }
    /**
     * Aborts the Actor run.
     *
     * @param options - Abort options
     * @param options.gracefully - If `true`, the Actor run will abort gracefully - it can send status messages and perform cleanup. Default is `false` (immediate abort).
     * @returns The updated ActorRun object with `ABORTING` or `ABORTED` status
     * @see https://docs.apify.com/api/v2/actor-run-abort-post
     *
     * @example
     * ```javascript
     * // Abort immediately
     * await client.run('run-id').abort();
     *
     * // Abort gracefully (allows cleanup)
     * await client.run('run-id').abort({ gracefully: true });
     * ```
     */ async abort() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_7_default()(options, ow__rspack_import_7_default().object.exactShape({
            gracefully: (ow__rspack_import_7_default().optional.boolean)
        }));
        const response = await this.httpClient.call({
            url: this._url('abort'),
            method: 'POST',
            params: this._params(options)
        });
        return (0,_utils__rspack_import_2.cast)((0,_utils__rspack_import_2.parseDateFields)((0,_utils__rspack_import_2.pluckData)(response.data)));
    }
    /**
     * Deletes the Actor run.
     *
     * @see https://docs.apify.com/api/v2/actor-run-delete
     */ async delete() {
        return this._delete();
    }
    /**
     * Transforms the Actor run into a run of another Actor (metamorph).
     *
     * This operation preserves the run ID, storages (dataset, key-value store, request queue),
     * and resource allocation. The run effectively becomes a run of the target Actor with new input.
     * This is useful for chaining Actor executions or implementing complex workflows.
     *
     * @param targetActorId - ID or username/name of the target Actor
     * @param input - Input for the target Actor. Can be any JSON-serializable value.
     * @param options - Metamorph options
     * @param options.build - Tag or number of the target Actor's build to run. Default is the target Actor's default build.
     * @param options.contentType - Content type of the input. If specified, input must be a string or Buffer.
     * @returns The metamorphed ActorRun object (same ID, but now running the target Actor)
     * @see https://docs.apify.com/api/v2/actor-run-metamorph-post
     *
     * @example
     * ```javascript
     * // Transform current run into another Actor
     * const metamorphedRun = await client.run('original-run-id').metamorph(
     *   'target-actor-id',
     *   { url: 'https://example.com' }
     * );
     * console.log(`Run ${metamorphedRun.id} is now running ${metamorphedRun.actId}`);
     * ```
     */ async metamorph(targetActorId, input) {
        let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        ow__rspack_import_7_default()(targetActorId, (ow__rspack_import_7_default().string));
        // input can be anything, pointless to validate
        ow__rspack_import_7_default()(options, ow__rspack_import_7_default().object.exactShape({
            contentType: (ow__rspack_import_7_default().optional.string),
            build: (ow__rspack_import_7_default().optional.string)
        }));
        const safeTargetActorId = this._toSafeId(targetActorId);
        const params = {
            targetActorId: safeTargetActorId,
            build: options.build
        };
        const request = {
            url: this._url('metamorph'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            // TODO: remove this ts-expect-error once we have defined custom Apify axios configs
            // @ts-expect-error Custom Apify property
            stringifyFunctions: true
        };
        if (options.contentType) {
            request.headers = {
                'content-type': options.contentType
            };
        }
        const response = await this.httpClient.call(request);
        return (0,_utils__rspack_import_2.cast)((0,_utils__rspack_import_2.parseDateFields)((0,_utils__rspack_import_2.pluckData)(response.data)));
    }
    /**
     * Reboots the Actor run.
     *
     * Rebooting restarts the Actor's Docker container while preserving the run ID and storages.
     * This can be useful to recover from certain errors or to force the Actor to restart
     * with a fresh environment.
     *
     * @returns The updated ActorRun object
     * @see https://docs.apify.com/api/v2/actor-run-reboot-post
     *
     * @example
     * ```javascript
     * const run = await client.run('run-id').reboot();
     * ```
     */ async reboot() {
        const request = {
            url: this._url('reboot'),
            method: 'POST'
        };
        const response = await this.httpClient.call(request);
        return (0,_utils__rspack_import_2.cast)((0,_utils__rspack_import_2.parseDateFields)((0,_utils__rspack_import_2.pluckData)(response.data)));
    }
    /**
     * Updates the Actor run with specified fields.
     *
     * @param newFields - Fields to update
     * @param newFields.statusMessage - Custom status message to display (e.g., "Processing page 10/100")
     * @param newFields.isStatusMessageTerminal - If `true`, the status message is final and won't be overwritten. Default is `false`.
     * @param newFields.generalAccess - General resource access level ('FOLLOW_USER_SETTING', 'ANYONE_WITH_ID_CAN_READ' or 'RESTRICTED')
     * @returns The updated ActorRun object
     *
     * @example
     * ```javascript
     * // Set a status message
     * await client.run('run-id').update({
     *   statusMessage: 'Processing items: 50/100'
     * });
     * ```
     */ async update(newFields) {
        ow__rspack_import_7_default()(newFields, (ow__rspack_import_7_default().object));
        return this._update(newFields);
    }
    /**
     * Resurrects a finished Actor run, starting it again with the same settings.
     *
     * This creates a new run with the same configuration as the original run. The original
     * run's storages (dataset, key-value store, request queue) are preserved and reused.
     *
     * @param options - Resurrection options (override original run settings)
     * @param options.build - Tag or number of the build to use. If not provided, uses the original run's build.
     * @param options.memory - Memory in megabytes. If not provided, uses the original run's memory.
     * @param options.timeout - Timeout in seconds. If not provided, uses the original run's timeout.
     * @param options.maxItems - Maximum number of dataset items (pay-per-result Actors).
     * @param options.maxTotalChargeUsd - Maximum cost in USD (pay-per-event Actors).
     * @param options.restartOnError - Whether to restart on error.
     * @returns The new (resurrected) ActorRun object
     * @see https://docs.apify.com/api/v2/post-resurrect-run
     *
     * @example
     * ```javascript
     * // Resurrect a failed run with more memory
     * const newRun = await client.run('failed-run-id').resurrect({ memory: 2048 });
     * console.log(`New run started: ${newRun.id}`);
     * ```
     */ async resurrect() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_7_default()(options, ow__rspack_import_7_default().object.exactShape({
            build: (ow__rspack_import_7_default().optional.string),
            memory: (ow__rspack_import_7_default().optional.number),
            timeout: (ow__rspack_import_7_default().optional.number),
            maxItems: (ow__rspack_import_7_default().optional.number),
            maxTotalChargeUsd: (ow__rspack_import_7_default().optional.number),
            restartOnError: (ow__rspack_import_7_default().optional.boolean)
        }));
        const response = await this.httpClient.call({
            url: this._url('resurrect'),
            method: 'POST',
            params: this._params(options)
        });
        return (0,_utils__rspack_import_2.cast)((0,_utils__rspack_import_2.parseDateFields)((0,_utils__rspack_import_2.pluckData)(response.data)));
    }
    /**
     * Charges the Actor run for a specific event.
     *
     * @param options - Charge options including event name and count.
     * @param options.eventName - **Required.** Name of the event to charge for.
     * @param options.count - Number of times to charge the event. Default is 1.
     * @param options.idempotencyKey - Optional key to ensure the charge is not duplicated. If not provided, one is auto-generated.
     * @returns Empty response object.
     * @see https://docs.apify.com/api/v2/post-charge-run
     */ async charge(options) {
        ow__rspack_import_7_default()(options, ow__rspack_import_7_default().object.exactShape({
            eventName: (ow__rspack_import_7_default().string),
            count: (ow__rspack_import_7_default().optional.number),
            idempotencyKey: (ow__rspack_import_7_default().optional.string)
        }));
        const count = options.count ?? 1;
        /** To avoid duplicates during the same milisecond, doesn't need to by crypto-secure. */ const randomSuffix = (Math.random() + 1).toString(36).slice(3, 8);
        const idempotencyKey = options.idempotencyKey ?? `${this.id}-${options.eventName}-${Date.now()}-${randomSuffix}`;
        const request = {
            url: this._url('charge'),
            method: 'POST',
            data: {
                eventName: options.eventName,
                count
            },
            headers: {
                [RUN_CHARGE_IDEMPOTENCY_HEADER]: idempotencyKey
            }
        };
        const response = await this.httpClient.call(request);
        return response;
    }
    /**
     * Waits for the Actor run to finish and returns the finished Run object.
     *
     * The promise resolves when the run reaches a terminal state (`SUCCEEDED`, `FAILED`, `ABORTED`, or `TIMED-OUT`).
     * If `waitSecs` is provided and the timeout is reached, the promise resolves with the unfinished
     * Run object (status will be `RUNNING` or `READY`). The promise is NOT rejected based on run status.
     *
     * Unlike the `waitForFinish` parameter in {@link get}, this method can wait indefinitely
     * by polling the run status. It uses the `waitForFinish` parameter internally (max 60s per call)
     * and continuously polls until the run finishes or the timeout is reached.
     *
     * @param options - Wait options
     * @param options.waitSecs - Maximum time to wait for the run to finish, in seconds. If the limit is reached, the returned promise resolves to a run object that will have status `READY` or `RUNNING`. If omitted, waits indefinitely.
     * @returns The ActorRun object (finished or still running if timeout was reached)
     *
     * @example
     * ```javascript
     * // Wait indefinitely for run to finish
     * const run = await client.run('run-id').waitForFinish();
     * console.log(`Run finished with status: ${run.status}`);
     *
     * // Wait up to 5 minutes
     * const run = await client.run('run-id').waitForFinish({ waitSecs: 300 });
     * if (run.status === 'SUCCEEDED') {
     *   console.log('Run succeeded!');
     * }
     * ```
     */ async waitForFinish() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_7_default()(options, ow__rspack_import_7_default().object.exactShape({
            waitSecs: (ow__rspack_import_7_default().optional.number)
        }));
        return this._waitForFinish(options);
    }
    /**
     * Returns a client for the default dataset of this Actor run.
     *
     * @returns A client for accessing the run's default dataset
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Access run's dataset
     * const { items } = await client.run('run-id').dataset().listItems();
     * ```
     */ dataset() {
        return new _dataset__rspack_import_3.DatasetClient(this._subResourceOptions({
            resourcePath: 'dataset'
        }));
    }
    /**
     * Returns a client for the default key-value store of this Actor run.
     *
     * @returns A client for accessing the run's default key-value store
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Access run's key-value store
     * const output = await client.run('run-id').keyValueStore().getRecord('OUTPUT');
     * ```
     */ keyValueStore() {
        return new _key_value_store__rspack_import_4.KeyValueStoreClient(this._subResourceOptions({
            resourcePath: 'key-value-store'
        }));
    }
    /**
     * Returns a client for the default Request queue of this Actor run.
     *
     * @returns A client for accessing the run's default Request queue
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Access run's Request queue
     * const { items } = await client.run('run-id').requestQueue().listHead();
     * ```
     */ requestQueue() {
        return new _request_queue__rspack_import_6.RequestQueueClient(this._subResourceOptions({
            resourcePath: 'request-queue'
        }));
    }
    /**
     * Returns a client for accessing the log of this Actor run.
     *
     * @returns A client for accessing the run's log
     * @see https://docs.apify.com/api/v2/actor-run-get
     *
     * @example
     * ```javascript
     * // Get run log
     * const log = await client.run('run-id').log().get();
     * console.log(log);
     * ```
     */ log() {
        return new _log__rspack_import_5.LogClient(this._subResourceOptions({
            resourcePath: 'log'
        }));
    }
    /**
     * Get StreamedLog for convenient streaming of the run log and their redirection.
     */ async getStreamedLog() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const { fromStart = true } = options;
        let { toLog } = options;
        if (toLog === null || !(0,_utils__rspack_import_2.isNode)()) {
            // Explicitly no logging or not in Node.js
            return undefined;
        }
        if (toLog === undefined || toLog === 'default') {
            // Create default StreamedLog
            // Get actor name and run id
            const runData = await this.get();
            const runId = (runData === null || runData === void 0 ? void 0 : runData.id) ?? '';
            const actorId = (runData === null || runData === void 0 ? void 0 : runData.actId) ?? '';
            const actorData = await this.apifyClient.actor(actorId).get() || {
                name: ''
            };
            const actorName = (actorData === null || actorData === void 0 ? void 0 : actorData.name) ?? '';
            const name = [
                actorName,
                `runId:${runId}`
            ].filter(Boolean).join(' ');
            toLog = new _apify_log__rspack_import_0.Log({
                level: _apify_log__rspack_import_0.LEVELS.DEBUG,
                prefix: `${name} -> `,
                logger: new _log__rspack_import_5.LoggerActorRedirect()
            });
        }
        return new _log__rspack_import_5.StreamedLog({
            logClient: this.log(),
            toLog,
            fromStart
        });
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            ...options,
            resourcePath: options.resourcePath || 'actor-runs'
        });
    }
}


},
6084(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RunCollectionClient: () => (RunCollectionClient)
});
/* import */ var ow__rspack_import_2 = __webpack_require__(4980);
/* import */ var ow__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_2);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _base_resource_collection_client__rspack_import_1 = __webpack_require__(577);



/**
 * Client for managing the collection of Actor runs.
 *
 * Provides methods to list Actor runs across all Actors or for a specific Actor.
 * To access an individual run, use the `run()` method on the main ApifyClient.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 *
 * // List all runs
 * const runsClient = client.runs();
 * const { items } = await runsClient.list();
 *
 * // List runs for a specific Actor
 * const actorRunsClient = client.actor('my-actor-id').runs();
 * const { items: actorRuns } = await actorRunsClient.list();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/runs-and-builds
 */ class RunCollectionClient extends _base_resource_collection_client__rspack_import_1.ResourceCollectionClient {
    /**
     * Lists all Actor runs.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination and filtering options.
     * @returns A paginated iterator of Actor runs.
     * @see https://docs.apify.com/api/v2/actor-runs-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_2_default()(options, ow__rspack_import_2_default().object.exactShape({
            limit: (ow__rspack_import_2_default().optional.number.not.negative),
            offset: (ow__rspack_import_2_default().optional.number.not.negative),
            desc: (ow__rspack_import_2_default().optional.boolean),
            status: ow__rspack_import_2_default().optional.any(ow__rspack_import_2_default().string.oneOf(Object.values(_apify_consts__rspack_import_0.ACTOR_JOB_STATUSES)), ow__rspack_import_2_default().array.ofType(ow__rspack_import_2_default().string.oneOf(Object.values(_apify_consts__rspack_import_0.ACTOR_JOB_STATUSES)))),
            startedBefore: ow__rspack_import_2_default().optional.any((ow__rspack_import_2_default().optional.date), (ow__rspack_import_2_default().optional.string)),
            startedAfter: ow__rspack_import_2_default().optional.any((ow__rspack_import_2_default().optional.date), (ow__rspack_import_2_default().optional.string))
        }));
        return this._listPaginated(options);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'runs',
            ...options
        });
    }
}


},
4011(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ScheduleActions: () => (ScheduleActions),
  ScheduleClient: () => (ScheduleClient)
});
/* import */ var ow__rspack_import_2 = __webpack_require__(4980);
/* import */ var ow__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_2);
/* import */ var _base_resource_client__rspack_import_0 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_1 = __webpack_require__(9435);



/**
 * Client for managing a specific Schedule.
 *
 * Schedules are used to automatically start Actors or tasks at specified times. This client provides
 * methods to get, update, and delete schedules, as well as retrieve schedule logs.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const scheduleClient = client.schedule('my-schedule-id');
 *
 * // Get schedule details
 * const schedule = await scheduleClient.get();
 *
 * // Update schedule
 * await scheduleClient.update({
 *   cronExpression: '0 12 * * *',
 *   isEnabled: true
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/schedules
 */ class ScheduleClient extends _base_resource_client__rspack_import_0.ResourceClient {
    /**
     * Retrieves the schedule.
     *
     * @returns The schedule object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/schedule-get
     */ async get() {
        return this._get();
    }
    /**
     * Updates the schedule with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated schedule object.
     * @see https://docs.apify.com/api/v2/schedule-put
     */ async update(newFields) {
        ow__rspack_import_2_default()(newFields, (ow__rspack_import_2_default().object));
        return this._update(newFields);
    }
    /**
     * Deletes the schedule.
     *
     * @see https://docs.apify.com/api/v2/schedule-delete
     */ async delete() {
        return this._delete();
    }
    /**
     * Retrieves the schedule's log.
     *
     * @returns The schedule log as a string, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/schedule-log-get
     */ async getLog() {
        const requestOpts = {
            url: this._url('log'),
            method: 'GET',
            params: this._params()
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_1.cast)((0,_utils__rspack_import_1.parseDateFields)((0,_utils__rspack_import_1.pluckData)(response.data)));
        } catch (err) {
            (0,_utils__rspack_import_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'schedules',
            ...options
        });
    }
}
/**
 * Types of actions that can be scheduled.
 */ var ScheduleActions = /*#__PURE__*/ function(ScheduleActions) {
    ScheduleActions["RunActor"] = "RUN_ACTOR";
    ScheduleActions["RunActorTask"] = "RUN_ACTOR_TASK";
    return ScheduleActions;
}({});


},
158(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ScheduleCollectionClient: () => (ScheduleCollectionClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for managing the collection of Schedules in your account.
 *
 * Schedules are used to automatically start Actors or tasks at specified times.
 * This client provides methods to list and create schedules.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const schedulesClient = client.schedules();
 *
 * // List all schedules
 * const { items } = await schedulesClient.list();
 *
 * // Create a new schedule
 * const newSchedule = await schedulesClient.create({
 *   actorId: 'my-actor-id',
 *   cronExpression: '0 9 * * *',
 *   isEnabled: true
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/schedules
 */ class ScheduleCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists all schedules.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination and sorting options.
     * @returns A paginated iterator of schedules.
     * @see https://docs.apify.com/api/v2/schedules-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_1_default()(options, ow__rspack_import_1_default().object.exactShape({
            limit: (ow__rspack_import_1_default().optional.number.not.negative),
            offset: (ow__rspack_import_1_default().optional.number.not.negative),
            desc: (ow__rspack_import_1_default().optional.boolean)
        }));
        return this._listPaginated(options);
    }
    /**
     * Creates a new schedule.
     *
     * @param schedule - The schedule data.
     * @returns The created schedule object.
     * @see https://docs.apify.com/api/v2/schedules-post
     */ async create(schedule) {
        ow__rspack_import_1_default()(schedule, (ow__rspack_import_1_default().optional.object));
        return this._create(schedule);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'schedules',
            ...options
        });
    }
}


},
1836(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  StoreCollectionClient: () => (StoreCollectionClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for browsing Actors in the Apify Store.
 *
 * The Apify Store contains publicly available Actors that can be used by anyone.
 * This client provides methods to search and list Actors from the Store.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient();
 * const storeClient = client.store();
 *
 * // Search for Actors in the Store
 * const { items } = await storeClient.list({ search: 'web scraper' });
 *
 * // Get details about a specific Store Actor
 * const actor = await storeClient.list({ username: 'apify', actorName: 'web-scraper' });
 * ```
 *
 * @see https://docs.apify.com/platform/actors/publishing
 */ class StoreCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists Actors from the Apify Store.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Search and pagination options.
     * @returns A paginated iterator of store Actors.
     * @see https://docs.apify.com/api/v2/store-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_1_default()(options, ow__rspack_import_1_default().object.exactShape({
            limit: (ow__rspack_import_1_default().optional.number.not.negative),
            offset: (ow__rspack_import_1_default().optional.number.not.negative),
            search: (ow__rspack_import_1_default().optional.string),
            sortBy: (ow__rspack_import_1_default().optional.string),
            category: (ow__rspack_import_1_default().optional.string),
            username: (ow__rspack_import_1_default().optional.string),
            pricingModel: (ow__rspack_import_1_default().optional.string)
        }));
        return this._listPaginated(options);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'store',
            ...options
        });
    }
}


},
355(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TaskClient: () => (TaskClient)
});
/* import */ var ow__rspack_import_6 = __webpack_require__(4980);
/* import */ var ow__rspack_import_6_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_6);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _base_resource_client__rspack_import_1 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_2 = __webpack_require__(9435);
/* import */ var _run__rspack_import_3 = __webpack_require__(8506);
/* import */ var _run_collection__rspack_import_4 = __webpack_require__(6084);
/* import */ var _webhook_collection__rspack_import_5 = __webpack_require__(5076);







/**
 * Client for managing a specific Actor task.
 *
 * Tasks are pre-configured Actor runs with saved input and options. This client provides methods
 * to start, call, update, and delete tasks, as well as manage their runs and webhooks.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const taskClient = client.task('my-task-id');
 *
 * // Start a task
 * const run = await taskClient.start();
 *
 * // Call a task and wait for it to finish
 * const finishedRun = await taskClient.call();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/tasks
 */ class TaskClient extends _base_resource_client__rspack_import_1.ResourceClient {
    /**
     * Retrieves the Actor task.
     *
     * @returns The task object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/actor-task-get
     */ async get() {
        return this._get();
    }
    /**
     * Updates the task with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated task object.
     * @see https://docs.apify.com/api/v2/actor-task-put
     */ async update(newFields) {
        ow__rspack_import_6_default()(newFields, (ow__rspack_import_6_default().object));
        return this._update(newFields);
    }
    /**
     * Deletes the Task.
     *
     * @see https://docs.apify.com/api/v2/actor-task-delete
     */ async delete() {
        return this._delete();
    }
    /**
     * Starts an Actor task and immediately returns the Run object.
     *
     * @param input - Input overrides for the task. If not provided, the task's saved input is used.
     * @param options - Run options.
     * @param options.build - Tag or number of the Actor build to run (e.g., `'beta'` or `'1.2.345'`).
     * @param options.memory - Memory in megabytes allocated for the run.
     * @param options.timeout - Timeout for the run in seconds. Zero means no timeout.
     * @param options.waitForFinish - Maximum time to wait (in seconds, max 60s) for the run to finish before returning.
     * @param options.webhooks - Webhooks to trigger for specific Actor run events.
     * @param options.maxItems - Maximum number of dataset items (for pay-per-result Actors).
     * @param options.maxTotalChargeUsd - Maximum cost in USD (for pay-per-event Actors).
     * @param options.restartOnError - Whether to restart the run on error.
     * @returns The Actor Run object.
     * @see https://docs.apify.com/api/v2/actor-task-runs-post
     */ async start(input) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_6_default()(input, (ow__rspack_import_6_default().optional.object));
        ow__rspack_import_6_default()(options, ow__rspack_import_6_default().object.exactShape({
            build: (ow__rspack_import_6_default().optional.string),
            memory: (ow__rspack_import_6_default().optional.number),
            timeout: (ow__rspack_import_6_default().optional.number),
            waitForFinish: (ow__rspack_import_6_default().optional.number),
            webhooks: ow__rspack_import_6_default().optional.array.ofType((ow__rspack_import_6_default().object)),
            maxItems: (ow__rspack_import_6_default().optional.number.not.negative),
            maxTotalChargeUsd: (ow__rspack_import_6_default().optional.number.not.negative),
            restartOnError: (ow__rspack_import_6_default().optional.boolean)
        }));
        const { waitForFinish, timeout, memory, build, maxItems, maxTotalChargeUsd, restartOnError } = options;
        const params = {
            waitForFinish,
            timeout,
            memory,
            build,
            webhooks: (0,_utils__rspack_import_2.stringifyWebhooksToBase64)(options.webhooks),
            maxItems,
            maxTotalChargeUsd,
            restartOnError
        };
        const request = {
            url: this._url('runs'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            stringifyFunctions: true,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await this.httpClient.call(request);
        return (0,_utils__rspack_import_2.cast)((0,_utils__rspack_import_2.parseDateFields)((0,_utils__rspack_import_2.pluckData)(response.data)));
    }
    /**
     * Starts a task and waits for it to finish before returning the Run object.
     * It waits indefinitely, unless the `waitSecs` option is provided.
     *
     * @param input - Input overrides for the task. If not provided, the task's saved input is used.
     * @param options - Run and wait options.
     * @param options.build - Tag or number of the Actor build to run.
     * @param options.memory - Memory in megabytes allocated for the run.
     * @param options.timeout - Timeout for the run in seconds.
     * @param options.waitSecs - Maximum time to wait for the run to finish, in seconds. If omitted, waits indefinitely.
     * @param options.webhooks - Webhooks to trigger for specific Actor run events.
     * @param options.maxItems - Maximum number of dataset items (for pay-per-result Actors).
     * @param options.maxTotalChargeUsd - Maximum cost in USD (for pay-per-event Actors).
     * @param options.restartOnError - Whether to restart the run on error.
     * @returns The Actor run object.
     * @see https://docs.apify.com/api/v2/actor-task-runs-post
     */ async call(input) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        ow__rspack_import_6_default()(input, (ow__rspack_import_6_default().optional.object));
        ow__rspack_import_6_default()(options, ow__rspack_import_6_default().object.exactShape({
            build: (ow__rspack_import_6_default().optional.string),
            memory: (ow__rspack_import_6_default().optional.number),
            timeout: (ow__rspack_import_6_default().optional.number.not.negative),
            waitSecs: (ow__rspack_import_6_default().optional.number.not.negative),
            webhooks: ow__rspack_import_6_default().optional.array.ofType((ow__rspack_import_6_default().object)),
            maxItems: (ow__rspack_import_6_default().optional.number.not.negative),
            maxTotalChargeUsd: (ow__rspack_import_6_default().optional.number.not.negative),
            restartOnError: (ow__rspack_import_6_default().optional.boolean)
        }));
        const { waitSecs, ...startOptions } = options;
        const { id } = await this.start(input, startOptions);
        // Calling root client because we need access to top level API.
        // Creating a new instance of RunClient here would only allow
        // setting it up as a nested route under task API.
        return this.apifyClient.run(id).waitForFinish({
            waitSecs
        });
    }
    /**
     * Retrieves the Actor task's input object.
     *
     * @returns The Task's input, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/actor-task-input-get
     */ async getInput() {
        const requestOpts = {
            url: this._url('input'),
            method: 'GET',
            params: this._params()
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_2.cast)(response.data);
        } catch (err) {
            (0,_utils__rspack_import_2.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Updates the Actor task's input object.
     *
     * @param newFields - New input data for the task.
     * @returns The updated task input.
     * @see https://docs.apify.com/api/v2/actor-task-input-put
     */ async updateInput(newFields) {
        const response = await this.httpClient.call({
            url: this._url('input'),
            method: 'PUT',
            params: this._params(),
            data: newFields
        });
        return (0,_utils__rspack_import_2.cast)(response.data);
    }
    /**
     * Returns a client for the last run of this task.
     *
     * @param options - Filter options for the last run.
     * @param options.status - Filter by run status (e.g., `'SUCCEEDED'`, `'FAILED'`, `'RUNNING'`).
     * @param options.origin - Filter by run origin (e.g., `'WEB'`, `'API'`, `'SCHEDULE'`).
     * @returns A client for the last run.
     * @see https://docs.apify.com/api/v2/actor-task-runs-last-get
     */ lastRun() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_6_default()(options, ow__rspack_import_6_default().object.exactShape({
            status: ow__rspack_import_6_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.ACT_JOB_STATUSES)),
            origin: ow__rspack_import_6_default().optional.string.oneOf(Object.values(_apify_consts__rspack_import_0.META_ORIGINS))
        }));
        return new _run__rspack_import_3.RunClient(this._subResourceOptions({
            id: 'last',
            params: this._params(options),
            resourcePath: 'runs'
        }));
    }
    /**
     * Returns a client for the Runs of this Task.
     *
     * @returns A client for the task's runs.
     * @see https://docs.apify.com/api/v2/actor-task-runs-get
     */ runs() {
        return new _run_collection__rspack_import_4.RunCollectionClient(this._subResourceOptions({
            resourcePath: 'runs'
        }));
    }
    /**
     * Returns a client for the Webhooks of this Task.
     *
     * @returns A client for the task's webhooks.
     * @see https://docs.apify.com/api/v2/actor-task-webhooks-get
     */ webhooks() {
        return new _webhook_collection__rspack_import_5.WebhookCollectionClient(this._subResourceOptions());
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'actor-tasks',
            ...options
        });
    }
}


},
502(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TaskCollectionClient: () => (TaskCollectionClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for managing the collection of Actor tasks in your account.
 *
 * Tasks are pre-configured Actor runs with saved input and options. This client provides
 * methods to list and create tasks.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const tasksClient = client.tasks();
 *
 * // List all tasks
 * const { items } = await tasksClient.list();
 *
 * // Create a new task
 * const newTask = await tasksClient.create({
 *   actId: 'my-actor-id',
 *   name: 'my-task',
 *   input: { url: 'https://example.com' }
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running/tasks
 */ class TaskCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists all Tasks.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination and sorting options.
     * @returns A paginated iterator of tasks.
     * @see https://docs.apify.com/api/v2/actor-tasks-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_1_default()(options, ow__rspack_import_1_default().object.exactShape({
            limit: (ow__rspack_import_1_default().optional.number.not.negative),
            offset: (ow__rspack_import_1_default().optional.number.not.negative),
            desc: (ow__rspack_import_1_default().optional.boolean)
        }));
        return this._listPaginated(options);
    }
    /**
     * Creates a new task.
     *
     * @param task - The task data.
     * @returns The created task object.
     * @see https://docs.apify.com/api/v2/actor-tasks-post
     */ async create(task) {
        ow__rspack_import_1_default()(task, (ow__rspack_import_1_default().object));
        return this._create(task);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'actor-tasks',
            ...options
        });
    }
}


},
4057(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PlatformFeature: () => (PlatformFeature),
  UserClient: () => (UserClient)
});
/* import */ var _base_resource_client__rspack_import_0 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_1 = __webpack_require__(9435);


/**
 * Client for managing user account information.
 *
 * Provides methods to retrieve user details, monthly usage statistics, and account limits.
 * When using an API token, you can access your own user information or public information
 * about other users.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const userClient = client.user('my-user-id');
 *
 * // Get user information
 * const user = await userClient.get();
 *
 * // Get monthly usage
 * const usage = await userClient.monthlyUsage();
 *
 * // Get account limits
 * const limits = await userClient.limits();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running
 */ class UserClient extends _base_resource_client__rspack_import_0.ResourceClient {
    /**
     * Retrieves the user data.
     *
     * Depending on whether ApifyClient was created with a token,
     * the method will either return public or private user data.
     *
     * @returns The user object.
     * @see https://docs.apify.com/api/v2/user-get
     */ async get() {
        return this._get();
    }
    /**
     * Retrieves the user's monthly usage data.
     *
     * @returns The monthly usage object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/users-me-usage-monthly-get
     */ async monthlyUsage() {
        const requestOpts = {
            url: this._url('usage/monthly'),
            method: 'GET',
            params: this._params()
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_1.cast)((0,_utils__rspack_import_1.parseDateFields)((0,_utils__rspack_import_1.pluckData)(response.data), // Convert  monthlyUsage.dailyServiceUsages[].date to Date (by default it's ignored by parseDateFields)
            /* shouldParseField = */ (key)=>key === 'date'));
        } catch (err) {
            (0,_utils__rspack_import_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Retrieves the user's account and usage limits.
     *
     * @returns The account and usage limits object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/users-me-limits-get
     */ async limits() {
        const requestOpts = {
            url: this._url('limits'),
            method: 'GET',
            params: this._params()
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0,_utils__rspack_import_1.cast)((0,_utils__rspack_import_1.parseDateFields)((0,_utils__rspack_import_1.pluckData)(response.data)));
        } catch (err) {
            (0,_utils__rspack_import_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Updates the user's account and usage limits.
     *
     * @param options - The new limits to set.
     * @see https://docs.apify.com/api/v2/users-me-limits-put
     */ async updateLimits(options) {
        const requestOpts = {
            url: this._url('limits'),
            method: 'PUT',
            params: this._params(),
            data: options
        };
        await this.httpClient.call(requestOpts);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'users',
            ...options
        });
    }
}
var PlatformFeature = /*#__PURE__*/ function(PlatformFeature) {
    PlatformFeature["Actors"] = "ACTORS";
    PlatformFeature["Storage"] = "STORAGE";
    PlatformFeature["ProxySERPS"] = "PROXY_SERPS";
    PlatformFeature["Scheduler"] = "SCHEDULER";
    PlatformFeature["Webhooks"] = "WEBHOOKS";
    PlatformFeature["Proxy"] = "PROXY";
    PlatformFeature["ProxyExternalAccess"] = "PROXY_EXTERNAL_ACCESS";
    return PlatformFeature;
}({});


},
6829(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WebhookClient: () => (WebhookClient)
});
/* import */ var ow__rspack_import_3 = __webpack_require__(4980);
/* import */ var ow__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_3);
/* import */ var _base_resource_client__rspack_import_0 = __webpack_require__(2528);
/* import */ var _utils__rspack_import_1 = __webpack_require__(9435);
/* import */ var _webhook_dispatch_collection__rspack_import_2 = __webpack_require__(5821);




/**
 * Client for managing a specific webhook.
 *
 * Webhooks allow you to receive notifications when specific events occur in your Actors or tasks.
 * This client provides methods to get, update, delete, and test webhooks, as well as retrieve
 * webhook dispatches.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const webhookClient = client.webhook('my-webhook-id');
 *
 * // Get webhook details
 * const webhook = await webhookClient.get();
 *
 * // Update webhook
 * await webhookClient.update({
 *   isEnabled: true,
 *   eventTypes: ['ACTOR.RUN.SUCCEEDED'],
 *   requestUrl: 'https://example.com/webhook'
 * });
 *
 * // Test webhook
 * await webhookClient.test();
 * ```
 *
 * @see https://docs.apify.com/platform/integrations/webhooks
 */ class WebhookClient extends _base_resource_client__rspack_import_0.ResourceClient {
    /**
     * Retrieves the webhook.
     *
     * @returns The webhook object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/webhook-get
     */ async get() {
        return this._get();
    }
    /**
     * Updates the webhook with the specified fields.
     *
     * @param newFields - Fields to update.
     * @returns The updated webhook object.
     * @see https://docs.apify.com/api/v2/webhook-put
     */ async update(newFields) {
        ow__rspack_import_3_default()(newFields, (ow__rspack_import_3_default().object));
        return this._update(newFields);
    }
    /**
     * Deletes the webhook.
     *
     * @see https://docs.apify.com/api/v2/webhook-delete
     */ async delete() {
        return this._delete();
    }
    /**
     * Tests the webhook by dispatching a test event.
     *
     * @returns The webhook dispatch object, or `undefined` if the test fails.
     * @see https://docs.apify.com/api/v2/webhook-test-post
     */ async test() {
        const request = {
            url: this._url('test'),
            method: 'POST',
            params: this._params()
        };
        try {
            const response = await this.httpClient.call(request);
            return (0,_utils__rspack_import_1.cast)((0,_utils__rspack_import_1.parseDateFields)((0,_utils__rspack_import_1.pluckData)(response.data)));
        } catch (err) {
            (0,_utils__rspack_import_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Returns a client for the dispatches of this webhook.
     *
     * @returns A client for the webhook's dispatches.
     * @see https://docs.apify.com/api/v2/webhook-webhook-dispatches-get
     */ dispatches() {
        return new _webhook_dispatch_collection__rspack_import_2.WebhookDispatchCollectionClient(this._subResourceOptions({
            resourcePath: 'dispatches'
        }));
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'webhooks',
            ...options
        });
    }
}


},
5076(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WebhookCollectionClient: () => (WebhookCollectionClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for managing the collection of Webhooks.
 *
 * Webhooks allow you to receive notifications when specific events occur in your Actors or tasks.
 * This client provides methods to list and create webhooks for specific Actors or tasks.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 *
 * // List webhooks for an Actor
 * const actorWebhooksClient = client.actor('my-actor-id').webhooks();
 * const { items } = await actorWebhooksClient.list();
 *
 * // Create a webhook
 * const newWebhook = await actorWebhooksClient.create({
 *   eventTypes: ['ACTOR.RUN.SUCCEEDED'],
 *   requestUrl: 'https://example.com/webhook'
 * });
 * ```
 *
 * @see https://docs.apify.com/platform/integrations/webhooks
 */ class WebhookCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists all Webhooks.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination and sorting options.
     * @returns A paginated iterator of webhooks.
     * @see https://docs.apify.com/api/v2/webhooks-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_1_default()(options, ow__rspack_import_1_default().object.exactShape({
            limit: (ow__rspack_import_1_default().optional.number.not.negative),
            offset: (ow__rspack_import_1_default().optional.number.not.negative),
            desc: (ow__rspack_import_1_default().optional.boolean)
        }));
        return this._listPaginated(options);
    }
    /**
     * Creates a new webhook.
     *
     * @param webhook - The webhook data.
     * @returns The created webhook object.
     * @see https://docs.apify.com/api/v2/webhooks-post
     */ async create(webhook) {
        ow__rspack_import_1_default()(webhook, (ow__rspack_import_1_default().optional.object));
        return this._create(webhook);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'webhooks',
            ...options
        });
    }
}


},
7958(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WebhookDispatchClient: () => (WebhookDispatchClient),
  WebhookDispatchStatus: () => (WebhookDispatchStatus)
});
/* import */ var _base_resource_client__rspack_import_0 = __webpack_require__(2528);

/**
 * Client for managing a specific webhook dispatch.
 *
 * Webhook dispatches represent individual notifications sent by webhooks. This client provides
 * methods to retrieve details about a specific dispatch.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const webhookClient = client.webhook('my-webhook-id');
 *
 * // Get a specific dispatch
 * const dispatchClient = webhookClient.dispatches().get('dispatch-id');
 * const dispatch = await dispatchClient.get();
 * ```
 *
 * @see https://docs.apify.com/platform/integrations/webhooks
 */ class WebhookDispatchClient extends _base_resource_client__rspack_import_0.ResourceClient {
    /**
     * Retrieves the webhook dispatch.
     *
     * @returns The webhook dispatch object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/webhook-dispatch-get
     */ async get() {
        return this._get();
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'webhook-dispatches',
            ...options
        });
    }
}
var WebhookDispatchStatus = /*#__PURE__*/ function(WebhookDispatchStatus) {
    WebhookDispatchStatus["Active"] = "ACTIVE";
    WebhookDispatchStatus["Succeeded"] = "SUCCEEDED";
    WebhookDispatchStatus["Failed"] = "FAILED";
    return WebhookDispatchStatus;
}({});


},
5821(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WebhookDispatchCollectionClient: () => (WebhookDispatchCollectionClient)
});
/* import */ var ow__rspack_import_1 = __webpack_require__(4980);
/* import */ var ow__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_1);
/* import */ var _base_resource_collection_client__rspack_import_0 = __webpack_require__(577);


/**
 * Client for managing the collection of webhook dispatches.
 *
 * Webhook dispatches represent individual notifications sent by a webhook. This client provides
 * methods to list all dispatches for a specific webhook.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const webhookClient = client.webhook('my-webhook-id');
 *
 * // List all dispatches for this webhook
 * const dispatchesClient = webhookClient.dispatches();
 * const { items } = await dispatchesClient.list();
 * ```
 *
 * @see https://docs.apify.com/platform/integrations/webhooks
 */ class WebhookDispatchCollectionClient extends _base_resource_collection_client__rspack_import_0.ResourceCollectionClient {
    /**
     * Lists all webhook dispatches.
     *
     * Awaiting the return value (as you would with a Promise) will result in a single API call. The amount of fetched
     * items in a single API call is limited.
     * ```javascript
     * const paginatedList = await client.list(options);
     * ```
     *
     * Asynchronous iteration is also supported. This will fetch additional pages if needed until all items are
     * retrieved.
     *
     * ```javascript
     * for await (const singleItem of client.list(options)) {...}
     * ```
     *
     * @param options - Pagination and sorting options.
     * @returns A paginated iterator of webhook dispatches.
     * @see https://docs.apify.com/api/v2/webhook-dispatches-get
     */ list() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        ow__rspack_import_1_default()(options, ow__rspack_import_1_default().object.exactShape({
            limit: (ow__rspack_import_1_default().optional.number.not.negative),
            offset: (ow__rspack_import_1_default().optional.number.not.negative),
            desc: (ow__rspack_import_1_default().optional.boolean)
        }));
        return this._listPaginated(options);
    }
    /**
     * @hidden
     */ constructor(options){
        super({
            resourcePath: 'webhook-dispatches',
            ...options
        });
    }
}


},
5663(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Statistics: () => (Statistics)
});
/* import */ var _swc_helpers_define_property__rspack_import_1 = __webpack_require__(467);
/* import */ var ow__rspack_import_0 = __webpack_require__(4980);
/* import */ var ow__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_0);


class Statistics {
    addRateLimitError(attempt) {
        ow__rspack_import_0_default()(attempt, ow__rspack_import_0_default().number.greaterThan(0));
        // attempt is never 0,
        // but we don't want index 0 empty
        const index = attempt - 1;
        this._fillBlanksWithZeroes(index);
        this.rateLimitErrors[index]++;
    }
    /**
     * Removes the necessity to pre-initialize array with correct
     * number of zeroes by dynamically filling the empty indexes
     * when necessary.
     */ _fillBlanksWithZeroes(inclusiveIndex) {
        if (this.rateLimitErrors.length <= inclusiveIndex) {
            for(let k = 0; k <= inclusiveIndex; k++){
                if (typeof this.rateLimitErrors[k] !== 'number') {
                    this.rateLimitErrors[k] = 0;
                }
            }
        }
    }
    constructor(){
        /**
     * Number of Apify client function calls
     */ (0,_swc_helpers_define_property__rspack_import_1._)(this, "calls", 0);
        /**
     * Number of Apify API requests
     */ (0,_swc_helpers_define_property__rspack_import_1._)(this, "requests", 0);
        /**
     * Number of times the API returned 429 error. Errors on first attempt are
     * counted at index 0. First retry error counts are on index 1 and so on.
     */ (0,_swc_helpers_define_property__rspack_import_1._)(this, "rateLimitErrors", []);
    }
}


},
9435(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PaginationIterator: () => (PaginationIterator),
  applyQueryParamsToUrl: () => (applyQueryParamsToUrl),
  asArray: () => (asArray),
  cast: () => (cast),
  catchNotFoundOrThrow: () => (catchNotFoundOrThrow),
  dynamicNodeImport: () => (dynamicNodeImport),
  getVersionData: () => (getVersionData),
  isBuffer: () => (isBuffer),
  isNode: () => (isNode),
  isStream: () => (isStream),
  maybeGzipValue: () => (maybeGzipValue),
  parseDateFields: () => (parseDateFields),
  pluckData: () => (pluckData),
  sliceArrayByByteLength: () => (sliceArrayByByteLength),
  stringifyWebhooksToBase64: () => (stringifyWebhooksToBase64)
});
/* import */ var _swc_helpers_define_property__rspack_import_1 = __webpack_require__(467);
/* import */ var ow__rspack_import_0 = __webpack_require__(4980);
/* import */ var ow__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(ow__rspack_import_0);
/* provided dependency */ var Buffer = __webpack_require__(8287)["Buffer"];
/* provided dependency */ var process = __webpack_require__(5606);

var _computedKey;

const NOT_FOUND_STATUS_CODE = 404;
const RECORD_NOT_FOUND_TYPE = 'record-not-found';
const RECORD_OR_TOKEN_NOT_FOUND_TYPE = 'record-or-token-not-found';
const MIN_GZIP_BYTES = 1024;
/**
 * Returns object's 'data' property or throws if parameter is not an object,
 * or an object without a 'data' property.
 */ function pluckData(obj) {
    if (typeof obj === 'object' && obj) {
        if (typeof obj.data !== 'undefined') return obj.data;
    }
    throw new Error(`Expected response object with a "data" property, but received: ${obj}`);
}
/**
 * If given HTTP error has NOT_FOUND_STATUS_CODE status code then returns undefined.
 * Otherwise rethrows error.
 */ function catchNotFoundOrThrow(err) {
    const isNotFoundStatus = err.statusCode === NOT_FOUND_STATUS_CODE;
    const isNotFoundMessage = err.type === RECORD_NOT_FOUND_TYPE || err.type === RECORD_OR_TOKEN_NOT_FOUND_TYPE || err.httpMethod === 'head';
    const isNotFoundError = isNotFoundStatus && isNotFoundMessage;
    if (!isNotFoundError) throw err;
}
/**
 * Traverses JSON structure and converts fields that end with "At" to a Date object (fields such as "modifiedAt" or
 * "createdAt").
 *
 * If you want parse other fields as well, you can provide a custom matcher function shouldParseField(). This
 * admittedly awkward approach allows this function to be reused for various purposes without introducing potential
 * breaking changes.
 *
 * If the field cannot be converted to Date, it is left as is.
 */ function parseDateFields(input) {
    let shouldParseField = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    // Don't go too deep to avoid stack overflows (especially if there is a circular reference). The depth of 3
    // corresponds to obj.data.someArrayField.[x].field and should be generally enough.
    // TODO: Consider removing this limitation. It might came across as an annoying surprise as it's not communicated.
    if (depth > 3) {
        return input;
    }
    if (Array.isArray(input)) return input.map((child)=>parseDateFields(child, shouldParseField, depth + 1));
    if (!input || typeof input !== 'object') return input;
    return Object.entries(input).reduce((output, param)=>{
        let [k, v] = param;
        const isValObject = !!v && typeof v === 'object';
        if (k.endsWith('At') || shouldParseField && shouldParseField(k)) {
            if (v) {
                const d = new Date(v);
                output[k] = Number.isNaN(d.getTime()) ? v : d;
            } else {
                output[k] = v;
            }
        } else if (isValObject || Array.isArray(v)) {
            output[k] = parseDateFields(v, shouldParseField, depth + 1);
        } else {
            output[k] = v;
        }
        return output;
    }, {});
}
/**
 * Helper function that converts array of webhooks to base64 string
 */ function stringifyWebhooksToBase64(webhooks) {
    if (!webhooks) return;
    const webhooksJson = JSON.stringify(webhooks);
    if (isNode()) {
        return Buffer.from(webhooksJson, 'utf8').toString('base64');
    }
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(webhooksJson);
    return btoa(String.fromCharCode(...uint8Array));
}
let gzipPromisified;
/**
 * Gzip provided value, otherwise returns undefined.
 */ async function maybeGzipValue(value) {
    if (!isNode()) return;
    if (typeof value !== 'string' && !Buffer.isBuffer(value)) return;
    // Request compression is not that important so let's
    // skip it instead of throwing for unsupported types.
    const areDataLargeEnough = Buffer.byteLength(value) >= MIN_GZIP_BYTES;
    if (areDataLargeEnough) {
        if (!gzipPromisified) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-imports
            const { promisify } = await dynamicNodeImport('node:util');
            // eslint-disable-next-line @typescript-eslint/consistent-type-imports
            const { gzip } = await dynamicNodeImport('node:zlib');
            gzipPromisified = promisify(gzip);
        }
        return gzipPromisified(value);
    }
    return undefined;
}
/**
 * Helper function slice the items from array to fit the max byte length.
 */ function sliceArrayByByteLength(array, maxByteLength, startIndex) {
    const stringByteLength = (str)=>isNode() ? Buffer.byteLength(str) : new Blob([
            str
        ]).size;
    const arrayByteLength = stringByteLength(JSON.stringify(array));
    if (arrayByteLength < maxByteLength) return array;
    const slicedArray = [];
    let byteLength = 2; // 2 bytes for the empty array []
    for(let i = 0; i < array.length; i++){
        const item = array[i];
        const itemByteSize = stringByteLength(JSON.stringify(item));
        if (itemByteSize > maxByteLength) {
            throw new Error(`RequestQueueClient.batchAddRequests: The size of the request with index: ${startIndex + i} ` + `exceeds the maximum allowed size (${maxByteLength} bytes).`);
        }
        if (byteLength + itemByteSize >= maxByteLength) break;
        byteLength += itemByteSize;
        slicedArray.push(item);
    }
    return slicedArray;
}
function isNode() {
    return !!(typeof process !== 'undefined' && process.versions && process.versions.node);
}
/**
 * Dynamic import wrapper that prevents bundlers from statically analyzing the import specifier.
 * Use this for Node.js-only modules that should not be included in browser bundles.
 */ async function dynamicNodeImport(specifier) {
    return await __webpack_require__(433)(specifier);
}
function isBuffer(value) {
    return ow__rspack_import_0_default().isValid(value, ow__rspack_import_0_default().any((ow__rspack_import_0_default().buffer), (ow__rspack_import_0_default().arrayBuffer), (ow__rspack_import_0_default().typedArray)));
}
function isStream(value) {
    return ow__rspack_import_0_default().isValid(value, ow__rspack_import_0_default().object.hasKeys('on', 'pipe'));
}
function getVersionData() {
    if (true) {
        return {
            version: "2.22.3"
        };
    }
    // eslint-disable-next-line
    return __webpack_require__(8330);
}
_computedKey = Symbol.asyncIterator;
let _computedKey1 = _computedKey;
/**
 * Helper class to create async iterators from paginated list endpoints with exclusive start key.
 */ class PaginationIterator {
    async *[_computedKey1]() {
        let nextPageExclusiveStartId;
        let iterateItemCount = 0;
        while(true){
            const pageLimit = this.limit ? Math.min(this.maxPageLimit, this.limit - iterateItemCount) : this.maxPageLimit;
            const pageExclusiveStartId = nextPageExclusiveStartId || this.exclusiveStartId;
            const page = await this.getPage({
                limit: pageLimit,
                exclusiveStartId: pageExclusiveStartId
            });
            // There are no more pages to iterate
            if (page.items.length === 0) return;
            yield page;
            iterateItemCount += page.items.length;
            // Limit reached stopping to iterate
            if (this.limit && iterateItemCount >= this.limit) return;
            nextPageExclusiveStartId = page.items[page.items.length - 1].id;
        }
    }
    constructor(options){
        (0,_swc_helpers_define_property__rspack_import_1._)(this, "maxPageLimit", void 0);
        (0,_swc_helpers_define_property__rspack_import_1._)(this, "getPage", void 0);
        (0,_swc_helpers_define_property__rspack_import_1._)(this, "limit", void 0);
        (0,_swc_helpers_define_property__rspack_import_1._)(this, "exclusiveStartId", void 0);
        this.maxPageLimit = options.maxPageLimit;
        this.limit = options.limit;
        this.exclusiveStartId = options.exclusiveStartId;
        this.getPage = options.getPage;
    }
}
function cast(input) {
    return input;
}
function asArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    return [
        value
    ];
}
/**
 * Adds query parameters to a given URL based on the provided options object.
 */ function applyQueryParamsToUrl(url, options) {
    for (const [key, value] of Object.entries(options ?? {})){
        // skip undefined values
        if (value === undefined) continue;
        // join array values with a comma
        if (Array.isArray(value)) {
            url.searchParams.set(key, value.join(','));
            continue;
        }
        url.searchParams.set(key, String(value));
    }
    return url;
}


},
4849() {
"use strict";
/* (ignored) */

},
2088() {
"use strict";
/* (ignored) */

},
9252() {
"use strict";
/* (ignored) */

},
6125(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ACTOR_BUILD_ARGS: () => (ACTOR_BUILD_ARGS),
  ACTOR_CATEGORIES: () => (ACTOR_CATEGORIES),
  ACTOR_ENV_VARS: () => (ACTOR_ENV_VARS),
  ACTOR_EVENT_NAMES: () => (ACTOR_EVENT_NAMES),
  ACTOR_JOB_STATUSES: () => (ACTOR_JOB_STATUSES),
  ACTOR_JOB_TERMINAL_STATUSES: () => (ACTOR_JOB_TERMINAL_STATUSES),
  ACTOR_JOB_TYPES: () => (ACTOR_JOB_TYPES),
  ACTOR_LIMITS: () => (ACTOR_LIMITS),
  ACTOR_NAME: () => (ACTOR_NAME),
  ACTOR_PERMISSION_LEVEL: () => (ACTOR_PERMISSION_LEVEL),
  ACTOR_RESTART_ON_ERROR: () => (ACTOR_RESTART_ON_ERROR),
  ACTOR_SOURCE_TYPES: () => (ACTOR_SOURCE_TYPES),
  ACTOR_TYPES: () => (ACTOR_TYPES),
  ACT_JOB_STATUSES: () => (ACT_JOB_STATUSES),
  ACT_JOB_TERMINAL_STATUSES: () => (ACT_JOB_TERMINAL_STATUSES),
  ACT_JOB_TYPES: () => (ACT_JOB_TYPES),
  ACT_RESTART_ON_ERROR: () => (ACT_RESTART_ON_ERROR),
  ACT_SOURCE_TYPES: () => (ACT_SOURCE_TYPES),
  ACT_TYPES: () => (ACT_TYPES),
  ALL_ACTOR_CATEGORIES: () => (ALL_ACTOR_CATEGORIES),
  ANONYMOUS_USERNAME: () => (ANONYMOUS_USERNAME),
  APIFY_ENV_VARS: () => (APIFY_ENV_VARS),
  APIFY_ID_REGEX: () => (APIFY_ID_REGEX),
  APIFY_PROXY_VALUE_REGEX: () => (APIFY_PROXY_VALUE_REGEX),
  BUILD_TAG_LATEST: () => (BUILD_TAG_LATEST),
  COMMA_SEPARATED_EMAILS_REGEX: () => (COMMA_SEPARATED_EMAILS_REGEX),
  COMMA_SEPARATED_EMAILS_REGEX_STR: () => (COMMA_SEPARATED_EMAILS_REGEX_STR),
  COMMA_SEPARATED_LIST_ENV_VARS: () => (COMMA_SEPARATED_LIST_ENV_VARS),
  COMPUTE_UNIT_MB: () => (COMPUTE_UNIT_MB),
  COMPUTE_UNIT_MILLIS: () => (COMPUTE_UNIT_MILLIS),
  CONTACT_LINK_REGEX: () => (CONTACT_LINK_REGEX),
  DEFAULT_ACTOR_STANDBY_PORT: () => (DEFAULT_ACTOR_STANDBY_PORT),
  DEFAULT_CONTAINER_PORT: () => (DEFAULT_CONTAINER_PORT),
  DEFAULT_PLATFORM_LIMITS: () => (DEFAULT_PLATFORM_LIMITS),
  DNS_SAFE_NAME_MAX_LENGTH: () => (DNS_SAFE_NAME_MAX_LENGTH),
  DNS_SAFE_NAME_REGEX: () => (DNS_SAFE_NAME_REGEX),
  DOCKER_LABELS: () => (DOCKER_LABELS),
  EMAIL: () => (EMAIL),
  EMAIL_REGEX: () => (EMAIL_REGEX),
  EMAIL_REGEX_STR: () => (EMAIL_REGEX_STR),
  ENV_VARS: () => (ENV_VARS),
  FINISHED_PROJECT_STATUSES: () => (FINISHED_PROJECT_STATUSES),
  FREE_SUBSCRIPTION_PLAN_CODE: () => (FREE_SUBSCRIPTION_PLAN_CODE),
  GITHUB_GIST_URL_REGEX: () => (GITHUB_GIST_URL_REGEX),
  GITHUB_REGEX: () => (GITHUB_REGEX),
  GIT_MAIN_BRANCH: () => (GIT_MAIN_BRANCH),
  GIT_REPO_REGEX: () => (GIT_REPO_REGEX),
  HTTP_URL_REGEX: () => (HTTP_URL_REGEX),
  INTEGER_ENV_VARS: () => (INTEGER_ENV_VARS),
  ISSUES_STATUS_ALL: () => (ISSUES_STATUS_ALL),
  ISSUES_STATUS_TYPES: () => (ISSUES_STATUS_TYPES),
  JSON_ENCODED_ENV_VARS: () => (JSON_ENCODED_ENV_VARS),
  KEY_VALUE_STORE_KEYS: () => (KEY_VALUE_STORE_KEYS),
  KEY_VALUE_STORE_KEY_REGEX: () => (KEY_VALUE_STORE_KEY_REGEX),
  LINKEDIN_PROFILE_REGEX: () => (LINKEDIN_PROFILE_REGEX),
  LOCAL_ACTOR_ENV_VARS: () => (LOCAL_ACTOR_ENV_VARS),
  LOCAL_APIFY_ENV_VARS: () => (LOCAL_APIFY_ENV_VARS),
  LOCAL_ENV_VARS: () => (LOCAL_ENV_VARS),
  LOCAL_STORAGE_SUBDIRS: () => (LOCAL_STORAGE_SUBDIRS),
  MARKETPLACE_USER_ROLES: () => (MARKETPLACE_USER_ROLES),
  MAX_MULTIFILE_BYTES: () => (MAX_MULTIFILE_BYTES),
  MAX_PAYLOAD_SIZE_BYTES: () => (MAX_PAYLOAD_SIZE_BYTES),
  META_ORIGINS: () => (META_ORIGINS),
  ME_USER_NAME_PLACEHOLDER: () => (ME_USER_NAME_PLACEHOLDER),
  PROFILE_NAME: () => (PROFILE_NAME),
  PROJECT_STATUSES: () => (PROJECT_STATUSES),
  PROXY_URL_REGEX: () => (PROXY_URL_REGEX),
  RELATIVE_URL_REGEX: () => (RELATIVE_URL_REGEX),
  REQUEST_QUEUE_HEAD_MAX_LIMIT: () => (REQUEST_QUEUE_HEAD_MAX_LIMIT),
  REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION: () => (REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION),
  RUN_GENERAL_ACCESS: () => (RUN_GENERAL_ACCESS),
  SHORT_CRAWLER_ID_LENGTH: () => (SHORT_CRAWLER_ID_LENGTH),
  SOURCE_FILE_FORMATS: () => (SOURCE_FILE_FORMATS),
  SPLIT_PATH_REGEX: () => (SPLIT_PATH_REGEX),
  STORAGE_GENERAL_ACCESS: () => (STORAGE_GENERAL_ACCESS),
  STORAGE_OWNERSHIP_FILTER: () => (STORAGE_OWNERSHIP_FILTER),
  TWITTER_REGEX: () => (TWITTER_REGEX),
  URL_REGEX: () => (URL_REGEX),
  USERNAME: () => (USERNAME),
  USER_BASIC_TEXT_XSS_OPTIONS: () => (USER_BASIC_TEXT_XSS_OPTIONS),
  USER_PERSONA_TYPES: () => (USER_PERSONA_TYPES),
  VERSION_INT_MAJOR_BASE: () => (VERSION_INT_MAJOR_BASE),
  VERSION_INT_MINOR_BASE: () => (VERSION_INT_MINOR_BASE),
  WEBHOOK_ALLOWED_PAYLOAD_VARIABLES: () => (WEBHOOK_ALLOWED_PAYLOAD_VARIABLES),
  WEBHOOK_DEFAULT_PAYLOAD_TEMPLATE: () => (WEBHOOK_DEFAULT_PAYLOAD_TEMPLATE),
  WEBHOOK_DISPATCH_STATUSES: () => (WEBHOOK_DISPATCH_STATUSES),
  WEBHOOK_EVENT_TYPES: () => (WEBHOOK_EVENT_TYPES),
  WEBHOOK_EVENT_TYPE_GROUPS: () => (WEBHOOK_EVENT_TYPE_GROUPS),
  WORKER_SERVICE_TYPES: () => (WORKER_SERVICE_TYPES)
});
// src/regexs.ts
var namePartSubRegexStr = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+";
var nameSubRegexStr = `${namePartSubRegexStr}(?:\\.${namePartSubRegexStr})*`;
var domainPartSubRegexStr = "[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?";
var domainSubRegexStr = `${domainPartSubRegexStr}(?:\\.${domainPartSubRegexStr})+`;
var EMAIL_REGEX_STR = `${nameSubRegexStr}@${domainSubRegexStr}`;
var EMAIL_REGEX = new RegExp(`^${EMAIL_REGEX_STR}$`);
var COMMA_SEPARATED_EMAILS_REGEX_STR = `(${EMAIL_REGEX_STR})( *, *${EMAIL_REGEX_STR})*`;
var COMMA_SEPARATED_EMAILS_REGEX = new RegExp(`^${COMMA_SEPARATED_EMAILS_REGEX_STR}$`);
var GIT_REPO_REGEX = /^(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\/?|#[-\d\w._:/]+?)$/;
var DNS_SAFE_NAME_REGEX = /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])$/;
var APIFY_PROXY_VALUE_REGEX = /^[\w._~]+$/;
var PROXY_URL_REGEX = /^(socks(4|4a|5|5h)?|https?):\/\/(([^:]+:)?[^@]*@)?[^.:@]+\.[^:]+:[\d]+?$/;
var KEY_VALUE_STORE_KEY_REGEX = /^([a-zA-Z0-9!\-_.'()]{1,256})$/;
var GITHUB_REGEX_STR = "[a-z\\d](?:[a-z\\d]|-(?=[a-z\\d])){0,38}";
var TWITTER_REGEX = /^@[a-z0-9_]{1,15}$/i;
var GITHUB_REGEX = new RegExp(`^${GITHUB_REGEX_STR}$`, "i");
var LINKEDIN_PROFILE_REGEX = /^(https?:\/\/)?(www\.)?([a-z]{2}\.)?linkedin\.com\/(in|company)\/((?:[A-Za-z0-9_-]|%[0-9A-Fa-f]{2})+)\/?$/;
var URL_REGEX = /^https?:\/\//i;
var HTTP_URL_REGEX = new RegExp(
  "^(?:(?:(?:https?):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?|xn--[a-z0-9]+))(?::\\d{2,5})?(?:[/?#]\\S*)?$",
  "i"
);
var GITHUB_GIST_URL_REGEX = new RegExp(`^https:\\/\\/gist\\.github\\.com\\/${GITHUB_REGEX_STR}\\/[0-9a-f]{32}$`, "i");
var SPLIT_PATH_REGEX = /[^/]+/g;
var RELATIVE_URL_REGEX = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\|\/\/).*/i;
var CONTACT_LINK_REGEX = /^(mailto|tel|sms):.*$/i;
var APIFY_ID_REGEX = /[a-zA-Z0-9]{17}/;

// src/consts.ts
var FREE_SUBSCRIPTION_PLAN_CODE = "DEV";
var ACTOR_JOB_TYPES = {
  BUILD: "BUILD",
  RUN: "RUN"
};
var ACTOR_SOURCE_TYPES = {
  SOURCE_CODE: "SOURCE_CODE",
  SOURCE_FILES: "SOURCE_FILES",
  GIT_REPO: "GIT_REPO",
  TARBALL: "TARBALL",
  GITHUB_GIST: "GITHUB_GIST"
};
var ACTOR_EVENT_NAMES = {
  CPU_INFO: "cpuInfo",
  SYSTEM_INFO: "systemInfo",
  MIGRATING: "migrating",
  PERSIST_STATE: "persistState",
  ABORTING: "aborting"
};
var ACTOR_JOB_STATUSES = {
  READY: "READY",
  // started but not allocated to any worker yet
  RUNNING: "RUNNING",
  // running on worker
  SUCCEEDED: "SUCCEEDED",
  // finished and all good
  FAILED: "FAILED",
  // run or build failed
  TIMING_OUT: "TIMING-OUT",
  // timing out now
  TIMED_OUT: "TIMED-OUT",
  // timed out
  ABORTING: "ABORTING",
  // being aborted by user
  ABORTED: "ABORTED"
  // aborted by user
};
var WEBHOOK_DISPATCH_STATUSES = {
  ACTIVE: "ACTIVE",
  // Attempting to deliver the webhook
  SUCCEEDED: "SUCCEEDED",
  // Webhook was delivered
  FAILED: "FAILED"
  // All calls to webhook target URL failed
};
var ACTOR_JOB_TERMINAL_STATUSES = [
  ACTOR_JOB_STATUSES.SUCCEEDED,
  ACTOR_JOB_STATUSES.FAILED,
  ACTOR_JOB_STATUSES.TIMED_OUT,
  ACTOR_JOB_STATUSES.ABORTED
];
var WORKER_SERVICE_TYPES = {
  CRAWLING: "crawling",
  ACTOR: "actor"
};
var META_ORIGINS = {
  DEVELOPMENT: "DEVELOPMENT",
  // Job started from Developer console in Source section of actor
  WEB: "WEB",
  // Job started from other place on the website (either console or task detail page)
  API: "API",
  // Job started through API
  SCHEDULER: "SCHEDULER",
  // Job started through Scheduler
  TEST: "TEST",
  // Job started through test actor page
  WEBHOOK: "WEBHOOK",
  // Job started by the webhook
  ACTOR: "ACTOR",
  // Job started by another actor run
  CLI: "CLI",
  // Job started by apify CLI
  STANDBY: "STANDBY"
  // Job started by Actor Standby
};
var DOCKER_LABELS = {
  ACTOR_BUILD_ID: "com.apify.actBuildId",
  ACTOR_RUN_ID: "com.apify.actRunId",
  // Kept for backwards compatibility, will be removed soon (TODO: remove old usages!)
  /** @deprecated Use ACTOR_BUILD_ID instead! */
  ACT_BUILD_ID: "com.apify.actBuildId",
  /** @deprecated Use ACTOR_RUN_ID instead! */
  ACT_RUN_ID: "com.apify.actRunId"
};
var ACTOR_TYPES = {
  ACT: "acts",
  CRAWLER: "crawlers"
};
var ME_USER_NAME_PLACEHOLDER = "me";
var ANONYMOUS_USERNAME = "anonymous";
var USERNAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
  // Regexes matching a potentially allowed username. The numbers must match MIN and MAX!
  // Note that username must also pass isForbiddenUser() test to be allowed!
  REGEX: /^[a-z0-9_.-]{3,30}$/i,
  RESTRICTED_REGEX: /^(?!.*apify)[a-z0-9_.-]{3,30}$/i
};
var EMAIL = {
  MAX_LENGTH: 254,
  // see https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
  REGEX: EMAIL_REGEX
};
var PROFILE_NAME = {
  MAX_LENGTH: 50,
  REGEX: /^(?!.*:\/\/)[^@><]*$/
  // Prohibits usage of @, <, > and ://
};
var DNS_SAFE_NAME_MAX_LENGTH = 63;
var ACTOR_NAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: DNS_SAFE_NAME_MAX_LENGTH,
  // DNS-safe string length
  REGEX: DNS_SAFE_NAME_REGEX
};
var SHORT_CRAWLER_ID_LENGTH = 5;
var BUILD_TAG_LATEST = "latest";
var ACTOR_RESTART_ON_ERROR = {
  MAX_RESTARTS: 3,
  // This needs to be low enough so that it only covers restart loops, rather than e.g.
  // errors during crawling of large lists of URLs
  INTERVAL_MILLIS: 1 * 60 * 1e3
};
var ACT_RESTART_ON_ERROR = ACTOR_RESTART_ON_ERROR;
var ACT_JOB_TYPES = ACTOR_JOB_TYPES;
var ACT_SOURCE_TYPES = ACTOR_SOURCE_TYPES;
var ACT_JOB_STATUSES = ACTOR_JOB_STATUSES;
var ACT_JOB_TERMINAL_STATUSES = ACTOR_JOB_TERMINAL_STATUSES;
var ACT_TYPES = ACTOR_TYPES;
var COMPUTE_UNIT_MB = 1024;
var COMPUTE_UNIT_MILLIS = 60 * 60 * 1e3;
var ACTOR_LIMITS = {
  // The actualy used limit is taken from private package @apify-packages/consts
  BUILD_DEFAULT_MEMORY_MBYTES: 4096,
  // Maximum duration of build in seconds.
  BUILD_TIMEOUT_SECS: 1800,
  // For each build or run container, set disk quota based on memory size
  RUN_DISK_TO_MEMORY_SIZE_COEFF: 2,
  // For each build or run container, set CPU cores based on memory size
  RUN_MEMORY_MBYTES_PER_CPU_CORE: 4096,
  // The default limit of memory for all running Actor jobs for free accounts.
  FREE_ACCOUNT_MAX_MEMORY_MBYTES: 8192,
  // The default limit of memory for all running Actor jobs for paid accounts.
  PAID_ACCOUNT_MAX_MEMORY_MBYTES: 65536,
  // Minimum and maximum memory for a single act run.
  MIN_RUN_MEMORY_MBYTES: 128,
  MAX_RUN_MEMORY_MBYTES: 32768,
  // Maximum size of actor input schema.
  INPUT_SCHEMA_MAX_BYTES: 500 * 1024,
  // Max length of run/build log in number of characters
  LOG_MAX_CHARS: 10 * 1024 * 1024
};
var DEFAULT_PLATFORM_LIMITS = {
  // Maximum number of actors per user
  MAX_ACTORS_PER_USER: 500,
  // Maximum number of tasks per user
  MAX_TASKS_PER_USER: 5e3,
  // Maximum number of schedules per user
  MAX_SCHEDULES_PER_USER: 100,
  // Maximum number of webhooks per user
  MAX_WEBHOOKS_PER_USER: 100,
  // Maximum number of concurrent actor runs per user for free accounts.
  FREE_ACCOUNT_MAX_CONCURRENT_ACTOR_RUNS_PER_USER: 25,
  // Maximum number of concurrent actor runs per user for paid accounts.
  PAID_ACCOUNT_MAX_CONCURRENT_ACTOR_RUNS_PER_USER: 250,
  // Maximum number of actors per scheduler
  MAX_ACTORS_PER_SCHEDULER: 10,
  // Maximum number of tasks per scheduler
  MAX_TASKS_PER_SCHEDULER: 10
};
var REQUEST_QUEUE_HEAD_MAX_LIMIT = 1e3;
var APIFY_ENV_VARS = {
  ACTOR_PRICING_INFO: "APIFY_ACTOR_PRICING_INFO",
  API_BASE_URL: "APIFY_API_BASE_URL",
  API_PUBLIC_BASE_URL: "APIFY_API_PUBLIC_BASE_URL",
  CHARGED_ACTOR_EVENT_COUNTS: "APIFY_CHARGED_ACTOR_EVENT_COUNTS",
  CHROME_EXECUTABLE_PATH: "APIFY_CHROME_EXECUTABLE_PATH",
  DEDICATED_CPUS: "APIFY_DEDICATED_CPUS",
  DISABLE_OUTDATED_WARNING: "APIFY_DISABLE_OUTDATED_WARNING",
  FACT: "APIFY_FACT",
  HEADLESS: "APIFY_HEADLESS",
  INPUT_SECRETS_PRIVATE_KEY_FILE: "APIFY_INPUT_SECRETS_PRIVATE_KEY_FILE",
  INPUT_SECRETS_PRIVATE_KEY_PASSPHRASE: "APIFY_INPUT_SECRETS_PRIVATE_KEY_PASSPHRASE",
  IS_AT_HOME: "APIFY_IS_AT_HOME",
  LOCAL_STORAGE_DIR: "APIFY_LOCAL_STORAGE_DIR",
  LOG_FORMAT: "APIFY_LOG_FORMAT",
  LOG_LEVEL: "APIFY_LOG_LEVEL",
  METAMORPH_AFTER_SLEEP_MILLIS: "APIFY_METAMORPH_AFTER_SLEEP_MILLIS",
  META_ORIGIN: "APIFY_META_ORIGIN",
  PERSIST_STATE_INTERVAL_MILLIS: "APIFY_PERSIST_STATE_INTERVAL_MILLIS",
  PROXY_HOSTNAME: "APIFY_PROXY_HOSTNAME",
  PROXY_PASSWORD: "APIFY_PROXY_PASSWORD",
  PROXY_PORT: "APIFY_PROXY_PORT",
  PROXY_STATUS_URL: "APIFY_PROXY_STATUS_URL",
  PURGE_ON_START: "APIFY_PURGE_ON_START",
  SDK_LATEST_VERSION: "APIFY_SDK_LATEST_VERSION",
  SYSTEM_INFO_INTERVAL_MILLIS: "APIFY_SYSTEM_INFO_INTERVAL_MILLIS",
  TOKEN: "APIFY_TOKEN",
  USER_ID: "APIFY_USER_ID",
  USER_IS_PAYING: "APIFY_USER_IS_PAYING",
  USER_PRICING_TIER: "APIFY_USER_PRICING_TIER",
  WORKFLOW_KEY: "APIFY_WORKFLOW_KEY",
  XVFB: "APIFY_XVFB",
  // Replaced by ACTOR_ENV_VARS, kept for backward compatibility:
  ACTOR_BUILD_ID: "APIFY_ACTOR_BUILD_ID",
  ACTOR_BUILD_NUMBER: "APIFY_ACTOR_BUILD_NUMBER",
  ACTOR_EVENTS_WS_URL: "APIFY_ACTOR_EVENTS_WS_URL",
  ACTOR_ID: "APIFY_ACTOR_ID",
  ACTOR_MAX_PAID_DATASET_ITEMS: "ACTOR_MAX_PAID_DATASET_ITEMS",
  ACTOR_RUN_ID: "APIFY_ACTOR_RUN_ID",
  ACTOR_TASK_ID: "APIFY_ACTOR_TASK_ID",
  CONTAINER_PORT: "APIFY_CONTAINER_PORT",
  CONTAINER_URL: "APIFY_CONTAINER_URL",
  DEFAULT_DATASET_ID: "APIFY_DEFAULT_DATASET_ID",
  DEFAULT_KEY_VALUE_STORE_ID: "APIFY_DEFAULT_KEY_VALUE_STORE_ID",
  DEFAULT_REQUEST_QUEUE_ID: "APIFY_DEFAULT_REQUEST_QUEUE_ID",
  INPUT_KEY: "APIFY_INPUT_KEY",
  MEMORY_MBYTES: "APIFY_MEMORY_MBYTES",
  STARTED_AT: "APIFY_STARTED_AT",
  TIMEOUT_AT: "APIFY_TIMEOUT_AT",
  // Deprecated, keep them for backward compatibility:
  ACT_ID: "APIFY_ACT_ID",
  ACT_RUN_ID: "APIFY_ACT_RUN_ID"
};
var ENV_VARS = APIFY_ENV_VARS;
var ACTOR_ENV_VARS = {
  BUILD_ID: "ACTOR_BUILD_ID",
  BUILD_NUMBER: "ACTOR_BUILD_NUMBER",
  BUILD_TAGS: "ACTOR_BUILD_TAGS",
  DEFAULT_DATASET_ID: "ACTOR_DEFAULT_DATASET_ID",
  DEFAULT_KEY_VALUE_STORE_ID: "ACTOR_DEFAULT_KEY_VALUE_STORE_ID",
  DEFAULT_REQUEST_QUEUE_ID: "ACTOR_DEFAULT_REQUEST_QUEUE_ID",
  STORAGES_JSON: "ACTOR_STORAGES_JSON",
  EVENTS_WEBSOCKET_URL: "ACTOR_EVENTS_WEBSOCKET_URL",
  FULL_NAME: "ACTOR_FULL_NAME",
  ID: "ACTOR_ID",
  INPUT_KEY: "ACTOR_INPUT_KEY",
  MAX_PAID_DATASET_ITEMS: "ACTOR_MAX_PAID_DATASET_ITEMS",
  MAX_TOTAL_CHARGE_USD: "ACTOR_MAX_TOTAL_CHARGE_USD",
  MEMORY_MBYTES: "ACTOR_MEMORY_MBYTES",
  RESTART_ON_ERROR: "ACTOR_RESTART_ON_ERROR",
  PERMISSION_LEVEL: "ACTOR_PERMISSION_LEVEL",
  RUN_ID: "ACTOR_RUN_ID",
  STANDBY_PORT: "ACTOR_STANDBY_PORT",
  STANDBY_URL: "ACTOR_STANDBY_URL",
  STARTED_AT: "ACTOR_STARTED_AT",
  TASK_ID: "ACTOR_TASK_ID",
  TIMEOUT_AT: "ACTOR_TIMEOUT_AT",
  WEB_SERVER_PORT: "ACTOR_WEB_SERVER_PORT",
  WEB_SERVER_URL: "ACTOR_WEB_SERVER_URL"
};
var INTEGER_ENV_VARS = [
  // Actor env vars
  ACTOR_ENV_VARS.MAX_PAID_DATASET_ITEMS,
  ACTOR_ENV_VARS.MEMORY_MBYTES,
  ACTOR_ENV_VARS.STANDBY_PORT,
  ACTOR_ENV_VARS.WEB_SERVER_PORT,
  // Apify env vars
  APIFY_ENV_VARS.ACTOR_MAX_PAID_DATASET_ITEMS,
  APIFY_ENV_VARS.CONTAINER_PORT,
  APIFY_ENV_VARS.DEDICATED_CPUS,
  APIFY_ENV_VARS.MEMORY_MBYTES,
  APIFY_ENV_VARS.METAMORPH_AFTER_SLEEP_MILLIS,
  APIFY_ENV_VARS.PERSIST_STATE_INTERVAL_MILLIS,
  APIFY_ENV_VARS.PROXY_PORT,
  APIFY_ENV_VARS.SYSTEM_INFO_INTERVAL_MILLIS
];
var COMMA_SEPARATED_LIST_ENV_VARS = [
  ACTOR_ENV_VARS.BUILD_TAGS
];
var JSON_ENCODED_ENV_VARS = [
  ACTOR_ENV_VARS.STORAGES_JSON
];
var ACTOR_BUILD_ARGS = {
  ACTOR_PATH_IN_DOCKER_CONTEXT: "ACTOR_PATH_IN_DOCKER_CONTEXT"
};
var DEFAULT_CONTAINER_PORT = 4321;
var DEFAULT_ACTOR_STANDBY_PORT = DEFAULT_CONTAINER_PORT;
var LOCAL_STORAGE_SUBDIRS = {
  datasets: "datasets",
  keyValueStores: "key_value_stores",
  requestQueues: "request_queues"
};
var LOCAL_ACTOR_ENV_VARS = {
  [ACTOR_ENV_VARS.STANDBY_PORT]: DEFAULT_CONTAINER_PORT.toString(),
  [ACTOR_ENV_VARS.DEFAULT_DATASET_ID]: "default",
  [ACTOR_ENV_VARS.DEFAULT_KEY_VALUE_STORE_ID]: "default",
  [ACTOR_ENV_VARS.DEFAULT_REQUEST_QUEUE_ID]: "default",
  [ACTOR_ENV_VARS.WEB_SERVER_PORT]: DEFAULT_CONTAINER_PORT.toString(),
  [ACTOR_ENV_VARS.WEB_SERVER_URL]: `http://localhost:${DEFAULT_CONTAINER_PORT}`
  // Must match port line above!
};
var LOCAL_APIFY_ENV_VARS = {
  [APIFY_ENV_VARS.CONTAINER_PORT]: LOCAL_ACTOR_ENV_VARS.ACTOR_WEB_SERVER_PORT,
  [APIFY_ENV_VARS.CONTAINER_URL]: LOCAL_ACTOR_ENV_VARS.ACTOR_WEB_SERVER_URL,
  [APIFY_ENV_VARS.DEFAULT_DATASET_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_DATASET_ID,
  [APIFY_ENV_VARS.DEFAULT_KEY_VALUE_STORE_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_KEY_VALUE_STORE_ID,
  [APIFY_ENV_VARS.DEFAULT_REQUEST_QUEUE_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_REQUEST_QUEUE_ID,
  [APIFY_ENV_VARS.PROXY_HOSTNAME]: "proxy.apify.com",
  [APIFY_ENV_VARS.PROXY_PORT]: 8e3.toString()
};
var LOCAL_ENV_VARS = LOCAL_APIFY_ENV_VARS;
var KEY_VALUE_STORE_KEYS = {
  INPUT: "INPUT",
  OUTPUT: "OUTPUT"
};
var MAX_PAYLOAD_SIZE_BYTES = 9437184;
var ACTOR_CATEGORIES = {
  AI: "AI",
  AGENTS: "Agents",
  AUTOMATION: "Automation",
  BUSINESS: "Business",
  COVID_19: "Covid-19",
  DEVELOPER_EXAMPLES: "Developer examples",
  DEVELOPER_TOOLS: "Developer tools",
  ECOMMERCE: "E-commerce",
  FOR_CREATORS: "For creators",
  GAMES: "Games",
  JOBS: "Jobs",
  LEAD_GENERATION: "Lead generation",
  MARKETING: "Marketing",
  NEWS: "News",
  SEO_TOOLS: "SEO tools",
  SOCIAL_MEDIA: "Social media",
  TRAVEL: "Travel",
  VIDEOS: "Videos",
  REAL_ESTATE: "Real estate",
  SPORTS: "Sports",
  EDUCATION: "Education",
  INTEGRATIONS: "Integrations",
  OTHER: "Other",
  OPEN_SOURCE: "Open source",
  MCP_SERVERS: "MCP servers"
};
var ALL_ACTOR_CATEGORIES = {
  ...ACTOR_CATEGORIES
  // ...LEGACY_ACTOR_CATEGORIES,
};
var VERSION_INT_MAJOR_BASE = 1e7;
var VERSION_INT_MINOR_BASE = 1e5;
var USER_BASIC_TEXT_XSS_OPTIONS = {
  whiteList: {
    a: ["href", "title", "target"],
    code: [],
    strong: [],
    b: [],
    br: [],
    ul: [],
    li: [],
    ol: [],
    i: [],
    u: [],
    p: []
  }
};
var WEBHOOK_EVENT_TYPES = {
  ACTOR_RUN_CREATED: "ACTOR.RUN.CREATED",
  ACTOR_RUN_SUCCEEDED: "ACTOR.RUN.SUCCEEDED",
  ACTOR_RUN_FAILED: "ACTOR.RUN.FAILED",
  ACTOR_RUN_TIMED_OUT: "ACTOR.RUN.TIMED_OUT",
  ACTOR_RUN_ABORTED: "ACTOR.RUN.ABORTED",
  ACTOR_RUN_RESURRECTED: "ACTOR.RUN.RESURRECTED",
  ACTOR_BUILD_CREATED: "ACTOR.BUILD.CREATED",
  ACTOR_BUILD_SUCCEEDED: "ACTOR.BUILD.SUCCEEDED",
  ACTOR_BUILD_FAILED: "ACTOR.BUILD.FAILED",
  ACTOR_BUILD_TIMED_OUT: "ACTOR.BUILD.TIMED_OUT",
  ACTOR_BUILD_ABORTED: "ACTOR.BUILD.ABORTED",
  TEST: "TEST"
};
var WEBHOOK_EVENT_TYPE_GROUPS = {
  ACTOR_RUN: [
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_CREATED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_ABORTED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_RESURRECTED
  ],
  ACTOR_BUILD: [
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_CREATED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_ABORTED
  ],
  // If one of these occurs then we can be sure that none other can occur for the same triggerer.
  ACTOR_RUN_TERMINAL: [
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_ABORTED
  ],
  ACTOR_BUILD_TERMINAL: [
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_ABORTED
  ]
};
var WEBHOOK_DEFAULT_PAYLOAD_TEMPLATE = `{
    "userId": {{userId}},
    "createdAt": {{createdAt}},
    "eventType": {{eventType}},
    "eventData": {{eventData}},
    "resource": {{resource}}
}`;
var WEBHOOK_ALLOWED_PAYLOAD_VARIABLES = /* @__PURE__ */ new Set([
  "userId",
  "createdAt",
  "eventType",
  "eventData",
  "resource"
]);
var MAX_MULTIFILE_BYTES = 3 * 1024 ** 2;
var SOURCE_FILE_FORMATS = {
  TEXT: "TEXT",
  BASE64: "BASE64"
};
var PROJECT_STATUSES = {
  REQUEST: "REQUEST",
  SPECIFICATION: "SPECIFICATION",
  OFFERS: "OFFERS",
  DEPOSIT: "DEPOSIT",
  DEPOSIT_PAID: "DEPOSIT_PAID",
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  QA: "QA",
  CUSTOMER_QA: "CUSTOMER_QA",
  READY_FOR_INVOICE: "READY_FOR_INVOICE",
  INVOICED: "INVOICED",
  PAID: "PAID",
  DELIVERED: "DELIVERED",
  CLOSED: "CLOSED",
  FINISHED: "FINISHED"
};
var FINISHED_PROJECT_STATUSES = [
  PROJECT_STATUSES.READY_FOR_INVOICE,
  PROJECT_STATUSES.INVOICED,
  PROJECT_STATUSES.PAID,
  PROJECT_STATUSES.DELIVERED,
  PROJECT_STATUSES.FINISHED
];
var MARKETPLACE_USER_ROLES = {
  DEVELOPER: "DEVELOPER",
  DATA_EXPERT: "DATA_EXPERT",
  CUSTOMER: "CUSTOMER"
};
var USER_PERSONA_TYPES = {
  DEVELOPER: "DEVELOPER",
  USER: "USER"
};
var GIT_MAIN_BRANCH = "main";
var REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION = 25;
var ISSUES_STATUS_TYPES = {
  OPEN: "OPEN",
  CLOSED: "CLOSED"
};
var ISSUES_STATUS_ALL = "ALL";
var STORAGE_GENERAL_ACCESS = {
  /** Respect the user setting of the storage owner (default behavior). */
  FOLLOW_USER_SETTING: "FOLLOW_USER_SETTING",
  /** Only signed-in users with explicit access can read this storage. */
  RESTRICTED: "RESTRICTED",
  /** Anyone with a link, or the unique storage ID, can read the storage. */
  ANYONE_WITH_ID_CAN_READ: "ANYONE_WITH_ID_CAN_READ",
  /** Anyone with a link, the unique storage ID, or the storage name, can read the storage. */
  ANYONE_WITH_NAME_CAN_READ: "ANYONE_WITH_NAME_CAN_READ"
};
var RUN_GENERAL_ACCESS = {
  /** Respect the user setting of the run owner (default behavior). */
  FOLLOW_USER_SETTING: "FOLLOW_USER_SETTING",
  /** Only signed-in users with explicit access can read this run. */
  RESTRICTED: "RESTRICTED",
  /** Anyone with a link, or the unique run ID, can read the run. */
  ANYONE_WITH_ID_CAN_READ: "ANYONE_WITH_ID_CAN_READ"
};
var ACTOR_PERMISSION_LEVEL = {
  /** Full permission Actors have access to all user data in the account. */
  FULL_PERMISSIONS: "FULL_PERMISSIONS",
  /**
   * Limited permission Actors have access only to specific resources:
   * - default storages
   * - storages provided via input
   * - the current run
   * - ...
   *
   * Broadly speaking, limited permission Actors cannot access any account data not related to the current run.
   * For details refer to the Apify documentation.
   */
  LIMITED_PERMISSIONS: "LIMITED_PERMISSIONS"
};
var STORAGE_OWNERSHIP_FILTER = {
  /** Return only storages owned by the user. */
  OWNED_BY_ME: "ownedByMe",
  /** Return only storages shared with the user. */
  SHARED_WITH_ME: "sharedWithMe"
};

//# sourceMappingURL=index.mjs.map

},
1199(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IS_APIFY_LOGGER_EXCEPTION: () => (IS_APIFY_LOGGER_EXCEPTION),
  LEVELS: () => (LEVELS),
  LEVEL_TO_STRING: () => (LEVEL_TO_STRING),
  Log: () => (Log),
  LogFormat: () => (LogFormat),
  LogLevel: () => (LogLevel),
  Logger: () => (Logger),
  LoggerJson: () => (LoggerJson),
  LoggerText: () => (LoggerText),
  PREFERRED_API_ERROR_FIELDS: () => (PREFERRED_API_ERROR_FIELDS),
  PREFERRED_DATA_FIELDS: () => (PREFERRED_DATA_FIELDS),
  PREFERRED_ERROR_FIELDS: () => (PREFERRED_ERROR_FIELDS),
  PREFERRED_FIELDS: () => (PREFERRED_FIELDS),
  PREFERRED_HTTP_FIELDS: () => (PREFERRED_HTTP_FIELDS),
  PREFERRED_ID_FIELDS: () => (PREFERRED_ID_FIELDS),
  PREFIX_DELIMITER: () => (PREFIX_DELIMITER),
  TRUNCATION_FLAG_KEY: () => (TRUNCATION_FLAG_KEY),
  TRUNCATION_SUFFIX: () => (TRUNCATION_SUFFIX),
  "default": () => (index_default),
  getFormatFromEnv: () => (getFormatFromEnv),
  getLevelFromEnv: () => (getLevelFromEnv),
  sanitizeData: () => (sanitizeData),
  truncate: () => (truncate)
});
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var events__rspack_import_1 = __webpack_require__(7007);
/* import */ var ansi_colors__rspack_import_2 = __webpack_require__(313);
/* provided dependency */ var process = __webpack_require__(5606);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/log_consts.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["OFF"] = 0] = "OFF";
  LogLevel2[LogLevel2["ERROR"] = 1] = "ERROR";
  LogLevel2[LogLevel2["SOFT_FAIL"] = 2] = "SOFT_FAIL";
  LogLevel2[LogLevel2["WARNING"] = 3] = "WARNING";
  LogLevel2[LogLevel2["INFO"] = 4] = "INFO";
  LogLevel2[LogLevel2["DEBUG"] = 5] = "DEBUG";
  LogLevel2[LogLevel2["PERF"] = 6] = "PERF";
  return LogLevel2;
})(LogLevel || {});
var LEVELS = LogLevel;
var LEVEL_TO_STRING = Object.keys(LogLevel).filter((x) => Number.isNaN(+x));
var LogFormat = /* @__PURE__ */ ((LogFormat2) => {
  LogFormat2["JSON"] = "JSON";
  LogFormat2["TEXT"] = "TEXT";
  return LogFormat2;
})(LogFormat || {});
var IS_APIFY_LOGGER_EXCEPTION = /* @__PURE__ */ Symbol("apify.processed_error");
var PREFIX_DELIMITER = ":";
var TRUNCATION_FLAG_KEY = "[TRUNCATED]";
var TRUNCATION_SUFFIX = "...[truncated]";
var PREFERRED_ID_FIELDS = [
  "_id",
  "id",
  "userId",
  "impersonatedUserId",
  "impersonatingUserId",
  "adminUserId",
  "actorId",
  "actorTaskId",
  "taskId",
  "buildId",
  "buildNumber",
  "runId"
];
var PREFERRED_ERROR_FIELDS = [
  "name",
  "message",
  "stack",
  "cause"
];
var PREFERRED_HTTP_FIELDS = [
  "url",
  "method",
  "code",
  "status",
  "statusCode",
  "statusText"
];
var PREFERRED_API_ERROR_FIELDS = [
  "errorCode",
  "errorMessage",
  "errorResponse"
];
var PREFERRED_DATA_FIELDS = [
  "response",
  "request",
  "data",
  "payload",
  "details",
  "exception",
  "config",
  "headers"
];
var PREFERRED_FIELDS = [
  ...PREFERRED_ID_FIELDS,
  ...PREFERRED_ERROR_FIELDS,
  ...PREFERRED_HTTP_FIELDS,
  ...PREFERRED_API_ERROR_FIELDS,
  ...PREFERRED_DATA_FIELDS
];

// src/log_helpers.ts

function truncate(str, maxLength, suffix = TRUNCATION_SUFFIX) {
  maxLength = Math.floor(maxLength);
  if (suffix.length > maxLength) {
    throw new Error("suffix string cannot be longer than maxLength");
  }
  if (typeof str === "string" && str.length > maxLength) {
    str = str.substr(0, maxLength - suffix.length) + suffix;
  }
  return str;
}
__name(truncate, "truncate");
function getLevelFromEnv() {
  const envVar = process.env[_apify_consts__rspack_import_0.APIFY_ENV_VARS.LOG_LEVEL];
  if (!envVar) return 4 /* INFO */;
  if (Number.isFinite(+envVar)) return +envVar;
  if (LogLevel[envVar]) return LogLevel[envVar];
  return +envVar;
}
__name(getLevelFromEnv, "getLevelFromEnv");
function getFormatFromEnv() {
  const envVar = process.env[_apify_consts__rspack_import_0.APIFY_ENV_VARS.LOG_FORMAT] || "TEXT" /* TEXT */;
  switch (envVar.toLowerCase()) {
    case "JSON" /* JSON */.toLowerCase():
      return "JSON" /* JSON */;
    case "TEXT" /* TEXT */.toLowerCase():
      return "TEXT" /* TEXT */;
    default:
      console.warn(`Unknown value for environment variable ${_apify_consts__rspack_import_0.APIFY_ENV_VARS.LOG_FORMAT}: ${envVar}`);
      return "TEXT" /* TEXT */;
  }
}
__name(getFormatFromEnv, "getFormatFromEnv");
function sanitizeData(data, options) {
  const {
    maxDepth = Infinity,
    gradualLimitFactor = 1,
    maxStringLength = Infinity,
    maxArrayLength = Infinity,
    maxFields = Infinity,
    preferredFieldsMap = {},
    truncationSuffix = TRUNCATION_SUFFIX,
    truncationFlagKey = TRUNCATION_FLAG_KEY
  } = options;
  if (typeof data === "string") {
    return data.length > maxStringLength ? truncate(data, maxStringLength, truncationSuffix) : data;
  }
  if (["number", "boolean", "symbol", "bigint"].includes(typeof data) || data == null || data instanceof Date) {
    return data;
  }
  if (data instanceof Error) {
    const { name, message, stack, cause, ...rest } = data;
    data = { name, message, stack, cause, ...rest, [IS_APIFY_LOGGER_EXCEPTION]: true };
  }
  const nextCall = /* @__PURE__ */ __name((dat) => sanitizeData(
    dat,
    {
      ...options,
      maxDepth: maxDepth - 1,
      maxStringLength: Math.max(
        Math.floor(maxStringLength * gradualLimitFactor),
        truncationSuffix.length
        // always at least the length of the truncation suffix
      ),
      maxArrayLength: Math.floor(maxArrayLength * gradualLimitFactor),
      maxFields: Math.floor(maxFields * gradualLimitFactor)
    }
  ), "nextCall");
  if (Array.isArray(data)) {
    if (maxDepth <= 0) return "[array]";
    const sanitized = data.slice(0, maxArrayLength).map(nextCall);
    if (data.length > maxArrayLength) {
      sanitized.push(truncationSuffix);
    }
    return sanitized;
  }
  if (typeof data === "object" && data !== null) {
    if (maxDepth <= 0) return "[object]";
    const allKeys = Reflect.ownKeys(data);
    allKeys.sort((a, b) => {
      const aIndex = preferredFieldsMap[String(a)] ?? -1;
      const bIndex = preferredFieldsMap[String(b)] ?? -1;
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
    const sanitized = {};
    allKeys.slice(0, maxFields).forEach((key) => {
      sanitized[key] = nextCall(data[key]);
    });
    if (allKeys.length > maxFields) {
      sanitized[truncationFlagKey] = true;
    }
    return sanitized;
  }
  if (typeof data === "function") {
    return "[function]";
  }
  console.log(`WARNING: Object cannot be logged: ${data}`);
  return void 0;
}
__name(sanitizeData, "sanitizeData");

// src/logger.ts

var _Logger = class _Logger extends events__rspack_import_1.EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
  getOptions() {
    return this.options;
  }
  _outputWithConsole(level, line) {
    switch (level) {
      case 1 /* ERROR */:
        console.error(line);
        break;
      case 3 /* WARNING */:
        console.warn(line);
        break;
      case 5 /* DEBUG */:
        console.debug(line);
        break;
      default:
        console.log(line);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _log(level, message, data, exception, opts = {}) {
    throw new Error("log() method must be implemented!");
  }
  log(level, message, ...args) {
    const line = this._log(level, message, ...args);
    this.emit("line", line);
  }
};
__name(_Logger, "Logger");
var Logger = _Logger;

// src/logger_json.ts
var DEFAULT_OPTIONS = {
  skipLevelInfo: false,
  skipTime: false
};
var _LoggerJson = class _LoggerJson extends Logger {
  constructor(options = {}) {
    super({ ...DEFAULT_OPTIONS, ...options });
  }
  _log(level, message, data, exception, opts = {}) {
    const { prefix, suffix } = opts;
    if (exception) data = { ...data, exception };
    if (prefix) message = `${prefix}${PREFIX_DELIMITER} ${message}`;
    if (suffix) message = `${message} ${suffix}`;
    const rec = {
      time: !this.options.skipTime ? /* @__PURE__ */ new Date() : void 0,
      level: this.options.skipLevelInfo && level === 4 /* INFO */ ? void 0 : LogLevel[level],
      msg: message,
      ...data
    };
    const line = JSON.stringify(rec);
    this._outputWithConsole(level, line);
    return line;
  }
};
__name(_LoggerJson, "LoggerJson");
var LoggerJson = _LoggerJson;

// src/logger_text.ts


// src/node_internals.ts

function identicalSequenceRange(a, b) {
  for (let i = 0; i < a.length - 3; i++) {
    const pos = b.indexOf(a[i]);
    if (pos !== -1) {
      const rest = b.length - pos;
      if (rest > 3) {
        let len = 1;
        const maxLen = Math.min(a.length - i, rest);
        while (maxLen > len && a[i + len] === b[pos + len]) {
          len++;
        }
        if (len > 3) {
          return { len, offset: i };
        }
      }
    }
  }
  return { len: 0, offset: 0 };
}
__name(identicalSequenceRange, "identicalSequenceRange");
function getStackString(error) {
  return error.stack ? String(error.stack) : Error.prototype.toString.call(error);
}
__name(getStackString, "getStackString");
function getStackFrames(err, stack) {
  const frames = stack.split("\n");
  let cause;
  try {
    ({ cause } = err);
  } catch {
  }
  if (cause != null && typeof cause === "object" && IS_APIFY_LOGGER_EXCEPTION in cause) {
    const causeStack = getStackString(cause);
    const causeStackStart = causeStack.indexOf("\n    at");
    if (causeStackStart !== -1) {
      const causeFrames = causeStack.slice(causeStackStart + 1).split("\n");
      const { len, offset } = identicalSequenceRange(frames, causeFrames);
      if (len > 0) {
        const skipped = len - 2;
        const msg = `    ... ${skipped} lines matching cause stack trace ...`;
        frames.splice(offset + 1, skipped, ansi_colors__rspack_import_2.grey(msg));
      }
    }
  }
  return frames;
}
__name(getStackFrames, "getStackFrames");

// src/logger_text.ts
var SHORTEN_LEVELS = {
  SOFT_FAIL: "SFAIL",
  WARNING: "WARN"
};
var LEVEL_TO_COLOR = {
  [1 /* ERROR */]: "red",
  [2 /* SOFT_FAIL */]: "red",
  [3 /* WARNING */]: "yellow",
  [4 /* INFO */]: "green",
  [5 /* DEBUG */]: "blue",
  [6 /* PERF */]: "magenta"
};
var SHORTENED_LOG_LEVELS = LEVEL_TO_STRING.map((level) => SHORTEN_LEVELS[level] || level);
var MAX_LEVEL_LENGTH_SPACES = Math.max(...SHORTENED_LOG_LEVELS.map((l) => l.length));
var getLevelIndent = /* @__PURE__ */ __name((level) => {
  let spaces = "";
  for (let i = 0; i < MAX_LEVEL_LENGTH_SPACES - level.length; i++) spaces += " ";
  return spaces;
}, "getLevelIndent");
var DEFAULT_OPTIONS2 = {
  skipTime: true
};
var _LoggerText = class _LoggerText extends Logger {
  constructor(options = {}) {
    super({ ...DEFAULT_OPTIONS2, ...options });
  }
  _log(level, message, data, exception, opts = {}) {
    let { prefix, suffix } = opts;
    let maybeDate = "";
    if (!this.options.skipTime) {
      maybeDate = `${(/* @__PURE__ */ new Date()).toISOString().replace("Z", "").replace("T", " ")} `;
    }
    const errStack = exception ? this._parseException(exception) : "";
    const color = LEVEL_TO_COLOR[level];
    const levelStr = SHORTENED_LOG_LEVELS[level];
    const levelIndent = getLevelIndent(levelStr);
    const dataStr = !data ? "" : ` ${JSON.stringify(data)}`;
    prefix = prefix ? ` ${prefix}${PREFIX_DELIMITER}` : "";
    suffix = suffix ? ` ${suffix}` : "";
    const line = `${ansi_colors__rspack_import_2.gray(maybeDate)}${ansi_colors__rspack_import_2[color](levelStr)}${levelIndent}${ansi_colors__rspack_import_2.yellow(prefix)} ${message || ""}${ansi_colors__rspack_import_2.gray(dataStr)}${ansi_colors__rspack_import_2.yellow(suffix)}${errStack}`;
    this._outputWithConsole(level, line);
    return line;
  }
  _parseException(exception, indentLevel = 1) {
    if (["string", "boolean", "number", "undefined", "bigint"].includes(typeof exception)) {
      return `
${exception}`;
    }
    if (exception === null) {
      return "\nnull";
    }
    if (typeof exception === "symbol") {
      return `
${exception.toString()}`;
    }
    if (typeof exception === "object" && IS_APIFY_LOGGER_EXCEPTION in exception) {
      return this._parseLoggerException(exception, indentLevel);
    }
    return `
${JSON.stringify(exception, null, 2)}`;
  }
  _parseLoggerException(exception, indentLevel = 1) {
    const errDetails = [];
    if (exception.type) {
      errDetails.push(`type=${exception.type}`);
    }
    if (exception.details) {
      Object.entries(exception.details).map(([key, val]) => errDetails.push(`${key}=${val}`));
    }
    const errorString = exception.stack || exception.reason || exception.message;
    const isStack = errorString === exception.stack;
    const errorLines = getStackFrames(exception, errorString);
    if (isStack) {
      errorLines[0] = exception.message || errorLines[0];
    }
    if (errDetails.length) {
      errorLines[0] += ansi_colors__rspack_import_2.gray(`(details: ${errDetails.join(", ")})`);
    }
    for (let i = 1; i < errorLines.length; i++) {
      errorLines[i] = ansi_colors__rspack_import_2.gray(errorLines[i]);
    }
    if (exception.cause) {
      const causeString = this._parseException(exception.cause, indentLevel + 1);
      const causeLines = causeString.trim().split("\n");
      errorLines.push(ansi_colors__rspack_import_2.red(`  CAUSE: ${ansi_colors__rspack_import_2.reset(causeLines[0])}`), ...causeLines.slice(1));
    }
    return `
${errorLines.map((line) => `${" ".repeat(indentLevel * 2)}${line}`).join("\n")}`;
  }
};
__name(_LoggerText, "LoggerText");
var LoggerText = _LoggerText;

// src/log.ts
var getLoggerForFormat = /* @__PURE__ */ __name((format) => {
  switch (format) {
    case "JSON" /* JSON */:
      return new LoggerJson();
    case "TEXT" /* TEXT */:
    default:
      return new LoggerText();
  }
}, "getLoggerForFormat");
var getDefaultOptions = /* @__PURE__ */ __name(() => ({
  level: getLevelFromEnv(),
  maxDepth: 4,
  gradualLimitFactor: 1 / 2,
  // at each depth level, the limits will be reduced by half
  maxStringLength: 1e3,
  maxArrayLength: 500,
  maxFields: 20,
  preferredFields: [...PREFERRED_FIELDS],
  prefix: null,
  suffix: null,
  truncationSuffix: TRUNCATION_SUFFIX,
  truncationFlagKey: TRUNCATION_FLAG_KEY,
  logger: getLoggerForFormat(getFormatFromEnv()),
  data: {}
}), "getDefaultOptions");
var _Log = class _Log {
  constructor(options = {}) {
    /**
     * Map of available log levels that's useful for easy setting of appropriate log levels.
     * Each log level is represented internally by a number. Eg. `log.LEVELS.DEBUG === 5`.
     */
    __publicField(this, "LEVELS", LogLevel);
    // for BC
    __publicField(this, "options");
    /** Maps preferred fields to their index for faster lookup */
    __publicField(this, "preferredFieldsMap");
    __publicField(this, "warningsOnceLogged", /* @__PURE__ */ new Set());
    this.options = { ...getDefaultOptions(), ...options };
    if (!LogLevel[this.options.level]) throw new Error('Options "level" must be one of log.LEVELS enum!');
    if (typeof this.options.maxDepth !== "number") throw new Error('Options "maxDepth" must be a number!');
    if (typeof this.options.gradualLimitFactor !== "number") throw new Error('Options "gradualLimitFactor" must be a number!');
    if (typeof this.options.maxStringLength !== "number") throw new Error('Options "maxStringLength" must be a number!');
    if (typeof this.options.maxArrayLength !== "number") throw new Error('Options "maxArrayLength" must be a number!');
    if (typeof this.options.maxFields !== "number") throw new Error('Options "maxFields" must be a number!');
    if (!Array.isArray(this.options.preferredFields)) throw new Error('Options "preferredFields" must be an array!');
    if (this.options.prefix && typeof this.options.prefix !== "string") throw new Error('Options "prefix" must be a string!');
    if (this.options.suffix && typeof this.options.suffix !== "string") throw new Error('Options "suffix" must be a string!');
    if (typeof this.options.truncationSuffix !== "string") throw new Error('Options "truncationSuffix" must be a string!');
    if (typeof this.options.truncationFlagKey !== "string") throw new Error('Options "truncationFlagKey" must be a string!');
    if (typeof this.options.logger !== "object") throw new Error('Options "logger" must be an object!');
    if (typeof this.options.data !== "object") throw new Error('Options "data" must be an object!');
    this.preferredFieldsMap = Object.fromEntries(
      this.options.preferredFields.map((field, index) => [field, index])
    );
  }
  _sanitizeData(obj) {
    return sanitizeData(
      obj,
      {
        maxDepth: this.options.maxDepth,
        gradualLimitFactor: this.options.gradualLimitFactor,
        maxStringLength: this.options.maxStringLength,
        maxArrayLength: this.options.maxArrayLength,
        maxFields: this.options.maxFields,
        preferredFieldsMap: this.preferredFieldsMap,
        truncationSuffix: this.options.truncationSuffix,
        truncationFlagKey: this.options.truncationFlagKey
      }
    );
  }
  /**
   * Returns the currently selected logging level. This is useful for checking whether a message
   * will actually be printed to the console before one actually performs a resource intensive operation
   * to construct the message, such as querying a DB for some metadata that need to be added. If the log
   * level is not high enough at the moment, it doesn't make sense to execute the query.
   */
  getLevel() {
    return this.options.level;
  }
  /**
   * Sets the log level to the given value, preventing messages from less important log levels
   * from being printed to the console. Use in conjunction with the `log.LEVELS` constants such as
   *
   * ```
   * log.setLevel(log.LEVELS.DEBUG);
   * ```
   *
   * Default log level is INFO.
   */
  setLevel(level) {
    if (!LogLevel[level]) throw new Error('Options "level" must be one of log.LEVELS enum!');
    this.options.level = level;
  }
  internal(level, message, data, exception) {
    if (level > this.options.level) return;
    data = { ...this.options.data, ...data };
    data = Reflect.ownKeys(data).length > 0 ? this._sanitizeData(data) : void 0;
    exception = this._sanitizeData(exception);
    this.options.logger.log(level, message, data, exception, {
      prefix: this.options.prefix,
      suffix: this.options.suffix
    });
  }
  /**
   * Configures logger.
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
  /**
   * Returns the logger configuration.
   */
  getOptions() {
    return { ...this.options };
  }
  /**
   * Creates a new instance of logger that inherits settings from a parent logger.
   */
  child(options) {
    let { prefix } = this.options;
    if (options.prefix) {
      prefix = prefix ? `${prefix}${PREFIX_DELIMITER}${options.prefix}` : options.prefix;
    }
    const data = options.data ? { ...this.options.data, ...options.data } : this.options.data;
    const newOptions = {
      ...this.options,
      ...options,
      prefix,
      data
    };
    return new _Log(newOptions);
  }
  /**
   * Logs an `ERROR` message. Use this method to log error messages that are not directly connected
   * to an exception. For logging exceptions, use the `log.exception` method.
   */
  error(message, data) {
    this.internal(1 /* ERROR */, message, data);
  }
  /**
   * Logs an `ERROR` level message with a nicely formatted exception. Note that the exception is the first parameter
   * here and an additional message is only optional.
   */
  exception(exception, message, data) {
    this.internal(1 /* ERROR */, message, data, exception);
  }
  softFail(message, data) {
    this.internal(2 /* SOFT_FAIL */, message, data);
  }
  /**
   * Logs a `WARNING` level message. Data are stringified and appended to the message.
   */
  warning(message, data) {
    this.internal(3 /* WARNING */, message, data);
  }
  /**
   * Logs an `INFO` message. `INFO` is the default log level so info messages will be always logged,
   * unless the log level is changed. Data are stringified and appended to the message.
   */
  info(message, data) {
    this.internal(4 /* INFO */, message, data);
  }
  /**
   * Logs a `DEBUG` message. By default, it will not be written to the console. To see `DEBUG`
   * messages in the console, set the log level to `DEBUG` either using the `log.setLevel(log.LEVELS.DEBUG)`
   * method or using the environment variable `APIFY_LOG_LEVEL=DEBUG`. Data are stringified and appended
   * to the message.
   */
  debug(message, data) {
    this.internal(5 /* DEBUG */, message, data);
  }
  perf(message, data) {
    this.internal(6 /* PERF */, message, data);
  }
  /**
   * Logs a `WARNING` level message only once.
   */
  warningOnce(message) {
    if (this.warningsOnceLogged.has(message)) return;
    this.warningsOnceLogged.add(message);
    this.warning(message);
  }
  /**
   * Logs given message only once as WARNING. It's used to warn user that some feature he is using has been deprecated.
   */
  deprecated(message) {
    this.warningOnce(message);
  }
};
__name(_Log, "Log");
var Log = _Log;

// src/index.ts
var log = new Log();
var index_default = log;

//# sourceMappingURL=index.mjs.map

},
7957(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CHECK_TYPES: () => (CHECK_TYPES),
  CodeHashManager: () => (CodeHashManager),
  CodeHashMetaKey: () => (CodeHashMetaKey),
  HealthChecker: () => (HealthChecker),
  InvalidJsonError: () => (InvalidJsonError),
  InvalidVariableError: () => (InvalidVariableError),
  JsonVariable: () => (JsonVariable),
  ParseJsonlStream: () => (ParseJsonlStream),
  RetryableError: () => (RetryableError),
  WebhookPayloadTemplate: () => (WebhookPayloadTemplate),
  betterClearInterval: () => (betterClearInterval),
  betterSetInterval: () => (betterSetInterval),
  buildOrVersionNumberIntToStr: () => (buildOrVersionNumberIntToStr),
  checkParamPrototypeOrThrow: () => (checkParamPrototypeOrThrow),
  concatStreamToBuffer: () => (concatStreamToBuffer),
  configureLogger: () => (configureLogger),
  createHmacSignature: () => (createHmacSignature),
  createHmacSignatureAsync: () => (createHmacSignatureAsync),
  createInjectableRegExp: () => (createInjectableRegExp),
  createStorageContentSignature: () => (createStorageContentSignature),
  createStorageContentSignatureAsync: () => (createStorageContentSignatureAsync),
  cryptoRandomObjectId: () => (cryptoRandomObjectId),
  dateToString: () => (dateToString),
  delayPromise: () => (delayPromise),
  deterministicUniqueId: () => (deterministicUniqueId),
  escapeForBson: () => (escapeForBson),
  escapePropertyName: () => (escapePropertyName),
  escapeRegExp: () => (escapeRegExp),
  expressErrorHandler: () => (expressErrorHandler),
  getOrdinalSuffix: () => (getOrdinalSuffix),
  getRandomInt: () => (getRandomInt),
  http404Route: () => (http404Route),
  isBadForMongo: () => (isBadForMongo),
  isBuffer: () => (isBuffer),
  isForbiddenUsername: () => (isForbiddenUsername),
  isNullOrUndefined: () => (isNullOrUndefined),
  isUrlRelative: () => (isUrlRelative),
  jsonStringifyExtended: () => (jsonStringifyExtended),
  leftpad: () => (leftpad),
  markedDecreaseHeadsLevel: () => (markedDecreaseHeadsLevel),
  markedSetNofollowLinks: () => (markedSetNofollowLinks),
  normalizeUrl: () => (normalizeUrl),
  parseBooleanOrNull: () => (parseBooleanOrNull),
  parseDateFromJson: () => (parseDateFromJson),
  parseUrl: () => (parseUrl),
  privateDecrypt: () => (privateDecrypt),
  promisifyServerListen: () => (promisifyServerListen),
  publicEncrypt: () => (publicEncrypt),
  readStreamToString: () => (readStreamToString),
  removeFromArray: () => (removeFromArray),
  retryWithExpBackoff: () => (retryWithExpBackoff),
  separateImports: () => (separateImports),
  sequentializePromises: () => (sequentializePromises),
  splitFullName: () => (splitFullName),
  timeoutPromise: () => (timeoutPromise),
  traverseObject: () => (traverseObject),
  truncate: () => (truncate),
  unescapeFromBson: () => (unescapeFromBson),
  unescapePropertyName: () => (unescapePropertyName),
  weightedAverage: () => (weightedAverage)
});
/* import */ var crypto__rspack_import_3 = __webpack_require__(4849);
/* import */ var _apify_consts__rspack_import_0 = __webpack_require__(6125);
/* import */ var _apify_log__rspack_import_1 = __webpack_require__(1199);
/* import */ var stream__rspack_import_2 = __webpack_require__(8310);
/* provided dependency */ var Buffer = __webpack_require__(8287)["Buffer"];
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/utilities.ts



function cryptoRandomObjectId(length = 17) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto__rspack_import_3.randomBytes(length);
  let str = "";
  for (let i = bytes.length - 1; i >= 0; i--) {
    str += chars[(bytes[i] | 0) % chars.length];
  }
  return str;
}
__name(cryptoRandomObjectId, "cryptoRandomObjectId");
function deterministicUniqueId(key, length = 17) {
  return crypto__rspack_import_3.createHash("sha256").update(key).digest("base64").replace(/(\+|\/|=)/g, "x").substr(0, length);
}
__name(deterministicUniqueId, "deterministicUniqueId");
function getRandomInt(maxExcluded) {
  maxExcluded = Math.floor(maxExcluded);
  return Math.floor(Math.random() * maxExcluded);
}
__name(getRandomInt, "getRandomInt");
function parseDateFromJson(date) {
  if (typeof date === "string") {
    return new Date(Date.parse(date));
  }
  return date;
}
__name(parseDateFromJson, "parseDateFromJson");
async function delayPromise(millis) {
  return new Promise(((resolve) => {
    if (millis > 0) {
      setTimeout(() => resolve(), millis);
    } else {
      resolve();
    }
  }));
}
__name(delayPromise, "delayPromise");
function removeFromArray(array, element) {
  const index = array.indexOf(element);
  if (index >= 0) {
    array.splice(index, 1);
    return true;
  }
  return false;
}
__name(removeFromArray, "removeFromArray");
function http404Route(req, res) {
  res.status(404);
  res.send("Page not found");
}
__name(http404Route, "http404Route");
function expressErrorHandler(err, req, res, next) {
  _apify_log__rspack_import_1["default"].warning("Client HTTP request failed", { url: req.url, errMsg: err.message });
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(505);
  res.send("Internal server error");
}
__name(expressErrorHandler, "expressErrorHandler");
function betterSetInterval(func, delay) {
  let scheduleNextRun;
  let timeoutId;
  let isRunning = true;
  const funcWrapper = /* @__PURE__ */ __name(function() {
    void new Promise((resolve) => {
      resolve(func(() => void 0));
    }).finally(scheduleNextRun);
  }, "funcWrapper");
  scheduleNextRun = /* @__PURE__ */ __name(function() {
    if (isRunning) timeoutId = setTimeout(funcWrapper, delay);
  }, "scheduleNextRun");
  funcWrapper();
  return {
    _betterClearInterval() {
      isRunning = false;
      clearTimeout(timeoutId);
    }
  };
}
__name(betterSetInterval, "betterSetInterval");
function betterClearInterval(intervalID) {
  if (intervalID && intervalID._betterClearInterval) {
    try {
      intervalID._betterClearInterval();
    } catch (e) {
      _apify_log__rspack_import_1["default"].exception(e, "_betterClearInterval() threw an exception!?");
    }
  }
}
__name(betterClearInterval, "betterClearInterval");
function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
__name(escapeRegExp, "escapeRegExp");
function leftpad(str, len, ch = " ") {
  str = String(str);
  let i = -1;
  if (!ch && ch !== 0) ch = " ";
  len -= str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}
__name(leftpad, "leftpad");
function weightedAverage(val1, weight1, val2, weight2) {
  return (val1 * weight1 + val2 * weight2) / (weight1 + weight2);
}
__name(weightedAverage, "weightedAverage");
var FORBIDDEN_USERNAMES_REGEXPS = [
  // App routes
  "page-not-found",
  "docs",
  "terms-of-use",
  "about",
  "pricing",
  "privacy-policy",
  "customers",
  "request-form",
  "request-solution",
  "release-notes",
  "jobs",
  "api-reference",
  "video-tutorials",
  "acts",
  "key-value-stores",
  "schedules",
  "account",
  "sign-up",
  "sign-in-discourse",
  "admin",
  "documentation",
  "change-password",
  "enroll-account",
  "forgot-password",
  "reset-password",
  "sign-in",
  "verify-email",
  "live-status",
  "browser-info",
  "webhooks",
  "health-check",
  "api",
  "change-log",
  "dashboard",
  "community",
  "crawlers",
  "ext",
  "schemas",
  // Various strings
  "admin",
  "administration",
  "crawler",
  "act",
  "library",
  "lib",
  "apifier",
  "team",
  "contact",
  "doc",
  "documentation",
  "for-business",
  "for-developers",
  "developers",
  "business",
  "integrations",
  "job",
  "setting",
  "settings",
  "privacy",
  "policy",
  "assets",
  "help",
  "config",
  "configuration",
  "terms",
  "hiring",
  "hire",
  "status",
  "status-page",
  "solutions",
  "support",
  "market",
  "marketplace",
  "download",
  "downloads",
  "username",
  "users",
  "user",
  "login",
  "logout",
  "signin",
  "sign",
  "signup",
  "sign-out",
  "signout",
  "plugins",
  "plug-ins",
  "reset",
  "password",
  "passwords",
  "square",
  "profile-photos",
  "profiles",
  "true",
  "false",
  "js",
  "css",
  "img",
  "images",
  "image",
  "partials",
  "fonts",
  "font",
  "dynamic_templates",
  "app",
  "schedules",
  "community",
  "storage",
  "storages",
  "account",
  "node_modules",
  "bower_components",
  "video",
  "knowledgebase",
  "forum",
  "customers",
  "blog",
  "health-check",
  "health",
  "anim",
  "forum_topics.json",
  "forum_categories.json",
  "me",
  "you",
  "him",
  "she",
  "it",
  "external",
  "actor",
  "crawler",
  "scheduler",
  "api",
  "sdk",
  "puppeteer",
  "webdriver",
  "selenium",
  "(selenium.*webdriver)",
  "undefined",
  "page-analyzer",
  "wp-login.php",
  "welcome.action",
  "echo",
  "proxy",
  "super-proxy",
  "gdpr",
  "case-studies",
  "use-cases",
  "how-to",
  "kb",
  "cookies",
  "cookie-policy",
  "cookies-policy",
  "powered-by",
  "run",
  "runs",
  "actor",
  "actors",
  "act",
  "acts",
  "success-stories",
  "roadmap",
  "join-marketplace",
  "presskit",
  "press-kit",
  "covid-19",
  "covid",
  "covid19",
  "matfyz",
  "ideas",
  "public-actors",
  "resources",
  "partners",
  "affiliate",
  "industries",
  "web-scraping",
  "custom-solutions",
  "solution-provider",
  "alternatives",
  "platform",
  "freelancers",
  "freelancer",
  "partner",
  "preview",
  "templates",
  "data-for-generative-ai",
  "discord",
  "praguecrawl",
  "prague-crawl",
  "bob",
  "ai-agents",
  "reel",
  "video-reel",
  "mcp",
  "model-context-protocol",
  "modelcontextprotocol",
  "apify.com",
  "design-kit",
  "press-kit",
  "scrapers",
  "professional-services",
  "challenge",
  "challange",
  "1m-challenge",
  "1m-usd-challenge",
  // Special files
  "index",
  "index\\.html",
  "(favicon\\.[a-z]+)",
  "BingSiteAuth.xml",
  "(google.+\\.html)",
  "robots\\.txt",
  "(sitemap\\.[a-z]+)",
  "(apple-touch-icon.*)",
  "security-whitepaper\\.pdf",
  "security\\.txt",
  // All hidden files
  "(\\..*)",
  // Username starting with xxx-
  "(xxx-.*)",
  // Username starting with install-cli. (see https://docs.apify.com/cli/docs/installation)
  "(install-cli\\..*)",
  // Strings not starting with letter or number
  "([^0-9a-z].*)",
  // Strings not ending with letter or number
  "(.*[^0-9a-z])",
  // Strings where there's more than one underscore, comma or dash in row
  "(.*[_.\\-]{2}.*)",
  // Reserved usernames from https://github.com/shouldbee/reserved-usernames/blob/master/reserved-usernames.json
  "0",
  "about",
  "access",
  "account",
  "accounts",
  "activate",
  "activities",
  "activity",
  "ad",
  "add",
  "address",
  "adm",
  "admin",
  "administration",
  "administrator",
  "ads",
  "adult",
  "advertising",
  "affiliate",
  "affiliates",
  "ajax",
  "all",
  "alpha",
  "analysis",
  "analytics",
  "android",
  "anon",
  "anonymous",
  "api",
  "app",
  "apps",
  "archive",
  "archives",
  "article",
  "asct",
  "asset",
  "atom",
  "auth",
  "authentication",
  "avatar",
  "backup",
  "balancer-manager",
  "banner",
  "banners",
  "beta",
  "billing",
  "bin",
  "blog",
  "blogs",
  "board",
  "book",
  "bookmark",
  "bot",
  "bots",
  "bug",
  "business",
  "cache",
  "cadastro",
  "calendar",
  "call",
  "campaign",
  "cancel",
  "captcha",
  "career",
  "careers",
  "cart",
  "categories",
  "category",
  "cgi",
  "cgi-bin",
  "changelog",
  "chat",
  "check",
  "checking",
  "checkout",
  "client",
  "cliente",
  "clients",
  "code",
  "codereview",
  "comercial",
  "comment",
  "comments",
  "communities",
  "community",
  "company",
  "compare",
  "compras",
  "config",
  "configuration",
  "connect",
  "contact",
  "contact-us",
  "contact_us",
  "contactus",
  "contest",
  "contribute",
  "corp",
  "create",
  "css",
  "dashboard",
  "data",
  "db",
  "default",
  "delete",
  "demo",
  "design",
  "designer",
  "destroy",
  "dev",
  "devel",
  "developer",
  "developers",
  "diagram",
  "diary",
  "dict",
  "dictionary",
  "die",
  "dir",
  "direct_messages",
  "directory",
  "dist",
  "doc",
  "docs",
  "documentation",
  "domain",
  "download",
  "downloads",
  "ecommerce",
  "edit",
  "editor",
  "edu",
  "education",
  "email",
  "employment",
  "empty",
  "end",
  "enterprise",
  "entries",
  "entry",
  "error",
  "errors",
  "eval",
  "event",
  "exit",
  "explore",
  "facebook",
  "faq",
  "favorite",
  "favorites",
  "feature",
  "features",
  "feed",
  "feedback",
  "feeds",
  "file",
  "files",
  "first",
  "flash",
  "fleet",
  "fleets",
  "flog",
  "follow",
  "followers",
  "following",
  "forgot",
  "form",
  "forum",
  "forums",
  "founder",
  "free",
  "friend",
  "friends",
  "ftp",
  "gadget",
  "gadgets",
  "game",
  "games",
  "get",
  "gift",
  "gifts",
  "gist",
  "github",
  "graph",
  "group",
  "groups",
  "guest",
  "guests",
  "help",
  "home",
  "homepage",
  "host",
  "hosting",
  "hostmaster",
  "hostname",
  "howto",
  "hpg",
  "html",
  "http",
  "httpd",
  "https",
  "i",
  "iamges",
  "icon",
  "icons",
  "id",
  "idea",
  "ideas",
  "image",
  "images",
  "imap",
  "img",
  "index",
  "indice",
  "info",
  "information",
  "inquiry",
  "instagram",
  "intranet",
  "invitations",
  "invite",
  "ipad",
  "iphone",
  "irc",
  "is",
  "issue",
  "issues",
  "it",
  "item",
  "items",
  "java",
  "javascript",
  "job",
  "jobs",
  "join",
  "js",
  "json",
  "jump",
  "knowledgebase",
  "language",
  "languages",
  "last",
  "ldap-status",
  "legal",
  "license",
  "link",
  "links",
  "linux",
  "list",
  "lists",
  "log",
  "log-in",
  "log-out",
  "log_in",
  "log_out",
  "login",
  "logout",
  "logs",
  "m",
  "mac",
  "mail",
  "mail1",
  "mail2",
  "mail3",
  "mail4",
  "mail5",
  "mailer",
  "mailing",
  "maintenance",
  "manager",
  "manual",
  "map",
  "maps",
  "marketing",
  "master",
  "me",
  "media",
  "member",
  "members",
  "message",
  "messages",
  "messenger",
  "microblog",
  "microblogs",
  "mine",
  "mis",
  "mob",
  "mobile",
  "movie",
  "movies",
  "mp3",
  "msg",
  "msn",
  "music",
  "musicas",
  "mx",
  "my",
  "mysql",
  "name",
  "named",
  "nan",
  "navi",
  "navigation",
  "net",
  "network",
  "new",
  "news",
  "newsletter",
  "nick",
  "nickname",
  "notes",
  "noticias",
  "notification",
  "notifications",
  "notify",
  "ns",
  "ns1",
  "ns10",
  "ns2",
  "ns3",
  "ns4",
  "ns5",
  "ns6",
  "ns7",
  "ns8",
  "ns9",
  "null",
  "oauth",
  "oauth_clients",
  "offer",
  "offers",
  "official",
  "old",
  "online",
  "openid",
  "operator",
  "order",
  "orders",
  "organization",
  "organizations",
  "overview",
  "owner",
  "owners",
  "page",
  "pager",
  "pages",
  "panel",
  "password",
  "payment",
  "perl",
  "phone",
  "photo",
  "photoalbum",
  "photos",
  "php",
  "phpmyadmin",
  "phppgadmin",
  "phpredisadmin",
  "pic",
  "pics",
  "ping",
  "plan",
  "plans",
  "plugin",
  "plugins",
  "policy",
  "pop",
  "pop3",
  "popular",
  "portal",
  "post",
  "postfix",
  "postmaster",
  "posts",
  "pr",
  "premium",
  "press",
  "price",
  "pricing",
  "privacy",
  "privacy-policy",
  "privacy_policy",
  "privacypolicy",
  "private",
  "product",
  "products",
  "profile",
  "project",
  "projects",
  "promo",
  "pub",
  "public",
  "purpose",
  "put",
  "python",
  "query",
  "random",
  "ranking",
  "read",
  "readme",
  "recent",
  "recruit",
  "recruitment",
  "register",
  "registration",
  "release",
  "remove",
  "replies",
  "report",
  "reports",
  "repositories",
  "repository",
  "req",
  "request",
  "requests",
  "reset",
  "roc",
  "root",
  "rss",
  "ruby",
  "rule",
  "sag",
  "sale",
  "sales",
  "sample",
  "samples",
  "save",
  "school",
  "script",
  "scripts",
  "search",
  "secure",
  "security",
  "self",
  "send",
  "server",
  "server-info",
  "server-status",
  "service",
  "services",
  "session",
  "sessions",
  "setting",
  "settings",
  "setup",
  "share",
  "shop",
  "show",
  "sign-in",
  "sign-up",
  "sign_in",
  "sign_up",
  "signin",
  "signout",
  "signup",
  "site",
  "sitemap",
  "sites",
  "smartphone",
  "smtp",
  "soporte",
  "source",
  "spec",
  "special",
  "sql",
  "src",
  "ssh",
  "ssl",
  "ssladmin",
  "ssladministrator",
  "sslwebmaster",
  "staff",
  "stage",
  "staging",
  "start",
  "stat",
  "state",
  "static",
  "stats",
  "status",
  "store",
  "stores",
  "stories",
  "style",
  "styleguide",
  "stylesheet",
  "stylesheets",
  "subdomain",
  "subscribe",
  "subscription",
  "subscriptions",
  "suporte",
  "support",
  "svn",
  "swf",
  "sys",
  "sysadmin",
  "sysadministrator",
  "system",
  "tablet",
  "tablets",
  "tag",
  "talk",
  "task",
  "tasks",
  "team",
  "teams",
  "tech",
  "telnet",
  "term",
  "terms",
  "terms-of-service",
  "terms_of_service",
  "termsofservice",
  "test",
  "test1",
  "test2",
  "test3",
  "teste",
  "testing",
  "tests",
  "theme",
  "themes",
  "thread",
  "threads",
  "tmp",
  "todo",
  "tool",
  "tools",
  "top",
  "topic",
  "topics",
  "tos",
  "tour",
  "translations",
  "trends",
  "tutorial",
  "tux",
  "tv",
  "twitter",
  "undef",
  "unfollow",
  "unsubscribe",
  "update",
  "upload",
  "uploads",
  "url",
  "usage",
  "user",
  "username",
  "users",
  "usuario",
  "vendas",
  "ver",
  "version",
  "video",
  "videos",
  "visitor",
  "watch",
  "weather",
  "web",
  "webhook",
  "webhooks",
  "webmail",
  "webmaster",
  "website",
  "websites",
  "welcome",
  "widget",
  "widgets",
  "wiki",
  "win",
  "windows",
  "word",
  "work",
  "works",
  "workshop",
  "ww",
  "wws",
  "www",
  "www1",
  "www2",
  "www3",
  "www4",
  "www5",
  "www6",
  "www7",
  "wwws",
  "wwww",
  "xfn",
  "xml",
  "xmpp",
  "xpg",
  "xxx",
  "yaml",
  "year",
  "yml",
  "you",
  "yourdomain",
  "yourname",
  "yoursite",
  "yourusername"
];
var FORBIDDEN_REGEXP = new RegExp(`^(${_apify_consts__rspack_import_0.ANONYMOUS_USERNAME}|${FORBIDDEN_USERNAMES_REGEXPS.join("|")})$`, "i");
function isForbiddenUsername(username) {
  return !!username.match(_apify_consts__rspack_import_0.APIFY_ID_REGEX) || !!username.match(FORBIDDEN_REGEXP);
}
__name(isForbiddenUsername, "isForbiddenUsername");
async function sequentializePromises(promises) {
  if (!promises.length) return [];
  const results = [];
  for (const promiseOrFunc of promises) {
    const promise = promiseOrFunc instanceof Function ? promiseOrFunc() : promiseOrFunc;
    results.push(await promise);
  }
  return results;
}
__name(sequentializePromises, "sequentializePromises");
function checkParamPrototypeOrThrow(paramVal, paramName, prototypes, prototypeName, isOptional = false) {
  if (isOptional && (paramVal === void 0 || paramVal === null)) return;
  const hasCorrectPrototype = prototypes instanceof Array ? prototypes.some((prototype) => paramVal instanceof prototype) : paramVal instanceof prototypes;
  if (!hasCorrectPrototype) throw new Error(`Parameter "${paramName}" must be an instance of ${prototypeName}`);
}
__name(checkParamPrototypeOrThrow, "checkParamPrototypeOrThrow");
function promisifyServerListen(server) {
  return async (port) => {
    return new Promise((resolve, reject) => {
      const onError = /* @__PURE__ */ __name((err) => {
        removeListeners();
        reject(err);
      }, "onError");
      const onListening = /* @__PURE__ */ __name(() => {
        removeListeners();
        resolve();
      }, "onListening");
      const removeListeners = /* @__PURE__ */ __name(() => {
        server.removeListener("error", onError);
        server.removeListener("listening", onListening);
      }, "removeListeners");
      server.on("error", onError);
      server.on("listening", onListening);
      server.listen(port);
    });
  };
}
__name(promisifyServerListen, "promisifyServerListen");
function configureLogger(givenLog, isProduction) {
  if (isProduction) {
    givenLog.setOptions({
      level: _apify_log__rspack_import_1.LogLevel.INFO,
      logger: new _apify_log__rspack_import_1.LoggerJson()
    });
  } else {
    givenLog.setOptions({ level: _apify_log__rspack_import_1.LogLevel.DEBUG });
  }
}
__name(configureLogger, "configureLogger");
async function timeoutPromise(promise, timeoutMillis, errorMessage = "Promise has timed-out") {
  return new Promise((resolve, reject) => {
    let timeout;
    let hasFulfilled = false;
    const callback = /* @__PURE__ */ __name((err, result) => {
      if (hasFulfilled) return;
      clearTimeout(timeout);
      hasFulfilled = true;
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    }, "callback");
    promise.then((result) => callback(null, result), callback);
    timeout = setTimeout(() => callback(new Error(errorMessage)), timeoutMillis);
  });
}
__name(timeoutPromise, "timeoutPromise");
function createInjectableRegExp(regex) {
  return new RegExp(regex.source.replace(/^\^|\$$/g, ""));
}
__name(createInjectableRegExp, "createInjectableRegExp");

// src/utilities.client.ts

function isNullOrUndefined(obj) {
  return obj == null;
}
__name(isNullOrUndefined, "isNullOrUndefined");
function isBuffer(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
__name(isBuffer, "isBuffer");
function dateToString(date, middleT) {
  if (!(date instanceof Date)) {
    return "";
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const millis = date.getMilliseconds();
  const pad = /* @__PURE__ */ __name((num) => num < 10 ? `0${num}` : num, "pad");
  const datePart = `${year}-${pad(month)}-${pad(day)}`;
  const millisPart = millis < 10 ? `00${millis}` : millis < 100 ? `0${millis}` : millis;
  const timePart = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${millisPart}`;
  return `${datePart}${middleT ? "T" : " "}${timePart}`;
}
__name(dateToString, "dateToString");
function truncate(str, maxLength, suffix = "...[truncated]") {
  maxLength = Math.floor(maxLength);
  if (suffix.length > maxLength) {
    throw new Error("suffix string cannot be longer than maxLength");
  }
  if (typeof str === "string" && str.length > maxLength) {
    str = str.substr(0, maxLength - suffix.length) + suffix;
  }
  return str;
}
__name(truncate, "truncate");
function getOrdinalSuffix(num) {
  const s = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
__name(getOrdinalSuffix, "getOrdinalSuffix");
function parseUrl(str) {
  if (typeof str !== "string") return {};
  const o = {
    strictMode: false,
    key: [
      "source",
      "protocol",
      "authority",
      "userInfo",
      "user",
      "password",
      "host",
      "port",
      "relative",
      "path",
      "directory",
      "file",
      "query",
      "fragment"
    ],
    q: {
      name: "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      // eslint-disable-line max-len,no-useless-escape
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      // eslint-disable-line max-len,no-useless-escape
    }
  };
  const m = o.parser[o.strictMode ? "strict" : "loose"].exec(str);
  const uri = {};
  let i = o.key.length;
  while (i--) uri[o.key[i]] = m[i] || "";
  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, ($0, $1, $2) => {
    if ($1) uri[o.q.name][$1] = $2;
  });
  uri.fragmentKey = {};
  if (uri.fragment) {
    uri.fragment.replace(o.q.parser, (($0, $1, $2) => {
      if ($1) uri.fragmentKey[$1] = $2;
    }));
  }
  return uri;
}
__name(parseUrl, "parseUrl");
function normalizeUrl(url, keepFragment) {
  if (typeof url !== "string" || !url.length) {
    return null;
  }
  let urlObj;
  try {
    urlObj = new URL(url.trim());
  } catch {
    return null;
  }
  const { searchParams } = urlObj;
  for (const key of [...searchParams.keys()]) {
    if (key.startsWith("utm_")) {
      searchParams.delete(key);
    }
  }
  searchParams.sort();
  const protocol = urlObj.protocol.toLowerCase();
  const host = urlObj.host.toLowerCase();
  const path = urlObj.pathname.replace(/\/$/, "");
  const search = searchParams.toString() ? `?${searchParams}` : "";
  const hash = keepFragment ? urlObj.hash : "";
  return `${protocol}//${host}${path}${search}${hash}`;
}
__name(normalizeUrl, "normalizeUrl");
function markedSetNofollowLinks(href, title, text, referrerHostname) {
  let urlParsed;
  try {
    urlParsed = new URL(href);
  } catch {
  }
  const isApifyLink = urlParsed && /(\.|^)apify\.com$/i.test(urlParsed.hostname);
  const isSameHostname = !referrerHostname || urlParsed && urlParsed.hostname === referrerHostname;
  if (isApifyLink && isSameHostname) {
    return `<a href="${href}">${title || text}</a>`;
  }
  if (isApifyLink) {
    return `<a rel="noopener noreferrer" target="_blank" href="${href}">${title || text}</a>`;
  }
  return `<a rel="noopener noreferrer nofollow" target="_blank" href="${href}">${title || text}</a>`;
}
__name(markedSetNofollowLinks, "markedSetNofollowLinks");
function markedDecreaseHeadsLevel(text, level) {
  level += 1;
  return `<h${level}>${text}</h${level}>`;
}
__name(markedDecreaseHeadsLevel, "markedDecreaseHeadsLevel");
function buildOrVersionNumberIntToStr(int) {
  if (typeof int !== "number" || !(int >= 0)) return null;
  const major = Math.floor(int / _apify_consts__rspack_import_0.VERSION_INT_MAJOR_BASE);
  const remainder = int % _apify_consts__rspack_import_0.VERSION_INT_MAJOR_BASE;
  const minor = Math.floor(remainder / _apify_consts__rspack_import_0.VERSION_INT_MINOR_BASE);
  const build = remainder % _apify_consts__rspack_import_0.VERSION_INT_MINOR_BASE;
  let str = `${major}.${minor}`;
  if (build > 0) str += `.${build}`;
  return str;
}
__name(buildOrVersionNumberIntToStr, "buildOrVersionNumberIntToStr");
var ESCAPE_DOT = "\uFF0E";
var ESCAPE_DOLLAR = "\uFF04";
var ESCAPE_TO_BSON = "\uFF54\uFF4F\uFF22\uFF33\uFF2F\uFF2E";
var ESCAPE_TO_STRING = "\uFF54\uFF4F\uFF33\uFF54\uFF52\uFF49\uFF4E\uFF47";
var ESCAPE_BSON_TYPE = "\uFF3F\uFF42\uFF53\uFF4F\uFF4E\uFF54\uFF59\uFF50\uFF45";
var ESCAPE_NULL = "";
var REGEXP_IS_ESCAPED = new RegExp(`(${ESCAPE_DOT}|^${ESCAPE_DOLLAR}|^${ESCAPE_TO_BSON}$|^${ESCAPE_BSON_TYPE}|^${ESCAPE_TO_STRING}$)`);
var REGEXP_DOT = new RegExp(ESCAPE_DOT, "g");
var REGEXP_DOLLAR = new RegExp(`^${ESCAPE_DOLLAR}`);
var REGEXP_TO_BSON = new RegExp(`^${ESCAPE_TO_BSON}$`);
var REGEXP_TO_STRING = new RegExp(`^${ESCAPE_TO_STRING}$`);
var REGEXP_BSON_TYPE = new RegExp(`^${ESCAPE_BSON_TYPE}$`);
function escapePropertyName(name) {
  if (/(\.|^\$|^toBSON$|^_bsontype$|^toString$|\0)/.test(name)) {
    name = name.replace(/\./g, ESCAPE_DOT);
    name = name.replace(/^\$/, ESCAPE_DOLLAR);
    name = name.replace(/^toBSON$/, ESCAPE_TO_BSON);
    name = name.replace(/^toString$/, ESCAPE_TO_STRING);
    name = name.replace(/^_bsontype$/, ESCAPE_BSON_TYPE);
    name = name.replace(/\0/g, ESCAPE_NULL);
  }
  return name;
}
__name(escapePropertyName, "escapePropertyName");
function unescapePropertyName(name) {
  if (REGEXP_IS_ESCAPED.test(name)) {
    name = name.replace(REGEXP_DOT, ".");
    name = name.replace(REGEXP_DOLLAR, "$");
    name = name.replace(REGEXP_TO_BSON, "toBSON");
    name = name.replace(REGEXP_TO_STRING, "toString");
    name = name.replace(REGEXP_BSON_TYPE, "_bsontype");
  }
  return name;
}
__name(unescapePropertyName, "unescapePropertyName");
function traverseObject(obj, clone, transformFunc) {
  if (obj === null || typeof obj !== "object" || Object.prototype.toString.call(obj) === "[object Date]" || isBuffer(obj)) return obj;
  let result;
  if (Array.isArray(obj)) {
    result = clone ? new Array(obj.length) : obj;
    for (let i = 0; i < obj.length; i++) {
      const val = traverseObject(obj[i], clone, transformFunc);
      if (clone) result[i] = val;
    }
    return result;
  }
  result = clone ? {} : obj;
  for (const key in obj) {
    const val = traverseObject(obj[key], clone, transformFunc);
    const [transformedKey, transformedVal] = transformFunc(key, val);
    if (key === transformedKey) {
      if (clone || val !== transformedVal) result[key] = transformedVal;
    } else {
      result[transformedKey] = transformedVal;
      if (!clone) delete obj[key];
    }
  }
  return result;
}
__name(traverseObject, "traverseObject");
function escapeForBson(obj, clone = false) {
  return traverseObject(obj, clone, (key, value) => [escapePropertyName(key), value]);
}
__name(escapeForBson, "escapeForBson");
function unescapeFromBson(obj, clone = false) {
  return traverseObject(obj, clone, (key, value) => [unescapePropertyName(key), value]);
}
__name(unescapeFromBson, "unescapeFromBson");
function isBadForMongo(obj) {
  let isBad = false;
  try {
    traverseObject(obj, false, (key, value) => {
      const escapedKey = escapePropertyName(key);
      if (key !== escapedKey) {
        isBad = true;
        throw new Error();
      }
      return [key, value];
    });
  } catch (e) {
    if (!isBad) throw e;
  }
  return isBad;
}
__name(isBadForMongo, "isBadForMongo");
var _JsonVariable = class _JsonVariable {
  constructor(name) {
    this.name = name;
  }
  getToken() {
    return `{{${this.name}}}`;
  }
};
__name(_JsonVariable, "JsonVariable");
var JsonVariable = _JsonVariable;
function jsonStringifyExtended(value, replacer, space = 0) {
  if (replacer && !(replacer instanceof Function)) throw new Error('Parameter "replacer" of jsonStringifyExtended() must be a function!');
  const replacements = {};
  const extendedReplacer = /* @__PURE__ */ __name((key, val) => {
    val = replacer ? replacer(key, val) : val;
    if (val instanceof Function) return val.toString();
    if (val instanceof JsonVariable) {
      const randomToken = `<<<REPLACEMENT_TOKEN::${Math.random()}>>>`;
      replacements[randomToken] = val.getToken();
      return randomToken;
    }
    return val;
  }, "extendedReplacer");
  let stringifiedValue = JSON.stringify(value, extendedReplacer, space);
  Object.entries(replacements).forEach(([replacementToken, replacementValue]) => {
    stringifiedValue = stringifiedValue.replace(`"${replacementToken}"`, replacementValue);
  });
  return stringifiedValue;
}
__name(jsonStringifyExtended, "jsonStringifyExtended");
function splitFullName(fullName) {
  if (typeof fullName !== "string") return [null, null];
  const names = (fullName || "").trim().split(" ");
  const nonEmptyNames = names.filter((val) => val);
  if (nonEmptyNames.length === 0) {
    return [null, null];
  }
  if (nonEmptyNames.length === 1) {
    return [null, nonEmptyNames[0]];
  }
  return [names[0], nonEmptyNames.slice(1).join(" ")];
}
__name(splitFullName, "splitFullName");
function isUrlRelative(url) {
  return _apify_consts__rspack_import_0.RELATIVE_URL_REGEX.test(url);
}
__name(isUrlRelative, "isUrlRelative");

// src/exponential_backoff.ts

var _RetryableError = class _RetryableError extends Error {
  constructor(error, ...args) {
    super(...args);
    __publicField(this, "error");
    this.error = error;
  }
};
__name(_RetryableError, "RetryableError");
var RetryableError = _RetryableError;
async function retryWithExpBackoff(params = {}) {
  const { func, expBackoffMillis, expBackoffMaxRepeats } = params;
  if (typeof func !== "function") {
    throw new Error('Parameter "func" should be a function.');
  }
  if (typeof expBackoffMillis !== "number") {
    throw new Error('Parameter "expBackoffMillis" should be a number.');
  }
  if (typeof expBackoffMaxRepeats !== "number") {
    throw new Error('Parameter "expBackoffMaxRepeats" should be a number.');
  }
  for (let i = 0; ; i++) {
    let error;
    try {
      return await func();
    } catch (e) {
      error = e;
    }
    if (!(error instanceof RetryableError)) {
      throw error;
    }
    if (i >= expBackoffMaxRepeats - 1) {
      throw error.error;
    }
    const waitMillis = expBackoffMillis * 2 ** i;
    const rand = /* @__PURE__ */ __name((from, to) => from + Math.floor(Math.random() * (to - from + 1)), "rand");
    const randomizedWaitMillis = rand(waitMillis, waitMillis * 2);
    if (i === Math.round(expBackoffMaxRepeats / 2)) {
      _apify_log__rspack_import_1["default"].warning(`Retry failed ${i} times and will be repeated in ${randomizedWaitMillis}ms`, {
        originalError: error.error.message,
        errorDetails: Reflect.get(error.error, "details")
      });
    }
    await delayPromise(randomizedWaitMillis);
  }
}
__name(retryWithExpBackoff, "retryWithExpBackoff");

// src/health_checker.ts
var CHECK_TYPES = /* @__PURE__ */ ((CHECK_TYPES2) => {
  CHECK_TYPES2["MONGODB_PING"] = "MONGODB_PING";
  CHECK_TYPES2["MONGODB_READ"] = "MONGODB_READ";
  CHECK_TYPES2["MONGODB_WRITE"] = "MONGODB_WRITE";
  CHECK_TYPES2["REDIS"] = "REDIS";
  CHECK_TYPES2["REDIS_PING"] = "REDIS_PING";
  CHECK_TYPES2["REDIS_WRITE"] = "REDIS_WRITE";
  return CHECK_TYPES2;
})(CHECK_TYPES || {});
var _HealthChecker = class _HealthChecker {
  constructor(options) {
    this.options = options;
    __publicField(this, "checks");
    __publicField(this, "redisPrefix");
    __publicField(this, "redisTtlSecs");
    __publicField(this, "checkTimeoutMillis");
    __publicField(this, "mongoDbWriteTestCollection");
    __publicField(this, "mongoDbWriteTestRemoveOlderThanSecs");
    const {
      checks,
      redisPrefix = "health-check",
      redisTtlSecs = 15,
      checkTimeoutMillis = 15e3,
      mongoDbWriteTestCollection = "healthCheckPlayground",
      mongoDbWriteTestRemoveOlderThanSecs = 15
    } = options;
    if (!Array.isArray(checks)) throw new Error('Parameter "check" must be an array');
    checks.map((check) => this._validateCheck(check));
    this.checks = checks;
    this.redisPrefix = redisPrefix;
    this.redisTtlSecs = redisTtlSecs;
    this.checkTimeoutMillis = checkTimeoutMillis;
    this.mongoDbWriteTestCollection = mongoDbWriteTestCollection;
    this.mongoDbWriteTestRemoveOlderThanSecs = mongoDbWriteTestRemoveOlderThanSecs;
  }
  async ensureIsHealthy() {
    for (const check of this.checks) {
      try {
        const checkPromise = this._performCheck(check);
        await timeoutPromise(checkPromise, this.checkTimeoutMillis, "Check has timed-out");
      } catch (_err) {
        const err = _err;
        throw new Error(`Health check test "${check.type}" failed with an error: ${err.message}"`);
      }
    }
  }
  _validateCheck(check) {
    if (!(check.type in CHECK_TYPES)) throw new Error(`Check type "${check.type}" is invalid`);
    if (typeof check.client !== "object") throw new Error(`Check client must be an object got "${typeof check.client}" instead`);
  }
  async _performCheck(check) {
    switch (check.type) {
      case "MONGODB_PING" /* MONGODB_PING */:
        return this._testMongoDbPing(check);
      case "MONGODB_READ" /* MONGODB_READ */:
        return this._testMongoDbRead(check);
      case "MONGODB_WRITE" /* MONGODB_WRITE */:
        return this._testMongoDbWrite(check);
      case "REDIS_PING" /* REDIS_PING */:
        return this._testRedisPing(check);
      case "REDIS" /* REDIS */:
      case "REDIS_WRITE" /* REDIS_WRITE */:
        return this._testRedisWrite(check);
      default:
        throw new Error("Unknown check type");
    }
  }
  async _testMongoDbPing({ client }) {
    const response = await client.command({ ping: 1 });
    if (response.ok !== 1) throw new Error(`Got ${response.ok} instead of 1!`);
  }
  async _testMongoDbRead({ client }) {
    const response = await client.listCollections().toArray();
    if (!Array.isArray(response)) throw new Error(`Got ${typeof response} instead of an array!`);
  }
  async _testMongoDbWrite({ client }) {
    const id = cryptoRandomObjectId();
    const collection = client.collection(this.mongoDbWriteTestCollection);
    await collection.deleteMany({
      createdAt: {
        $lt: new Date(Date.now() - this.mongoDbWriteTestRemoveOlderThanSecs * 1e3)
      }
    });
    await collection.insertOne({
      _id: id,
      createdAt: /* @__PURE__ */ new Date()
    });
    const retrieved = await collection.findOne({ _id: id });
    if (!retrieved) throw new Error(`Item with ID "${id}" not found!`);
  }
  async _testRedisPing({ client }) {
    const response = await client.ping();
    if (response !== "PONG") throw new Error(`Got "${response}" instead of "PONG"!`);
  }
  async _testRedisWrite({ client }) {
    const key = `${this.redisPrefix}:${cryptoRandomObjectId()}`;
    const expected = "OK";
    await client.set(key, expected, "EX", this.redisTtlSecs);
    const given = await client.get(key);
    if (given !== expected) throw new Error(`Returned value "${given}" is not equal to "${expected}"!`);
  }
};
__name(_HealthChecker, "HealthChecker");
__publicField(_HealthChecker, "CHECK_TYPES", CHECK_TYPES);
var HealthChecker = _HealthChecker;

// src/parse_jsonl_stream.ts

var _ParseJsonlStream = class _ParseJsonlStream extends stream__rspack_import_2.Transform {
  constructor() {
    super(...arguments);
    __publicField(this, "pendingChunk", null);
  }
  parseLineAndEmitObject(line) {
    line = line.trim();
    if (!line) {
      return;
    }
    try {
      const obj = JSON.parse(line);
      this.emit("object", obj);
    } catch (e) {
      throw new Error(`Cannot parse JSON stream data ('${String(line)}'): ${String(e)}`);
    }
  }
  _transform(chunk, encoding, callback) {
    let allData;
    if (this.pendingChunk) {
      allData = this.pendingChunk + chunk;
      this.pendingChunk = null;
    } else {
      allData = chunk;
    }
    const lines = allData.toString().split("\n");
    if (lines[lines.length - 1] !== "") {
      this.pendingChunk = lines.pop();
    }
    try {
      for (let i = 0; i < lines.length; i++) {
        this.parseLineAndEmitObject(lines[i]);
      }
    } catch (err) {
      callback(err, null);
      return;
    }
    callback(null, chunk);
  }
  // This function is called right after stream.end() is called by the writer.
  // It just tries to process the pending chunk and returns an error if that fails.
  _flush(callback) {
    if (this.pendingChunk) {
      try {
        this.parseLineAndEmitObject(this.pendingChunk);
        this.pendingChunk = null;
      } catch (err) {
        callback(err, null);
        return;
      }
    }
    callback();
  }
};
__name(_ParseJsonlStream, "ParseJsonlStream");
var ParseJsonlStream = _ParseJsonlStream;

// src/streams_utilities.ts
async function concatStreamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    }).on("error", (e) => reject(e)).on("end", () => {
      const buffer = Buffer.concat(chunks);
      return resolve(buffer);
    });
  });
}
__name(concatStreamToBuffer, "concatStreamToBuffer");
async function readStreamToString(stream, encoding) {
  const buffer = await concatStreamToBuffer(stream);
  return buffer.toString(encoding);
}
__name(readStreamToString, "readStreamToString");

// src/webhook_payload_template.ts
var _WebhookPayloadTemplateError = class _WebhookPayloadTemplateError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
__name(_WebhookPayloadTemplateError, "WebhookPayloadTemplateError");
var WebhookPayloadTemplateError = _WebhookPayloadTemplateError;
var _InvalidJsonError = class _InvalidJsonError extends WebhookPayloadTemplateError {
  constructor(originalError) {
    super(originalError.message);
  }
};
__name(_InvalidJsonError, "InvalidJsonError");
var InvalidJsonError = _InvalidJsonError;
var _InvalidVariableError = class _InvalidVariableError extends Error {
  constructor(variable) {
    super(`Invalid payload template variable: ${variable}`);
  }
};
__name(_InvalidVariableError, "InvalidVariableError");
var InvalidVariableError = _InvalidVariableError;
var _WebhookPayloadTemplate = class _WebhookPayloadTemplate {
  constructor(template, allowedVariables = null, context = {}) {
    this.template = template;
    this.allowedVariables = allowedVariables;
    this.context = context;
    __publicField(this, "payload");
    __publicField(this, "replacedVariables", []);
    this.payload = template;
  }
  /**
   * Parse existing webhook payload template string into an object, replacing
   * template variables using the provided context.
   *
   * Parse also validates the template structure, so it can be used
   * to check validity of the template JSON and usage of allowedVariables.
   */
  static parse(payloadTemplate, allowedVariables = null, context = {}, options = {}) {
    const type = typeof payloadTemplate;
    if (type !== "string") throw new Error(`Cannot parse a ${type} payload template.`);
    const template = new _WebhookPayloadTemplate(payloadTemplate, allowedVariables, context);
    const data = template._parse();
    if (options.interpolateStrings) {
      return template._interpolate(data);
    }
    return data;
  }
  /**
   * Stringify an object into a webhook payload template.
   * Values created using `getTemplateVariable('foo.bar')`
   * will be stringified to `{{foo.bar}}` template variable.
   */
  static stringify(objectTemplate, replacer, indent = 2) {
    const type = typeof objectTemplate;
    if (!objectTemplate || type !== "object") throw new Error(`Cannot stringify a ${type} payload template.`);
    return jsonStringifyExtended(objectTemplate, replacer, indent);
  }
  /**
   * Produces an instance of a template variable that can be used
   * in objects and will be stringified into `{{variableName}}` syntax.
   *
   * **Example:**
   * ```js
   * const resourceVariable = WebhookPayloadTemplate.getVariable('resource');
   * const objectTemplate = {
   *     foo: 'foo',
   *     bar: ['bar'],
   *     res: resourceVariable,
   * }
   *
   * const payloadTemplate = WebhookPayloadTemplate.stringify(objectTemplate);
   * ```
   *
   * **Produces:**
   * ```json
   * {
   *     "foo": "foo",
   *     "bar": ["bar"],
   *     "res": {{resource}},
   * }
   * ```
   */
  static getVariable(variableName) {
    return new JsonVariable(variableName);
  }
  _parse() {
    let currentIndex = 0;
    while (true) {
      try {
        return JSON.parse(this.payload);
      } catch (err) {
        const position = this._findPositionOfNextVariable(currentIndex);
        if (!position) {
          throw new InvalidJsonError(err);
        }
        if (!position.isInsideString) {
          this._replaceVariable(position);
        }
        currentIndex = position.openBraceIndex + 1;
      }
    }
  }
  _interpolate(value) {
    if (typeof value === "string") {
      return this._interpolateString(value);
    }
    if (Array.isArray(value)) {
      return this._interpolateArray(value);
    }
    if (typeof value === "object" && value !== null) {
      return this._interpolateObject(value);
    }
    return value;
  }
  _interpolateString(value) {
    if (value.match(/^\{\{([a-zA-Z0-9.]+)\}\}$/)) {
      const variableName = value.substring(2, value.length - 2);
      this._validateVariableName(variableName);
      return this._getVariableValue(variableName);
    }
    return value.replace(/\{\{([a-zA-Z0-9.]+)\}\}/g, (match, variableName) => {
      this._validateVariableName(variableName);
      const variableValue = this._getVariableValue(variableName);
      return `${variableValue}`;
    });
  }
  _interpolateObject(value) {
    const result = {};
    Object.entries(value).forEach(([key, v]) => {
      result[key] = this._interpolate(v);
    });
    return result;
  }
  _interpolateArray(value) {
    return value.map(this._interpolate.bind(this));
  }
  _findPositionOfNextVariable(startIndex = 0) {
    const openBraceIndex = this.payload.indexOf("{{", startIndex);
    const closeBraceIndex = this.payload.indexOf("}}", openBraceIndex) + 1;
    const someVariableMaybeExists = openBraceIndex > -1 && closeBraceIndex > -1;
    if (!someVariableMaybeExists) return null;
    const isInsideString = this._isVariableInsideString(openBraceIndex);
    return { isInsideString, openBraceIndex, closeBraceIndex };
  }
  _isVariableInsideString(openBraceIndex) {
    const unescapedQuoteCount = this._countUnescapedDoubleQuotesUpToIndex(openBraceIndex);
    return unescapedQuoteCount % 2 === 1;
  }
  _countUnescapedDoubleQuotesUpToIndex(index) {
    const payloadSection = this.payload.substring(0, index);
    let unescapedQuoteCount = 0;
    for (let i = 0; i < payloadSection.length; i++) {
      const char = payloadSection[i];
      const prevChar = payloadSection[i - 1];
      if (char === '"' && prevChar !== "\\") {
        unescapedQuoteCount++;
      }
    }
    return unescapedQuoteCount;
  }
  _replaceVariable({ openBraceIndex, closeBraceIndex }) {
    const variableName = this.payload.substring(openBraceIndex + 2, closeBraceIndex - 1);
    this._validateVariableName(variableName);
    const replacement = this._getVariableReplacement(variableName);
    this.replacedVariables.push({ variableName, replacement });
    this.payload = this.payload.substring(0, openBraceIndex) + replacement + this.payload.substring(closeBraceIndex + 1);
  }
  _validateVariableName(variableName) {
    if (this.allowedVariables === null) return;
    const [variable] = variableName.split(".");
    const isVariableValid = this.allowedVariables.has(variable);
    if (!isVariableValid) throw new InvalidVariableError(variableName);
  }
  _getVariableValue(variableName) {
    const [variable, ...properties] = variableName.split(".");
    const context = this.context[variable];
    const value = properties.reduce((ctx, prop) => {
      if (!ctx || typeof ctx !== "object") return null;
      return ctx[prop];
    }, context);
    return value;
  }
  _getVariableReplacement(variableName) {
    const value = this._getVariableValue(variableName);
    return value ? JSON.stringify(value) : null;
  }
};
__name(_WebhookPayloadTemplate, "WebhookPayloadTemplate");
var WebhookPayloadTemplate = _WebhookPayloadTemplate;

// src/crypto.ts

var ENCRYPTION_ALGORITHM = "aes-256-gcm";
var ENCRYPTION_KEY_LENGTH = 32;
var ENCRYPTION_IV_LENGTH = 16;
var ENCRYPTION_AUTH_TAG_LENGTH = 16;
function publicEncrypt({ publicKey, value }) {
  const key = cryptoRandomObjectId(ENCRYPTION_KEY_LENGTH);
  const initVector = cryptoRandomObjectId(ENCRYPTION_IV_LENGTH);
  const cipher = crypto__rspack_import_3.createCipheriv(ENCRYPTION_ALGORITHM, key, initVector);
  const bufferFromValue = Buffer.from(value, "utf-8");
  const bufferFromKey = Buffer.from(key, "utf-8");
  const bufferFromInitVector = Buffer.from(initVector, "utf-8");
  const passwordBuffer = Buffer.concat([bufferFromKey, bufferFromInitVector]);
  const encryptedValue = Buffer.concat([cipher.update(bufferFromValue), cipher.final(), cipher.getAuthTag()]);
  const encryptedPassword = crypto__rspack_import_3.publicEncrypt(publicKey, passwordBuffer);
  return {
    encryptedPassword: encryptedPassword.toString("base64"),
    encryptedValue: encryptedValue.toString("base64")
  };
}
__name(publicEncrypt, "publicEncrypt");
function privateDecrypt({
  privateKey,
  encryptedPassword,
  encryptedValue
}) {
  const encryptedValueBuffer = Buffer.from(encryptedValue, "base64");
  const encryptedPasswordBuffer = Buffer.from(encryptedPassword, "base64");
  const passwordBuffer = crypto__rspack_import_3.privateDecrypt(privateKey, encryptedPasswordBuffer);
  if (passwordBuffer.length !== ENCRYPTION_KEY_LENGTH + ENCRYPTION_IV_LENGTH) {
    throw new Error("privateDecrypt: Decryption failed, invalid password length!");
  }
  const authTagBuffer = encryptedValueBuffer.slice(encryptedValueBuffer.length - ENCRYPTION_AUTH_TAG_LENGTH);
  const encryptedDataBuffer = encryptedValueBuffer.slice(0, encryptedValueBuffer.length - ENCRYPTION_AUTH_TAG_LENGTH);
  const encryptionKeyBuffer = passwordBuffer.slice(0, ENCRYPTION_KEY_LENGTH);
  const initVectorBuffer = passwordBuffer.slice(ENCRYPTION_KEY_LENGTH);
  const decipher = crypto__rspack_import_3.createDecipheriv(ENCRYPTION_ALGORITHM, encryptionKeyBuffer, initVectorBuffer);
  decipher.setAuthTag(authTagBuffer);
  return Buffer.concat([decipher.update(encryptedDataBuffer), decipher.final()]).toString("utf-8");
}
__name(privateDecrypt, "privateDecrypt");

// src/url_params_utils.ts
function separateImports(code) {
  const lines = code.split("\n");
  return {
    code: lines.filter((line) => !line.trim().startsWith("import")).join("\n"),
    imports: lines.filter((line) => line.trim().startsWith("import")).join("\n")
  };
}
__name(separateImports, "separateImports");

// src/code_hash_manager.ts

var CodeHashMetaKey = /* @__PURE__ */ ((CodeHashMetaKey2) => {
  CodeHashMetaKey2["VERSION"] = "v";
  CodeHashMetaKey2["USER"] = "u";
  return CodeHashMetaKey2;
})(CodeHashMetaKey || {});
var _CodeHashManager = class _CodeHashManager {
  constructor(secret) {
    this.secret = secret;
  }
  /**
   * Encodes object (e.g. input for actor) to a string hash and uses the `secret` to sign the hash.
   */
  encode(data, userId) {
    const meta = {
      ["u" /* USER */]: userId,
      ["v" /* VERSION */]: _CodeHashManager.VERSION
    };
    const metaBase64 = this.toBase64(JSON.stringify(meta));
    const inputBase64 = this.toBase64(JSON.stringify(data));
    const dataToSign = [metaBase64, inputBase64].join(_CodeHashManager.SECTION_SEPARATOR);
    const signature = this.generateSignature(dataToSign);
    const signatureBase64 = this.toBase64(signature);
    const parts = [metaBase64, inputBase64, signatureBase64];
    return parts.join(_CodeHashManager.SECTION_SEPARATOR);
  }
  decode(urlHash) {
    const parts = urlHash.split(_CodeHashManager.SECTION_SEPARATOR);
    const dataToSign = parts.slice(0, 2).join(_CodeHashManager.SECTION_SEPARATOR);
    const meta = JSON.parse(this.fromBase64(parts[0]).toString());
    const data = JSON.parse(this.fromBase64(parts[1]).toString());
    const signature = this.fromBase64(parts[2]);
    const expectedSignature = this.generateSignature(dataToSign);
    const isSignatureValid = (0,crypto__rspack_import_3.timingSafeEqual)(signature, expectedSignature);
    return {
      data,
      meta: {
        userId: meta["u" /* USER */],
        version: meta["v" /* VERSION */],
        isSignatureValid
      }
    };
  }
  toBase64(data) {
    return Buffer.from(data).toString("base64url");
  }
  fromBase64(encoded) {
    return Buffer.from(encoded, "base64url");
  }
  generateSignature(data) {
    return (0,crypto__rspack_import_3.createHmac)("sha256", this.secret).update(data).digest();
  }
};
__name(_CodeHashManager, "CodeHashManager");
__publicField(_CodeHashManager, "SECTION_SEPARATOR", ".");
__publicField(_CodeHashManager, "VERSION", 1);
var CodeHashManager = _CodeHashManager;

// src/hmac.ts

var CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function encodeBase62(num) {
  if (num === 0n) {
    return CHARSET[0];
  }
  let res = "";
  while (num > 0n) {
    res = CHARSET[Number(num % 62n)] + res;
    num /= 62n;
  }
  return res;
}
__name(encodeBase62, "encodeBase62");
function createHmacSignature(secretKey, message) {
  const signature = crypto__rspack_import_3.createHmac("sha256", secretKey).update(message).digest("hex").substring(0, 30);
  return encodeBase62(BigInt(`0x${signature}`));
}
__name(createHmacSignature, "createHmacSignature");
var subtleCrypto = globalThis.crypto?.subtle;
async function ensureSubtleCryptoExists() {
  if (!subtleCrypto) {
    try {
      subtleCrypto = __require("crypto")?.webcrypto?.subtle;
      if (subtleCrypto) return;
    } catch {
    }
    try {
      subtleCrypto = (await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 4849, 19)))?.webcrypto?.subtle;
    } catch {
    }
    if (!subtleCrypto) {
      throw new Error(`SubtleCrypto is not available in this environment.
Please ensure you're running in an environment that supports Web Crypto API,
or submit an issue to https://github.com/apify/apify-shared-js so we can help you further.`);
    }
  }
}
__name(ensureSubtleCryptoExists, "ensureSubtleCryptoExists");
async function createHmacSignatureAsync(secretKey, message) {
  await ensureSubtleCryptoExists();
  const encoder = new TextEncoder();
  const key = await subtleCrypto.importKey(
    "raw",
    encoder.encode(secretKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await subtleCrypto.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );
  const signatureArray = new Uint8Array(signatureBuffer);
  const signatureHex = Array.from(signatureArray).map((b) => b.toString(16).padStart(2, "0")).join("").substring(0, 30);
  return encodeBase62(BigInt(`0x${signatureHex}`));
}
__name(createHmacSignatureAsync, "createHmacSignatureAsync");

// src/storages.ts
function createStorageContentSignature({
  resourceId,
  urlSigningSecretKey,
  expiresInMillis,
  version = 0
}) {
  const expiresAt = expiresInMillis ? (/* @__PURE__ */ new Date()).getTime() + expiresInMillis : 0;
  const hmac = createHmacSignature(urlSigningSecretKey, `${version}.${expiresAt}.${resourceId}`);
  return Buffer.from(`${version}.${expiresAt}.${hmac}`).toString("base64url");
}
__name(createStorageContentSignature, "createStorageContentSignature");
function typedArrayToBase64Url(typedArray) {
  let binary = "";
  for (let i = 0; i < typedArray.length; i++) {
    binary += String.fromCharCode(typedArray[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(typedArrayToBase64Url, "typedArrayToBase64Url");
async function createStorageContentSignatureAsync({
  resourceId,
  urlSigningSecretKey,
  expiresInMillis,
  version = 0
}) {
  const expiresAt = expiresInMillis ? (/* @__PURE__ */ new Date()).getTime() + expiresInMillis : 0;
  const hmac = await createHmacSignatureAsync(urlSigningSecretKey, `${version}.${expiresAt}.${resourceId}`);
  return typedArrayToBase64Url(new TextEncoder().encode(`${version}.${expiresAt}.${hmac}`));
}
__name(createStorageContentSignatureAsync, "createStorageContentSignatureAsync");

// src/parse_boolean.ts
var parseBooleanOrNull = /* @__PURE__ */ __name((value) => {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  if (typeof value === "string") {
    const lowerValue = value.trim().toLowerCase();
    if (lowerValue === "true" || lowerValue === "1") return true;
    if (lowerValue === "false" || lowerValue === "0") return false;
  }
  return null;
}, "parseBooleanOrNull");

/*!
 * This module contains various server utility and helper functions.
 * Note that it automatically exports functions from utilities.client.js
 *
 * Author: Jan Curn (jan@apify.com)
 * Copyright(c) 2015 Apify. All rights reserved.
 *
 */
/*!
 * This module contains various client-side utility and helper functions.
 *
 * Author: Jan Curn (jan@apify.com)
 * Copyright(c) 2016 Apify. All rights reserved.
 *
 */
//# sourceMappingURL=index.mjs.map

},
467(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  _: () => (_define_property)
});
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else obj[key] = value;

    return obj;
}



},
3110(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Axios: () => (Axios),
  AxiosError: () => (AxiosError),
  AxiosHeaders: () => (AxiosHeaders),
  Cancel: () => (Cancel),
  CancelToken: () => (CancelToken),
  CanceledError: () => (CanceledError),
  HttpStatusCode: () => (HttpStatusCode),
  VERSION: () => (VERSION),
  all: () => (all),
  "default": () => (/* reexport safe */ _lib_axios_js__rspack_import_0["default"]),
  formToJSON: () => (formToJSON),
  getAdapter: () => (getAdapter),
  isAxiosError: () => (isAxiosError),
  isCancel: () => (isCancel),
  mergeConfig: () => (mergeConfig),
  spread: () => (spread),
  toFormData: () => (toFormData)
});
/* import */ var _lib_axios_js__rspack_import_0 = __webpack_require__(7536);


// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const {
  Axios,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken,
  VERSION,
  all,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig,
} = _lib_axios_js__rspack_import_0["default"];




},
6263(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_3 = __webpack_require__(7275);
/* import */ var _http_js__rspack_import_0 = __webpack_require__(3119);
/* import */ var _xhr_js__rspack_import_1 = __webpack_require__(7013);
/* import */ var _fetch_js__rspack_import_2 = __webpack_require__(7960);
/* import */ var _core_AxiosError_js__rspack_import_4 = __webpack_require__(4062);






/**
 * Known adapters mapping.
 * Provides environment-specific adapters for Axios:
 * - `http` for Node.js
 * - `xhr` for browsers
 * - `fetch` for fetch API-based requests
 *
 * @type {Object<string, Function|Object>}
 */
const knownAdapters = {
  http: _http_js__rspack_import_0["default"],
  xhr: _xhr_js__rspack_import_1["default"],
  fetch: {
    get: _fetch_js__rspack_import_2.getFetch,
  },
};

// Assign adapter names for easier debugging and identification
_utils_js__rspack_import_3["default"].forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', { value });
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', { value });
  }
});

/**
 * Render a rejection reason string for unknown or unsupported adapters
 *
 * @param {string} reason
 * @returns {string}
 */
const renderReason = (reason) => `- ${reason}`;

/**
 * Check if the adapter is resolved (function, null, or false)
 *
 * @param {Function|null|false} adapter
 * @returns {boolean}
 */
const isResolvedHandle = (adapter) =>
  _utils_js__rspack_import_3["default"].isFunction(adapter) || adapter === null || adapter === false;

/**
 * Get the first suitable adapter from the provided list.
 * Tries each adapter in order until a supported one is found.
 * Throws an AxiosError if no adapter is suitable.
 *
 * @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
 * @param {Object} config - Axios request configuration
 * @throws {AxiosError} If no suitable adapter is available
 * @returns {Function} The resolved adapter function
 */
function getAdapter(adapters, config) {
  adapters = _utils_js__rspack_import_3["default"].isArray(adapters) ? adapters : [adapters];

  const { length } = adapters;
  let nameOrAdapter;
  let adapter;

  const rejectedReasons = {};

  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters[i];
    let id;

    adapter = nameOrAdapter;

    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

      if (adapter === undefined) {
        throw new _core_AxiosError_js__rspack_import_4["default"](`Unknown adapter '${id}'`);
      }
    }

    if (adapter && (_utils_js__rspack_import_3["default"].isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }

    rejectedReasons[id || '#' + i] = adapter;
  }

  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) =>
        `adapter ${id} ` +
        (state === false ? 'is not supported by the environment' : 'is not available in the build')
    );

    let s = length
      ? reasons.length > 1
        ? 'since :\n' + reasons.map(renderReason).join('\n')
        : ' ' + renderReason(reasons[0])
      : 'as no adapter specified';

    throw new _core_AxiosError_js__rspack_import_4["default"](
      `There is no suitable adapter to dispatch the request ` + s,
      'ERR_NOT_SUPPORT'
    );
  }

  return adapter;
}

/**
 * Exports Axios adapters and utility to resolve an adapter
 */
/* export default */ const __rspack_default_export = ({
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter,

  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters,
});


},
7960(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  getFetch: () => (getFetch)
});
/* import */ var _platform_index_js__rspack_import_1 = __webpack_require__(3820);
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);
/* import */ var _core_AxiosError_js__rspack_import_2 = __webpack_require__(4062);
/* import */ var _helpers_composeSignals_js__rspack_import_4 = __webpack_require__(2723);
/* import */ var _helpers_trackStream_js__rspack_import_6 = __webpack_require__(1791);
/* import */ var _core_AxiosHeaders_js__rspack_import_8 = __webpack_require__(7110);
/* import */ var _helpers_progressEventReducer_js__rspack_import_5 = __webpack_require__(7837);
/* import */ var _helpers_resolveConfig_js__rspack_import_3 = __webpack_require__(8382);
/* import */ var _core_settle_js__rspack_import_7 = __webpack_require__(3853);










const DEFAULT_CHUNK_SIZE = 64 * 1024;

const { isFunction } = _utils_js__rspack_import_0["default"];

const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response,
}))(_utils_js__rspack_import_0["default"].global);

const { ReadableStream, TextEncoder } = _utils_js__rspack_import_0["default"].global;

const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};

const factory = (env) => {
  env = _utils_js__rspack_import_0["default"].merge.call(
    {
      skipUndefined: true,
    },
    globalFetchAPI,
    env
  );

  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === 'function';
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);

  if (!isFetchSupported) {
    return false;
  }

  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);

  const encodeText =
    isFetchSupported &&
    (typeof TextEncoder === 'function'
      ? (
          (encoder) => (str) =>
            encoder.encode(str)
        )(new TextEncoder())
      : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));

  const supportsRequestStream =
    isRequestSupported &&
    isReadableStreamSupported &&
    test(() => {
      let duplexAccessed = false;

      const hasContentType = new Request(_platform_index_js__rspack_import_1["default"].origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          duplexAccessed = true;
          return 'half';
        },
      }).headers.has('Content-Type');

      return duplexAccessed && !hasContentType;
    });

  const supportsResponseStream =
    isResponseSupported &&
    isReadableStreamSupported &&
    test(() => _utils_js__rspack_import_0["default"].isReadableStream(new Response('').body));

  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body),
  };

  isFetchSupported &&
    (() => {
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((type) => {
        !resolvers[type] &&
          (resolvers[type] = (res, config) => {
            let method = res && res[type];

            if (method) {
              return method.call(res);
            }

            throw new _core_AxiosError_js__rspack_import_2["default"](
              `Response type '${type}' is not supported`,
              _core_AxiosError_js__rspack_import_2["default"].ERR_NOT_SUPPORT,
              config
            );
          });
      });
    })();

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if (_utils_js__rspack_import_0["default"].isBlob(body)) {
      return body.size;
    }

    if (_utils_js__rspack_import_0["default"].isSpecCompliantForm(body)) {
      const _request = new Request(_platform_index_js__rspack_import_1["default"].origin, {
        method: 'POST',
        body,
      });
      return (await _request.arrayBuffer()).byteLength;
    }

    if (_utils_js__rspack_import_0["default"].isArrayBufferView(body) || _utils_js__rspack_import_0["default"].isArrayBuffer(body)) {
      return body.byteLength;
    }

    if (_utils_js__rspack_import_0["default"].isURLSearchParams(body)) {
      body = body + '';
    }

    if (_utils_js__rspack_import_0["default"].isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };

  const resolveBodyLength = async (headers, body) => {
    const length = _utils_js__rspack_import_0["default"].toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  };

  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions,
    } = (0,_helpers_resolveConfig_js__rspack_import_3["default"])(config);

    let _fetch = envFetch || fetch;

    responseType = responseType ? (responseType + '').toLowerCase() : 'text';

    let composedSignal = (0,_helpers_composeSignals_js__rspack_import_4["default"])(
      [signal, cancelToken && cancelToken.toAbortSignal()],
      timeout
    );

    let request = null;

    const unsubscribe =
      composedSignal &&
      composedSignal.unsubscribe &&
      (() => {
        composedSignal.unsubscribe();
      });

    let requestContentLength;

    try {
      if (
        onUploadProgress &&
        supportsRequestStream &&
        method !== 'get' &&
        method !== 'head' &&
        (requestContentLength = await resolveBodyLength(headers, data)) !== 0
      ) {
        let _request = new Request(url, {
          method: 'POST',
          body: data,
          duplex: 'half',
        });

        let contentTypeHeader;

        if (_utils_js__rspack_import_0["default"].isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
          headers.setContentType(contentTypeHeader);
        }

        if (_request.body) {
          const [onProgress, flush] = (0,_helpers_progressEventReducer_js__rspack_import_5.progressEventDecorator)(
            requestContentLength,
            (0,_helpers_progressEventReducer_js__rspack_import_5.progressEventReducer)((0,_helpers_progressEventReducer_js__rspack_import_5.asyncDecorator)(onUploadProgress))
          );

          data = (0,_helpers_trackStream_js__rspack_import_6.trackStream)(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }

      if (!_utils_js__rspack_import_0["default"].isString(withCredentials)) {
        withCredentials = withCredentials ? 'include' : 'omit';
      }

      // Cloudflare Workers throws when credentials are defined
      // see https://github.com/cloudflare/workerd/issues/902
      const isCredentialsSupported = isRequestSupported && 'credentials' in Request.prototype;

      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: 'half',
        credentials: isCredentialsSupported ? withCredentials : undefined,
      };

      request = isRequestSupported && new Request(url, resolvedOptions);

      let response = await (isRequestSupported
        ? _fetch(request, fetchOptions)
        : _fetch(url, resolvedOptions));

      const isStreamResponse =
        supportsResponseStream && (responseType === 'stream' || responseType === 'response');

      if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
        const options = {};

        ['status', 'statusText', 'headers'].forEach((prop) => {
          options[prop] = response[prop];
        });

        const responseContentLength = _utils_js__rspack_import_0["default"].toFiniteNumber(response.headers.get('content-length'));

        const [onProgress, flush] =
          (onDownloadProgress &&
            (0,_helpers_progressEventReducer_js__rspack_import_5.progressEventDecorator)(
              responseContentLength,
              (0,_helpers_progressEventReducer_js__rspack_import_5.progressEventReducer)((0,_helpers_progressEventReducer_js__rspack_import_5.asyncDecorator)(onDownloadProgress), true)
            )) ||
          [];

        response = new Response(
          (0,_helpers_trackStream_js__rspack_import_6.trackStream)(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }

      responseType = responseType || 'text';

      let responseData = await resolvers[_utils_js__rspack_import_0["default"].findKey(resolvers, responseType) || 'text'](
        response,
        config
      );

      !isStreamResponse && unsubscribe && unsubscribe();

      return await new Promise((resolve, reject) => {
        (0,_core_settle_js__rspack_import_7["default"])(resolve, reject, {
          data: responseData,
          headers: _core_AxiosHeaders_js__rspack_import_8["default"].from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request,
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();

      if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new _core_AxiosError_js__rspack_import_2["default"](
            'Network Error',
            _core_AxiosError_js__rspack_import_2["default"].ERR_NETWORK,
            config,
            request,
            err && err.response
          ),
          {
            cause: err.cause || err,
          }
        );
      }

      throw _core_AxiosError_js__rspack_import_2["default"].from(err, err && err.code, config, request, err && err.response);
    }
  };
};

const seedCache = new Map();

const getFetch = (config) => {
  let env = (config && config.env) || {};
  const { fetch, Request, Response } = env;
  const seeds = [Request, Response, fetch];

  let len = seeds.length,
    i = len,
    seed,
    target,
    map = seedCache;

  while (i--) {
    seed = seeds[i];
    target = map.get(seed);

    target === undefined && map.set(seed, (target = i ? new Map() : factory(env)));

    map = target;
  }

  return target;
};

const adapter = getFetch();

/* export default */ const __rspack_default_export = (adapter);


},
7013(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_5 = __webpack_require__(7275);
/* import */ var _core_settle_js__rspack_import_2 = __webpack_require__(3853);
/* import */ var _defaults_transitional_js__rspack_import_4 = __webpack_require__(807);
/* import */ var _core_AxiosError_js__rspack_import_3 = __webpack_require__(4062);
/* import */ var _cancel_CanceledError_js__rspack_import_7 = __webpack_require__(8458);
/* import */ var _helpers_parseProtocol_js__rspack_import_8 = __webpack_require__(5579);
/* import */ var _platform_index_js__rspack_import_9 = __webpack_require__(3820);
/* import */ var _core_AxiosHeaders_js__rspack_import_1 = __webpack_require__(7110);
/* import */ var _helpers_progressEventReducer_js__rspack_import_6 = __webpack_require__(7837);
/* import */ var _helpers_resolveConfig_js__rspack_import_0 = __webpack_require__(8382);











const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* export default */ const __rspack_default_export = (isXHRAdapterSupported &&
  function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = (0,_helpers_resolveConfig_js__rspack_import_0["default"])(config);
      let requestData = _config.data;
      const requestHeaders = _core_AxiosHeaders_js__rspack_import_1["default"].from(_config.headers).normalize();
      let { responseType, onUploadProgress, onDownloadProgress } = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;

      function done() {
        flushUpload && flushUpload(); // flush events
        flushDownload && flushDownload(); // flush events

        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

        _config.signal && _config.signal.removeEventListener('abort', onCanceled);
      }

      let request = new XMLHttpRequest();

      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;

      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        const responseHeaders = _core_AxiosHeaders_js__rspack_import_1["default"].from(
          'getAllResponseHeaders' in request && request.getAllResponseHeaders()
        );
        const responseData =
          !responseType || responseType === 'text' || responseType === 'json'
            ? request.responseText
            : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request,
        };

        (0,_core_settle_js__rspack_import_2["default"])(
          function _resolve(value) {
            resolve(value);
            done();
          },
          function _reject(err) {
            reject(err);
            done();
          },
          response
        );

        // Clean up request
        request = null;
      }

      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (
            request.status === 0 &&
            !(request.responseURL && request.responseURL.indexOf('file:') === 0)
          ) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(new _core_AxiosError_js__rspack_import_3["default"]('Request aborted', _core_AxiosError_js__rspack_import_3["default"].ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError(event) {
        // Browsers deliver a ProgressEvent in XHR onerror
        // (message may be empty; when present, surface it)
        // See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
        const msg = event && event.message ? event.message : 'Network Error';
        const err = new _core_AxiosError_js__rspack_import_3["default"](msg, _core_AxiosError_js__rspack_import_3["default"].ERR_NETWORK, config, request);
        // attach the underlying event for consumers who want details
        err.event = event || null;
        reject(err);
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout
          ? 'timeout of ' + _config.timeout + 'ms exceeded'
          : 'timeout exceeded';
        const transitional = _config.transitional || _defaults_transitional_js__rspack_import_4["default"];
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(
          new _core_AxiosError_js__rspack_import_3["default"](
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? _core_AxiosError_js__rspack_import_3["default"].ETIMEDOUT : _core_AxiosError_js__rspack_import_3["default"].ECONNABORTED,
            config,
            request
          )
        );

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        _utils_js__rspack_import_5["default"].forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!_utils_js__rspack_import_5["default"].isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (onDownloadProgress) {
        [downloadThrottled, flushDownload] = (0,_helpers_progressEventReducer_js__rspack_import_6.progressEventReducer)(onDownloadProgress, true);
        request.addEventListener('progress', downloadThrottled);
      }

      // Not all browsers support upload events
      if (onUploadProgress && request.upload) {
        [uploadThrottled, flushUpload] = (0,_helpers_progressEventReducer_js__rspack_import_6.progressEventReducer)(onUploadProgress);

        request.upload.addEventListener('progress', uploadThrottled);

        request.upload.addEventListener('loadend', flushUpload);
      }

      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new _cancel_CanceledError_js__rspack_import_7["default"](null, config, request) : cancel);
          request.abort();
          request = null;
        };

        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted
            ? onCanceled()
            : _config.signal.addEventListener('abort', onCanceled);
        }
      }

      const protocol = (0,_helpers_parseProtocol_js__rspack_import_8["default"])(_config.url);

      if (protocol && _platform_index_js__rspack_import_9["default"].protocols.indexOf(protocol) === -1) {
        reject(
          new _core_AxiosError_js__rspack_import_3["default"](
            'Unsupported protocol ' + protocol + ':',
            _core_AxiosError_js__rspack_import_3["default"].ERR_BAD_REQUEST,
            config
          )
        );
        return;
      }

      // Send the request
      request.send(requestData || null);
    });
  });


},
7536(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_2 = __webpack_require__(7275);
/* import */ var _helpers_bind_js__rspack_import_1 = __webpack_require__(2125);
/* import */ var _core_Axios_js__rspack_import_0 = __webpack_require__(5978);
/* import */ var _core_mergeConfig_js__rspack_import_3 = __webpack_require__(4662);
/* import */ var _defaults_index_js__rspack_import_4 = __webpack_require__(6013);
/* import */ var _helpers_formDataToJSON_js__rspack_import_14 = __webpack_require__(7887);
/* import */ var _cancel_CanceledError_js__rspack_import_5 = __webpack_require__(8458);
/* import */ var _cancel_CancelToken_js__rspack_import_6 = __webpack_require__(4874);
/* import */ var _cancel_isCancel_js__rspack_import_7 = __webpack_require__(9575);
/* import */ var _env_data_js__rspack_import_8 = __webpack_require__(9888);
/* import */ var _helpers_toFormData_js__rspack_import_9 = __webpack_require__(665);
/* import */ var _core_AxiosError_js__rspack_import_10 = __webpack_require__(4062);
/* import */ var _helpers_spread_js__rspack_import_11 = __webpack_require__(605);
/* import */ var _helpers_isAxiosError_js__rspack_import_12 = __webpack_require__(8562);
/* import */ var _core_AxiosHeaders_js__rspack_import_13 = __webpack_require__(7110);
/* import */ var _adapters_adapters_js__rspack_import_15 = __webpack_require__(6263);
/* import */ var _helpers_HttpStatusCode_js__rspack_import_16 = __webpack_require__(7693);




















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new _core_Axios_js__rspack_import_0["default"](defaultConfig);
  const instance = (0,_helpers_bind_js__rspack_import_1["default"])(_core_Axios_js__rspack_import_0["default"].prototype.request, context);

  // Copy axios.prototype to instance
  _utils_js__rspack_import_2["default"].extend(instance, _core_Axios_js__rspack_import_0["default"].prototype, context, { allOwnKeys: true });

  // Copy context to instance
  _utils_js__rspack_import_2["default"].extend(instance, context, null, { allOwnKeys: true });

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance((0,_core_mergeConfig_js__rspack_import_3["default"])(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(_defaults_index_js__rspack_import_4["default"]);

// Expose Axios class to allow class inheritance
axios.Axios = _core_Axios_js__rspack_import_0["default"];

// Expose Cancel & CancelToken
axios.CanceledError = _cancel_CanceledError_js__rspack_import_5["default"];
axios.CancelToken = _cancel_CancelToken_js__rspack_import_6["default"];
axios.isCancel = _cancel_isCancel_js__rspack_import_7["default"];
axios.VERSION = _env_data_js__rspack_import_8.VERSION;
axios.toFormData = _helpers_toFormData_js__rspack_import_9["default"];

// Expose AxiosError class
axios.AxiosError = _core_AxiosError_js__rspack_import_10["default"];

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = _helpers_spread_js__rspack_import_11["default"];

// Expose isAxiosError
axios.isAxiosError = _helpers_isAxiosError_js__rspack_import_12["default"];

// Expose mergeConfig
axios.mergeConfig = _core_mergeConfig_js__rspack_import_3["default"];

axios.AxiosHeaders = _core_AxiosHeaders_js__rspack_import_13["default"];

axios.formToJSON = (thing) => (0,_helpers_formDataToJSON_js__rspack_import_14["default"])(_utils_js__rspack_import_2["default"].isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = _adapters_adapters_js__rspack_import_15["default"].getAdapter;

axios.HttpStatusCode = _helpers_HttpStatusCode_js__rspack_import_16["default"];

axios.default = axios;

// this module should only have a default export
/* export default */ const __rspack_default_export = (axios);


},
4874(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _CanceledError_js__rspack_import_0 = __webpack_require__(8458);




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then((cancel) => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = (onfulfilled) => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new _CanceledError_js__rspack_import_0["default"](message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  toAbortSignal() {
    const controller = new AbortController();

    const abort = (err) => {
      controller.abort(err);
    };

    this.subscribe(abort);

    controller.signal.unsubscribe = () => this.unsubscribe(abort);

    return controller.signal;
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel,
    };
  }
}

/* export default */ const __rspack_default_export = (CancelToken);


},
8458(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _core_AxiosError_js__rspack_import_0 = __webpack_require__(4062);




class CanceledError extends _core_AxiosError_js__rspack_import_0["default"] {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    super(message == null ? 'canceled' : message, _core_AxiosError_js__rspack_import_0["default"].ERR_CANCELED, config, request);
    this.name = 'CanceledError';
    this.__CANCEL__ = true;
  }
}

/* export default */ const __rspack_default_export = (CanceledError);


},
9575(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (isCancel)
});


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}


},
5978(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_3 = __webpack_require__(7275);
/* import */ var _helpers_buildURL_js__rspack_import_8 = __webpack_require__(3967);
/* import */ var _InterceptorManager_js__rspack_import_1 = __webpack_require__(7352);
/* import */ var _dispatchRequest_js__rspack_import_6 = __webpack_require__(8683);
/* import */ var _mergeConfig_js__rspack_import_2 = __webpack_require__(4662);
/* import */ var _buildFullPath_js__rspack_import_7 = __webpack_require__(8262);
/* import */ var _helpers_validator_js__rspack_import_0 = __webpack_require__(3390);
/* import */ var _AxiosHeaders_js__rspack_import_4 = __webpack_require__(7110);
/* import */ var _defaults_transitional_js__rspack_import_5 = __webpack_require__(807);












const validators = _helpers_validator_js__rspack_import_0["default"].validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new _InterceptorManager_js__rspack_import_1["default"](),
      response: new _InterceptorManager_js__rspack_import_1["default"](),
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};

        Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
        try {
          if (!err.stack) {
            err.stack = stack;
            // match without the 2 top stack lines
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
            err.stack += '\n' + stack;
          }
        } catch (e) {
          // ignore the case where "stack" is an un-writable property
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = (0,_mergeConfig_js__rspack_import_2["default"])(this.defaults, config);

    const { transitional, paramsSerializer, headers } = config;

    if (transitional !== undefined) {
      _helpers_validator_js__rspack_import_0["default"].assertOptions(
        transitional,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
          legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
        },
        false
      );
    }

    if (paramsSerializer != null) {
      if (_utils_js__rspack_import_3["default"].isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer,
        };
      } else {
        _helpers_validator_js__rspack_import_0["default"].assertOptions(
          paramsSerializer,
          {
            encode: validators.function,
            serialize: validators.function,
          },
          true
        );
      }
    }

    // Set config.allowAbsoluteUrls
    if (config.allowAbsoluteUrls !== undefined) {
      // do nothing
    } else if (this.defaults.allowAbsoluteUrls !== undefined) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }

    _helpers_validator_js__rspack_import_0["default"].assertOptions(
      config,
      {
        baseUrl: validators.spelling('baseURL'),
        withXsrfToken: validators.spelling('withXSRFToken'),
      },
      true
    );

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && _utils_js__rspack_import_3["default"].merge(headers.common, headers[config.method]);

    headers &&
      _utils_js__rspack_import_3["default"].forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (method) => {
        delete headers[method];
      });

    config.headers = _AxiosHeaders_js__rspack_import_4["default"].concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      const transitional = config.transitional || _defaults_transitional_js__rspack_import_5["default"];
      const legacyInterceptorReqResOrdering =
        transitional && transitional.legacyInterceptorReqResOrdering;

      if (legacyInterceptorReqResOrdering) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      } else {
        requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [_dispatchRequest_js__rspack_import_6["default"].bind(this), undefined];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = _dispatchRequest_js__rspack_import_6["default"].call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = (0,_mergeConfig_js__rspack_import_2["default"])(this.defaults, config);
    const fullPath = (0,_buildFullPath_js__rspack_import_7["default"])(config.baseURL, config.url, config.allowAbsoluteUrls);
    return (0,_helpers_buildURL_js__rspack_import_8["default"])(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
_utils_js__rspack_import_3["default"].forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(
      (0,_mergeConfig_js__rspack_import_2["default"])(config || {}, {
        method,
        url,
        data: (config || {}).data,
      })
    );
  };
});

_utils_js__rspack_import_3["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        (0,_mergeConfig_js__rspack_import_2["default"])(config || {}, {
          method,
          headers: isForm
            ? {
                'Content-Type': 'multipart/form-data',
              }
            : {},
          url,
          data,
        })
      );
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/* export default */ const __rspack_default_export = (Axios);


},
4062(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);




class AxiosError extends Error {
  static from(error, code, config, request, response, customProps) {
    const axiosError = new AxiosError(error.message, code || error.code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;

    // Preserve status from the original error if not already set from response
    if (error.status != null && axiosError.status == null) {
      axiosError.status = error.status;
    }

    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  }

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    constructor(message, code, config, request, response) {
      super(message);
      
      // Make message enumerable to maintain backward compatibility
      // The native Error constructor sets message as non-enumerable,
      // but axios < v1.13.3 had it as enumerable
      Object.defineProperty(this, 'message', {
          value: message,
          enumerable: true,
          writable: true,
          configurable: true
      });
      
      this.name = 'AxiosError';
      this.isAxiosError = true;
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      if (response) {
          this.response = response;
          this.status = response.status;
      }
    }

  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _utils_js__rspack_import_0["default"].toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  }
}

// This can be changed to static properties as soon as the parser options in .eslint.cjs are updated.
AxiosError.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE';
AxiosError.ERR_BAD_OPTION = 'ERR_BAD_OPTION';
AxiosError.ECONNABORTED = 'ECONNABORTED';
AxiosError.ETIMEDOUT = 'ETIMEDOUT';
AxiosError.ERR_NETWORK = 'ERR_NETWORK';
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS';
AxiosError.ERR_DEPRECATED = 'ERR_DEPRECATED';
AxiosError.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE';
AxiosError.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';
AxiosError.ERR_CANCELED = 'ERR_CANCELED';
AxiosError.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT';
AxiosError.ERR_INVALID_URL = 'ERR_INVALID_URL';

/* export default */ const __rspack_default_export = (AxiosError);


},
7110(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);
/* import */ var _helpers_parseHeaders_js__rspack_import_1 = __webpack_require__(3325);





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return _utils_js__rspack_import_0["default"].isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (_utils_js__rspack_import_0["default"].isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!_utils_js__rspack_import_0["default"].isString(value)) return;

  if (_utils_js__rspack_import_0["default"].isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (_utils_js__rspack_import_0["default"].isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = _utils_js__rspack_import_0["default"].toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function (arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true,
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = _utils_js__rspack_import_0["default"].findKey(self, lHeader);

      if (
        !key ||
        self[key] === undefined ||
        _rewrite === true ||
        (_rewrite === undefined && self[key] !== false)
      ) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      _utils_js__rspack_import_0["default"].forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (_utils_js__rspack_import_0["default"].isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (_utils_js__rspack_import_0["default"].isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders((0,_helpers_parseHeaders_js__rspack_import_1["default"])(header), valueOrRewrite);
    } else if (_utils_js__rspack_import_0["default"].isObject(header) && _utils_js__rspack_import_0["default"].isIterable(header)) {
      let obj = {},
        dest,
        key;
      for (const entry of header) {
        if (!_utils_js__rspack_import_0["default"].isArray(entry)) {
          throw TypeError('Object iterator must return a key-value pair');
        }

        obj[(key = entry[0])] = (dest = obj[key])
          ? _utils_js__rspack_import_0["default"].isArray(dest)
            ? [...dest, entry[1]]
            : [dest, entry[1]]
          : entry[1];
      }

      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__rspack_import_0["default"].findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (_utils_js__rspack_import_0["default"].isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (_utils_js__rspack_import_0["default"].isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__rspack_import_0["default"].findKey(this, header);

      return !!(
        key &&
        this[key] !== undefined &&
        (!matcher || matchHeaderValue(this, this[key], key, matcher))
      );
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = _utils_js__rspack_import_0["default"].findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (_utils_js__rspack_import_0["default"].isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    _utils_js__rspack_import_0["default"].forEach(this, (value, header) => {
      const key = _utils_js__rspack_import_0["default"].findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    _utils_js__rspack_import_0["default"].forEach(this, (value, header) => {
      value != null &&
        value !== false &&
        (obj[header] = asStrings && _utils_js__rspack_import_0["default"].isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON())
      .map(([header, value]) => header + ': ' + value)
      .join('\n');
  }

  getSetCookie() {
    return this.get('set-cookie') || [];
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals =
      (this[$internals] =
      this[$internals] =
        {
          accessors: {},
        });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    _utils_js__rspack_import_0["default"].isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
]);

// reserved names hotfix
_utils_js__rspack_import_0["default"].reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    },
  };
});

_utils_js__rspack_import_0["default"].freezeMethods(AxiosHeaders);

/* export default */ const __rspack_default_export = (AxiosHeaders);


},
7352(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);




class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null,
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    _utils_js__rspack_import_0["default"].forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* export default */ const __rspack_default_export = (InterceptorManager);


},
8262(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (buildFullPath)
});
/* import */ var _helpers_isAbsoluteURL_js__rspack_import_0 = __webpack_require__(9034);
/* import */ var _helpers_combineURLs_js__rspack_import_1 = __webpack_require__(6787);





/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !(0,_helpers_isAbsoluteURL_js__rspack_import_0["default"])(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return (0,_helpers_combineURLs_js__rspack_import_1["default"])(baseURL, requestedURL);
  }
  return requestedURL;
}


},
8683(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (dispatchRequest)
});
/* import */ var _transformData_js__rspack_import_2 = __webpack_require__(9152);
/* import */ var _cancel_isCancel_js__rspack_import_5 = __webpack_require__(9575);
/* import */ var _defaults_index_js__rspack_import_4 = __webpack_require__(6013);
/* import */ var _cancel_CanceledError_js__rspack_import_0 = __webpack_require__(8458);
/* import */ var _core_AxiosHeaders_js__rspack_import_1 = __webpack_require__(7110);
/* import */ var _adapters_adapters_js__rspack_import_3 = __webpack_require__(6263);









/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new _cancel_CanceledError_js__rspack_import_0["default"](null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = _core_AxiosHeaders_js__rspack_import_1["default"].from(config.headers);

  // Transform request data
  config.data = _transformData_js__rspack_import_2["default"].call(config, config.transformRequest);

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = _adapters_adapters_js__rspack_import_3["default"].getAdapter(config.adapter || _defaults_index_js__rspack_import_4["default"].adapter, config);

  return adapter(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = _transformData_js__rspack_import_2["default"].call(config, config.transformResponse, response);

      response.headers = _core_AxiosHeaders_js__rspack_import_1["default"].from(response.headers);

      return response;
    },
    function onAdapterRejection(reason) {
      if (!(0,_cancel_isCancel_js__rspack_import_5["default"])(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = _transformData_js__rspack_import_2["default"].call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = _core_AxiosHeaders_js__rspack_import_1["default"].from(reason.response.headers);
        }
      }

      return Promise.reject(reason);
    }
  );
}


},
4662(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (mergeConfig)
});
/* import */ var _utils_js__rspack_import_1 = __webpack_require__(7275);
/* import */ var _AxiosHeaders_js__rspack_import_0 = __webpack_require__(7110);





const headersToObject = (thing) => (thing instanceof _AxiosHeaders_js__rspack_import_0["default"] ? { ...thing } : thing);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, prop, caseless) {
    if (_utils_js__rspack_import_1["default"].isPlainObject(target) && _utils_js__rspack_import_1["default"].isPlainObject(source)) {
      return _utils_js__rspack_import_1["default"].merge.call({ caseless }, target, source);
    } else if (_utils_js__rspack_import_1["default"].isPlainObject(source)) {
      return _utils_js__rspack_import_1["default"].merge({}, source);
    } else if (_utils_js__rspack_import_1["default"].isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(a, b, prop, caseless) {
    if (!_utils_js__rspack_import_1["default"].isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!_utils_js__rspack_import_1["default"].isUndefined(a)) {
      return getMergedValue(undefined, a, prop, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!_utils_js__rspack_import_1["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!_utils_js__rspack_import_1["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!_utils_js__rspack_import_1["default"].isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) =>
      mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true),
  };

  _utils_js__rspack_import_1["default"].forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    if (prop === '__proto__' || prop === 'constructor' || prop === 'prototype') return;
    const merge = _utils_js__rspack_import_1["default"].hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (_utils_js__rspack_import_1["default"].isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}


},
3853(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (settle)
});
/* import */ var _AxiosError_js__rspack_import_0 = __webpack_require__(4062);




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(
      new _AxiosError_js__rspack_import_0["default"](
        'Request failed with status code ' + response.status,
        [_AxiosError_js__rspack_import_0["default"].ERR_BAD_REQUEST, _AxiosError_js__rspack_import_0["default"].ERR_BAD_RESPONSE][
          Math.floor(response.status / 100) - 4
        ],
        response.config,
        response.request,
        response
      )
    );
  }
}


},
9152(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (transformData)
});
/* import */ var _utils_js__rspack_import_2 = __webpack_require__(7275);
/* import */ var _defaults_index_js__rspack_import_0 = __webpack_require__(6013);
/* import */ var _core_AxiosHeaders_js__rspack_import_1 = __webpack_require__(7110);






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || _defaults_index_js__rspack_import_0["default"];
  const context = response || config;
  const headers = _core_AxiosHeaders_js__rspack_import_1["default"].from(context.headers);
  let data = context.data;

  _utils_js__rspack_import_2["default"].forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}


},
6013(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);
/* import */ var _core_AxiosError_js__rspack_import_5 = __webpack_require__(4062);
/* import */ var _transitional_js__rspack_import_1 = __webpack_require__(807);
/* import */ var _helpers_toFormData_js__rspack_import_4 = __webpack_require__(665);
/* import */ var _helpers_toURLEncodedForm_js__rspack_import_3 = __webpack_require__(1076);
/* import */ var _platform_index_js__rspack_import_6 = __webpack_require__(3820);
/* import */ var _helpers_formDataToJSON_js__rspack_import_2 = __webpack_require__(7887);










/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (_utils_js__rspack_import_0["default"].isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return _utils_js__rspack_import_0["default"].trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {
  transitional: _transitional_js__rspack_import_1["default"],

  adapter: ['xhr', 'http', 'fetch'],

  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || '';
      const hasJSONContentType = contentType.indexOf('application/json') > -1;
      const isObjectPayload = _utils_js__rspack_import_0["default"].isObject(data);

      if (isObjectPayload && _utils_js__rspack_import_0["default"].isHTMLForm(data)) {
        data = new FormData(data);
      }

      const isFormData = _utils_js__rspack_import_0["default"].isFormData(data);

      if (isFormData) {
        return hasJSONContentType ? JSON.stringify((0,_helpers_formDataToJSON_js__rspack_import_2["default"])(data)) : data;
      }

      if (
        _utils_js__rspack_import_0["default"].isArrayBuffer(data) ||
        _utils_js__rspack_import_0["default"].isBuffer(data) ||
        _utils_js__rspack_import_0["default"].isStream(data) ||
        _utils_js__rspack_import_0["default"].isFile(data) ||
        _utils_js__rspack_import_0["default"].isBlob(data) ||
        _utils_js__rspack_import_0["default"].isReadableStream(data)
      ) {
        return data;
      }
      if (_utils_js__rspack_import_0["default"].isArrayBufferView(data)) {
        return data.buffer;
      }
      if (_utils_js__rspack_import_0["default"].isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }

      let isFileList;

      if (isObjectPayload) {
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return (0,_helpers_toURLEncodedForm_js__rspack_import_3["default"])(data, this.formSerializer).toString();
        }

        if (
          (isFileList = _utils_js__rspack_import_0["default"].isFileList(data)) ||
          contentType.indexOf('multipart/form-data') > -1
        ) {
          const _FormData = this.env && this.env.FormData;

          return (0,_helpers_toFormData_js__rspack_import_4["default"])(
            isFileList ? { 'files[]': data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }

      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }

      return data;
    },
  ],

  transformResponse: [
    function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === 'json';

      if (_utils_js__rspack_import_0["default"].isResponse(data) || _utils_js__rspack_import_0["default"].isReadableStream(data)) {
        return data;
      }

      if (
        data &&
        _utils_js__rspack_import_0["default"].isString(data) &&
        ((forcedJSONParsing && !this.responseType) || JSONRequested)
      ) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;

        try {
          return JSON.parse(data, this.parseReviver);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw _core_AxiosError_js__rspack_import_5["default"].from(e, _core_AxiosError_js__rspack_import_5["default"].ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }

      return data;
    },
  ],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: _platform_index_js__rspack_import_6["default"].classes.FormData,
    Blob: _platform_index_js__rspack_import_6["default"].classes.Blob,
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': undefined,
    },
  },
};

_utils_js__rspack_import_0["default"].forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

/* export default */ const __rspack_default_export = (defaults);


},
807(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});


/* export default */ const __rspack_default_export = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
  legacyInterceptorReqResOrdering: true,
});


},
9888(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VERSION: () => (VERSION)
});
const VERSION = "1.13.6";

},
5267(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _toFormData_js__rspack_import_0 = __webpack_require__(665);




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00',
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && (0,_toFormData_js__rspack_import_0["default"])(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder
    ? function (value) {
        return encoder.call(this, value, encode);
      }
    : encode;

  return this._pairs
    .map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '')
    .join('&');
};

/* export default */ const __rspack_default_export = (AxiosURLSearchParams);


},
7693(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/* export default */ const __rspack_default_export = (HttpStatusCode);


},
2125(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (bind)
});


/**
 * Create a bound version of a function with a specified `this` context
 *
 * @param {Function} fn - The function to bind
 * @param {*} thisArg - The value to be passed as the `this` parameter
 * @returns {Function} A new function that will call the original function with the specified `this` context
 */
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}


},
3967(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (buildURL)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);
/* import */ var _helpers_AxiosURLSearchParams_js__rspack_import_1 = __webpack_require__(5267);





/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?(object|Function)} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }

  const _encode = (options && options.encode) || encode;

  const _options = _utils_js__rspack_import_0["default"].isFunction(options)
    ? {
        serialize: options,
      }
    : options;

  const serializeFn = _options && _options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, _options);
  } else {
    serializedParams = _utils_js__rspack_import_0["default"].isURLSearchParams(params)
      ? params.toString()
      : new _helpers_AxiosURLSearchParams_js__rspack_import_1["default"](params, _options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}


},
6787(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (combineURLs)
});


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}


},
2723(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _cancel_CanceledError_js__rspack_import_1 = __webpack_require__(8458);
/* import */ var _core_AxiosError_js__rspack_import_0 = __webpack_require__(4062);
/* import */ var _utils_js__rspack_import_2 = __webpack_require__(7275);




const composeSignals = (signals, timeout) => {
  const { length } = (signals = signals ? signals.filter(Boolean) : []);

  if (timeout || length) {
    let controller = new AbortController();

    let aborted;

    const onabort = function (reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(
          err instanceof _core_AxiosError_js__rspack_import_0["default"]
            ? err
            : new _cancel_CanceledError_js__rspack_import_1["default"](err instanceof Error ? err.message : err)
        );
      }
    };

    let timer =
      timeout &&
      setTimeout(() => {
        timer = null;
        onabort(new _core_AxiosError_js__rspack_import_0["default"](`timeout of ${timeout}ms exceeded`, _core_AxiosError_js__rspack_import_0["default"].ETIMEDOUT));
      }, timeout);

    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal) => {
          signal.unsubscribe
            ? signal.unsubscribe(onabort)
            : signal.removeEventListener('abort', onabort);
        });
        signals = null;
      }
    };

    signals.forEach((signal) => signal.addEventListener('abort', onabort));

    const { signal } = controller;

    signal.unsubscribe = () => _utils_js__rspack_import_2["default"].asap(unsubscribe);

    return signal;
  }
};

/* export default */ const __rspack_default_export = (composeSignals);


},
9887(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_1 = __webpack_require__(7275);
/* import */ var _platform_index_js__rspack_import_0 = __webpack_require__(3820);



/* export default */ const __rspack_default_export = (_platform_index_js__rspack_import_0["default"].hasStandardBrowserEnv
  ? // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure, sameSite) {
        if (typeof document === 'undefined') return;

        const cookie = [`${name}=${encodeURIComponent(value)}`];

        if (_utils_js__rspack_import_1["default"].isNumber(expires)) {
          cookie.push(`expires=${new Date(expires).toUTCString()}`);
        }
        if (_utils_js__rspack_import_1["default"].isString(path)) {
          cookie.push(`path=${path}`);
        }
        if (_utils_js__rspack_import_1["default"].isString(domain)) {
          cookie.push(`domain=${domain}`);
        }
        if (secure === true) {
          cookie.push('secure');
        }
        if (_utils_js__rspack_import_1["default"].isString(sameSite)) {
          cookie.push(`SameSite=${sameSite}`);
        }

        document.cookie = cookie.join('; ');
      },

      read(name) {
        if (typeof document === 'undefined') return null;
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
      },

      remove(name) {
        this.write(name, '', Date.now() - 86400000, '/');
      },
    }
  : // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {},
      read() {
        return null;
      },
      remove() {},
    });


},
7887(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);




/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return _utils_js__rspack_import_0["default"].matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && _utils_js__rspack_import_0["default"].isArray(target) ? target.length : name;

    if (isLast) {
      if (_utils_js__rspack_import_0["default"].hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !_utils_js__rspack_import_0["default"].isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && _utils_js__rspack_import_0["default"].isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (_utils_js__rspack_import_0["default"].isFormData(formData) && _utils_js__rspack_import_0["default"].isFunction(formData.entries)) {
    const obj = {};

    _utils_js__rspack_import_0["default"].forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* export default */ const __rspack_default_export = (formDataToJSON);


},
9034(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (isAbsoluteURL)
});


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  if (typeof url !== 'string') {
    return false;
  }

  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}


},
8562(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (isAxiosError)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return _utils_js__rspack_import_0["default"].isObject(payload) && payload.isAxiosError === true;
}


},
6305(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _platform_index_js__rspack_import_0 = __webpack_require__(3820);


/* export default */ const __rspack_default_export = (_platform_index_js__rspack_import_0["default"].hasStandardBrowserEnv
  ? ((origin, isMSIE) => (url) => {
      url = new URL(url, _platform_index_js__rspack_import_0["default"].origin);

      return (
        origin.protocol === url.protocol &&
        origin.host === url.host &&
        (isMSIE || origin.port === url.port)
      );
    })(
      new URL(_platform_index_js__rspack_import_0["default"].origin),
      _platform_index_js__rspack_import_0["default"].navigator && /(msie|trident)/i.test(_platform_index_js__rspack_import_0["default"].navigator.userAgent)
    )
  : () => true);


},
3119(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
// eslint-disable-next-line strict
/* export default */ const __rspack_default_export = (null);


},
3325(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = _utils_js__rspack_import_0["default"].toObjectSet([
  'age',
  'authorization',
  'content-length',
  'content-type',
  'etag',
  'expires',
  'from',
  'host',
  'if-modified-since',
  'if-unmodified-since',
  'last-modified',
  'location',
  'max-forwards',
  'proxy-authorization',
  'referer',
  'retry-after',
  'user-agent',
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* export default */ const __rspack_default_export = ((rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders &&
    rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();

      if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
        return;
      }

      if (key === 'set-cookie') {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });

  return parsed;
});


},
5579(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (parseProtocol)
});


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return (match && match[1]) || '';
}


},
7837(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  asyncDecorator: () => (asyncDecorator),
  progressEventDecorator: () => (progressEventDecorator),
  progressEventReducer: () => (progressEventReducer)
});
/* import */ var _speedometer_js__rspack_import_0 = __webpack_require__(3873);
/* import */ var _throttle_js__rspack_import_1 = __webpack_require__(66);
/* import */ var _utils_js__rspack_import_2 = __webpack_require__(7275);




const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = (0,_speedometer_js__rspack_import_0["default"])(50, 250);

  return (0,_throttle_js__rspack_import_1["default"])((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? loaded / total : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? 'download' : 'upload']: true,
    };

    listener(data);
  }, freq);
};

const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;

  return [
    (loaded) =>
      throttled[0]({
        lengthComputable,
        total,
        loaded,
      }),
    throttled[1],
  ];
};

const asyncDecorator =
  (fn) =>
  (...args) =>
    _utils_js__rspack_import_2["default"].asap(() => fn(...args));


},
8382(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _platform_index_js__rspack_import_5 = __webpack_require__(3820);
/* import */ var _utils_js__rspack_import_4 = __webpack_require__(7275);
/* import */ var _isURLSameOrigin_js__rspack_import_6 = __webpack_require__(6305);
/* import */ var _cookies_js__rspack_import_7 = __webpack_require__(9887);
/* import */ var _core_buildFullPath_js__rspack_import_3 = __webpack_require__(8262);
/* import */ var _core_mergeConfig_js__rspack_import_0 = __webpack_require__(4662);
/* import */ var _core_AxiosHeaders_js__rspack_import_1 = __webpack_require__(7110);
/* import */ var _buildURL_js__rspack_import_2 = __webpack_require__(3967);









/* export default */ const __rspack_default_export = ((config) => {
  const newConfig = (0,_core_mergeConfig_js__rspack_import_0["default"])({}, config);

  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;

  newConfig.headers = headers = _core_AxiosHeaders_js__rspack_import_1["default"].from(headers);

  newConfig.url = (0,_buildURL_js__rspack_import_2["default"])(
    (0,_core_buildFullPath_js__rspack_import_3["default"])(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls),
    config.params,
    config.paramsSerializer
  );

  // HTTP basic authentication
  if (auth) {
    headers.set(
      'Authorization',
      'Basic ' +
        btoa(
          (auth.username || '') +
            ':' +
            (auth.password ? unescape(encodeURIComponent(auth.password)) : '')
        )
    );
  }

  if (_utils_js__rspack_import_4["default"].isFormData(data)) {
    if (_platform_index_js__rspack_import_5["default"].hasStandardBrowserEnv || _platform_index_js__rspack_import_5["default"].hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(undefined); // browser handles it
    } else if (_utils_js__rspack_import_4["default"].isFunction(data.getHeaders)) {
      // Node.js FormData (like form-data package)
      const formHeaders = data.getHeaders();
      // Only set safe headers to avoid overwriting security headers
      const allowedHeaders = ['content-type', 'content-length'];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.

  if (_platform_index_js__rspack_import_5["default"].hasStandardBrowserEnv) {
    withXSRFToken && _utils_js__rspack_import_4["default"].isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

    if (withXSRFToken || (withXSRFToken !== false && (0,_isURLSameOrigin_js__rspack_import_6["default"])(newConfig.url))) {
      // Add xsrf header
      const xsrfValue = xsrfHeaderName && xsrfCookieName && _cookies_js__rspack_import_7["default"].read(xsrfCookieName);

      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }

  return newConfig;
});


},
3873(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round((bytesCount * 1000) / passed) : undefined;
  };
}

/* export default */ const __rspack_default_export = (speedometer);


},
605(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (spread)
});


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  const args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}


},
66(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Function}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;

  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };

  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };

  const flush = () => lastArgs && invoke(lastArgs);

  return [throttled, flush];
}

/* export default */ const __rspack_default_export = (throttle);


},
665(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__(7275);
/* import */ var _core_AxiosError_js__rspack_import_2 = __webpack_require__(4062);
/* import */ var _platform_node_classes_FormData_js__rspack_import_1 = __webpack_require__(3119);
/* provided dependency */ var Buffer = __webpack_require__(8287)["Buffer"];




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored


/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return _utils_js__rspack_import_0["default"].isPlainObject(thing) || _utils_js__rspack_import_0["default"].isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return _utils_js__rspack_import_0["default"].endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path
    .concat(key)
    .map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    })
    .join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return _utils_js__rspack_import_0["default"].isArray(arr) && !arr.some(isVisitable);
}

const predicates = _utils_js__rspack_import_0["default"].toFlatObject(_utils_js__rspack_import_0["default"], {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!_utils_js__rspack_import_0["default"].isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (_platform_node_classes_FormData_js__rspack_import_1["default"] || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = _utils_js__rspack_import_0["default"].toFlatObject(
    options,
    {
      metaTokens: true,
      dots: false,
      indexes: false,
    },
    false,
    function defined(option, source) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      return !_utils_js__rspack_import_0["default"].isUndefined(source[option]);
    }
  );

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || (typeof Blob !== 'undefined' && Blob);
  const useBlob = _Blob && _utils_js__rspack_import_0["default"].isSpecCompliantForm(formData);

  if (!_utils_js__rspack_import_0["default"].isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (_utils_js__rspack_import_0["default"].isDate(value)) {
      return value.toISOString();
    }

    if (_utils_js__rspack_import_0["default"].isBoolean(value)) {
      return value.toString();
    }

    if (!useBlob && _utils_js__rspack_import_0["default"].isBlob(value)) {
      throw new _core_AxiosError_js__rspack_import_2["default"]('Blob is not supported. Use a Buffer instead.');
    }

    if (_utils_js__rspack_import_0["default"].isArrayBuffer(value) || _utils_js__rspack_import_0["default"].isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (_utils_js__rspack_import_0["default"].isReactNative(formData) && _utils_js__rspack_import_0["default"].isReactNativeBlob(value)) {
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }

    if (value && !path && typeof value === 'object') {
      if (_utils_js__rspack_import_0["default"].endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (_utils_js__rspack_import_0["default"].isArray(value) && isFlatArray(value)) ||
        ((_utils_js__rspack_import_0["default"].isFileList(value) || _utils_js__rspack_import_0["default"].endsWith(key, '[]')) && (arr = _utils_js__rspack_import_0["default"].toArray(value)))
      ) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(_utils_js__rspack_import_0["default"].isUndefined(el) || el === null) &&
            formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true
                ? renderKey([key], index, dots)
                : indexes === null
                  ? key
                  : key + '[]',
              convertValue(el)
            );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable,
  });

  function build(value, path) {
    if (_utils_js__rspack_import_0["default"].isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    _utils_js__rspack_import_0["default"].forEach(value, function each(el, key) {
      const result =
        !(_utils_js__rspack_import_0["default"].isUndefined(el) || el === null) &&
        visitor.call(formData, el, _utils_js__rspack_import_0["default"].isString(key) ? key.trim() : key, path, exposedHelpers);

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!_utils_js__rspack_import_0["default"].isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* export default */ const __rspack_default_export = (toFormData);


},
1076(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (toURLEncodedForm)
});
/* import */ var _utils_js__rspack_import_2 = __webpack_require__(7275);
/* import */ var _toFormData_js__rspack_import_0 = __webpack_require__(665);
/* import */ var _platform_index_js__rspack_import_1 = __webpack_require__(3820);






function toURLEncodedForm(data, options) {
  return (0,_toFormData_js__rspack_import_0["default"])(data, new _platform_index_js__rspack_import_1["default"].classes.URLSearchParams(), {
    visitor: function (value, key, path, helpers) {
      if (_platform_index_js__rspack_import_1["default"].isNode && _utils_js__rspack_import_2["default"].isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options,
  });
}


},
1791(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  readBytes: () => (readBytes),
  streamChunk: () => (streamChunk),
  trackStream: () => (trackStream)
});
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }

  let pos = 0;
  let end;

  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};

const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};

const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }

  const reader = stream.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};

const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);

  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };

  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done, value } = await iterator.next();

          if (done) {
            _onFinish();
            controller.close();
            return;
          }

          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = (bytes += len);
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      },
    },
    {
      highWaterMark: 2,
    }
  );
};


},
3390(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _env_data_js__rspack_import_0 = __webpack_require__(9888);
/* import */ var _core_AxiosError_js__rspack_import_1 = __webpack_require__(4062);





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return (
      '[Axios v' +
      _env_data_js__rspack_import_0.VERSION +
      "] Transitional option '" +
      opt +
      "'" +
      desc +
      (message ? '. ' + message : '')
    );
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new _core_AxiosError_js__rspack_import_1["default"](
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        _core_AxiosError_js__rspack_import_1["default"].ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

validators.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    // eslint-disable-next-line no-console
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new _core_AxiosError_js__rspack_import_1["default"]('options must be an object', _core_AxiosError_js__rspack_import_1["default"].ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new _core_AxiosError_js__rspack_import_1["default"](
          'option ' + opt + ' must be ' + result,
          _core_AxiosError_js__rspack_import_1["default"].ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new _core_AxiosError_js__rspack_import_1["default"]('Unknown option ' + opt, _core_AxiosError_js__rspack_import_1["default"].ERR_BAD_OPTION);
    }
  }
}

/* export default */ const __rspack_default_export = ({
  assertOptions,
  validators,
});


},
6501(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});


/* export default */ const __rspack_default_export = (typeof Blob !== 'undefined' ? Blob : null);


},
8556(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});


/* export default */ const __rspack_default_export = (typeof FormData !== 'undefined' ? FormData : null);


},
139(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _helpers_AxiosURLSearchParams_js__rspack_import_0 = __webpack_require__(5267);



/* export default */ const __rspack_default_export = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : _helpers_AxiosURLSearchParams_js__rspack_import_0["default"]);


},
6847(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _classes_URLSearchParams_js__rspack_import_0 = __webpack_require__(139);
/* import */ var _classes_FormData_js__rspack_import_1 = __webpack_require__(8556);
/* import */ var _classes_Blob_js__rspack_import_2 = __webpack_require__(6501);




/* export default */ const __rspack_default_export = ({
  isBrowser: true,
  classes: {
    URLSearchParams: _classes_URLSearchParams_js__rspack_import_0["default"],
    FormData: _classes_FormData_js__rspack_import_1["default"],
    Blob: _classes_Blob_js__rspack_import_2["default"],
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
});


},
2569(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  hasBrowserEnv: () => (hasBrowserEnv),
  hasStandardBrowserEnv: () => (hasStandardBrowserEnv),
  hasStandardBrowserWebWorkerEnv: () => (hasStandardBrowserWebWorkerEnv),
  navigator: () => (_navigator),
  origin: () => (origin)
});
const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

const _navigator = (typeof navigator === 'object' && navigator) || undefined;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv =
  hasBrowserEnv &&
  (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const origin = (hasBrowserEnv && window.location.href) || 'http://localhost';




},
3820(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _node_index_js__rspack_import_1 = __webpack_require__(6847);
/* import */ var _common_utils_js__rspack_import_0 = __webpack_require__(2569);



/* export default */ const __rspack_default_export = ({
  ..._common_utils_js__rspack_import_0,
  ..._node_index_js__rspack_import_1["default"],
});


},
7275(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _helpers_bind_js__rspack_import_0 = __webpack_require__(2125);
/* provided dependency */ var process = __webpack_require__(5606);




// utils is a library of generic helper functions non-specific to axios

const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;

const kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};

const typeOfTest = (type) => (thing) => typeof thing === type;

/**
 * Determine if a value is a non-null object
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const { isArray } = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    isFunction(val.constructor.isBuffer) &&
    val.constructor.isBuffer(val)
  );
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = (thing) => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(toStringTag in val) &&
    !(iterator in val)
  );
};

/**
 * Determine if a value is an empty object (safely handles Buffers)
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an empty object, otherwise false
 */
const isEmptyObject = (val) => {
  // Early return for non-objects or Buffers to prevent RangeError
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }

  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    // Fallback for any other objects that might cause RangeError with Object.keys()
    return false;
  }
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a React Native Blob
 * React Native "blob": an object with a `uri` attribute. Optionally, it can
 * also have a `name` and `type` attribute to specify filename and content type
 *
 * @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
 * 
 * @param {*} value The value to test
 * 
 * @returns {boolean} True if value is a React Native Blob, otherwise false
 */
const isReactNativeBlob = (value) => {
  return !!(value && typeof value.uri !== 'undefined');
}

/**
 * Determine if environment is React Native
 * ReactNative `FormData` has a non-standard `getParts()` method
 * 
 * @param {*} formData The formData to test
 * 
 * @returns {boolean} True if environment is React Native, otherwise false
 */
const isReactNative = (formData) => formData && typeof formData.getParts !== 'undefined';

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function getGlobal() {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  return {};
}

const G = getGlobal();
const FormDataCtor = typeof G.FormData !== 'undefined' ? G.FormData : undefined;

const isFormData = (thing) => {
  let kind;
  return thing && (
    (FormDataCtor && thing instanceof FormDataCtor) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  );
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

const [isReadableStream, isRequest, isResponse, isHeaders] = [
  'ReadableStream',
  'Request',
  'Response',
  'Headers',
].map(kindOfTest);

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array<unknown>} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Buffer check
    if (isBuffer(obj)) {
      return;
    }

    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

/**
 * Finds a key in an object, case-insensitive, returning the actual key name.
 * Returns null if the object is a Buffer or if no match is found.
 *
 * @param {Object} obj - The object to search.
 * @param {string} key - The key to find (case-insensitive).
 * @returns {?string} The actual key name if found, otherwise null.
 */
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }

  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== 'undefined') return globalThis;
  return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * const result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const { caseless, skipUndefined } = (isContextDefined(this) && this) || {};
  const result = {};
  const assignValue = (val, key) => {
    // Skip dangerous property names to prevent prototype pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return;
    }

    const targetKey = (caseless && findKey(result, key)) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b,
    (val, key) => {
      if (thisArg && isFunction(val)) {
        Object.defineProperty(a, key, {
          value: (0,_helpers_bind_js__rspack_import_0["default"])(val, thisArg),
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        Object.defineProperty(a, key, {
          value: val,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    },
    { allOwnKeys }
  );
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  Object.defineProperty(constructor.prototype, 'constructor', {
    value: constructor,
    writable: true,
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype,
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = ((TypedArray) => {
  // eslint-disable-next-line func-names
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];

  const _iterator = generator.call(obj);

  let result;

  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (
  ({ hasOwnProperty }) =>
  (obj, prop) =>
    hasOwnProperty.call(obj, prop)
)(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};

/**
 * Converts an array or a delimited string into an object set with values as keys and true as values.
 * Useful for fast membership checks.
 *
 * @param {Array|string} arrayOrString - The array or string to convert.
 * @param {string} delimiter - The delimiter to use if input is a string.
 * @returns {Object} An object with keys from the array or string, values set to true.
 */
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite((value = +value)) ? value : defaultValue;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(
    thing &&
    isFunction(thing.append) &&
    thing[toStringTag] === 'FormData' &&
    thing[iterator]
  );
}

/**
 * Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
 *
 * @param {Object} obj - The object to convert.
 * @returns {Object} The JSON-compatible object.
 */
const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      //Buffer check
      if (isBuffer(source)) {
        return source;
      }

      if (!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

/**
 * Determines if a value is an async function.
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is an async function, otherwise false.
 */
const isAsyncFn = kindOfTest('AsyncFunction');

/**
 * Determines if a value is thenable (has then and catch methods).
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is thenable, otherwise false.
 */
const isThenable = (thing) =>
  thing &&
  (isObject(thing) || isFunction(thing)) &&
  isFunction(thing.then) &&
  isFunction(thing.catch);

// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

/**
 * Provides a cross-platform setImmediate implementation.
 * Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
 *
 * @param {boolean} setImmediateSupported - Whether setImmediate is supported.
 * @param {boolean} postMessageSupported - Whether postMessage is supported.
 * @returns {Function} A function to schedule a callback asynchronously.
 */
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }

  return postMessageSupported
    ? ((token, callbacks) => {
        _global.addEventListener(
          'message',
          ({ source, data }) => {
            if (source === _global && data === token) {
              callbacks.length && callbacks.shift()();
            }
          },
          false
        );

        return (cb) => {
          callbacks.push(cb);
          _global.postMessage(token, '*');
        };
      })(`axios@${Math.random()}`, [])
    : (cb) => setTimeout(cb);
})(typeof setImmediate === 'function', isFunction(_global.postMessage));

/**
 * Schedules a microtask or asynchronous callback as soon as possible.
 * Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
 *
 * @type {Function}
 */
const asap =
  typeof queueMicrotask !== 'undefined'
    ? queueMicrotask.bind(_global)
    : (typeof process !== 'undefined' && process.nextTick) || _setImmediate;

// *********************

const isIterable = (thing) => thing != null && isFunction(thing[iterator]);

/* export default */ const __rspack_default_export = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isReactNativeBlob,
  isReactNative,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable,
});


},
8330(module) {
"use strict";
module.exports = JSON.parse('{"name":"apify-client","version":"2.22.3","description":"Apify API client for JavaScript","main":"dist/index.js","module":"dist/index.mjs","types":"dist/index.d.ts","browser":"dist/bundle.js","unpkg":"dist/bundle.js","exports":{"./package.json":"./package.json","./browser":"./dist/bundle.js",".":{"import":"./dist/index.mjs","require":"./dist/index.js","types":"./dist/index.d.ts","browser":"./dist/bundle.js"}},"keywords":["apify","api","apifier","crawler","scraper"],"author":{"name":"Apify","email":"support@apify.com","url":"https://apify.com"},"contributors":["Jan Curn <jan@apify.com>","Marek Trunkát <marek@apify.com>","Ondra Urban <ondra@apify.com>","Jakub Drobník <jakub.drobnik@apify.com>"],"license":"Apache-2.0","repository":{"type":"git","url":"git+https://github.com/apify/apify-client-js"},"bugs":{"url":"https://github.com/apify/apify-client-js/issues"},"homepage":"https://docs.apify.com/api/client/js/","files":["dist","!dist/*.tsbuildinfo"],"scripts":{"build":"npm run clean && npm run build:node && npm run build:browser","postbuild":"gen-esm-wrapper dist/index.js dist/index.mjs","prepublishOnly":"(test $CI || (echo \\"Publishing is reserved to CI!\\"; exit 1))","clean":"rimraf dist","test":"npm run build && vitest run","test:bundling":"npm run build && npm --prefix=./test/bundling run bundle:all","lint":"eslint","lint:fix":"eslint --fix","tsc-check-tests":"tsc --noEmit --project test/tsconfig.json","format":"prettier --write .","format:check":"prettier --check .","build:node":"tsc","build:browser":"rsbuild build"},"dependencies":{"@apify/consts":"^2.50.0","@apify/log":"^2.2.6","@apify/utilities":"^2.23.2","@crawlee/types":"^3.3.0","ansi-colors":"^4.1.1","async-retry":"^1.3.3","axios":"^1.6.7","content-type":"^1.0.5","ow":"^0.28.2","proxy-agent":"^6.5.0","tslib":"^2.5.0","type-fest":"^4.0.0"},"devDependencies":{"@apify/eslint-config":"^1.0.0","@apify/tsconfig":"^0.1.1","@crawlee/puppeteer":"^3.2.2","@rsbuild/core":"^1.3.6","@rsbuild/plugin-node-polyfill":"^1.3.0","@rspack/cli":"^1.7.6","@rspack/core":"^1.7.6","@stylistic/eslint-plugin-ts":"^4.2.0","@types/async-retry":"^1.4.5","@types/compression":"^1.8.1","@types/content-type":"^1.1.5","@types/express":"^5.0.0","@types/node":"^24.0.0","ajv":"^8.17.1","body-parser":"^2.0.0","compression":"^1.7.4","esbuild":"0.27.4","eslint":"^9.24.0","eslint-config-prettier":"^10.1.2","express":"^5.0.0","gen-esm-wrapper":"^1.1.2","globals":"^17.0.0","prettier":"^3.5.3","puppeteer":"^24.0.0","rimraf":"^6.0.0","rolldown":"^1.0.0-rc.4","typescript":"^5.8.3","typescript-eslint":"^8.29.1","vitest":"^4.0.16","webpack":"^5.105.2","webpack-cli":"^7.0.0"},"packageManager":"npm@10.9.2"}')

},

});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
id: moduleId,
loaded: false,
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);

// Flag the module as loaded
module.loaded = true;
// Return the exports of the module
return module.exports;

}

// webpack/runtime/compat_get_default_export
(() => {
// getDefaultExport function for compatibility with non-ESM modules
__webpack_require__.n = (module) => {
	var getter = module && module.__esModule ?
		() => (module['default']) :
		() => (module);
	__webpack_require__.d(getter, { a: getter });
	return getter;
};

})();
// webpack/runtime/create_fake_namespace_object
(() => {
var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
var leafPrototypes;
// create a fake namespace object
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 16: return value when it's Promise-like
// mode & 8|1: behave like require
__webpack_require__.t = function(value, mode) {
	if(mode & 1) value = this(value);
	if(mode & 8) return value;
	if(typeof value === 'object' && value) {
		if((mode & 4) && value.__esModule) return value;
		if((mode & 16) && typeof value.then === 'function') return value;
	}
	var ns = Object.create(null);
  __webpack_require__.r(ns);
	var def = {};
	leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
	for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
		Object.getOwnPropertyNames(current).forEach((key) => { def[key] = () => (value[key]) });
	}
	def['default'] = () => (value);
	__webpack_require__.d(ns, def);
	return ns;
};
})();
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/global
(() => {
__webpack_require__.g = (() => {
	if (typeof globalThis === 'object') return globalThis;
	try {
		return this || new Function('return this')();
	} catch (e) {
		if (typeof window === 'object') return window;
	}
})();
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
// webpack/runtime/node_module_decorator
(() => {
__webpack_require__.nmd = (module) => {
  module.paths = [];
  if (!module.children) module.children = [];
  return module;
};
})();
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InvalidResponseBodyError: () => (/* reexport safe */ _interceptors__rspack_import_29.InvalidResponseBodyError)
});
/* import */ var _apify_client__rspack_import_0 = __webpack_require__(1353);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _apify_client__rspack_import_0) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _apify_client__rspack_import_0[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_actor__rspack_import_1 = __webpack_require__(5121);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_actor__rspack_import_1) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_actor__rspack_import_1[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_actor_collection__rspack_import_2 = __webpack_require__(1504);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_actor_collection__rspack_import_2) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_actor_collection__rspack_import_2[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_actor_env_var__rspack_import_3 = __webpack_require__(2923);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_actor_env_var__rspack_import_3) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_actor_env_var__rspack_import_3[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_actor_env_var_collection__rspack_import_4 = __webpack_require__(6001);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_actor_env_var_collection__rspack_import_4) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_actor_env_var_collection__rspack_import_4[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_actor_version__rspack_import_5 = __webpack_require__(822);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_actor_version__rspack_import_5) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_actor_version__rspack_import_5[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_actor_version_collection__rspack_import_6 = __webpack_require__(525);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_actor_version_collection__rspack_import_6) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_actor_version_collection__rspack_import_6[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_build__rspack_import_7 = __webpack_require__(5400);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_build__rspack_import_7) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_build__rspack_import_7[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_build_collection__rspack_import_8 = __webpack_require__(6675);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_build_collection__rspack_import_8) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_build_collection__rspack_import_8[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_dataset__rspack_import_9 = __webpack_require__(9032);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_dataset__rspack_import_9) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_dataset__rspack_import_9[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_dataset_collection__rspack_import_10 = __webpack_require__(1075);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_dataset_collection__rspack_import_10) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_dataset_collection__rspack_import_10[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_key_value_store__rspack_import_11 = __webpack_require__(5419);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_key_value_store__rspack_import_11) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_key_value_store__rspack_import_11[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_key_value_store_collection__rspack_import_12 = __webpack_require__(5614);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_key_value_store_collection__rspack_import_12) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_key_value_store_collection__rspack_import_12[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_log__rspack_import_13 = __webpack_require__(4386);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_log__rspack_import_13) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_log__rspack_import_13[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_request_queue__rspack_import_14 = __webpack_require__(1117);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_request_queue__rspack_import_14) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_request_queue__rspack_import_14[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_request_queue_collection__rspack_import_15 = __webpack_require__(228);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_request_queue_collection__rspack_import_15) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_request_queue_collection__rspack_import_15[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_run__rspack_import_16 = __webpack_require__(8506);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_run__rspack_import_16) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_run__rspack_import_16[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_run_collection__rspack_import_17 = __webpack_require__(6084);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_run_collection__rspack_import_17) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_run_collection__rspack_import_17[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_schedule__rspack_import_18 = __webpack_require__(4011);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_schedule__rspack_import_18) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_schedule__rspack_import_18[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_schedule_collection__rspack_import_19 = __webpack_require__(158);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_schedule_collection__rspack_import_19) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_schedule_collection__rspack_import_19[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_store_collection__rspack_import_20 = __webpack_require__(1836);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_store_collection__rspack_import_20) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_store_collection__rspack_import_20[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_task__rspack_import_21 = __webpack_require__(355);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_task__rspack_import_21) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_task__rspack_import_21[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_task_collection__rspack_import_22 = __webpack_require__(502);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_task_collection__rspack_import_22) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_task_collection__rspack_import_22[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_user__rspack_import_23 = __webpack_require__(4057);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_user__rspack_import_23) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_user__rspack_import_23[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_webhook__rspack_import_24 = __webpack_require__(6829);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_webhook__rspack_import_24) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_webhook__rspack_import_24[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_webhook_collection__rspack_import_25 = __webpack_require__(5076);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_webhook_collection__rspack_import_25) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_webhook_collection__rspack_import_25[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_webhook_dispatch__rspack_import_26 = __webpack_require__(7958);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_webhook_dispatch__rspack_import_26) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_webhook_dispatch__rspack_import_26[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _resource_clients_webhook_dispatch_collection__rspack_import_27 = __webpack_require__(5821);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _resource_clients_webhook_dispatch_collection__rspack_import_27) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _resource_clients_webhook_dispatch_collection__rspack_import_27[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _apify_api_error__rspack_import_28 = __webpack_require__(1089);

/* reexport */ var __rspack_reexport = {};
/* reexport */ for( const __rspack_import_key in _apify_api_error__rspack_import_28) if(["InvalidResponseBodyError","default"].indexOf(__rspack_import_key) < 0) __rspack_reexport[__rspack_import_key] =() => _apify_api_error__rspack_import_28[__rspack_import_key]
/* reexport */ __webpack_require__.d(__webpack_exports__, __rspack_reexport);
/* import */ var _interceptors__rspack_import_29 = __webpack_require__(4928);































})();

return __webpack_exports__;
})()

});
//# sourceMappingURL=bundle.js.map