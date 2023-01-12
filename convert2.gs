// suppose we choose 3 columns (column #6, 7, 8). Each column asks about a specific feature in IPS.
// As an example, I picked these 3 features to be: time horizon, asset allocation, risk tolerance.


// column#7 determines asset allocation, with the question being 'How are you going to allocate your
// asset in percentage (stock, band, cash)?'
// The answer would contain n% stock, n% band, n% cash.
// Example: 60% stock, 30% bond, 10% cash.



function assignAllocation(s){
    s = s.trim();
    let result = [];

    // find index i, j, k of the substrings 'stock', 'bond', and 'cash'.
    let i = s.indexOf('stock');
    let j = s.indexOf('bond');
    let k = s.indexOf('cash');

    // s[i - 1] is space and s[i - 2] is '%'. So we start from s[i - 3] and move backwards until we encounter a space or reach the
    // beginning of the answer. We use the same approach fro indices j and k.

    let all_indices = [i, j, k];

    all_indices.forEach((index) => {
        index = index - 3;
        let result_item = '';

        while(index >= 0 && s[index] !== ' '){
            result_item = s[index] + result_item;
            index--;
        }
        result_item = Number(result_item);
        result.push(result_item)

    })

    // result is a list of 3 items where item1= stock percentage, item2 = bond percentage, item3 = cash percentage
    return result;


}
