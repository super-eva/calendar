var app = angular.module("myApp", []);

app.controller("mainCtrl", function($rootScope, $scope) {

	var today = new Date();
	$rootScope.currentMonth = today.getMonth()+1;
    $rootScope.currentYear = today.getFullYear();
    $rootScope.selectedDate = { };
    $rootScope.displayDate = '';

    $scope.viewType = 'week';
    $scope.name = ""

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];    
	$scope.getMonthName = function(monthNum){
    	return monthNames[monthNum-1];
    }

    $scope.changeView = function(type){
    	$scope.viewType = type;
    }

    $scope.getClass = function(obj){
    	if(obj.isPrev){
    		return 'prev-month';
    	}
    	if(obj.isNext){
    		return 'next-month';
    	}
    	if(obj.isSelected){
    		return 'selected-day';
    	}
    	if(obj.isToday){
    		return 'today';
    	}
    }

    $scope.setValue = function(displayDate){
    	let regexp = /^\d{4}-\d{2}-\d{2}/g;
    	let result = displayDate.match(regexp);
    	
    	if(result && result.length > 0){
    		let date = displayDate.split('-');
    		console.log(date);
    		$rootScope.selectedDate = {
    			year : parseInt(date[0]),
		        month : parseInt(date[1]),
			    date : parseInt(date[2]),
			    isSelected : true
    		}
    	}

    	console.log($rootScope.displayDate);
    }
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
    	console.log(element);
        element.bind("keydown keypress", function (event) {
        	console.log(event);
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('datePicker', function () {
	return {
		restrict: 'AE',
		templateUrl: 'calendar.html',
		scope: {
			date: '=',
		},
		replace: true,
		link: function($scope, elem, attr, ctrl) {
	      console.debug($scope);
	      //var textField = $('input', elem).attr('ng-model', 'myDirectiveVar');
	      // $compile(textField)($scope.$parent);
	    }
	}
});
