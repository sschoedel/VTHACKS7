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
    url : "/pushMain",

    // Calls once data recieved
    statusCode : {200 : function() { console.log("Sucessfully pushed data"); }}
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
      }
    }
  });
}

function displayData() { console.log("DEBUG: Display data called"); }
