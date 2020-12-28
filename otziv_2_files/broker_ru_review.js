$(function () {

$('.attached_img').toggle(function() {
$(this).next().show();
}, function() {
$(this).next().hide();
});	

$('.reply_show').toggle(function() {
$(this).prev().show();
}, function() {
$(this).prev().hide();
});	




$('.ratintg_br_table').toggle(function() {
$(this).next().show();
}, function() {
$(this).next().hide();
});	
	



    $(".reply_review").on("mousedown", function () {
		//Recaptcha.reload();
        var rev_id = $(this).attr('id').replace('rev_', '');
        //console.log(rev_id);
        var forex_rating_reviews_broker = $(this).data('broker');
        console.log(forex_rating_reviews_broker)
        do_reply(rev_id,forex_rating_reviews_broker);
    });



function do_reply (rev_id,forex_rating_reviews_broker) {
    $("#reply_block").fadeIn();

$("#submit_reply").on('click', function() {
var errors = 0;
var forex_rating_reviews_name = $("#forex_rating_reviews_name").val();
var forex_rating_reviews_text = $("#forex_rating_reviews_text").val();
var parent_id = rev_id;
var recaptcha_response_field = $("#recaptcha_response_field").val();
var recaptcha_challenge_field = $("#recaptcha_challenge_field").val();

if (forex_rating_reviews_name ==''){errors=1; alert("Name field is required.");}
if (forex_rating_reviews_text ==''){errors=1; alert("Text field is required.");}
if (grecaptcha.getResponse() == '') {  errors=1; alert("Code is required");}

            if (errors==0)  {
          $("#loader").html('<img src="/images/ajax-loader.gif" />');
            $("#submit").animate({opacity: 0.4}, "slow");
           	$.ajax({
			'type' 		: 'POST',
			'url' 		: "/brokers-rating/addreply/",
			'cache'     : false,
			'dataType'  : 'json',
			'data' 		: {parent_id: parent_id,forex_rating_reviews_broker: forex_rating_reviews_broker, forex_rating_reviews_name : forex_rating_reviews_name,forex_rating_reviews_text : forex_rating_reviews_text, _token: $('meta[name="csrf-token"]').attr('content')},
			'success' 	: function(data){
			if (data.error == 'no') {
			  $("#forex_rating_reviews_name").val('');
			  $("#forex_rating_reviews_text").val('');
			$("#submit_reply").animate({opacity: 100}, "slow");
        $("#loader").html("");
		
$("#result").slideDown('100').html('<div style="font-size:22px; margin-bottom:25px; color:red;">Your Reply has been added successfully</div>');

				} else {

                $("#loader").html('');
                $("#result").html('<div style="font-size:22px; margin-bottom:25px; color:red;">'+ data.msg, +'</div>');
                $("#submit").animate({opacity: 100}, "slow");

				}
				},
                'error' : function( data ) {
                    if(data.status === 422) {
                        var errors = data.responseJSON;
                        $.each(errors.errors, function (key, value) {
                            $("#loader").html('');
                            $("#result").html('<div style="font-size:22px; margin-bottom:25px; color:red;">'+ value +'</div>');
                        });
                    }
                    $("#submit").animate({opacity: 100}, "slow");
                }
			}); 
            }
});
}



var cur_br_tab = "_block";
$(".br_tab").on('click', function() {
var curt = $(this).attr("id");
$(".br_tab").css({"font-weight" : "normal"});
$(this).css({"font-weight" : "bold"});
$(".br_bl").hide();
$("#"+curt+cur_br_tab).show();
});




});