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
       var frequency = $("#frequency01").val().trim();
       var firstTrain = $("first-train").val().trim();

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

        $("tbody").append("<p>"+currentObj.train+"</p>")

        $("#tbody").append("<p>"+currentObj.destination+"</p>")


        $("#tbody").append("<p>"+currentObj.frequency+"</p>")


        $("#tbody").append("<p>"+currentObj.firstTrain+"</p>")

        
}
})
        
   
     database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
     
      var sv = snapshot.val();
      // Change the HTML to reflect
      $("#train-name").html(sv.train);
      $("#wheretogo").html(sv.destination);
      $("#frequency01").html(sv.frequency);
      $("#firstTrain").html(sv.firstTrain);
});










     
 


 