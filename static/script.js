function sendData() {
  // The data we should send.
  data = {
    twitter : $("#twit").val(),
    instagram : $("#insta").val(),
    facebook : $("#fb").val()
  };
  // The ajax poster
  $.ajax({
    type : "POST",
    dataType : "json",
    contentType : "application/json",
    data : JSON.stringify(data),
    // Push data to cloud
    url : "/pushMain/",

    // Calls once data recieved
    statusCode : {
      200 : function() {
        console.log("Sucessfully pushed data");
        window.location.pathname = '/loading'
      }
    }
  });
}

// Calls when waiting for data
function requestData() {
  console.log("DEBUG: REQUEST DATA CALLED");
  $.ajax({
    type : "POST",
    dataType : "json",
    contentType : "application/json",
    // Wait for data to load
    url : "/pushLoading/",

    statusCode : {
      200 : function() {
        // TODO: What do I do if I get a sucessfull call? change webpage to
        // modified results.html
        console.log("DEBUG: REQUEST DATA FINISHED");
        window.location.pathname = '/results'
      }
    }
  });
}

function displayData() {
  console.log("went here")

  //ERROR HERE
  $.ajax({
    type : "POST",
    dataType : "json",
    contentType : "application/json",
    url : "/curA",
    statusCode : {
      200 : function(att) {
        console.log("Sucessfully asked for data (attractions)");
        console.log(att);
        // TODO: shove google api here and use restaurant

        var all = att.attractions;
        var indivPlace = all.split("\n");
        
        indivPlace = indivPlace.slice(0, 3)
        console.log(indivPlace)
        if(indivPlace[2] == "") {
          indivPlace = indivPlace.slice(0, 2)
        } else if (indivPlace[1] == "") {
          indivPlace = indivPlace.slice(0, 1)
        } else if (indivPlace[0] == ""){
          indivPlace = indivPlace.slice(0, 0)
        }
        console.log(indivPlace)

        indivPlace.forEach(function(element) {
          var ele = element.split(",")
          console.log(ele)
      
          for (var i = 0; i < ele.length / 2; i++) {
            
            var p = document.createElement("p");
            p.className += 'attraction';
            if (i == 0) {
              var textnode =
                  document.createTextNode(ele[i] + "\nRating: " + ele[i + 1]);
              p.appendChild(textnode);
              document.getElementById('locations').appendChild(p)
            }
            else{
                var lat = ele[i];
                var long = [i+1];

            }
          }
        })

      }
    }

  });
}

function updateImages() {
  console.log("displayed data")
  $.ajax({
    type : "POST",
    dataType : "json",
    contentType : "application/json",
    url : "/curLoc",
    statusCode : {
      200 : function(locs) {
        console.log("Sucessfully loaded images");

        var image1 = document.createElement('img');
        var image2 = document.createElement('img');
        var image3 = document.createElement('img');
        var url1 = '../images/' +
                   locs.location +
                   '/image1.jpg';
        console.log(url1);
        var url2 = '../images/' +
                    locs.location +
                   '/image2.jpg';
                   console.log(url2);
        var url3 = '../images/' +
                    locs.location +
                   '/image3.jpg';
                   console.log(url3);
        console.log(locs['location'])

        document.getElementById('image1contain').appendChild(image1);
        document.getElementById('image2contain').appendChild(image2);
        document.getElementById('image3contain').appendChild(image3);

        image1.id = 'image1id';
        image2.id = 'image2id';
        image3.id = 'image3id';

        document.getElementById("image1id").src = url1;
        document.getElementById("image2id").src = url2;
        document.getElementById("image3id").src = url3;

        document.getElementById('image1id').style.width = "100%";
        document.getElementById('image1id').style.height = "100%";
        document.getElementById('image1id').style.objectFit = "cover";

        document.getElementById('image2id').style.width = "100%";
        document.getElementById('image2id').style.height = "100%";
        document.getElementById('image2id').style.objectFit = "cover";

        document.getElementById('image3id').style.width = "100%";
        document.getElementById('image3id').style.height = "100%";
        document.getElementById('image3id').style.objectFit = "cover";

        var destination = "Your optimal travel location: " + locs.location + "!";
        document.getElementById('yourLocationIs').innerHTML = destination;
      }
    }
  });
  displayData();
}
