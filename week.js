app.controller("weekController", function($rootScope) {
    
    var self = this;
    self.weeks = getWeeks($rootScope.currentYear, $rootScope.currentMonth);

    //when user type the date, refresh data
    $rootScope.$watch('selectedDate', function(newValue, oldValue){
        if(newValue != oldValue){
            $rootScope.currentYear = $rootScope.selectedDate.year;
            $rootScope.currentMonth = $rootScope.selectedDate.month;
            self.weeks = getWeeks($rootScope.currentYear, $rootScope.currentMonth);
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

        this.fullDate = new Date(year, month, date);
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

    self.prevMonth = function(){
    	//change to pre year if exceed the limit
    	if($rootScope.currentMonth - 1 === 0){
    		$rootScope.currentYear -= 1;
    		$rootScope.currentMonth = 12;
    	}
    	else{
    		$rootScope.currentMonth -= 1;	
    	}
    	self.weeks = getWeeks($rootScope.currentYear, $rootScope.currentMonth);
    }

    self.nextMonth = function(){
    	//change to next year if exceed the limit
    	if($rootScope.currentMonth + 1 === 13){
    		$rootScope.currentYear += 1;
    		$rootScope.currentMonth = 1;
    	}
    	else{
    		$rootScope.currentMonth += 1;
    	}	
    	self.weeks = getWeeks($rootScope.currentYear, $rootScope.currentMonth);
    }

    self.selectDay =function(day){
        //if has selected date, reset it
        for(let week in self.weeks){
            for( let day in self.weeks[week]){
                if(self.weeks[week][day].isSelected === true){
                    self.weeks[week][day].isSelected = false;
                }
            }
        }
       
        //set new selected date
        day.isSelected = true;
        $rootScope.selectedDate = {
            year : day.year,
            month : day.month,
            date : day.date
        }
        $rootScope.displayDate = day.fullDate.Format('yyyy-MM-dd');
        $rootScope.isDateValid = true;

        //close the calendar after selecting date
        $rootScope.isShow = !$rootScope.isShow;
        
        // if the selected date belongs to next month, jump to next month
        if(day.isNext){
            self.nextMonth();
        }
        // if the selected date belongs to prev month, jump to prev month
        if(day.isPrev){
            self.prevMonth();
        }

    }

});