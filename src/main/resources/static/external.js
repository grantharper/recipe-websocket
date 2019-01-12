$(document).ready(function () {

  $("#updateUserUser").click(function () {
    callUpdateEndpoint('user', 'user');
  });

  $("#updateTestUser").click(function () {
    callUpdateEndpoint('test', 'test');
  });

});


function callUpdateEndpoint(username, password) {
  var stepIndex = $("#stepIndex").val();
  console.log('sending request with stepIndex=', stepIndex);

  var stepIndexUpdate = {
    currentStepIndex: stepIndex
  };

  console.log('data=', stepIndexUpdate);
  $.ajax({
    url: '/alexa',
    type: 'POST',
    headers:{
      Authorization: 'Basic ' + btoa(username + ':' + password)
    },
    contentType: 'application/json',
    data: JSON.stringify(stepIndexUpdate),
    success: function (data) {
      console.log('response=', data);
    },
    error: function (jq, textStatus, errorThrown) {
      console.log(jq);
      console.log('response error=', textStatus);
      console.log('thrown: ', errorThrown);
    }
  });
}
