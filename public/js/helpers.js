var helpers = (function () {
  return {
    format: {
      temp: function(n) {
        return ((Math.round(n * 10)) / 10) + "°c";
      },
      city: function(str) {
        if (!str || str === '') return '';
        return str[0].toUpperCase() === str[0] ? str : helpers.capitalise(str);
      },
      type: function(str) {
        if (!str || str === '') return '';
        return str[0].toUpperCase() === str[0] ? str : helpers.capitalise(str);
      },
      time: function(date) {
        var h = date.getHours();
        var h12hour = h === 0 ? '12' : (h > 12 ? (h - 12) : h).toString();
        var ampm = h < 12 ? 'AM' : 'PM';
        var m = date.getMinutes();
        var mFormatted = m.toString().length === 2 ? m : '0' + m;
        return h12hour + ":" + mFormatted + ' ' + ampm;
      }
    },
    capitalise: function (str) {
      var split = str.split('');
      split[0] = split[0].toUpperCase();
      return split.join('');
    },
    rgbcolor: function (arr) {
      return "RGBA(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ", 1)";
    }
  }
})();
