(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
          self = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            void 0,
            void 0,
            oldElement._owner,
            oldElement.props,
            oldElement._debugStack,
            oldElement._debugTask
          );
          oldElement._store && (newKey._store.validated = oldElement._store.validated);
          return newKey;
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function escape(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
        }
        function noop$1() {
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type) children = null;
          var invokeCallback = false;
          if (null === children) invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children) return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ctor = payload._result;
            ctor = ctor();
            ctor.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 1, payload._result = moduleObject;
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 2, payload._result = error;
              }
            );
            -1 === payload._status && (payload._status = 0, payload._result = ctor);
          }
          if (1 === payload._status)
            return ctor = payload._result, void 0 === ctor && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ctor
            ), "default" in ctor || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ctor
            ), ctor.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function noop() {
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        Symbol.for("react.provider");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        }, fnName;
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          V: null,
          actQueue: null,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0
        }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        deprecatedAPIs = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
          deprecatedAPIs,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event)) return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        deprecatedAPIs = Object.freeze({
          __proto__: null,
          c: function(size) {
            return resolveDispatcher().useMemoCache(size);
          }
        });
        exports.Children = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.__COMPILER_RUNTIME = deprecatedAPIs;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$0) {
                        ReactSharedInternals.thrownErrors.push(error$0);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.captureOwnerStack = function() {
          var getCurrentStack = ReactSharedInternals.getCurrentStack;
          return null === getCurrentStack ? null : getCurrentStack();
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName) props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(
            element.type,
            key,
            void 0,
            void 0,
            owner,
            props,
            element._debugStack,
            element._debugTask
          );
          for (key = 2; key < arguments.length; key++)
            owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          for (var i = 2; i < arguments.length; i++) {
            var node = arguments[i];
            isValidElement(node) && node._store && (node._store.validated = 1);
          }
          i = {};
          node = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength) i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          node && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return ReactElement(
            type,
            node,
            void 0,
            void 0,
            getOwner(),
            i,
            propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement;
        exports.lazy = function(ctor) {
          return {
            $$typeof: REACT_LAZY_TYPE,
            _payload: { _status: -1, _result: ctor },
            _init: lazyInitializer
          };
        };
        exports.memo = function(type, compare) {
          null == type && console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create, createDeps, update) {
          null == create && console.warn(
            "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          var dispatcher = resolveDispatcher();
          if ("function" === typeof update)
            throw Error(
              "useEffect CRUD overload is not enabled in this build of React."
            );
          return dispatcher.useEffect(create, createDeps);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps);
        };
        exports.useInsertionEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useInsertionEffect(create, deps);
        };
        exports.useLayoutEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useLayoutEffect(create, deps);
        };
        exports.useMemo = function(create, deps) {
          return resolveDispatcher().useMemo(create, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState) {
          return resolveDispatcher().useState(initialState);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.1.1";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      (function() {
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
          self = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
          var children = config.children;
          if (void 0 !== children)
            if (isStaticChildren)
              if (isArrayImpl(children)) {
                for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                  validateChildKeys(children[isStaticChildren]);
                Object.freeze && Object.freeze(children);
              } else
                console.error(
                  "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
                );
            else validateChildKeys(children);
          if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
              return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
              'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
              isStaticChildren,
              children,
              keys,
              children
            ), didWarnAboutKeySpread[children + isStaticChildren] = true);
          }
          children = null;
          void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
          hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
          if ("key" in config) {
            maybeKey = {};
            for (var propName in config)
              "key" !== propName && (maybeKey[propName] = config[propName]);
          } else maybeKey = config;
          children && defineKeyPropWarningGetter(
            maybeKey,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          return ReactElement(
            type,
            children,
            self,
            source,
            getOwner(),
            maybeKey,
            debugStack,
            debugTask
          );
        }
        function validateChildKeys(node) {
          "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
        }
        var React2 = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        Symbol.for("react.provider");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        React2 = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = React2.react_stack_bottom_frame.bind(
          React2,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutKeySpread = {};
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = function(type, config, maybeKey, source, self) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            false,
            source,
            self,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.jsxs = function(type, config, maybeKey, source, self) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            true,
            source,
            self,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
      })();
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // modules/escalas-dor/App.tsx
  var import_react3 = __toESM(require_react(), 1);

  // modules/escalas-dor/constants.ts
  var PAIN_DATA = {
    dog: {
      acute: {
        scales: [
          {
            id: "cmps-sf",
            name: "Escala de Dor Composta de Glasgow - Forma Curta (CMPS-SF)",
            recommended: true,
            description: "Vers\xE3o adaptada da escala para uma avalia\xE7\xE3o estruturada e visual da dor aguda.",
            details: {
              origin: "Desenvolvida na Universidade de Glasgow por Reid J, Nolan AM, Hughes JML, Lascelles D, Pawson P & Scott EM (2007).",
              indications: "Avalia\xE7\xE3o de dor aguda p\xF3s-operat\xF3ria em c\xE3es. Ideal para uso cl\xEDnico frequente para determinar a necessidade de analgesia de resgate.",
              studies: "Extensivamente validada em m\xFAltiplos estudos, demonstrando alta sensibilidade para detectar dor e resposta \xE0 analgesia.",
              quality: "Considerada padr\xE3o-ouro por se basear exclusivamente em comportamentos observ\xE1veis, minimizando a subjetividade. A forma curta (SF) mant\xE9m a validade da original, mas \xE9 mais r\xE1pida de aplicar.",
              reliability: "Apresenta alta confiabilidade inter-observador, significando que diferentes avaliadores tendem a chegar a escores semelhantes."
            },
            questions: [
              {
                id: "glasgow_observation",
                text: "A. Observa\xE7\xE3o do Comportamento e Vocaliza\xE7\xE3o",
                type: "radio" /* Radio */,
                options: [
                  { score: 0, text: "Quieto e confort\xE1vel, n\xE3o vocaliza." },
                  { score: 1, text: "Olha para a ferida ou choraminga baixinho." },
                  { score: 2, text: "Geme, lambe a ferida intermitentemente." },
                  { score: 3, text: "Chora, geme ou lambe a ferida continuamente." },
                  { score: 4, text: "Grita, rosna, late ou morde a ferida." }
                ]
              },
              {
                id: "glasgow_touch_neutral",
                text: "B. Rea\xE7\xE3o ao Toque na \xC1rea N\xE3o Dolorosa",
                type: "radio" /* Radio */,
                options: [
                  { score: 0, text: "Calmo e relaxado, permite toque." },
                  { score: 1, text: "Quieto, um pouco indiferente mas aceita toque." },
                  { score: 2, text: "Nervoso ou ansioso, mas n\xE3o reage ao toque." },
                  { score: 3, text: "Recua ou mostra tens\xE3o ao ser tocado." },
                  { score: 4, text: "Reage de forma defensiva/medrosa ao ser abordado." }
                ]
              },
              {
                id: "glasgow_palpation",
                text: "C. Rea\xE7\xE3o \xE0 Palpa\xE7\xE3o da \xC1rea Dolorosa",
                type: "radio" /* Radio */,
                options: [
                  { score: 0, text: "N\xE3o reage ao toque." },
                  { score: 1, text: "Olha ao redor para a \xE1rea palpada." },
                  { score: 2, text: "Estremece, contrai a musculatura ou geme." },
                  { score: 3, text: "Rosna ou protege a \xE1rea." },
                  { score: 4, text: "Tenta morder ou chora." },
                  { score: 5, text: "Reage agressivamente antes mesmo do toque." }
                ]
              },
              {
                id: "glasgow_demeanor",
                text: "D. Comportamento e Postura Geral",
                type: "radio" /* Radio */,
                options: [
                  { score: 0, text: "Feliz, contente, relaxado." },
                  { score: 1, text: "Quieto, mas se acalma." },
                  { score: 2, text: "Indiferente, n\xE3o responsivo, postura tensa." },
                  { score: 3, text: "Deprimido ou ansioso, postura curvada/r\xEDgida." },
                  { score: 4, text: "Rola, se debate ou fica r\xEDgido de dor." },
                  { score: 5, text: "N\xE3o se move ou precisa de assist\xEAncia." }
                ]
              }
            ],
            interpretation: (answers) => {
              const scores = Object.values(answers).filter((v) => typeof v === "number");
              const totalScore = scores.reduce((sum, val) => sum + val, 0);
              const maxScore = 18;
              const threshold = 5;
              const needsIntervention = totalScore >= threshold;
              return {
                score: `${totalScore} / ${maxScore}`,
                analysis: `Uma pontua\xE7\xE3o de \u2265${threshold}/${maxScore} \xE9 o n\xEDvel recomendado que indica a necessidade de reavaliar o plano analg\xE9sico e considerar uma interven\xE7\xE3o.`,
                needsIntervention
              };
            }
          },
          {
            id: "csu-cap",
            name: "Escala de Dor Aguda da Universidade do Colorado (CSU-CAP)",
            recommended: false,
            description: "Ferramenta visual amplamente utilizada para avalia\xE7\xE3o e treinamento no reconhecimento da dor aguda. Utiliza imagens e descri\xE7\xF5es para uma avalia\xE7\xE3o hol\xEDstica.",
            details: {
              origin: "Criada na Colorado State University College of Veterinary Medicine & Biomedical Sciences, por Peter W. Hellyer et al.",
              indications: "Avalia\xE7\xE3o hol\xEDstica da dor aguda em c\xE3es. Muito \xFAtil para treinamento de equipes e para uma avalia\xE7\xE3o r\xE1pida e visual do paciente.",
              studies: "Validada para uso cl\xEDnico, com boa correla\xE7\xE3o com outras escalas de dor. Sua natureza pict\xF3rica foi projetada para melhorar a consist\xEAncia da pontua\xE7\xE3o.",
              quality: "Sua for\xE7a reside na combina\xE7\xE3o de descri\xE7\xF5es comportamentais com ilustra\xE7\xF5es claras, o que facilita uma avalia\xE7\xE3o mais intuitiva. No entanto, pode ser menos granular que escalas baseadas em m\xFAltiplos itens."
            },
            questions: [
              {
                id: "holistic_score",
                text: "Compare suas observa\xE7\xF5es com a imagem e descri\xE7\xF5es abaixo e atribua o escore que melhor representa o estado do animal.",
                type: "custom" /* Custom */,
                compositeImageUrl: "https://res.cloudinary.com/dwta1roq1/image/upload/escala-dor-colorado/caes",
                options: [
                  { score: 0, text: "Feliz, contente, confort\xE1vel. N\xE3o se incomoda com a ferida e interage normalmente. Sem tens\xE3o corporal." },
                  { score: 1, text: "Quieto, um pouco subjugado ou inquieto, mas se distrai facilmente. Pode olhar para a ferida, estremecer ou choramingar com a palpa\xE7\xE3o. Tens\xE3o corporal leve." },
                  { score: 2, text: "Desconfort\xE1vel, ansioso, relutante em interagir. Protege a \xE1rea dolorosa e reage mais intensamente \xE0 palpa\xE7\xE3o (geme, chora). Tens\xE3o corporal moderada." },
                  { score: 3, text: "Relutante em se mover, pode gemer ou chorar sem est\xEDmulo. Postura anormal (curvado, r\xEDgido). Rea\xE7\xE3o \xE0 palpa\xE7\xE3o pode ser dram\xE1tica (grito, rosnado)." },
                  { score: 4, text: "Constantemente gemendo ou gritando. Pode estar prostrado e n\xE3o responsivo, ou muito agitado e agressivo. A dor \xE9 o foco central do animal." }
                ]
              }
            ],
            interpretation: (answers) => {
              const score = answers["holistic_score"] ?? 0;
              const needsIntervention = score >= 2;
              return {
                score: `${score} / 4`,
                analysis: "Um escore \u2265 2 indica que o paciente est\xE1 sentindo dor e o plano analg\xE9sico deve ser reavaliado imediatamente.",
                needsIntervention
              };
            }
          },
          {
            id: "umps",
            name: "Escala de Dor da Universidade de Melbourne (UMPS)",
            recommended: false,
            description: "Aten\xE7\xE3o: Esta escala inclui par\xE2metros fisiol\xF3gicos (ex: frequ\xEAncia card\xEDaca) que podem ser alterados por medo e estresse, n\xE3o apenas pela dor. Interprete os resultados com cautela.",
            questions: [],
            interpretation: () => ({ score: "N/A", analysis: "Esta escala \xE9 fornecida a t\xEDtulo informativo e de refer\xEAncia hist\xF3rica.", needsIntervention: false }),
            details: {
              origin: "Desenvolvida na Universidade de Melbourne por Firth AM & Haldane SL (1999).",
              indications: "Uso hist\xF3rico para avalia\xE7\xE3o de dor aguda. Atualmente menos recomendada para decis\xF5es cl\xEDnicas prim\xE1rias.",
              studies: "Uma das primeiras escalas multidimensionais. Estudos subsequentes mostraram que seus componentes fisiol\xF3gicos (frequ\xEAncia card\xEDaca, etc.) s\xE3o pouco espec\xEDficos para dor, podendo ser alterados por estresse, medo ou outros fatores.",
              quality: "Embora tenha sido importante para o desenvolvimento da algologia veterin\xE1ria, sua depend\xEAncia de sinais fisiol\xF3gicos \xE9 uma limita\xE7\xE3o significativa. Escalas mais modernas, focadas em comportamento, s\xE3o preferidas."
            }
          }
        ]
      },
      chronic: {
        scales: [
          {
            id: "cbpi",
            name: "Invent\xE1rio Breve de Dor Canina (CBPI)",
            recommended: true,
            description: "Vers\xE3o validada para o portugu\xEAs do Brasil. Ferramenta padr\xE3o para o tutor avaliar a dor cr\xF4nica e seu impacto na qualidade de vida.",
            details: {
              origin: "Desenvolvida na Universidade da Pensilv\xE2nia por Brown DC, Boston RC, Coyne JC, & Farrar JT (2007).",
              indications: "Avalia\xE7\xE3o da dor cr\xF4nica (especialmente osteoartrite) por tutores. Excelente para monitorar o impacto da dor na qualidade de vida e a resposta a tratamentos de longo prazo.",
              studies: "Validada em diversos idiomas, incluindo o portugu\xEAs do Brasil. Demonstrou ser uma ferramenta confi\xE1vel e v\xE1lida para medir a severidade da dor (PSS) e a interfer\xEAncia da dor nas atividades (PIS).",
              quality: "\xC9 o padr\xE3o para ensaios cl\xEDnicos que avaliam analg\xE9sicos para dor cr\xF4nica. Empodera o tutor, que conhece melhor o comportamento normal do seu animal, a participar ativamente do manejo da dor."
            },
            questions: [
              { id: "pain_worst", text: "Pior dor do c\xE3o nos \xFAltimos 7 dias", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "Sem dor", labelMax: "Dor extrema", category: "Severidade da Dor (PSS)" },
              { id: "pain_least", text: "Menor dor do c\xE3o nos \xFAltimos 7 dias", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "Sem dor", labelMax: "Dor extrema", category: "Severidade da Dor (PSS)" },
              { id: "pain_avg", text: "Dor m\xE9dia do c\xE3o nos \xFAltimos 7 dias", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "Sem dor", labelMax: "Dor extrema", category: "Severidade da Dor (PSS)" },
              { id: "pain_now", text: "Dor do c\xE3o neste momento", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "Sem dor", labelMax: "Dor extrema", category: "Severidade da Dor (PSS)" },
              { id: "interference_activity", text: "Atividade Geral", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "N\xE3o interfere", labelMax: "Interfere completamente", category: "Interfer\xEAncia da Dor (PIS)" },
              { id: "interference_life", text: "Aproveitamento da Vida", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "N\xE3o interfere", labelMax: "Interfere completamente", category: "Interfer\xEAncia da Dor (PIS)" },
              { id: "interference_rise", text: "Capacidade de se Levantar", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "N\xE3o interfere", labelMax: "Interfere completamente", category: "Interfer\xEAncia da Dor (PIS)" },
              { id: "interference_walk", text: "Capacidade de Andar", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "N\xE3o interfere", labelMax: "Interfere completamente", category: "Interfer\xEAncia da Dor (PIS)" },
              { id: "interference_run", text: "Capacidade de Correr", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "N\xE3o interfere", labelMax: "Interfere completamente", category: "Interfer\xEAncia da Dor (PIS)" },
              { id: "interference_stairs", text: "Capacidade de Subir Escadas", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "N\xE3o interfere", labelMax: "Interfere completamente", category: "Interfer\xEAncia da Dor (PIS)" }
            ],
            interpretation: (answers) => {
              const intensityScores = [answers["pain_worst"], answers["pain_least"], answers["pain_avg"], answers["pain_now"]].map(Number);
              const interferenceScores = [answers["interference_activity"], answers["interference_life"], answers["interference_rise"], answers["interference_walk"], answers["interference_run"], answers["interference_stairs"]].map(Number);
              const pss = intensityScores.reduce((a, b) => a + b, 0) / intensityScores.length;
              const pis = interferenceScores.reduce((a, b) => a + b, 0) / interferenceScores.length;
              const needsIntervention = pss >= 3 || pis >= 3;
              return {
                score: `Severidade (PSS): ${pss.toFixed(1)} | Interfer\xEAncia (PIS): ${pis.toFixed(1)}`,
                analysis: "Um escore \u2265 3 (para PSS ou PIS) pode discriminar c\xE3es com dor cr\xF4nica. Uma mudan\xE7a de \u22651 ponto no PSS e \u22652 pontos no PIS \xE9 considerada clinicamente significativa e indica resposta ao tratamento.",
                needsIntervention
              };
            }
          },
          {
            id: "hcpi",
            name: "\xCDndice de Dor Cr\xF4nica de Helsinki (HCPI)",
            recommended: false,
            description: "Question\xE1rio validado que foca na disposi\xE7\xE3o, humor e comportamento do c\xE3o, capturando dimens\xF5es emocionais da dor cr\xF4nica.",
            details: {
              origin: "Desenvolvida na Universidade de Helsinki por Hielm-Bj\xF6rkman AK, et al. (2009).",
              indications: "Avalia\xE7\xE3o da dor cr\xF4nica por tutores, com foco particular em mudan\xE7as de humor e comportamento.",
              studies: "Validada para uso em c\xE3es com osteoartrite. Mostra boa correla\xE7\xE3o com a avalia\xE7\xE3o veterin\xE1ria.",
              quality: "Complementa outras escalas ao focar nos aspectos mais sutis e emocionais da dor cr\xF4nica, como relut\xE2ncia em brincar ou mudan\xE7as na intera\xE7\xE3o social. \xC9 uma ferramenta \xFAtil para uma vis\xE3o hol\xEDstica da qualidade de vida."
            },
            questions: [
              { id: "hcpi_mood", text: "Humor / Energia geral", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal/Animado", labelMax: "Ap\xE1tico/Deprimido" },
              { id: "hcpi_play", text: "Disposi\xE7\xE3o para brincar", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Muito disposto", labelMax: "N\xE3o brinca" },
              { id: "hcpi_walk", text: "Disposi\xE7\xE3o para passear", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Muito disposto", labelMax: "Recusa-se" },
              { id: "hcpi_move_rest", text: "Movimenta\xE7\xE3o ap\xF3s descanso/repouso", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "Muita dificuldade/rigidez" },
              { id: "hcpi_lameness", text: "Claudica\xE7\xE3o (mancar) ao se mover", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Severa/N\xE3o usa o membro" },
              { id: "hcpi_pacing", text: "Inquieta\xE7\xE3o / Andar sem rumo", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nunca", labelMax: "Constantemente" },
              { id: "hcpi_licking", text: "Lamber/Morder a(s) \xE1rea(s) dolorida(s)", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nunca", labelMax: "Constantemente" },
              { id: "hcpi_vocalization", text: "Vocaliza\xE7\xE3o de dor (gemer, chorar)", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nunca", labelMax: "Constantemente" },
              { id: "hcpi_appetite", text: "Apetite", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "Recusa-se a comer" },
              { id: "hcpi_stiffness", text: "Rigidez ao se mover", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Muito r\xEDgido" },
              { id: "hcpi_pain_overall", text: "Na sua opini\xE3o, qual o n\xEDvel de dor geral do c\xE3o?", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma dor", labelMax: "Dor insuport\xE1vel" }
            ],
            interpretation: (answers) => {
              const scores = Object.values(answers).map(Number);
              const totalScore = scores.reduce((a, b) => a + b, 0);
              const needsIntervention = totalScore > 10;
              return {
                score: `Escore Total: ${totalScore} / 44`,
                analysis: "Escores mais altos indicam maior dor e impacto na qualidade de vida. Um escore > 10 \xE9 sugestivo de dor cr\xF4nica que requer manejo. Mudan\xE7as no escore ao longo do tempo indicam a efic\xE1cia do tratamento.",
                needsIntervention
              };
            }
          },
          {
            id: "load",
            name: "Question\xE1rio Liverpool Osteoarthritis in Dogs (LOAD)",
            recommended: false,
            description: "Ferramenta espec\xEDfica para osteoartrite canina. Fornece faixas de severidade para avaliar a disfun\xE7\xE3o de mobilidade.",
            details: {
              origin: "Desenvolvida na Universidade de Liverpool por Hercock C, et al. (2009).",
              indications: "Ferramenta espec\xEDfica para quantificar a disfun\xE7\xE3o de mobilidade associada \xE0 osteoartrite em c\xE3es, preenchida pelo tutor.",
              studies: "Validada como uma medida de resultados cl\xEDnicos para osteoartrite canina. \xC9 sens\xEDvel a mudan\xE7as ap\xF3s o tratamento.",
              quality: "Excelente para seu prop\xF3sito espec\xEDfico (osteoartrite), fornecendo um escore num\xE9rico que \xE9 f\xE1cil de acompanhar ao longo do tempo. Sua especificidade \xE9 tanto uma for\xE7a quanto uma limita\xE7\xE3o, pois n\xE3o avalia outras fontes de dor cr\xF4nica."
            },
            questions: [
              { id: "load_stiffness_general", text: "Rigidez geral", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "Severamente r\xEDgido" },
              { id: "load_stiffness_sleep", text: "Rigidez ao acordar", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "Severamente r\xEDgido" },
              { id: "load_lameness_after_walk", text: "Claudica\xE7\xE3o ap\xF3s caminhada leve", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Claudica\xE7\xE3o severa" },
              { id: "load_lameness_after_exercise", text: "Claudica\xE7\xE3o ap\xF3s exerc\xEDcio intenso", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Claudica\xE7\xE3o severa" },
              { id: "load_lameness_start_walk", text: "Claudica\xE7\xE3o no in\xEDcio da caminhada", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Claudica\xE7\xE3o severa" },
              { id: "load_lameness_end_walk", text: "Claudica\xE7\xE3o no final da caminhada", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Claudica\xE7\xE3o severa" },
              { id: "load_lameness_walking", text: "Claudica\xE7\xE3o ao caminhar", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Claudica\xE7\xE3o severa" },
              { id: "load_lameness_trotting", text: "Claudica\xE7\xE3o ao trotar", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Claudica\xE7\xE3o severa" },
              { id: "load_lameness_running", text: "Claudica\xE7\xE3o ao correr", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhuma", labelMax: "Claudica\xE7\xE3o severa" },
              { id: "load_exercise_ability", text: "Capacidade de se exercitar", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "Muito reduzida" },
              { id: "load_jumping", text: "Capacidade de pular", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "Incapaz de pular" },
              { id: "load_weather", text: "Efeito do tempo frio/\xFAmido", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Nenhum", labelMax: "Muito pior" },
              { id: "load_qol", text: "Qualidade de vida geral", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Excelente", labelMax: "Muito pobre" }
            ],
            interpretation: (answers) => {
              const scores = Object.values(answers).map(Number);
              const totalScore = scores.reduce((a, b) => a + b, 0);
              let severity = "";
              if (totalScore === 0) severity = "Normal";
              else if (totalScore <= 10) severity = "Leve";
              else if (totalScore <= 20) severity = "Moderada";
              else if (totalScore <= 30) severity = "Severa";
              else severity = "Extrema";
              const needsIntervention = totalScore > 10;
              return {
                score: `Escore Total: ${totalScore} / 52 (${severity})`,
                analysis: `O escore classifica a disfun\xE7\xE3o como Leve (1-10), Moderada (11-20), Severa (21-30) ou Extrema (>30). Um escore > 10 geralmente indica dor que necessita de manejo cl\xEDnico. Acompanhe a evolu\xE7\xE3o do escore para avaliar a resposta ao tratamento.`,
                needsIntervention
              };
            }
          }
        ]
      }
    },
    cat: {
      acute: {
        scales: [
          {
            id: "ucaps",
            name: "Escala UNESP-Botucatu (Forma Curta - UCAPS)",
            recommended: true,
            description: "Desenvolvida no Brasil e validada internacionalmente, esta \xE9 a ferramenta de elei\xE7\xE3o para avalia\xE7\xE3o de dor aguda em gatos due \xE0 sua praticidade e ponto de corte claro.",
            compositeImageUrl: "https://res.cloudinary.com/dwta1roq1/image/upload/ESCALA-DOR-UNESP/GATOS",
            details: {
              origin: "Desenvolvida na UNESP-Botucatu, Brasil, por Brondani JT, Luna SPL, et al. (2011, 2013).",
              indications: "Avalia\xE7\xE3o de dor aguda p\xF3s-operat\xF3ria em gatos. \xC9 a ferramenta de escolha em muitas cl\xEDnicas pela sua simplicidade e ponto de corte claro.",
              studies: "Rigorosamente validada, demonstrou alta acur\xE1cia (sensibilidade >80%, especificidade >90%) para diferenciar gatos com dor dos sem dor. Seu ponto de corte para interven\xE7\xE3o analg\xE9sica \xE9 bem estabelecido.",
              quality: "Sua principal vantagem \xE9 a rapidez e facilidade de uso, sem perder a robustez cient\xEDfica. Por ser desenvolvida e validada no Brasil, est\xE1 perfeitamente adaptada \xE0 nossa realidade cl\xEDnica.",
              accuracy: "Acur\xE1cia de 93,6%, com sensibilidade de 83,3% e especificidade de 95,8% para o ponto de corte \u22654."
            },
            questions: [
              { id: "posture", text: "1. Postura do Gato", type: "radio" /* Radio */, options: [
                { score: 0, text: "Normal, relaxado, dormindo confortavelmente." },
                { score: 1, text: "Tenso, mas responde a est\xEDmulos. Postura encolhida." },
                { score: 2, text: "Curvado, abd\xF4men contra\xEDdo, cabe\xE7a baixa, relutante em se mover." }
              ] },
              { id: "activity", text: "2. Comportamentos Exibidos", type: "radio" /* Radio */, options: [
                { score: 0, text: "Move-se normalmente, explora o ambiente." },
                { score: 1, text: "Quieto, mas move-se quando estimulado." },
                { score: 2, text: "Relutante em se mover, permanece em um local." },
                { score: 3, text: "N\xE3o se move, r\xEDgido, protege \xE1reas do corpo." }
              ] },
              { id: "attitude", text: "3. Atitude Ap\xF3s o Gato Estar Aberto", type: "radio" /* Radio */, options: [
                { score: 0, text: "Alerta, interativo, amig\xE1vel ou ronronando." },
                { score: 1, text: "Quieto, indiferente, busca isolamento." },
                { score: 2, text: "Assustado, agressivo ao ser abordado, sibila." },
                { score: 3, text: "Deprimido, n\xE3o responsivo, dissociado do ambiente." }
              ] },
              { id: "touch_response", text: "4. Rea\xE7\xE3o \xE0 Palpa\xE7\xE3o do Local Dolorido", type: "radio" /* Radio */, options: [
                { score: 0, text: "Ausente, permite toque sem rea\xE7\xE3o adversa." },
                { score: 1, text: "Desconforto leve (contra\xE7\xE3o da pele, vira a cabe\xE7a)." },
                { score: 2, text: "Rea\xE7\xE3o de retirada, vocaliza\xE7\xE3o leve (gemido)." },
                { score: 3, text: "Rea\xE7\xE3o agressiva (choro, sibilo, mordida)." }
              ] }
            ],
            interpretation: (answers) => {
              const scores = Object.values(answers).filter((v) => typeof v === "number");
              const totalScore = scores.reduce((sum, val) => sum + val, 0);
              const needsIntervention = totalScore >= 4;
              return {
                score: `${totalScore} / 11`,
                analysis: "Um escore total de \u22654/11 indica a necessidade de interven\xE7\xE3o analg\xE9sica.",
                needsIntervention
              };
            }
          },
          {
            id: "fgs",
            name: "Escala de Express\xE3o Facial Felina (Feline Grimace Scale - FGS)",
            recommended: false,
            description: "Avalia a dor atrav\xE9s da an\xE1lise de cinco unidades de a\xE7\xE3o facial: posi\xE7\xE3o das orelhas, contra\xE7\xE3o orbital, tens\xE3o do focinho, posi\xE7\xE3o dos bigodes e posi\xE7\xE3o da cabe\xE7a.",
            details: {
              origin: "Desenvolvida na Universidade de Montreal por Evangelista MC, Watanabe R, Leung VSY, et al. (2019).",
              indications: "Avalia\xE7\xE3o da dor aguda atrav\xE9s da an\xE1lise objetiva de cinco 'Unidades de A\xE7\xE3o' faciais. \xDAtil como ferramenta prim\xE1ria ou complementar.",
              studies: "Demonstrou alta precis\xE3o e repetibilidade. O escore da FGS tem forte correla\xE7\xE3o com escores de escalas multidimensionais como a CMPS-Feline. O treinamento para seu uso \xE9 r\xE1pido e eficaz.",
              quality: "Sua for\xE7a \xE9 a objetividade, focando apenas em mudan\xE7as faciais mensur\xE1veis e minimizando a interpreta\xE7\xE3o do comportamento geral, que pode ser influenciado pelo estresse do ambiente hospitalar.",
              accuracy: "Apresenta excelente acur\xE1cia diagn\xF3stica, com estudos mostrando \xE1reas sob a curva ROC (AUC) superiores a 0.95."
            },
            questions: [
              { id: "ears", text: "Posi\xE7\xE3o das Orelhas", type: "custom" /* Custom */, compositeImageUrl: "https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/POSICAO-ORELHAS", options: [
                { score: 0, text: "Orelhas para frente." },
                { score: 1, text: "Orelhas ligeiramente afastadas." },
                { score: 2, text: "Orelhas achatadas e viradas para fora." }
              ] },
              { id: "eyes", text: "Contra\xE7\xE3o Orbital (Olhos)", type: "custom" /* Custom */, compositeImageUrl: "https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/FECHAMENTO-ORBITAL", options: [
                { score: 0, text: "Olhos abertos." },
                { score: 1, text: "Olhos parcialmente abertos/semicerrados." },
                { score: 2, text: "Olhos semicerrados/espremidos." }
              ] },
              { id: "muzzle", text: "Tens\xE3o do Focinho", type: "custom" /* Custom */, compositeImageUrl: "https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/TENSAO-BIGODE", options: [
                { score: 0, text: "Focinho relaxado (formato redondo)." },
                { score: 1, text: "Focinho levemente tenso." },
                { score: 2, text: "Focinho tenso (formato el\xEDptico)." }
              ] },
              { id: "whiskers", text: "Posi\xE7\xE3o dos Bigodes", type: "custom" /* Custom */, compositeImageUrl: "https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/MUDANCA-BIGODE", options: [
                { score: 0, text: "Bigodes soltos e curvados." },
                { score: 1, text: "Bigodes ligeiramente curvados ou retos." },
                { score: 2, text: "Bigodes retos e movendo-se para frente." }
              ] },
              { id: "head", text: "Posi\xE7\xE3o da Cabe\xE7a", type: "custom" /* Custom */, compositeImageUrl: "https://res.cloudinary.com/dwta1roq1/image/upload/GRIMACE/POSICAO-CABECA", options: [
                { score: 0, text: "Cabe\xE7a acima da linha dos ombros." },
                { score: 1, text: "Cabe\xE7a alinhada com a linha dos ombros." },
                { score: 2, text: "Cabe\xE7a abaixo da linha dos ombros ou inclinada." }
              ] }
            ],
            interpretation: (answers) => {
              const scores = Object.values(answers).filter((v) => typeof v === "number");
              const totalScore = scores.reduce((sum, val) => sum + val, 0);
              const needsIntervention = totalScore >= 4;
              return {
                score: `${totalScore} / 10`,
                analysis: "Uma pontua\xE7\xE3o total de \u22654/10 sugere que o resgate analg\xE9sico deve ser considerado.",
                needsIntervention
              };
            }
          },
          {
            id: "csu-faps",
            name: "Escala de Dor Aguda da Universidade do Colorado para Gatos (CSU-FAPS)",
            recommended: false,
            description: "Escala visual e comportamental para avalia\xE7\xE3o de dor aguda p\xF3s-operat\xF3ria em gatos, com base na observa\xE7\xE3o e palpa\xE7\xE3o.",
            details: {
              origin: "Desenvolvida na Colorado State University, por Shipley H, Guedes A, Graham L, et al. (2019/2021).",
              indications: "Avalia\xE7\xE3o da dor aguda em gatos, especialmente no per\xEDodo p\xF3s-operat\xF3rio. Projetada para ser r\xE1pida e pr\xE1tica.",
              studies: "A escala foi desenvolvida para fornecer uma ferramenta de avalia\xE7\xE3o de dor validada e f\xE1cil de usar para felinos na pr\xE1tica cl\xEDnica.",
              quality: "Sua for\xE7a est\xE1 na simplicidade e na combina\xE7\xE3o de observa\xE7\xE3o \xE0 dist\xE2ncia com a intera\xE7\xE3o e palpa\xE7\xE3o, fornecendo um escore hol\xEDstico do estado do paciente."
            },
            questions: [
              {
                id: "holistic_score_feline",
                text: "Compare suas observa\xE7\xF5es com a imagem e descri\xE7\xF5es abaixo e atribua o escore que melhor representa o estado do gato.",
                type: "custom" /* Custom */,
                compositeImageUrl: "https://res.cloudinary.com/dwta1roq1/image/upload/escala-dor-colorado/gatos-2",
                options: [
                  { score: 0, text: "Sem Dor: Contente, quieto, mas interessado no ambiente. Pode estar cochilando, mas \xE9 facilmente acordado. Postura relaxada e confort\xE1vel. Nenhuma rea\xE7\xE3o adversa \xE0 palpa\xE7\xE3o." },
                  { score: 1, text: "Dor Leve: Retra\xEDdo, menos interessado no ambiente. Postura levemente encolhida, mas ainda se move. Pode se afastar ou demonstrar leve desconforto \xE0 palpa\xE7\xE3o da \xE1rea dolorosa." },
                  { score: 2, text: 'Dor Moderada: Perda de apetite, vocaliza\xE7\xE3o (miados baixos), express\xE3o facial tensa com olhos semifechados. Postura arqueada ("em bolinha") com pelos arrepiados. Responde agressivamente \xE0 palpa\xE7\xE3o (rosnados, sibilos).' },
                  { score: 3, text: "Dor Severa: Vocaliza\xE7\xE3o constante e alta (gritos). Muito agitado ou prostrado. Postura muito tensa, abd\xF4men contra\xEDdo. N\xE3o permite aproxima\xE7\xE3o, reage violentamente." },
                  { score: 4, text: "Dor Excruciante: Em estado de choque ou prostrado, inconsciente do ambiente. Posturas bizarras, incapaz de se mover. Nenhuma rea\xE7\xE3o por prostra\xE7\xE3o ou rea\xE7\xF5es violentas." }
                ]
              }
            ],
            interpretation: (answers) => {
              const score = answers["holistic_score_feline"] ?? 0;
              const needsIntervention = score >= 2;
              return {
                score: `${score} / 4`,
                analysis: "Um escore \u2265 2 indica que o paciente est\xE1 sentindo dor e a analgesia de resgate deve ser institu\xEDda imediatamente.",
                needsIntervention
              };
            }
          }
        ]
      },
      chronic: {
        scales: [
          {
            id: "fmpi",
            name: "\xCDndice de Dor Musculoesquel\xE9tica Felina (FMPI)",
            recommended: true,
            description: "Padr\xE3o-ouro para o monitoramento da dor cr\xF4nica musculoesquel\xE9tica em gatos. Ideal para avaliar a resposta ao tratamento ao longo do tempo.",
            details: {
              origin: "Desenvolvida na North Carolina State University por Lascelles BDX, et al. (2007).",
              indications: "Padr\xE3o-ouro para o monitoramento da dor cr\xF4nica associada a doen\xE7as musculoesquel\xE9ticas (ex: doen\xE7a articular degenerativa) em gatos, preenchida pelo tutor.",
              studies: "Validada como uma ferramenta de medi\xE7\xE3o de resultados cl\xEDnicos. \xC9 sens\xEDvel para detectar melhora cl\xEDnica ap\xF3s o in\xEDcio de terapia analg\xE9sica.",
              quality: "Capta o impacto funcional da dor na vida do gato, avaliando atividades que s\xE3o dif\xEDceis de observar no ambiente cl\xEDnico (como pular). \xC9 a ferramenta mais recomendada para acompanhamento longitudinal da dor cr\xF4nica em felinos."
            },
            questions: [
              { id: "jump_up", text: "Pular para cima (ex: para uma cadeira, sof\xE1)", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "N\xE3o consegue" },
              { id: "jump_down", text: "Pular para baixo", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "N\xE3o consegue" },
              { id: "run", text: "Correr", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "N\xE3o consegue" },
              { id: "stairs_up", text: "Subir escadas", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "N\xE3o consegue" },
              { id: "stairs_down", text: "Descer escadas", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "N\xE3o consegue" },
              { id: "play", text: "Brincar com brinquedos ou outros animais", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "N\xE3o brinca" },
              { id: "grooming", text: "Higienizar-se (grooming)", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "Reduzido/Ausente" },
              { id: "temperament", text: "Humor/Temperamento geral", type: "slider" /* Slider */, min: 0, max: 4, step: 1, labelMin: "Normal", labelMax: "Irritadi\xE7o/Recluso" }
            ],
            interpretation: (answers) => {
              const scores = Object.values(answers).filter((v) => typeof v === "number");
              const totalScore = scores.reduce((sum, val) => sum + val, 0);
              return {
                score: `Escore Total: ${totalScore}`,
                analysis: "Escores mais altos indicam maior comprometimento e dor. Esta ferramenta \xE9 ideal para monitorar a resposta ao tratamento ao longo do tempo. Compare os escores atuais com os anteriores para avaliar a efic\xE1cia.",
                needsIntervention: totalScore > 10
                // Example heuristic
              };
            }
          },
          {
            id: "csom",
            name: "Medidas de Resultado Espec\xEDficas do Cliente (CSOM)",
            recommended: true,
            description: "Ferramenta personalizada para o tutor identificar e monitorar as atividades di\xE1rias mais afetadas pela dor cr\xF4nica do gato.",
            details: {
              origin: "Adaptado para uso veterin\xE1rio por m\xFAltiplos pesquisadores, incluindo Lascelles BDX. A metodologia foca naquilo que \xE9 mais importante para o paciente individual e seu tutor.",
              indications: "Monitoramento longitudinal da dor cr\xF4nica e seu impacto na qualidade de vida. Ideal para avaliar a resposta a terapias de longo prazo de forma individualizada.",
              studies: "Demonstrado ser uma ferramenta v\xE1lida e responsiva para medir resultados cl\xEDnicos em c\xE3es e gatos com dor cr\xF4nica, especialmente osteoartrite.",
              quality: "Sua maior for\xE7a \xE9 a relev\xE2ncia para o paciente. Em vez de usar uma lista gen\xE9rica, o CSOM foca nas atividades que o tutor percebe como problem\xE1ticas, aumentando o engajamento e a sensibilidade para detectar mudan\xE7as clinicamente importantes."
            },
            questions: [
              { id: "activity_1_name", text: "1. Descreva a primeira atividade que seu gato tem dificuldade em realizar (ex: pular no sof\xE1, se limpar):", type: "text" /* Text */ },
              { id: "activity_1_score", text: "Avalie a capacidade atual do seu gato para esta Atividade 1:", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "Imposs\xEDvel", labelMax: "Normal" },
              { id: "activity_2_name", text: "2. Descreva uma segunda atividade (opcional):", type: "text" /* Text */ },
              { id: "activity_2_score", text: "Avalie a capacidade atual para a Atividade 2:", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "Imposs\xEDvel", labelMax: "Normal" },
              { id: "activity_3_name", text: "3. Descreva uma terceira atividade (opcional):", type: "text" /* Text */ },
              { id: "activity_3_score", text: "Avalie a capacidade atual para a Atividade 3:", type: "slider" /* Slider */, min: 0, max: 10, step: 1, labelMin: "Imposs\xEDvel", labelMax: "Normal" }
            ],
            interpretation: (answers) => {
              const scores = [];
              if (answers["activity_1_name"] && String(answers["activity_1_name"]).trim() !== "" && answers["activity_1_score"] !== void 0) {
                scores.push(Number(answers["activity_1_score"]));
              }
              if (answers["activity_2_name"] && String(answers["activity_2_name"]).trim() !== "" && answers["activity_2_score"] !== void 0) {
                scores.push(Number(answers["activity_2_score"]));
              }
              if (answers["activity_3_name"] && String(answers["activity_3_name"]).trim() !== "" && answers["activity_3_score"] !== void 0) {
                scores.push(Number(answers["activity_3_score"]));
              }
              if (scores.length === 0) {
                return {
                  score: "N/A",
                  analysis: "Pelo menos uma atividade precisa ser definida e avaliada.",
                  needsIntervention: false
                };
              }
              const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
              return {
                score: `Capacidade M\xE9dia: ${avgScore.toFixed(1)} / 10`,
                analysis: "Esta \xE9 a sua linha de base. O objetivo \xE9 ver o escore de capacidade aumentar com o tratamento (se aproximar de 10). Reavalie periodicamente para monitorar o progresso.",
                needsIntervention: avgScore < 7
                // Heurística: se a capacidade média for menor que 7/10, a intervenção é recomendada.
              };
            }
          }
        ]
      }
    }
  };
  var DRUG_DATA = [
    // AINEs
    {
      id: "carprofen_dog",
      name: "Carprofeno",
      species: ["dog" /* Dog */],
      doseRange: { min: 2.2, max: 4.4, default: 4.4, unit: "mg/kg" },
      presentations: [
        { id: "carpro_25", name: "Comprimido 25 mg", concentration: { value: 25, unit: "mg/tablet" } },
        { id: "carpro_50", name: "Comprimido 50 mg", concentration: { value: 50, unit: "mg/tablet" } },
        { id: "carpro_75", name: "Comprimido 75 mg", concentration: { value: 75, unit: "mg/tablet" } },
        { id: "carpro_100", name: "Comprimido 100 mg", concentration: { value: 100, unit: "mg/tablet" } },
        { id: "carpro_inj", name: "Injet\xE1vel 5% (50 mg/ml)", concentration: { value: 50, unit: "mg/ml" } }
      ],
      administrationNotes: "Administrar com alimento. A dose de 4.4 mg/kg pode ser SID ou dividida em 2.2 mg/kg BID.",
      adjustmentFactors: {
        senior: "Iniciar com a menor dose (2.2 mg/kg) e monitorar fun\xE7\xE3o renal/hep\xE1tica.",
        puppy_kitten: "Seguro em c\xE3es > 6 semanas.",
        pregnant_lactating: "Contraindicado.",
        liver: "Contraindicado em hepatopatia grave. Usar com extrema cautela em doen\xE7a leve a moderada.",
        kidney: "Contraindicado em doen\xE7a renal. Pode agravar a condi\xE7\xE3o.",
        heart: "Cautela em ICC, pode causar reten\xE7\xE3o de s\xF3dio/\xE1gua.",
        gastro: "Contraindicado com \xFAlceras ou sangramento gastrointestinal ativo."
      }
    },
    {
      id: "meloxicam_dog",
      name: "Meloxicam (C\xE3o)",
      species: ["dog" /* Dog */],
      doseRange: { min: 0.1, max: 0.2, default: 0.2, unit: "mg/kg" },
      presentations: [
        { id: "melo_dog_oral_0_5", name: "Suspens\xE3o Oral 0.05% (0.5 mg/ml)", concentration: { value: 0.5, unit: "mg/ml" } },
        { id: "melo_dog_oral_1_5", name: "Suspens\xE3o Oral 0.15% (1.5 mg/ml)", concentration: { value: 1.5, unit: "mg/ml" } },
        { id: "melo_dog_comp_1", name: "Comprimido 1 mg", concentration: { value: 1, unit: "mg/tablet" } },
        { id: "melo_dog_comp_2_5", name: "Comprimido 2.5 mg", concentration: { value: 2.5, unit: "mg/tablet" } },
        { id: "melo_dog_comp_4", name: "Comprimido 4 mg", concentration: { value: 4, unit: "mg/tablet" } },
        { id: "melo_dog_inj", name: "Injet\xE1vel 0.5% (5 mg/ml)", concentration: { value: 5, unit: "mg/ml" } }
      ],
      administrationNotes: "Dose de ataque de 0.2 mg/kg no primeiro dia, seguida por 0.1 mg/kg/dia para manuten\xE7\xE3o. Administrar com alimento.",
      adjustmentFactors: {
        senior: "Usar a dose de manuten\xE7\xE3o (0.1 mg/kg) com cautela. Monitoramento renal e hep\xE1tico \xE9 crucial.",
        puppy_kitten: "N\xE3o recomendado para c\xE3es com menos de 6 meses de idade.",
        pregnant_lactating: "Contraindicado.",
        liver: "Metaboliza\xE7\xE3o hep\xE1tica. Usar com extrema cautela em hepatopatas.",
        kidney: "Contraindicado em doen\xE7a renal.",
        heart: "Cautela na insufici\xEAncia card\xEDaca congestiva.",
        gastro: "Contraindicado com gastrite ou \xFAlcera ativa."
      }
    },
    {
      id: "meloxicam_cat",
      name: "Meloxicam (Gato)",
      species: ["cat" /* Cat */],
      doseRange: { min: 0.05, max: 0.2, default: 0.1, unit: "mg/kg" },
      presentations: [
        { id: "melo_cat_oral", name: "Suspens\xE3o Oral 0.05% (0.5 mg/ml)", concentration: { value: 0.5, unit: "mg/ml" } },
        { id: "melo_cat_inj_0_2", name: "Injet\xE1vel 0.2% (2 mg/ml)", concentration: { value: 2, unit: "mg/ml" } },
        { id: "melo_cat_inj_0_5", name: "Injet\xE1vel 0.5% (5 mg/ml)", concentration: { value: 5, unit: "mg/ml" } }
      ],
      administrationNotes: "USO RESTRITO E COM CAUTELA EM GATOS. Aprovado para dose \xFAnica injet\xE1vel (0.2-0.3 mg/kg) pr\xE9-operat\xF3ria. O uso oral cr\xF4nico \xE9 controverso e deve ser feito com doses muito baixas e monitoramento rigoroso. Administrar com alimento.",
      adjustmentFactors: {
        senior: "Extrema cautela. A doen\xE7a renal cr\xF4nica \xE9 comum e pode n\xE3o ser aparente. Triagem sangu\xEDnea \xE9 mandat\xF3ria.",
        puppy_kitten: "N\xE3o recomendado para gatos com menos de 4 meses ou menos de 2kg.",
        pregnant_lactating: "Contraindicado.",
        liver: "Contraindicado ou usar com extrema cautela.",
        kidney: "Contraindicado. Gatos s\xE3o extremamente sens\xEDveis \xE0 nefrotoxicidade dos AINEs.",
        heart: "Contraindicado em cardiomiopatia descompensada.",
        gastro: "Alto risco de gastrite e \xFAlceras."
      }
    },
    {
      id: "robenacoxib",
      name: "Robenacoxib (Onsior\xAE)",
      species: ["dog" /* Dog */, "cat" /* Cat */],
      doseRange: { min: 1, max: 2.4, default: 2, unit: "mg/kg" },
      presentations: [
        { id: "onsior_comp_6_cat", name: "Comprimido 6 mg (Gato)", concentration: { value: 6, unit: "mg/tablet" } },
        { id: "onsior_comp_5_dog", name: "Comprimido 5 mg (C\xE3o)", concentration: { value: 5, unit: "mg/tablet" } },
        { id: "onsior_comp_10_dog", name: "Comprimido 10 mg (C\xE3o)", concentration: { value: 10, unit: "mg/tablet" } },
        { id: "onsior_comp_20_dog", name: "Comprimido 20 mg (C\xE3o)", concentration: { value: 20, unit: "mg/tablet" } },
        { id: "onsior_comp_40_dog", name: "Comprimido 40 mg (C\xE3o)", concentration: { value: 40, unit: "mg/tablet" } },
        { id: "onsior_inj", name: "Injet\xE1vel 2% (20 mg/ml)", concentration: { value: 20, unit: "mg/ml" } }
      ],
      administrationNotes: "Administrar em jejum ou com uma pequena quantidade de alimento. Dose c\xE3es: 1-2mg/kg. Dose gatos: 1-2.4mg/kg. Usar SID por no m\xE1ximo 3 dias (inj) ou 6 dias (oral) em gatos.",
      adjustmentFactors: {
        senior: "Usar com cautela, ap\xF3s avalia\xE7\xE3o da fun\xE7\xE3o renal/hep\xE1tica.",
        puppy_kitten: "N\xE3o usar em c\xE3es < 2.5kg ou < 3 meses. N\xE3o usar em gatos < 2.5kg ou < 4 meses.",
        pregnant_lactating: "Contraindicado.",
        liver: "Contraindicado em doen\xE7a hep\xE1tica.",
        kidney: "Contraindicado em doen\xE7a renal.",
        heart: "Usar com cautela.",
        gastro: "Contraindicado em animais com ulcera\xE7\xE3o gastrointestinal."
      }
    },
    {
      id: "grapiprant_dog",
      name: "Grapiprant (Galliprant\xAE)",
      species: ["dog" /* Dog */],
      doseRange: { min: 2, max: 2, default: 2, unit: "mg/kg" },
      presentations: [
        { id: "galli_20", name: "Comprimido 20 mg", concentration: { value: 20, unit: "mg/tablet" } },
        { id: "galli_60", name: "Comprimido 60 mg", concentration: { value: 60, unit: "mg/tablet" } },
        { id: "galli_100", name: "Comprimido 100 mg", concentration: { value: 100, unit: "mg/tablet" } }
      ],
      administrationNotes: "Dose de 2 mg/kg SID. N\xE3o \xE9 um inibidor da COX, atua no receptor EP4 da prostaglandina, o que confere um melhor perfil de seguran\xE7a gastrointestinal e renal.",
      adjustmentFactors: {
        senior: "Considerado mais seguro que AINEs tradicionais, mas monitorar.",
        puppy_kitten: "N\xE3o usar em c\xE3es com menos de 8 meses ou 3.6kg.",
        pregnant_lactating: "Contraindicado.",
        liver: "Usar com cautela em hepatopatas. Pode causar diminui\xE7\xE3o da albumina/prote\xEDna total.",
        kidney: "Perfil de seguran\xE7a renal superior aos AINEs tradicionais, mas usar com cautela.",
        heart: "Usar com cautela em cardiopatas, especialmente os que usam inibidores da ECA.",
        gastro: "Mais seguro que AINEs tradicionais, mas v\xF4mito e diarreia ainda s\xE3o poss\xEDveis."
      }
    },
    // Opioides
    {
      id: "buprenorfina_cat",
      name: "Buprenorfina (Gato)",
      species: ["cat" /* Cat */],
      doseRange: { min: 0.02, max: 0.04, default: 0.03, unit: "mg/kg" },
      presentations: [
        { id: "bupre_inj_03", name: "Injet\xE1vel 0.3 mg/ml", concentration: { value: 0.3, unit: "mg/ml" } }
      ],
      administrationNotes: "Altamente eficaz pela via transmucosa oral (TMO) em gatos. Aplicar o volume na gengiva/bochecha. N\xE3o precisa engolir. Tamb\xE9m pode ser IV, IM, SC.",
      adjustmentFactors: {
        senior: "Geralmente seguro, monitorar seda\xE7\xE3o.",
        puppy_kitten: "Uso seguro.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Metabolismo hep\xE1tico. Usar com cautela e em doses menores em hepatopatas graves.",
        kidney: "Seguro em doen\xE7a renal.",
        heart: "Geralmente seguro. Pode causar bradicardia leve.",
        gastro: "Geralmente seguro. Pode causar constipa\xE7\xE3o."
      }
    },
    {
      id: "buprenorfina_dog",
      name: "Buprenorfina (C\xE3o)",
      species: ["dog" /* Dog */],
      doseRange: { min: 0.01, max: 0.02, default: 0.02, unit: "mg/kg" },
      presentations: [
        { id: "bupre_inj_03_dog", name: "Injet\xE1vel 0.3 mg/ml", concentration: { value: 0.3, unit: "mg/ml" } }
      ],
      administrationNotes: "Para dor leve a moderada. Dura\xE7\xE3o de a\xE7\xE3o mais longa que outros opioides. Administrar IV, IM, SC. A via TMO \xE9 menos eficaz em c\xE3es.",
      adjustmentFactors: {
        senior: "Geralmente seguro, monitorar seda\xE7\xE3o.",
        puppy_kitten: "Uso seguro.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Metabolismo hep\xE1tico. Usar com cautela em hepatopatas.",
        kidney: "Seguro em doen\xE7a renal.",
        heart: "Geralmente seguro.",
        gastro: "Geralmente seguro."
      }
    },
    {
      id: "metadona",
      name: "Metadona",
      species: ["dog" /* Dog */, "cat" /* Cat */],
      doseRange: { min: 0.2, max: 0.5, default: 0.3, unit: "mg/kg" },
      presentations: [
        { id: "meta_inj_10", name: "Injet\xE1vel 10 mg/ml", concentration: { value: 10, unit: "mg/ml" } }
      ],
      administrationNotes: "Opioide agonista puro, excelente para dor moderada a severa. Menor probabilidade de causar v\xF4mito que a morfina. Tamb\xE9m tem a\xE7\xE3o antagonista NMDA. Administrar IV, IM, SC a cada 4-6h.",
      adjustmentFactors: {
        senior: "Usar com cautela, pode causar seda\xE7\xE3o e bradicardia mais pronunciadas.",
        puppy_kitten: "Uso seguro, monitorar de perto.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Metabolizado pelo f\xEDgado, usar doses menores e/ou intervalos maiores.",
        kidney: "Seguro para uso em doen\xE7a renal.",
        heart: "Causa bradicardia. Usar com cautela em pacientes com fun\xE7\xE3o card\xEDaca comprometida.",
        gastro: "Pode causar constipa\xE7\xE3o."
      }
    },
    {
      id: "hidromorfona",
      name: "Hidromorfona",
      species: ["dog" /* Dog */, "cat" /* Cat */],
      doseRange: { min: 0.025, max: 0.1, default: 0.05, unit: "mg/kg" },
      presentations: [
        { id: "hidro_inj_2", name: "Injet\xE1vel 2 mg/ml", concentration: { value: 2, unit: "mg/ml" } }
      ],
      administrationNotes: "Opioide agonista puro potente. Dose c\xE3es: 0.05-0.1 mg/kg. Dose gatos: 0.025-0.05 mg/kg. Administrar IV, IM, SC a cada 4-6h. Monitorar hipertermia em gatos.",
      adjustmentFactors: {
        senior: "Usar doses mais baixas devido ao risco de seda\xE7\xE3o.",
        puppy_kitten: "Uso seguro, monitorar.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Metabolismo hep\xE1tico, usar com cautela.",
        kidney: "Seguro em doen\xE7a renal.",
        heart: "Causa bradicardia. Usar com cautela.",
        gastro: "Pode causar constipa\xE7\xE3o."
      }
    },
    {
      id: "morfina",
      name: "Morfina",
      species: ["dog" /* Dog */],
      doseRange: { min: 0.2, max: 0.5, default: 0.3, unit: "mg/kg" },
      presentations: [
        { id: "morf_inj_10", name: "Injet\xE1vel 10 mg/ml", concentration: { value: 10, unit: "mg/ml" } }
      ],
      administrationNotes: "Opioide agonista puro cl\xE1ssico. Administrar IM ou SC. A administra\xE7\xE3o IV pode causar libera\xE7\xE3o de histamina e hipotens\xE3o. Causa v\xF4mito com frequ\xEAncia.",
      adjustmentFactors: {
        senior: "Risco aumentado de seda\xE7\xE3o e depress\xE3o respirat\xF3ria. Usar doses menores.",
        puppy_kitten: "Usar com cautela.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Metabolismo hep\xE1tico, usar com cautela.",
        kidney: " metab\xF3litos ativos s\xE3o excretados pelos rins. Usar com cautela em nefropatas.",
        heart: "Pode causar bradicardia. Evitar IV.",
        gastro: "Efeito em\xE9tico forte. Pode causar constipa\xE7\xE3o."
      }
    },
    // Adjuvantes e Outros
    {
      id: "gabapentin",
      name: "Gabapentina",
      species: ["dog" /* Dog */, "cat" /* Cat */],
      doseRange: { min: 10, max: 30, default: 10, unit: "mg/kg" },
      presentations: [
        { id: "gaba_100", name: "C\xE1psula 100 mg", concentration: { value: 100, unit: "mg/tablet" } },
        { id: "gaba_300", name: "C\xE1psula 300 mg", concentration: { value: 300, unit: "mg/tablet" } },
        { id: "gaba_400", name: "C\xE1psula 400 mg", concentration: { value: 400, unit: "mg/tablet" } },
        { id: "gaba_liquid", name: "Solu\xE7\xE3o Oral 50 mg/ml (Humana)", concentration: { value: 50, unit: "mg/ml" } }
      ],
      administrationNotes: "Pode ser administrada BID ou TID. Cuidado com formula\xE7\xF5es l\xEDquidas humanas que cont\xEAm xilitol (t\xF3xico para c\xE3es). Iniciar com a dose mais baixa e aumentar gradualmente. Efeito sedativo \xE9 comum no in\xEDcio.",
      adjustmentFactors: {
        senior: "Iniciar com a menor dose e frequ\xEAncia. A depura\xE7\xE3o renal diminui com a idade.",
        puppy_kitten: "Uso seguro, mas monitorar para seda\xE7\xE3o excessiva.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Seguro, n\xE3o \xE9 metabolizada pelo f\xEDgado.",
        kidney: "A elimina\xE7\xE3o \xE9 quase exclusivamente renal. Reduzir a dose em 50% ou dobrar o intervalo em nefropatas.",
        heart: "Geralmente seguro.",
        gastro: "Geralmente seguro."
      }
    },
    {
      id: "pregabalina",
      name: "Pregabalina",
      species: ["dog" /* Dog */, "cat" /* Cat */],
      doseRange: { min: 2, max: 4, default: 2, unit: "mg/kg" },
      presentations: [
        { id: "prega_25", name: "C\xE1psula 25 mg", concentration: { value: 25, unit: "mg/tablet" } },
        { id: "prega_75", name: "C\xE1psula 75 mg", concentration: { value: 75, unit: "mg/tablet" } },
        { id: "prega_150", name: "C\xE1psula 150 mg", concentration: { value: 150, unit: "mg/tablet" } }
      ],
      administrationNotes: "Semelhante \xE0 gabapentina, mas mais potente e com dosagem BID. Usada para dor neurop\xE1tica.",
      adjustmentFactors: {
        senior: "Iniciar com a menor dose. Risco aumentado de seda\xE7\xE3o.",
        puppy_kitten: "Usar com cautela.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Seguro, sem metabolismo hep\xE1tico.",
        kidney: "Excre\xE7\xE3o renal. Reduzir a dose e/ou aumentar o intervalo em nefropatas.",
        heart: "Geralmente seguro.",
        gastro: "Geralmente seguro."
      }
    },
    {
      id: "trazodona",
      name: "Trazodona",
      species: ["dog" /* Dog */, "cat" /* Cat */],
      doseRange: { min: 3, max: 10, default: 5, unit: "mg/kg" },
      presentations: [
        { id: "trazo_50", name: "Comprimido 50 mg", concentration: { value: 50, unit: "mg/tablet" } },
        { id: "trazo_100", name: "Comprimido 100 mg", concentration: { value: 100, unit: "mg/tablet" } },
        { id: "trazo_150", name: "Comprimido 150 mg", concentration: { value: 150, unit: "mg/tablet" } }
      ],
      administrationNotes: "Antidepressivo usado como adjuvante para ansiedade e seda\xE7\xE3o leve. Pode ajudar no manejo de animais com dor e agita\xE7\xE3o. Dose c\xE3es: 3-7 mg/kg. Dose gatos: 5-10 mg/kg (~50mg/gato).",
      adjustmentFactors: {
        senior: "Usar doses mais baixas.",
        puppy_kitten: "Usar com cautela.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Metabolismo hep\xE1tico, usar com cautela.",
        kidney: "Usar com cautela.",
        heart: "Pode causar arritmias, usar com extrema cautela em cardiopatas. N\xE3o usar com inibidores da MAO.",
        gastro: "Geralmente seguro."
      }
    },
    {
      id: "maropitant",
      name: "Maropitant (Cerenia\xAE)",
      species: ["dog" /* Dog */, "cat" /* Cat */],
      doseRange: { min: 1, max: 2, default: 1, unit: "mg/kg" },
      presentations: [
        { id: "maro_comp_16", name: "Comprimido 16 mg", concentration: { value: 16, unit: "mg/tablet" } },
        { id: "maro_comp_24", name: "Comprimido 24 mg", concentration: { value: 24, unit: "mg/tablet" } },
        { id: "maro_comp_60", name: "Comprimido 60 mg", concentration: { value: 60, unit: "mg/tablet" } },
        { id: "maro_inj", name: "Injet\xE1vel 1% (10 mg/ml)", concentration: { value: 10, unit: "mg/ml" } }
      ],
      administrationNotes: "Antiem\xE9tico com propriedades analg\xE9sicas viscerais. Dose para v\xF4mito: 1 mg/kg. Dose para enjoo de movimento (c\xE3es): 2 mg/kg PO.",
      adjustmentFactors: {
        senior: "Seguro, mas usar com cautela.",
        puppy_kitten: "N\xE3o usar injet\xE1vel em c\xE3es < 8 semanas. N\xE3o usar oral em c\xE3es < 16 semanas. N\xE3o usar em gatos < 16 semanas.",
        pregnant_lactating: "Usar com cautela.",
        liver: "Metabolizado no f\xEDgado. Usar com cautela em hepatopatas.",
        kidney: "Seguro.",
        heart: "Usar com cautela em pacientes com disfun\xE7\xE3o card\xEDaca ou predisposi\xE7\xE3o.",
        gastro: "Uso prim\xE1rio \xE9 para problemas gastrointestinais."
      }
    },
    {
      id: "frunevetmab_cat",
      name: "Frunevetmab (Solensia\xAE)",
      species: ["cat" /* Cat */],
      doseRange: { min: 1, max: 2.8, default: 2.8, unit: "mg/kg" },
      presentations: [
        { id: "solensia_vial", name: "Solensia Frasco (7 mg/ml)", concentration: { value: 7, unit: "mg/ml" } }
      ],
      administrationNotes: "Anticorpo monoclonal para dor de osteoartrite felina. Administra\xE7\xE3o SC uma vez por m\xEAs. A dose \xE9 fixa com base na tabela de peso do produto.",
      adjustmentFactors: {
        senior: "Tratamento de escolha para dor de OA em gatos idosos devido ao alto perfil de seguran\xE7a.",
        puppy_kitten: "N\xE3o avaliado em gatos com menos de 12 meses.",
        pregnant_lactating: "N\xE3o recomendado.",
        liver: "Seguro, n\xE3o \xE9 metabolizado pelo f\xEDgado ou rins.",
        kidney: "Seguro em gatos com doen\xE7a renal cr\xF4nica leve a moderada.",
        heart: "Considerado seguro.",
        gastro: "Considerado seguro."
      }
    },
    {
      id: "prednisolona",
      name: "Prednisolona/Prednisona",
      species: ["dog" /* Dog */, "cat" /* Cat */],
      doseRange: { min: 0.5, max: 2, default: 1, unit: "mg/kg" },
      presentations: [
        { id: "pred_5", name: "Comprimido 5 mg", concentration: { value: 5, unit: "mg/tablet" } },
        { id: "pred_20", name: "Comprimido 20 mg", concentration: { value: 20, unit: "mg/tablet" } }
      ],
      administrationNotes: "Corticosteroide. Usado para dor inflamat\xF3ria quando AINEs s\xE3o contraindicados. N\xC3O PODE SER USADO COM AINEs. Gatos geralmente requerem doses maiores que c\xE3es. Requer desmame gradual.",
      adjustmentFactors: {
        senior: "Usar com cautela, pode exacerbar doen\xE7as subcl\xEDnicas.",
        puppy_kitten: "Pode suprimir o crescimento com uso cr\xF4nico.",
        pregnant_lactating: "Contraindicado.",
        liver: "Prednisona \xE9 convertida em prednisolona no f\xEDgado. Prefira prednisolona em hepatopatas.",
        kidney: "Pode causar poli\xFAria/polidipsia. Usar com cautela.",
        heart: "Pode causar reten\xE7\xE3o de s\xF3dio e \xE1gua. Usar com cautela em ICC.",
        gastro: "Risco de ulcera\xE7\xE3o gastrointestinal, especialmente se usado com AINEs (contraindicado)."
      }
    }
  ];

  // modules/escalas-dor/components/Icons.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var AppLogo = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "img",
    {
      src: "https://res.cloudinary.com/dwta1roq1/image/upload/w_200,q_auto,f_auto,e_background_removal/logo-analgesia/app",
      alt: "Logo do aplicativo Analgesia e controle de dor veterin\xE1ria, mostrando o perfil de um c\xE3o e um gato dentro de um c\xEDrculo verde e azul com um cora\xE7\xE3o",
      className,
      width: "200",
      height: "200"
    }
  );
  var GuideIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.5,12.5 C9.5,11.5 10.5,11.5 10.5,12.5 C10,13.5 9,13.5 8.5,12.5 Z", fill: "white" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13.5,12.5 C14.5,11.5 15.5,11.5 15.5,12.5 C15,13.5 14,13.5 13.5,12.5 Z", fill: "white" })
  ] });
  var PawIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.5-7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.01 18.2c-1.48 0-2.75-.81-3.45-2H15.5c-.7 1.19-1.97 2-3.49 2z", transform: "translate(0, -2)" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.5 13.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z", transform: "translate(-1.5, 0)" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.5 13.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z", transform: "translate(1.5, 0)" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z", transform: "translate(0, -1)" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "none", d: "M0 0h24v24H0z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z m-7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z m3.5-7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z", opacity: ".3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.01 18c-1.48 0-2.75-.81-3.45-2h6.89c-.7 1.19-1.97 2-3.44 2z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "8.5", cy: "11.2", r: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "15.5", cy: "11.2", r: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "6.2", r: "2" })
      ]
    }
  );
  var SpinnerIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: `animate-spin h-5 w-5 ${className}`, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
  ] });
  var CalculatorIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 7h3v2H8V7zm0 4h3v2H8v-2zm0 4h3v2H8v-2zm4-4h3v2h-3v-2zm0 4h3v2h-3v-2zm-1-8h3v2h-3V7z" }) });

  // modules/escalas-dor/gemini.ts
  var import_meta = {};
  async function getPainAnalysis(context) {
    const apiKey = import_meta.env.VITE_GEMINI_API_KEY?.trim();
    if (!apiKey) {
      throw new Error("VITE_GEMINI_API_KEY n\xE3o configurada.");
    }
    const speciesPortuguese = context.species === "dog" ? "C\xE3o" : "Gato";
    const painTypePortuguese = context.painType === "acute" ? "Aguda" : "Cr\xF4nica";
    const prompt = `
    Voc\xEA \xE9 um especialista veterin\xE1rio s\xEAnior em manejo da dor, fornecendo uma segunda opini\xE3o concisa para um colega veterin\xE1rio.
    Com base nos seguintes dados de avalia\xE7\xE3o, gere uma resposta JSON estruturada.

    Dados da Avalia\xE7\xE3o:
    - Esp\xE9cie: ${speciesPortuguese}
    - Tipo de Dor: ${painTypePortuguese}
    - Escala Utilizada: ${context.scaleName}
    - Escore Obtido: ${context.score}
    - Interpreta\xE7\xE3o Padr\xE3o da Escala: ${context.analysis}

    Sua Tarefa:
    Preencha os campos do schema JSON com base nos dados. Seja direto, profissional e use terminologia t\xE9cnica apropriada. O objetivo \xE9 apoiar a decis\xE3o cl\xEDnica, n\xE3o substitu\xED-la.
  `;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  clinicalAnalysis: { type: "STRING" },
                  actionSuggestions: { type: "STRING" },
                  importantReminders: { type: "STRING" }
                },
                required: ["clinicalAnalysis", "actionSuggestions"]
              }
            }
          })
        }
      );
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Falha na API Gemini (${response.status}): ${errorBody}`);
      }
      const payload = await response.json();
      const jsonText = payload?.candidates?.[0]?.content?.parts?.[0]?.text?.trim?.() ?? "";
      if (jsonText.startsWith("{") && jsonText.endsWith("}")) {
        return JSON.parse(jsonText);
      } else {
        console.error("Gemini response was not a valid JSON object:", jsonText);
        throw new Error("A IA retornou uma resposta em formato inesperado.");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      if (error instanceof Error) {
        throw new Error(`Erro ao contatar a IA: ${error.message}. Verifique a chave de API e a conex\xE3o.`);
      }
      throw new Error("Ocorreu um erro desconhecido ao contatar a IA.");
    }
  }

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react2 = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var import_react = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react.forwardRef)(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react2.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/book-open-check.js
  var __iconNode = [
    ["path", { d: "M12 21V7", key: "gj6g52" }],
    ["path", { d: "m16 12 2 2 4-4", key: "mdajum" }],
    [
      "path",
      {
        d: "M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3",
        key: "8arnkb"
      }
    ]
  ];
  var BookOpenCheck = createLucideIcon("book-open-check", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/calculator.js
  var __iconNode2 = [
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
    ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
    ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
    ["path", { d: "M16 10h.01", key: "1m94wz" }],
    ["path", { d: "M12 10h.01", key: "1nrarc" }],
    ["path", { d: "M8 10h.01", key: "19clt8" }],
    ["path", { d: "M12 14h.01", key: "1etili" }],
    ["path", { d: "M8 14h.01", key: "6423bh" }],
    ["path", { d: "M12 18h.01", key: "mhygvu" }],
    ["path", { d: "M8 18h.01", key: "lrp35t" }]
  ];
  var Calculator = createLucideIcon("calculator", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/cat.js
  var __iconNode3 = [
    [
      "path",
      {
        d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
        key: "x6xyqk"
      }
    ],
    ["path", { d: "M8 14v.5", key: "1nzgdb" }],
    ["path", { d: "M16 14v.5", key: "1lajdz" }],
    ["path", { d: "M11.25 16.25h1.5L12 17l-.75-.75Z", key: "12kq1m" }]
  ];
  var Cat = createLucideIcon("cat", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/chart-column.js
  var __iconNode4 = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
    ["path", { d: "M18 17V9", key: "2bz60n" }],
    ["path", { d: "M13 17V5", key: "1frdt8" }],
    ["path", { d: "M8 17v-3", key: "17ska0" }]
  ];
  var ChartColumn = createLucideIcon("chart-column", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/clipboard-check.js
  var __iconNode5 = [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
    [
      "path",
      {
        d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
        key: "116196"
      }
    ],
    ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
  ];
  var ClipboardCheck = createLucideIcon("clipboard-check", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/dog.js
  var __iconNode6 = [
    ["path", { d: "M11.25 16.25h1.5L12 17z", key: "w7jh35" }],
    ["path", { d: "M16 14v.5", key: "1lajdz" }],
    [
      "path",
      {
        d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309",
        key: "u7s9ue"
      }
    ],
    ["path", { d: "M8 14v.5", key: "1nzgdb" }],
    [
      "path",
      {
        d: "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",
        key: "v8hric"
      }
    ]
  ];
  var Dog = createLucideIcon("dog", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/house.js
  var __iconNode7 = [
    ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt"
      }
    ]
  ];
  var House = createLucideIcon("house", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/list-checks.js
  var __iconNode8 = [
    ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
    ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
    ["path", { d: "M13 6h8", key: "15sg57" }],
    ["path", { d: "M13 12h8", key: "h98zly" }],
    ["path", { d: "M13 18h8", key: "oe0vm4" }]
  ];
  var ListChecks = createLucideIcon("list-checks", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/menu.js
  var __iconNode9 = [
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 18h16", key: "19g7jn" }],
    ["path", { d: "M4 6h16", key: "1o0s65" }]
  ];
  var Menu = createLucideIcon("menu", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/moon.js
  var __iconNode10 = [
    [
      "path",
      {
        d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
        key: "kfwtm"
      }
    ]
  ];
  var Moon = createLucideIcon("moon", __iconNode10);

  // node_modules/lucide-react/dist/esm/icons/shield-check.js
  var __iconNode11 = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  var ShieldCheck = createLucideIcon("shield-check", __iconNode11);

  // node_modules/lucide-react/dist/esm/icons/stethoscope.js
  var __iconNode12 = [
    ["path", { d: "M11 2v2", key: "1539x4" }],
    ["path", { d: "M5 2v2", key: "1yf1q8" }],
    ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
    ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
    ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
  ];
  var Stethoscope = createLucideIcon("stethoscope", __iconNode12);

  // node_modules/lucide-react/dist/esm/icons/sun.js
  var __iconNode13 = [
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
    ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
    ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
  ];
  var Sun = createLucideIcon("sun", __iconNode13);

  // node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode14 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode14);

  // modules/escalas-dor/App.tsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  var SCREEN_TITLES = {
    home: "In\xC3\xADcio",
    painType: "Cen\xC3\xA1rio",
    scaleSelect: "Escalas",
    assessment: "Avalia\xC3\xA7\xC3\xA3o",
    results: "Resultados",
    guide: "Guias",
    clinicalGuidelines: "Diretrizes",
    calculator: "Calculadora"
  };
  var SCREEN_ICONS = {
    home: House,
    painType: Stethoscope,
    scaleSelect: ListChecks,
    assessment: ClipboardCheck,
    results: ChartColumn,
    guide: BookOpenCheck,
    clinicalGuidelines: ShieldCheck,
    calculator: Calculator
  };
  var Header = ({ title, onBack, onHome }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center", children: [
      onBack && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: onBack, className: "text-slate-700 hover:text-slate-900 mr-4 p-2 rounded-full hover:bg-slate-100 font-semibold", children: "\u2190 Voltar" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PawIcon, { className: "h-8 w-8 text-teal-600 mr-3" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: "text-2xl font-bold text-slate-800", children: title })
    ] }),
    onHome && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: onHome, className: "text-slate-700 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 font-semibold", children: "In\xC3\xADcio" })
  ] });
  var Card = ({ children, className }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `bg-white rounded-xl shadow-lg overflow-hidden ${className}`, children });
  var Modal = ({ isOpen, onClose, title, children }) => {
    (0, import_react3.useEffect)(() => {
      const handleEsc = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }, [onClose]);
    if (!isOpen) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300",
        onClick: onClose,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { id: "modal-title", className: "text-xl font-bold text-slate-800", children: title }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: onClose, className: "text-slate-500 hover:text-slate-800 font-bold text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100", "aria-label": "Fechar", children: "\xD7" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "p-6 overflow-y-auto", children })
            ]
          }
        )
      }
    );
  };
  var HomeScreen = ({ onSelectSpecies, onShowGuide, onShowClinicalGuidelines, onShowCalculator }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AppLogo, { className: "h-auto w-52 mx-auto mb-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: "text-4xl md:text-5xl font-extrabold text-slate-800", children: "Analgesia e controle de dor veterin\xC3\xA1ria" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-600 mt-2 text-lg", children: "Avalia\xC3\xA7\xC3\xA3o e Manejo da Dor em C\xC3\xA3es e Gatos" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-2xl font-bold text-center text-slate-700 mb-6", children: "Comece por aqui" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => onSelectSpecies("dog" /* Dog */), className: "group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-48", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mb-2 rounded-2xl bg-teal-500/15 p-4 text-teal-700 transition-transform duration-300 group-hover:scale-110", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Dog, { className: "h-12 w-12", "aria-hidden": true }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-2xl font-semibold text-slate-800", children: "C\xE3o" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => onSelectSpecies("cat" /* Cat */), className: "group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-48", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mb-2 rounded-2xl bg-teal-500/15 p-4 text-teal-700 transition-transform duration-300 group-hover:scale-110", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Cat, { className: "h-12 w-12", "aria-hidden": true }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-2xl font-semibold text-slate-800", children: "Gato" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-8 flex flex-col space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: onShowCalculator, className: "w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CalculatorIcon, { className: "h-6 w-6" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Calculadora de Doses" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: onShowGuide, className: "w-full bg-white text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuideIcon, { className: "h-6 w-6 text-teal-600" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Guias de Manejo da Dor" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: onShowClinicalGuidelines, className: "w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors", children: "Diretrizes Cl\xC3\xADnicas de Manejo da Dor" })
      ] })
    ] })
  ] });
  var PainTypeScreen = ({ species, onSelectPainType, onBack }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: `Esp\xC3\xA9cie: ${species === "dog" /* Dog */ ? "C\xC3\xA3o" : "Gato"}`, onBack, onHome: onBack }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("main", { className: "p-4 md:p-8 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-3xl font-bold text-slate-800 mb-8", children: "Selecione o Cen\xC3\xA1rio" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { className: "hover:shadow-2xl hover:-translate-y-1 transition-all duration-300", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => onSelectPainType("acute" /* Acute */), className: "p-8 w-full h-full text-left flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-2xl font-bold text-teal-700", children: "Dor Aguda (Uso Cl\xC3\xADnico)" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-600 mt-2 flex-grow", children: "Para avalia\xC3\xA7\xC3\xA3o hospitalar pela equipe veterin\xC3\xA1ria (p\xC3\xB3s-operat\xC3\xB3rio, trauma). Foco em interven\xC3\xA7\xC3\xA3o imediata." })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { className: "hover:shadow-2xl hover:-translate-y-1 transition-all duration-300", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => onSelectPainType("chronic" /* Chronic */), className: "p-8 w-full h-full text-left flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-2xl font-bold text-teal-700", children: "Dor Cr\xC3\xB4nica (Uso pelo Tutor)" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-600 mt-2 flex-grow", children: "Para monitoramento em casa pelo tutor (osteoartrite, etc.). Foco no impacto na qualidade de vida ao longo do tempo." })
        ] }) })
      ] })
    ] })
  ] });
  var ScaleSelectionScreen = ({ species, painType, onSelectScale, onShowDetails, onBack }) => {
    const scales = PAIN_DATA[species]?.[painType]?.scales || [];
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: `Tipo de Dor: ${painType === "acute" /* Acute */ ? "Aguda" : "Cr\xC3\xB4nica"}`, onBack, onHome: onBack }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("main", { className: "p-4 md:p-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-3xl font-bold text-slate-800 mb-8 text-center", children: "Selecione a Escala de Avalia\xC3\xA7\xC3\xA3o" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "max-w-3xl mx-auto space-y-4", children: scales.map((scale) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { className: `transition-all duration-300 border-2 ${scale.questions.length > 0 ? "border-transparent hover:shadow-xl hover:border-teal-500" : "border-dashed border-slate-300 bg-slate-50"}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => onSelectScale(scale), className: "p-6 text-left w-full", disabled: scale.questions.length === 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex justify-between items-start gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-xl font-bold text-slate-800 flex-grow", children: scale.name }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex-shrink-0 flex items-center gap-2", children: [
              scale.recommended && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-xs bg-teal-100 text-teal-800 font-semibold px-2.5 py-1 rounded-full", children: "Recomendada" }),
              scale.details && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "div",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    onShowDetails(scale);
                  },
                  className: "w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-teal-200 hover:text-teal-800 flex items-center justify-center font-bold text-sm cursor-pointer",
                  "aria-label": `Mais informa\xC3\xA7\xC3\xB5es sobre ${scale.name}`,
                  role: "button",
                  children: "?"
                }
              )
            ] })
          ] }),
          scale.description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-600 mt-2 text-sm", children: scale.description }),
          scale.questions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-red-600 mt-2 font-semibold", children: "Esta escala \xC3\xA9 apenas informativa e n\xC3\xA3o est\xC3\xA1 dispon\xC3\xADvel para avalia\xC3\xA7\xC3\xA3o direta." })
        ] }) }, scale.id)) })
      ] })
    ] });
  };
  var ImageBasedQuestion = ({ question, value, onChange }) => {
    const options = question.options || [];
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "avaliacao-container text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-semibold text-slate-800 mb-4 text-lg", children: question.text }),
      question.compositeImageUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "img",
        {
          src: question.compositeImageUrl,
          alt: `Guia visual para ${question.text.toLowerCase()}`,
          className: "w-full rounded-lg shadow-md mb-4"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "opcoes-escolha grid grid-cols-3 gap-2 mt-4", role: "radiogroup", children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: () => onChange(option.score),
          role: "radio",
          "aria-checked": value === option.score,
          className: `p-3 rounded-lg border-2 text-center transition-all ${value === option.score ? "bg-teal-600 border-teal-700 text-white font-bold shadow-inner" : "bg-white border-slate-300 hover:border-teal-400 text-slate-700"}`,
          children: option.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: option.imageUrl, alt: `Op\xC3\xA7\xC3\xA3o ${option.score}`, className: "h-20 w-auto mx-auto rounded-md" }) : `Escore ${option.score}`
        },
        option.score
      )) }),
      value !== void 0 && options.find((o) => o.score === value) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 text-left", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-bold", children: [
          "Descri\xC3\xA7\xC3\xA3o (Escore ",
          value,
          "):"
        ] }),
        " ",
        options.find((o) => o.score === value)?.text
      ] }) })
    ] });
  };
  var CSUCAPQuestion = ({ question, value, onChange }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-semibold text-slate-800 mb-4 text-lg", children: question.text }),
      question.compositeImageUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mb-6 rounded-lg overflow-hidden shadow-md", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "img",
        {
          src: question.compositeImageUrl,
          alt: `Guia visual para ${question.text}`,
          className: "w-full h-auto"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-4", children: (question.options || []).map((option) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          onClick: () => onChange(option.score),
          className: `w-full text-left p-4 rounded-lg border-2 flex items-start gap-4 transition-all duration-200 ${value === option.score ? "bg-teal-50 border-teal-500 shadow-lg" : "bg-white border-slate-300 hover:border-teal-400"}`,
          children: [
            option.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: option.imageUrl, alt: `Ilustra\xC3\xA7\xC3\xA3o para escore ${option.score}`, className: "w-24 h-24 rounded-md object-cover flex-shrink-0" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex-grow", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "font-bold text-teal-800", children: [
                "Escore ",
                option.score
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700 text-sm", children: option.text })
            ] })
          ]
        },
        option.score
      )) })
    ] });
  };
  var CMPSFAssessment = ({ scale, answers, onAnswerChange, onSubmit, isComplete }) => {
    const totalScore = (0, import_react3.useMemo)(
      () => Object.values(answers).reduce((sum, val) => sum + Number(val || 0), 0),
      [answers]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("main", { className: "p-4 md:p-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { className: "p-6 md:p-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-2xl font-bold text-center mb-6 text-slate-800", children: "Avalia\xC3\xA7\xC3\xA3o de Dor Aguda em C\xC3\xA3es (Escala de Glasgow)" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "img",
          {
            src: "https://res.cloudinary.com/dwta1roq1/image/upload/escala-dor-glasgow/caes",
            alt: "Escala de Dor Composta de Glasgow (CMPS-SF) para avalia\xC3\xA7\xC3\xA3o de dor em c\xC3\xA3es",
            className: "w-full rounded-lg shadow-md mb-8"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("form", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-8", children: scale.questions.map((question) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { className: "font-bold text-lg text-slate-800 mb-3", children: question.text }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-2", children: question.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "flex items-center p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent has-[:checked]:bg-teal-50 has-[:checked]:border-teal-200 transition-colors", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                type: "radio",
                name: question.id,
                value: option.score,
                checked: answers[question.id] === option.score,
                onChange: () => onAnswerChange(question.id, option.score),
                className: "h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-400"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "ml-3 text-slate-700", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-bold", children: [
                option.score,
                ":"
              ] }),
              " ",
              option.text
            ] })
          ] }, option.score)) })
        ] }, question.id)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pt-6 border-t mt-8 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-xl font-bold", children: "Resultado da Avalia\xC3\xA7\xC3\xA3o" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-3xl font-bold my-2", children: [
            "Escore Total: ",
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { id: "escore-final-glasgow", className: "text-teal-600", children: totalScore })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "p-3 bg-amber-100 text-amber-800 rounded-md", children: "Lembrete: Escore total \xE2\u2030\xA5 5/18 (ou \xE2\u2030\xA5 6/24 na forma longa) indica necessidade de resgate analg\xC3\xA9sico." })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex justify-end mt-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: onSubmit,
          disabled: !isComplete,
          className: "bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed",
          children: "Salvar Avalia\xC3\xA7\xC3\xA3o"
        }
      ) })
    ] }) });
  };
  var UCAPSAssessment = ({ scale, answers, onAnswerChange, onSubmit, isComplete }) => {
    const totalScore = (0, import_react3.useMemo)(
      () => Object.values(answers).reduce((sum, val) => sum + Number(val || 0), 0),
      [answers]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("main", { className: "p-4 md:p-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { className: "p-6 md:p-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-2xl font-bold text-center mb-6 text-slate-800", children: "Avalia\xC3\xA7\xC3\xA3o de Dor Aguda em Gatos (Escala UNESP-Botucatu)" }),
        scale.compositeImageUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "img",
          {
            src: scale.compositeImageUrl,
            alt: "Escala Curta de Dor Multidimensional da UNESP-Botucatu para gatos",
            className: "w-full rounded-lg shadow-md mb-8"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("form", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-8", children: scale.questions.map((question) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { className: "font-bold text-lg text-slate-800 mb-3", children: question.text }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-2", children: question.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "flex items-center p-3 rounded-md hover:bg-slate-50 cursor-pointer border border-transparent has-[:checked]:bg-teal-50 has-[:checked]:border-teal-200 transition-colors", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                type: "radio",
                name: question.id,
                value: option.score,
                checked: answers[question.id] === option.score,
                onChange: () => onAnswerChange(question.id, option.score),
                className: "h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-400"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ml-3 text-slate-700", children: option.text })
          ] }, option.score)) })
        ] }, question.id)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pt-6 border-t mt-8 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-xl font-bold", children: "Resultado da Avalia\xC3\xA7\xC3\xA3o" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-3xl font-bold my-2", children: [
            "Escore Total: ",
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { id: "escore-final", className: "text-teal-600", children: totalScore })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "p-3 bg-amber-100 text-amber-800 rounded-md", children: "Lembrete: Escore total \xE2\u2030\xA5 4 indica necessidade de resgate analg\xC3\xA9sico." })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex justify-end mt-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: onSubmit,
          disabled: !isComplete,
          className: "bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed",
          children: "Salvar Avalia\xC3\xA7\xC3\xA3o"
        }
      ) })
    ] }) });
  };
  var AssessmentScreen = ({ scale, onSubmit, onBack }) => {
    const [answers, setAnswers] = (0, import_react3.useState)(() => {
      const initialAnswers = {};
      scale.questions.forEach((q) => {
        if (q.type === "slider" /* Slider */) {
          initialAnswers[q.id] = q.min ?? 0;
        }
      });
      return initialAnswers;
    });
    const handleAnswerChange = (questionId, value) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };
    const isComplete = (0, import_react3.useMemo)(() => {
      if (scale.id === "csom") {
        const name1 = answers["activity_1_name"];
        const score1 = answers["activity_1_score"];
        return name1 && typeof name1 === "string" && name1.trim() !== "" && score1 !== void 0;
      }
      return scale.questions.every((q) => answers[q.id] !== void 0 && answers[q.id] !== "");
    }, [answers, scale]);
    if (scale.id === "ucaps") {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: scale.name, onBack, onHome: onBack }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          UCAPSAssessment,
          {
            scale,
            answers,
            onAnswerChange: (qid, val) => handleAnswerChange(qid, val),
            onSubmit: () => onSubmit(answers),
            isComplete
          }
        )
      ] });
    }
    if (scale.id === "cmps-sf") {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: scale.name, onBack, onHome: onBack }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          CMPSFAssessment,
          {
            scale,
            answers,
            onAnswerChange: (qid, val) => handleAnswerChange(qid, val),
            onSubmit: () => onSubmit(answers),
            isComplete
          }
        )
      ] });
    }
    const renderQuestion = (question) => {
      const value = answers[question.id];
      if (question.type === "custom" /* Custom */) {
        if (scale.id === "fgs") {
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ImageBasedQuestion, { question, value, onChange: (val) => handleAnswerChange(question.id, val) });
        }
        if (scale.id === "csu-cap" || scale.id === "csu-faps") {
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CSUCAPQuestion, { question, value, onChange: (val) => handleAnswerChange(question.id, val) });
        }
      }
      switch (question.type) {
        case "text" /* Text */:
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: question.id, className: "block font-semibold text-slate-800 mb-2", children: question.text }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                id: question.id,
                type: "text",
                value: answers[question.id] || "",
                onChange: (e) => handleAnswerChange(question.id, e.target.value),
                className: "w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500",
                placeholder: "Escreva aqui..."
              }
            )
          ] });
        case "radio" /* Radio */:
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-semibold text-slate-800 mb-2", children: question.text }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-2", children: question.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "flex items-center p-3 rounded-md hover:bg-slate-100 cursor-pointer border border-transparent has-[:checked]:bg-teal-50 has-[:checked]:border-teal-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "input",
                {
                  type: "radio",
                  name: question.id,
                  value: option.score,
                  checked: answers[question.id] === option.score,
                  onChange: () => handleAnswerChange(question.id, option.score),
                  className: "h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-400"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ml-3 text-slate-700", children: option.text })
            ] }, option.score)) })
          ] });
        case "slider" /* Slider */:
          const min = question.min ?? 0;
          const max = question.max ?? 10;
          const currentValue = answers[question.id] ?? min;
          const sliderLabels = scale.id === "fmpi" ? ["Normal", "Leve", "Moderado", "Severo", "M\xC3\xA1ximo"] : [];
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: question.id, className: "block font-semibold text-slate-800 mb-2", children: question.text }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-sm text-slate-600 w-20 text-right", children: question.labelMin }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "input",
                {
                  id: question.id,
                  type: "range",
                  min,
                  max,
                  step: question.step,
                  value: currentValue,
                  onChange: (e) => handleAnswerChange(question.id, parseInt(e.target.value, 10)),
                  className: "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-sm text-slate-600 w-24", children: question.labelMax }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-bold text-teal-700 text-lg w-12 text-center", children: currentValue })
            ] }),
            sliderLabels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex justify-between text-xs text-slate-500 mt-1 px-2", children: sliderLabels.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: label }, index)) })
          ] });
        default:
          return null;
      }
    };
    const questionsByCat = scale.questions.reduce((acc, q) => {
      const cat = q.category || "default";
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(q);
      return acc;
    }, {});
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: scale.name, onBack, onHome: onBack }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("main", { className: "p-4 md:p-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto space-y-8", children: [
        Object.entries(questionsByCat).map(([category, questions]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { className: "p-6 md:p-8", children: [
          category !== "default" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-xl font-bold text-slate-800 mb-6 border-b pb-2", children: category }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-8", children: questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: renderQuestion(q) }, q.id)) })
        ] }, category)),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex justify-end mt-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            onClick: () => onSubmit(answers),
            disabled: !isComplete,
            className: "bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed",
            children: "Ver Resultado"
          }
        ) })
      ] }) })
    ] });
  };
  var ResultScreen = ({ result, scaleName, painType, onRestart, onShowGuide, onGetGeminiOpinion, geminiLoading }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: "Resultado da Avalia\xC3\xA7\xC3\xA3o", onHome: onRestart }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("main", { className: "p-4 md:p-8 flex items-center justify-center", style: { minHeight: "calc(100vh - 80px)" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { className: "max-w-2xl w-full text-center p-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-lg font-semibold text-slate-700", children: scaleName }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-6xl font-extrabold text-slate-800 my-4", children: result.score }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `p-4 rounded-lg my-6 ${result.needsIntervention ? "bg-red-100" : "bg-green-100"}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: `font-bold text-lg mb-2 ${result.needsIntervention ? "text-red-900" : "text-green-900"}`, children: result.needsIntervention ? painType === "acute" /* Acute */ ? "Resgate Analg\xC3\xA9sico Indicado" : "Manejo da Dor Cr\xC3\xB4nica Indicado" : "Dor Controlada ou Ausente" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: result.needsIntervention ? "text-red-800" : "text-green-800", children: result.analysis })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-8 flex flex-col gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex flex-col sm:flex-row justify-center gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: onRestart, className: "bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors flex-1", children: "Fazer Nova Avalia\xC3\xA7\xC3\xA3o" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => onShowGuide(painType), className: "bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex-1", children: "Ver Guias de Manejo" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative flex py-3 items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex-grow border-t border-slate-300" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "flex-shrink mx-4 text-slate-500 text-sm", children: "OU" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex-grow border-t border-slate-300" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            onClick: onGetGeminiOpinion,
            disabled: geminiLoading,
            className: "w-full bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-900 transition-colors disabled:bg-slate-400 disabled:cursor-wait flex items-center justify-center gap-3",
            children: geminiLoading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SpinnerIcon, { className: "h-5 w-5" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Analisando..." })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\xF0\u0178\xA4\u2013" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Obter Segunda Opini\xC3\xA3o com IA" })
            ] })
          }
        )
      ] })
    ] }) })
  ] });
  var InfoButton = ({ title, content, onInfoClick }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      onClick: () => onInfoClick(title, content),
      className: "ml-2 inline-block w-5 h-5 rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 text-sm font-bold align-middle transition-transform hover:scale-110",
      "aria-label": `Mais informa\xC3\xA7\xC3\xB5es sobre ${title}`,
      children: "?"
    }
  );
  var GuideSection = ({ title, children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { className: "p-6 md:p-8 mb-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-4 text-slate-700 leading-relaxed", children })
  ] });
  var CRICalculator = ({ species, onInfoClick }) => {
    const [deliveryMethod, setDeliveryMethod] = (0, import_react3.useState)("bag");
    const [weight, setWeight] = (0, import_react3.useState)("");
    const [fluidRate, setFluidRate] = (0, import_react3.useState)("");
    const [bagVolume, setBagVolume] = (0, import_react3.useState)("1000");
    const [syringeVolume, setSyringeVolume] = (0, import_react3.useState)("60");
    const [desiredConcentration, setDesiredConcentration] = (0, import_react3.useState)("");
    const [drug, setDrug] = (0, import_react3.useState)("fentanyl");
    const [result, setResult] = (0, import_react3.useState)(null);
    const drugData = {
      fentanyl: { name: "Fentanil", doseRange: "3-10 \xC2\xB5g/kg/h", doseMcgKgMin: 5 / 60, concentrationMgMl: 0.05, concentrationLabel: "50 \xC2\xB5g/ml", defaultTargetConcentrationMgMl: 0.01 },
      lidocaine: { name: "Lidoca\xC3\xADna", doseRange: "30-50 \xC2\xB5g/kg/min", doseMcgKgMin: 40, concentrationMgMl: 20, concentrationLabel: "20 mg/ml (2%)", defaultTargetConcentrationMgMl: 2 },
      ketamine: { name: "Cetamina", doseRange: "2-10 \xC2\xB5g/kg/min", doseMcgKgMin: 5, concentrationMgMl: 100, concentrationLabel: "100 mg/ml", defaultTargetConcentrationMgMl: 1 }
    };
    (0, import_react3.useEffect)(() => {
      if (deliveryMethod === "syringe") {
        const defaultConc = drugData[drug]?.defaultTargetConcentrationMgMl;
        if (defaultConc) {
          setDesiredConcentration(defaultConc.toString());
        } else {
          setDesiredConcentration("");
        }
      }
      setResult(null);
    }, [drug, deliveryMethod]);
    const calculateCRI = () => {
      const w = parseFloat(weight);
      if (isNaN(w) || w <= 0) {
        setResult(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-red-700", children: "Por favor, preencha o peso do paciente com um valor v\xC3\xA1lido." }));
        return;
      }
      const { doseMcgKgMin, concentrationMgMl, name: drugName, concentrationLabel } = drugData[drug];
      if (deliveryMethod === "bag") {
        const fr = parseFloat(fluidRate);
        const bv = parseFloat(bagVolume);
        if (isNaN(fr) || isNaN(bv) || fr <= 0) {
          setResult(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-red-700", children: "Por favor, preencha todos os campos da bolsa de fluido com valores v\xC3\xA1lidos." }));
          return;
        }
        const doseMgPerHour = doseMcgKgMin * 60 / 1e3;
        const totalMgNeededPerHour = doseMgPerHour * w;
        const requiredConcentrationInBag = totalMgNeededPerHour / fr;
        const totalMgToAdd = requiredConcentrationInBag * bv;
        const volumeMlNeeded = totalMgToAdd / concentrationMgMl;
        if (volumeMlNeeded > bv) {
          setResult(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-red-700", children: "O volume de f\xC3\xA1rmaco a adicionar excede o volume da bolsa. Verifique os valores." }));
          return;
        }
        setResult(
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "text-left space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-bold", children: "Instru\xC3\xA7\xC3\xB5es para a Bolsa de Fluido:" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ol", { className: "list-decimal list-inside space-y-1 text-slate-800", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Concentra\xC3\xA7\xC3\xA3o Alvo na Bolsa:" }),
                " ",
                requiredConcentrationInBag.toFixed(3),
                " mg/ml."
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Total de F\xC3\xA1rmaco Necess\xC3\xA1rio:" }),
                " ",
                totalMgToAdd.toFixed(2),
                " mg para a bolsa de ",
                bv,
                " ml."
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { className: "font-bold text-teal-900 bg-teal-200 p-2 mt-2 rounded-md", children: [
                "Adicione ",
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "underline", children: [
                  volumeMlNeeded.toFixed(2),
                  " ml"
                ] }),
                " de ",
                drugName,
                " na bolsa de fluido."
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-slate-500 pt-2", children: "Este c\xC3\xA1lculo assume que a adi\xC3\xA7\xC3\xA3o deste volume \xC3\xA0 bolsa \xC3\xA9 desprez\xC3\xADvel para o volume total." })
          ] })
        );
      } else {
        const sv = parseFloat(syringeVolume);
        const dc = parseFloat(desiredConcentration);
        if (isNaN(sv) || isNaN(dc) || sv <= 0 || dc <= 0) {
          setResult(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-red-700", children: "Por favor, preencha o volume da seringa e a concentra\xC3\xA7\xC3\xA3o desejada com valores v\xC3\xA1lidos." }));
          return;
        }
        if (dc > concentrationMgMl) {
          setResult(
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "text-red-800 bg-red-100 p-3 rounded-md", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-bold", children: "Concentra\xC3\xA7\xC3\xA3o Inv\xC3\xA1lida!" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
                "A concentra\xC3\xA7\xC3\xA3o desejada (",
                dc,
                " mg/ml) n\xC3\xA3o pode ser maior que a do f\xC3\xA1rmaco original (",
                concentrationMgMl,
                " mg/ml)."
              ] })
            ] })
          );
          return;
        }
        const totalMgToAdd = dc * sv;
        const volumeOfDrugToAdd = totalMgToAdd / concentrationMgMl;
        const volumeOfDiluent = sv - volumeOfDrugToAdd;
        if (volumeOfDiluent < 0) {
          setResult(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-red-700", children: "Erro: O volume do diluente \xC3\xA9 negativo. A concentra\xC3\xA7\xC3\xA3o desejada \xC3\xA9 muito alta." }));
          return;
        }
        const doseMgPerHour = doseMcgKgMin * 60 / 1e3;
        const totalMgNeededPerHour = doseMgPerHour * w;
        const requiredInfusionRate = totalMgNeededPerHour / dc;
        let rateWarning = null;
        if (requiredInfusionRate > 50) {
          rateWarning = "A taxa de infus\xC3\xA3o calculada \xC3\xA9 muito alta (>50 ml/h). A seringa se esgotar\xC3\xA1 rapidamente. Considere usar uma dilui\xC3\xA7\xC3\xA3o mais concentrada.";
        } else if (requiredInfusionRate < 0.1) {
          rateWarning = "A taxa de infus\xC3\xA3o calculada \xC3\xA9 muito baixa (&lt;0.1 ml/h) e pode n\xC3\xA3o ser precisa em algumas bombas. Considere usar uma dilui\xC3\xA7\xC3\xA3o menos concentrada (mais dilu\xC3\xADda).";
        }
        setResult(
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "text-left space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "font-bold", children: [
              "Instru\xC3\xA7\xC3\xB5es para a Bomba de Seringa (dilui\xC3\xA7\xC3\xA3o de ",
              dc,
              " mg/ml):"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ol", { className: "list-decimal list-inside space-y-1 text-slate-800", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
                "Aspire ",
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-bold", children: [
                  volumeOfDrugToAdd.toFixed(2),
                  " ml"
                ] }),
                " de ",
                drugName,
                " (de ",
                concentrationLabel,
                ")."
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
                "Complete com ",
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-bold", children: [
                  volumeOfDiluent.toFixed(2),
                  " ml"
                ] }),
                " de diluente (ex: NaCl 0.9%) para um volume total de ",
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-bold", children: [
                  sv,
                  " ml"
                ] }),
                "."
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { className: "font-bold text-teal-900 bg-teal-200 p-2 mt-2 rounded-md", children: [
                "Programe a bomba de infus\xC3\xA3o para ",
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "underline", children: [
                  requiredInfusionRate.toFixed(2),
                  " ml/h"
                ] }),
                "."
              ] })
            ] }),
            rateWarning && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-3 p-2 bg-amber-100 text-amber-900 border border-amber-300 rounded-md text-sm", children: rateWarning })
          ] })
        );
      }
    };
    const Bold2 = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { className: "font-semibold text-slate-800", children });
    const fluidRateInfoContent = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mb-4", children: "O objetivo da infus\xC3\xA3o cont\xC3\xADnua (CRI) em bolsa de fluido \xC3\xA9 enriquecer a solu\xC3\xA7\xC3\xA3o de fluidoterapia para que o paciente receba uma dose terap\xC3\xAAutica constante do medicamento. Este guia detalha a l\xC3\xB3gica por tr\xC3\xA1s do c\xC3\xA1lculo." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800 mb-2", children: "Cen\xC3\xA1rio de Exemplo:" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc list-inside space-y-1 mb-4 text-slate-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "Paciente:" }),
          " C\xC3\xA3o de 10 kg"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "Taxa de Fluido:" }),
          " 21 ml/h"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "Bolsa de Fluido:" }),
          " 250 ml"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "F\xC3\xA1rmaco:" }),
          " Lidoca\xC3\xADna (frasco a 20 mg/ml)"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "Dose Alvo:" }),
          " 40 \xC2\xB5g/kg/min (equivalente a 2.4 mg/kg/h)"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800 mb-2", children: "Passo 1: Calcular a Necessidade de F\xC3\xA1rmaco por Hora (mg/h)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mb-2", children: "Primeiro, determinamos a massa total de f\xC3\xA1rmaco que o paciente precisa a cada hora." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-slate-100 p-3 rounded-md font-mono text-sm my-2 text-center", children: "Dose (mg/kg/h) \xD7 Peso (kg) = Necessidade por Hora (mg/h)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-teal-50 border-l-4 border-teal-400 p-3 my-2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "font-mono text-sm", children: [
        "2.4 mg/kg/h \xD7 10 kg = ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "24 mg/h" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-slate-600 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("em", { children: "Conclus\xC3\xA3o: Este paciente precisa de 24 mg de Lidoca\xC3\xADna por hora." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800 mb-2", children: "Passo 2: Calcular a Concentra\xC3\xA7\xC3\xA3o Alvo na Bolsa (mg/ml)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mb-2", children: "Para que os 24 mg sejam entregues em 21 ml de fluido a cada hora, cada ml da bolsa deve ter uma concentra\xC3\xA7\xC3\xA3o espec\xC3\xADfica." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-slate-100 p-3 rounded-md font-mono text-sm my-2 text-center", children: "Necessidade por Hora (mg/h) \xF7 Taxa de Fluido (ml/h) = Concentra\xC3\xA7\xC3\xA3o Alvo (mg/ml)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-teal-50 border-l-4 border-teal-400 p-3 my-2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "font-mono text-sm", children: [
        "24 mg/h \xF7 21 ml/h \u2248 ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "1.14 mg/ml" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-slate-600 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("em", { children: "Conclus\xC3\xA3o: Cada ml da bolsa precisa conter 1.14 mg de Lidoca\xC3\xADna." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800 mb-2", children: "Passo 3: Calcular o Total de F\xC3\xA1rmaco para a Bolsa (mg)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mb-2", children: "Agora, calculamos a massa total de f\xC3\xA1rmaco para enriquecer a bolsa inteira de 250 ml." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-slate-100 p-3 rounded-md font-mono text-sm my-2 text-center", children: "Concentra\xC3\xA7\xC3\xA3o Alvo (mg/ml) \xD7 Volume da Bolsa (ml) = Total de F\xC3\xA1rmaco (mg)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-teal-50 border-l-4 border-teal-400 p-3 my-2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "font-mono text-sm", children: [
        "1.14 mg/ml \xD7 250 ml = ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "285 mg" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-slate-600 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("em", { children: "Conclus\xC3\xA3o: Precisamos adicionar um total de 285 mg de Lidoca\xC3\xADna." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800 mb-2", children: "Passo 4: Converter Massa (mg) em Volume (ml)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mb-2", children: "Finalmente, convertemos a massa em um volume mensur\xC3\xA1vel, usando a concentra\xC3\xA7\xC3\xA3o do frasco original do f\xC3\xA1rmaco (20 mg/ml)." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-slate-100 p-3 rounded-md font-mono text-sm my-2 text-center", children: "Total de F\xC3\xA1rmaco (mg) \xF7 Concentra\xC3\xA7\xC3\xA3o Original (mg/ml) = Volume a Adicionar (ml)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-teal-50 border-l-4 border-teal-400 p-3 my-2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "font-mono text-sm", children: [
        "285 mg \xF7 20 mg/ml = ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "14.25 ml" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-green-900 font-bold text-lg", children: [
        "Resultado: Adicione ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "underline", children: "14.25 ml" }),
        " de Lidoca\xC3\xADna (20 mg/ml) \xC3\xA0 bolsa de 250 ml."
      ] }) })
    ] });
    const syringeConcentrationInfoContent = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "mb-2", children: [
        "Definir uma ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "concentra\xC3\xA7\xC3\xA3o alvo" }),
        " (ex: 1 mg/ml) permite criar dilui\xC3\xA7\xC3\xB5es padronizadas e f\xC3\xA1ceis de preparar. Esta abordagem tem v\xC3\xA1rias vantagens:"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc list-inside mb-3 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "Reduz erros de c\xC3\xA1lculo:" }),
          ' Fazer uma dilui\xC3\xA7\xC3\xA3o para um n\xC3\xBAmero "redondo" \xC3\xA9 menos propenso a erros.'
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "Otimiza o uso de f\xC3\xA1rmacos:" }),
          " Permite criar a dilui\xC3\xA7\xC3\xA3o mais econ\xC3\xB4mica para a situa\xC3\xA7\xC3\xA3o."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "Aumenta a seguran\xC3\xA7a:" }),
          " Evita concentra\xC3\xA7\xC3\xB5es excessivamente altas ou baixas."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "font-semibold", children: [
        "A calculadora determinar\xC3\xA1 a ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold2, { children: "taxa de infus\xC3\xA3o (ml/h)" }),
        " necess\xC3\xA1ria para administrar a dose correta ao paciente com base na sua dilui\xC3\xA7\xC3\xA3o. Este m\xC3\xA9todo \xC3\xA9 frequentemente preferido em ambientes cl\xC3\xADnicos movimentados."
      ] })
    ] });
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bg-slate-50 p-6 rounded-lg border border-slate-200 mt-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mb-4", children: "Calculadora de Infus\xC3\xA3o Cont\xC3\xADnua" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "M\xC3\xA9todo de Administra\xC3\xA7\xC3\xA3o" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex rounded-md shadow-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setDeliveryMethod("bag"), className: `px-4 py-2 text-sm font-medium border border-slate-300 rounded-l-md flex-1 ${deliveryMethod === "bag" ? "bg-teal-600 text-white border-teal-600 z-10" : "bg-white text-slate-700 hover:bg-slate-50"}`, children: "Bolsa de Fluido" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setDeliveryMethod("syringe"), className: `px-4 py-2 text-sm font-medium border-t border-b border-r border-slate-300 rounded-r-md flex-1 ${deliveryMethod === "syringe" ? "bg-teal-600 text-white border-teal-600 z-10" : "bg-white text-slate-700 hover:bg-slate-50"}`, children: "Bomba de Seringa" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "block text-sm font-medium text-slate-700", children: "Peso do Paciente (kg)" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "number", value: weight, onChange: (e) => setWeight(e.target.value), placeholder: "Ex: 10", className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "block text-sm font-medium text-slate-700", children: "F\xC3\xA1rmaco (Conc.)" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: drug, onChange: (e) => {
            setDrug(e.target.value);
            setResult(null);
          }, className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("option", { value: "fentanyl", children: [
              drugData.fentanyl.name,
              " (",
              drugData.fentanyl.concentrationLabel,
              ")"
            ] }),
            species === "dog" /* Dog */ && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("option", { value: "lidocaine", children: [
              drugData.lidocaine.name,
              " (",
              drugData.lidocaine.concentrationLabel,
              ")"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("option", { value: "ketamine", children: [
              drugData.ketamine.name,
              " (",
              drugData.ketamine.concentrationLabel,
              ")"
            ] })
          ] })
        ] }),
        deliveryMethod === "bag" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "flex items-center text-sm font-medium text-slate-700", children: [
              "Taxa de Fluido (ml/h)",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Como Calcular a Adi\xC3\xA7\xC3\xA3o \xC3\xA0 Bolsa de Fluido", content: fluidRateInfoContent, onInfoClick })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "number", value: fluidRate, onChange: (e) => setFluidRate(e.target.value), placeholder: "Ex: 21", className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "block text-sm font-medium text-slate-700", children: "Volume da Bolsa (ml)" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: bagVolume, onChange: (e) => setBagVolume(e.target.value), className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "250", children: "250 ml" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "500", children: "500 ml" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "1000", children: "1000 ml" })
            ] })
          ] })
        ] }),
        deliveryMethod === "syringe" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "block text-sm font-medium text-slate-700", children: "Volume da Seringa (ml)" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: syringeVolume, onChange: (e) => setSyringeVolume(e.target.value), className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "20", children: "20 ml" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "50", children: "50 ml" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "60", children: "60 ml" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "flex items-center text-sm font-medium text-slate-700", children: [
              "Concentra\xC3\xA7\xC3\xA3o Desejada (mg/ml)",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Por que Definir uma Concentra\xC3\xA7\xC3\xA3o?", content: syringeConcentrationInfoContent, onInfoClick })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "number", value: desiredConcentration, onChange: (e) => setDesiredConcentration(e.target.value), placeholder: "Ex: 1", className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: calculateCRI, className: "bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors w-full", children: "Calcular" }),
      result && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-4 p-4 bg-teal-50 border border-teal-200 rounded-md font-semibold text-center", children: result })
    ] });
  };
  var DogAcuteGuideContent = ({ onInfoClick }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuideSection, { title: "Princ\xC3\xADpios de Analgesia de Resgate em C\xC3\xA3es", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "C\xC3\xA3es geralmente toleram bem uma variedade de analg\xC3\xA9sicos. A abordagem multimodal \xC3\xA9 o padr\xC3\xA3o-ouro, combinando f\xC3\xA1rmacos que atuam em diferentes pontos da via da dor para maximizar a efic\xC3\xA1cia e minimizar efeitos adversos. A avalia\xC3\xA7\xC3\xA3o da fun\xC3\xA7\xC3\xA3o renal e hep\xC3\xA1tica antes de iniciar a terapia, especialmente com AINEs, \xC3\xA9 crucial." }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Classes de F\xC3\xA1rmacos e Doses para Dor Aguda", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mb-2", children: "Opioides" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
        "A base para dor moderada a severa.",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Mecanismo dos Opioides", content: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Opioides atuam ligando-se a receptores espec\xC3\xADficos (\xCE\xBC, \xCE\xBA, \xCE\xB4) no c\xC3\xA9rebro e medula espinhal, inibindo a transmiss\xC3\xA3o e percep\xC3\xA7\xC3\xA3o dos sinais de dor. Agonistas puros (morfina, metadona) t\xC3\xAAm alta afinidade e efic\xC3\xA1cia nos receptores \xCE\xBC, provendo analgesia potente." }), onInfoClick })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Metadona:" }),
          " 0.2-0.5 mg/kg IV, IM, SC a cada 4-6h."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Hidromorfona:" }),
          " 0.05-0.1 mg/kg IV, IM, SC a cada 4-6h."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Morfina:" }),
          " 0.2-0.5 mg/kg IM, SC a cada 4-6h."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Buprenorfina:" }),
          " 0.01-0.02 mg/kg IV, IM, OTM a cada 6-8h (para dor leve a moderada)."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "mt-4 font-semibold text-red-700", children: [
        "Complica\xC3\xA7\xC3\xB5es Comuns:",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Complica\xC3\xA7\xC3\xB5es de Opioides", content: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Os principais efeitos adversos incluem seda\xC3\xA7\xC3\xA3o, depress\xC3\xA3o respirat\xC3\xB3ria, bradicardia, v\xC3\xB4mito (especialmente morfina) e constipa\xC3\xA7\xC3\xA3o. A monitoriza\xC3\xA7\xC3\xA3o da frequ\xC3\xAAncia respirat\xC3\xB3ria e card\xC3\xADaca \xC3\xA9 essencial. O v\xC3\xB4mito pode ser mitigado com antiem\xC3\xA9ticos como o maropitant." }) }), onInfoClick })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "Anti-inflamat\xC3\xB3rios N\xC3\xA3o Esteroidais (AINEs)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
        "Excelentes para dor inflamat\xC3\xB3ria, especialmente em quadros ortop\xC3\xA9dicos e p\xC3\xB3s-operat\xC3\xB3rios.",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Mecanismo e Riscos dos AINEs", content: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "AINEs inibem as enzimas COX, reduzindo a produ\xC3\xA7\xC3\xA3o de prostaglandinas inflamat\xC3\xB3rias. No entanto, prostaglandinas mediadas pela COX-1 s\xC3\xA3o vitais para a prote\xC3\xA7\xC3\xA3o da mucosa g\xC3\xA1strica e para o fluxo sangu\xC3\xADneo renal. A inibi\xC3\xA7\xC3\xA3o da COX-1 \xC3\xA9 a principal causa dos efeitos adversos gastrointestinais e renais." }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Sempre use a menor dose eficaz pelo menor tempo poss\xC3\xADvel. Garanta que o paciente esteja hidratado e normotenso." })
        ] }), onInfoClick })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Carprofeno:" }),
          " 4.4 mg/kg SID ou 2.2 mg/kg BID, PO, SC."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Meloxicam:" }),
          " 0.2 mg/kg no primeiro dia, seguido de 0.1 mg/kg SID, PO, SC."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Robenacoxib:" }),
          " 1-2 mg/kg SID, PO."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "Analg\xC3\xA9sicos Adjuvantes" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "\xC3\u0161teis para dor cr\xC3\xB4nica, neurop\xC3\xA1tica ou para potencializar outros analg\xC3\xA9sicos." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Gabapentina:" }),
          " 10-20 mg/kg BID ou TID, PO. Essencial para dor neurop\xC3\xA1tica."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Cetamina:" }),
          " Usada em CRI para prevenir sensibiliza\xC3\xA7\xC3\xA3o central.",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Cetamina e Sensibiliza\xC3\xA7\xC3\xA3o Central", content: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: 'A dor intensa e persistente pode levar a uma hipersensibilidade do sistema nervoso (sensibiliza\xC3\xA7\xC3\xA3o central), mediada por receptores NMDA. A cetamina, como antagonista NMDA, bloqueia esse processo, "resetando" o sistema e tornando os opioides mais eficazes.' }), onInfoClick })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Infus\xC3\xA3o Cont\xC3\xADnua (CRI) em C\xC3\xA3es", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "A CRI fornece um n\xC3\xADvel de analgesia constante e est\xC3\xA1vel, ideal para dor severa e trans-operat\xC3\xB3ria. Permite reduzir a dose de anest\xC3\xA9sicos inalat\xC3\xB3rios (efeito poupador de MAC)." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CRICalculator, { species: "dog" /* Dog */, onInfoClick })
    ] })
  ] });
  var DogChronicGuideContent = ({ onInfoClick }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Princ\xC3\xADpios do Manejo da Dor Cr\xC3\xB4nica em Casa", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "O manejo da dor cr\xC3\xB4nica, como na osteoartrite, \xC3\xA9 um compromisso de longo prazo que visa melhorar a qualidade de vida. A abordagem deve ser multimodal, combinando f\xC3\xA1rmacos, suplementos, modifica\xC3\xA7\xC3\xB5es ambientais e controle de peso." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-semibold text-teal-800", children: "O objetivo n\xC3\xA3o \xC3\xA9 a aus\xC3\xAAncia total de dor, mas sim a funcionalidade e o conforto do animal. O monitoramento cont\xC3\xADnuo pelo tutor, com ferramentas como o CBPI, \xC3\xA9 fundamental." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Terapia Farmacol\xC3\xB3gica (Requer Prescri\xC3\xA7\xC3\xA3o Veterin\xC3\xA1ria)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-800", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-bold", children: "Aten\xC3\xA7\xC3\xA3o!" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Todos os medicamentos listados abaixo exigem prescri\xC3\xA7\xC3\xA3o e acompanhamento de um m\xC3\xA9dico veterin\xC3\xA1rio. A automedica\xC3\xA7\xC3\xA3o \xC3\xA9 perigosa." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "1. Anti-inflamat\xC3\xB3rios N\xC3\xA3o Esteroidais (AINEs)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "S\xC3\xA3o a base do tratamento para dor de osteoartrite. \xC3\u2030 crucial o monitoramento da fun\xC3\xA7\xC3\xA3o renal e hep\xC3\xA1tica." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Carprofeno:" }),
          " 4.4 mg/kg SID ou 2.2 mg/kg BID, PO."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Meloxicam:" }),
          " 0.1 mg/kg SID, PO (ap\xC3\xB3s dose de ataque de 0.2 mg/kg)."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Grapiprant (Galliprant\xC2\xAE):" }),
          " 2 mg/kg SID, PO. Atua em um receptor espec\xC3\xADfico da dor (EP4), poupando as vias da COX."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Robenacoxib:" }),
          " 1-2 mg/kg SID, PO."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-3 p-3 bg-red-100 text-red-900 border border-red-300 rounded-md text-sm font-bold", children: "NUNCA associe AINEs com Corticosteroides. Risco alt\xC3\xADssimo de ulcera\xC3\xA7\xC3\xA3o gastrointestinal." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "2. Neuromoduladores e Outros Analg\xC3\xA9sicos" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Essenciais para dor neurop\xC3\xA1tica ou quando os AINEs s\xC3\xA3o insuficientes ou contraindicados." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Gabapentina:" }),
          " 10-20 mg/kg, a cada 8-12h, PO. Analg\xC3\xA9sico e ansiol\xC3\xADtico."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Pregabalina:" }),
          " 2-4 mg/kg, a cada 12h, PO. Mais potente que a gabapentina."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Amantadina:" }),
          " 3-5 mg/kg, a cada 12-24h, PO. Ajuda a combater a sensibiliza\xC3\xA7\xC3\xA3o central (wind-up)."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Trazodona:" }),
          " 3-7 mg/kg, a cada 8-12h, PO. \xC3\u0161til para ansiedade e agita\xC3\xA7\xC3\xA3o que podem exacerbar a dor."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "3. Corticosteroides" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Usados com cautela para crises inflamat\xC3\xB3rias severas, quando AINEs n\xC3\xA3o s\xC3\xA3o uma op\xC3\xA7\xC3\xA3o. O uso cr\xC3\xB4nico deve ser evitado." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { className: "list-disc ml-6 space-y-1", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Prednisona/Prednisolona:" }),
        " 0.5-1 mg/kg SID, PO, com desmame gradual."
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Suplementos e Terapias Adjuvantes", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "Condroprotetores e Nutrac\xC3\xAAuticos" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Ajudam a dar suporte \xC3\xA0 sa\xC3\xBAde articular, embora a evid\xC3\xAAncia de efic\xC3\xA1cia analg\xC3\xA9sica varie." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Glicosaminoglicanos (GAGs):" }),
          " Glicosamina e Condroitina."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "\xC3\x81cidos Graxos \xC3\u201Dmega-3 (EPA/DHA):" }),
          " A\xC3\xA7\xC3\xA3o anti-inflamat\xC3\xB3ria natural. Encontrado em \xC3\xB3leo de peixe."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Col\xC3\xA1geno n\xC3\xA3o desnaturado tipo II (UC-II):" }),
          " Ajuda a modular a resposta imune na articula\xC3\xA7\xC3\xA3o."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "Manejo N\xC3\xA3o Farmacol\xC3\xB3gico" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Controle de Peso:" }),
          " O passo mais importante. Perder peso reduz drasticamente a carga sobre as articula\xC3\xA7\xC3\xB5es."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Fisioterapia e Exerc\xC3\xADcios de Baixo Impacto:" }),
          " Nata\xC3\xA7\xC3\xA3o e caminhadas controladas fortalecem a musculatura de suporte."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Modifica\xC3\xA7\xC3\xB5es Ambientais:" }),
          " Rampas, escadas para m\xC3\xB3veis e pisos antiderrapantes."
        ] })
      ] })
    ] })
  ] });
  var CatAcuteGuideContent = ({ onInfoClick }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuideSection, { title: "Princ\xC3\xADpios de Analgesia de Resgate em Gatos", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
      "O manejo da dor em gatos requer aten\xC3\xA7\xC3\xA3o especial due \xC3\xA0s suas particularidades metab\xC3\xB3licas.",
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Metabolismo Felino", content: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Gatos possuem uma defici\xC3\xAAncia na via de conjuga\xC3\xA7\xC3\xA3o hep\xC3\xA1tica por glicuronida\xC3\xA7\xC3\xA3o. Esta \xC3\xA9 uma via metab\xC3\xB3lica crucial para a elimina\xC3\xA7\xC3\xA3o de muitos f\xC3\xA1rmacos, incluindo AINEs e paracetamol (que \xC3\xA9 altamente t\xC3\xB3xico)." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Essa defici\xC3\xAAncia resulta em uma meia-vida prolongada para muitos medicamentos, aumentando o risco de toxicidade se as doses e intervalos n\xC3\xA3o forem estritamente ajustados para a esp\xC3\xA9cie." })
      ] }), onInfoClick }),
      "A analgesia multimodal \xC3\xA9 vital, mas a sele\xC3\xA7\xC3\xA3o de f\xC3\xA1rmacos e doses deve ser extremamente cuidadosa. A avalia\xC3\xA7\xC3\xA3o da fun\xC3\xA7\xC3\xA3o renal \xC3\xA9 mandat\xC3\xB3ria antes do uso de AINEs."
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Classes de F\xC3\xA1rmacos e Doses para Dor Aguda", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mb-2", children: "Opioides" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Seguros e eficazes em gatos. A buprenorfina \xC3\xA9 uma excelente op\xC3\xA7\xC3\xA3o para dor leve a moderada." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Buprenorfina:" }),
          " 0.02-0.04 mg/kg IV, IM, TMO a cada 6-8h. A via transmucosa oral (TMO) \xC3\xA9 muito eficaz."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Metadona:" }),
          " 0.2-0.4 mg/kg IV, IM a cada 4-6h. Boa escolha para dor severa."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Hidromorfona:" }),
          " 0.025-0.05 mg/kg IV, IM a cada 4-6h. Monitorar para hipertermia.",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Hipertermia por Opioides em Gatos", content: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Gatos podem desenvolver hipertermia (aumento da temperatura corporal) como um efeito adverso idiossincr\xC3\xA1tico a certos opioides, especialmente a hidromorfona. O mecanismo n\xC3\xA3o \xC3\xA9 totalmente elucidado, mas parece envolver a modula\xC3\xA7\xC3\xA3o dos centros termorregulat\xC3\xB3rios no hipot\xC3\xA1lamo. A monitoriza\xC3\xA7\xC3\xA3o da temperatura \xC3\xA9 crucial por v\xC3\xA1rias horas ap\xC3\xB3s a administra\xC3\xA7\xC3\xA3o." }), onInfoClick })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "Anti-inflamat\xC3\xB3rios N\xC3\xA3o Esteroidais (AINEs)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Usar com extrema cautela e apenas f\xC3\xA1rmacos licenciados para a esp\xC3\xA9cie." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Meloxicam:" }),
          " Dose \xC3\xBAnica de 0.2-0.3 mg/kg SC, ou 0.1 mg/kg PO SID por poucos dias."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Robenacoxib:" }),
          " 1-2 mg/kg SID PO ou SC, por no m\xC3\xA1ximo 3-6 dias."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "mt-4 font-semibold text-red-700", children: [
        "Riscos em Gatos:",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: "Riscos de AINEs em Gatos", content: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Due ao seu metabolismo e alta preval\xC3\xAAncia de doen\xC3\xA7a renal cr\xC3\xB4nica subcl\xC3\xADnica, os gatos s\xC3\xA3o mais suscet\xC3\xADveis \xC3\xA0 toxicidade renal e gastrointestinal dos AINEs. O uso deve ser de curto prazo, com a menor dose eficaz, e apenas em pacientes h\xC3\xADgidos, normotensos e bem hidratados. A triagem com exames de sangue \xC3\xA9 fortemente recomendada." }) }), onInfoClick })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "Analg\xC3\xA9sicos Adjuvantes" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Essenciais para o manejo multimodal, especialmente em dor cr\xC3\xB4nica." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Gabapentina:" }),
          " 10-20 mg/kg (ou 50-100 mg/gato) BID ou TID, PO. Excelente para dor cr\xC3\xB4nica e para reduzir estresse pr\xC3\xA9-visita."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Maropitant:" }),
          " 1 mg/kg SC, IV, SID. Al\xC3\xA9m de antiem\xC3\xA9tico, possui propriedades analg\xC3\xA9sicas viscerais."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Infus\xC3\xA3o Cont\xC3\xADnua (CRI) em Gatos", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Uma ferramenta poderosa, mas que exige precis\xC3\xA3o. A lidoca\xC3\xADna sist\xC3\xAAmica deve ser evitada ou usada com extrema cautela e monitoramento intensivo, pois os gatos s\xC3\xA3o muito sens\xC3\xADveis \xC3\xA0 sua toxicidade cardiovascular." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CRICalculator, { species: "cat" /* Cat */, onInfoClick })
    ] })
  ] });
  var CatChronicGuideContent = ({ onInfoClick }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuideSection, { title: "Particularidades do Manejo da Dor Cr\xC3\xB4nica Felina", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Gatos s\xC3\xA3o mestres em esconder a dor cr\xC3\xB4nica. Mudan\xC3\xA7as sutis de comportamento, como relut\xC3\xA2ncia em pular, menor intera\xC3\xA7\xC3\xA3o e higiene diminu\xC3\xADda, s\xC3\xA3o sinais importantes. A abordagem deve ser gentil e focada no bem-estar e enriquecimento ambiental." }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Terapia Farmacol\xC3\xB3gica (Requer Prescri\xC3\xA7\xC3\xA3o Veterin\xC3\xA1ria)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-800", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-bold", children: "Aten\xC3\xA7\xC3\xA3o!" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Todos os medicamentos listados abaixo exigem prescri\xC3\xA7\xC3\xA3o e acompanhamento de um m\xC3\xA9dico veterin\xC3\xA1rio. A automedica\xC3\xA7\xC3\xA3o \xC3\xA9 perigosa e pode ser fatal para gatos." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "1. Anticorpo Monoclonal - A Revolu\xC3\xA7\xC3\xA3o no Manejo" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "A terapia mais moderna e segura para dor de osteoartrite em gatos." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { className: "list-disc ml-6 space-y-1", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Frunevetmab (Solensia\xC2\xAE):" }),
        " 2.8 mg/kg, SC, a cada 28 dias. Atua bloqueando o Fator de Crescimento Neural (NGF), um mediador chave da dor. \xC3\u2030 altamente espec\xC3\xADfico e tem perfil de seguran\xC3\xA7a excelente."
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "2. Anti-inflamat\xC3\xB3rios N\xC3\xA3o Esteroidais (AINEs)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Uso criterioso e de curto prazo, apenas em pacientes selecionados e monitorados." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Robenacoxib:" }),
          " 1-2 mg/kg SID, PO, por no m\xC3\xA1ximo 6 dias."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Meloxicam:" }),
          " Uso controverso para longo prazo. Doses muito baixas (ex: 0.01-0.03 mg/kg SID) podem ser consideradas por um especialista."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "3. Neuromoduladores e Outros Analg\xC3\xA9sicos" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Gabapentina:" }),
          " 10-20 mg/kg (ou 50-100 mg/gato), a cada 8-12h, PO. Pe\xC3\xA7a-chave no manejo da dor cr\xC3\xB4nica, especialmente a de origem neurop\xC3\xA1tica. Tamb\xC3\xA9m ajuda a reduzir a ansiedade associada \xC3\xA0 dor."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Trazodona:" }),
          " 5-10 mg/kg (ou ~50mg/gato), a cada 12-24h, PO. \xC3\u0161til para o componente de ansiedade da dor cr\xC3\xB4nica e para facilitar o manejo do paciente, especialmente em gatos mais reativos."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Amantadina:" }),
          " 3-5 mg/kg SID, PO. Para sensibiliza\xC3\xA7\xC3\xA3o central."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Buprenorfina:" }),
          " 0.02-0.04 mg/kg, a cada 8-12h, via transmucosa oral. \xC3\u201Ctima op\xC3\xA7\xC3\xA3o para o tutor administrar em casa para picos de dor."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GuideSection, { title: "Suplementos e Manejo Ambiental", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "Nutrac\xC3\xAAuticos e Suplementos" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Glicosamina / Condroitina:" }),
          " Podem oferecer suporte articular."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "\xC3\u201Dmega-3 (EPA/DHA):" }),
          " A\xC3\xA7\xC3\xA3o anti-inflamat\xC3\xB3ria. Prefira formula\xC3\xA7\xC3\xB5es l\xC3\xADquidas ou palat\xC3\xA1veis para gatos."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children: "Enriquecimento Ambiental e F\xC3\xADsico" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Acessibilidade:" }),
          " Escadas ou rampas para locais altos, caixas de areia com bordas baixas."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Conforto:" }),
          " Camas macias e aquecidas."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-semibold", children: "Atividade Leve:" }),
          " Brincadeiras com varinhas para estimular movimento sem impacto."
        ] })
      ] })
    ] })
  ] });
  var GuideScreen = ({ onBack, onHome, setModal, initialPainType }) => {
    const [context, setContext] = (0, import_react3.useState)(initialPainType);
    const [selectedSpecies, setSelectedSpecies] = (0, import_react3.useState)(null);
    const handleBackToContext = () => {
      setSelectedSpecies(null);
      if (initialPainType === null) {
        setContext(null);
      }
    };
    if (!context) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: "Guias de Manejo da Dor", onBack, onHome }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex flex-col items-center justify-center p-4", style: { minHeight: "calc(100vh - 80px)" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "w-full max-w-lg text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-3xl font-bold text-slate-700 mb-8", children: "Qual o Contexto Cl\xC3\xADnico?" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { className: "hover:shadow-2xl hover:-translate-y-1 transition-all duration-300", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setContext("acute" /* Acute */), className: "p-8 w-full h-full text-left flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-2xl font-bold text-teal-700", children: "Resgate Analg\xC3\xA9sico" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-600 mt-2 flex-grow", children: "Protocolos para dor aguda, p\xC3\xB3s-operat\xC3\xB3rio e uso hospitalar, incluindo calculadoras de CRI." })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { className: "hover:shadow-2xl hover:-translate-y-1 transition-all duration-300", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setContext("chronic" /* Chronic */), className: "p-8 w-full h-full text-left flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-2xl font-bold text-teal-700", children: "Manejo da Dor Cr\xC3\xB4nica" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-600 mt-2 flex-grow", children: "Estrat\xC3\xA9gias e f\xC3\xA1rmacos para o tratamento domiciliar de longo prazo (ex: osteoartrite)." })
            ] }) })
          ] })
        ] }) })
      ] });
    }
    if (!selectedSpecies) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: `Guia: ${context === "acute" /* Acute */ ? "Resgate Analg\xC3\xA9sico" : "Dor Cr\xC3\xB4nica"}`, onBack: handleBackToContext, onHome }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex flex-col items-center justify-center p-4", style: { minHeight: "calc(100vh - 80px)" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "w-full max-w-md text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-3xl font-bold text-slate-700 mb-8", children: "Para Qual Esp\xC3\xA9cie?" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setSelectedSpecies("dog" /* Dog */), className: "group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-48", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mb-2 rounded-2xl bg-teal-500/15 p-4 text-teal-700 transition-transform duration-300 group-hover:scale-110", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Dog, { className: "h-12 w-12", "aria-hidden": true }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-2xl font-semibold text-slate-800", children: "C\xE3o" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setSelectedSpecies("cat" /* Cat */), className: "group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-48", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "mb-2 rounded-2xl bg-teal-500/15 p-4 text-teal-700 transition-transform duration-300 group-hover:scale-110", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Cat, { className: "h-12 w-12", "aria-hidden": true }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-2xl font-semibold text-slate-800", children: "Gato" })
            ] })
          ] })
        ] }) })
      ] });
    }
    const speciesName = selectedSpecies === "dog" /* Dog */ ? "C\xC3\xA3es" : "Gatos";
    const contextName = context === "acute" /* Acute */ ? "Resgate Analg\xC3\xA9sico" : "Dor Cr\xC3\xB4nica";
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: `${contextName} para ${speciesName}`, onBack: () => setSelectedSpecies(null), onHome }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("main", { className: "p-4 md:p-8", children: [
        context === "acute" /* Acute */ && selectedSpecies === "dog" /* Dog */ && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DogAcuteGuideContent, { onInfoClick: setModal }),
        context === "acute" /* Acute */ && selectedSpecies === "cat" /* Cat */ && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CatAcuteGuideContent, { onInfoClick: setModal }),
        context === "chronic" /* Chronic */ && selectedSpecies === "dog" /* Dog */ && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DogChronicGuideContent, { onInfoClick: setModal }),
        context === "chronic" /* Chronic */ && selectedSpecies === "cat" /* Cat */ && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CatChronicGuideContent, { onInfoClick: setModal })
      ] })
    ] });
  };
  var SectionTitle = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-3xl font-bold text-slate-800 mt-10 mb-4 border-b-2 border-teal-500 pb-2", children });
  var SubSectionTitle = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-2xl font-semibold text-slate-700 mt-8 mb-3", children });
  var SubSubSectionTitle = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "text-xl font-semibold text-teal-800 mt-6 mb-2", children });
  var Paragraph = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700 leading-relaxed mb-4", children });
  var Bold = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { className: "font-semibold text-slate-800", children });
  var GuidelineTable = ({ headers, rows }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "overflow-x-auto my-6", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { className: "min-w-full text-sm border border-slate-300", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { className: "bg-slate-100", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tr", { children: headers.map((header, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { className: "px-4 py-3 font-semibold text-left border-b border-slate-300", children: header }, i)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { className: "bg-white", children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tr", { className: "border-b border-slate-200 last:border-0 hover:bg-slate-50", children: row.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { className: "px-4 py-3 align-top", dangerouslySetInnerHTML: { __html: cell } }, j)) }, i)) })
  ] }) });
  var ClinicalGuidelinesScreen = ({ onBack }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: "Diretrizes Cl\xC3\xADnicas", onBack, onHome: onBack }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("main", { className: "p-4 md:p-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: "text-4xl font-extrabold text-teal-700 text-center mb-6", children: "Diretrizes Cl\xC3\xADnicas para o Manejo da Dor em C\xC3\xA3es e Gatos" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-center text-slate-600 mb-10 italic", children: "Uma Base Farmacol\xC3\xB3gica e Estrat\xC3\xA9gica para Aplica\xC3\xA7\xC3\xB5es de Suporte \xC3\xA0 Decis\xC3\xA3o Cl\xC3\xADnica" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "Se\xC3\xA7\xC3\xA3o 1: Princ\xC3\xADpios Fundamentais" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSectionTitle, { children: "1.1. O Imperativo do Reconhecimento da Dor" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Paragraph, { children: 'O manejo da dor \xC3\xA9 um pilar fundamental da medicina veterin\xC3\xA1ria moderna. A dor n\xC3\xA3o tratada n\xC3\xA3o \xC3\xA9 apenas uma quest\xC3\xA3o de bem-estar; \xC3\xA9 um estado de doen\xC3\xA7a com consequ\xC3\xAAncias fisiopatol\xC3\xB3gicas significativas, incluindo atraso na cicatriza\xC3\xA7\xC3\xA3o, supress\xC3\xA3o do sistema imunol\xC3\xB3gico e altera\xC3\xA7\xC3\xB5es comportamentais. A considera\xC3\xA7\xC3\xA3o da dor como o "quarto sinal vital" reflete sua import\xC3\xA2ncia crucial no atendimento ao paciente.' }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Paragraph, { children: "A abordagem hist\xC3\xB3rica, baseada na interpreta\xC3\xA7\xC3\xA3o subjetiva, \xC3\xA9 inadequada. A aus\xC3\xAAncia de sinais \xC3\xB3bvios n\xC3\xA3o significa aus\xC3\xAAncia de dor, especialmente em felinos. A medicina baseada em evid\xC3\xAAncias utiliza instrumentos de avalia\xC3\xA7\xC3\xA3o validados para transformar observa\xC3\xA7\xC3\xB5es em dados semi-quantitativos, permitindo uma avalia\xC3\xA7\xC3\xA3o mais objetiva e a monitoriza\xC3\xA7\xC3\xA3o da resposta \xC3\xA0 terapia." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSectionTitle, { children: "1.2. Instrumentos Validados de Avalia\xC3\xA7\xC3\xA3o da Dor" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Paragraph, { children: "A transi\xC3\xA7\xC3\xA3o para uma abordagem estruturada requer o uso de escalas de dor validadas psicometricamente. Essas ferramentas s\xC3\xA3o confi\xC3\xA1veis (resultados consistentes) e v\xC3\xA1lidas (medem de fato a dor). A atribui\xC3\xA7\xC3\xA3o de autoria \xC3\xA9 essencial para a integridade cl\xC3\xADnica." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        GuidelineTable,
        {
          headers: ["Nome da Escala", "Esp\xC3\xA9cie(s)", "Uso Principal", "Autoria Completa e Ano"],
          rows: [
            ["Escala de Dor Composta de Glasgow - Formul\xC3\xA1rio Curto (CMPS-SF)", "C\xC3\xA3es", "Dor Aguda", "J. Reid, A.M. Nolan, J.M.L. Hughes, et al. (2007)"],
            ["Escala de Dor da Universidade de Melbourne (UMPS)", "C\xC3\xA3es", "Dor Aguda", "A. M. Firth & S. L. Haldane (1999)"],
            ["Escala Multidimensional Composta de Dor UNESP-Botucatu (MCPS)", "Gatos", "Dor Aguda", "Juliana T. Brondani, Khursheed R. Mama, Stelio P. L. Luna, et al. (2013)"],
            ["Escala de Express\xC3\xA3o Facial Felina (FGS)", "Gatos", "Dor Aguda", "Marina C. Evangelista, Ryota Watanabe, Vivian S. Y. Leung, et al. (2019)"],
            ["Escala de Dor Aguda Felina da Universidade Estadual do Colorado (CSU-FAPS)", "Gatos", "Dor Aguda", "Hilary Shipley, Alonso Guedes, Lynelle Graham, et al. (2019/2021)"],
            ["Medidas de Resultado Espec\xC3\xADficas do Cliente (CSOM)", "C\xC3\xA3es, Gatos", "Dor Cr\xC3\xB4nica", "Adaptado para gatos por B. Duncan X. Lascelles et al. (2007)"]
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSectionTitle, { children: "1.3. Integrando Escores de Dor no Fluxo de Trabalho Cl\xC3\xADnico" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Paragraph, { children: 'A utilidade de um escore de dor reside na sua capacidade de guiar a a\xC3\xA7\xC3\xA3o terap\xC3\xAAutica atrav\xC3\xA9s de um "limiar de interven\xC3\xA7\xC3\xA3o analg\xC3\xA9sica". Este valor de corte transforma a avalia\xC3\xA7\xC3\xA3o em um componente ativo do manejo do paciente.' }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Paragraph, { children: "Exemplos de limiares:" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 mb-4 space-y-1 text-slate-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "CMPS-SF (C\xC3\xA3es):" }),
          " \xE2\u2030\xA56/24 (ou \xE2\u2030\xA55/20 sem mobilidade)."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Feline Grimace Scale (FGS):" }),
          " \xE2\u2030\xA54/10."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "UNESP-Botucatu (UCAPS):" }),
          " \xE2\u2030\xA54/12."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Paragraph, { children: [
        "A aplica\xC3\xA7\xC3\xA3o desses limiares estabelece um ciclo de feedback essencial: ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Avaliar \xE2\u2020\u2019 Intervir \xE2\u2020\u2019 Reavaliar" }),
        ". Este processo din\xC3\xA2mico garante que a analgesia seja adaptada \xC3\xA0s necessidades individuais, melhorando significativamente os resultados e o bem-estar."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "Se\xC3\xA7\xC3\xA3o 2: A Base Fisiol\xC3\xB3gica e Farmacol\xC3\xB3gica" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSectionTitle, { children: "2.1. A Via Nociceptiva: Uma Jornada em Quatro Est\xC3\xA1gios" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Paragraph, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Transdu\xC3\xA7\xC3\xA3o:" }),
        " Convers\xC3\xA3o de um est\xC3\xADmulo nocivo em sinal el\xC3\xA9trico nos nociceptores."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Paragraph, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Transmiss\xC3\xA3o:" }),
        " Condu\xC3\xA7\xC3\xA3o do sinal ao longo das fibras nervosas at\xC3\xA9 a medula espinhal."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Paragraph, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Modula\xC3\xA7\xC3\xA3o:" }),
        " Amplifica\xC3\xA7\xC3\xA3o ou supress\xC3\xA3o do sinal na medula espinhal."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Paragraph, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Percep\xC3\xA7\xC3\xA3o:" }),
        " Processamento do sinal no c\xC3\xA9rebro como a experi\xC3\xAAncia consciente da dor."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSectionTitle, { children: "2.2. Classes de F\xC3\xA1rmacos e Seus Alvos" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Paragraph, { children: "A analgesia multimodal utiliza diferentes classes de f\xC3\xA1rmacos para intervir em m\xC3\xBAltiplos pontos ao longo da via da dor." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc ml-6 mb-4 space-y-2 text-slate-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "AINEs:" }),
          " Alvo na ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Transdu\xC3\xA7\xC3\xA3o" }),
          ", inibindo as prostaglandinas no local da les\xC3\xA3o."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Anest\xC3\xA9sicos Locais:" }),
          " Alvo na ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Transmiss\xC3\xA3o" }),
          ", bloqueando os canais de s\xC3\xB3dio nos nervos."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Opioides:" }),
          " Alvo na ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Modula\xC3\xA7\xC3\xA3o e Percep\xC3\xA7\xC3\xA3o" }),
          ", atuando em receptores no SNC."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Agonistas \xCE\xB12-Adren\xC3\xA9rgicos:" }),
          " Alvo na ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Modula\xC3\xA7\xC3\xA3o e Percep\xC3\xA7\xC3\xA3o" }),
          ", inibindo a libera\xC3\xA7\xC3\xA3o de neurotransmissores."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Antagonistas do Receptor NMDA (Cetamina):" }),
          " Alvo na ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Modula\xC3\xA7\xC3\xA3o" }),
          ", prevenindo a sensibiliza\xC3\xA7\xC3\xA3o central."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Gabapentinoides:" }),
          " Alvo na ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Modula\xC3\xA7\xC3\xA3o" }),
          ", reduzindo a libera\xC3\xA7\xC3\xA3o de neurotransmissores excitat\xC3\xB3rios."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "Se\xC3\xA7\xC3\xA3o 3: Formul\xC3\xA1rios de Analgesia para Caninos" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSubSectionTitle, { children: "Fase 1: Analgesia Pr\xC3\xA9-emptiva" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidelineTable, { headers: ["N\xC3\xADvel de Dor", "F\xC3\xA1rmaco", "Dose"], rows: [
        ["Leve a Moderado", "Butorfanol<br>Buprenorfina<br>Carprofeno/Meloxicam", "0.2-0.4 mg/kg<br>0.01-0.02 mg/kg<br>Doses padr\xC3\xA3o"],
        ["Moderado a Severo", "Metadona<br>Hidromorfona<br>Morfina<br>Dexmedetomidina (Adjuvante)<br>Gabapentina (Adjuvante)", "0.2-0.5 mg/kg<br>0.05-0.1 mg/kg<br>0.3-0.5 mg/kg<br>1-5 \xC2\xB5g/kg<br>10-20 mg/kg"]
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSubSectionTitle, { children: "Fase 2: Manuten\xC3\xA7\xC3\xA3o Intraoperat\xC3\xB3ria (ITC)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidelineTable, { headers: ["T\xC3\xA9cnica", "F\xC3\xA1rmaco(s)", "Taxa de Infus\xC3\xA3o"], rows: [
        ["ITC de Opioide", "Fentanil<br>Remifentanil", "3-10 \xC2\xB5g/kg/hora<br>6-18 \xC2\xB5g/kg/hora"],
        ["ITC Multimodal (FLK)", "Fentanil + Lidoca\xC3\xADna + Cetamina", "Doses vari\xC3\xA1veis (ver texto completo)"],
        ["Bloqueios Regionais", "Bupivaca\xC3\xADna 0.5%<br>Ropivaca\xC3\xADna 0.5%", "Dose m\xC3\xA1xima total: 2 mg/kg<br>Dose m\xC3\xA1xima total: 3 mg/kg"]
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSubSectionTitle, { children: "Fase 4: Protocolos de Resgate Analg\xC3\xA9sico" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidelineTable, { headers: ["Cen\xC3\xA1rio Cl\xC3\xADnico", "A\xC3\xA7\xC3\xA3o de Resgate Recomendada"], rows: [
        ["Paciente em AINE apenas", "Adicionar Buprenorfina (leve/mod) ou Metadona (mod/severo)."],
        ["Paciente em Buprenorfina", "Escalonar para um agonista \xC2\xB5 puro (Metadona/Hidromorfona)."],
        ["Paciente em Agonista \xC2\xB5 Puro", "Re-dosar agonista ou adicionar ITC de Cetamina para dor refrat\xC3\xA1ria."],
        ["Dor Neurop\xC3\xA1tica/Ortop\xC3\xA9dica", "Adicionar Gabapentina ou ITC de Lidoca\xC3\xADna."]
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { children: "Se\xC3\xA7\xC3\xA3o 4: Formul\xC3\xA1rios de Analgesia para Felinos" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSubSectionTitle, { children: "Fase 1: Analgesia Pr\xC3\xA9-emptiva" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidelineTable, { headers: ["N\xC3\xADvel de Dor", "F\xC3\xA1rmaco", "Dose"], rows: [
        ["Leve a Moderado", "Buprenorfina<br>Butorfanol<br>Meloxicam/Robenacoxib", "0.02-0.04 mg/kg<br>0.2-0.4 mg/kg<br>Doses padr\xC3\xA3o"],
        ["Moderado a Severo", "Metadona<br>Hidromorfona<br>Dexmedetomidina (Adjuvante)<br>Gabapentina (Adjuvante)", "0.3-0.5 mg/kg<br>0.025-0.05 mg/kg<br>2-5 \xC2\xB5g/kg<br>10-20 mg/kg"]
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSubSectionTitle, { children: "Fase 2: Manuten\xC3\xA7\xC3\xA3o Intraoperat\xC3\xB3ria (ITC)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidelineTable, { headers: ["T\xC3\xA9cnica", "F\xC3\xA1rmaco(s)", "Notas Cl\xC3\xADnicas"], rows: [
        ["ITC de Opioide", "Fentanil<br>Remifentanil", "Monitorar depress\xC3\xA3o respirat\xC3\xB3ria.<br>Ideal para pacientes cr\xC3\xADticos."],
        ["ITC Multimodal (MLK/FLK)", "Metadona/Fentanil + Lidoca\xC3\xADna + Cetamina", "USAR LIDOCA\xC3\x8DNA COM EXTREMA CAUTELA EM GATOS."],
        ["Bloqueios Regionais", "Bupivaca\xC3\xADna 0.5%", "Dose m\xC3\xA1xima total: 1.5 mg/kg. Risco de toxicidade."]
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SubSubSectionTitle, { children: "Fase 4: Protocolos de Resgate Analg\xC3\xA9sico" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuidelineTable, { headers: ["Cen\xC3\xA1rio Cl\xC3\xADnico", "A\xC3\xA7\xC3\xA3o de Resgate Recomendada"], rows: [
        ["Paciente em AINE apenas", "Adicionar Buprenorfina (leve/mod) ou Metadona (mod/severo)."],
        ["Paciente em Buprenorfina", "Escalonar para Metadona; pode ser desafiador."],
        ["Paciente em Agonista \xC2\xB5 Puro", 'Re-dosar Metadona ou adicionar "microdose" de Dexmedetomidina (1-2 \xC2\xB5g/kg IM).'],
        ["Dor Neurop\xC3\xA1tica", "Adicionar Gabapentina."]
      ] })
    ] }) })
  ] });
  var CalculatorScreen = ({ onBack, onHome, onInfoClick }) => {
    const [species, setSpecies] = (0, import_react3.useState)(null);
    const [weight, setWeight] = (0, import_react3.useState)("");
    const [ageGroup, setAgeGroup] = (0, import_react3.useState)("adult");
    const [comorbidities, setComorbidities] = (0, import_react3.useState)({
      liver: false,
      kidney: false,
      heart: false,
      gastro: false
    });
    const [selectedDrugId, setSelectedDrugId] = (0, import_react3.useState)("");
    const [selectedPresentationId, setSelectedPresentationId] = (0, import_react3.useState)("");
    const [selectedDose, setSelectedDose] = (0, import_react3.useState)(0);
    const availableDrugs = (0, import_react3.useMemo)(() => {
      if (!species) return [];
      return DRUG_DATA.filter((d) => d.species.includes(species));
    }, [species]);
    const selectedDrug = (0, import_react3.useMemo)(() => {
      return DRUG_DATA.find((d) => d.id === selectedDrugId);
    }, [selectedDrugId]);
    const selectedPresentation = (0, import_react3.useMemo)(() => {
      return selectedDrug?.presentations.find((p) => p.id === selectedPresentationId);
    }, [selectedDrug, selectedPresentationId]);
    (0, import_react3.useEffect)(() => {
      setSelectedDrugId("");
      setSelectedPresentationId("");
    }, [species]);
    (0, import_react3.useEffect)(() => {
      if (selectedDrug) {
        setSelectedDose(selectedDrug.doseRange.default);
        if (selectedDrug.presentations.length > 0) {
          setSelectedPresentationId(selectedDrug.presentations[0].id);
        } else {
          setSelectedPresentationId("");
        }
      }
    }, [selectedDrug]);
    const handleComorbidityChange = (comorbidity) => {
      setComorbidities((prev) => ({ ...prev, [comorbidity]: !prev[comorbidity] }));
    };
    const calculationResult = (0, import_react3.useMemo)(() => {
      const w = parseFloat(weight);
      if (!w || w <= 0 || !selectedDrug || !selectedPresentation) {
        return null;
      }
      const totalMg = w * selectedDose;
      let finalAmount;
      let finalUnit;
      if (selectedPresentation.concentration.unit === "mg/tablet") {
        finalAmount = totalMg / selectedPresentation.concentration.value;
        finalUnit = finalAmount > 1 ? "comprimidos" : "comprimido";
        finalAmount = finalAmount.toFixed(2);
      } else {
        finalAmount = totalMg / selectedPresentation.concentration.value;
        finalUnit = "ml";
        finalAmount = finalAmount.toFixed(2);
      }
      const adjustmentNotes = [];
      if (selectedDrug.adjustmentFactors) {
        const factors = selectedDrug.adjustmentFactors;
        if (ageGroup !== "adult" && factors[ageGroup]) {
          adjustmentNotes.push({ title: `Paciente ${ageGroup === "senior" ? "Idoso" : ageGroup === "puppy_kitten" ? "Filhote" : "Gestante/Lactante"}`, text: factors[ageGroup] });
        }
        Object.entries(comorbidities).forEach(([key, value]) => {
          if (value && factors[key]) {
            const titleMap = { liver: "Hepatopatia", kidney: "Nefropatia", heart: "Cardiopatia", gastro: "Doen\xC3\xA7a Gastrointestinal" };
            adjustmentNotes.push({ title: `Comorbidade: ${titleMap[key]}`, text: factors[key] });
          }
        });
      }
      return {
        totalMg: totalMg.toFixed(2),
        finalAmount,
        finalUnit,
        adjustmentNotes,
        administrationNotes: selectedDrug.administrationNotes
      };
    }, [weight, selectedDose, selectedDrug, selectedPresentation, ageGroup, comorbidities]);
    const comorbidityInfo = {
      kidney: {
        title: "Considera\xC3\xA7\xC3\xB5es para Doen\xC3\xA7a Renal",
        content: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Risco Principal:" }),
            " A maioria dos AINEs pode reduzir o fluxo sangu\xC3\xADneo para os rins, agravando a doen\xC3\xA7a renal existente. Gatos s\xC3\xA3o especialmente sens\xC3\xADveis."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Boas Pr\xC3\xA1ticas:" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc list-inside space-y-1 pl-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Sempre" }),
              " realize exames de sangue (Ureia, Creatinina, SDMA) e urin\xC3\xA1lise antes de iniciar um AINE."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Evite AINEs em pacientes com doen\xC3\xA7a renal inst\xC3\xA1vel ou desidratados." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Opte por analg\xC3\xA9sicos com menor impacto renal, como opioides (Buprenorfina, Metadona), Gabapentina, ou anticorpos monoclonais (Solensia\xC2\xAE para gatos)." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Monitoramento:" }),
            " Reavaliar a fun\xC3\xA7\xC3\xA3o renal e a press\xC3\xA3o arterial 15-30 dias ap\xC3\xB3s iniciar a terapia e, em seguida, a cada 3-6 meses em pacientes cr\xC3\xB4nicos."
          ] })
        ] })
      },
      liver: {
        title: "Considera\xC3\xA7\xC3\xB5es para Doen\xC3\xA7a Hep\xC3\xA1tica",
        content: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Risco Principal:" }),
            " Muitos analg\xC3\xA9sicos, incluindo AINEs e opioides, s\xC3\xA3o metabolizados pelo f\xC3\xADgado. Uma fun\xC3\xA7\xC3\xA3o hep\xC3\xA1tica comprometida pode levar ao ac\xC3\xBAmulo do f\xC3\xA1rmaco e toxicidade."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Boas Pr\xC3\xA1ticas:" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc list-inside space-y-1 pl-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Realize um painel bioqu\xC3\xADmico completo (ALT, AST, FA, GGT, Albumina) antes de iniciar a terapia." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Escolha f\xC3\xA1rmacos com menor metabolismo hep\xC3\xA1tico (ex: Gabapentina, Pregabalina) ou que possam ser dosados com menos frequ\xC3\xAAncia." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Em c\xC3\xA3es, prefira usar Prednisolona em vez de Prednisona, pois a convers\xC3\xA3o ocorre no f\xC3\xADgado." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Reduza a dose ou aumente o intervalo entre as doses para f\xC3\xA1rmacos metabolizados hepaticamente." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Monitoramento:" }),
            " Reavaliar as enzimas hep\xC3\xA1ticas 30 dias ap\xC3\xB3s o in\xC3\xADcio do tratamento e depois periodicamente."
          ] })
        ] })
      },
      heart: {
        title: "Considera\xC3\xA7\xC3\xB5es para Doen\xC3\xA7a Card\xC3\xADaca",
        content: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Risco Principal:" }),
            " AINEs podem causar reten\xC3\xA7\xC3\xA3o de s\xC3\xB3dio e \xC3\xA1gua, o que pode descompensar um paciente com Insufici\xC3\xAAncia Card\xC3\xADaca Congestiva (ICC). Opioides podem causar bradicardia."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Boas Pr\xC3\xA1ticas:" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc list-inside space-y-1 pl-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Use AINEs com extrema cautela em pacientes com ICC. Monitore de perto por sinais de edema ou dificuldade respirat\xC3\xB3ria." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Evite o uso de AINEs em pacientes que recebem altas doses de diur\xC3\xA9ticos (ex: furosemida), pois o risco de les\xC3\xA3o renal aumenta." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Para opioides, use doses mais baixas e monitore a frequ\xC3\xAAncia card\xC3\xADaca. O uso de um anticolin\xC3\xA9rgico pode ser necess\xC3\xA1rio." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Trazodona deve ser usada com muita cautela devido ao risco de arritmias." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Monitoramento:" }),
            " Monitoramento cl\xC3\xADnico da frequ\xC3\xAAncia respirat\xC3\xB3ria em repouso, ausculta card\xC3\xADaca/pulmonar e press\xC3\xA3o arterial."
          ] })
        ] })
      },
      gastro: {
        title: "Considera\xC3\xA7\xC3\xB5es para Doen\xC3\xA7a Gastrointestinal",
        content: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Risco Principal:" }),
            " AINEs inibem prostaglandinas que protegem a mucosa do est\xC3\xB4mago, aumentando o risco de gastrite, \xC3\xBAlceras e sangramento."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Boas Pr\xC3\xA1ticas:" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc list-inside space-y-1 pl-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Contraindicado:" }),
              " N\xC3\xA3o use AINEs em animais com hist\xC3\xB3rico de \xC3\xBAlcera ou sangramento gastrointestinal ativo."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Proibido:" }),
              " Nunca combine AINEs com corticosteroides (ex: Prednisolona). O risco de perfura\xC3\xA7\xC3\xA3o g\xC3\xA1strica \xC3\xA9 alt\xC3\xADssimo."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Administre sempre os AINEs com uma refei\xC3\xA7\xC3\xA3o para minimizar a irrita\xC3\xA7\xC3\xA3o direta." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Considere o uso de AINEs mais seletivos para COX-2 ou alternativas como o Grapiprant." }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Gastroprotetores (ex: omeprazol) podem ser \xC3\xBAteis, mas n\xC3\xA3o eliminam o risco de toxicidade sist\xC3\xAAmica." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bold, { children: "Monitoramento:" }),
            " O tutor deve ser instru\xC3\xADdo a observar sinais como v\xC3\xB4mito, diarreia, fezes escuras (melena) ou perda de apetite e contatar o veterin\xC3\xA1rio imediatamente."
          ] })
        ] })
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Header, { title: "Calculadora de Doses", onBack, onHome }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("main", { className: "p-4 md:p-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-4xl mx-auto space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-2xl font-bold text-slate-800 mb-4 border-b pb-2", children: "1. Dados do Paciente" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Esp\xC3\xA9cie" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex rounded-md shadow-sm", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setSpecies("dog" /* Dog */), className: `px-4 py-2 text-sm font-medium border border-slate-300 rounded-l-md flex-1 ${species === "dog" ? "bg-teal-600 text-white border-teal-600 z-10" : "bg-white text-slate-700 hover:bg-slate-50"}`, children: "\xF0\u0178\x90\xB6 C\xC3\xA3o" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setSpecies("cat" /* Cat */), className: `px-4 py-2 text-sm font-medium border-r border-t border-b border-slate-300 rounded-r-md flex-1 ${species === "cat" ? "bg-teal-600 text-white border-teal-600 z-10" : "bg-white text-slate-700 hover:bg-slate-50"}`, children: "\xF0\u0178\x90\xB1 Gato" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "weight", className: "block text-sm font-medium text-slate-700 mb-1", children: "Peso (kg)" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "number", id: "weight", value: weight, onChange: (e) => setWeight(e.target.value), placeholder: "Ex: 10.5", className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "ageGroup", className: "block text-sm font-medium text-slate-700 mb-1", children: "Faixa Et\xC3\xA1ria" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { id: "ageGroup", value: ageGroup, onChange: (e) => setAgeGroup(e.target.value), className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "adult", children: "Adulto" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "senior", children: "Idoso" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "puppy_kitten", children: "Filhote" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "pregnant_lactating", children: "Gestante / Lactante" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Comorbidades" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex flex-wrap gap-x-4 gap-y-2", children: Object.keys(comorbidities).map((key) => {
                const comorbidityName = { liver: "Hep\xC3\xA1tica", kidney: "Renal", heart: "Card\xC3\xADaca", gastro: "G\xC3\xA1strica" }[key];
                const info = comorbidityInfo[key];
                return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", id: `comorbidity_${key}`, checked: comorbidities[key], onChange: () => handleComorbidityChange(key), className: "h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: `comorbidity_${key}`, className: "text-sm cursor-pointer", children: comorbidityName }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(InfoButton, { title: info.title, content: info.content, onInfoClick })
                ] }, key);
              }) })
            ] })
          ] })
        ] }),
        species && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-2xl font-bold text-slate-800 mb-4 border-b pb-2", children: "2. Sele\xC3\xA7\xC3\xA3o de F\xC3\xA1rmaco e Dose" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "drug", className: "block text-sm font-medium text-slate-700 mb-1", children: "F\xC3\xA1rmaco" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { id: "drug", value: selectedDrugId, onChange: (e) => setSelectedDrugId(e.target.value), className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500", disabled: !species, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", disabled: true, children: "Selecione um f\xC3\xA1rmaco" }),
                availableDrugs.map((drug) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: drug.id, children: drug.name }, drug.id))
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "presentation", className: "block text-sm font-medium text-slate-700 mb-1", children: "Apresenta\xC3\xA7\xC3\xA3o Comercial" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("select", { id: "presentation", value: selectedPresentationId, onChange: (e) => setSelectedPresentationId(e.target.value), className: "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500", disabled: !selectedDrug, children: selectedDrug?.presentations.map((p) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: p.id, children: p.name }, p.id)) })
            ] })
          ] }),
          selectedDrug && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { htmlFor: "dose", className: "block text-sm font-medium text-slate-700 mb-1", children: [
              "Dose (",
              selectedDrug.doseRange.unit,
              ")"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-sm text-slate-600", children: selectedDrug.doseRange.min }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "input",
                {
                  id: "dose",
                  type: "range",
                  min: selectedDrug.doseRange.min,
                  max: selectedDrug.doseRange.max,
                  step: (selectedDrug.doseRange.max - selectedDrug.doseRange.min) / 100,
                  value: selectedDose,
                  onChange: (e) => setSelectedDose(parseFloat(e.target.value)),
                  className: "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-sm text-slate-600", children: selectedDrug.doseRange.max }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-bold text-teal-700 text-lg w-20 text-center", children: selectedDose.toFixed(2) })
            ] })
          ] })
        ] }),
        calculationResult && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Card, { className: "p-6 md:p-8 bg-teal-50 border border-teal-200", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-2xl font-bold text-slate-800 mb-4 border-b pb-2", children: "3. Resultado" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-600", children: "Dose Total Calculada" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-3xl font-extrabold text-teal-700 my-1", children: [
              calculationResult.totalMg,
              " mg"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-600", children: "Administrar" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-5xl font-extrabold text-teal-900 my-2", children: [
              calculationResult.finalAmount,
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-3xl font-bold", children: calculationResult.finalUnit })
            ] })
          ] }),
          calculationResult.adjustmentNotes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-lg font-bold text-amber-800 mb-2", children: "\xE2\u0161\xA0\xEF\xB8\x8F Aten\xC3\xA7\xC3\xA3o: Considera\xC3\xA7\xC3\xB5es Cl\xC3\xADnicas" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-3", children: calculationResult.adjustmentNotes.map((note, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bg-amber-100 border-l-4 border-amber-500 text-amber-900 p-3 rounded-r-lg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-semibold", children: note.title }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm", children: note.text })
            ] }, index)) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-lg font-bold text-slate-800 mb-2", children: "Notas de Administra\xC3\xA7\xC3\xA3o" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700 bg-slate-100 p-3 rounded-md", children: calculationResult.administrationNotes })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-6 text-xs text-center p-3 bg-red-100 text-red-800 rounded-lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-bold", children: "AVISO IMPORTANTE" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Esta calculadora \xC3\xA9 uma ferramenta de apoio e N\xC3\u0192O substitui o julgamento cl\xC3\xADnico do M\xC3\xA9dico Veterin\xC3\xA1rio. As doses devem ser ajustadas com base na avalia\xC3\xA7\xC3\xA3o individual do paciente e sua resposta \xC3\xA0 terapia." })
          ] })
        ] })
      ] }) })
    ] });
  };
  var App = () => {
    const [screen, setScreen] = (0, import_react3.useState)("home");
    const [species, setSpecies] = (0, import_react3.useState)(null);
    const [painType, setPainType] = (0, import_react3.useState)(null);
    const [selectedScale, setSelectedScale] = (0, import_react3.useState)(null);
    const [answers, setAnswers] = (0, import_react3.useState)({});
    const [modalScale, setModalScale] = (0, import_react3.useState)(null);
    const [infoModalContent, setInfoModalContent] = (0, import_react3.useState)(null);
    const [geminiLoading, setGeminiLoading] = (0, import_react3.useState)(false);
    const [geminiResponse, setGeminiResponse] = (0, import_react3.useState)(null);
    const [geminiError, setGeminiError] = (0, import_react3.useState)(null);
    const [sidebarOpen, setSidebarOpen] = (0, import_react3.useState)(false);
    const [themeMode, setThemeMode] = (0, import_react3.useState)(() => {
      if (typeof window === "undefined") return "dark";
      const saved = window.localStorage.getItem("dorvet-theme-mode");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });
    (0, import_react3.useEffect)(() => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("dorvet-theme-mode", themeMode);
      }
    }, [themeMode]);
    (0, import_react3.useEffect)(() => {
      setSidebarOpen(false);
    }, [screen]);
    const handleSelectSpecies = (0, import_react3.useCallback)((s) => {
      setSpecies(s);
      setScreen("painType");
    }, []);
    const handleSelectPainType = (0, import_react3.useCallback)((pt) => {
      setPainType(pt);
      setScreen("scaleSelect");
    }, []);
    const handleSelectScale = (0, import_react3.useCallback)((sc) => {
      if (sc.questions.length > 0) {
        setSelectedScale(sc);
        setAnswers({});
        setScreen("assessment");
      }
    }, []);
    const handleSubmitAssessment = (0, import_react3.useCallback)((ans) => {
      setAnswers(ans);
      setScreen("results");
    }, []);
    const handleBack = (0, import_react3.useCallback)(() => {
      setScreen((prev) => {
        if (prev === "results") return "assessment";
        if (prev === "assessment") return "scaleSelect";
        if (prev === "scaleSelect") return "painType";
        if (prev === "painType") return "home";
        if (prev === "guide") return "home";
        if (prev === "clinicalGuidelines") return "home";
        if (prev === "calculator") return "home";
        return "home";
      });
    }, []);
    const handleRestart = (0, import_react3.useCallback)(() => {
      setScreen("home");
      setSpecies(null);
      setPainType(null);
      setSelectedScale(null);
      setAnswers({});
      setGeminiResponse(null);
      setGeminiError(null);
    }, []);
    const handleShowGuide = (0, import_react3.useCallback)((pt) => {
      setPainType(pt);
      setScreen("guide");
    }, []);
    const handleShowClinicalGuidelines = (0, import_react3.useCallback)(() => {
      setScreen("clinicalGuidelines");
    }, []);
    const handleShowCalculator = (0, import_react3.useCallback)(() => {
      setScreen("calculator");
    }, []);
    const handleShowDetails = (0, import_react3.useCallback)((scale) => {
      setModalScale(scale);
    }, []);
    const handleCloseDetailsModal = (0, import_react3.useCallback)(() => {
      setModalScale(null);
    }, []);
    const handleSetInfoModal = (0, import_react3.useCallback)((title, content) => {
      setInfoModalContent({ title, content });
    }, []);
    const handleCloseInfoModal = (0, import_react3.useCallback)(() => {
      setInfoModalContent(null);
    }, []);
    const result = (0, import_react3.useMemo)(() => {
      if (screen === "results" && selectedScale) {
        return selectedScale.interpretation(answers);
      }
      return null;
    }, [screen, selectedScale, answers]);
    const navItems = (0, import_react3.useMemo)(() => [
      { screen: "home", disabled: false },
      { screen: "painType", disabled: !species },
      { screen: "scaleSelect", disabled: !species || !painType },
      { screen: "assessment", disabled: !selectedScale },
      { screen: "results", disabled: !result },
      { screen: "guide", disabled: false },
      { screen: "clinicalGuidelines", disabled: false },
      { screen: "calculator", disabled: false }
    ], [species, painType, selectedScale, result]);
    const handleNavigateScreen = (0, import_react3.useCallback)((target) => {
      const selected = navItems.find((item) => item.screen === target);
      if (selected?.disabled) {
        return;
      }
      setScreen(target);
    }, [navItems]);
    const handleGetGeminiOpinion = (0, import_react3.useCallback)(async () => {
      if (!species || !painType || !selectedScale || !result) return;
      setGeminiLoading(true);
      setGeminiResponse(null);
      setGeminiError(null);
      try {
        const response = await getPainAnalysis({
          species,
          painType,
          scaleName: selectedScale.name,
          score: result.score,
          analysis: result.analysis
        });
        setGeminiResponse(response);
      } catch (e) {
        setGeminiError(e.message || "An unknown error occurred.");
        setGeminiResponse(null);
      } finally {
        setGeminiLoading(false);
      }
    }, [species, painType, selectedScale, result]);
    const renderScreen = () => {
      switch (screen) {
        case "painType":
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PainTypeScreen, { species, onSelectPainType: handleSelectPainType, onBack: handleRestart });
        case "scaleSelect":
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ScaleSelectionScreen, { species, painType, onSelectScale: handleSelectScale, onShowDetails: handleShowDetails, onBack: handleBack });
        case "assessment":
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AssessmentScreen, { scale: selectedScale, onSubmit: handleSubmitAssessment, onBack: handleBack });
        case "results":
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ResultScreen, { result, scaleName: selectedScale.name, painType, onRestart: handleRestart, onShowGuide: handleShowGuide, onGetGeminiOpinion: handleGetGeminiOpinion, geminiLoading });
        case "guide":
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GuideScreen, { onBack: handleRestart, onHome: handleRestart, setModal: handleSetInfoModal, initialPainType: painType });
        case "clinicalGuidelines":
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ClinicalGuidelinesScreen, { onBack: handleRestart });
        case "calculator":
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CalculatorScreen, { onBack: handleBack, onHome: handleRestart, onInfoClick: handleSetInfoModal });
        default:
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HomeScreen, { onSelectSpecies: handleSelectSpecies, onShowGuide: () => handleShowGuide(null), onShowClinicalGuidelines: handleShowClinicalGuidelines, onShowCalculator: handleShowCalculator });
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `dorvet-shell ${themeMode === "dark" ? "dorvet-dark" : "dorvet-light"}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dorvet-aurora", "aria-hidden": true }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          onClick: () => setSidebarOpen(true),
          className: "dorvet-mobile-menu lg:hidden",
          "aria-label": "Abrir navega\xE7\xE3o",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Menu, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          onClick: () => setThemeMode(themeMode === "dark" ? "light" : "dark"),
          className: "dorvet-theme-toggle",
          "aria-label": themeMode === "dark" ? "Ativar modo claro" : "Ativar modo escuro",
          children: themeMode === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Moon, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("aside", { className: "dorvet-sidebar hidden lg:flex", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dorvet-sidebar-header", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dorvet-sidebar-logo", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PawIcon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dorvet-sidebar-title", children: "Painel Analgesia" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dorvet-sidebar-subtitle", children: "Controle de Dor Vet" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { className: "dorvet-sidebar-nav", children: navItems.map((item) => {
          const Icon2 = SCREEN_ICONS[item.screen];
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "button",
            {
              type: "button",
              onClick: () => handleNavigateScreen(item.screen),
              disabled: item.disabled,
              className: `dorvet-nav-item ${screen === item.screen ? "dorvet-nav-item-active" : ""}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon2, { className: "h-4 w-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: SCREEN_TITLES[item.screen] })
              ]
            },
            item.screen
          );
        }) })
      ] }),
      sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dorvet-drawer lg:hidden", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setSidebarOpen(false),
            className: "dorvet-drawer-overlay",
            "aria-label": "Fechar navega\xE7\xE3o"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("aside", { className: "dorvet-drawer-panel", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dorvet-sidebar-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dorvet-sidebar-logo", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PawIcon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dorvet-sidebar-title", children: "Navega\xE7\xE3o" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dorvet-sidebar-subtitle", children: "M\xF3dulo Dor" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setSidebarOpen(false),
                className: "dorvet-drawer-close",
                "aria-label": "Fechar menu",
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { className: "dorvet-sidebar-nav", children: navItems.map((item) => {
            const Icon2 = SCREEN_ICONS[item.screen];
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => handleNavigateScreen(item.screen),
                disabled: item.disabled,
                className: `dorvet-nav-item ${screen === item.screen ? "dorvet-nav-item-active" : ""}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon2, { className: "h-4 w-4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: SCREEN_TITLES[item.screen] })
                ]
              },
              item.screen
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dorvet-content-wrap lg:pl-[18.5rem]", children: renderScreen() }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Modal, { isOpen: !!modalScale, onClose: handleCloseDetailsModal, title: modalScale?.name, children: modalScale?.details && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "Origem e Desenvolvimento" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700", children: modalScale.details.origin })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "Indica\xC3\xA7\xC3\xB5es Cl\xC3\xADnicas" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700", children: modalScale.details.indications })
        ] }),
        modalScale.details.reliability && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "Confiabilidade" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700", children: modalScale.details.reliability })
        ] }),
        modalScale.details.accuracy && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "Acur\xC3\xA1cia" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700", children: modalScale.details.accuracy })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "Valida\xC3\xA7\xC3\xA3o e Estudos" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700", children: modalScale.details.studies })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "Qualidade e Pontos Fortes" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-slate-700", children: modalScale.details.quality })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Modal, { isOpen: !!infoModalContent, onClose: handleCloseInfoModal, title: infoModalContent?.title, children: infoModalContent?.content }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        Modal,
        {
          isOpen: !!geminiResponse || !!geminiError,
          onClose: () => {
            setGeminiResponse(null);
            setGeminiError(null);
          },
          title: "An\xC3\xA1lise com IA",
          children: [
            geminiResponse && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-4 text-slate-700 leading-relaxed", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "An\xC3\xA1lise Cl\xC3\xADnica" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: geminiResponse.clinicalAnalysis })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "Sugest\xC3\xB5es de A\xC3\xA7\xC3\xA3o" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: geminiResponse.actionSuggestions })
              ] }),
              geminiResponse.importantReminders && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { className: "font-bold text-lg text-slate-800", children: "Lembretes Importantes" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: geminiResponse.importantReminders })
              ] })
            ] }),
            geminiError && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-red-600 font-semibold", children: geminiError }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-slate-500 mt-6 italic", children: "Aviso: Esta an\xC3\xA1lise \xC3\xA9 gerada por intelig\xC3\xAAncia artificial e serve como uma ferramenta de apoio. N\xC3\xA3o substitui o julgamento cl\xC3\xADnico profissional do m\xC3\xA9dico veterin\xC3\xA1rio respons\xC3\xA1vel." })
          ]
        }
      )
    ] });
  };
  var App_default = App;
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/book-open-check.js:
lucide-react/dist/esm/icons/calculator.js:
lucide-react/dist/esm/icons/cat.js:
lucide-react/dist/esm/icons/chart-column.js:
lucide-react/dist/esm/icons/clipboard-check.js:
lucide-react/dist/esm/icons/dog.js:
lucide-react/dist/esm/icons/house.js:
lucide-react/dist/esm/icons/list-checks.js:
lucide-react/dist/esm/icons/menu.js:
lucide-react/dist/esm/icons/moon.js:
lucide-react/dist/esm/icons/shield-check.js:
lucide-react/dist/esm/icons/stethoscope.js:
lucide-react/dist/esm/icons/sun.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.539.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
