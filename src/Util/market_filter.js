const HORSE_RACING_EVENT_TYPE_ID = 7;
const GREYHOUND_EVENT_TYPE_ID = 4339;

module.exports = {
    
    createMarketFilter: function (evid_arr, country_arr, market_type_arr, start_time, end_time, max_results) {
        
        // Create a market filter using the supplied arrays of event type IDs, contries, market types
        // and a start and end time.
        // All input arrays AND start time string MUST not be empty!!!
        // If not, an empty string is returned.
        let filter_string = '';
        if (evid_arr.length === 0 || country_arr.length === 0 || market_type_arr.length === 0 || start_time.length === 0)
        {
            return filter_string;
        }
                
        filter_string += '"eventTypeIds":['; 
        for (let i = 0; i < evid_arr.length; i++)
        {
            filter_string += ('"' + evid_arr[i] + '"');
            if (i < evid_arr.length-1)
            {
                filter_string += ',';
            }
        }    
        filter_string += '],"marketCountries":['; 
        for (let i = 0; i < country_arr.length; i++)
        {
            filter_string += ('"' + country_arr[i] + '"');
            if (i < country_arr.length-1)
            {
                filter_string += ',';
            }
        }    
        filter_string += '],"marketTypeCodes":['; 
        for (let i = 0; i < market_type_arr.length; i++)
        {
            filter_string += ('"' + market_type_arr[i] + '"');
            if (i < market_type_arr.length-1)
            {
                filter_string += ',';
            }
        }    
        if (end_time.length === 0)
        {
            filter_string += ('],"marketStartTime":{"from":"' + start_time + '"}}');
        }
        else
        {
            filter_string += ('],"marketStartTime":{"from":"' + start_time + '","to":"' + end_time +'"}}');
        }        
        const market_projection_string = '"marketProjection":["MARKET_DESCRIPTION","RUNNER_METADATA","MARKET_START_TIME","EVENT","COMPETITION"]';
        filter_string += (',"sort":"FIRST_TO_START","maxResults":"' + max_results + '",' + market_projection_string + '}');    
        
        let filter = '{"filter":{' + filter_string;
        return filter;                
    },
    
    createMarketFilterByCompIDs: function (compid_arr, market_type_arr, start_time, end_time, max_results) {
        
        // Create a market filter using the supplied arrays of competition IDs and market types
        // and a start and end time.
        // All input arrays AND start time string MUST not be empty!!!
        // If not, an empty string is returned.
        let filter_string = '';
        if (compid_arr.length === 0 || market_type_arr.length === 0 || start_time.length === 0)
        {
            return filter_string;
        }
                
        filter_string += '"competitionIds":['; 
        for (let i = 0; i < compid_arr.length; i++)
        {
            filter_string += ('"' + compid_arr[i] + '"');
            if (i < compid_arr.length-1)
            {
                filter_string += ',';
            }
        }       
        filter_string += '],"marketTypeCodes":['; 
        for (let i = 0; i < market_type_arr.length; i++)
        {
            filter_string += ('"' + market_type_arr[i] + '"');
            if (i < market_type_arr.length-1)
            {
                filter_string += ',';
            }
        }    
        if (end_time.length === 0)
        {
            filter_string += ('],"marketStartTime":{"from":"' + start_time + '"}}');
        }
        else
        {
            filter_string += ('],"marketStartTime":{"from":"' + start_time + '","to":"' + end_time +'"}}');
        }        
        const market_projection_string = '"marketProjection":["MARKET_DESCRIPTION","RUNNER_METADATA","MARKET_START_TIME","EVENT","COMPETITION"]';
        filter_string += (',"sort":"FIRST_TO_START","maxResults":"' + max_results + '",' + market_projection_string + '}');    
        
        let filter = '{"filter":{' + filter_string;
        return filter;                
    },
}