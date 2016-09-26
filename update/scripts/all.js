var app = angular.module('app', ['pascalprecht.translate', 'ui.router', 'ngSanitize', 'ngCookies']);

app.run(['$rootScope', function ($rootScope) {
  $rootScope.$on('$viewContentLoaded',function(){
    jQuery('html, body').animate({ scrollTop: 0 }, 200);
  });
}]);

/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		});
		// A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	// commonjs
	if( typeof exports !== "undefined" ){
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));

!function(e){"use strict";var n=function(n,t,o){function i(e){return a.body?e():void setTimeout(function(){i(e)})}function r(){l.addEventListener&&l.removeEventListener("load",r),l.media=o||"all"}var d,a=e.document,l=a.createElement("link");if(t)d=t;else{var s=(a.body||a.getElementsByTagName("head")[0]).childNodes;d=s[s.length-1]}var f=a.styleSheets;l.rel="stylesheet",l.href=n,l.media="only x",i(function(){d.parentNode.insertBefore(l,t?d:d.nextSibling)});var u=function(e){for(var n=l.href,t=f.length;t--;)if(f[t].href===n)return e();setTimeout(function(){u(e)})};return l.addEventListener&&l.addEventListener("load",r),l.onloadcssdefined=u,u(r),l};"undefined"!=typeof exports?exports.loadCSS=n:e.loadCSS=n}("undefined"!=typeof global?global:this);

var app = angular.module('app');

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

  $urlRouterProvider.otherwise("/");
  $urlMatcherFactoryProvider.strictMode(false);

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    })
    .state('our-services', {
      url: "/our-services",
      templateUrl: "views/our-services.html",
      controller: "ourServicesCtrl"
    })
    .state('projects', {
      url: "/projects",
      templateUrl: "views/projects.html",
      controller: "projectsCtrl"
    })
    .state('team', {
      url: "/team",
      templateUrl: "views/team.html",
      controller: "teamCtrl"
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "views/contact.html",
      controller: "contactCtrl"
    })
    .state('legal', {
      url: "/legal",
      templateUrl: "views/legal.html"
    })
    .state('termsAndServices', {
      url: "/termsAndServices",
      templateUrl: "views/termsAndServices.html"
    })
    .state('web', {
      url: "/web",
      templateUrl: "views/services/web.html"
    })
    .state('mobile', {
      url: "/mobile",
      templateUrl: "views/services/mobile.html"
    })
    .state('ecommerce', {
      url: "/ecommerce",
      templateUrl: "views/services/ecommerce.html"
    })
    .state('feed', {
      url: "/feed",
      templateUrl: "views/feed.html",
      controller: "feedCtrl"
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });

}]);

var app = angular.module('app');

app.config(['$translateProvider', function($translateProvider){
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.useStaticFilesLoader({
    prefix: '/translations/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('de');

}]);

var app = angular.module('app');

app.controller('contactCtrl', ['$scope', '$http', function($scope, $http){

  $scope.contactData = {
    email: "",
    name: "",
    surname: "",
    content: ""
  };

  $scope.sendMessage = function(data) {
    var req = {
      method: 'POST',
      url: 'http://mondoit.de/mondo',
      data: data
    }

    $http(req).then(function(data){
      console.log(data);
    }, function(err){
      console.log(err);
    });
  }


}]);

var app = angular.module('app');

app.controller('cookiesCtrl', ['$scope', '$translate', '$cookies', function($scope, $translate, $cookies){
   
    var cookiesApproved = $cookies.get("cookies-approved");
    var cookie = document.getElementById("cookie");

    $scope.hideCookies = function () {
        cookie.className += " hide";
        $cookies.put("cookies-approved", true);
    };

    if (cookiesApproved){
        $scope.hideCookies()
    }
}]);

var app = angular.module('app');

app.controller('feedCtrl', ['$scope', '$translate', 'FeedService', function($scope, $translate, Feed){

  $scope.loadButonText="Load";
  $scope.loadFeed=function(){
      var r = Math.floor((Math.random() * 3));
      Feed.parseFeed($scope.feedSrc[r]).then(function(res){
          $scope.feeds=res.data.responseData.feed.entries;
      });
  };
  $scope.feedSrc= ["https://www.onlinehaendler-news.de/payment?format=feed&type=rss", "https://www.onlinehaendler-news.de/marketing?format=feed&type=rss", "https://www.onlinehaendler-news.de/e-commerce-tipp?format=feed&type=rss"]
  $scope.loadFeed();
}]);

app.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

var app = angular.module('app');

app.controller('headerCtrl', ['$scope', '$translate', '$cookies', function($scope, $translate, $cookies){

  // MENU

  var i = 0;
  var menuList = document.getElementsByClassName("menu-selector");
  var menu = document.getElementById("menu");

  $scope.menu = function(s) {

    setTimeout(function () {
      if(i == 0 && s == 0){
        menu.className += " show-menu";
        i = 1;
      }
      else if (i == 1 && s == 0){
        menu.className = "menu";
        i = 0;
      }
      else if (i == 1 && s == 1){
        menu.className = "menu";
        i = 0;
      }
    },100);

  };

  // LANGUAGE

  $scope.languages = [
    {
      id: 0,
      lng: "en"
    },
    {
      id: 1,
      lng: "de"
    }
  ];

  $scope.activeLang = function (lng) {
    $("#en-m").removeClass("active-lang");
    $("#de-m").removeClass("active-lang");

    if (lng == "en"){
      $("#en-m").addClass("active-lang");
    } else if (lng == "de") {
      $("#de-m").addClass("active-lang");
    }
  };

  var lang = $cookies.get("lang");

  if (lang == undefined) {
    $scope.selectedLang = 'de';
    $scope.activeLang($scope.selectedLang);
  } else {
    $scope.selectedLang = lang;
    $translate.use($scope.selectedLang);
    $scope.activeLang($scope.selectedLang);
  }

  $scope.changeLanguage = function(id) {
    $scope.activeLang($scope.languages[id].lng);

    $translate.use($scope.languages[id].lng);
    $cookies.put("lang", $scope.languages[id].lng);
  };

}]);

var app = angular.module('app');

app.controller('homeCtrl', ['$scope', function($scope){

  var Bird = {
  def: function(n, m, s) {
    if (m) this.e(n.prototype, m);
    if (s) this.e(n, s);
    return n;
  },
  e: function(o, p) {
    for (prop in p) o[prop] = p[prop];
    return o;
  },
  v: [
    [5, 0, 0],
    [-5, -2, 1],
    [-5, 0, 0],
    [-5, -2, -1],
    [0, 2, -6],
    [0, 2, 6],
    [2, 0, 0],
    [-3, 0, 0]
  ],
  beak: [
    [0, 1, 2],
    [4, 7, 6],
    [5, 6, 7]
  ],
  L: null,
  V: {
    x: 0,
    y: 0,
    z: 5000
  }
}
Bird.obj = Bird.def(
  function() {
    this.vtr = new Bird.Vtr(),
      this.accel, this.width = 600, this.height = 600, this.depth = 300, this.ept, this.area = 200,
      this.msp = 4, this.mfrc = 0.1, this.coll = false;
    this.pos = new Bird.Vtr();
    this.vel = new Bird.Vtr();
    this.accel = new Bird.Vtr();
  }, {

    _coll: function(value) {
      this.coll = value;
    },
    param: function(w, h, dth) {
      this.width = w;
      this.height = h;
      this.depth = dth;
    },
    run: function(b) {
      if (this.coll) {
        this.vtr.set(-this.width, this.pos.y, this.pos.z);
        this.vtr = this.detect(this.vtr);
        this.vtr.scale(5);
        this.accel.add(this.vtr);
        this.vtr.set(this.width, this.pos.y, this.pos.z);
        this.vtr = this.detect(this.vtr);
        this.vtr.scale(5);
        this.accel.add(this.vtr);
        this.vtr.set(this.pos.x, -this.height, this.pos.z);
        this.vtr = this.detect(this.vtr);
        this.vtr.scale(5);
        this.accel.add(this.vtr);
        this.vtr.set(this.pos.x, this.height, this.pos.z);
        this.vtr = this.detect(this.vtr);
        this.vtr.scale(5);
        this.accel.add(this.vtr);
        this.vtr.set(this.pos.x, this.pos.y, -this.depth);
        this.vtr = this.detect(this.vtr);
        this.vtr.scale(5);
        this.accel.add(this.vtr);
        this.vtr.set(this.pos.x, this.pos.y, this.depth);
        this.vtr = this.detect(this.vtr);
        this.vtr.scale(5);
        this.accel.add(this.vtr);
      }
      if (Math.random() > 0.5) {
        this.fly(b);
      }
      this.move();
    },
    fly: function(b) {
      if (this.ept) {
        this.accel.add(this.meet(this.ept, 0.005));
      }
      this.accel.add(this.line(b));
      this.accel.add(this.togeth(b));
      this.accel.add(this.apart(b));
    },
    move: function() {
      this.vel.add(this.accel);
      var l = this.vel.len();
      if (l > this.msp) {
        this.vel.lowscale(l / this.msp);
      }
      this.pos.add(this.vel);
      this.accel.set(0, 0, 0);
    },
    detect: function(pt) {
      var dir = new Bird.Vtr();
      dir.copy(this.pos);
      dir.sub(pt);
      dir.scale(1 / this.pos.dsq(pt));
      return dir;
    },
    rep: function(pt) {
      var dist = this.pos.dst(pt);if (dist < 150) {
        var dir = new Bird.Vtr();
        dir.subv(this.pos, pt);
        dir.scale(0.5 / dist);
        this.accel.add(dir);
      }
    },
    meet: function(pt, amt) {
      var dir = new Bird.Vtr();
      dir.subv(pt, this.pos);
      dir.scale(amt);
      return dir;
    },
    line: function(b) {
      var _b, totvel = new Bird.Vtr(),
        cnt = 0;
      for (var i = 0, il = b.length; i < il; i++) {
        if (Math.random() > 0.6) continue;
        _b = b[i];
        var dist = _b.pos.dst(this.pos);
        if (dist > 0 && dist <= this.area) {
          totvel.add(_b.vel);
          cnt++;
        }
      }
      if (cnt > 0) {
        totvel.lowscale(cnt);
        var v = totvel.len();
        if (v > this.mfrc) {
          totvel.lowscale( v / this.mfrc);
        }
      }
      return totvel;
    },
    togeth: function(b) {
      var _b, dist,
        plus = new Bird.Vtr(),
        dir = new Bird.Vtr(),
        cnt = 0;
      for (var i = 0, il = b.length; i < il; i++) {
        if (Math.random() > 0.6) continue;
        _b = b[i];
        dist = _b.pos.dst(this.pos);
        if (dist > 0 && dist <= this.area) {
          plus.add(_b.pos);
          cnt++;
        }
      }
      if (cnt > 0) {
        plus.lowscale(cnt);
      }
      dir.subv(plus, this.pos);
      var l = dir.len();
      if (l > this.mfrc) {
        dir.lowscale(l / this.mfrc);
      }
      return dir;
    },
    apart: function(b) {
      var _b, dist,
        plus = new Bird.Vtr(),
        rep = new Bird.Vtr();
      for (var i = 0, il = b.length; i < il; i++) {
        if (Math.random() > 0.6) continue;
        _b = b[i];
        dist = _b.pos.dst(this.pos);
        if (dist > 0 && dist <= this.area) {
          rep.subv(this.pos, _b.pos);
          rep.level();
          rep.lowscale(dist);
          plus.add(rep);
        }
      }
      return plus;
    }
  }
);
Bird.Build = Bird.def(
  function() {
    this.base = 0, this.left = 1, this.right = 2;
    this.pos = new Bird.Vtr();
    this.rot = new Bird.Vtr();
    this.bbase = this.tri(this.base);
    this.leftwing = this.tri(this.left);
    this.rightwing = this.tri(this.right);
  }, {
    matrix: function() {
      this.bbase.vtx();
      this.leftwing.vtx();
      this.rightwing.vtx();
      this.leftwing.wingY(this.wY);
      this.rightwing.wingY(this.wY);
      this.bbase.rotY(this.rot.y);
      this.bbase.rotZ(this.rot.z);
      this.leftwing.rotY(this.rot.y);
      this.leftwing.rotZ(this.rot.z);
      this.rightwing.rotY(this.rot.y);
      this.rightwing.rotZ(this.rot.z);
      this.bbase.trans(this.pos);
      this.leftwing.trans(this.pos);
      this.rightwing.trans(this.pos);
    },
    draw: function() {
      this.bbase.draw();
      this.leftwing.draw();
      this.rightwing.draw();
    },
    tri: function(i) {
      var v1, v2, v3, v;
      v = Bird.v[Bird.beak[i][0]];
      v1 = new Bird.Vtr(v[0], v[1], v[2]);
      v = Bird.v[Bird.beak[i][1]];
      v2 = new Bird.Vtr(v[0], v[1], v[2]);
      v = Bird.v[Bird.beak[i][2]];
      v3 = new Bird.Vtr(v[0], v[1], v[2]);
      return new Bird.Tri(v1, v2, v3);
    },
    wang: function(y) {
      var v1 = Bird.v[Bird.beak[1][1]];
      this.rot.x = Math.atan2(y, v1[0]);
    },
    zpos: function() {
      var z1 = this.bbase._z();
      var z2 = this.leftwing._z();
      var z3 = this.rightwing._z();
      return Math.min(z1, z2, z3);
    },
    wing: function(y) {
      this.wY = y;
    }
  }
);
Bird.Tri = Bird.def(
  function(p1, p2, p3) {
    this.mainv = [p1.copy(), p2.copy(), p3.copy()];
    this.Vtxs = [p1.copy(), p2.copy(), p3.copy()];
    this.bv = new Bird.Vtr(0.5, 0.5, 0.8);
  }, {
    draw: function() {
      var v1 = [this.Vtxs[0].Pt().x, this.Vtxs[0].Pt().y];
      var v2 = [this.Vtxs[1].Pt().x, this.Vtxs[1].Pt().y];
      var v3 = [this.Vtxs[2].Pt().x, this.Vtxs[2].Pt().y];
      var col = this.col();
      Bird.$.fillStyle = col;
      Bird.$.strokeStyle = col;
      Bird.$.lineWidth = 0.1;
      Bird.$.beginPath();
      Bird.$.moveTo(v1[0], v1[1]);
      Bird.$.lineTo(v2[0], v2[1]);
      Bird.$.lineTo(v3[0], v3[1]);
      Bird.$.lineTo(v1[0], v1[1]);
      Bird.$.closePath();
      Bird.$.fill();
      Bird.$.stroke();
    },
    rotX: function(a) {
      var ang = a;
      this.Vtxs.forEach(
        function(e, i, a) {
          Bird.Matrix.rotX(e, ang);
        }
      );
    },
    rotY: function(a) {
      var ang = a;
      this.Vtxs.forEach(
        function(e, i, a) {
          Bird.Matrix.rotY(e, ang);
        }
      );
    },
    rotZ: function(a) {
      var ang = a;
      this.Vtxs.forEach(
        function(e, i, a) {
          Bird.Matrix.rotZ(e, ang);
        }
      );
    },
    trans: function(s) {
      var trans = s;
      this.Vtxs.forEach(
        function(e, i, a) {
          Bird.Matrix.trans(e, [trans.x, trans.y, trans.z]);
        }
      );
    },
    vtx: function(idx) {
      for (var i = 0; i < 3; i++) {
        var x = this.mainv[i].x;
        var y = this.mainv[i].y;
        var z = this.mainv[i].z;
        this.Vtxs[i].x = x;
        this.Vtxs[i].y = y;
        this.Vtxs[i].z = z;
      }
    },
    wingY: function(y) {
      this.Vtxs[0].y = y;
    },
    _z: function() {
      return Math.min(this.Vtxs[0].z, this.Vtxs[1].z, this.Vtxs[2].z);
    },
    col: function() {
      var e = 0.3,
          f = 0.3,
          g = 0.7;
      var bw = new Bird.Vtr(1, 1, 1);
      var n = this.norm();
      var x = this.Vtxs[0].copy();
      var v = x.sub(Bird.V);
      v.level();
      x = this.Vtxs[0].copy();
      var l = x.sub(Bird.L);
      l.level();
      var p = l.p(n);
      var x1 = n.copy();
      x1.scale(p);
      x1.scale(2);
      var r = l.copy();
      r.sub(x1);
      x1.scale(-1);
      p = Math.max(x1.p(l), 0);
      var col = this.bv.copy();
      col.scale(p);
      col.scale(col, e);
      x1 = col.copy();
      var x2 = r.copy();
      x2.scale(-1);
      p = Math.pow(Math.max(x2.p(v)), 20);
      x2 = bw.copy();
      x2.scale(p * f);
      var x3 = this.bv.copy();
      x3.scale(g);
      x1.add(x2);
      x1.add(x3);
      var _r = Math.floor(x1.x * 255);
      var _g = Math.floor(x1.y * 255);
      var _b = Math.floor(x1.z * 255);
      return 'rgb(' + _r + ',' + _g + ',' + _b + ')';
    },
    norm: function() {
      var v1 = this.Vtxs[0];
      var v2 = this.Vtxs[1];
      var v3 = this.Vtxs[2];
      v3.sub(v2);
      v1.sub(v3);
      v3.cross(v1);
      v3.level();
      return v3;
    }
  }
);
Bird.Vtr = Bird.def(
  function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.fl = 1000;
  }, {
    Pt: function() {
      var zsc = this.fl + this.z;
      var scale = this.fl / zsc;
      var x = this.x * scale;
      var y = this.y * scale;
      return {
        x: x,
        y: y,
        scale: scale
      };
    },
    set: function(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    },
    len: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    add: function(v, w) {

      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    },
    sub: function(v, w) {

      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    },
    subv: function(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
    },
    scale: function(upd) {
      this.x *= upd;
      this.y *= upd;
      this.z *= upd;
      return this;
    },
    lowscale: function(upd) {
      if (upd !== 0) {
        var inv = 1 / upd;
        this.x *= inv;
        this.y *= inv;
        this.z *= inv;
      } else {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      }
      return this;
    },
    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    },
    dst: function(v) {
      return Math.sqrt(this.dsq(v));
    },
    dsq: function(v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;
      var dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
    },
    cross: function(v, w) {
      var x = this.x,
        y = this.y,
        z = this.z;
      this.x = y * v.z - z * v.y;
      this.y = z * v.x - x * v.z;
      this.z = x * v.y - y * v.x;
      return this;
    },
    p: function(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    level: function() {
      return this.lowscale(this.len());
    },
    copy: function() {
      return new Bird.Vtr(this.x, this.y, this.z);
    }
  }
);
Bird.Matrix = {
  rotX: function(pt, angX) {
    var pos = [pt.x, pt.y, pt.z];
    var asin = Math.sin(angX);
    var acos = Math.cos(angX);
    var xrot = [];
    xrot[0] = [1, 0, 0];
    xrot[1] = [0, acos, asin];
    xrot[2] = [0, -asin, acos];
    var calc = this.mm(pos, xrot);
    pt.x = calc[0];
    pt.y = calc[1];
    pt.z = calc[2];
  },
  rotY: function(pt, angY) {
    var pos = [pt.x, pt.y, pt.z];
    var asin = Math.sin(angY);
    var acos = Math.cos(angY);
    var yrot = [];
    yrot[0] = [acos, 0, asin];
    yrot[1] = [0, 1, 0];
    yrot[2] = [-asin, 0, acos];
    var calc = this.mm(pos, yrot);
    pt.x = calc[0];
    pt.y = calc[1];
    pt.z = calc[2];
  },
  rotZ: function(pt, angZ) {
    var pos = [pt.x, pt.y, pt.z];
    var asin = Math.sin(angZ);
    var acos = Math.cos(angZ);
    var yrot = [];
    yrot[0] = [acos, asin, 0];
    yrot[1] = [-asin, acos, 0];
    yrot[2] = [0, 0, 1];
    var calc = this.mm(pos, yrot);
    pt.x = calc[0];
    pt.y = calc[1];
    pt.z = calc[2];
  },
  trans: function(pt, s) {
    pt.x += s[0];
    pt.y += s[1];
    pt.z += s[2];
  },
  scale: function(pt, s) {
    pt.x *= s[0];
    pt.y *= s[1];
    pt.z *= s[2];
  },
  mm: function(m1, m2) {
    var calc = [];
    calc[0] = m1[0] * m2[0][0] + m1[1] * m2[1][0] + m1[2] * m2[2][0];
    calc[1] = m1[0] * m2[0][1] + m1[1] * m2[1][1] + m1[2] * m2[2][1];
    calc[2] = m1[0] * m2[0][2] + m1[1] * m2[1][2] + m1[2] * m2[2][2];
    return calc;
  }
}

function draw() {
  var c = document.getElementById('canv');
  Bird.$ = c.getContext("2d");
  Bird.canv = {
    w: c.width = window.innerWidth,
    h: c.height = window.innerHeight
  };
  Bird.L = new Bird.Vtr(0, 2000, 5000);
  Bird.V = new Bird.Vtr(0, 0, 5000);
  var birds = [];
  var b = [];
  for (var i = 0; i < 100; i++) {
    _b = b[i] = new Bird.obj();
    _b.pos.x = Math.random() * 800 - 400;
    _b.pos.y = Math.random() * 800 - 400;
    _b.pos.z = Math.random() * 800 - 400;
    _b.vel.x = Math.random() * 2 - 1;
    _b.vel.y = Math.random() * 2 - 1;
    _b.vel.z = Math.random() * 2 - 1;
    _b._coll(true);
    _b.param(400, 400, 800);
    bird = birds[i] = new Bird.Build();
    bird.phase = Math.floor(Math.random() * 62.83);
    bird.pos = b[i].pos;
  }

  run();

  function run() {
    window.requestAnimationFrame(run);
    draw();
  }

  function draw() {
    Bird.$.setTransform(1, 0, 0, 1, 0, 0);
    Bird.$.translate(Bird.canv.w / 2, Bird.canv.h / 2);
    Bird.$.clearRect(-Bird.canv.w / 2, -Bird.canv.h / 2, Bird.canv.w, Bird.canv.h);
    Bird.$.scale(1, -1);
    var arr = [];
    b.forEach(function(e, i, a) {
      var _b = b[i];
      _b.run(b);
      var bird = birds[i];
      bird.rot.y = Math.atan2(-_b.vel.z, _b.vel.x);
      bird.rot.z = Math.asin(_b.vel.y / _b.vel.len());
      bird.phase = (bird.phase + (Math.max(0, bird.rot.z) + 0.1)) % 62.83;
      bird.wing(Math.sin(bird.phase) * 5);
      bird.matrix();
      arr.push({
        z: bird.zpos(),
        o: bird
      });
    });
    arr.sort(function(a, b) {
      return a.z < b.z ? -1 : a.z > b.z ? 1 : 0;
    });
    arr.forEach(function(e, i, a) {
      e.o.draw();
    });
  }
};
draw();
window.addEventListener('resize',function(){
   if(c.width!==window.innerWidth && c.height!==window.innerHeight){
     Bird.canv = {
      w: c.width = window.innerWidth,
      h: c.height = window.innerHeight
    };
   }
});

}])

var app = angular.module('app');

app.controller('ourServicesCtrl', ['$scope', '$timeout', function($scope, $timeout){

  var buttons = document.querySelectorAll("div.service-more");

  var i = 0;
  var last = 0;

  $scope.manipulate = function(data){

    if (last != data){
      buttons[last].className = "service-more";
    }

    buttons[data].className = "service-more box-large";

    last = data;
  };

  ////////////////////////
  ////////////////////////
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  function viki() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
  viki();

}]);

var app = angular.module('app');

app.controller('projectsCtrl', ['$scope', '$timeout', function($scope, $timeout){

  $scope.references = [
    {
      id: 0,
      name: "NUTRICODIET",
      img: "0",
      credit: "MondoIT",
      client: "MondoIT",
      category: "Web app",
      description: "php, mySQL"
    },
    {
      id: 1,
      name: "METZGEREI ARNOLD",
      img: "1",
      credit: "Vildan Tursic",
      client: "Metzgerei Arnold",
      category: "Web app",
      description: "php, mySQL"
    },
    {
      id: 2,
      name: "MY STREET TALK",
      img: "2",
      credit: "Zoran Kocevski",
      client: "My Street Talk",
      category: "Web App",
      description: "php, mySQL"
    },
    {
      id: 3,
      name: "LUXTOGO",
      img: "3",
      credit: "MondoIT",
      client: "Tamara Nikolic",
      category: "Web App",
      description: ""
    },
    {
      id: 4,
      name: "HEART & RHYTHM SOLUTIONS",
      img: "4",
      credit: "MondoIT",
      client: "Heart&Rhythm Solution",
      category: "Web App",
      description: "php, mySQL"
    },
    {
      id: 5,
      name: "WEE TALK",
      img: "5",
      credit: "Vladimir Pavlovic",
      client: "Wee Talk",
      category: "Mobile App",
      description: "iOS"
    },
    {
      id: 6,
      name: "KUNDE",
      img: "6",
      credit: "Vladimir Pavlovic",
      client: "Octilla",
      category: "Mobile App",
      description: ""
    },
    {
      id: 7,
      name: "KUNDE",
      img: "7",
      credit: "Igor Gavric",
      client: "Mobile Business",
      category: "Web App",
      description: "php"
    },
    {
      id: 8,
      name: "KUNDE",
      img: "8",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 9,
      name: "KUNDE",
      img: "9",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 10,
      name: "KUNDE",
      img: "10",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 11,
      name: "KUNDE",
      img: "11",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 12,
      name: "KUNDE",
      img: "12",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 13,
      name: "KUNDE",
      img: "13",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 14,
      name: "KUNDE",
      img: "14",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 15,
      name: "KUNDE",
      img: "15",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 16,
      name: "KUNDE",
      img: "17",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 17,
      name: "KUNDE",
      img: "18",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 18,
      name: "KUNDE",
      img: "19",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 19,
      name: "KUNDE",
      img: "20",
      credit: "",
      client: "",
      category: "",
      description: ""
    },
    {
      id: 20,
      name: "SHOPS",
      img: "21",
      credit: "",
      client: "",
      category: "",
      description: ""
    }

  ]

  var buttons = [];

  $timeout(function(){
    buttons = document.querySelectorAll("div.r");
  }, 2000);

  var last = 0;
  $scope.manipulate = function(data){

    buttons[data].className = "references-box more-about-reference";

    if (last != data){
      buttons[last].className = "references-box";
    }

    last = data;
  };

}]);

var app = angular.module('app');

app.controller('teamCtrl', ['$scope', function($scope){

  $scope.team = [
    {
      id: 0,
      name: "Kosmas",
      title: "Sales Manager",
      img: "kosmas",
      phone: "0152/26063684",
      email: "k.fischer@mondoit.de",
      skills: [],
      about: "Damit wir mit Ihnen erfolgreich sein können, benötigt es den engen Kontakt zu Ihrem Unternehmen. <br> Mit Kosmas finden sie zu Ihrem Fachbereich eine perfekte Verbindung zu Unseren Informatikern. <br> Sein künstlerisches Denken, sowie seine Fachkenntnisse im Kundenservice und Dienstleistung schafft eine sehr anregende Atmosphäre der Zusammenarbeiten. <br> Werden Sie mit Ihm zum dynamischen Duo. <a href='mailto:k.fischer@mondoit.de?subject=MondoIT'>k.fischer@mondoit.de</a> <br> Tel: 015226063684"
    },
    {
      id: 1,
      name: "Lejla",
      title: "Designer",
      img: "lejla_imamovic",
      phone: "000 111 222 333",
      email: "lejla.imamovic@mondoit.de",
      skills: ["Photoshop", "CS", "Ilustrator"],
      about: "Lejla hat einen Abschluss in Visual Communication Design. Die Grafik Designerin und Interface Designerin war bereits für verschiedene Projekte verantwortlich: Erstellen von komplexen Konzepten, Grafiken, Layouts und Corporate Identity Richtlinien für Marketing Materialien jeglicher Art. Darüber hinaus hat Lejla Erfahrung im 3D Modeling und Digital Effects."
    },
    {
      id: 2,
      name: "Nikolina",
      title: "Senior UX & UI Designer",
      img: "nikolina",
      phone: "000 111 222 333",
      email: "nikolina.jezidzic@mondoit.de",
      skills: ["UI & UX DESIGN", "DIGITAL MARKETING", "ATRAKDIFF", "ADOBE PHOTOSHOP", "GOOGLE ANALYTICS"],
      about: "Nikolina is Senior UX designer with great passion for graphic design and packaging as well. She has over 5 years of hands-on work experience in UI/UX design, rapid prototyping, and front-end development for rich Internet applications and mobile devices. Her responsibility is creating simple and delightful user experiences utilizing principals of user-centered design, to deliver intuitive design solutions."
    },
    {
      id: 3,
      name: "Bettina",
      title: "Social Media Manager",
      img: "bettina",
      phone: "000 111 222 333",
      email: "bettina@mondoit.de",
      skills: [],
      about: "Social Media hat heute seinen festen Platz im Marketing-Mix. Und jedes Unternehmen, das soziale Medien einsetzt steht vor der Herausforderung,  (fast) täglich frischen Content zu erstellen und die Gemeinschaft der Fans zu pflegen. Community-Managerin Dipl.-Oec. Bettina Halbach erstellt  konsequent  einzigartige und aktuelle Inhalte für Social Media Kanäle wie Facebook, Instagram, Twitter oder Google+  - Inhalte, die unterhalten, informieren und engagieren.  Social Media ist ein Ort, wo Gemeinschaften von Menschen mit gemeinsamen Interessen zusammenkommen können."
    },
    {
      id: 4,
      name: "Adnan",
      title: "Software Engineer",
      img: "adnan_cocalic",
      phone: "000 111 222 333",
      email: "adnan.cocalic@mondoit.de",
      skills: [],
      about: "Engagement, Fleiß, Integrität – Worte die Adnan in seinen Aufgaben als Entwickler beschreiben. Adnan würde nie „nein“ zu einer Aufgabe sagen, vermeidet es aber, falsche und unreale Versprechungen bezüglich des Endergebnisses zu geben. Das macht ihn zu einem sehr wertvollen und zuverlässigen Mitglied des Teams."
    },
    {
      id: 5,
      name: "Zoran",
      title: "Software Engineer",
      img: "zoran",
      phone: "000 111 222 333",
      email: "zoran@mondoit.de",
      skills: [],
      about: "Zoran ist Projektmanager und Mitbegründer der MondoIT. Mit seiner strukturiert logischen Art realisiert er alle Wünsche des Kunden. Er ist das Herzstück des Teams und gleichzeitig Senior-Entwickler in den Bereichen PHP, NET, SQL und PhoneGap mit mannigfaltiger Erfahrung in Web, mobilen Anwendungen, Online-Applikations-Entwicklungen und Affiliate-Marketing. Weiterhin erstrecken sich seine Kenntnisse über die Bereiche E-Commerce, Online-Stores und Soziale Netzwerke unter Anwendung von Responsive Websites Designs."
    },
    {
      id: 6,
      name: "Adnan",
      title: "Human Resource Manager",
      img: "adnan_radmilovic",
      phone: "000 111 222 333",
      email: "adnan.radmilovic@mondoit.de",
      about: ""
    },
    {
      id: 7,
      name: "Igor",
      title: "Software Engineer",
      img: "igor",
      phone: "000 111 222 333",
      email: "igor@mondoit.de",
      skills: [],
      about: "Igor ist ein PHP-Experte mit langjähriger professioneller Erfahrung auf diesem Gebiet. Er hat an vielen PHP-Projekten mitgewirkt, die er mit PHP Framework Codelgniter & Slim realisiert hat. Weiterhin besitzt er fundierte Kenntnisse im Arbeiten mit AngularJS und arbeitet sich unglaublich schnell in alle CMS-Systeme ein, die im IT-Markt erscheinen."
    },
    {
      id: 8,
      name: "Marko",
      title: "Software Engineer",
      img: "marko",
      phone: "000 111 222 333",
      email: "marko@mondoit.de",
      skills: [],
      about: "Marko war früher professioneller Wasserball-Spieler. Seine Eigenschaften als Kapitän aus dem Becken hat er in die Organisation und Realisierung von Software-Projekten übertragen. Er beschäftigt sich hauptsächlich mit wissenschaftlicher Forschung und arbeitet zurzeit an der Universität an seiner Doktorarbeit, die das Thema Computerwissenschaften behandelt. Marko ist Senior-Experte in den Bereichen Java, PHP und MySQL."
    },
    {
      id: 9,
      name: "Vildan",
      title: "Senoir Software Engineer",
      img: "vildan_tursic",
      phone: "000 111 222 333",
      email: "vildan.tursic@mondoit.de",
      skills: ["AngularJS", "TypeScript", "NodeJS", "Polymer", "Material Design"],
      about: "Vildan ist JavaScript Experte (Angular-JS, Node-JS and Polymer guru), mit fundiertem Wissen und Verständnis für Web-Technologien und Entwicklungen. Sein Knowhow deckt ebenso die Bereiche der noSQL Datenbanken (Mongodb) sowie Android und Windows Phone Entwicklungen ab. Seine UX und UI Fähigkeiten werden durch seinen künstlerischen Hintergrund hervorgehoben, wodurch er es schaffte maßgeschneiderte Lösungen mit hervorragender Bedienbarkeit zu erschaffen. Mit seiner zielstrebigen Einstellung ist er immer auf der Suche nach den aktuellsten Trends in der Entwicklung."
    },
    {
      id: 10,
      name: "Selvin",
      title: "Senior Software Engineer",
      img: "selvin",
      phone: "000 111 222 333",
      email: "selvin.fehric@mondoit.de",
      about: "Selvin hat einen Master Abschluss in Computerwissenschaften. Er besitzt einen großen Erfahrungsschatz im Software Development. Sein Hauptaugenmerk liegt auf der Entwicklung komplexer Web Applikationen unter der Verwendung von Open-Source-Technologien wie PHP und MySQL auf Linux sowie Microsoft Technologien wie C#, ASP.NET MVC und MSSQL. Er hat weiterhin ein umfassendes Wissen über Web Services, RESTful APIs, WCF Services sowie Erfahrung in der Entwicklung von Desktop Applikationen mittels .NET und Java."
    },
    {
      id: 11,
      name: "Vladimir",
      title: "Software Engineer",
      img: "vladimir",
      phone: "000 111 222 333",
      email: "vladimir@mondoit.de",
      skills: [],
      about: "Vladimir hat mit seiner präzisen Art viele Applikationen im Bereich der mobilen Telefonie realisiert. Als Experte im Organisieren von Database-Architekturen ist er eine große Stütze für das Team. Vladimir ist einer der wenigen IOS-Entwickler, dessen Anwendungen auch heute noch funktionieren."
    },
    {
      id: 12,
      name: "Ognjen",
      title: "Software Engineer",
      img: "ognjen",
      phone: "000 111 222 333",
      email: "ognjen@mondoit.de",
      skills: [],
      about: "Mit mehr als 10 Jahren Arbeitserfahrung auf dem Gebiet Android und ASP.NET ist Ognjen ständig fokussiert auf die neusten Entwicklungen dieser IT-Technologien. Somit kann er unseren Kunden immer die aktuellsten Lösungen aus diesen Bereichen anbieten. Seine Fähigkeit sich  immer genau in den Kunden hineinzuversetzen macht ihn zu einem geschätzten Mitglied unseres Teams."
    },
    {
      id: 13,
      name: "Adnan",
      title: "Software Engineer",
      img: "adnan_memija",
      phone: "000 111 222 333",
      email: "adnan.memija@mondoit.de",
      skills: ["php", "C#", "wordpress"],
      about: "Als Web-Designer, Web-Programmierer und Grafik-Designer hat Adnan Erfahrung bei der Durchführung verschiedener Projekte, in denen er all diese Kenntnisse gleichzeitig einsetzen kann, um ein Ergebnis von höchster Qualität zu erzielen. Die Bandbreite der Technologien mit denen er arbeitet erstreckt sich von Bild- über Videobearbeitungssoftware bis hin zu Web-Anwendungen zur Erstellung von Webseiten. Er kann sich hervorragend auf Kundenbedürfnisse einstellen. Bei ihm wird Customer Experience groß geschrieben."
    }
  ];

  $scope.showMember = function(id) {
    if(id == undefined){
      id = 0;
    }
    $scope.teamMember = $scope.team[id];
  };
  $scope.showMember();

  var idNav = 0;

  $scope.navigate = function (num) {

    idNav += num;

    if (idNav >= $scope.team.length){
      idNav = 0;
    } else if (idNav <= 0) {
      idNav = $scope.team.length;
    }

    $scope.teamMember = $scope.team[idNav];

  }

}]);
