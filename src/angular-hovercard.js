/* global angular */

'use strict';

angular.module('yaru22.directives.hovercard', [
]).provider('hovercard', function() {
  var _templateUrl = 'angular-hovercard.tmpl';

  this.templateUrl = function(template) {
    if (template) { _templateUrl = template; }
    return _templateUrl;
  };

  this.$get = function() {
    return {
      templateUrl: _templateUrl
    };
  };
}).directive('hovercard', function(hovercard) {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: hovercard.templateUrl,
    scope: {
      background: '@',
      hoverTmplUrl: '=',
      labelColor: '@',
      onHoverIn: '&',
      onHoverOut: '&',
      placement: '@',
      width: '@'
    },
    link: function($scope) {
      $scope.hoverLabelStyle = {};
      if ($scope.labelColor) {
        $scope.hoverLabelStyle.color = $scope.labelColor;
      }

      $scope.hoverCardStyle = {};
      if ($scope.background) {
        $scope.hoverCardStyle.background = $scope.background;
      }
      if ($scope.width) {
        $scope.hoverCardStyle.width = $scope.width;
      }

      if ($scope.placement) {
        // Split placement string into two words:
        // e.g. bottomLeft -> ["bottom", "left"]
        var positionStrings = $scope.placement.replace(/([A-Z])/g, ' $1')
            .toLowerCase()
            .split(' ');
        var positionObj = {};
        positionObj[positionStrings[0]] = true;
        positionObj[positionStrings[1]] = true;

        if (positionObj.bottom) {
          $scope.hoverCardStyle.bottom = '';
          $scope.hoverCardStyle.top = '-1em';
          $scope.hoverCardStyle['padding-bottom'] = '';
          $scope.hoverCardStyle['padding-top'] = '3em';
        }
        if (positionObj.top) {
          $scope.hoverCardStyle.bottom = '-1em';
          $scope.hoverCardStyle.top = '';
          $scope.hoverCardStyle['padding-bottom'] = '3em';
          $scope.hoverCardStyle['padding-top'] = '';
        }
        if (positionObj.left) {
          $scope.hoverCardStyle.left = '';
          $scope.hoverCardStyle.right = '-1em';
        }
        if (positionObj.right) {
          $scope.hoverCardStyle.left = '-1em';
          $scope.hoverCardStyle.right = '';
        }
      }  // if ($scope.placement)
    }  // link function
  };
});
