var stompClient = null;

function connect() {
  var socket = new SockJS('/websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/recipe/update', function (recipe) {
      var parsed = JSON.parse(recipe.body);
      showCurrentStep(parsed.steps[parsed.currentStepIndex]);
    });
  });
}

function initializeRecipe() {
  stompClient.send("/app/update", {}, JSON.stringify({'currentStepIndex': '0'}));
}

function nextStep() {
  var pageStepIndex = $("#currentStep").attr('data-index');
  console.log('currentStepIndex=' + pageStepIndex);
  var numberPageStepIndex = parseInt(pageStepIndex);
  console.log('numberPageStepIndex=', numberPageStepIndex);
  var nextStepIndex = numberPageStepIndex + 1;
  console.log('nextIndex=', nextStepIndex);
  $("#currentStep").attr('data-index', nextStepIndex.toString());
  stompClient.send("/app/update", {}, JSON.stringify({'currentStepIndex': nextStepIndex.toString()}));
}

function showCurrentStep(message) {
  console.log('get message=' + message);
  $("#currentStep").html(message);
}

$(function () {
  $("form").on('submit', function (e) {
    e.preventDefault();
  });
  $("#nextStep").click(function () {
    nextStep();
  });
  $("#initializeRecipe").click(function () {
    initializeRecipe();
  });
  connect();
});