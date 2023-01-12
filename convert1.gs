// Suppose we choose 3 columns (column #6, 7, 8). Each column asks about a specific feature in IPS.
// As an example, I picked these 3 features to be: time horizon, asset allocation, risk tolerance.


// column#6 determines time horizon, with the question being 'Enter the amount of time, you wish to keep 
// your money invested.'
// The answer would contain some digit and logically the word 'year' or 'years'.
// Examples include: 10 years, 1-3 years, 5 to 13 years.



// This function resemebles the parseInt() function in JavaScript.

function assignTimeHorizon(s){
    s = s.trim();
    let result = [];

    // In order to parse this answer and turn it into an integer, we have to look for the keywords.

    // First we look for '-'.
    let i = s.indexOf('-');

    if(i === -1){ // If the answer doesn't contain '-', we look for 'to'
        i = s.indexOf('to');
    }else{
        // CASE1, where '-' exists:
        // If s[i] is the letter '-', s[i - 1] and s[i + 1] are digits. We start from these positions and move forward and backward,
        // until we encounter a space or reach the beginning or end of the string to extract the number of years.

        let original_i = i;
        let result_item1 = ''
        let result_item2 = '';

        i = i - 1;
        while(i >= 0 && s[i] !== ' '){
            result_item1 = s[i] + result_item1;
            i--;
        }

        result_item1 = Number(result_item1);

        i = original_i;
        i = i + 1;
        while(i < s.length && s[i] !== ' '){
            result_item2 += s[i];
            i++;
        }

        result_item2 = Number(result_item2);
        
        for(let j = result_item1; j < result_item2 + 1; j++){
            result.push(j);
        }

        return result;

    }

    if(i === -1){ // If the answer doesn't contain 'to', we look for 'years'
        i = s.indexOf('years');
    }else{

        // CASE2, where 'to' exists:
        // If s[i] is the letter 't', s[i - 1] and s[i + 3] are digits. We start from these positions and move forward and backward,
        // until we encounter a space or reach the beginning or end of the string to extract the number of years.

        let original_i = i;
        let result_item1 = '';
        let result_item2 = '';

        i = i -2;
        while(i >= 0 && s[i] !== ' '){
            result_item1 = s[i] + result_item1;
            i--;
        }

        result_item1 = Number(result_item1);

        i = original_i;
        i = i + 3;
        while(i < s.length && s[i] !== ' '){
            result_item2 += s[i];
            i++;
        }

        result_item2 = Number(result_item2);
        for(let j = result_item1; j < result_item2 + 1; j++){
            result.push(j);
        }

        return result;

    }

    if(i === -1){ // If the answer doesn't contain 'years', we look for 'year'
        i = s.indexOf('year');
    }
    

    // CASE3, where '-' or 'to' do not exist:
    // If s[i] is the letter 'y', s[i - 1] is space, so we start from s[i - 2] and move backward until we encounter a space or 
    // we reach the beginning of s, to extract the number of years.
    result = '';
    i = i - 2;
    while(i >= 0 && s[i] !== ' '){
        result = s[i] + result;
        i--;
    }
    result = Number(result);


    return result;

}
