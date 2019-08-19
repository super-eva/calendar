var app = angular.module("myApp", []);

app.controller("mainController", function($rootScope) {

	var self = this;
	var today = new Date();
	$rootScope.currentMonth = today.getMonth()+1;
    $rootScope.currentYear = today.getFullYear();
    $rootScope.selectedDate = { };
    $rootScope.displayDate = '';

    $rootScope.viewType = 'week';

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];    
	$rootScope.getMonthName = function(monthNum){
    	return monthNames[monthNum-1];
    }

    $rootScope.changeView = function(type){
		console.log(type);
    	$rootScope.viewType = type;
    }

    $rootScope.getClass = function(obj){
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

    self.setValue = function(displayDate){
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