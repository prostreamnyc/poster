var posters = [];

window.addEventListener("message", function (e) {
    var channel = e.data.channel;

    posters.forEach(function (poster) {
        if (poster.target === e.source) {
            var listener = poster.listeners[channel];
            if (listener) {
                listener.apply(null, e.data.args);
            }
        }
    });
});

var Poster = (function () {
    function Poster(target) {
        this.origin = "*";
        this.target = target;
        this.listeners = {};
        posters.push(this);
    }
    Poster.prototype.post = function (channel) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        var message = {
            channel: channel,
            args: args
        };
        this.target.postMessage(message, this.origin);
    };

    Poster.prototype.listen = function (channel, callback) {
        this.listeners[channel] = callback;
    };
    return Poster;
})();

module.exports = Poster;