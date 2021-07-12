var BarChart=null;


// Create plot function 
function BuildBarPlot() {
    var dropdownMenu = d3.select("#selYear");
    var dataset = dropdownMenu.property("value");

    // Fetch data 
    d3.json(`/api/wagesbyyear/${dataset}`, function (selectedyear) {

        // Define variables
        var yeardata = selectedyear;
        var states = yeardata.map(d => d.State)
        var minimumWage = yeardata.map(d => d.EffectiveMinimumWage)


        // Initiate chart.js      
        var ctx = document.getElementById('myBarChart').getContext('2d');

        // Remove previous chart selection 
        if(BarChart!=null){
            BarChart.destroy();
        }
        
        // Build new chart based on selected value
        BarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: states,
                datasets: [{
                    label: `Minimum Wage by State in ${dataset}`,
                    data: minimumWage,
                    backgroundColor: 'rgba(54, 162, 235, 0.4)',
                    borderColor: 'rgb(54, 162, 235,)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 15,
                        title: {
                            display: true,
                            text: 'Minimum Wage in Dollars'
                        }
                    },
                    x: {
                        title:{
                            display: true, 
                            text: 'State'
                        }
                    }
                }
            }
        })
    })
};

// Create dropdown function 
function changeYear() {


    d3.selectAll("#selYear").on("change", BuildBarPlot);

    var yeardropdown = d3.select("#selYear") 

    d3.json("/api/years", function (data) {
        data.forEach((year) => {

            yeardropdown.append("option")
                .text(year)
                .property("value", year)

        });
    });

}

changeYear();

