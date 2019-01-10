var stompClient = null;

function connect(callback) {
  var socket = new SockJS('/websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/recipe/update', function (recipe) {
      var parsed = JSON.parse(recipe.body);
      updateStepIndexOnUI(parsed.currentStepIndex);
      showCurrentStep(parsed.steps[parsed.currentStepIndex]);
    });
    callback();
  });
}

function initializeRecipe() {
  stompClient.send("/app/update", {}, JSON.stringify({'currentStepIndex': '0'}));
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
  stompClient.send("/app/update", {}, JSON.stringify({'currentStepIndex': updateStepIndex.toString()}));
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
