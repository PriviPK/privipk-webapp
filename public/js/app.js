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
  'baobab.service.namespace',
  'baobab.service.contacts',
  'baobab.service.tags',
  'baobab.service.scrollstate',
  'baobab.service.auth',
  'baobab.service.threads',
  'baobab.directive.inParticipants',
  'baobab.directive.inParticipantBubble',
  'baobab.directive.inBindIframeContents',
  'baobab.directive.hotkeys',
  'baobab.directive.autofocus',
  'baobab.directive.typewriter',
  'baobab.directive.autocomplete',
  'baobab.directive.scribe',
  'baobab.directive.dropzone',
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
    'baobab.service.contacts',
    'baobab.service.namespace',
    'baobab.service.tags',
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
    'baobab.directive.autocomplete',
    'baobab.directive.scribe',
    'baobab.directive.dropzone',
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
      templateUrl: 'partials/thread.html',
      controller: 'ThreadCtrl as ThreadCtrl',
      resolve: ['$namespaces-promise']
    });
    $routeProvider.when('/mail/compose', {
      templateUrl: 'partials/compose-zen.html',
      resolve: ['$namespaces-promise']
    });
    $routeProvider.when('/mail/compose/:draft_id', {
      templateUrl: 'partials/compose-zen.html',
      resolve: ['$namespaces-promise']
    });
    $routeProvider.when('/:tag', {
      templateUrl: 'partials/thread_list.html',
      controller: 'ThreadListCtrl as ThreadListCtrl',
      resolve: ['$namespaces-promise']
    });
    $routeProvider.otherwise({redirectTo: '/inbox'});
  }])

  .config(['$inboxProvider', '$sceDelegateProvider', function($inboxProvider, $sceDelegateProvider) {

    // Replace `false` with your Inbox App ID
    var inboxAppID = false;
    //var inboxAppID = "1";

    // Delete this code once you've added your Inbox App ID
    // ---
    var appIdCookie = 'baobab-app-id=';
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(appIdCookie) != -1)
          inboxAppID = c.substring(appIdCookie.length,c.length);
    }
    if (inboxAppID === false)
      window.location = 'set-app-id.html';
    // ---

    var url = 'https://api.inboxapp.com';

    if (inboxAppID.indexOf("localhost") == 0) {
      //url = 'http://localhost:5555';
      var i = inboxAppID.indexOf("-")
      if (i == -1) {
        url = 'http://nylas:5555';  // easily remap this to a non-local machine
      } else {
        // need to hack this in for accessing an Inbox webapp remotely:
        // If the nylas sync engine and the inbox webservice are runnning on host
        // A remotely, and you want to access the web service from host B, then
        // the JS code executing on host B will try to connect to 'nylas:5555'
        // which only host A has it mapped to its sync engine VM in its /etc/hosts
        // file.
        //
        // B could map nylas in its /etc/hosts to A's sync engine VM address,
        // but then B would be unable to run its own sync engine and webapp
        // because they would conflict with the nylas mapping in /etc/hosts
        //
        // For now, we just let host B map host A's nylas sync engine address
        // in /etc/hosts as 'nylas' + no
        // when host B connects to the webapp instead of localhost, it specifies
        // localhost-<no>, where <no> is some number in [0, \inf)
        // B has addded nylas+no to its /etc/hosts, so now the webapp will be
        // able to connect to the remote sync engine on host A

        var no = inboxAppID.substring(i + 1)
        var port = 5555 + parseInt(no)
        url = 'http://nylas' + no + ':' + port;
      }

      // the baobab code expects this to be localhost
      inboxAppID = "localhost"
    }

    $inboxProvider.baseUrl(url).appId(inboxAppID);

    $sceDelegateProvider.resourceUrlWhitelist([
      'self', $inboxProvider.baseUrl() + "/**"]);
  }]);
});



