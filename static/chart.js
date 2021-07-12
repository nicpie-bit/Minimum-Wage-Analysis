function updatePlotly(selectedstate) {
    var dropdownMenu = d3.select("#selState");
    var dataset;
    if (selectedstate != "North Carolina"){
        dataset = dropdownMenu.property("value");
    }
    else {
        dataset = "North Carolina"
    }
    
    console.log(dataset);


    d3.json(`/api/wages/${dataset}`, function (statename) {

        var statedata = statename;
        console.log(statedata)

        var years = statedata.map(d => d.Year)
        console.log(years)

        var effectivewage = statedata.map(d => d.EffectiveMinimumWage)

        var fedwage = statedata.map(d => d.FederalMinimumWage)

        var trace1 = {
            x: years,
            y: effectivewage,
            mode: 'lines+markers'
        };

        var trace2 = {
            x: years,
            y: fedwage,
            mode: 'lines+markers'
        };

        var data = [trace1, trace2];







        Plotly.newPlot('line', data);
    });


}

function init() {


    d3.selectAll("#selState").on("change", updatePlotly);

    var dropdown = d3.select("#selState") //referencing back to html  and appending dropdown

    d3.json("/api/states", function (data) {

        data.slice(1).forEach((place) => {

            dropdown.append("option")
                .text(place)
                .property("value", place)

        });
        dropdown.append("option")
                .text(data[0])
                .property("value", data[0])
    });
    updatePlotly("North Carolina")
}

init();