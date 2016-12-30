var updatePage = (function () {

  function getColor (t) {
    var warmest = [ 244, 206, 66 ];
    var coldest = [ 66, 170, 244 ];
    var degree = t > 25 ? 100 : t < -5 ? 0 : (100 / 30) * (t + 5);
    var rgbColor = warmest.map(function (w, i) {
      var diff = w - coldest[i];
      var addTo = (diff / 100) * degree;
      return Math.round(coldest[i] + addTo);
    })
    return rgbColor;
  }

  function isDaylight (sunrise, sunset) {
    var t = Math.floor(Date.now());
    return t > sunrise && t < sunset;
  }

  // standard xmlhttmp request (reusable)
  function makeRequest (url, cb) {
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          cb(null, httpRequest.responseText);
        } else {
          cb('There was a problem with the request.');
        }
      }
    };
    httpRequest.open('GET', url);
    httpRequest.send();
  }

  var waterfall = function (args, tasks, cb) {
    var next = tasks[0]
    var tail = tasks.slice(1)
    if (typeof next !== 'undefined') {
      next(args, function(error, result) {
        if (error) {
          cb(err)
          return ;
        }
        waterfall(result, tail, cb)
      })
      return;
    }
    return cb(null, args)
  };

  function getLocation (_, cb) {
    var url = 'http://ip-api.com/json';
    makeRequest(url, function(err, res) {
      if (err) console.log(err);
      var response = JSON.parse(res);
      return cb(null, [response.lat, response.lon, response.city]);
    });
  }

  function getWeather (arr, cb) {
    var city = arr[2];
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + arr[0] + '&lon=' + arr[1] + '&units=metric&APPID=15c95184dce44b01f71ad740886687f1'/* + apiid*/;
    makeRequest(url, function(err, res) {
      if (err) console.log(err);
      var response = JSON.parse(res);
      var time = new Date();
      return cb(null, {
        city: city,
        temp: response.main.temp,
        type: response.weather[0].description,
        cloudCover: response.clouds.all,
        sunrise: response.sys.sunrise,
        sunset: response.sys.sunset,
        time: time
      });
    });
  }

  function getGif (obj, cb) {
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="
    var keywords = obj.type.split(" ");
    var keyword = keywords[keywords.length - 1] + " cat";
    makeRequest(url + keyword, function (err, res) {
      if (err) console.log(err);
      var response = JSON.parse(res);
      var gif = response.data.image_url;
      var details = obj;
      return cb(null, {details: details, gif: gif});
    })
  }

  function getBackgroundColor (obj, cb) {
    obj.colors = {};
    obj.colors.topColor = helpers.rgbcolor(getColor(obj.details.temp));
    var cloudCover = obj.details.cloudCover;
    var sunrise = obj.details.sunrise;
    var sunset = obj.details.sunset;
    obj.colors.bottomoColor =  isDaylight(sunrise, sunset) ? "RGBA(15,255,255,1)" : "RGBA(51,2,102,1)";
    return cb(null, obj);
  }

  function updateDOM (obj, cb) {
    var arr = Object.keys(obj.details);
    arr.forEach(function (x) {
      var e = document.getElementById(x);
      if(e) {
        e.innerHTML = [obj.details[x]].map(function(y) {
          if(helpers.format[x]) return helpers.format[x](y);
          return y;
        })[0]
      };
    });
    document.querySelector(".gif").src =  obj.gif;
    var c = 'linear-gradient(' + obj.colors.topColor + ', ' + obj.colors.bottomoColor + ')';
    document.querySelector('body').style.background = c;
    return cb(null, "done");
  }

  return {
    update: function () {
      waterfall (null, [getLocation, getWeather, getGif, getBackgroundColor, updateDOM], function(err, result) { if (err) console.log(err); });
    }
  }
})();
