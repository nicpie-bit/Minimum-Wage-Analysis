// Put in app.py
@app.route('/api/years')
def get_years():
    years = db.session.query(Wage.Year).distinct().all()
    data = [row[0] for row in years]
    return jsonify(data)

@app.route('/api/wages/<year>')
def yearly_wage(selectedyear):
    wages_by_year = db.session.query(Wage).filter_by(Year = selectedyear)  
    year_data = []
    for year in years: 
        data.append


 //Put in index where we want the chart to go. 
<div>
    <canvas id="myBarChart" width="400" height="400"></canvas>
</div>

<script>

var BarChart;


function BuildBarPlot(data){
   // Fetch data and console log 
    d3.json("/api/wages/<year>").then(function(data) {
        console.log(data);
        // Define variables
        var state = data.State; 
        var year = data.Year; 
        var minimumWage = data.EffectiveMinimumWage;
        //xlabels.push(State);

        //const xlabels = [];

    // Initiate chart.js    
    var ctx = document.getElementById('myBarChart').getContext('2d');
    var change = document.getElementById("change_year");
    // Get selected value from the dropdown
    var selected = change.options[change.selectedIndex].value;
    BarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: state,
            datasets: [{
                label: 'Minimum Wage',
                data: minimumWage,
                backgroundColor: barColors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    })
};



</script>