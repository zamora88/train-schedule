 var config = {
    apiKey: "AIzaSyDiLNCE32fwFFzooPJYoDv8O3hLN-G5q0U",
    authDomain: "train-schedule-f1606.firebaseapp.com",
    databaseURL: "https://train-schedule-f1606.firebaseio.com",
    projectId: "train-schedule-f1606",
    storageBucket: "",
    messagingSenderId: "613302674138"
  };


    firebase.initializeApp(config);

    var database = firebase.database();

 
    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

       var train = $("#train-name").val().trim();
       var destination = $("#wheretogo").val().trim();
       var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");
       var frequency = $("#frequency01").val().trim();

      database.ref().push({

        train: train,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });


   firebase.database().ref().on("child_added", function(snapshot){
   	var currentObj = snapshot.val();

   	if(currentObj.train){

		$("#runaway").append("<p>"+snapshot.val().train+"</p>")

		$("#destination").append("<p>"+snapshot.val().destination+"</p>")


	   	$("#frequency").append("<p>"+snapshot.val().frequency+"</p>")
   	}
   	

   });
   

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
     
      var sv = snapshot.val();
	  // Change the HTML to reflect
      $("#runaway").html(sv.train);
      $("#destination").html(sv.destination);
      $("#frequency").html(sv.frequency);



      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


 