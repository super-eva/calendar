app.controller("weekCtrl", function($rootScope, $scope) {
    
    $scope.weeks = getWeeks($rootScope.currentYear, $rootScope.currentMonth);

    $rootScope.$watch('selectedDate', function(newValue, oldValue){
        if(newValue != oldValue){
            $rootScope.currentYear = $rootScope.selectedDate.year;
            $rootScope.currentMonth = $rootScope.selectedDate.month;
            $scope.weeks = getWeeks($rootScope.currentYear, $rootScope.currentMonth);
            console.log($rootScope.displayDate);
        }
    });

    function Day(year, month, date, isPrev, isNext, isSelected, isToday) {
        this.year = year,
        this.month = month,
	    this.date = date;
	    this.isPrev = isPrev;
	    this.isNext = isNext;
	    this.isSelected = isSelected;
        this.isToday = isToday;
	}

    function getWeeks(year, month){

    	let numOfDays = new Date(year, month, 0).getDate();
    	let numOfDays_lastmonth = new Date(year, month-1, 0).getDate();
    	
    	let weekdays = [];
    	let weeks = [];

    	//if first day is not sunday, add prev month days
		let firstDay = new Date(year, month-1, 1).getDay();
		if(firstDay !== 0){
			for(let i=firstDay; i>0; i--){
				let day = new Day(year, month-1, numOfDays_lastmonth-i+1, true, false);
				weekdays.push(day);
			}
		}

		//add this month days
    	for(let i=0;i<numOfDays;i++)
		{
			let day = new Day(year, month, i+1, false, false, isDateSelected(i+1), isToday(i+1));
			weekdays.push(day);     
		}

		//add next month days
		let remainDays = 42 - firstDay - numOfDays;
		for(let i=0; i<remainDays; i++){
			let day = new Day(year, month+1, i+1, false, true);
			weekdays.push(day);
		}	

		//divide weekdays into 6 weeks
		weeks.push(weekdays.slice(0,7));
		weeks.push(weekdays.slice(7,14));
		weeks.push(weekdays.slice(14,21));
		weeks.push(weekdays.slice(21,28));
		weeks.push(weekdays.slice(28,35));
		weeks.push(weekdays.slice(35,42));
        
		return weeks;
    }

    function isDateSelected(date){   
        if(date === $rootScope.selectedDate.date 
            && $rootScope.currentMonth === $rootScope.selectedDate.month
            && $rootScope.currentYear === $rootScope.selectedDate.year){
            return true;
        }
        return false;
    }

    function isToday(date){

        let today = new Date();
        if(date === today.getDate()
            && $rootScope.currentMonth === (today.getMonth()+1)
            && $rootScope.currentYear === today.getFullYear()){
            return true;
        }
        return false;   
    }

    $scope.prevMonth = function(){
    	//change to pre year if exceed the limit
    	if($rootScope.currentMonth - 1 === 0){
    		$rootScope.currentYear -= 1;
    		$rootScope.currentMonth = 12;
    	}
    	else{
    		$rootScope.currentMonth -= 1;	
    	}
    	$scope.weeks = getWeeks($rootScope.currentYear, $rootScope.currentMonth);
    }

    $scope.nextMonth = function(){
    	//change to next year if exceed the limit
    	if($rootScope.currentMonth + 1 === 13){
    		$rootScope.currentYear += 1;
    		$rootScope.currentMonth = 1;
    	}
    	else{
    		$rootScope.currentMonth += 1;
    	}	
    	$scope.weeks = getWeeks($rootScope.currentYear, $rootScope.currentMonth);
    }

    $scope.selectDay =function(day){

        //if has prev selected date, reset it
        for(let week in $scope.weeks){
            for( let day in $scope.weeks[week]){
                if($scope.weeks[week][day].isSelected === true){
                    $scope.weeks[week][day].isSelected = false;
                }
            }
        }
       
        day.isSelected = true;
        $rootScope.selectedDate = day;
        $rootScope.displayDate = day.year + '-' + day.month + '-' + day.date;
        console.log($rootScope.displayDate);
        
        // if selected date is next month, jump to next calendar
        if(day.isNext){
            $scope.nextMonth();
        }
        // if selected date is prev month, jump to prev calendar
        if(day.isPrev){
            $scope.prevMonth();
        }

    }

});