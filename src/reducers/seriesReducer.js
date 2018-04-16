
const algorithmSeries = (state = {
    series: [1,2,3,4,5,6]
}, action) =>{
    switch (action.type) {
        case 'ADD_SERIES':
            return [
                {
                    series: action.payload
                }
            ];
        default:
            return state
    }

};

export default algorithmSeries