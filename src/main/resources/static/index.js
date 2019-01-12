var stompClient = null;
var messageUrl = "/app/update";

function connect(callback) {
  var socket = new SockJS('/recipe');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/user/queue/update', function (recipe) {
      var parsed = JSON.parse(recipe.body);
      updateStepIndexOnUI(parsed.currentStepIndex);
      showCurrentStep(parsed.steps[parsed.currentStepIndex]);
    });
    callback();
  });
}

function initializeRecipe() {
  stompClient.send(messageUrl, {}, JSON.stringify({'currentStepIndex': '0'}));
}

function getCurrentStepIndexFromUI() {
  var pageStepIndex = $("#currentStep").attr('data-index');
  console.log('currentStepIndex=' + pageStepIndex);
  var numberPageStepIndex = parseInt(pageStepIndex);
  console.log('numberPageStepIndex=', numberPageStepIndex);
  return numberPageStepIndex;
}

function nextStep() {
  var nextStepIndex = getCurrentStepIndexFromUI() + 1;
  console.log('nextIndex=', nextStepIndex);
  updateStepIndexFromUIAction(nextStepIndex);
}

function previousStep(currentStepIndex) {
  var previousStepIndex = getCurrentStepIndexFromUI() - 1;
  console.log('previousIndex=', previousStepIndex);
  updateStepIndexFromUIAction(previousStepIndex);
}

function updateStepIndexFromUIAction(updateStepIndex) {
  updateStepIndexOnUI(updateStepIndex.toString());
  stompClient.send(messageUrl, {}, JSON.stringify({'currentStepIndex': updateStepIndex.toString()}));
}

function showCurrentStep(message) {
  console.log('get message=' + message);
  $("#currentStep").html(message);
}

function updateStepIndexOnUI(currentStepIndex) {
  $("#currentStep").attr('data-index', currentStepIndex.toString());
}

$(function () {
  $("form").on('submit', function (e) {
    e.preventDefault();
  });
  $("#nextStep").click(function () {
    nextStep();
  });
  $("#previousStep").click(function () {
    previousStep();
  });
  connect(initializeRecipe);
});
