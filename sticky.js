angular.module('sticky', [])

.directive('sticky', ['$timeout', function($timeout){
  return {
    restrict: 'A',
    scope: {
      offset: '@',
    },
    link: function($scope, $elem, $attrs){
      var anchorWidth;
      var anchorHeight;

      function setAnchorWidth() {
        return anchorWidth = window.getComputedStyle($elem.parent()[0], null).getPropertyValue('width');
      }

      function setAnchorHeight() {
        return anchorHeight = window.getComputedStyle($elem.parent()[0], null).getPropertyValue('height');
      }

      $timeout(function(){
        var offsetTop = $scope.offset || 0,
        $window = angular.element(window);

        // Check if our anchor has passed the top of the window
        //
        function checkSticky(){
          if ($elem[0].offsetHeight === 0) return; // return if not visible

          if ($elem.parent()[0].getBoundingClientRect().top - offsetTop <= 0 ) {
            $elem.css({ top: offsetTop + 'px', position: 'fixed', width: anchorWidth || setAnchorWidth() });
            $elem.parent().css({ height: anchorHeight || setAnchorHeight() }); // prevent visual reflow
            if (!$elem.hasClass('stuck')) $elem.addClass('stuck');
          } else {
            $elem.css({ top: '', position: '', width: '' });
            $elem.parent().css({ height: '' });
            if ($elem.hasClass('stuck')) $elem.removeClass('stuck');
          }
        }

        // keep position after changing our sticky element to position fixed
        $elem.wrap("<div class='sticky-anchor'></div>");
        setAnchorWidth();
        setAnchorHeight();

        $window.on('scroll', checkSticky);
      });
    },
  };
}]);
