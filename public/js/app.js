"use strict";

define([
  'angular',
  'angular-inbox',
  'angularRoute',
  'angularSanitize',
  'angularCookies',
  'angularAnimate',
  'angularStrap',
  'angularInfiniteScroll',
  'baobab.controller.app',
  'baobab.controller.threadList',
  'baobab.controller.thread',
  'baobab.controller.compose',
  'baobab.service.me',
  'baobab.service.scrollstate',
  'baobab.service.auth',
  'baobab.service.threads',
  'baobab.directive.inParticipants',
  'baobab.directive.inParticipantBubble',
  'baobab.directive.inBindIframeContents',
  'baobab.directive.hotkeys',
  'baobab.directive.autofocus',
  'baobab.directive.typewriter',
  'baobab.filter',
], function (angular) {
  // Controllers
  angular.module('baobab.controllers', [
    'baobab.controller.threadlist',
    'baobab.controller.thread',
    'baobab.controller.app',
    'baobab.controller.compose'
  ]);

  angular.module('baobab.services', [
    'baobab.service.me',
    'baobab.service.scrollstate',
    'baobab.service.auth',
    'baobab.service.threads',
  ]);

  angular.module('baobab.directives', [
    'baobab.directive.inParticipants',
    'baobab.directive.inBindIframeContents',
    'baobab.directive.inParticipantBubble',
    'baobab.directive.hotkeys',
    'baobab.directive.autofocus',
    'baobab.directive.typewriter',
  ]);

  return angular.module('baobab', [
    'inbox',
    'ngSanitize',
    'ngCookies',
    'ngRoute',
    'ngAnimate',
    'mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.popover',
    'infinite-scroll',
    'baobab.controllers',
    'baobab.filter',
    'baobab.services',
    'baobab.directives',
  ])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/thread/:id', {
    templateUrl: '/partials/thread.html',
    controller: 'ThreadCtrl as ThreadCtrl',
    resolve: {
    "$namespace": function($me) { return $me.namespacePromise; },
    }
    });
    $routeProvider.when('/mail/compose', {
    templateUrl: '/partials/compose-zen.html',
    });
    $routeProvider.when('/:tag', {
    templateUrl: '/partials/thread_list.html',
    controller: 'ThreadListCtrl as ThreadListCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/inbox'});
  }])

  .config(['$inboxProvider', '$sceDelegateProvider', function($inboxProvider, $sceDelegateProvider) {
    $inboxProvider.
    baseUrl('https://api.inboxapp.com').
    appId('xdfim6g4mbduytzjhn8ud490');

    $sceDelegateProvider.resourceUrlWhitelist([
      'self', $inboxProvider.baseUrl() + "/**"]);
  }]);
});

/* Helpers */
var _scope = function (selector) {
  return this.element(document.querySelector(selector)).scope();
};

var _clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

var _displayErrors = true;
window.onbeforeunload = function () {
  _displayErrors = false;
};

var _handleAPIError = function(error) {
  if (!_displayErrors)
    return;
  var msg = "An unexpected error occurred. (HTTP code " + error['status'] + "). Please try again.";
  if (error['message'])
      msg = error['message'];
  alert(msg);
};
