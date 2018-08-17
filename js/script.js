//INITIALIZING
var category = document.getElementById('category-box');
var forces = document.getElementById('forces-box');

//FETCHING CATEGORIES IN COMBO-BOX
fetch("https://data.police.uk/api/crime-categories").then(function(values){  
      values.json().then(function(values){  
    	for (var i=0; i<values.length; i++) {
         	var options = document.createElement("option");
        	options.setAttribute("value", values[i].url);
        	options.innerHTML = values[i].name;
        	category.appendChild(options)
    	}    
      });  
    }  
  ).catch(function(error) {  
    console.error('Fetch Error in Category : ', error);  
  });


  //FETCHING FORCES IN COMBO-BOX
  fetch("https://data.police.uk/api/forces").then(function(values){
  	values.json().then(function(values){
  		for(var i=0; i<values.length; i++){
  			var options = document.createElement("option");
        	options.setAttribute("value", values[i].id);
        	options.innerHTML = values[i].name;
        	forces.appendChild(options)
  		}
  	})
  }).catch(function(error){
  	console.log('Fetch Error in Forces : ', error);
  })

//SEARCH
function search(){
	var selectedCategory = document.getElementById('selectedCategory').value;
	var selectedForces = document.getElementById('selectedForce').value;
	var url = "https://data.police.uk/api/crimes-no-location?category=" + selectedCategory + "&force=" + selectedForces;
	console.log(url);
	fetch(url).then(function(values){
		return values.json()
	}).then(function(values){
		if(!values.length){
			alert("No Crimes Found.....");
		}
		else{
			console.log(values);
			var table = document.getElementById('tables');
			for(var j=0; j < values.length; j++){
				var row = document.createElement('tr');
				var column_1 = document.createElement('td');
				var column_2 = document.createElement('td');
				var column_3 = document.createElement('td');
				var column_4 = document.createElement('td');
				var column_5 = document.createElement('td');
				column_1.innerHTML = j;
				column_2.innerHTML = values[j].id;
				column_3.innerHTML = values[j].category;
				column_4.innerHTML = values[j].month;
				if (values[j].outcome_status != null) {
                    column_5.innerHTML = values[j].outcome_status.category;
                } else {
                    column_5.innerHTML = "-";
                }
                row.appendChild(column_1);
                row.appendChild(column_2);
                row.appendChild(column_3);
                row.appendChild(column_4);
                row.appendChild(column_5);
                table.appendChild(row);
			}	
		}
	})
}

//CHECKING SERVICE WORKER
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./service-worker.js').then(function(){
    console.log("Registerd Successfully");
  })
}