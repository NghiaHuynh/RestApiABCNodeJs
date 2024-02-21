console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
  getData(e);
});

var reloadTable = function(events) {
    var table = $('#eventsTable');

    // var tableHeader = $('#eventsTable >thead tr');
    //reload header table data
    var dateHeader = moment($("#eventDateRange").val()).format( 'dddd MM/DD/YYYY');
    $("#eventsTable > thead > tr > th:first").text(dateHeader);
    
    //reload new body table data
    table.find("tbody tr").remove();
    events.forEach(function (event) {
      var enrolled = event.enrolled;
      
      table.append("<tr><td>" + event.sampleTime

       + "</td><td>" + event.description + "</td>"+
       "<td>" + enrolled + "</td>" + 
       "<td>" + event.room + "</td>" + 
       "</tr>");

    });
};

async function getData(e) {
  e.preventDefault();
  const clubNumber = document.getElementById("clubNumber").value;
  const eventDateRange = document.getElementById("eventDateRange").value;

  const response = await fetch("/events", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      clubNumber: clubNumber,
      eventDateRange: eventDateRange
    })
  });

  const jsonResponseContent = await response.json();

  //console.log(jsonResponseContent.events);

  // $('#eventsTable').html(jsonResponseContent);

  reloadTable(jsonResponseContent.events);
  
}