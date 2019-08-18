app.controller("yearCtrl", function($rootScope, $scope) {
	
	//get decade start year
	let remainder = $rootScope.currentYear % 10;
	$scope.yearStart = $rootScope.currentYear - remainder;
	$scope.yearEnd = $scope.yearStart + 9;
	$scope.years = getYears($scope.yearStart, $scope.yearEnd);

	function Year(num, isPrev, isNext, isSelected) {
	    this.num = num;
	    this.isPrev = isPrev;
	    this.isNext = isNext;
	    this.isSelected = isSelected;
	}

	function getYears(start, end){

		let years = [];
		let tempYears = [];

		//last decade
		tempYears.push(new Year(start-1, true, false));

		//this decade
		for( let i=0; i<=end-start; i++){
			tempYears.push(new Year(start+i, false, false, isYearSelected(start+i)));
		}

		//next decade
		tempYears.push(new Year(end+1, false, true));

		years.push(tempYears.slice(0,4));
		years.push(tempYears.slice(4,8));
		years.push(tempYears.slice(8,12));

		return years;
	}

	function isYearSelected(year){
		if(year === $rootScope.selectedDate.year){
			return true;
		}
		return false;
	}

	$scope.prevDecade = function(){
    	$scope.yearStart -= 10;
    	$scope.yearEnd -= 10;	
    	$scope.years = getYears($scope.yearStart, $scope.yearEnd);
    }

    $scope.nextDecade = function(){
    	$scope.yearStart += 10;
    	$scope.yearEnd += 10;	  	
    	$scope.years = getYears($scope.yearStart, $scope.yearEnd);
    }

    $scope.selectYear =function(year){
    	$rootScope.currentYear = year.num;
    	$scope.changeView('month');
    }
});
