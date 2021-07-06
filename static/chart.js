function linedata(data)

function init() {
    var dropdown = d3.select("#") //referencing back to html  and appending dropdown
    d3.csv("data/Minimum Wage Data.csv").then(function (data) {
        data.State.forEach((state) => {
            dropdown.append("option")
                .text(state)
                .property("value", state)
        });

        var trace1 = {
            x: data.Year(),
            y: data.EffectiveMinimumWage(),
            type: 'scatter'
        };
    
        var trace2 = {
            x: data.Year(),
            y: data.FederalMinimumWage(),
            type: 'scatter'
        };
    
        var data = [trace1, trace2];
    
        Plotly.newPlot('line', data);
    })
}