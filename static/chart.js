function updatePlotly() {
    var dropdownMenu = d3.select("#selState");
    var dataset = dropdownMenu.property("value");
    console.log(dataset);


    d3.json(`/api/wages/${dataset}`).then(function (statename) {
        console.log(statename)
        var statedata = statename;
        
        var minwage = []

        for (state in statedata){

            minwage.push({

                "Year": state.Year,
                "EffectiveMinimumWage": state.EffectiveMinimumWage,
                "FederalMinimumWage": state.FederalMinimumWage

            })

        return jsonify(minwage)}



        var trace1 = {
            x: state.Year,
            y: state.EffectiveMinimumWage,
            mode: 'lines+markers'
        };

        var trace2 = {
            x: state.Year,
            y: state.FederalMinimumWage,
            mode: 'lines+markers'
        };

        var data = [trace1, trace2];







        Plotly.newPlot('line', trace1);
    });



}

function init() {


    d3.selectAll("#selState").on("change", updatePlotly);

    var dropdown = d3.select("#selState") //referencing back to html  and appending dropdown

    d3.json("/api/states").then(function (data) {
        console.log(data)
        data.forEach((place) => {
            console.log(place)
            dropdown.append("option")
                .text(place)
                .property("value", place)

        });
    });

}

init();