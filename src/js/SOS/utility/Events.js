
var SOS = SOS || {};

SOS.Events = function () {
    var _e = this;
    _e.listeners = {};
};

SOS.Events.prototype.enable = function () {
    var self = this;
    if (!self.listeners) {
        self.listeners = {};
    }

    self.triggerEvent = function (ev, args) {
        SOS.Events.prototype.triggerEvent.call(self, ev, args);
        console.log(ev);
    };

    self.register = function (ev, fn) {
        SOS.Events.prototype.register.call(self, ev, fn);
    };

    self.unregister = function (ev, fn) {
        SOS.Events.prototype.unregister.call(self, ev, fn);
    };
};
SOS.Events.prototype.triggerEvent = function (ev, args) {
    var self = this;

    if (!!self.listeners[ev]) {
        var selfListieners = self.listeners[ev].reverse();
        for (var i = 0; i < selfListieners.length; i++) {
            if (!!args) {
                selfListieners[i].apply(window, args);
            } else {
                selfListieners[i].call(window);
            }
        }
    }
};
SOS.Events.prototype.register = function (ev, fn) {
    var self = this;

    self.enable.call(self, ev);
    var list = (self.listeners[ev] || []);

    // Notice the positive check here
    if (fn instanceof Function) {
        var exists = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i] === fn) {
                exists = true;
            }
        }

        if (false === exists) {
            list.push(fn);
        }
    }

    self.listeners[ev] = list;
};
SOS.Events.prototype.unregister = function (ev, fn) {
    var self = this;

    if (!!self.listeners[ev] &&
        self.listeners[ev].length > 0) {
        // If a listener is provided
        if (!!fn) {
            var fns = [];
            for (var i = 0; i < self.listeners[ev].length; i++) {
                if (fn != self.listeners[ev][i]) {
                    fns.push(self.listeners[ev][i]);
                }
            }
            self.listeners[ev] = fns;
        } else { // No listener, so remove them all
            self.listeners[ev] = [];
        }
    }
};