app.controller("monthController", function($rootScope) {
	
	var self = this;
	self.months = getMonth(); 

	function Month(num, isSelected) {
	    this.num = num;
	    this.isSelected = isSelected;
	}

	function getMonth(){
		console.log("getNonth");
		let tempMonths = [];
		let months = [];
		
		for(let i=0; i<12; i++){
			tempMonths.push(new Month(i+1, isMonthSelected(i+1)));
		}

		months.push(tempMonths.slice(0,4));
		months.push(tempMonths.slice(4,8));
		months.push(tempMonths.slice(8,12));
		
		return months;
	}

	function isMonthSelected(month){
		if(month === $rootScope.selectedDate.month 
			&& $rootScope.currentYear === $rootScope.selectedDate.year){
			return true;
		}
		return false;
	}

    self.prevYear = function(){
    	$rootScope.currentYear -= 1;	
    	self.months = getMonth(); 
    }

    self.nextYear = function(){
    	$rootScope.currentYear += 1;    
    	self.months = getMonth(); 	
    }

    self.selectMonth = function(month){
        $rootScope.currentMonth = month.num;
        $rootScope.changeView('week');
    }

});
