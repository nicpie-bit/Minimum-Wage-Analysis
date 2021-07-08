function updatePlotly() { 
    var dropdownMenu = d3.select("#selState");
    var dataset = dropdownMenu.property("value");
    console.log(dataset)
}

function init() {


    d3.selectAll("#selState").on("change", updatePlotly);
    
    var dropdown = d3.select("#selState") //referencing back to html  and appending dropdown
    

    
    d3.json("/api/states").then(function (data) {console.log(data)
        data.forEach((place) => {console.log(place)
            dropdown.append("option")
                .text(place)
                .property("value", place)

            var x = place.forEach(place.Year)
            var y1 = place.forEach(place.EffectiveMinimumWage)
            var y2 = place.forEach(place.FederlMinimumWage)

            var places = []

            
        
                 var trace1 = {
                    x: x, 
                    y: y1,
                    mode: 'lines+markers'
                  };
            
                 var trace2 = {
                   x: x,
                   y: y2,
                   mode: 'lines+markers'
                  };
                      var data = [trace1, trace2];
                 
                    
        
            });

            

                Plotly.newPlot('lines+markers', data);  
        
    
       
    });
};

init();