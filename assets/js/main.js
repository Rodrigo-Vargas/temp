/*!
* dependencyLibs/inputmask.dependencyLib.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-100
*/

!function (factory) {
   "function" == typeof define && define.amd ? define(["../global/window", "../global/document"], factory) : "object" == typeof exports ? module.exports = factory(require("../global/window"), require("../global/document")) : window.dependencyLib = factory(window, document);
}(function (window, document) {
   function indexOf(list, elem) {
      for (var i = 0, len = list.length; i < len; i++) if (list[i] === elem) return i;
      return -1;
   }
   function isWindow(obj) {
      return null != obj && obj === obj.window;
   }
   function isArraylike(obj) {
      var length = "length" in obj && obj.length, ltype = typeof obj;
      return "function" !== ltype && !isWindow(obj) && (!(1 !== obj.nodeType || !length) || ("array" === ltype || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj));
   }
   function isValidElement(elem) {
      return elem instanceof Element;
   }
   function DependencyLib(elem) {
      return elem instanceof DependencyLib ? elem : this instanceof DependencyLib ? void (void 0 !== elem && null !== elem && elem !== window && (this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : document.querySelector(elem),
         void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(elem);
   }
   return DependencyLib.prototype = {
      on: function (events, handler) {
         if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
            var nsEvent = _events[endx].split(".");
            !function (ev, namespace) {
               elem.addEventListener ? elem.addEventListener(ev, handler, !1) : elem.attachEvent && elem.attachEvent("on" + ev, handler),
                  eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [],
                  eventRegistry[ev][namespace].push(handler);
            }(nsEvent[0], nsEvent[1] || "global");
         }
         return this;
      },
      off: function (events, handler) {
         if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) for (var nsEvent = _events[endx].split("."), offEvents = function (ev, namespace) {
            var hndx, hndL, evts = [];
            if (ev.length > 0) if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) evts.push({
               ev: ev,
               namespace: namespace && namespace.length > 0 ? namespace : "global",
               handler: eventRegistry[ev][namespace][hndx]
            }); else evts.push({
               ev: ev,
               namespace: namespace && namespace.length > 0 ? namespace : "global",
               handler: handler
            }); else if (namespace.length > 0) for (var evNdx in eventRegistry) for (var nmsp in eventRegistry[evNdx]) if (nmsp === namespace) if (void 0 === handler) for (hndx = 0,
               hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) evts.push({
                  ev: evNdx,
                  namespace: nmsp,
                  handler: eventRegistry[evNdx][nmsp][hndx]
               }); else evts.push({
                  ev: evNdx,
                  namespace: nmsp,
                  handler: handler
               });
            return evts;
         }(nsEvent[0], nsEvent[1]), i = 0, offEventsL = offEvents.length; i < offEventsL; i++) !function (ev, namespace, handler) {
            if (ev in eventRegistry == 1) if (elem.removeEventListener ? elem.removeEventListener(ev, handler, !1) : elem.detachEvent && elem.detachEvent("on" + ev, handler),
               "global" === namespace) for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1); else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
         }(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
         return this;
      },
      trigger: function (events) {
         if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = "string" == typeof events ? events.split(" ") : [events.type], endx = 0; endx < _events.length; endx++) {
            var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
            if (void 0 !== document && "global" === namespace) {
               var evnt, i, params = {
                  bubbles: !0,
                  cancelable: !0,
                  detail: Array.prototype.slice.call(arguments, 1)
               };
               if (document.createEvent) {
                  try {
                     evnt = new CustomEvent(ev, params);
                  } catch (e) {
                     (evnt = document.createEvent("CustomEvent")).initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
                  }
                  events.type && DependencyLib.extend(evnt, events), elem.dispatchEvent(evnt);
               } else (evnt = document.createEventObject()).eventType = ev, events.type && DependencyLib.extend(evnt, events),
                  elem.fireEvent("on" + evnt.eventType, evnt);
            } else if (void 0 !== eventRegistry[ev]) if (arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event(arguments[0]),
               "global" === namespace) for (var nmsp in eventRegistry[ev]) for (i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments); else for (i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments);
         }
         return this;
      }
   }, DependencyLib.isFunction = function (obj) {
      return "function" == typeof obj;
   }, DependencyLib.noop = function () { }, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function (elem, arr, i) {
      return null == arr ? -1 : indexOf(arr, elem);
   }, DependencyLib.valHooks = void 0, DependencyLib.isPlainObject = function (obj) {
      return "object" == typeof obj && !obj.nodeType && !isWindow(obj) && !(obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"));
   }, DependencyLib.extend = function () {
      var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
      for ("boolean" == typeof target && (deep = target, target = arguments[i] || {},
         i++), "object" == typeof target || DependencyLib.isFunction(target) || (target = {}),
         i === length && (target = this, i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name],
            target !== (copy = options[name]) && (deep && copy && (DependencyLib.isPlainObject(copy) || (copyIsArray = DependencyLib.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1,
               clone = src && DependencyLib.isArray(src) ? src : []) : clone = src && DependencyLib.isPlainObject(src) ? src : {},
               target[name] = DependencyLib.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
      return target;
   }, DependencyLib.each = function (obj, callback) {
      var i = 0;
      if (isArraylike(obj)) for (var length = obj.length; i < length && !1 !== callback.call(obj[i], i, obj[i]); i++); else for (i in obj) if (!1 === callback.call(obj[i], i, obj[i])) break;
      return obj;
   }, DependencyLib.data = function (owner, key, value) {
      if (void 0 === value) return owner.__data ? owner.__data[key] : null;
      owner.__data = owner.__data || {}, owner.__data[key] = value;
   }, "function" == typeof window.CustomEvent ? DependencyLib.Event = window.CustomEvent : (DependencyLib.Event = function (event, params) {
      params = params || {
         bubbles: !1,
         cancelable: !1,
         detail: void 0
      };
      var evt = document.createEvent("CustomEvent");
      return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail),
         evt;
   }, DependencyLib.Event.prototype = window.Event.prototype), DependencyLib;
});



/*!
* inputmask.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-100
*/

!function (factory) {
   "function" == typeof define && define.amd ? define(["./dependencyLibs/inputmask.dependencyLib", "./global/window", "./global/document"], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./global/window"), require("./global/document")) : window.Inputmask = factory(window.dependencyLib || jQuery, window, document);
}(function ($, window, document, undefined) {
   function Inputmask(alias, options, internal) {
      if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
      this.el = undefined, this.events = {}, this.maskset = undefined, this.refreshValue = !1,
         !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {},
            alias && (options.alias = alias)), this.opts = $.extend(!0, {}, this.defaults, options),
            this.noMasksCache = options && options.definitions !== undefined, this.userOptions = options || {},
            this.isRTL = this.opts.numericInput, resolveAlias(this.opts.alias, options, this.opts));
   }
   function resolveAlias(aliasStr, options, opts) {
      var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
      return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, undefined, opts),
         $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr),
            !1);
   }
   function generateMaskSet(opts, nocache) {
      function generateMask(mask, metadata, opts) {
         var regexMask = !1;
         if (null !== mask && "" !== mask || ((regexMask = null !== opts.regex) ? mask = (mask = opts.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (regexMask = !0,
            mask = ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""),
            opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
            var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
            mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
         }
         var masksetDefinition, maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
         return Inputmask.prototype.masksCache[maskdefKey] === undefined || !0 === nocache ? (masksetDefinition = {
            mask: mask,
            maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
            validPositions: {},
            _buffer: undefined,
            buffer: undefined,
            tests: {},
            excludes: {},
            metadata: metadata,
            maskLength: undefined
         }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition,
            masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]),
            masksetDefinition;
      }
      if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
         if (opts.mask.length > 1) {
            if (null === opts.keepStatic) {
               opts.keepStatic = "auto";
               for (var i = 0; i < opts.mask.length; i++) if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                  opts.keepStatic = !0;
                  break;
               }
            }
            var altMask = opts.groupmarker[0];
            return $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
               altMask.length > 1 && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]),
                  msk.mask === undefined || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask;
            }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts);
         }
         opts.mask = opts.mask.pop();
      }
      return opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts);
   }
   function isInputEventSupported(eventName) {
      var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
      return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]),
         el = null, isSupported;
   }
   function maskScope(actionObj, maskset, opts) {
      function getMaskTemplate(baseOnInput, minimalPos, includeMode) {
         minimalPos = minimalPos || 0;
         var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition();
         do {
            !0 === baseOnInput && getMaskSet().validPositions[pos] ? (test = (testPos = getMaskSet().validPositions[pos]).match,
               ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))) : (test = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).match,
                  ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))),
               "auto" === opts.keepStatic && test.newBlockMarker && null !== test.fn && (opts.keepStatic = pos - 1),
               pos++;
         } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || minimalPos > pos);
         return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && getMaskSet().maskLength !== undefined || (getMaskSet().maskLength = pos - 1),
            maskTemplate;
      }
      function getMaskSet() {
         return maskset;
      }
      function resetMaskSet(soft) {
         var maskset = getMaskSet();
         maskset.buffer = undefined, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
      }
      function getLastValidPosition(closestTo, strict, validPositions) {
         var before = -1, after = -1, valids = validPositions || getMaskSet().validPositions;
         closestTo === undefined && (closestTo = -1);
         for (var posNdx in valids) {
            var psNdx = parseInt(posNdx);
            valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx),
               psNdx >= closestTo && (after = psNdx));
         }
         return -1 !== before && closestTo - before > 1 || after < closestTo ? before : after;
      }
      function stripValidPositions(start, end, nocheck, strict) {
         var i, startPos = start, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), needsValidation = !1;
         for (getMaskSet().p = start, i = end - 1; i >= startPos; i--) getMaskSet().validPositions[i] !== undefined && (!0 !== nocheck && (!getMaskSet().validPositions[i].match.optionality && function (pos) {
            var posMatch = getMaskSet().validPositions[pos];
            if (posMatch !== undefined && null === posMatch.match.fn) {
               var prevMatch = getMaskSet().validPositions[pos - 1], nextMatch = getMaskSet().validPositions[pos + 1];
               return prevMatch !== undefined && nextMatch !== undefined;
            }
            return !1;
         }(i) || !1 === opts.canClearPosition(getMaskSet(), i, getLastValidPosition(undefined, !0), strict, opts)) || delete getMaskSet().validPositions[i]);
         for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition();) {
            for (; getMaskSet().validPositions[startPos] !== undefined;) startPos++;
            if (i < startPos && (i = startPos + 1), getMaskSet().validPositions[i] === undefined && isMask(i)) i++; else {
               var t = getTestTemplate(i);
               !1 === needsValidation && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def ? (getMaskSet().validPositions[startPos] = $.extend(!0, {}, positionsClone[startPos]),
                  getMaskSet().validPositions[startPos].input = t.input, delete getMaskSet().validPositions[i],
                  i++) : positionCanMatchDefinition(startPos, t.match.def) ? !1 !== isValid(startPos, t.input || getPlaceholder(i), !0) && (delete getMaskSet().validPositions[i],
                     i++ , needsValidation = !0) : isMask(i) || (i++ , startPos--), startPos++;
            }
         }
         resetMaskSet(!0);
      }
      function determineTestTemplate(pos, tests, guessNextBest) {
         for (var testPos, altTest = getTest(pos = pos > 0 ? pos - 1 : 0), altArr = altTest.alternation !== undefined ? altTest.locator[altTest.alternation].toString().split(",") : [], ndx = 0; ndx < tests.length && (!((testPos = tests[ndx]).match && (opts.greedy && !0 !== testPos.match.optionalQuantifier || (!1 === testPos.match.optionality || !1 === testPos.match.newBlockMarker) && !0 !== testPos.match.optionalQuantifier) && (altTest.alternation === undefined || altTest.alternation !== testPos.alternation || testPos.locator[altTest.alternation] !== undefined && checkAlternationMatch(testPos.locator[altTest.alternation].toString().split(","), altArr))) || !0 === guessNextBest && (null !== testPos.match.fn || /[0-9a-bA-Z]/.test(testPos.match.def))); ndx++);
         return testPos;
      }
      function getDecisionTaker(tst) {
         var decisionTaker = tst.locator[tst.alternation];
         return "string" == typeof decisionTaker && decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]),
            decisionTaker !== undefined ? decisionTaker.toString() : "";
      }
      function getLocator(tst, align) {
         for (var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join(""); locator.length < align;) locator += "0";
         return locator;
      }
      function getTestTemplate(pos, ndxIntlzr, tstPs) {
         return getMaskSet().validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
      }
      function getTest(pos) {
         return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos] : getTests(pos)[0];
      }
      function positionCanMatchDefinition(pos, def) {
         for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
            valid = !0;
            break;
         }
         return valid;
      }
      function getTests(pos, ndxIntlzr, tstPs) {
         function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
            function handleMatch(match, loopNdx, quantifierRecurse) {
               function isFirstMatch(latestMatch, tokenGroup) {
                  var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                  return firstMatch || $.each(tokenGroup.matches, function (ndx, match) {
                     if (!0 === match.isQuantifier && (firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]))) return !1;
                  }), firstMatch;
               }
               function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                  var bestMatch, indexPos;
                  if ((getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [getMaskSet().validPositions[pos]], function (ndx, lmnt) {
                     if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                     var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation, ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                     (indexPos === undefined || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt,
                        indexPos = ndxPos);
                  }), bestMatch) {
                     var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
                     return (bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator).slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1);
                  }
                  return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
               }
               function isSubsetOf(source, target) {
                  function expand(pattern) {
                     for (var start, end, expanded = [], i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end;) expanded.push(String.fromCharCode(start)); else start = pattern.charCodeAt(i),
                        expanded.push(pattern.charAt(i));
                     return expanded.join("");
                  }
                  return opts.regex && null !== source.match.fn && null !== target.match.fn ? -1 !== expand(target.match.def.replace(/[\[\]]/g, "")).indexOf(expand(source.match.def.replace(/[\[\]]/g, ""))) : source.match.def === target.match.nativeDef;
               }
               function setMergeLocators(targetMatch, altMatch) {
                  if (altMatch === undefined || targetMatch.alternation === altMatch.alternation && -1 === targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation])) {
                     targetMatch.mloc = targetMatch.mloc || {};
                     var locNdx = targetMatch.locator[targetMatch.alternation];
                     if (locNdx !== undefined) {
                        if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), targetMatch.mloc[locNdx] === undefined && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()),
                           altMatch !== undefined) {
                           for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]),
                              targetMatch.mloc[ndx] === undefined && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                           targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",");
                        }
                        return !0;
                     }
                     targetMatch.alternation = undefined;
                  }
                  return !1;
               }
               if (testPos > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
               if (testPos === pos && match.matches === undefined) return matches.push({
                  match: match,
                  locator: loopNdx.reverse(),
                  cd: cacheDependency,
                  mloc: {}
               }), !0;
               if (match.matches !== undefined) {
                  if (match.isGroup && quantifierRecurse !== match) {
                     if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
                  } else if (match.isOptional) {
                     var optionalToken = match;
                     if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                        if (latestMatch = matches[matches.length - 1].match, !isFirstMatch(latestMatch, optionalToken)) return !0;
                        insertStop = !0, testPos = pos;
                     }
                  } else if (match.isAlternator) {
                     var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                     if (-1 === altIndex || "string" == typeof altIndex) {
                        var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                        if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                        if (getMaskSet().excludes[pos]) {
                           for (var altIndexArrClone = altIndexArr.slice(), i = 0, el = getMaskSet().excludes[pos].length; i < el; i++) altIndexArr.splice(altIndexArr.indexOf(getMaskSet().excludes[pos][i].toString()), 1);
                           0 === altIndexArr.length && (getMaskSet().excludes[pos] = undefined, altIndexArr = altIndexArrClone);
                        }
                        (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                        for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                           amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(),
                              alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) && (match = !0),
                              maltMatches = matches.slice(), testPos = currentPos, matches = [];
                           for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                              var altMatch = maltMatches[ndx1], dropMatch = !1;
                              altMatch.alternation = altMatch.alternation || loopNdxCnt, setMergeLocators(altMatch);
                              for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                 var altMatch2 = malternateMatches[ndx2];
                                 if ("string" != typeof altIndex || altMatch.alternation !== undefined && -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                    if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                       dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                                       break;
                                    }
                                    if (isSubsetOf(altMatch, altMatch2)) {
                                       setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                       break;
                                    }
                                    if (isSubsetOf(altMatch2, altMatch)) {
                                       setMergeLocators(altMatch2, altMatch);
                                       break;
                                    }
                                    if (function (source, target) {
                                       return null === source.match.fn && null !== target.match.fn && target.match.fn.test(source.match.def, getMaskSet(), pos, !1, opts, !1);
                                    }(altMatch, altMatch2)) {
                                       setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                       break;
                                    }
                                 }
                              }
                              dropMatch || malternateMatches.push(altMatch);
                           }
                        }
                        matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0,
                           match = malternateMatches.length > 0, ndxInitializer = ndxInitializerClone.slice();
                     } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                     if (match) return !0;
                  } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                     var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                     if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup)) {
                        if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1,
                           isFirstMatch(latestMatch, tokenGroup)) {
                           if (qndx > qt.quantifier.min - 1) {
                              insertStop = !0, testPos = pos;
                              break;
                           }
                           return !0;
                        }
                        return !0;
                     }
                  } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
               } else testPos++;
            }
            for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
               var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
               if (match && testPos === pos) return match;
               if (testPos > pos) break;
            }
         }
         var latestMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0], matches = [], insertStop = !1, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
         if (pos > -1) {
            if (ndxIntlzr === undefined) {
               for (var test, previousPos = pos - 1; (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && previousPos > -1;) previousPos--;
               test !== undefined && previousPos > -1 && (ndxInitializer = function (pos, tests) {
                  var locator = [];
                  return $.isArray(tests) || (tests = [tests]), tests.length > 0 && (tests[0].alternation === undefined ? 0 === (locator = determineTestTemplate(pos, tests.slice()).locator.slice()).length && (locator = tests[0].locator.slice()) : $.each(tests, function (ndx, tst) {
                     if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i]);
                  })), locator;
               }(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos);
            }
            if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return getMaskSet().tests[pos];
            for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length && !(resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]) && testPos === pos || testPos > pos); mtndx++);
         }
         return (0 === matches.length || insertStop) && matches.push({
            match: {
               fn: null,
               optionality: !0,
               casing: null,
               def: "",
               placeholder: ""
            },
            locator: [],
            mloc: {},
            cd: cacheDependency
         }), ndxIntlzr !== undefined && getMaskSet().tests[pos] ? $.extend(!0, [], matches) : (getMaskSet().tests[pos] = $.extend(!0, [], matches),
            getMaskSet().tests[pos]);
      }
      function getBufferTemplate() {
         return getMaskSet()._buffer === undefined && (getMaskSet()._buffer = getMaskTemplate(!1, 1),
            getMaskSet().buffer === undefined && (getMaskSet().buffer = getMaskSet()._buffer.slice())),
            getMaskSet()._buffer;
      }
      function getBuffer(noCache) {
         return getMaskSet().buffer !== undefined && !0 !== noCache || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)),
            getMaskSet().buffer;
      }
      function refreshFromBuffer(start, end, buffer) {
         var i, p;
         if (!0 === start) resetMaskSet(), start = 0, end = buffer.length; else for (i = start; i < end; i++) delete getMaskSet().validPositions[i];
         for (p = start, i = start; i < end; i++) if (resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter) {
            var valResult = isValid(p, buffer[i], !0, !0);
            !1 !== valResult && (resetMaskSet(!0), p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1);
         }
      }
      function casing(elem, test, pos) {
         switch (opts.casing || test.casing) {
            case "upper":
               elem = elem.toUpperCase();
               break;

            case "lower":
               elem = elem.toLowerCase();
               break;

            case "title":
               var posBefore = getMaskSet().validPositions[pos - 1];
               elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
               break;

            default:
               if ($.isFunction(opts.casing)) {
                  var args = Array.prototype.slice.call(arguments);
                  args.push(getMaskSet().validPositions), elem = opts.casing.apply(this, args);
               }
         }
         return elem;
      }
      function checkAlternationMatch(altArr1, altArr2, na) {
         for (var naNdx, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = na !== undefined ? na.split(",") : [], i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
         for (var alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
            isMatch = !0;
            break;
         }
         return isMatch;
      }
      function alternate(pos, c, strict, fromSetValid, rAltPos) {
         var lastAlt, alternation, altPos, prevAltPos, i, validPos, decisionPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), isValidRslt = !1, lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition();
         if (-1 === lAltPos && rAltPos === undefined) alternation = (prevAltPos = getTest(lastAlt = 0)).alternation; else for (; lAltPos >= 0; lAltPos--) if ((altPos = getMaskSet().validPositions[lAltPos]) && altPos.alternation !== undefined) {
            if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
            lastAlt = lAltPos, alternation = getMaskSet().validPositions[lastAlt].alternation,
               prevAltPos = altPos;
         }
         if (alternation !== undefined) {
            decisionPos = parseInt(lastAlt), getMaskSet().excludes[decisionPos] = getMaskSet().excludes[decisionPos] || [],
               !0 !== pos && getMaskSet().excludes[decisionPos].push(getDecisionTaker(prevAltPos));
            var validInputsClone = [], staticInputsBeforePos = 0;
            for (i = decisionPos; i < getLastValidPosition(undefined, !0) + 1; i++) (validPos = getMaskSet().validPositions[i]) && !0 !== validPos.generatedInput && /[0-9a-bA-Z]/.test(validPos.input) ? validInputsClone.push(validPos.input) : i < pos && staticInputsBeforePos++ ,
               delete getMaskSet().validPositions[i];
            for (; getMaskSet().excludes[decisionPos] && getMaskSet().excludes[decisionPos].length < 10;) {
               var posOffset = -1 * staticInputsBeforePos, validInputs = validInputsClone.slice();
               for (getMaskSet().tests[decisionPos] = undefined, resetMaskSet(!0), isValidRslt = !0; validInputs.length > 0;) {
                  var input = validInputs.shift();
                  if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition(undefined, !0) + 1, input, !1, fromSetValid, !0))) break;
               }
               if (isValidRslt && c !== undefined) {
                  var targetLvp = getLastValidPosition(pos) + 1;
                  for (i = decisionPos; i < getLastValidPosition() + 1; i++) ((validPos = getMaskSet().validPositions[i]) === undefined || null == validPos.match.fn) && i < pos + posOffset && posOffset++;
                  isValidRslt = isValid((pos += posOffset) > targetLvp ? targetLvp : pos, c, strict, fromSetValid, !0);
               }
               if (isValidRslt) break;
               if (resetMaskSet(), prevAltPos = getTest(decisionPos), getMaskSet().validPositions = $.extend(!0, {}, validPsClone),
                  !getMaskSet().excludes[decisionPos]) {
                  isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                  break;
               }
               var decisionTaker = getDecisionTaker(prevAltPos);
               if (-1 !== getMaskSet().excludes[decisionPos].indexOf(decisionTaker)) {
                  isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                  break;
               }
               for (getMaskSet().excludes[decisionPos].push(decisionTaker), i = decisionPos; i < getLastValidPosition(undefined, !0) + 1; i++) delete getMaskSet().validPositions[i];
            }
         }
         return getMaskSet().excludes[decisionPos] = undefined, isValidRslt;
      }
      function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
         function isSelection(posObj) {
            return isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end == 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin == 1;
         }
         function _isValid(position, c, strict) {
            var rslt = !1;
            return $.each(getTests(position), function (ndx, tst) {
               var test = tst.match;
               if (getBuffer(!0), !1 !== (rslt = null != test.fn ? test.fn.test(c, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                  c: getPlaceholder(position, test, !0) || test.def,
                  pos: position
               })) {
                  var elem = rslt.c !== undefined ? rslt.c : c;
                  elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? getPlaceholder(position, test, !0) || test.def : elem;
                  var validatedPos = position, possibleModifiedBuffer = getBuffer();
                  if (rslt.remove !== undefined && ($.isArray(rslt.remove) || (rslt.remove = [rslt.remove]),
                     $.each(rslt.remove.sort(function (a, b) {
                        return b - a;
                     }), function (ndx, lmnt) {
                        stripValidPositions(lmnt, lmnt + 1, !0);
                     })), rslt.insert !== undefined && ($.isArray(rslt.insert) || (rslt.insert = [rslt.insert]),
                        $.each(rslt.insert.sort(function (a, b) {
                           return a - b;
                        }), function (ndx, lmnt) {
                           isValid(lmnt.pos, lmnt.c, !0, fromSetValid);
                        })), rslt.refreshFromBuffer) {
                     var refresh = rslt.refreshFromBuffer;
                     if (refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, possibleModifiedBuffer),
                        rslt.pos === undefined && rslt.c === undefined) return rslt.pos = getLastValidPosition(),
                           !1;
                     if ((validatedPos = rslt.pos !== undefined ? rslt.pos : position) !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0, fromSetValid)),
                        !1;
                  } else if (!0 !== rslt && rslt.pos !== undefined && rslt.pos !== position && (validatedPos = rslt.pos,
                     refreshFromBuffer(position, validatedPos, getBuffer().slice()), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)),
                        !1;
                  return (!0 === rslt || rslt.pos !== undefined || rslt.c !== undefined) && (ndx > 0 && resetMaskSet(!0),
                     setValidPosition(validatedPos, $.extend({}, tst, {
                        input: casing(elem, test, validatedPos)
                     }), fromSetValid, isSelection(pos)) || (rslt = !1), !1);
               }
            }), rslt;
         }
         function trackbackPositions(originalPos, newPos, fillOnly) {
            var result;
            if (originalPos === undefined) for (originalPos = newPos - 1; originalPos > 0 && !getMaskSet().validPositions[originalPos]; originalPos--);
            for (var ps = originalPos; ps < newPos; ps++) if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, !0)) {
               var vp = 0 == ps ? getTest(ps) : getMaskSet().validPositions[ps - 1];
               if (vp) {
                  var tstLocator, targetLocator = getLocator(vp), tests = getTests(ps).slice(), closest = undefined, bestMatch = getTest(ps);
                  if ("" === tests[tests.length - 1].match.def && tests.pop(), $.each(tests, function (ndx, tst) {
                     tstLocator = getLocator(tst, targetLocator.length);
                     var distance = Math.abs(tstLocator - targetLocator);
                     (closest === undefined || distance < closest) && null === tst.match.fn && !0 !== tst.match.optionality && !0 !== tst.match.optionalQuantifier && (closest = distance,
                        bestMatch = tst);
                  }), bestMatch = $.extend({}, bestMatch, {
                     input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def
                  }), bestMatch.generatedInput = !0, setValidPosition(ps, bestMatch, !0), !0 !== fillOnly) {
                     var cvpInput = getMaskSet().validPositions[newPos].input;
                     getMaskSet().validPositions[newPos] = undefined, result = isValid(newPos, cvpInput, !0, !0);
                  }
               }
            }
            return result;
         }
         function setValidPosition(pos, validTest, fromSetValid, isSelection) {
            if (isSelection || opts.insertMode && getMaskSet().validPositions[pos] !== undefined && fromSetValid === undefined) {
               var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition(undefined, !0);
               for (i = pos; i <= lvp; i++) delete getMaskSet().validPositions[i];
               getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
               var j, valid = !0, vps = getMaskSet().validPositions, needsValidation = !1;
               for (i = j = pos; i <= lvp; i++) {
                  var t = positionsClone[i];
                  if (t !== undefined) for (var posMatch = j; "" !== getTest(posMatch).match.def && (null === t.match.fn && vps[i] && (!0 === vps[i].match.optionalQuantifier || !0 === vps[i].match.optionality) || null != t.match.fn);) {
                     if (posMatch++ , !1 === needsValidation && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def) getMaskSet().validPositions[posMatch] = $.extend(!0, {}, positionsClone[posMatch]),
                        getMaskSet().validPositions[posMatch].input = t.input, trackbackPositions(undefined, posMatch, !0),
                        j = posMatch, valid = !0; else if (positionCanMatchDefinition(posMatch, t.match.def)) {
                           var result = isValid(posMatch, t.input, !0, !0);
                           valid = !1 !== result, j = result.caret || result.insert ? getLastValidPosition() : posMatch,
                              needsValidation = !0;
                        } else if (!(valid = !0 === t.generatedInput) && "" === getTest(posMatch).match.def) break;
                     if (valid) break;
                  }
                  if (!valid) break;
               }
               if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone),
                  resetMaskSet(!0), !1;
            } else getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
            return resetMaskSet(!0), !0;
         }
         strict = !0 === strict;
         var maskPos = pos;
         pos.begin !== undefined && (maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin);
         var result = !0, positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
         if ($.isFunction(opts.preValidation) && !strict && !0 !== fromSetValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts)),
            !0 === result) {
            if (trackbackPositions(undefined, maskPos, !0), isSelection(pos) && (handleRemove(undefined, Inputmask.keyCode.DELETE, pos, !0, !0),
               maskPos = getMaskSet().p), (maxLength === undefined || maskPos < maxLength) && (result = _isValid(maskPos, c, strict),
                  (!strict || !0 === fromSetValid) && !1 === result && !0 !== validateOnly)) {
               var currentPosValid = getMaskSet().validPositions[maskPos];
               if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                  if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (!1 !== (result = _isValid(nPos, c, strict))) {
                     result = trackbackPositions(maskPos, result.pos !== undefined ? result.pos : nPos) || result,
                        maskPos = nPos;
                     break;
                  }
               } else result = {
                  caret: seekNext(maskPos)
               };
            }
            !1 !== result || null === opts.keepStatic || !1 === opts.keepStatic || strict || !0 === fromAlternate || (result = alternate(maskPos, c, strict, fromSetValid)),
               !0 === result && (result = {
                  pos: maskPos
               });
         }
         if ($.isFunction(opts.postValidation) && !1 !== result && !strict && !0 !== fromSetValid && !0 !== validateOnly) {
            var postResult = opts.postValidation(getBuffer(!0), result, opts);
            if (postResult !== undefined) {
               if (postResult.refreshFromBuffer && postResult.buffer) {
                  var refresh = postResult.refreshFromBuffer;
                  refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, postResult.buffer);
               }
               result = !0 === postResult ? result : postResult;
            }
         }
         return result && result.pos === undefined && (result.pos = maskPos), !1 !== result && !0 !== validateOnly || (resetMaskSet(!0),
            getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result;
      }
      function isMask(pos, strict) {
         var test = getTestTemplate(pos).match;
         if ("" === test.def && (test = getTest(pos).match), null != test.fn) return test.fn;
         if (!0 !== strict && pos > -1) {
            var tests = getTests(pos);
            return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
         }
         return !1;
      }
      function seekNext(pos, newBlock) {
         for (var position = pos + 1; "" !== getTest(position).match.def && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position)) || !0 !== newBlock && !isMask(position));) position++;
         return position;
      }
      function seekPrevious(pos, newBlock) {
         var tests, position = pos;
         if (position <= 0) return 0;
         for (; --position > 0 && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position) && ((tests = getTests(position)).length < 2 || 2 === tests.length && "" === tests[1].match.def)););
         return position;
      }
      function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
         if (event && $.isFunction(opts.onBeforeWrite)) {
            var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
            if (result) {
               if (result.refreshFromBuffer) {
                  var refresh = result.refreshFromBuffer;
                  refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer),
                     buffer = getBuffer(!0);
               }
               caretPos !== undefined && (caretPos = result.caret !== undefined ? result.caret : caretPos);
            }
         }
         input !== undefined && (input.inputmask._valueSet(buffer.join("")), caretPos === undefined || event !== undefined && "blur" === event.type ? renderColorMask(input, caretPos, 0 === buffer.length) : caret(input, caretPos),
            !0 === triggerInputEvent && (skipInputEvent = !0, $(input).trigger("input")));
      }
      function getPlaceholder(pos, test, returnPL) {
         if ((test = test || getTest(pos).match).placeholder !== undefined || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
         if (null === test.fn) {
            if (pos > -1 && getMaskSet().validPositions[pos] === undefined) {
               var prevTest, tests = getTests(pos), staticAlternations = [];
               if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (null === tests[i].match.fn || prevTest === undefined || !1 !== tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts)) && (staticAlternations.push(tests[i]),
                  null === tests[i].match.fn && (prevTest = tests[i]), staticAlternations.length > 1 && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
            }
            return test.def;
         }
         return opts.placeholder.charAt(pos % opts.placeholder.length);
      }
      function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
         function isTemplateMatch(ndx, charCodes) {
            return -1 !== getMaskTemplate(!0, 0, !1).slice(ndx, seekNext(ndx)).join("").indexOf(charCodes) && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || " " === getTest(ndx).match.nativeDef && getTest(ndx + 1).match.nativeDef === charCodes.charAt(0));
         }
         var inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = undefined;
         if (resetMaskSet(), strict || !0 === opts.autoUnmask) initialNdx = seekNext(initialNdx); else {
            var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
            matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length),
               initialNdx = seekNext(initialNdx));
         }
         -1 === initialNdx ? (getMaskSet().p = seekNext(initialNdx), initialNdx = 0) : getMaskSet().p = initialNdx,
            $.each(inputValue, function (ndx, charCode) {
               if (charCode !== undefined) if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, undefined, undefined, !0)) getMaskSet().p++; else {
                  var keypress = new $.Event("_checkval");
                  keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                  var lvp = getLastValidPosition(undefined, !0), prevTest = getTest(lvp), nextTest = getTestTemplate(lvp + 1, prevTest ? prevTest.locator.slice() : undefined, lvp);
                  if (!isTemplateMatch(initialNdx, charCodes) || strict || opts.autoUnmask) {
                     var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                     (result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, pos)) && (initialNdx = pos + 1,
                        charCodes = "");
                  } else result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
                  writeBuffer(undefined, getBuffer(), result.forwardPosition, keypress, !1);
               }
            }), writeOut && writeBuffer(input, getBuffer(), result ? result.forwardPosition : undefined, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type);
      }
      function unmaskedvalue(input) {
         if (input) {
            if (input.inputmask === undefined) return input.value;
            input.inputmask && input.inputmask.refreshValue && EventHandlers.setValueEvent.call(input);
         }
         var umValue = [], vps = getMaskSet().validPositions;
         for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
         var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
         if ($.isFunction(opts.onUnMask)) {
            var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
            unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
         }
         return unmaskedValue;
      }
      function caret(input, begin, end, notranslate) {
         function translatePosition(pos) {
            return !0 === notranslate || !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || (pos = input.inputmask.__valueGet.call(input).length - pos),
               pos;
         }
         var range;
         if (begin === undefined) return input.setSelectionRange ? (begin = input.selectionStart,
            end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset,
               end = range.endOffset) : document.selection && document.selection.createRange && (end = (begin = 0 - (range = document.selection.createRange()).duplicate().moveStart("character", -input.inputmask._valueGet().length)) + range.text.length),
            {
               begin: translatePosition(begin),
               end: translatePosition(end)
            };
         if ($.isArray(begin) && (end = isRTL ? begin[0] : begin[1], begin = isRTL ? begin[1] : begin[0]),
            begin.begin !== undefined && (end = isRTL ? begin.begin : begin.end, begin = isRTL ? begin.end : begin.begin),
            "number" == typeof begin) {
            begin = translatePosition(begin), end = "number" == typeof (end = translatePosition(end)) ? end : begin;
            var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
            if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, !1 === opts.insertMode && begin === end && end++ ,
               input.inputmask.caretPos = {
                  begin: begin,
                  end: end
               }, input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end; else if (window.getSelection) {
                  if (range = document.createRange(), input.firstChild === undefined || null === input.firstChild) {
                     var textNode = document.createTextNode("");
                     input.appendChild(textNode);
                  }
                  range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length),
                     range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length),
                     range.collapse(!0);
                  var sel = window.getSelection();
                  sel.removeAllRanges(), sel.addRange(range);
               } else input.createTextRange && ((range = input.createTextRange()).collapse(!0),
                  range.moveEnd("character", end), range.moveStart("character", begin), range.select());
            renderColorMask(input, {
               begin: begin,
               end: end
            });
         }
      }
      function determineLastRequiredPosition(returnDefinition) {
         var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined;
         for (pos = lvp + 1; pos < buffer.length; pos++) ndxIntlzr = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).locator.slice(),
            positions[pos] = $.extend(!0, {}, testPos);
         var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
         for (pos = bl - 1; pos > lvp && (((testPos = positions[pos]).match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
         return returnDefinition ? {
            l: bl,
            def: positions[bl] ? positions[bl].match : undefined
         } : bl;
      }
      function clearOptionalTail(buffer) {
         for (var validPos, rl = determineLastRequiredPosition(), bl = buffer.length, lv = getMaskSet().validPositions[getLastValidPosition()]; rl < bl && !isMask(rl, !0) && (validPos = lv !== undefined ? getTestTemplate(rl, lv.locator.slice(""), lv) : getTest(rl)) && !0 !== validPos.match.optionality && (!0 !== validPos.match.optionalQuantifier && !0 !== validPos.match.newBlockMarker || rl + 1 === bl && "" === (lv !== undefined ? getTestTemplate(rl + 1, lv.locator.slice(""), lv) : getTest(rl + 1)).match.def);) rl++;
         for (; (validPos = getMaskSet().validPositions[rl - 1]) && validPos && validPos.match.optionality && validPos.input === opts.skipOptionalPartCharacter;) rl--;
         return buffer.splice(rl), buffer;
      }
      function isComplete(buffer) {
         if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
         if ("*" === opts.repeat) return undefined;
         var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
         if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
            complete = !0;
            for (var i = 0; i <= aml; i++) {
               var test = getTestTemplate(i).match;
               if (null !== test.fn && getMaskSet().validPositions[i] === undefined && !0 !== test.optionality && !0 !== test.optionalQuantifier || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
                  complete = !1;
                  break;
               }
            }
         }
         return complete;
      }
      function handleRemove(input, k, pos, strict, fromIsValid) {
         if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE),
            isRTL)) {
            var pend = pos.end;
            pos.end = pos.begin, pos.begin = pend;
         }
         if (k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || !1 === opts.insertMode) ? (pos.begin = seekPrevious(pos.begin),
            getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext(pos.end) + 1,
               getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.end++),
            stripValidPositions(pos.begin, pos.end, !1, strict), !0 !== strict && null !== opts.keepStatic && !1 !== opts.keepStatic) {
            var result = alternate(!0);
            result && (pos.begin = result.caret !== undefined ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, !0));
         }
         var lvp = getLastValidPosition(pos.begin, !0);
         if (lvp < pos.begin || -1 === pos.begin) getMaskSet().p = seekNext(lvp); else if (!0 !== strict && (getMaskSet().p = pos.begin,
            !0 !== fromIsValid)) for (; getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined;) getMaskSet().p++;
      }
      function initializeColorMask(input) {
         function findCaretPos(clientx) {
            var caretPos, e = document.createElement("span");
            for (var style in computedStyle) isNaN(style) && -1 !== style.indexOf("font") && (e.style[style] = computedStyle[style]);
            e.style.textTransform = computedStyle.textTransform, e.style.letterSpacing = computedStyle.letterSpacing,
               e.style.position = "absolute", e.style.height = "auto", e.style.width = "auto",
               e.style.visibility = "hidden", e.style.whiteSpace = "nowrap", document.body.appendChild(e);
            var itl, inputText = input.inputmask._valueGet(), previousWidth = 0;
            for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
               if (e.innerHTML += inputText.charAt(caretPos) || "_", e.offsetWidth >= clientx) {
                  var offset1 = clientx - previousWidth, offset2 = e.offsetWidth - clientx;
                  e.innerHTML = inputText.charAt(caretPos), caretPos = (offset1 -= e.offsetWidth / 3) < offset2 ? caretPos - 1 : caretPos;
                  break;
               }
               previousWidth = e.offsetWidth;
            }
            return document.body.removeChild(e), caretPos;
         }
         var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null), template = document.createElement("div");
         template.style.width = computedStyle.width, template.style.textAlign = computedStyle.textAlign,
            colorMask = document.createElement("div"), input.inputmask.colorMask = colorMask,
            colorMask.className = "im-colormask", input.parentNode.insertBefore(colorMask, input),
            input.parentNode.removeChild(input), colorMask.appendChild(template), colorMask.appendChild(input),
            input.style.left = template.offsetLeft + "px", $(input).on("click", function (e) {
               return caret(input, findCaretPos(e.clientX)), EventHandlers.clickEvent.call(input, [e]);
            }), $(input).on("keydown", function (e) {
               e.shiftKey || !1 === opts.insertMode || setTimeout(function () {
                  renderColorMask(input);
               }, 0);
            });
      }
      function renderColorMask(input, caretPos, clear) {
         function setEntry(entry) {
            if (entry === undefined && (entry = ""), isStatic || null !== test.fn && testPos.input !== undefined) if (isStatic && (null !== test.fn && testPos.input !== undefined || "" === test.def)) {
               isStatic = !1;
               var mtl = maskTemplate.length;
               maskTemplate[mtl - 1] = maskTemplate[mtl - 1] + "</span>", maskTemplate.push(entry);
            } else maskTemplate.push(entry); else isStatic = !0, maskTemplate.push("<span class='im-static'>" + entry);
         }
         var test, testPos, ndxIntlzr, maskTemplate = [], isStatic = !1, pos = 0;
         if (colorMask !== undefined) {
            var buffer = getBuffer();
            if (caretPos === undefined ? caretPos = caret(input) : caretPos.begin === undefined && (caretPos = {
               begin: caretPos,
               end: caretPos
            }), !0 !== clear) {
               var lvp = getLastValidPosition();
               do {
                  getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos],
                     test = testPos.match, ndxIntlzr = testPos.locator.slice(), setEntry(buffer[pos])) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1),
                        test = testPos.match, ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && setEntry(getPlaceholder(pos, test))),
                     pos++;
               } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || lvp > pos || isStatic);
               isStatic && setEntry(), document.activeElement === input && (maskTemplate.splice(caretPos.begin, 0, caretPos.begin === caretPos.end ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">'),
                  maskTemplate.splice(caretPos.end + 1, 0, "</mark>"));
            }
            var template = colorMask.getElementsByTagName("div")[0];
            template.innerHTML = maskTemplate.join(""), input.inputmask.positionColorMask(input, template);
         }
      }
      maskset = maskset || this.maskset, opts = opts || this.opts;
      var undoValue, $el, maxLength, colorMask, inputmask = this, el = this.el, isRTL = this.isRTL, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !1, trackCaret = !1, EventRuler = {
         on: function (input, eventName, eventHandler) {
            var ev = function (e) {
               var that = this;
               if (that.inputmask === undefined && "FORM" !== this.nodeName) {
                  var imOpts = $.data(that, "_inputmask_opts");
                  imOpts ? new Inputmask(imOpts).mask(that) : EventRuler.off(that);
               } else {
                  if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                     switch (e.type) {
                        case "input":
                           if (!0 === skipInputEvent) return skipInputEvent = !1, e.preventDefault();
                           mobile && (trackCaret = !0);
                           break;

                        case "keydown":
                           skipKeyPressEvent = !1, skipInputEvent = !1;
                           break;

                        case "keypress":
                           if (!0 === skipKeyPressEvent) return e.preventDefault();
                           skipKeyPressEvent = !0;
                           break;

                        case "click":
                           if (iemobile || iphone) {
                              var args = arguments;
                              return setTimeout(function () {
                                 eventHandler.apply(that, args);
                              }, 0), !1;
                           }
                     }
                     var returnVal = eventHandler.apply(that, arguments);
                     return trackCaret && (trackCaret = !1, setTimeout(function () {
                        caret(that, that.inputmask.caretPos, undefined, !0);
                     })), !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                  }
                  e.preventDefault();
               }
            };
            input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev),
               -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
         },
         off: function (input, event) {
            if (input.inputmask && input.inputmask.events) {
               var events;
               event ? (events = [])[event] = input.inputmask.events[event] : events = input.inputmask.events,
                  $.each(events, function (eventName, evArr) {
                     for (; evArr.length > 0;) {
                        var ev = evArr.pop();
                        -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                     }
                     delete input.inputmask.events[eventName];
                  });
            }
         }
      }, EventHandlers = {
         keydownEvent: function (e) {
            var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
            if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) e.preventDefault(),
               handleRemove(0, k, pos), writeBuffer(input, getBuffer(!0), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join("")),
               input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(getBuffer()) && $input.trigger("complete"); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                  e.preventDefault();
                  var caretPos = seekNext(getLastValidPosition());
                  opts.insertMode || caretPos !== getMaskSet().maskLength || e.shiftKey || caretPos-- ,
                     caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
               } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(),
                  caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")),
                     $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? (!0 === e.shiftKey ? (null === getTest(pos.begin).match.fn && (pos.begin = seekNext(pos.begin)),
                        pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0),
                           pos.end = seekNext(pos.begin, !0), pos.end < getMaskSet().maskLength && pos.end--),
                        pos.begin < getMaskSet().maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || !1 === opts.insertMode && (k === Inputmask.keyCode.RIGHT ? setTimeout(function () {
                           var caretPos = caret(input);
                           caret(input, caretPos.begin);
                        }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function () {
                           var caretPos = caret(input);
                           caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
                        }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskSet().maskLength ? pos.begin : pos.begin - 1));
            opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables);
         },
         keypressEvent: function (e, checkval, writeOut, strict, ndx) {
            var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
            if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""),
               setTimeout(function () {
                  $input.trigger("change");
               }, 0)), !0;
            if (k) {
               46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
               var forwardPosition, pos = checkval ? {
                  begin: ndx,
                  end: ndx
               } : caret(input), c = String.fromCharCode(k);
               getMaskSet().writeOutBuffer = !0;
               var valResult = isValid(pos, c, strict);
               if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos),
                  getMaskSet().p = forwardPosition), forwardPosition = opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition,
                  !1 !== writeOut && (setTimeout(function () {
                     opts.onKeyValidation.call(input, k, valResult, opts);
                  }, 0), getMaskSet().writeOutBuffer && !1 !== valResult)) {
                  var buffer = getBuffer();
                  writeBuffer(input, buffer, forwardPosition, e, !0 !== checkval), !0 !== checkval && setTimeout(function () {
                     !0 === isComplete(buffer) && $input.trigger("complete");
                  }, 0);
               }
               if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition),
                  valResult;
            }
         },
         pasteEvent: function (e) {
            var tempValue, input = this, ev = e.originalEvent || e, $input = $(input), inputValue = input.inputmask._valueGet(!0), caretPos = caret(input);
            isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
            var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
            if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""),
               valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""),
               isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue),
               window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
               if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
               inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
            }
            var pasteValue = inputValue;
            if ($.isFunction(opts.onBeforePaste)) {
               if (!1 === (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts))) return e.preventDefault();
               pasteValue || (pasteValue = inputValue);
            }
            return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")),
               writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")),
               !0 === isComplete(getBuffer()) && $input.trigger("complete"), e.preventDefault();
         },
         inputFallBackEvent: function (e) {
            var input = this, inputValue = input.inputmask._valueGet();
            if (getBuffer().join("") !== inputValue) {
               var caretPos = caret(input);
               if (inputValue = function (input, inputValue, caretPos) {
                  return "." === inputValue.charAt(caretPos.begin - 1) && "" !== opts.radixPoint && ((inputValue = inputValue.split(""))[caretPos.begin - 1] = opts.radixPoint.charAt(0),
                     inputValue = inputValue.join("")), inputValue;
               }(0, inputValue, caretPos), inputValue = function (input, inputValue, caretPos) {
                  if (iemobile) {
                     var inputChar = inputValue.replace(getBuffer().join(""), "");
                     if (1 === inputChar.length) {
                        var iv = inputValue.split("");
                        iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
                     }
                  }
                  return inputValue;
               }(0, inputValue, caretPos), getBuffer().join("") !== inputValue) {
                  var buffer = getBuffer().join(""), offset = inputValue.length > buffer.length ? -1 : 0, frontPart = inputValue.substr(0, caretPos.begin), backPart = inputValue.substr(caretPos.begin), frontBufferPart = buffer.substr(0, caretPos.begin + offset), backBufferPart = buffer.substr(caretPos.begin + offset), selection = caretPos, entries = "", isEntry = !1;
                  if (frontPart !== frontBufferPart) {
                     for (var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length, i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++);
                     isEntry && (0 === offset && (selection.begin = i), entries += frontPart.slice(i, selection.end));
                  }
                  if (backPart !== backBufferPart && (backPart.length > backBufferPart.length ? entries += backPart.slice(0, 1) : backPart.length < backBufferPart.length && (selection.end += backBufferPart.length - backPart.length,
                     isEntry || "" === opts.radixPoint || "" !== backPart || frontPart.charAt(selection.begin + offset - 1) !== opts.radixPoint || (selection.begin-- ,
                        entries = opts.radixPoint))), writeBuffer(input, getBuffer(), {
                           begin: selection.begin + offset,
                           end: selection.end + offset
                        }), entries.length > 0) $.each(entries.split(""), function (ndx, entry) {
                           var keypress = new $.Event("keypress");
                           keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
                        }); else {
                     selection.begin === selection.end - 1 && (selection.begin = seekPrevious(selection.begin + 1),
                        selection.begin === selection.end - 1 ? caret(input, selection.begin) : caret(input, selection.begin, selection.end));
                     var keydown = new $.Event("keydown");
                     keydown.keyCode = Inputmask.keyCode.DELETE, EventHandlers.keydownEvent.call(input, keydown),
                        !1 === opts.insertMode && caret(input, caret(input).begin - 1);
                  }
                  e.preventDefault();
               }
            }
         },
         setValueEvent: function (e) {
            this.inputmask.refreshValue = !1;
            var input = this, value = input.inputmask._valueGet(!0);
            $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value),
               value = value.split(""), checkVal(input, !0, !1, isRTL ? value.reverse() : value),
               undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && input.inputmask._valueSet("");
         },
         focusEvent: function (e) {
            var input = this, nptValue = input.inputmask._valueGet();
            opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) && (input.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : !1 === mouseEnter && caret(input, seekNext(getLastValidPosition()))),
               !0 === opts.positionCaretOnTab && !1 === mouseEnter && EventHandlers.clickEvent.apply(input, [e, !0]),
               undoValue = getBuffer().join("");
         },
         mouseleaveEvent: function (e) {
            var input = this;
            if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== input) {
               var buffer = getBuffer().slice(), nptValue = input.inputmask._valueGet();
               nptValue !== input.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer),
                  writeBuffer(input, buffer));
            }
         },
         clickEvent: function (e, tabbed) {
            function doRadixFocus(clickPos) {
               if ("" !== opts.radixPoint) {
                  var vps = getMaskSet().validPositions;
                  if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
                     if (clickPos < seekNext(-1)) return !0;
                     var radixPos = $.inArray(opts.radixPoint, getBuffer());
                     if (-1 !== radixPos) {
                        for (var vp in vps) if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                        return !0;
                     }
                  }
               }
               return !1;
            }
            var input = this;
            setTimeout(function () {
               if (document.activeElement === input) {
                  var selectedCaret = caret(input);
                  if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end),
                     selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                        case "none":
                           break;

                        case "select":
                           caret(input, 0, getBuffer().length);
                           break;

                        case "radixFocus":
                           if (doRadixFocus(selectedCaret.begin)) {
                              var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                              caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                              break;
                           }

                        default:
                           var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition, !0), lastPosition = seekNext(lvclickPosition);
                           if (clickPosition < lastPosition) caret(input, isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition)); else {
                              var lvp = getMaskSet().validPositions[lvclickPosition], tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp), placeholder = getPlaceholder(lastPosition, tt.match);
                              if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, !0) && tt.match.def === placeholder) {
                                 var newPos = seekNext(lastPosition);
                                 (clickPosition >= newPos || clickPosition === lastPosition) && (lastPosition = newPos);
                              }
                              caret(input, lastPosition);
                           }
                     }
               }
            }, 0);
         },
         dblclickEvent: function (e) {
            var input = this;
            setTimeout(function () {
               caret(input, 0, seekNext(getLastValidPosition()));
            }, 0);
         },
         cutEvent: function (e) {
            var input = this, $input = $(input), pos = caret(input), ev = e.originalEvent || e, clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
            clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")),
               document.execCommand && document.execCommand("copy"), handleRemove(0, Inputmask.keyCode.DELETE, pos),
               writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")),
               input.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared");
         },
         blurEvent: function (e) {
            var $input = $(this), input = this;
            if (input.inputmask) {
               var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
               "" === nptValue && colorMask === undefined || (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)),
                  !1 === isComplete(buffer) && (setTimeout(function () {
                     $input.trigger("incomplete");
                  }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())),
                  writeBuffer(input, buffer, undefined, e)), undoValue !== getBuffer().join("") && (undoValue = buffer.join(""),
                     $input.trigger("change"));
            }
         },
         mouseenterEvent: function (e) {
            var input = this;
            mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer());
         },
         submitEvent: function (e) {
            undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""),
               opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0),
                  setTimeout(function () {
                     writeBuffer(el, getBuffer());
                  }, 0));
         },
         resetEvent: function (e) {
            el.inputmask.refreshValue = !0, setTimeout(function () {
               $el.trigger("setvalue");
            }, 0);
         }
      };
      Inputmask.prototype.positionColorMask = function (input, template) {
         input.style.left = template.offsetLeft + "px";
      };
      var valueBuffer;
      if (actionObj !== undefined) switch (actionObj.action) {
         case "isComplete":
            return el = actionObj.el, isComplete(getBuffer());

         case "unmaskedvalue":
            return el !== undefined && actionObj.value === undefined || (valueBuffer = actionObj.value,
               valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer : valueBuffer).split(""),
               checkVal(undefined, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts)),
               unmaskedvalue(el);

         case "mask":
            !function (elem) {
               EventRuler.off(elem);
               var isSupported = function (input, opts) {
                  var elementType = input.getAttribute("type"), isSupported = "INPUT" === input.tagName && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "TEXTAREA" === input.tagName;
                  if (!isSupported) if ("INPUT" === input.tagName) {
                     var el = document.createElement("input");
                     el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
                  } else isSupported = "partial";
                  return !1 !== isSupported ? function (npt) {
                     function getter() {
                        return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
                     }
                     function setter(value) {
                        valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue");
                     }
                     var valueGet, valueSet;
                     if (!npt.inputmask.__valueGet) {
                        if (!0 !== opts.noValuePatching) {
                           if (Object.getOwnPropertyDescriptor) {
                              "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function (object) {
                                 return object.__proto__;
                              } : function (object) {
                                 return object.constructor.prototype;
                              });
                              var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
                              valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get,
                                 valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                    get: getter,
                                    set: setter,
                                    configurable: !0
                                 })) : "INPUT" !== npt.tagName && (valueGet = function () {
                                    return this.textContent;
                                 }, valueSet = function (value) {
                                    this.textContent = value;
                                 }, Object.defineProperty(npt, "value", {
                                    get: getter,
                                    set: setter,
                                    configurable: !0
                                 }));
                           } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"),
                              valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter),
                              npt.__defineSetter__("value", setter));
                           npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                        }
                        npt.inputmask._valueGet = function (overruleRTL) {
                           return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                        }, npt.inputmask._valueSet = function (value, overruleRTL) {
                           valueSet.call(this.el, null === value || value === undefined ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value);
                        }, valueGet === undefined && (valueGet = function () {
                           return this.value;
                        }, valueSet = function (value) {
                           this.value = value;
                        }, function (type) {
                           if ($.valHooks && ($.valHooks[type] === undefined || !0 !== $.valHooks[type].inputmaskpatch)) {
                              var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                                 return elem.value;
                              }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                                 return elem.value = value, elem;
                              };
                              $.valHooks[type] = {
                                 get: function (elem) {
                                    if (elem.inputmask) {
                                       if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                       var result = valhookGet(elem);
                                       return -1 !== getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                                    }
                                    return valhookGet(elem);
                                 },
                                 set: function (elem, value) {
                                    var result, $elem = $(elem);
                                    return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue"),
                                       result;
                                 },
                                 inputmaskpatch: !0
                              };
                           }
                        }(npt.type), function (npt) {
                           EventRuler.on(npt, "mouseenter", function (event) {
                              var $input = $(this);
                              this.inputmask._valueGet() !== getBuffer().join("") && $input.trigger("setvalue");
                           });
                        }(npt));
                     }
                  }(input) : input.inputmask = undefined, isSupported;
               }(elem, opts);
               if (!1 !== isSupported && (el = elem, $el = $(el), -1 === (maxLength = el !== undefined ? el.maxLength : undefined) && (maxLength = undefined),
                  !0 === opts.colorMask && initializeColorMask(el), mobile && ("inputmode" in el && (el.inputmode = opts.inputmode,
                     el.setAttribute("inputmode", opts.inputmode)), !0 === opts.disablePredictiveText && ("autocorrect" in el ? el.autocorrect = !1 : (!0 !== opts.colorMask && initializeColorMask(el),
                        el.type = "password"))), !0 === isSupported && (EventRuler.on(el, "submit", EventHandlers.submitEvent),
                           EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent),
                           EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent),
                           EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), !0 !== opts.colorMask && EventRuler.on(el, "click", EventHandlers.clickEvent),
                           EventRuler.on(el, "dblclick", EventHandlers.dblclickEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent),
                           EventRuler.on(el, "dragdrop", EventHandlers.pasteEvent), EventRuler.on(el, "drop", EventHandlers.pasteEvent),
                           EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete),
                           EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared),
                           mobile || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent),
                              EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "compositionstart", $.noop),
                           EventRuler.on(el, "compositionupdate", $.noop), EventRuler.on(el, "compositionend", $.noop),
                           EventRuler.on(el, "keyup", $.noop), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent),
                           EventRuler.on(el, "beforeinput", $.noop)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent),
                  undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                  var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(!0), opts) || el.inputmask._valueGet(!0) : el.inputmask._valueGet(!0);
                  "" !== initialValue && checkVal(el, !0, !1, isRTL ? initialValue.split("").reverse() : initialValue.split(""));
                  var buffer = getBuffer().slice();
                  undoValue = buffer.join(""), !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(),
                     opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)),
                     writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
               }
            }(el);
            break;

         case "format":
            return valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split(""),
               checkVal(undefined, !0, !1, isRTL ? valueBuffer.reverse() : valueBuffer), actionObj.metadata ? {
                  value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                  metadata: maskScope.call(this, {
                     action: "getmetadata"
                  }, maskset, opts)
               } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

         case "isValid":
            actionObj.value ? (valueBuffer = actionObj.value.split(""), checkVal(undefined, !0, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
            for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--);
            return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");

         case "getemptymask":
            return getBufferTemplate().join("");

         case "remove":
            if (el && el.inputmask) {
               $el = $(el), el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(!0)),
                  EventRuler.off(el), el.inputmask.colorMask && ((colorMask = el.inputmask.colorMask).removeChild(el),
                     colorMask.parentNode.insertBefore(el, colorMask), colorMask.parentNode.removeChild(colorMask));
               Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value") && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                  get: el.inputmask.__valueGet,
                  set: el.inputmask.__valueSet,
                  configurable: !0
               }) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet),
                  el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = undefined;
            }
            return el;

         case "getmetadata":
            if ($.isArray(maskset.metadata)) {
               var maskTarget = getMaskTemplate(!0, 0, !1).join("");
               return $.each(maskset.metadata, function (ndx, mtdt) {
                  if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1;
               }), maskTarget;
            }
            return maskset.metadata;
      }
   }
   var ua = navigator.userAgent, mobile = isInputEventSupported("touchstart"), iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
   return Inputmask.prototype = {
      dataAttribute: "data-inputmask",
      defaults: {
         placeholder: "_",
         optionalmarker: ["[", "]"],
         quantifiermarker: ["{", "}"],
         groupmarker: ["(", ")"],
         alternatormarker: "|",
         escapeChar: "\\",
         mask: null,
         regex: null,
         oncomplete: $.noop,
         onincomplete: $.noop,
         oncleared: $.noop,
         repeat: 0,
         greedy: !0,
         autoUnmask: !1,
         removeMaskOnSubmit: !1,
         clearMaskOnLostFocus: !0,
         insertMode: !0,
         clearIncomplete: !1,
         alias: null,
         onKeyDown: $.noop,
         onBeforeMask: null,
         onBeforePaste: function (pastedValue, opts) {
            return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
         },
         onBeforeWrite: null,
         onUnMask: null,
         showMaskOnFocus: !0,
         showMaskOnHover: !0,
         onKeyValidation: $.noop,
         skipOptionalPartCharacter: " ",
         numericInput: !1,
         rightAlign: !1,
         undoOnEscape: !0,
         radixPoint: "",
         radixPointDefinitionSymbol: undefined,
         groupSeparator: "",
         keepStatic: null,
         positionCaretOnTab: !0,
         tabThrough: !1,
         supportsInputType: ["text", "tel", "password", "search"],
         ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
         isComplete: null,
         canClearPosition: $.noop,
         preValidation: null,
         postValidation: null,
         staticDefinitionSymbol: undefined,
         jitMasking: !1,
         nullable: !0,
         inputEventOnly: !1,
         noValuePatching: !1,
         positionCaretOnClick: "lvp",
         casing: null,
         inputmode: "verbatim",
         colorMask: !1,
         disablePredictiveText: !1,
         importDataAttributes: !0
      },
      definitions: {
         "9": {
            validator: "[0-9１-９]",
            definitionSymbol: "*"
         },
         a: {
            validator: "[A-Za-zА-яЁёÀ-ÿµ]",
            definitionSymbol: "*"
         },
         "*": {
            validator: "[0-9１-９A-Za-zА-яЁёÀ-ÿµ]"
         }
      },
      aliases: {},
      masksCache: {},
      mask: function (elems) {
         function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
            function importOption(option, optionData) {
               null !== (optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option)) && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)),
                  userOptions[option] = optionData);
            }
            if (!0 === opts.importDataAttributes) {
               var option, dataoptions, optionData, p, attrOptions = npt.getAttribute(dataAttribute);
               if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'),
                  dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) {
                  optionData = undefined;
                  for (p in dataoptions) if ("alias" === p.toLowerCase()) {
                     optionData = dataoptions[p];
                     break;
                  }
               }
               importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts);
               for (option in opts) {
                  if (dataoptions) {
                     optionData = undefined;
                     for (p in dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                        optionData = dataoptions[p];
                        break;
                     }
                  }
                  importOption(option, optionData);
               }
            }
            return $.extend(!0, opts, userOptions), ("rtl" === npt.dir || opts.rightAlign) && (npt.style.textAlign = "right"),
               ("rtl" === npt.dir || opts.numericInput) && (npt.dir = "ltr", npt.removeAttribute("dir"),
                  opts.isRTL = !0), Object.keys(userOptions).length;
         }
         var that = this;
         return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)),
            elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
               var scopedOpts = $.extend(!0, {}, that.opts);
               if (importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute)) {
                  var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                  maskset !== undefined && (el.inputmask !== undefined && (el.inputmask.opts.autoUnmask = !0,
                     el.inputmask.remove()), el.inputmask = new Inputmask(undefined, undefined, !0),
                     el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions),
                     el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el,
                     el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {
                        action: "mask"
                     }));
               }
            }), elems && elems[0] ? elems[0].inputmask || this : this;
      },
      option: function (options, noremask) {
         return "string" == typeof options ? this.opts[options] : "object" == typeof options ? ($.extend(this.userOptions, options),
            this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
      },
      unmaskedvalue: function (value) {
         return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache),
            maskScope.call(this, {
               action: "unmaskedvalue",
               value: value
            });
      },
      remove: function () {
         return maskScope.call(this, {
            action: "remove"
         });
      },
      getemptymask: function () {
         return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache),
            maskScope.call(this, {
               action: "getemptymask"
            });
      },
      hasMaskedValue: function () {
         return !this.opts.autoUnmask;
      },
      isComplete: function () {
         return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache),
            maskScope.call(this, {
               action: "isComplete"
            });
      },
      getmetadata: function () {
         return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache),
            maskScope.call(this, {
               action: "getmetadata"
            });
      },
      isValid: function (value) {
         return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache),
            maskScope.call(this, {
               action: "isValid",
               value: value
            });
      },
      format: function (value, metadata) {
         return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache),
            maskScope.call(this, {
               action: "format",
               value: value,
               metadata: metadata
            });
      },
      analyseMask: function (mask, regexMask, opts) {
         function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
            this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1,
               this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1,
               this.quantifier = {
                  min: 1,
                  max: 1
               };
         }
         function insertTestDefinition(mtoken, element, position) {
            position = position !== undefined ? position : mtoken.matches.length;
            var prevMatch = mtoken.matches[position - 1];
            if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
               fn: new RegExp(element, opts.casing ? "i" : ""),
               optionality: mtoken.isOptional,
               newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
               casing: null,
               def: element,
               placeholder: undefined,
               nativeDef: element
            }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function (ndx, lmnt) {
               prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                  fn: null,
                  optionality: mtoken.isOptional,
                  newBlockMarker: prevMatch === undefined || prevMatch.def !== lmnt && null !== prevMatch.fn,
                  casing: null,
                  def: opts.staticDefinitionSymbol || lmnt,
                  placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                  nativeDef: lmnt
               });
            })), escaped = !1; else {
               var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];
               maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
                  fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                     this.test = maskdef.validator;
                  }() : new RegExp("."),
                  optionality: mtoken.isOptional,
                  newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                  casing: maskdef.casing,
                  def: maskdef.definitionSymbol || element,
                  placeholder: maskdef.placeholder,
                  nativeDef: element
               }) : (mtoken.matches.splice(position++, 0, {
                  fn: null,
                  optionality: mtoken.isOptional,
                  newBlockMarker: prevMatch === undefined || prevMatch.def !== element && null !== prevMatch.fn,
                  casing: null,
                  def: opts.staticDefinitionSymbol || element,
                  placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                  nativeDef: element
               }), escaped = !1);
            }
         }
         function verifyGroupMarker(maskToken) {
            maskToken && maskToken.matches && $.each(maskToken.matches, function (ndx, token) {
               var nextToken = maskToken.matches[ndx + 1];
               (nextToken === undefined || nextToken.matches === undefined || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1,
                  regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))),
                  verifyGroupMarker(token);
            });
         }
         function defaultCase() {
            if (openenings.length > 0) {
               if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m),
                  currentOpeningToken.isAlternator) {
                  alternator = openenings.pop();
                  for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                  openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator);
               }
            } else insertTestDefinition(currentToken, m);
         }
         function reverseTokens(maskToken) {
            maskToken.matches = maskToken.matches.reverse();
            for (var match in maskToken.matches) if (maskToken.matches.hasOwnProperty(match)) {
               var intMatch = parseInt(match);
               if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                  var qt = maskToken.matches[match];
                  maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
               }
               maskToken.matches[match].matches !== undefined ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = function (st) {
                  return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]),
                     st;
               }(maskToken.matches[match]);
            }
            return maskToken;
         }
         var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = [];
         for (regexMask && (opts.optionalmarker[0] = undefined, opts.optionalmarker[1] = undefined); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
            if (m = match[0], regexMask) switch (m.charAt(0)) {
               case "?":
                  m = "{0,1}";
                  break;

               case "+":
               case "*":
                  m = "{" + m + "}";
            }
            if (escaped) defaultCase(); else switch (m.charAt(0)) {
               case opts.escapeChar:
                  escaped = !0, regexMask && defaultCase();
                  break;

               case opts.optionalmarker[1]:
               case opts.groupmarker[1]:
                  if (openingToken = openenings.pop(), openingToken.openGroup = !1, openingToken !== undefined) if (openenings.length > 0) {
                     if ((currentOpeningToken = openenings[openenings.length - 1]).matches.push(openingToken),
                        currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1,
                           alternator.matches[mndx].alternatorGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator);
                     }
                  } else currentToken.matches.push(openingToken); else defaultCase();
                  break;

               case opts.optionalmarker[0]:
                  openenings.push(new MaskToken(!1, !0));
                  break;

               case opts.groupmarker[0]:
                  openenings.push(new MaskToken(!0));
                  break;

               case opts.quantifiermarker[0]:
                  var quantifier = new MaskToken(!1, !1, !0), mq = (m = m.replace(/[{}]/g, "")).split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                  if ("*" !== mq1 && "+" !== mq1 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                     min: mq0,
                     max: mq1
                  }, openenings.length > 0) {
                     var matches = openenings[openenings.length - 1].matches;
                     (match = matches.pop()).isGroup || ((groupToken = new MaskToken(!0)).matches.push(match),
                        match = groupToken), matches.push(match), matches.push(quantifier);
                  } else (match = currentToken.matches.pop()).isGroup || (regexMask && null === match.fn && "." === match.def && (match.fn = new RegExp(match.def, opts.casing ? "i" : "")),
                     (groupToken = new MaskToken(!0)).matches.push(match), match = groupToken), currentToken.matches.push(match),
                     currentToken.matches.push(quantifier);
                  break;

               case opts.alternatormarker:
                  if (openenings.length > 0) {
                     var subToken = (currentOpeningToken = openenings[openenings.length - 1]).matches[currentOpeningToken.matches.length - 1];
                     lastMatch = currentOpeningToken.openGroup && (subToken.matches === undefined || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : currentOpeningToken.matches.pop();
                  } else lastMatch = currentToken.matches.pop();
                  if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(),
                     lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch),
                     openenings.push(alternator), lastMatch.openGroup) {
                     lastMatch.openGroup = !1;
                     var alternatorGroup = new MaskToken(!0);
                     alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
                  }
                  break;

               default:
                  defaultCase();
            }
         }
         for (; openenings.length > 0;) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
         return currentToken.matches.length > 0 && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)),
            (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
      }
   }, Inputmask.extendDefaults = function (options) {
      $.extend(!0, Inputmask.prototype.defaults, options);
   }, Inputmask.extendDefinitions = function (definition) {
      $.extend(!0, Inputmask.prototype.definitions, definition);
   }, Inputmask.extendAliases = function (alias) {
      $.extend(!0, Inputmask.prototype.aliases, alias);
   }, Inputmask.format = function (value, options, metadata) {
      return Inputmask(options).format(value, metadata);
   }, Inputmask.unmask = function (value, options) {
      return Inputmask(options).unmaskedvalue(value);
   }, Inputmask.isValid = function (value, options) {
      return Inputmask(options).isValid(value);
   }, Inputmask.remove = function (elems) {
      $.each(elems, function (ndx, el) {
         el.inputmask && el.inputmask.remove();
      });
   }, Inputmask.escapeRegex = function (str) {
      var specials = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
      return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
   }, Inputmask.keyCode = {
      BACKSPACE: 8,
      BACKSPACE_SAFARI: 127,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      X: 88,
      CONTROL: 17
   }, Inputmask;
});


/*!
* inputmask.extensions.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-100
*/

!function (factory) {
   "function" == typeof define && define.amd ? define(["./dependencyLibs/inputmask.dependencyLib", "./inputmask"], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
}(function ($, Inputmask) {
   return Inputmask.extendDefinitions({
      A: {
         validator: "[A-Za-zА-яЁёÀ-ÿµ]",
         casing: "upper"
      },
      "&": {
         validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
         casing: "upper"
      },
      "#": {
         validator: "[0-9A-Fa-f]",
         casing: "upper"
      }
   }), Inputmask.extendAliases({
      url: {
         definitions: {
            i: {
               validator: "."
            }
         },
         mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
         insertMode: !1,
         autoUnmask: !1,
         inputmode: "url"
      },
      ip: {
         mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
         definitions: {
            i: {
               validator: function (chrs, maskset, pos, strict, opts) {
                  return pos - 1 > -1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs,
                     chrs = pos - 2 > -1 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs,
                     new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
               }
            }
         },
         onUnMask: function (maskedValue, unmaskedValue, opts) {
            return maskedValue;
         },
         inputmode: "numeric"
      },
      email: {
         mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
         greedy: !1,
         onBeforePaste: function (pastedValue, opts) {
            return (pastedValue = pastedValue.toLowerCase()).replace("mailto:", "");
         },
         definitions: {
            "*": {
               validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
               casing: "lower"
            },
            "-": {
               validator: "[0-9A-Za-z-]",
               casing: "lower"
            }
         },
         onUnMask: function (maskedValue, unmaskedValue, opts) {
            return maskedValue;
         },
         inputmode: "email"
      },
      mac: {
         mask: "##:##:##:##:##:##"
      },
      vin: {
         mask: "V{13}9{4}",
         definitions: {
            V: {
               validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
               casing: "upper"
            }
         },
         clearIncomplete: !0,
         autoUnmask: !0
      }
   }), Inputmask;
});
/*!
* dependencyLibs/inputmask.dependencyLib.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-100
*/
!function(e){"function"==typeof define&&define.amd?define(["../global/window","../global/document"],e):"object"==typeof exports?module.exports=e(require("../global/window"),require("../global/document")):window.dependencyLib=e(window,document)}(function(e,t){function n(e){return null!=e&&e===e.window}function i(e){return e instanceof Element}function a(n){return n instanceof a?n:this instanceof a?void(null!=n&&n!==e&&(this[0]=n.nodeName?n:void 0!==n[0]&&n[0].nodeName?n[0]:t.querySelector(n),void 0!==this[0]&&null!==this[0]&&(this[0].eventRegistry=this[0].eventRegistry||{}))):new a(n)}return a.prototype={on:function(e,t){if(i(this[0]))for(var n=this[0].eventRegistry,a=this[0],r=e.split(" "),o=0;o<r.length;o++){var s=r[o].split(".");l=s[0],c=s[1]||"global",a.addEventListener?a.addEventListener(l,t,!1):a.attachEvent&&a.attachEvent("on"+l,t),n[l]=n[l]||{},n[l][c]=n[l][c]||[],n[l][c].push(t)}var l,c;return this},off:function(e,t){if(i(this[0]))for(var n=this[0].eventRegistry,a=this[0],r=e.split(" "),o=0;o<r.length;o++)for(var s=r[o].split("."),l=function(e,i){var a,r,o=[];if(e.length>0)if(void 0===t)for(a=0,r=n[e][i].length;a<r;a++)o.push({ev:e,namespace:i&&i.length>0?i:"global",handler:n[e][i][a]});else o.push({ev:e,namespace:i&&i.length>0?i:"global",handler:t});else if(i.length>0)for(var s in n)for(var l in n[s])if(l===i)if(void 0===t)for(a=0,r=n[s][l].length;a<r;a++)o.push({ev:s,namespace:l,handler:n[s][l][a]});else o.push({ev:s,namespace:l,handler:t});return o}(s[0],s[1]),c=0,u=l.length;c<u;c++)!function(e,t,i){if(e in n==1)if(a.removeEventListener?a.removeEventListener(e,i,!1):a.detachEvent&&a.detachEvent("on"+e,i),"global"===t)for(var r in n[e])n[e][r].splice(n[e][r].indexOf(i),1);else n[e][t].splice(n[e][t].indexOf(i),1)}(l[c].ev,l[c].namespace,l[c].handler);return this},trigger:function(e){if(i(this[0]))for(var n=this[0].eventRegistry,r=this[0],o="string"==typeof e?e.split(" "):[e.type],s=0;s<o.length;s++){var l=o[s].split("."),c=l[0],u=l[1]||"global";if(void 0!==t&&"global"===u){var f,p,h={bubbles:!0,cancelable:!0,detail:Array.prototype.slice.call(arguments,1)};if(t.createEvent){try{f=new CustomEvent(c,h)}catch(e){(f=t.createEvent("CustomEvent")).initCustomEvent(c,h.bubbles,h.cancelable,h.detail)}e.type&&a.extend(f,e),r.dispatchEvent(f)}else(f=t.createEventObject()).eventType=c,e.type&&a.extend(f,e),r.fireEvent("on"+f.eventType,f)}else if(void 0!==n[c])if(arguments[0]=arguments[0].type?arguments[0]:a.Event(arguments[0]),"global"===u)for(var m in n[c])for(p=0;p<n[c][m].length;p++)n[c][m][p].apply(r,arguments);else for(p=0;p<n[c][u].length;p++)n[c][u][p].apply(r,arguments)}return this}},a.isFunction=function(e){return"function"==typeof e},a.noop=function(){},a.isArray=Array.isArray,a.inArray=function(e,t,n){return null==t?-1:function(e,t){for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1}(t,e)},a.valHooks=void 0,a.isPlainObject=function(e){return!("object"!=typeof e||e.nodeType||n(e)||e.constructor&&!Object.hasOwnProperty.call(e.constructor.prototype,"isPrototypeOf"))},a.extend=function(){var e,t,n,i,r,o,s=arguments[0]||{},l=1,c=arguments.length,u=!1;for("boolean"==typeof s&&(u=s,s=arguments[l]||{},l++),"object"==typeof s||a.isFunction(s)||(s={}),l===c&&(s=this,l--);l<c;l++)if(null!=(e=arguments[l]))for(t in e)n=s[t],s!==(i=e[t])&&(u&&i&&(a.isPlainObject(i)||(r=a.isArray(i)))?(r?(r=!1,o=n&&a.isArray(n)?n:[]):o=n&&a.isPlainObject(n)?n:{},s[t]=a.extend(u,o,i)):void 0!==i&&(s[t]=i));return s},a.each=function(e,t){var i=0;if(function(e){var t="length"in e&&e.length,i=typeof e;return"function"!==i&&!n(e)&&(!(1!==e.nodeType||!t)||"array"===i||0===t||"number"==typeof t&&t>0&&t-1 in e)}(e))for(var a=e.length;i<a&&!1!==t.call(e[i],i,e[i]);i++);else for(i in e)if(!1===t.call(e[i],i,e[i]))break;return e},a.data=function(e,t,n){if(void 0===n)return e.__data?e.__data[t]:null;e.__data=e.__data||{},e.__data[t]=n},"function"==typeof e.CustomEvent?a.Event=e.CustomEvent:(a.Event=function(e,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var i=t.createEvent("CustomEvent");return i.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),i},a.Event.prototype=e.Event.prototype),a}),function(e){"function"==typeof define&&define.amd?define(["./dependencyLibs/inputmask.dependencyLib","./global/window","./global/document"],e):"object"==typeof exports?module.exports=e(require("./dependencyLibs/inputmask.dependencyLib"),require("./global/window"),require("./global/document")):window.Inputmask=e(window.dependencyLib||jQuery,window,document)}(function(e,t,n,i){function a(t,n,o){if(!(this instanceof a))return new a(t,n,o);this.el=i,this.events={},this.maskset=i,this.refreshValue=!1,!0!==o&&(e.isPlainObject(t)?n=t:(n=n||{},t&&(n.alias=t)),this.opts=e.extend(!0,{},this.defaults,n),this.noMasksCache=n&&n.definitions!==i,this.userOptions=n||{},this.isRTL=this.opts.numericInput,r(this.opts.alias,n,this.opts))}function r(t,n,o){var s=a.prototype.aliases[t];return s?(s.alias&&r(s.alias,i,o),e.extend(!0,o,s),e.extend(!0,o,n),!0):(null===o.mask&&(o.mask=t),!1)}function o(t,n){function r(t,r,o){var s=!1;if(null!==t&&""!==t||((s=null!==o.regex)?t=(t=o.regex).replace(/^(\^)(.*)(\$)$/,"$2"):(s=!0,t=".*")),1===t.length&&!1===o.greedy&&0!==o.repeat&&(o.placeholder=""),o.repeat>0||"*"===o.repeat||"+"===o.repeat){var l="*"===o.repeat?0:"+"===o.repeat?1:o.repeat;t=o.groupmarker[0]+t+o.groupmarker[1]+o.quantifiermarker[0]+l+","+o.repeat+o.quantifiermarker[1]}var c,u=s?"regex_"+o.regex:o.numericInput?t.split("").reverse().join(""):t;return a.prototype.masksCache[u]===i||!0===n?(c={mask:t,maskToken:a.prototype.analyseMask(t,s,o),validPositions:{},_buffer:i,buffer:i,tests:{},excludes:{},metadata:r,maskLength:i},!0!==n&&(a.prototype.masksCache[u]=c,c=e.extend(!0,{},a.prototype.masksCache[u]))):c=e.extend(!0,{},a.prototype.masksCache[u]),c}if(e.isFunction(t.mask)&&(t.mask=t.mask(t)),e.isArray(t.mask)){if(t.mask.length>1){if(null===t.keepStatic){t.keepStatic="auto";for(var o=0;o<t.mask.length;o++)if(t.mask[o].charAt(0)!==t.mask[0].charAt(0)){t.keepStatic=!0;break}}var s=t.groupmarker[0];return e.each(t.isRTL?t.mask.reverse():t.mask,function(n,a){s.length>1&&(s+=t.groupmarker[1]+t.alternatormarker+t.groupmarker[0]),a.mask===i||e.isFunction(a.mask)?s+=a:s+=a.mask}),r(s+=t.groupmarker[1],t.mask,t)}t.mask=t.mask.pop()}return t.mask&&t.mask.mask!==i&&!e.isFunction(t.mask.mask)?r(t.mask.mask,t.mask,t):r(t.mask,t.mask,t)}function s(e){var t=n.createElement("input"),i="on"+e,a=i in t;return a||(t.setAttribute(i,"return;"),a="function"==typeof t[i]),t=null,a}function l(r,o,c){function h(e,t,n){t=t||0;var a,r,o,s=[],l=0,u=v();do{!0===e&&m().validPositions[l]?(r=(o=m().validPositions[l]).match,a=o.locator.slice(),s.push(!0===n?o.input:!1===n?r.nativeDef:L(l,r))):(r=(o=E(l,a,l-1)).match,a=o.locator.slice(),(!1===c.jitMasking||l<u||"number"==typeof c.jitMasking&&isFinite(c.jitMasking)&&c.jitMasking>l)&&s.push(!1===n?r.nativeDef:L(l,r))),"auto"===c.keepStatic&&r.newBlockMarker&&null!==r.fn&&(c.keepStatic=l-1),l++}while((W===i||l<W)&&(null!==r.fn||""!==r.def)||t>l);return""===s[s.length-1]&&s.pop(),!1===n&&m().maskLength!==i||(m().maskLength=l-1),s}function m(){return o}function d(e){var t=m();t.buffer=i,!0!==e&&(t.validPositions={},t.p=0)}function v(e,t,n){var a=-1,r=-1,o=n||m().validPositions;for(var s in e===i&&(e=-1),o){var l=parseInt(s);o[l]&&(t||!0!==o[l].generatedInput)&&(l<=e&&(a=l),l>=e&&(r=l))}return-1!==a&&e-a>1||r<e?a:r}function k(t,n,a,r){var o,s=t,l=e.extend(!0,{},m().validPositions),u=!1;for(m().p=t,o=n-1;o>=s;o--)m().validPositions[o]!==i&&(!0!==a&&(!m().validPositions[o].match.optionality&&function(e){var t=m().validPositions[e];if(t!==i&&null===t.match.fn){var n=m().validPositions[e-1],a=m().validPositions[e+1];return n!==i&&a!==i}return!1}(o)||!1===c.canClearPosition(m(),o,v(i,!0),r,c))||delete m().validPositions[o]);for(d(!0),o=s+1;o<=v();){for(;m().validPositions[s]!==i;)s++;if(o<s&&(o=s+1),m().validPositions[o]===i&&S(o))o++;else{var f=E(o);!1===u&&l[s]&&l[s].match.def===f.match.def?(m().validPositions[s]=e.extend(!0,{},l[s]),m().validPositions[s].input=f.input,delete m().validPositions[o],o++):C(s,f.match.def)?!1!==M(s,f.input||L(o),!0)&&(delete m().validPositions[o],o++,u=!0):S(o)||(o++,s--),s++}}d(!0)}function g(e,t,n){for(var a,r=P(e=e>0?e-1:0),o=r.alternation!==i?r.locator[r.alternation].toString().split(","):[],s=0;s<t.length&&(!((a=t[s]).match&&(c.greedy&&!0!==a.match.optionalQuantifier||(!1===a.match.optionality||!1===a.match.newBlockMarker)&&!0!==a.match.optionalQuantifier)&&(r.alternation===i||r.alternation!==a.alternation||a.locator[r.alternation]!==i&&O(a.locator[r.alternation].toString().split(","),o)))||!0===n&&(null!==a.match.fn||/[0-9a-bA-Z]/.test(a.match.def)));s++);return a}function b(e){var t=e.locator[e.alternation];return"string"==typeof t&&t.length>0&&(t=t.split(",")[0]),t!==i?t.toString():""}function y(e,t){for(var n=(e.alternation!=i?e.mloc[b(e)]:e.locator).join("");n.length<t;)n+="0";return n}function E(e,t,n){return m().validPositions[e]||g(e,x(e,t?t.slice():t,n))}function P(e){return m().validPositions[e]?m().validPositions[e]:x(e)[0]}function C(e,t){for(var n=!1,i=x(e),a=0;a<i.length;a++)if(i[a].match&&i[a].match.def===t){n=!0;break}return n}function x(t,n,a){function r(n,a,s,u){function d(s,u,v){function k(t,n){var i=0===e.inArray(t,n.matches);return i||e.each(n.matches,function(e,a){if(!0===a.isQuantifier&&(i=k(t,n.matches[e-1])))return!1}),i}function g(t,n,a){var r,o;if((m().tests[t]||m().validPositions[t])&&e.each(m().tests[t]||[m().validPositions[t]],function(e,t){if(t.mloc[n])return r=t,!1;var s=a!==i?a:t.alternation,l=t.locator[s]!==i?t.locator[s].toString().indexOf(n):-1;(o===i||l<o)&&-1!==l&&(r=t,o=l)}),r){var s=r.locator[r.alternation];return(r.mloc[n]||r.mloc[s]||r.locator).slice((a!==i?a:r.alternation)+1)}return a!==i?g(t,n):i}function b(e,t){function n(e){for(var t,n,i=[],a=0,r=e.length;a<r;a++)if("-"===e.charAt(a))for(n=e.charCodeAt(a+1);++t<n;)i.push(String.fromCharCode(t));else t=e.charCodeAt(a),i.push(e.charAt(a));return i.join("")}return c.regex&&null!==e.match.fn&&null!==t.match.fn?-1!==n(t.match.def.replace(/[\[\]]/g,"")).indexOf(n(e.match.def.replace(/[\[\]]/g,""))):e.match.def===t.match.nativeDef}function y(e,t){if(t===i||e.alternation===t.alternation&&-1===e.locator[e.alternation].toString().indexOf(t.locator[t.alternation])){e.mloc=e.mloc||{};var n=e.locator[e.alternation];if(n!==i){if("string"==typeof n&&(n=n.split(",")[0]),e.mloc[n]===i&&(e.mloc[n]=e.locator.slice()),t!==i){for(var a in t.mloc)"string"==typeof a&&(a=a.split(",")[0]),e.mloc[a]===i&&(e.mloc[a]=t.mloc[a]);e.locator[e.alternation]=Object.keys(e.mloc).join(",")}return!0}e.alternation=i}return!1}if(l>1e4)throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+m().mask;if(l===t&&s.matches===i)return f.push({match:s,locator:u.reverse(),cd:h,mloc:{}}),!0;if(s.matches!==i){if(s.isGroup&&v!==s){if(s=d(n.matches[e.inArray(s,n.matches)+1],u))return!0}else if(s.isOptional){var E=s;if(s=r(s,a,u,v)){if(!k(o=f[f.length-1].match,E))return!0;p=!0,l=t}}else if(s.isAlternator){var P,C=s,x=[],_=f.slice(),w=u.length,A=a.length>0?a.shift():-1;if(-1===A||"string"==typeof A){var O,j=l,M=a.slice(),S=[];if("string"==typeof A)S=A.split(",");else for(O=0;O<C.matches.length;O++)S.push(O.toString());if(m().excludes[t]){for(var T=S.slice(),D=0,G=m().excludes[t].length;D<G;D++)S.splice(S.indexOf(m().excludes[t][D].toString()),1);0===S.length&&(m().excludes[t]=i,S=T)}(!0===c.keepStatic||isFinite(parseInt(c.keepStatic))&&j>=c.keepStatic)&&(S=S.slice(0,1));for(var L=0;L<S.length;L++){O=parseInt(S[L]),f=[],a=g(l,O,w)||M.slice(),C.matches[O]&&d(C.matches[O],[O].concat(u),v)&&(s=!0),P=f.slice(),l=j,f=[];for(var B=0;B<P.length;B++){var F=P[B],R=!1;F.alternation=F.alternation||w,y(F);for(var I=0;I<x.length;I++){var N=x[I];if("string"!=typeof A||F.alternation!==i&&-1!==e.inArray(F.locator[F.alternation].toString(),S)){if(F.match.nativeDef===N.match.nativeDef){R=!0,y(N,F);break}if(b(F,N)){y(F,N)&&(R=!0,x.splice(x.indexOf(N),0,F));break}if(b(N,F)){y(N,F);break}if(q=N,null===(U=F).match.fn&&null!==q.match.fn&&q.match.fn.test(U.match.def,m(),t,!1,c,!1)){y(F,N)&&(R=!0,x.splice(x.indexOf(N),0,F));break}}}R||x.push(F)}}f=_.concat(x),l=t,p=f.length>0,s=x.length>0,a=M.slice()}else s=d(C.matches[A]||n.matches[A],[A].concat(u),v);if(s)return!0}else if(s.isQuantifier&&v!==n.matches[e.inArray(s,n.matches)-1])for(var K=s,V=a.length>0?a.shift():0;V<(isNaN(K.quantifier.max)?V+1:K.quantifier.max)&&l<=t;V++){var H=n.matches[e.inArray(K,n.matches)-1];if(s=d(H,[V].concat(u),H)){if((o=f[f.length-1].match).optionalQuantifier=V>K.quantifier.min-1,k(o,H)){if(V>K.quantifier.min-1){p=!0,l=t;break}return!0}return!0}}else if(s=r(s,a,u,v))return!0}else l++;var U,q}for(var v=a.length>0?a.shift():0;v<n.matches.length;v++)if(!0!==n.matches[v].isQuantifier){var k=d(n.matches[v],[v].concat(s),u);if(k&&l===t)return k;if(l>t)break}}var o,s=m().maskToken,l=n?a:0,u=n?n.slice():[0],f=[],p=!1,h=n?n.join(""):"";if(t>-1){if(n===i){for(var d,v=t-1;(d=m().validPositions[v]||m().tests[v])===i&&v>-1;)v--;d!==i&&v>-1&&(u=function(t,n){var a=[];return e.isArray(n)||(n=[n]),n.length>0&&(n[0].alternation===i?0===(a=g(t,n.slice()).locator.slice()).length&&(a=n[0].locator.slice()):e.each(n,function(e,t){if(""!==t.def)if(0===a.length)a=t.locator.slice();else for(var n=0;n<a.length;n++)t.locator[n]&&-1===a[n].toString().indexOf(t.locator[n])&&(a[n]+=","+t.locator[n])})),a}(v,d),h=u.join(""),l=v)}if(m().tests[t]&&m().tests[t][0].cd===h)return m().tests[t];for(var k=u.shift();k<s.length&&!(r(s[k],u,[k])&&l===t||l>t);k++);}return(0===f.length||p)&&f.push({match:{fn:null,optionality:!0,casing:null,def:"",placeholder:""},locator:[],mloc:{},cd:h}),n!==i&&m().tests[t]?e.extend(!0,[],f):(m().tests[t]=e.extend(!0,[],f),m().tests[t])}function _(){return m()._buffer===i&&(m()._buffer=h(!1,1),m().buffer===i&&(m().buffer=m()._buffer.slice())),m()._buffer}function w(e){return m().buffer!==i&&!0!==e||(m().buffer=h(!0,v(),!0)),m().buffer}function A(e,t,n){var a,r;if(!0===e)d(),e=0,t=n.length;else for(a=e;a<t;a++)delete m().validPositions[a];for(r=e,a=e;a<t;a++)if(d(!0),n[a]!==c.skipOptionalPartCharacter){var o=M(r,n[a],!0,!0);!1!==o&&(d(!0),r=o.caret!==i?o.caret:o.pos+1)}}function O(t,n,a){for(var r,o=c.greedy?n:n.slice(0,1),s=!1,l=a!==i?a.split(","):[],u=0;u<l.length;u++)-1!==(r=t.indexOf(l[u]))&&t.splice(r,1);for(var f=0;f<t.length;f++)if(-1!==e.inArray(t[f],o)){s=!0;break}return s}function j(t,n,a,r,o){var s,l,u,f,p,h,k,g=e.extend(!0,{},m().validPositions),y=!1,E=o!==i?o:v();if(-1===E&&o===i)l=(f=P(s=0)).alternation;else for(;E>=0;E--)if((u=m().validPositions[E])&&u.alternation!==i){if(f&&f.locator[u.alternation]!==u.locator[u.alternation])break;s=E,l=m().validPositions[s].alternation,f=u}if(l!==i){k=parseInt(s),m().excludes[k]=m().excludes[k]||[],!0!==t&&m().excludes[k].push(b(f));var C=[],x=0;for(p=k;p<v(i,!0)+1;p++)(h=m().validPositions[p])&&!0!==h.generatedInput&&/[0-9a-bA-Z]/.test(h.input)?C.push(h.input):p<t&&x++,delete m().validPositions[p];for(;m().excludes[k]&&m().excludes[k].length<10;){var _=-1*x,w=C.slice();for(m().tests[k]=i,d(!0),y=!0;w.length>0;){var A=w.shift();if(A!==c.skipOptionalPartCharacter&&!(y=M(v(i,!0)+1,A,!1,r,!0)))break}if(y&&n!==i){var O=v(t)+1;for(p=k;p<v()+1;p++)((h=m().validPositions[p])===i||null==h.match.fn)&&p<t+_&&_++;y=M((t+=_)>O?O:t,n,a,r,!0)}if(y)break;if(d(),f=P(k),m().validPositions=e.extend(!0,{},g),!m().excludes[k]){y=j(t,n,a,r,k-1);break}var S=b(f);if(-1!==m().excludes[k].indexOf(S)){y=j(t,n,a,r,k-1);break}for(m().excludes[k].push(S),p=k;p<v(i,!0)+1;p++)delete m().validPositions[p]}}return m().excludes[k]=i,y}function M(t,n,r,o,s,l){function u(e){return J?e.begin-e.end>1||e.begin-e.end==1:e.end-e.begin>1||e.end-e.begin==1}function f(n,r,s){var l=!1;return e.each(x(n),function(f,p){var g=p.match;if(w(!0),!1!==(l=null!=g.fn?g.fn.test(r,m(),n,s,c,u(t)):(r===g.def||r===c.skipOptionalPartCharacter)&&""!==g.def&&{c:L(n,g,!0)||g.def,pos:n})){var b=l.c!==i?l.c:r;b=b===c.skipOptionalPartCharacter&&null===g.fn?L(n,g,!0)||g.def:b;var y=n,E=w();if(l.remove!==i&&(e.isArray(l.remove)||(l.remove=[l.remove]),e.each(l.remove.sort(function(e,t){return t-e}),function(e,t){k(t,t+1,!0)})),l.insert!==i&&(e.isArray(l.insert)||(l.insert=[l.insert]),e.each(l.insert.sort(function(e,t){return e-t}),function(e,t){M(t.pos,t.c,!0,o)})),l.refreshFromBuffer){var P=l.refreshFromBuffer;if(A(!0===P?P:P.start,P.end,E),l.pos===i&&l.c===i)return l.pos=v(),!1;if((y=l.pos!==i?l.pos:n)!==n)return l=e.extend(l,M(y,b,!0,o)),!1}else if(!0!==l&&l.pos!==i&&l.pos!==n&&(y=l.pos,A(n,y,w().slice()),y!==n))return l=e.extend(l,M(y,b,!0)),!1;return(!0===l||l.pos!==i||l.c!==i)&&(f>0&&d(!0),h(y,e.extend({},p,{input:function(t,n,i){switch(c.casing||n.casing){case"upper":t=t.toUpperCase();break;case"lower":t=t.toLowerCase();break;case"title":var r=m().validPositions[i-1];t=0===i||r&&r.input===String.fromCharCode(a.keyCode.SPACE)?t.toUpperCase():t.toLowerCase();break;default:if(e.isFunction(c.casing)){var o=Array.prototype.slice.call(arguments);o.push(m().validPositions),t=c.casing.apply(this,o)}}return t}(b,g,y)}),o,u(t))||(l=!1),!1)}}),l}function p(t,n,a){var r;if(t===i)for(t=n-1;t>0&&!m().validPositions[t];t--);for(var o=t;o<n;o++)if(m().validPositions[o]===i&&!S(o,!0)){var s=0==o?P(o):m().validPositions[o-1];if(s){var l,c=y(s),u=x(o).slice(),f=i,p=P(o);if(""===u[u.length-1].match.def&&u.pop(),e.each(u,function(e,t){l=y(t,c.length);var n=Math.abs(l-c);(f===i||n<f)&&null===t.match.fn&&!0!==t.match.optionality&&!0!==t.match.optionalQuantifier&&(f=n,p=t)}),(p=e.extend({},p,{input:L(o,p.match,!0)||p.match.def})).generatedInput=!0,h(o,p,!0),!0!==a){var d=m().validPositions[n].input;m().validPositions[n]=i,r=M(n,d,!0,!0)}}}return r}function h(t,n,a,r){if(r||c.insertMode&&m().validPositions[t]!==i&&a===i){var o,s=e.extend(!0,{},m().validPositions),l=v(i,!0);for(o=t;o<=l;o++)delete m().validPositions[o];m().validPositions[t]=e.extend(!0,{},n);var u,f=!0,h=m().validPositions,k=!1;for(o=u=t;o<=l;o++){var g=s[o];if(g!==i)for(var b=u;""!==P(b).match.def&&(null===g.match.fn&&h[o]&&(!0===h[o].match.optionalQuantifier||!0===h[o].match.optionality)||null!=g.match.fn);){if(b++,!1===k&&s[b]&&s[b].match.def===g.match.def)m().validPositions[b]=e.extend(!0,{},s[b]),m().validPositions[b].input=g.input,p(i,b,!0),u=b,f=!0;else if(C(b,g.match.def)){var y=M(b,g.input,!0,!0);f=!1!==y,u=y.caret||y.insert?v():b,k=!0}else if(!(f=!0===g.generatedInput)&&""===P(b).match.def)break;if(f)break}if(!f)break}if(!f)return m().validPositions=e.extend(!0,{},s),d(!0),!1}else m().validPositions[t]=e.extend(!0,{},n);return d(!0),!0}r=!0===r;var g=t;t.begin!==i&&(g=J&&!u(t)?t.end:t.begin);var b=!0,E=e.extend(!0,{},m().validPositions);if(e.isFunction(c.preValidation)&&!r&&!0!==o&&!0!==l&&(b=c.preValidation(w(),g,n,u(t),c)),!0===b){if(p(i,g,!0),u(t)&&(V(i,a.keyCode.DELETE,t,!0,!0),g=m().p),(W===i||g<W)&&(b=f(g,n,r),(!r||!0===o)&&!1===b&&!0!==l)){var _=m().validPositions[g];if(!_||null!==_.match.fn||_.match.def!==n&&n!==c.skipOptionalPartCharacter){if((c.insertMode||m().validPositions[T(g)]===i)&&!S(g,!0))for(var O=g+1,D=T(g);O<=D;O++)if(!1!==(b=f(O,n,r))){b=p(g,b.pos!==i?b.pos:O)||b,g=O;break}}else b={caret:T(g)}}!1!==b||null===c.keepStatic||!1===c.keepStatic||r||!0===s||(b=j(g,n,r,o)),!0===b&&(b={pos:g})}if(e.isFunction(c.postValidation)&&!1!==b&&!r&&!0!==o&&!0!==l){var G=c.postValidation(w(!0),b,c);if(G!==i){if(G.refreshFromBuffer&&G.buffer){var B=G.refreshFromBuffer;A(!0===B?B:B.start,B.end,G.buffer)}b=!0===G?b:G}}return b&&b.pos===i&&(b.pos=g),!1!==b&&!0!==l||(d(!0),m().validPositions=e.extend(!0,{},E)),b}function S(e,t){var n=E(e).match;if(""===n.def&&(n=P(e).match),null!=n.fn)return n.fn;if(!0!==t&&e>-1){var i=x(e);return i.length>1+(""===i[i.length-1].match.def?1:0)}return!1}function T(e,t){for(var n=e+1;""!==P(n).match.def&&(!0===t&&(!0!==P(n).match.newBlockMarker||!S(n))||!0!==t&&!S(n));)n++;return n}function D(e,t){var n,i=e;if(i<=0)return 0;for(;--i>0&&(!0===t&&!0!==P(i).match.newBlockMarker||!0!==t&&!S(i)&&((n=x(i)).length<2||2===n.length&&""===n[1].match.def)););return i}function G(t,n,a,r,o){if(r&&e.isFunction(c.onBeforeWrite)){var s=c.onBeforeWrite.call($,r,n,a,c);if(s){if(s.refreshFromBuffer){var l=s.refreshFromBuffer;A(!0===l?l:l.start,l.end,s.buffer||n),n=w(!0)}a!==i&&(a=s.caret!==i?s.caret:a)}}t!==i&&(t.inputmask._valueSet(n.join("")),a===i||r!==i&&"blur"===r.type?U(t,a,0===n.length):R(t,a),!0===o&&(ee=!0,e(t).trigger("input")))}function L(t,n,a){if((n=n||P(t).match).placeholder!==i||!0===a)return e.isFunction(n.placeholder)?n.placeholder(c):n.placeholder;if(null===n.fn){if(t>-1&&m().validPositions[t]===i){var r,o=x(t),s=[];if(o.length>1+(""===o[o.length-1].match.def?1:0))for(var l=0;l<o.length;l++)if(!0!==o[l].match.optionality&&!0!==o[l].match.optionalQuantifier&&(null===o[l].match.fn||r===i||!1!==o[l].match.fn.test(r.match.def,m(),t,!0,c))&&(s.push(o[l]),null===o[l].match.fn&&(r=o[l]),s.length>1&&/[0-9a-bA-Z]/.test(s[0].match.def)))return c.placeholder.charAt(t%c.placeholder.length)}return n.def}return c.placeholder.charAt(t%c.placeholder.length)}function B(t,n,r,o,s){var l=o.slice(),u="",f=-1,p=i;if(d(),r||!0===c.autoUnmask)f=T(f);else{var k=_().slice(0,T(-1)).join(""),g=l.join("").match(new RegExp("^"+a.escapeRegex(k),"g"));g&&g.length>0&&(l.splice(0,g.length*k.length),f=T(f))}-1===f?(m().p=T(f),f=0):m().p=f,e.each(l,function(n,a){if(a!==i)if(m().validPositions[n]===i&&l[n]===L(n)&&S(n,!0)&&!1===M(n,l[n],!0,i,i,!0))m().p++;else{var o=new e.Event("_checkval");o.which=a.charCodeAt(0),u+=a;var s=v(i,!0),d=P(s),k=E(s+1,d?d.locator.slice():i,s);if(!function(e,t){return-1!==h(!0,0,!1).slice(e,T(e)).join("").indexOf(t)&&!S(e)&&(P(e).match.nativeDef===t.charAt(0)||" "===P(e).match.nativeDef&&P(e+1).match.nativeDef===t.charAt(0))}(f,u)||r||c.autoUnmask){var g=r?n:null==k.match.fn&&k.match.optionality&&s+1<m().p?s+1:m().p;(p=re.keypressEvent.call(t,o,!0,!1,r,g))&&(f=g+1,u="")}else p=re.keypressEvent.call(t,o,!0,!1,!0,s+1);G(i,w(),p.forwardPosition,o,!1)}}),n&&G(t,w(),p?p.forwardPosition:i,s||new e.Event("checkval"),s&&"input"===s.type)}function F(t){if(t){if(t.inputmask===i)return t.value;t.inputmask&&t.inputmask.refreshValue&&re.setValueEvent.call(t)}var n=[],a=m().validPositions;for(var r in a)a[r].match&&null!=a[r].match.fn&&n.push(a[r].input);var o=0===n.length?"":(J?n.reverse():n).join("");if(e.isFunction(c.onUnMask)){var s=(J?w().slice().reverse():w()).join("");o=c.onUnMask.call($,s,o,c)}return o}function R(a,r,o,s){function l(e){return!0===s||!J||"number"!=typeof e||c.greedy&&""===c.placeholder||(e=a.inputmask.__valueGet.call(a).length-e),e}var u;if(r===i)return a.setSelectionRange?(r=a.selectionStart,o=a.selectionEnd):t.getSelection?(u=t.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode!==a&&u.commonAncestorContainer!==a||(r=u.startOffset,o=u.endOffset):n.selection&&n.selection.createRange&&(o=(r=0-(u=n.selection.createRange()).duplicate().moveStart("character",-a.inputmask._valueGet().length))+u.text.length),{begin:l(r),end:l(o)};if(e.isArray(r)&&(o=J?r[0]:r[1],r=J?r[1]:r[0]),r.begin!==i&&(o=J?r.begin:r.end,r=J?r.end:r.begin),"number"==typeof r){r=l(r),o="number"==typeof(o=l(o))?o:r;var f=parseInt(((a.ownerDocument.defaultView||t).getComputedStyle?(a.ownerDocument.defaultView||t).getComputedStyle(a,null):a.currentStyle).fontSize)*o;if(a.scrollLeft=f>a.scrollWidth?f:0,!1===c.insertMode&&r===o&&o++,a.inputmask.caretPos={begin:r,end:o},a.setSelectionRange)a.selectionStart=r,a.selectionEnd=o;else if(t.getSelection){if(u=n.createRange(),a.firstChild===i||null===a.firstChild){var p=n.createTextNode("");a.appendChild(p)}u.setStart(a.firstChild,r<a.inputmask._valueGet().length?r:a.inputmask._valueGet().length),u.setEnd(a.firstChild,o<a.inputmask._valueGet().length?o:a.inputmask._valueGet().length),u.collapse(!0);var h=t.getSelection();h.removeAllRanges(),h.addRange(u)}else a.createTextRange&&((u=a.createTextRange()).collapse(!0),u.moveEnd("character",o),u.moveStart("character",r),u.select());U(a,{begin:r,end:o})}}function I(t){var n,a,r=w(),o=r.length,s=v(),l={},c=m().validPositions[s],u=c!==i?c.locator.slice():i;for(n=s+1;n<r.length;n++)u=(a=E(n,u,n-1)).locator.slice(),l[n]=e.extend(!0,{},a);var f=c&&c.alternation!==i?c.locator[c.alternation]:i;for(n=o-1;n>s&&((a=l[n]).match.optionality||a.match.optionalQuantifier&&a.match.newBlockMarker||f&&(f!==l[n].locator[c.alternation]&&null!=a.match.fn||null===a.match.fn&&a.locator[c.alternation]&&O(a.locator[c.alternation].toString().split(","),f.toString().split(","))&&""!==x(n)[0].def))&&r[n]===L(n,a.match);n--)o--;return t?{l:o,def:l[o]?l[o].match:i}:o}function N(e){for(var t,n=I(),a=e.length,r=m().validPositions[v()];n<a&&!S(n,!0)&&(t=r!==i?E(n,r.locator.slice(""),r):P(n))&&!0!==t.match.optionality&&(!0!==t.match.optionalQuantifier&&!0!==t.match.newBlockMarker||n+1===a&&""===(r!==i?E(n+1,r.locator.slice(""),r):P(n+1)).match.def);)n++;for(;(t=m().validPositions[n-1])&&t&&t.match.optionality&&t.input===c.skipOptionalPartCharacter;)n--;return e.splice(n),e}function K(t){if(e.isFunction(c.isComplete))return c.isComplete(t,c);if("*"===c.repeat)return i;var n=!1,a=I(!0),r=D(a.l);if(a.def===i||a.def.newBlockMarker||a.def.optionality||a.def.optionalQuantifier){n=!0;for(var o=0;o<=r;o++){var s=E(o).match;if(null!==s.fn&&m().validPositions[o]===i&&!0!==s.optionality&&!0!==s.optionalQuantifier||null===s.fn&&t[o]!==L(o,s)){n=!1;break}}}return n}function V(e,t,n,r,o){if((c.numericInput||J)&&(t===a.keyCode.BACKSPACE?t=a.keyCode.DELETE:t===a.keyCode.DELETE&&(t=a.keyCode.BACKSPACE),J)){var s=n.end;n.end=n.begin,n.begin=s}if(t===a.keyCode.BACKSPACE&&(n.end-n.begin<1||!1===c.insertMode)?(n.begin=D(n.begin),m().validPositions[n.begin]!==i&&m().validPositions[n.begin].input===c.groupSeparator&&n.begin--):t===a.keyCode.DELETE&&n.begin===n.end&&(n.end=S(n.end,!0)&&m().validPositions[n.end]&&m().validPositions[n.end].input!==c.radixPoint?n.end+1:T(n.end)+1,m().validPositions[n.begin]!==i&&m().validPositions[n.begin].input===c.groupSeparator&&n.end++),k(n.begin,n.end,!1,r),!0!==r&&null!==c.keepStatic&&!1!==c.keepStatic){var l=j(!0);l&&(n.begin=l.caret!==i?l.caret:l.pos?T(l.pos.begin?l.pos.begin:l.pos):v(-1,!0))}var u=v(n.begin,!0);if(u<n.begin||-1===n.begin)m().p=T(u);else if(!0!==r&&(m().p=n.begin,!0!==o))for(;m().p<u&&m().validPositions[m().p]===i;)m().p++}function H(i){var a=(i.ownerDocument.defaultView||t).getComputedStyle(i,null),r=n.createElement("div");r.style.width=a.width,r.style.textAlign=a.textAlign,Z=n.createElement("div"),i.inputmask.colorMask=Z,Z.className="im-colormask",i.parentNode.insertBefore(Z,i),i.parentNode.removeChild(i),Z.appendChild(r),Z.appendChild(i),i.style.left=r.offsetLeft+"px",e(i).on("click",function(e){return R(i,function(e){var t,r=n.createElement("span");for(var o in a)isNaN(o)&&-1!==o.indexOf("font")&&(r.style[o]=a[o]);r.style.textTransform=a.textTransform,r.style.letterSpacing=a.letterSpacing,r.style.position="absolute",r.style.height="auto",r.style.width="auto",r.style.visibility="hidden",r.style.whiteSpace="nowrap",n.body.appendChild(r);var s,l=i.inputmask._valueGet(),c=0;for(t=0,s=l.length;t<=s;t++){if(r.innerHTML+=l.charAt(t)||"_",r.offsetWidth>=e){var u=e-c,f=r.offsetWidth-e;r.innerHTML=l.charAt(t),t=(u-=r.offsetWidth/3)<f?t-1:t;break}c=r.offsetWidth}return n.body.removeChild(r),t}(e.clientX)),re.clickEvent.call(i,[e])}),e(i).on("keydown",function(e){e.shiftKey||!1===c.insertMode||setTimeout(function(){U(i)},0)})}function U(e,t,a){function r(e){if(e===i&&(e=""),f||null!==o.fn&&s.input!==i)if(f&&(null!==o.fn&&s.input!==i||""===o.def)){f=!1;var t=u.length;u[t-1]=u[t-1]+"</span>",u.push(e)}else u.push(e);else f=!0,u.push("<span class='im-static'>"+e)}var o,s,l,u=[],f=!1,p=0;if(Z!==i){var h=w();if(t===i?t=R(e):t.begin===i&&(t={begin:t,end:t}),!0!==a){var d=v();do{m().validPositions[p]?(s=m().validPositions[p],o=s.match,l=s.locator.slice(),r(h[p])):(s=E(p,l,p-1),o=s.match,l=s.locator.slice(),(!1===c.jitMasking||p<d||"number"==typeof c.jitMasking&&isFinite(c.jitMasking)&&c.jitMasking>p)&&r(L(p,o))),p++}while((W===i||p<W)&&(null!==o.fn||""!==o.def)||d>p||f);f&&r(),n.activeElement===e&&(u.splice(t.begin,0,t.begin===t.end?'<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">':'<mark class="im-caret-select">'),u.splice(t.end+1,0,"</mark>"))}var k=Z.getElementsByTagName("div")[0];k.innerHTML=u.join(""),e.inputmask.positionColorMask(e,k)}}o=o||this.maskset,c=c||this.opts;var q,Q,W,Z,z,$=this,X=this.el,J=this.isRTL,Y=!1,ee=!1,te=!1,ne=!1,ie=!1,ae={on:function(t,n,r){var o=function(t){var n=this;if(n.inputmask===i&&"FORM"!==this.nodeName){var o=e.data(n,"_inputmask_opts");o?new a(o).mask(n):ae.off(n)}else{if("setvalue"===t.type||"FORM"===this.nodeName||!(n.disabled||n.readOnly&&!("keydown"===t.type&&t.ctrlKey&&67===t.keyCode||!1===c.tabThrough&&t.keyCode===a.keyCode.TAB))){switch(t.type){case"input":if(!0===ee)return ee=!1,t.preventDefault();u&&(ie=!0);break;case"keydown":Y=!1,ee=!1;break;case"keypress":if(!0===Y)return t.preventDefault();Y=!0;break;case"click":if(f||p){var s=arguments;return setTimeout(function(){r.apply(n,s)},0),!1}}var l=r.apply(n,arguments);return ie&&(ie=!1,setTimeout(function(){R(n,n.inputmask.caretPos,i,!0)})),!1===l&&(t.preventDefault(),t.stopPropagation()),l}t.preventDefault()}};t.inputmask.events[n]=t.inputmask.events[n]||[],t.inputmask.events[n].push(o),-1!==e.inArray(n,["submit","reset"])?null!==t.form&&e(t.form).on(n,o):e(t).on(n,o)},off:function(t,n){var i;t.inputmask&&t.inputmask.events&&(n?(i=[])[n]=t.inputmask.events[n]:i=t.inputmask.events,e.each(i,function(n,i){for(;i.length>0;){var a=i.pop();-1!==e.inArray(n,["submit","reset"])?null!==t.form&&e(t.form).off(n,a):e(t).off(n,a)}delete t.inputmask.events[n]}))}},re={keydownEvent:function(t){var n=this,i=e(n),r=t.keyCode,o=R(n);if(r===a.keyCode.BACKSPACE||r===a.keyCode.DELETE||p&&r===a.keyCode.BACKSPACE_SAFARI||t.ctrlKey&&r===a.keyCode.X&&!s("cut"))t.preventDefault(),V(0,r,o),G(n,w(!0),m().p,t,n.inputmask._valueGet()!==w().join("")),n.inputmask._valueGet()===_().join("")?i.trigger("cleared"):!0===K(w())&&i.trigger("complete");else if(r===a.keyCode.END||r===a.keyCode.PAGE_DOWN){t.preventDefault();var l=T(v());c.insertMode||l!==m().maskLength||t.shiftKey||l--,R(n,t.shiftKey?o.begin:l,l,!0)}else r===a.keyCode.HOME&&!t.shiftKey||r===a.keyCode.PAGE_UP?(t.preventDefault(),R(n,0,t.shiftKey?o.begin:0,!0)):(c.undoOnEscape&&r===a.keyCode.ESCAPE||90===r&&t.ctrlKey)&&!0!==t.altKey?(B(n,!0,!1,q.split("")),i.trigger("click")):r!==a.keyCode.INSERT||t.shiftKey||t.ctrlKey?!0===c.tabThrough&&r===a.keyCode.TAB?(!0===t.shiftKey?(null===P(o.begin).match.fn&&(o.begin=T(o.begin)),o.end=D(o.begin,!0),o.begin=D(o.end,!0)):(o.begin=T(o.begin,!0),o.end=T(o.begin,!0),o.end<m().maskLength&&o.end--),o.begin<m().maskLength&&(t.preventDefault(),R(n,o.begin,o.end))):t.shiftKey||!1===c.insertMode&&(r===a.keyCode.RIGHT?setTimeout(function(){var e=R(n);R(n,e.begin)},0):r===a.keyCode.LEFT&&setTimeout(function(){var e=R(n);R(n,J?e.begin+1:e.begin-1)},0)):(c.insertMode=!c.insertMode,R(n,c.insertMode||o.begin!==m().maskLength?o.begin:o.begin-1));c.onKeyDown.call(this,t,w(),R(n).begin,c),te=-1!==e.inArray(r,c.ignorables)},keypressEvent:function(t,n,r,o,s){var l=this,u=e(l),f=t.which||t.charCode||t.keyCode;if(!(!0===n||t.ctrlKey&&t.altKey)&&(t.ctrlKey||t.metaKey||te))return f===a.keyCode.ENTER&&q!==w().join("")&&(q=w().join(""),setTimeout(function(){u.trigger("change")},0)),!0;if(f){46===f&&!1===t.shiftKey&&""!==c.radixPoint&&(f=c.radixPoint.charCodeAt(0));var p,h=n?{begin:s,end:s}:R(l),v=String.fromCharCode(f);m().writeOutBuffer=!0;var k=M(h,v,o);if(!1!==k&&(d(!0),p=k.caret!==i?k.caret:T(k.pos.begin?k.pos.begin:k.pos),m().p=p),p=c.numericInput&&k.caret===i?D(p):p,!1!==r&&(setTimeout(function(){c.onKeyValidation.call(l,f,k,c)},0),m().writeOutBuffer&&!1!==k)){var g=w();G(l,g,p,t,!0!==n),!0!==n&&setTimeout(function(){!0===K(g)&&u.trigger("complete")},0)}if(t.preventDefault(),n)return!1!==k&&(k.forwardPosition=p),k}},pasteEvent:function(n){var i,a=n.originalEvent||n,r=e(this),o=this.inputmask._valueGet(!0),s=R(this);J&&(i=s.end,s.end=s.begin,s.begin=i);var l=o.substr(0,s.begin),u=o.substr(s.end,o.length);if(l===(J?_().reverse():_()).slice(0,s.begin).join("")&&(l=""),u===(J?_().reverse():_()).slice(s.end).join("")&&(u=""),J&&(i=l,l=u,u=i),t.clipboardData&&t.clipboardData.getData)o=l+t.clipboardData.getData("Text")+u;else{if(!a.clipboardData||!a.clipboardData.getData)return!0;o=l+a.clipboardData.getData("text/plain")+u}var f=o;if(e.isFunction(c.onBeforePaste)){if(!1===(f=c.onBeforePaste.call($,o,c)))return n.preventDefault();f||(f=o)}return B(this,!1,!1,J?f.split("").reverse():f.toString().split("")),G(this,w(),T(v()),n,q!==w().join("")),!0===K(w())&&r.trigger("complete"),n.preventDefault()},inputFallBackEvent:function(t){var n=this,i=n.inputmask._valueGet();if(w().join("")!==i){var r=R(n);if(i=function(e,t,n){if(f){var i=t.replace(w().join(""),"");if(1===i.length){var a=t.split("");a.splice(n.begin,0,i),t=a.join("")}}return t}(0,i=function(e,t,n){return"."===t.charAt(n.begin-1)&&""!==c.radixPoint&&((t=t.split(""))[n.begin-1]=c.radixPoint.charAt(0),t=t.join("")),t}(0,i,r),r),w().join("")!==i){var o=w().join(""),s=i.length>o.length?-1:0,l=i.substr(0,r.begin),u=i.substr(r.begin),p=o.substr(0,r.begin+s),h=o.substr(r.begin+s),m=r,d="",v=!1;if(l!==p){for(var k=(v=l.length>=p.length)?l.length:p.length,g=0;l.charAt(g)===p.charAt(g)&&g<k;g++);v&&(0===s&&(m.begin=g),d+=l.slice(g,m.end))}if(u!==h&&(u.length>h.length?d+=u.slice(0,1):u.length<h.length&&(m.end+=h.length-u.length,v||""===c.radixPoint||""!==u||l.charAt(m.begin+s-1)!==c.radixPoint||(m.begin--,d=c.radixPoint))),G(n,w(),{begin:m.begin+s,end:m.end+s}),d.length>0)e.each(d.split(""),function(t,i){var a=new e.Event("keypress");a.which=i.charCodeAt(0),te=!1,re.keypressEvent.call(n,a)});else{m.begin===m.end-1&&(m.begin=D(m.begin+1),m.begin===m.end-1?R(n,m.begin):R(n,m.begin,m.end));var b=new e.Event("keydown");b.keyCode=a.keyCode.DELETE,re.keydownEvent.call(n,b),!1===c.insertMode&&R(n,R(n).begin-1)}t.preventDefault()}}},setValueEvent:function(t){this.inputmask.refreshValue=!1;var n=this.inputmask._valueGet(!0);e.isFunction(c.onBeforeMask)&&(n=c.onBeforeMask.call($,n,c)||n),n=n.split(""),B(this,!0,!1,J?n.reverse():n),q=w().join(""),(c.clearMaskOnLostFocus||c.clearIncomplete)&&this.inputmask._valueGet()===_().join("")&&this.inputmask._valueSet("")},focusEvent:function(e){var t=this.inputmask._valueGet();c.showMaskOnFocus&&(!c.showMaskOnHover||c.showMaskOnHover&&""===t)&&(this.inputmask._valueGet()!==w().join("")?G(this,w(),T(v())):!1===ne&&R(this,T(v()))),!0===c.positionCaretOnTab&&!1===ne&&re.clickEvent.apply(this,[e,!0]),q=w().join("")},mouseleaveEvent:function(e){if(ne=!1,c.clearMaskOnLostFocus&&n.activeElement!==this){var t=w().slice(),i=this.inputmask._valueGet();i!==this.getAttribute("placeholder")&&""!==i&&(-1===v()&&i===_().join("")?t=[]:N(t),G(this,t))}},clickEvent:function(t,a){var r=this;setTimeout(function(){if(n.activeElement===r){var t=R(r);if(a&&(J?t.end=t.begin:t.begin=t.end),t.begin===t.end)switch(c.positionCaretOnClick){case"none":break;case"select":R(r,0,w().length);break;case"radixFocus":if(function(t){if(""!==c.radixPoint){var n=m().validPositions;if(n[t]===i||n[t].input===L(t)){if(t<T(-1))return!0;var a=e.inArray(c.radixPoint,w());if(-1!==a){for(var r in n)if(a<r&&n[r].input!==L(r))return!1;return!0}}}return!1}(t.begin)){var o=w().join("").indexOf(c.radixPoint);R(r,c.numericInput?T(o):o);break}default:var s=t.begin,l=v(s,!0),u=T(l);if(s<u)R(r,S(s,!0)||S(s-1,!0)?s:T(s));else{var f=m().validPositions[l],p=E(u,f?f.match.locator:i,f),h=L(u,p.match);if(""!==h&&w()[u]!==h&&!0!==p.match.optionalQuantifier&&!0!==p.match.newBlockMarker||!S(u,!0)&&p.match.def===h){var d=T(u);(s>=d||s===u)&&(u=d)}R(r,u)}}}},0)},dblclickEvent:function(e){var t=this;setTimeout(function(){R(t,0,T(v()))},0)},cutEvent:function(i){var r=e(this),o=R(this),s=i.originalEvent||i,l=t.clipboardData||s.clipboardData,c=J?w().slice(o.end,o.begin):w().slice(o.begin,o.end);l.setData("text",J?c.reverse().join(""):c.join("")),n.execCommand&&n.execCommand("copy"),V(0,a.keyCode.DELETE,o),G(this,w(),m().p,i,q!==w().join("")),this.inputmask._valueGet()===_().join("")&&r.trigger("cleared")},blurEvent:function(t){var n=e(this);if(this.inputmask){var a=this.inputmask._valueGet(),r=w().slice();""===a&&Z===i||(c.clearMaskOnLostFocus&&(-1===v()&&a===_().join("")?r=[]:N(r)),!1===K(r)&&(setTimeout(function(){n.trigger("incomplete")},0),c.clearIncomplete&&(d(),r=c.clearMaskOnLostFocus?[]:_().slice())),G(this,r,i,t)),q!==w().join("")&&(q=r.join(""),n.trigger("change"))}},mouseenterEvent:function(e){ne=!0,n.activeElement!==this&&c.showMaskOnHover&&this.inputmask._valueGet()!==w().join("")&&G(this,w())},submitEvent:function(e){q!==w().join("")&&Q.trigger("change"),c.clearMaskOnLostFocus&&-1===v()&&X.inputmask._valueGet&&X.inputmask._valueGet()===_().join("")&&X.inputmask._valueSet(""),c.removeMaskOnSubmit&&(X.inputmask._valueSet(X.inputmask.unmaskedvalue(),!0),setTimeout(function(){G(X,w())},0))},resetEvent:function(e){X.inputmask.refreshValue=!0,setTimeout(function(){Q.trigger("setvalue")},0)}};if(a.prototype.positionColorMask=function(e,t){e.style.left=t.offsetLeft+"px"},r!==i)switch(r.action){case"isComplete":return X=r.el,K(w());case"unmaskedvalue":return X!==i&&r.value===i||(z=r.value,z=(e.isFunction(c.onBeforeMask)&&c.onBeforeMask.call($,z,c)||z).split(""),B(i,!1,!1,J?z.reverse():z),e.isFunction(c.onBeforeWrite)&&c.onBeforeWrite.call($,i,w(),0,c)),F(X);case"mask":!function(t){ae.off(t);var a=function(t,a){var r=t.getAttribute("type"),o="INPUT"===t.tagName&&-1!==e.inArray(r,a.supportsInputType)||t.isContentEditable||"TEXTAREA"===t.tagName;if(!o)if("INPUT"===t.tagName){var s=n.createElement("input");s.setAttribute("type",r),o="text"===s.type,s=null}else o="partial";return!1!==o?function(t){function r(){return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():-1!==v()||!0!==a.nullable?n.activeElement===this&&a.clearMaskOnLostFocus?(J?N(w().slice()).reverse():N(w().slice())).join(""):s.call(this):"":s.call(this)}function o(t){l.call(this,t),this.inputmask&&e(this).trigger("setvalue")}var s,l;if(!t.inputmask.__valueGet){if(!0!==a.noValuePatching){if(Object.getOwnPropertyDescriptor){"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"==typeof"test".__proto__?function(e){return e.__proto__}:function(e){return e.constructor.prototype});var c=Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"value"):i;c&&c.get&&c.set?(s=c.get,l=c.set,Object.defineProperty(t,"value",{get:r,set:o,configurable:!0})):"INPUT"!==t.tagName&&(s=function(){return this.textContent},l=function(e){this.textContent=e},Object.defineProperty(t,"value",{get:r,set:o,configurable:!0}))}else n.__lookupGetter__&&t.__lookupGetter__("value")&&(s=t.__lookupGetter__("value"),l=t.__lookupSetter__("value"),t.__defineGetter__("value",r),t.__defineSetter__("value",o));t.inputmask.__valueGet=s,t.inputmask.__valueSet=l}t.inputmask._valueGet=function(e){return J&&!0!==e?s.call(this.el).split("").reverse().join(""):s.call(this.el)},t.inputmask._valueSet=function(e,t){l.call(this.el,null===e||e===i?"":!0!==t&&J?e.split("").reverse().join(""):e)},s===i&&(s=function(){return this.value},l=function(e){this.value=e},function(t){if(e.valHooks&&(e.valHooks[t]===i||!0!==e.valHooks[t].inputmaskpatch)){var n=e.valHooks[t]&&e.valHooks[t].get?e.valHooks[t].get:function(e){return e.value},r=e.valHooks[t]&&e.valHooks[t].set?e.valHooks[t].set:function(e,t){return e.value=t,e};e.valHooks[t]={get:function(e){if(e.inputmask){if(e.inputmask.opts.autoUnmask)return e.inputmask.unmaskedvalue();var t=n(e);return-1!==v(i,i,e.inputmask.maskset.validPositions)||!0!==a.nullable?t:""}return n(e)},set:function(t,n){var i,a=e(t);return i=r(t,n),t.inputmask&&a.trigger("setvalue"),i},inputmaskpatch:!0}}}(t.type),function(t){ae.on(t,"mouseenter",function(t){var n=e(this);this.inputmask._valueGet()!==w().join("")&&n.trigger("setvalue")})}(t))}}(t):t.inputmask=i,o}(t,c);if(!1!==a&&(Q=e(X=t),-1===(W=X!==i?X.maxLength:i)&&(W=i),!0===c.colorMask&&H(X),u&&("inputmode"in X&&(X.inputmode=c.inputmode,X.setAttribute("inputmode",c.inputmode)),!0===c.disablePredictiveText&&("autocorrect"in X?X.autocorrect=!1:(!0!==c.colorMask&&H(X),X.type="password"))),!0===a&&(ae.on(X,"submit",re.submitEvent),ae.on(X,"reset",re.resetEvent),ae.on(X,"mouseenter",re.mouseenterEvent),ae.on(X,"blur",re.blurEvent),ae.on(X,"focus",re.focusEvent),ae.on(X,"mouseleave",re.mouseleaveEvent),!0!==c.colorMask&&ae.on(X,"click",re.clickEvent),ae.on(X,"dblclick",re.dblclickEvent),ae.on(X,"paste",re.pasteEvent),ae.on(X,"dragdrop",re.pasteEvent),ae.on(X,"drop",re.pasteEvent),ae.on(X,"cut",re.cutEvent),ae.on(X,"complete",c.oncomplete),ae.on(X,"incomplete",c.onincomplete),ae.on(X,"cleared",c.oncleared),u||!0===c.inputEventOnly?X.removeAttribute("maxLength"):(ae.on(X,"keydown",re.keydownEvent),ae.on(X,"keypress",re.keypressEvent)),ae.on(X,"compositionstart",e.noop),ae.on(X,"compositionupdate",e.noop),ae.on(X,"compositionend",e.noop),ae.on(X,"keyup",e.noop),ae.on(X,"input",re.inputFallBackEvent),ae.on(X,"beforeinput",e.noop)),ae.on(X,"setvalue",re.setValueEvent),q=_().join(""),""!==X.inputmask._valueGet(!0)||!1===c.clearMaskOnLostFocus||n.activeElement===X)){var r=e.isFunction(c.onBeforeMask)&&c.onBeforeMask.call($,X.inputmask._valueGet(!0),c)||X.inputmask._valueGet(!0);""!==r&&B(X,!0,!1,J?r.split("").reverse():r.split(""));var o=w().slice();q=o.join(""),!1===K(o)&&c.clearIncomplete&&d(),c.clearMaskOnLostFocus&&n.activeElement!==X&&(-1===v()?o=[]:N(o)),G(X,o),n.activeElement===X&&R(X,T(v()))}}(X);break;case"format":return z=(e.isFunction(c.onBeforeMask)&&c.onBeforeMask.call($,r.value,c)||r.value).split(""),B(i,!0,!1,J?z.reverse():z),r.metadata?{value:J?w().slice().reverse().join(""):w().join(""),metadata:l.call(this,{action:"getmetadata"},o,c)}:J?w().slice().reverse().join(""):w().join("");case"isValid":r.value?(z=r.value.split(""),B(i,!0,!0,J?z.reverse():z)):r.value=w().join("");for(var oe=w(),se=I(),le=oe.length-1;le>se&&!S(le);le--);return oe.splice(se,le+1-se),K(oe)&&r.value===w().join("");case"getemptymask":return _().join("");case"remove":return X&&X.inputmask&&(Q=e(X),X.inputmask._valueSet(c.autoUnmask?F(X):X.inputmask._valueGet(!0)),ae.off(X),X.inputmask.colorMask&&((Z=X.inputmask.colorMask).removeChild(X),Z.parentNode.insertBefore(X,Z),Z.parentNode.removeChild(Z)),Object.getOwnPropertyDescriptor&&Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(X),"value")&&X.inputmask.__valueGet&&Object.defineProperty(X,"value",{get:X.inputmask.__valueGet,set:X.inputmask.__valueSet,configurable:!0}):n.__lookupGetter__&&X.__lookupGetter__("value")&&X.inputmask.__valueGet&&(X.__defineGetter__("value",X.inputmask.__valueGet),X.__defineSetter__("value",X.inputmask.__valueSet)),X.inputmask=i),X;case"getmetadata":if(e.isArray(o.metadata)){var ce=h(!0,0,!1).join("");return e.each(o.metadata,function(e,t){if(t.mask===ce)return ce=t,!1}),ce}return o.metadata}}var c=navigator.userAgent,u=s("touchstart"),f=/iemobile/i.test(c),p=/iphone/i.test(c)&&!f;return a.prototype={dataAttribute:"data-inputmask",defaults:{placeholder:"_",optionalmarker:["[","]"],quantifiermarker:["{","}"],groupmarker:["(",")"],alternatormarker:"|",escapeChar:"\\",mask:null,regex:null,oncomplete:e.noop,onincomplete:e.noop,oncleared:e.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,alias:null,onKeyDown:e.noop,onBeforeMask:null,onBeforePaste:function(t,n){return e.isFunction(n.onBeforeMask)?n.onBeforeMask.call(this,t,n):t},onBeforeWrite:null,onUnMask:null,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:e.noop,skipOptionalPartCharacter:" ",numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",radixPointDefinitionSymbol:i,groupSeparator:"",keepStatic:null,positionCaretOnTab:!0,tabThrough:!1,supportsInputType:["text","tel","password","search"],ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123,0,229],isComplete:null,canClearPosition:e.noop,preValidation:null,postValidation:null,staticDefinitionSymbol:i,jitMasking:!1,nullable:!0,inputEventOnly:!1,noValuePatching:!1,positionCaretOnClick:"lvp",casing:null,inputmode:"verbatim",colorMask:!1,disablePredictiveText:!1,importDataAttributes:!0},definitions:{9:{validator:"[0-9１-９]",definitionSymbol:"*"},a:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",definitionSymbol:"*"},"*":{validator:"[0-9１-９A-Za-zА-яЁёÀ-ÿµ]"}},aliases:{},masksCache:{},mask:function(s){var c=this;return"string"==typeof s&&(s=n.getElementById(s)||n.querySelectorAll(s)),s=s.nodeName?[s]:s,e.each(s,function(n,s){var u=e.extend(!0,{},c.opts);if(function(n,a,o,s){function l(e,a){null!==(a=a!==i?a:n.getAttribute(s+"-"+e))&&("string"==typeof a&&(0===e.indexOf("on")?a=t[a]:"false"===a?a=!1:"true"===a&&(a=!0)),o[e]=a)}if(!0===a.importDataAttributes){var c,u,f,p,h=n.getAttribute(s);if(h&&""!==h&&(h=h.replace(/'/g,'"'),u=JSON.parse("{"+h+"}")),u)for(p in f=i,u)if("alias"===p.toLowerCase()){f=u[p];break}for(c in l("alias",f),o.alias&&r(o.alias,o,a),a){if(u)for(p in f=i,u)if(p.toLowerCase()===c.toLowerCase()){f=u[p];break}l(c,f)}}return e.extend(!0,a,o),("rtl"===n.dir||a.rightAlign)&&(n.style.textAlign="right"),("rtl"===n.dir||a.numericInput)&&(n.dir="ltr",n.removeAttribute("dir"),a.isRTL=!0),Object.keys(o).length}(s,u,e.extend(!0,{},c.userOptions),c.dataAttribute)){var f=o(u,c.noMasksCache);f!==i&&(s.inputmask!==i&&(s.inputmask.opts.autoUnmask=!0,s.inputmask.remove()),s.inputmask=new a(i,i,!0),s.inputmask.opts=u,s.inputmask.noMasksCache=c.noMasksCache,s.inputmask.userOptions=e.extend(!0,{},c.userOptions),s.inputmask.isRTL=u.isRTL||u.numericInput,s.inputmask.el=s,s.inputmask.maskset=f,e.data(s,"_inputmask_opts",u),l.call(s.inputmask,{action:"mask"}))}}),s&&s[0]&&s[0].inputmask||this},option:function(t,n){return"string"==typeof t?this.opts[t]:"object"==typeof t?(e.extend(this.userOptions,t),this.el&&!0!==n&&this.mask(this.el),this):void 0},unmaskedvalue:function(e){return this.maskset=this.maskset||o(this.opts,this.noMasksCache),l.call(this,{action:"unmaskedvalue",value:e})},remove:function(){return l.call(this,{action:"remove"})},getemptymask:function(){return this.maskset=this.maskset||o(this.opts,this.noMasksCache),l.call(this,{action:"getemptymask"})},hasMaskedValue:function(){return!this.opts.autoUnmask},isComplete:function(){return this.maskset=this.maskset||o(this.opts,this.noMasksCache),l.call(this,{action:"isComplete"})},getmetadata:function(){return this.maskset=this.maskset||o(this.opts,this.noMasksCache),l.call(this,{action:"getmetadata"})},isValid:function(e){return this.maskset=this.maskset||o(this.opts,this.noMasksCache),l.call(this,{action:"isValid",value:e})},format:function(e,t){return this.maskset=this.maskset||o(this.opts,this.noMasksCache),l.call(this,{action:"format",value:e,metadata:t})},analyseMask:function(t,n,r){function o(e,t,n,i){this.matches=[],this.openGroup=e||!1,this.alternatorGroup=!1,this.isGroup=e||!1,this.isOptional=t||!1,this.isQuantifier=n||!1,this.isAlternator=i||!1,this.quantifier={min:1,max:1}}function s(t,o,s){s=s!==i?s:t.matches.length;var l=t.matches[s-1];if(n)0===o.indexOf("[")||g&&/\\d|\\s|\\w]/i.test(o)||"."===o?t.matches.splice(s++,0,{fn:new RegExp(o,r.casing?"i":""),optionality:t.isOptional,newBlockMarker:l===i||l.def!==o,casing:null,def:o,placeholder:i,nativeDef:o}):(g&&(o=o[o.length-1]),e.each(o.split(""),function(e,n){l=t.matches[s-1],t.matches.splice(s++,0,{fn:null,optionality:t.isOptional,newBlockMarker:l===i||l.def!==n&&null!==l.fn,casing:null,def:r.staticDefinitionSymbol||n,placeholder:r.staticDefinitionSymbol!==i?n:i,nativeDef:n})})),g=!1;else{var c=(r.definitions?r.definitions[o]:i)||a.prototype.definitions[o];c&&!g?t.matches.splice(s++,0,{fn:c.validator?"string"==typeof c.validator?new RegExp(c.validator,r.casing?"i":""):new function(){this.test=c.validator}:new RegExp("."),optionality:t.isOptional,newBlockMarker:l===i||l.def!==(c.definitionSymbol||o),casing:c.casing,def:c.definitionSymbol||o,placeholder:c.placeholder,nativeDef:o}):(t.matches.splice(s++,0,{fn:null,optionality:t.isOptional,newBlockMarker:l===i||l.def!==o&&null!==l.fn,casing:null,def:r.staticDefinitionSymbol||o,placeholder:r.staticDefinitionSymbol!==i?o:i,nativeDef:o}),g=!1)}}function l(){if(y.length>0){if(s(p=y[y.length-1],u),p.isAlternator){h=y.pop();for(var e=0;e<h.matches.length;e++)h.matches[e].isGroup=!1;y.length>0?(p=y[y.length-1]).matches.push(h):b.matches.push(h)}}else s(b,u)}var c,u,f,p,h,m,d,v=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,k=/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,g=!1,b=new o,y=[],E=[];for(n&&(r.optionalmarker[0]=i,r.optionalmarker[1]=i);c=n?k.exec(t):v.exec(t);){if(u=c[0],n)switch(u.charAt(0)){case"?":u="{0,1}";break;case"+":case"*":u="{"+u+"}"}if(g)l();else switch(u.charAt(0)){case r.escapeChar:g=!0,n&&l();break;case r.optionalmarker[1]:case r.groupmarker[1]:if((f=y.pop()).openGroup=!1,f!==i)if(y.length>0){if((p=y[y.length-1]).matches.push(f),p.isAlternator){h=y.pop();for(var P=0;P<h.matches.length;P++)h.matches[P].isGroup=!1,h.matches[P].alternatorGroup=!1;y.length>0?(p=y[y.length-1]).matches.push(h):b.matches.push(h)}}else b.matches.push(f);else l();break;case r.optionalmarker[0]:y.push(new o(!1,!0));break;case r.groupmarker[0]:y.push(new o(!0));break;case r.quantifiermarker[0]:var C=new o(!1,!1,!0),x=(u=u.replace(/[{}]/g,"")).split(","),_=isNaN(x[0])?x[0]:parseInt(x[0]),w=1===x.length?_:isNaN(x[1])?x[1]:parseInt(x[1]);if("*"!==w&&"+"!==w||(_="*"===w?0:1),C.quantifier={min:_,max:w},y.length>0){var A=y[y.length-1].matches;(c=A.pop()).isGroup||((d=new o(!0)).matches.push(c),c=d),A.push(c),A.push(C)}else(c=b.matches.pop()).isGroup||(n&&null===c.fn&&"."===c.def&&(c.fn=new RegExp(c.def,r.casing?"i":"")),(d=new o(!0)).matches.push(c),c=d),b.matches.push(c),b.matches.push(C);break;case r.alternatormarker:if(y.length>0){var O=(p=y[y.length-1]).matches[p.matches.length-1];m=p.openGroup&&(O.matches===i||!1===O.isGroup&&!1===O.isAlternator)?y.pop():p.matches.pop()}else m=b.matches.pop();if(m.isAlternator)y.push(m);else if(m.alternatorGroup?(h=y.pop(),m.alternatorGroup=!1):h=new o(!1,!1,!1,!0),h.matches.push(m),y.push(h),m.openGroup){m.openGroup=!1;var j=new o(!0);j.alternatorGroup=!0,y.push(j)}break;default:l()}}for(;y.length>0;)f=y.pop(),b.matches.push(f);return b.matches.length>0&&(function t(a){a&&a.matches&&e.each(a.matches,function(e,o){var l=a.matches[e+1];(l===i||l.matches===i||!1===l.isQuantifier)&&o&&o.isGroup&&(o.isGroup=!1,n||(s(o,r.groupmarker[0],0),!0!==o.openGroup&&s(o,r.groupmarker[1]))),t(o)})}(b),E.push(b)),(r.numericInput||r.isRTL)&&function e(t){for(var n in t.matches=t.matches.reverse(),t.matches)if(t.matches.hasOwnProperty(n)){var a=parseInt(n);if(t.matches[n].isQuantifier&&t.matches[a+1]&&t.matches[a+1].isGroup){var o=t.matches[n];t.matches.splice(n,1),t.matches.splice(a+1,0,o)}t.matches[n].matches!==i?t.matches[n]=e(t.matches[n]):t.matches[n]=((s=t.matches[n])===r.optionalmarker[0]?s=r.optionalmarker[1]:s===r.optionalmarker[1]?s=r.optionalmarker[0]:s===r.groupmarker[0]?s=r.groupmarker[1]:s===r.groupmarker[1]&&(s=r.groupmarker[0]),s)}var s;return t}(E[0]),E}},a.extendDefaults=function(t){e.extend(!0,a.prototype.defaults,t)},a.extendDefinitions=function(t){e.extend(!0,a.prototype.definitions,t)},a.extendAliases=function(t){e.extend(!0,a.prototype.aliases,t)},a.format=function(e,t,n){return a(t).format(e,n)},a.unmask=function(e,t){return a(t).unmaskedvalue(e)},a.isValid=function(e,t){return a(t).isValid(e)},a.remove=function(t){e.each(t,function(e,t){t.inputmask&&t.inputmask.remove()})},a.escapeRegex=function(e){return e.replace(new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"].join("|\\")+")","gim"),"\\$1")},a.keyCode={BACKSPACE:8,BACKSPACE_SAFARI:127,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,RIGHT:39,SPACE:32,TAB:9,UP:38,X:88,CONTROL:17},a}),function(e){"function"==typeof define&&define.amd?define(["./dependencyLibs/inputmask.dependencyLib","./inputmask"],e):"object"==typeof exports?module.exports=e(require("./dependencyLibs/inputmask.dependencyLib"),require("./inputmask")):e(window.dependencyLib||jQuery,window.Inputmask)}(function(e,t){return t.extendDefinitions({A:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",casing:"upper"},"&":{validator:"[0-9A-Za-zА-яЁёÀ-ÿµ]",casing:"upper"},"#":{validator:"[0-9A-Fa-f]",casing:"upper"}}),t.extendAliases({url:{definitions:{i:{validator:"."}},mask:"(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",insertMode:!1,autoUnmask:!1,inputmode:"url"},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function(e,t,n,i,a){return n-1>-1&&"."!==t.buffer[n-1]?(e=t.buffer[n-1]+e,e=n-2>-1&&"."!==t.buffer[n-2]?t.buffer[n-2]+e:"0"+e):e="00"+e,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(e)}}},onUnMask:function(e,t,n){return e},inputmode:"numeric"},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",greedy:!1,onBeforePaste:function(e,t){return(e=e.toLowerCase()).replace("mailto:","")},definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",casing:"lower"},"-":{validator:"[0-9A-Za-z-]",casing:"lower"}},onUnMask:function(e,t,n){return e},inputmode:"email"},mac:{mask:"##:##:##:##:##:##"},vin:{mask:"V{13}9{4}",definitions:{V:{validator:"[A-HJ-NPR-Za-hj-npr-z\\d]",casing:"upper"}},clearIncomplete:!0,autoUnmask:!0}}),t});
function Modal(options) {
   this.content = options.content;
   this.onShow = options.onShow;
   this.onHide = options.onHide;
   this.processing = false;

   this.show = function () {
      if (this.processing)
         return;

      this.processing = true;
      var body = document.querySelector("body");
      var modal = document.querySelector(".modal");
      var modalContent = document.querySelector(".modal-content");

      var modalBackdrop = document.createElement('div');
      modalBackdrop.className = "modal-backdrop fade";
      document.body.appendChild(modalBackdrop);

      modal.style = "display: block;";

      toogleClass(modal, "show");
      setTimeout(() => {
         toogleClass(body, "modal-open");
         body.style = "padding-right: 17px";
         toogleClass(modalBackdrop, "show");
         this.processing = false;
      }, 1);

      modalContent.insertAdjacentHTML('afterbegin', this.content);

      if (this.onShow)
         this.onShow();
   }

   this.hide = function () {

   }

   this.registerDismiss = function () {
      var modal = document.querySelector(".modal");
      var context = this;

      modal.onclick = function () {
         if (context.processing)
            return;

         context.processing = true;
         var body = document.querySelector("body");
         var modalContent = document.querySelector(".modal-content");
         var modal = document.querySelector(".modal");
         var modalBackdrop = document.querySelector(".modal-backdrop");

         if (this.onHide)
            this.onHide();

         toogleClass(modalBackdrop, "show");
         toogleClass(modal, "show");

         setTimeout(() => {
            body.style = "";
            toogleClass(body, "modal-open");
            modal.style = "";
            modalBackdrop.remove();
            modalContent.innerHTML = "";
            context.processing = false;
         }, 500);
      }

      var modalInnerElements = document.querySelectorAll(".modal *");
      for (var x = 0; x < modalInnerElements.length; x++) {
         modalInnerElements[x].onclick = function (ev) {
            ev.stopPropagation();
         }
      }
   }

   this.registerDismiss();
}
function OnePageNav(options) {
   this.options = options;
   this.options.debug = true;
   
   this.getPosition = function(element){
      var rect = element.getBoundingClientRect();
      
      return { x: rect.left, y: rect.top + window.scrollY };
   }

   this.init = function(){
      var nav = document.getElementById(options.menuElementId);
      var navItems = nav.getElementsByTagName('a');
      var that = this;

      for(var x = 0; x < navItems.length; x++)
      {
         var navItem = navItems[x];
         
         navItems[x].onclick = function(){
            var targetElement = document.querySelector('#' + this.getAttribute("data-div"));
            var position = that.getPosition(targetElement).y;
            if (that.options.additionalOffset)
               position -= that.options.additionalOffset;

            that.scrollIt(
               position,
               600,
               'easeOutQuad');

            return false;
         };
      }
   }

   this.scrollIt = function(destination, duration, easing, callback) {
      if (destination < 0)
         destination = 0;

      if (!easing)
         easing = 'linear';

      if(!duration)
         duration = 200;

      var easings = {
         linear: function(t) {
            return t;
         },
         easeInQuad: function(t) {
            return t * t;
         },
         easeOutQuad: function(t) {
            return t * (2 - t);
         },
         easeInOutQuad: function(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
         },
         easeInCubic: function(t) {
            return t * t * t;
         },
         easeOutCubic: function(t) {
            return (--t) * t * t + 1;
         },
         easeInOutCubic: function(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
         },
         easeInQuart: function(t) {
            return t * t * t * t;
         },
         easeOutQuart: function(t) {
            return 1 - (--t) * t * t * t;
         },
         easeInOutQuart: function(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
         },
         easeInQuint: function(t) {
            return t * t * t * t * t;
         },
         easeOutQuint: function(t) {
            return 1 + (--t) * t * t * t * t;
         },
         easeInOutQuint: function(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
         }
      };

      var start = window.pageYOffset;
      var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
      var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
      
      var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
      
      if ('requestAnimationFrame' in window === false) {
         window.scroll(0, destinationOffsetToScroll);
         if (callback) {
            callback();
         }
         return;
      }

      console.log(window.pageYOffset, destinationOffset);

      var toUp = (window.pageYOffset > destinationOffset);

      function scroll() {
         var debug = true;
         var now = 'now' in window.performance ? performance.now() : new Date().getTime();
         var time = Math.min(1, ((now - startTime) / duration));
         var timeFunction = easings[easing](time);

         var targetY = Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start);

         if (toUp)
            targetY = Math.trunc(targetY);
         else
            targetY = Math.trunc(targetY) + 1;

         if (targetY > documentHeight)
            targetY = documentHeight;

         if (debug) {
            console.log('time:' + time);
            console.log('targetY:' + targetY);
            console.log('window.pageYOffset:' + window.pageYOffset);
            console.log('destinationOffsetToScroll:' + destinationOffsetToScroll);
            console.log('destinationOffset:' + destinationOffset);
            console.log('toUp:' + toUp);
         }

         window.scroll(0, targetY);

         if (toUp)
         {
            if (window.pageYOffset <= destinationOffsetToScroll) {
               if (callback) {
                  callback();
               }
               return;
            }
         }            
         else
         {
            if (window.pageYOffset >= destinationOffsetToScroll) {
               if (callback) {
                  callback();
               }
               return;
            }
         }            

         requestAnimationFrame(scroll);
      }

      scroll();
   }

   this.init();
}
registerCardClicks = function () {
   var cards = document.querySelectorAll("#resume .card");

   for (var x = 0; x < cards.length; x++) {
      cards[x].onclick = function () {
         modal.content = this.querySelector(".additional-info").innerHTML;
         modal.show();
      }
   }
}

toogleClass = function (element, className) {
   if (element.classList.contains(className))
      element.classList.remove(className);
   else
      element.classList.add(className);
}

removeClass = function (element, className) {
   if (element.classList.contains(className))
      element.classList.remove(className);
}

hideTabs = function () {
   var tabPanels = document.querySelectorAll(".modal .tab-panel");

   var tabButtons = document.querySelectorAll(".modal .tab-controls li");

   for (var x = 0; x < tabPanels.length; x++) {
      removeClass(tabPanels[x], "show");
   }

   for (var x = 0; x < tabButtons.length; x++) {
      removeClass(tabButtons[x], "active");
   }
}

tabClick = function (tabButtonElement) {
   hideTabs();

   toogleClass(tabButtonElement.parentNode, "active");

   var panelTab = document.querySelector(".modal ." + tabButtonElement.getAttribute("data-tab"));

   toogleClass(panelTab, "show");
}

registerModalJobTabs = function () {
   var tabButtons = document.querySelectorAll(".modal .tab-btn");

   for (var x = 0; x < tabButtons.length; x++) {
      tabButtons[x].onclick = function () {
         tabClick(this);
         return false;
      }

      if (x === 0)
         tabClick(tabButtons[x]);
   }
}

hideCards = function () {
   var openedCards = document.querySelectorAll(".additional-info.show");

   for (var x = 0; x < openedCards.length; x++) {
      toogleClass(openedCards[x], "show");
   }
}

registerNavToogleButtonAction = function () {
   var button = document.querySelector(".btn.nav-toggle");

   button.onclick = function () {
      var body = document.querySelector("body");

      toogleClass(body, "opened-nav");

      return false;
   }
}

registerContactFormSubmit = function () {
   var form = document.querySelector(".contact form");
   form.addEventListener("submit", sendInfo, false);
}

function reqListener() {
   var fields = document.querySelectorAll(".contact form .form-control");
   fields.forEach(function (field) {
      field.value = "";
   });
}

sendInfo = function (e) {
   var baseUrl = "https://rodrigovargas-me-api.herokuapp.com";
   //var baseUrl = "http://localhost:3000";

   e.preventDefault();

   alert('Form send with success!');
   // get new XHR object
   var newXHR = new XMLHttpRequest();

   // bind our event listener to the "load" event.
   // "load" is fired when the response to our request is completed and without error.
   newXHR.addEventListener('load', reqListener);

   newXHR.open('POST', baseUrl + '/messages');

   newXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

   var formFields = document.querySelectorAll(".contact form .form-control");

   var formData = '';

   for (var x = 0; x < formFields.length; x++) {
      if (x !== 0)
         formData += "&";

      formData += formFields[x].name + "=" + formFields[x].value;
   }

   newXHR.send(formData);
}


registerCardClicks();

registerNavToogleButtonAction();

registerContactFormSubmit();

var modal = new Modal({
   onShow: registerModalJobTabs,
   onHide: hideCards,
   content: ""
})

var nav = new OnePageNav({
   menuElementId: "nav-items",
   additionalOffset: 50
});

Inputmask().mask(document.querySelectorAll("input"));

Timeline = function (options) {
   this.init = function(options){
      var selector = ".timeline";
      var timelineAttribute = "data-timeline";
      var context = this;

      var timelines = document.querySelectorAll(selector);

      for(var x = 0; x < timelines.length; x++)
      {
         if (timelines[x].getAttribute(timelineAttribute) === "true")
         {
            context.processItems(timelines[x]);
         }
      }
   }

   this.processItems = function(timeline){
      var items = timeline.querySelectorAll(".timeline-item");

      var margin = 30;
      var firstColumnHeight = 0;
      var secondColumnHeight = 50;

      var parentHeight = 0;
      var top = 0;

      var viewportWidth = Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
      
      var width = 50;

      if (viewportWidth < 768)
         width = 100;

      for (var x = 0; x < items.length; x++) {
         var style = "";

         if (viewportWidth < 768)
         {
            items[x].style = "";
            continue;
         }            

         style += "width: " + width + "%;";
         style += "top: " + top + "px;";

         if (x % 2 == 0) {
            style += "top: " + firstColumnHeight + "px;";
            items[x].classList.add("odd");
            style += "left: 0";
            firstColumnHeight += items[x].offsetHeight + margin;
         }
         else {
            style += "top: " + secondColumnHeight + "px;";
            items[x].classList.add("couple");
            style += "right: 0";
            secondColumnHeight += items[x].offsetHeight + margin;
         }

         items[x].style = style;
      }

      if (viewportWidth < 750)
         timeline.style = "height: auto;";
      else
         timeline.style = "height: " + secondColumnHeight + "px;";
   }

   this.init(options);
   var timelineContext = this;
   window.addEventListener('resize', function(){
      timelineContext.init();
   })
}

var timeline = new Timeline();