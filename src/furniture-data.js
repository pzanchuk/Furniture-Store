export class Furniture {
  getAllFurniture() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = "https://it771mq5n2.execute-api.us-west-2.amazonaws.com/production/furniture";
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
