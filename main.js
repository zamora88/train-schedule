 // Initialize Firebase
  var config = {
     apiKey: "AIzaSyDiLNCE32fwFFzooPJYoDv8O3hLN-G5q0U",
    authDomain: "train-schedule-f1606.firebaseapp.com",
    databaseURL: "https://train-schedule-f1606.firebaseio.com",
    projectId: "train-schedule-f1606",
    storageBucket: "train-schedule-f1606.appspot.com",
    messagingSenderId: "613302674138"
  };
  firebase.initializeApp(config);


    var database = firebase.database();
 // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
       var train = $("#train-name").val().trim();
       var destination = $("#wheretogo").val().trim();
         var firstTrain = moment($("#first-train").val().trim(), "HH:mm").subtract(10, "years").format("X");
       var frequency = $("#frequency01").val().trim();
     

     console.log(firstTrain);
     return false;


     var newTrain = {
        name: train,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,

     }



      database.ref().push(newTrain);

      $("#train-name").val("");

      $("#wheretogo").val("");

      $("#first-train").val("");

      $("#frequency01").val("");

      return false;
})

      database.ref().on("child_added", function(snapshot){
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var firstTrain = snapshot.val().firstTrain;
      var frequency = snapshot.val().frequency;


     var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
     var minutes = frequency - remainder;
     var arrival = moment().add(minutes, "m").format("HH:mm A");

      
  
   var tr = $("<tr>");
     $("tbody").tr.append("<td>" + destination + "<td>" + firstTrain + "<td>" + frequency + "<td>" + train + "<td>" + arrival + );
   //   "<td>" + minutes 
});
 
    


  

//  var current = moment([2007, 0, 29]).fromNow(); 


 