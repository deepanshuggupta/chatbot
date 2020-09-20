$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function () {
  $("#status-options").toggleClass("active");
});

$(".expand-button").click(function () {
  $("#profile").toggleClass("expanded");
  $("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function () {
  $("#profile-img").removeClass();
  $("#status-online").removeClass("active");
  $("#status-away").removeClass("active");
  $("#status-busy").removeClass("active");
  $("#status-offline").removeClass("active");
  $(this).addClass("active");

  if ($("#status-online").hasClass("active")) {
    $("#profile-img").addClass("online");
  } else if ($("#status-away").hasClass("active")) {
    $("#profile-img").addClass("away");
  } else if ($("#status-busy").hasClass("active")) {
    $("#profile-img").addClass("busy");
  } else if ($("#status-offline").hasClass("active")) {
    $("#profile-img").addClass("offline");
  } else {
    $("#profile-img").removeClass();
  }

  $("#status-options").removeClass("active");
});

function newMessage(msg) {
  message = ($(".message-input input").val())?$(".message-input input").val():msg;

  if ($.trim(message) == "") {
    return false;
  }
  if (message === "Sign In" || message === "Sign Up") {
    window.location = 'https://gi-team-24-auth.auth.us-east-1.amazoncognito.com/signup?client_id=3ns9rnprgdlab1o0n82npu89vm&response_type=code&scope=email+openid+phone+profile&redirect_uri=https://d2z5lv98pzigix.cloudfront.net/';
    return false;
  }


  setTimeout(function(){pushChat(message)}, 1500);
  

  $('#botDisplay').hide(2000);
  $('#botDisplayIcon').show(2000);


  
}

// $(".pushdata").click(function () {
//   console.log($(this.text()))
//   newMessage();
// });

$(document).on('click', '.pushdata', function(){ 
  // alert("hey!");
  console.log($(this).text())
  newMessage($(this).text());
}); 

$(window).on("keydown", function (e) {
  if (e.which == 13) {
    newMessage();
    // return false;
  }
});
//# sourceURL=pen.js
$(document).ready(function () {

$(function () {
  $('#datetimepicker1').datetimepicker({format: 'DD/MM/yyyy'});
});

$("#datetimepicker1").on("dp.change", function (e) {
// $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
console.log(e.oldDate);
if (e.oldDate) {
var dt = new Date(e.date._d);
console.log(dt.toLocaleDateString('en-US'));
$("#wisdom").show();
$("#datetimepicker1").hide();
newMessage(dt.toLocaleDateString('en-US'));



}

});
});

// aws lex

   

      // set the focus to the input box
      // document.getElementById("wisdom").focus();
  
  AWS.config.region = 'us-east-1'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:a6d5f6c6-8759-4b21-b21c-60e314bf8983',
  });
      var lexruntime = new AWS.LexRuntime();
      var lexUserId = 'chatbot-demo' + Date.now();
      var sessionAttributes = {};
  
      function pushChat(msg) {

        if(msg === "Register via mobile") {
          $(
            '<li class="sent"><img src="img/user.png" alt="" /><p>Register via mobile</p></li>'
          ).appendTo($(".messages ul"));
setTimeout (function() {
          $(
            '<li class="replies"><img src="img/bot.png" alt="" /><p>Please provide your Mobile no</p></li>'
          ).appendTo($(".messages ul"));

        },2000);
          // $(".contact.active .preview").html("<span>You: </span>" + lexResponse.message);
          $(".messages").animate({ scrollTop: $(document).height() }, "fast");
          return false;
        }

        if(msg === "9818257725") {
          $(
            '<li class="sent"><img src="img/user.png" alt="" /><p>9818257725</p></li>'
          ).appendTo($(".messages ul"));
          msg = 'Register';
        }
  
        // if there is text to be sent...
        var wisdomText = document.getElementById('wisdom');
        // var wisdomText = document.getElementById('wisdom');
        if (msg && msg.trim().length > 0) {
  
          // disable input to show we're sending it
          var wisdom = msg.trim();
          wisdomText.value = '...';
          wisdomText.locked = true;
  
          // send it to the Lex runtime
          var params = {
            botAlias: '$LATEST',
            botName: 'Insurance',
            inputText: wisdom,
            userId: lexUserId,
            sessionAttributes: sessionAttributes
          };
          showRequest(wisdom);
          lexruntime.postText(params, function(err, data) {
            if (err) {
              console.log(err, err.stack);
              showError('Error:  ' + err.message + ' (see console for details)')
            }
            if (data) {
              // capture the sessionAttributes for the next cycle
              sessionAttributes = data.sessionAttributes;
              // show response and/or error/dialog status
              showResponse(data);
            }
            // re-enable input
            wisdomText.value = '';
            wisdomText.locked = false;
          });
        }
        // we always cancel form submission
        return false;
      }
  
      function showRequest(daText) {
  
        // var conversationDiv = document.getElementById('conversation');
        // var requestPara = document.createElement("P");
        // requestPara.className = 'userRequest';
        // requestPara.appendChild(document.createTextNode(daText));
        // conversationDiv.appendChild(requestPara);
        if(daText === "Register") {
          return false;
        }
        $(
          '<li class="sent"><img src="img/user.png" alt="" /><p>' +
          daText +
            "</p></li>"
        ).appendTo($(".messages ul"));
        // $(".contact.active .preview").html("<span>You: </span>" + daText);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");

        // conversationDiv.scrollTop = conversationDiv.scrollHeight;
      }
  
      function showError(daText) {
  
        // var conversationDiv = document.getElementById('conversation');
        // var errorPara = document.createElement("P");
        // errorPara.className = 'lexError';
        // errorPara.appendChild(document.createTextNode(daText));
        // conversationDiv.appendChild(errorPara);
        // conversationDiv.scrollTop = conversationDiv.scrollHeight;

        $(
          '<li class="replies-error"><img src="img/bot.png" alt="" /><p>' +
          daText +
            "</p></li>"
        ).appendTo($(".messages ul"));
        // $(".contact.active .preview").html("<span>You: </span>" + lexResponse.message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
      }
  
      function showResponse(lexResponse) {
  
        var conversationDiv = document.getElementById('conversation');
        var responsePara = document.createElement("P");
        responsePara.className = 'lexResponse';
        if (lexResponse.message) {
          // responsePara.appendChild(document.createTextNode(lexResponse.message));
          // responsePara.appendChild(document.createElement('br'));

          if (lexResponse.message.includes(".png")) {
            lexResponse.message = '<img class="contentImg" src="'+lexResponse.message+'" />';
          }
          if(lexResponse.message === "Fetched Details Success") {
            lexResponse.message = '<strong>Your Policy Details</strong><br/>';
            $.each( lexResponse.sessionAttributes, function( key, value ) {
            
              lexResponse.message = lexResponse.message + '<strong>'+key+': </strong>'+value +'<br>'
              
  
            });
          }
          $(
            '<li class="replies"><img src="img/bot.png" alt="" /><p>' +
            lexResponse.message +
              "</p></li>"
          ).appendTo($(".messages ul"));
          // $(".contact.active .preview").html("<span>You: </span>" + lexResponse.message);
          $(".messages").animate({ scrollTop: $(document).height() }, "fast");

          if(lexResponse.slotToElicit === "DOB") {
            $("#wisdom").hide();
            $("#datetimepicker1").show();
          }
        }
        if (lexResponse.dialogState === 'ReadyForFulfillment') {
          responsePara.appendChild(document.createTextNode(
            'Ready for fulfillment'));
          // TODO:  show slot values
        } else {
          // responsePara.appendChild(document.createTextNode(
          //   '(' + lexResponse.dialogState + ')'));
        }
        conversationDiv.appendChild(responsePara);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
      }
//aws lex