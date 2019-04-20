
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './styles.css';
import {Furniture} from "./furniture-data"

let furnitureData = new Furniture();
let promise = furnitureData.getAllFurniture();

function isDeliverable(deliverable){
  if(deliverable === true){
    return "Yes";
  }
  return "No";
}

function showAll(){
  for (let i = 0; i < 15; i++) {
    promise.then(function(response) {
      let resp = JSON.parse(response);
      let deliver =  resp.body.data[i].deliverable;
      $('.showFurniture').prepend(
        `<tr>
        <td>${resp.body.data[i].id}</td>
        <td>${resp.body.data[i].name}</td>
        <td>${resp.body.data[i].description}</td>
        <td>${resp.body.data[i].colors}</td>
        <td>${resp.body.data[i].type}</td>
        <td>${isDeliverable(deliver)}</td>
        <td>$${resp.body.data[i].cost}</td>
        <td>${resp.body.data[i].stock}</td>
        <td><a href="${resp.body.data[i].imageUrl}"><img src="${resp.body.data[i].imageUrl}" width="120" height="100"></a></td>
        <tr>`);
    }, function(error) {
      $('.showErrors4').text(`There was an error processing your request: ${error.message}`);
    });
  }
}




$(document).ready(function() {
  showAll();
  $('#show-all').click(function() {
    $('.showFurniture').empty();
    showAll();
  });

  $('#show-by-category').click(function() {
    let category = $("#category").val();
    $('.showFurniture').empty();

    for (let i = 0; i < 15; i++) {
      promise.then(function(response) {
        let resp = JSON.parse(response);
        let deliver =  resp.body.data[i].deliverable;
        if(resp.body.data[i].type === category){
          console.log(category);

          $('.showFurniture').prepend(
            `<tr>
            <td>${resp.body.data[i].id}</td>
            <td>${resp.body.data[i].name}</td>
            <td>${resp.body.data[i].description}</td>
            <td>${resp.body.data[i].colors}</td>
            <td>${resp.body.data[i].type}</td>
            <td>${isDeliverable(deliver)}</td>
            <td>$${resp.body.data[i].cost}</td>
            <td>${resp.body.data[i].stock}</td>
            <td><a href="${resp.body.data[i].imageUrl}"><img src="${resp.body.data[i].imageUrl}" width="120" height="100"></a></td>
            <tr>`);
        }

      }, function(error) {
        alert("Something went wrong!");
      });
    }

  });

});
