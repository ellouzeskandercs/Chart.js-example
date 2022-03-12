var locations = ["Tirana", "Andorra la Vella", "Vienna", "Minsk", "Brussels", "Sarajevo", "Sofia", "Zagreb", "Prague", "Copenhagen", "Tallinn", "Helsinki", "Paris", "Berlin", "Athens", "Budapest", "Reykjavik", "Dublin", "Rome", "Riga", "Vaduz", "Vilnius", "Luxembourg", "Valletta", "Chisinau", "Monaco", "Podgorica", "Amsterdam", "Skopje", "Oslo", "Warsaw", "Lisbon", "Bucharest", "Moscow", "San Marino", "Belgrade", "Bratislava", "Ljubljana", "Madrid", "Stockholm", "Bern", "Kiev", "London"]
var myChart

function plotCurve(data){
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  
  if (myChart) {
    myChart.destroy()
  } 

  myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

function setUp(){
  document.getElementById("european-town-select-elt").innerHTML = locations.sort().map(origin => `<option value='${origin}'>${origin}</option>`).join("")
}

function processResults(results){
  data = {
    labels : results.map((result) => result.day),
    datasets: []
  }

  if(document.getElementById("max-curve-include-checkbox").checked){
    data.datasets.push({
      label: 'Max',
      backgroundColor: 'rgb(255, 0, 0)',
      borderColor: 'rgb(255, 0, 0)',
      data: results.map((result) => result.max_temp.c),        
    })
  }

  if(document.getElementById("min-curve-include-checkbox").checked){
    data.datasets.push({
      label: 'Min',
      backgroundColor: 'rgb(0, 255, 0)',
      borderColor: 'rgb(0, 255, 0)',
      data: results.map((result) => result.min_temp.c),        
    })
  }

  plotCurve(data)
}

function callApi(){
  const location = document.getElementById("european-town-select-elt").value

  // Full documentation on https://weatherdbi.herokuapp.com/documentation/v1
  fetch(`https://weatherdbi.herokuapp.com/data/weather/${location}`)
  .then(res=>res.json())
  .then(res=> {
    console.log(res)
    processResults(res.next_days)
  })
}

setUp()













