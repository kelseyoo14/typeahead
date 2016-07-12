// get input context
$(document).ready(function () {
  function getContext(formula, pos) {
    console.log('getContext');
    let startOfContext = pos - 1;
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
    let endOfContext = pos;
    return formula.substring(startOfContext, endOfContext);
  }

  // get matching choices for user input given context
  function getChoices(context) {
    console.log('getChoices');
      if (!context || context === "") {
        return [];
      }
      const keywords = ['sum', 'min', 'avg', 'max', '@revenue', '@created_at', '@count'];
      return keywords.filter(function(choice){ return choice.indexOf(context) !== -1 });
  }

  // highlight suggestion choice on key up and down
  function highlightChoice(evt, choices) {
    console.log('highlightChoice');
    $(document).ready(function() {
      $('.suggestion').css('background-color', '#ffffff');
    });


    console.log(highlightedChoice);
    if (evt.keyCode === 40) {
      console.log('down arrow');
      if (highlightedChoice === choices.length) {
        highlightedChoice = 1;
      } else {
        highlightedChoice++;
      }
    } else if (evt.keyCode === 38) {
      console.log('up arrow');
      if (highlightedChoice === 1) {
        highlightedChoice = choices.length;
      } else {
        highlightedChoice--;
      }
    }
    console.log(highlightedChoice);
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
    }
  }

  // call inputChange on user input
  let choices = [];
  let highlightedChoice = false;
  $('#formula-input').on('input', inputChange);


  // hide suggestions if user clicks away from suggestions and input boxes
  $(window).click(function() {
    $('#suggestions').hide();
  });
  // show if user clicks within suggestion input boxes
  $('#formula-input, #suggestions ul').click(function(evt){
    evt.stopPropagation();
    $('#suggestions').show();
  });

  $(document).keydown(function (evt) {
    if (evt.keyCode === 38 || evt.keyCode === 40) {
      if (highlightedChoice === false || highlightedChoice > choices.length) {
        console.log('highlightedChoice reset');
        highlightedChoice = 0;
      }
      highlightChoice(evt, choices);
    }
  });

});


