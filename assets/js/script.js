  // Init Firebase
    var config = {
        apiKey: "AIzaSyCczIbEFbrEfPpstfhew7aRHxOFMeCUnY0",
        authDomain: "train-schedule-31628.firebaseapp.com",
        databaseURL: "https://train-schedule-31628.firebaseio.com",
        projectId: "train-schedule-31628",
        storageBucket: "train-schedule-31628.appspot.com",
        messagingSenderId: "22124412874",
        appId: "1:22124412874:web:431c0dd71bba201c395933",
        measurementId: "G-24FNJ7CGBJ"
      };
      // Initialize Firebase
      firebase.initializeApp(config);

      
$('#addTrainBtn').on("click", function() {
  // take user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  // to create local temporary object to hold train data
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    // uploads train data to the database
  database.ref().push(newTrain);
  console.log(newTrain.name);
  // clears all the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  // Prevents moving to new page
  return false;
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
 
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
 
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);

  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);
  
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
  
  var minToTrain = frequency - timeRemainder;
  // next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});




      