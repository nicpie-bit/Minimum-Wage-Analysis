function init() {
    var dropdown = d3.select("#line") //referencing back to html  and appending dropdown
    ////dropdown.html("");
    d3.json("/api/wages/postgres").then(function (data) {console.log(data)
        data.forEach((place) => {console.log(place)
            dropdown.append("option")
                .text(place.State)
                .property("value", place.State)
        
                var trace1 = {
                    x: place.Year,
                    y: place.EffectiveMinimumWage,
                    mode: 'lines+markers'
                };
            
                var trace2 = {
                    x: place.Year,
                    y: place.FederalMinimumWage,
                    mode: 'lines+markers'}
        
                    var data = [trace1, trace2];
    
                    Plotly.newPlot('line', data);    
        
        
                });

        
        
    
       
    });
};

init();