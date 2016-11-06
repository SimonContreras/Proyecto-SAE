angular.module('app', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','ngMessages']);
angular.module('app').controller('PopoverDemoCtrl', function ($scope, $sce) {
});
angular.module('app').controller('CollapseDemoCtrl', function ($scope) {
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = false;
});
angular.module('app').controller('Clasificar', function ($scope, $http) {
});