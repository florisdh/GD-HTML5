"use strict";

let instance = null;

/**
 * EventBus
 */
class EventBus {
  /**
   * Constructor of EventBus.
   * @return {*}
   */
  constructor() {
    // Make this a singleton.
    if (instance) return instance;
    else instance = this;

    this.listeners = {};
  }

  /**
   * Get event listeners.
   * @param {String} eventName
   * @param {Function} callback
   * @param {String} scope
   * @return {number}
   * @private
   */
  _getListenerIdx(eventName, callback, scope) {
    let eventListeners = this.listeners[eventName];
    let i;
    let idx = -1;

    if (!eventListeners || eventListeners.length === 0) {
      return idx;
    }

    for (i = 0; i < eventListeners.length; i++) {
      if (
        eventListeners[i].callback === callback &&
        (!scope || scope === eventListeners[i].scope)
      ) {
        idx = i;
        break;
      }
    }

    return idx;
  }

  /**
   * Subscribe to events.
   * @param {String} eventName
   * @param {Function} callback
   * @param {String} scope
   */
  subscribe(eventName, callback, scope) {
    let listener;
    let idx;

    if (!eventName) {
      throw new Error("Event name cannot be null or undefined.");
    }

    if (!callback || typeof callback !== "function") {
      throw new Error("Listener must be of type function.");
    }

    idx = this._getListenerIdx(eventName, callback, scope);

    // console.log(eventName, scope);

    if (idx >= 0) {
      console.log(eventName, scope);
      return;
    }

    listener = {
      callback: callback,
      scope: scope
    };

    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(listener);

    // console.log(this.listeners);
  }

  /**
   * Unsubscribe scope
   * @param {String} scope
   */
  unsubscribeScope(scope) {
    let eventNames = Object.keys(this.listeners);

    for (let nameIndex = 0; nameIndex < eventNames.length; nameIndex++) {
      let eventName = eventNames[nameIndex];
      let events = this.listeners[eventName];

      for (let index = 0; index < events.length; index++) {
        let event = events[index];
        if (event.scope === scope) {
          events.splice(index, 1);
          index--;
        }
      }

      if (events.length === 0) {
        delete this.listeners[eventName];
      }
    }
  }

  /**
   * Broadcast event.
   * @param {String} eventName
   * @param {Object} args
   */
  broadcast(eventName, args) {
    let eventListeners = this.listeners[eventName];

    if (!eventName || !this.listeners[eventName]) {
      return;
    }

    args = args || {};
    args.name = args.name || eventName;

    eventListeners.forEach(function (listener) {
      listener.callback.call(listener.scope, args,listener.scope);
    });
  }

  /**
   * Print scope
   * @param {String} scope
   */
  printScope(scope) {
    let eventNames = Object.keys(this.listeners);

    for (let nameIndex = 0; nameIndex < eventNames.length; nameIndex++) {
      let eventName = eventNames[nameIndex];
      let events = this.listeners[eventName];

      for (let index = 0; index < events.length; index++) {
        let event = events[index];
        if (event.scope === scope) {
          console.log(eventName, scope);
        }
      }
    }
  }
}

export default EventBus;
