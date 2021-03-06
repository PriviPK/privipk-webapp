define ["angular"], (angular) ->

  angular.module('baobab.directive.hotkeys', [])

  .directive('bindKeys', ["$rootScope", ($rootScope) ->
    restrict: 'A',
    link: (scope, element, attrs) ->
      meta = false

      isMeta = (event) -> event.ctrlKey

      element.bind('keyup', (event) ->
        return true if (isMeta(event) || !meta)
        meta = false
        $rootScope.$broadcast("meta-up")
        true
      )

      element.bind('keydown', (event) ->
        return true if !isMeta(event) || meta
        meta = true
        $rootScope.$broadcast "meta-down"
        true
      )

      element.bind('keypress', (event) ->
        return true if !isMeta(event)
        action = $rootScope.keybindings[event.which]
        if action
          event.preventDefault()
          $rootScope.$broadcast("meta-used")
          action()
          return false
        true
      )
  ])

  .directive('hotkey', ["$rootScope", "$parse", "$location",
    ($rootScope, $parse, $location) ->
      restrict: 'A',
      link: (scope, element, attrs) ->
        $rootScope.keybindings = $rootScope.keybindings || {}
        action = undefined
        if attrs['ngClick']
          action = _.bind($parse(attrs['ngClick']), this, scope, {})
        else if element.is("a") && !!attrs["href"]
          action = ->
            $location.path(attrs["href"].replace(/^#/, ""))
            scope.$apply()
            console.log(attrs["href"])
        else
          return

        mapping =
          "enter": 13
        key = mapping[attrs['hotkey']] || attrs['hotkey'].charCodeAt(0)

        $rootScope.keybindings[key & ~(64 | 32)] = action

        timeout = undefined
        hint = $("<div class='hotkey-overlay'></div>")

        showHint = ->
          el = element
          hint
            .css("top", el.position().top)
            .css("left", el.position().left)
            .css("position", "absolute")
            .width(el.outerWidth())
            .height(el.outerHeight())
            .css("line-height", el.outerHeight()+"px")
            .text(attrs['hotkey'])
          hint.insertAfter(element)
          element.css('opacity', 0.2)

        hideHint = ->
          element.css('opacity', '')
          hint.remove()

        clearHint = ->
          if timeout
            window.clearTimeout(timeout)
          hideHint()

        scope.$on "meta-down", ->
          timeout = window.setTimeout(showHint, 500)

        scope.$on("meta-up", clearHint)
        scope.$on("meta-used", clearHint)

        scope.$on "$destroy", ->
          if ($rootScope.keybindings[key & ~(64 | 32)] == action)
            $rootScope.keybindings[key & ~(64 | 32)] = undefined
  ])
