// suppose we choose 3 columns (column #6, 7, 8). Each column asks about a specific feature in IPS.
// As an example, I picked these 3 features to be: time horizon, asset allocation, risk tolerance.


// column#8 determines risk tolerance, with the question being 'How much risk are you willing to take?'.
// The answer would contain words such as 'high', 'aggressive', 'medium', 'moderate', 'low', 'conservative'.



// s is the user's answer, timeHorizon is the associated numerical value of column#6 (the return value of assignTimeHorizon method
in convert2.gs), allocation is the associated numerical value of column#7 (the return value of assignAllocation method
in convert3.gs).
function assignRiskTol(s, time, allocation){

    s = s.trim();
    let result = 0;

    // We can have a dictionary with possible words metioned as keys, and assign numerical values(3, 2, 1) to them.
    // The mapping could be:

    const riskMapping = {'high': 3, 'aggressive': 3, 'medium': 2, 'moderate': 2, 'low': 1, 'conservative': 1};
    
    // Check if any of the keywords exist in our answer. If it does return the assigned score.
    const allWords = ['high', 'aggressive', 'medium', 'moderate', 'low', 'conservative'];

    allWords.forEach(word => {
        if(s.indexOf(word) !== -1){
            result = riskMapping[word];
            
            return result;
        }
    })


    // If none of these words exist in our answer, then we can use the answer of columns #6 and #7 to measure risk tolerance,
    // since there is a correlation between time horizon and asset allocation and risk tolerance.
    // Longer period of investment and higher stock allocation indicate higher willing to take risk.
    // We can pass these values as arguments.

    let timeScore = 0;
    let stockScore = 0;

    // timeHorizon can be either a single year or a list of years. If it is the latter case, we consider the maximum number of years
    // that the user is willing to invest.
    let years;
    Number.isInteger(time) ? years = time : years = time[time.length - 1];

    // allocation is a list of percentages where the first item indications stock allocation.
    let stock = allocation[0];

    // based on stock value, we assign a stock score.
    if(stock >= 70){
        stockScore = 3;
    }else if (stock >= 50){
        stockScore = 2;
    }else{
        stockScore = 1;
    }

    // based on the number of years in investment, we assign a time score.
    if(years >= 10){
        timeScore = 3;
    }else if (years >= 5){
        timeScore = 2;
    }else{
        timeScore = 1;
    }

    // risk tolerance score is the average of stock score and time score.
    result = (stockScore + timeScore) / 2;
    return result;

}
