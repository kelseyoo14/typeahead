
$(document).ready(function () {
  let startOfContext = 0;
  let endOfContext = 0;
  let choices = [];
  let highlightedChoice = false;

  // call inputChange on user input
  $('#formula-input').on('input', inputChange);


  // get input context
  function getContext(formula, pos) {
    startOfContext = pos - 1;
    if (startOfContext < 0) {
      startOfContext = 1;
    }
    while (startOfContext > 0) {
      let char = formula[startOfContext];
      if (char === " " || char === "(" || char === ")" || char === ",") {
        startOfContext++;
        break;
      }
      startOfContext--;
    }
    endOfContext = pos;
    return formula.substring(startOfContext, endOfContext);
  }

  // get matching choices for user input given context
  function getChoices(context) {
      if (!context || context === "") {
        return [];
      }
      const keywords = ['sum', 'min', 'avg', 'max', '@revenue', '@created_at', '@count'];
      return keywords.filter(function(choice){ return choice.indexOf(context) !== -1 });
  }

  // highlight suggestion choice on key up and down
  function highlightChoice(evt, choices) {
    $(document).ready(function() {
      $('.suggestion').css('background-color', '#ffffff');
    });

    if (evt.keyCode === 40) {
      if (highlightedChoice === choices.length) {
        highlightedChoice = 1;
      } else {
        highlightedChoice++;
      }
    } else if (evt.keyCode === 38) {
      if (highlightedChoice === 1) {
        highlightedChoice = choices.length;
      } else {
        highlightedChoice--;
      }
    }

    $('ul > li:nth-child(' + highlightedChoice + ')').css('background-color', '#d8d8d8');
  }


  function inputChange(evt) {
    let context = getContext(this.value, this.selectionStart);
    choices = getChoices(context);

    $('.suggestion').remove();
    $('#suggestions ul').remove();
    $('#suggestions').css('border', 'none');

    if (choices.length > 0) {
      $('#suggestions').append('<ul></ul>');
      $('#suggestions').css('border', '2px solid #eeefed');

      for (var i=0; i < choices.length; i++) {
        $('#suggestions ul').append('<li class="suggestion">' + choices[i] + '</li>');
      }

      $('.suggestion').mouseover(function() {
        $(document).ready(function() {
          $('.suggestion').css('background-color', '#ffffff');
        });
        $(this).css('background-color', '#d8d8d8');
      });

      $('.suggestion').click(function() {
        suggestionChoice = $(this).text();
        let formulaInput = $('#formula-input').val();
        formulaInput = formulaInput.slice(0, startOfContext) + suggestionChoice;
        $('#formula-input').val(formulaInput);
      });
    }
  }

  // call inputChange on user input
  // let startOfContext = 0;
  // let endOfContext = 0;
  // let choices = [];
  // let highlightedChoice = false;
  // $('#formula-input').on('input', inputChange);


  // hide suggestions if user clicks away from suggestions and input boxes
  $(window).click(function() {
    $('#suggestions').hide();
  });
  // show if user clicks within suggestion input boxes
  $('#formula-input, #suggestions ul').click(function(evt){
    evt.stopPropagation();
    $('#suggestions').show();
  });

  $('#hint-button').click(function() {
    // $('#hints').css('visibility', 'visible');
    $('#hints').toggle();
  });


  // kept outside of inputChange function in order to stop user input events from adding up.
  // when inside inputChange function, each up/down arrow push to call the below code happened
  // for each letter or symbol in input. so if 'avg' was in #formula-input, the below code
  // would be called 3 times (once for each letter).
  $(document).keydown(function (evt) {
    if (evt.keyCode === 38 || evt.keyCode === 40) {
      if (highlightedChoice === false || highlightedChoice > choices.length) {
        highlightedChoice = 0;
      }
      highlightChoice(evt, choices);
    }
  });

});


