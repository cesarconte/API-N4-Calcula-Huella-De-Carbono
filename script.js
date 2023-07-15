async function fetchData() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer GZ83GV9QD349QHMRXTJBAYA4DQMQ");
      myHeaders.append("Content-Type", "application/json");
  
      // Vehicle data
      const requestDataVehicle = [
        {
          emission_factor: {
            activity_id: "passenger_vehicle-vehicle_type_car-fuel_source_diesel-distance_na-engine_size_medium",
            data_version: "^1"
          },
          parameters: {
            distance: 450,
            distance_unit: "km",
            passengers: 1
          }
        }
      ];
  
      const requestOptionsVehicle = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestDataVehicle),
        redirect: 'follow'
      };
  
      const responseVehicle = await fetch("https://beta4.api.climatiq.io/batch", requestOptionsVehicle);
      const resultVehicle = await responseVehicle.json();
  
      console.log(resultVehicle);
  
      // Flight data
      const requestDataFlight = {
        legs: [
          {
            from: "OVD",
            to: "MAD",
            passengers: 1,
            class: "economy"
          }
        ]
      };
  
      const requestOptionsFlight = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestDataFlight),
        redirect: 'follow'
      };
  
      const responseFlight = await fetch("https://beta4.api.climatiq.io/travel/flights", requestOptionsFlight);
      const resultFlight = await responseFlight.json();
  
      console.log(resultFlight);
  
      // Train data
      const requestDataTrain = {
        emission_factor: {
          id: "6075062f-6c1d-465c-b5bd-bc804b3f0fd1"
        },
        parameters: {
          passengers: 1,
          distance: 450,
          distance_unit: "km"
        }
      };
  
      const requestOptionsTrain = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestDataTrain),
        redirect: 'follow'
      };
  
      const responseTrain = await fetch("https://beta4.api.climatiq.io/estimate", requestOptionsTrain);
      const resultTrain = await responseTrain.json();
  
      console.log(resultTrain);
  
      const dataTable = document.getElementById("data-table");
  
      // Vehicle data
      const rowVehicle = document.createElement("tr");
      const activityCellVehicle = document.createElement("td");
      const distanceCellVehicle = document.createElement("td");
      const emissionsCellVehicle = document.createElement("td");
  
      activityCellVehicle.textContent = resultVehicle.results[0].emission_factor.name;
      distanceCellVehicle.textContent = `${requestDataVehicle[0].parameters.distance} kms`;
      emissionsCellVehicle.textContent = `${resultVehicle.results[0].co2e.toFixed(2)} ${resultVehicle.results[0].co2e_unit}`;
  
      rowVehicle.appendChild(activityCellVehicle);
      rowVehicle.appendChild(distanceCellVehicle);
      rowVehicle.appendChild(emissionsCellVehicle);
  
      dataTable.appendChild(rowVehicle);
  
      // Flight data
      const rowFlight = document.createElement("tr");
      const legCellFlight = document.createElement("td");
      const distanceCellFlight = document.createElement("td");
      const emissionsCellFlight = document.createElement("td");
  
      legCellFlight.textContent = `Flight from ${requestDataFlight.legs[0].from} to ${requestDataFlight.legs[0].to}`;
      distanceCellFlight.textContent = "450 kms";
      emissionsCellFlight.textContent = `${resultFlight.co2e.toFixed(2)} ${resultFlight.co2e_unit}`;
  
      rowFlight.appendChild(legCellFlight);
      rowFlight.appendChild(distanceCellFlight);
      rowFlight.appendChild(emissionsCellFlight);
  
      dataTable.appendChild(rowFlight);
  
      // Train data
      const rowTrain = document.createElement("tr");
      const activityCellTrain = document.createElement("td");
      const distanceCellTrain = document.createElement("td");
      const emissionsCellTrain = document.createElement("td");
  
      activityCellTrain.textContent = resultTrain.emission_factor.name;
      distanceCellTrain.textContent = `${requestDataTrain.parameters.distance} kms`;
      emissionsCellTrain.textContent = `${resultTrain.co2e.toFixed(2)} ${resultTrain.co2e_unit}`;
  
      rowTrain.appendChild(activityCellTrain);
      rowTrain.appendChild(distanceCellTrain);
      rowTrain.appendChild(emissionsCellTrain);
  
      dataTable.appendChild(rowTrain);
    } catch (error) {
      console.log('error', error);
    }
  }
  
  fetchData();
  