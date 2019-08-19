app.controller("yearController", function($rootScope) {
	
	var self = this;
	//get decade start year
	let remainder = $rootScope.currentYear % 10;
	self.yearStart = $rootScope.currentYear - remainder;
	self.yearEnd = self.yearStart + 9;
	self.years = getYears(self.yearStart, self.yearEnd);

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

	self.prevDecade = function(){
    	self.yearStart -= 10;
    	self.yearEnd -= 10;	
    	self.years = getYears(self.yearStart, self.yearEnd);
    }

    self.nextDecade = function(){
    	self.yearStart += 10;
    	self.yearEnd += 10;	  	
    	self.years = getYears(self.yearStart, self.yearEnd);
    }

    self.selectYear =function(year){
    	$rootScope.currentYear = year.num;
    	$rootScope.changeView('month');
    }
});
