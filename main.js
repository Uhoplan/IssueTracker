
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
function saveIssue( e ) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

  const issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
   }

   if (localStorage.getItem('issues') == null) {
     const issues = [];
     issues.push(issue);
     localStorage.setItem('issues', JSON.stringify(issues));
   } else {
     const issues = JSON.parse(localStorage.getItem('issues'));
     issues.push(issue);
     localStorage.setItem('issues', JSON.stringify(issues));
   }

   document.getElementById('issueInputForm').reset();

   fetchIssues();

   e.preventDefault();
  }

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for ( var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
    issues[i].status = 'Closed';
  }
 }
 localStorage.setItem('issues', JSON.stringify(issues));
 fetchIssues();
}

function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (
    var i = 0; i < issues.length; i++
  ) {
  if (issues[i].id == id) {
    issues.splice(i, 1);
  }
}

localStorage.setItem('issues', JSON.stringify(issues));

fetchIssues();
}



function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issueList = document.getElementById('issuesList');

  issueList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=
    '<div class="card-body mx-auto">' +
    '<h6>Issue ID: ' + id + '</h6>' + '<p><span class="badge badge-pill badge-info">' + status + '</span></p>' +'<h3>' + desc + '</h3>' + '<p><img src="bootstrap-icons-1.0.0/clock.svg"> ' + severity + '</p>' + '<img src="bootstrap-icons-1.0.0/person-fill.svg">' + assignedTo + '</p>' + '<a href="#" onclick ="setStatusClosed(\'' + id + '\')" class="btn-group mr-2 btn btn-warning">Close</a>' + '<a href="#" onclick ="deleteIssue(\'' + id + '\')" class="btn-group mr-2 btn btn-danger m-10">Delete</a>' + '</div>';

    }

  }
