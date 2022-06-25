//Within the entirety of your site, you should have at least the following jQuery functionality:

$(document).ready(function() {

//A Function Which Contains Hiding/showing.
$(".giftoption").hide();
$(".yes").click(function(){
    $(".giftoption").show();
});
$(".no").click(function(){
    $(".giftoption").hide();
});

//A drop-down menu with Animation Effects.
    $("#accordion > li > div").hover(function(){

        if(false == $(this).next().is(':visible')) {
            $('#accordion ul').slideUp(400);
        }
     
    
        $(this).next().slideDown(400);
    });
$('li').click(function(){
        alert("Your message will be added!")

        });  

 //A function with chained effect
 $("#btnChangeBg").click(function(){
    $("body").css("background-color", "#e1d0bd")
    $("#animation").slideUp(2000).animate({right: '500px'}, 1000).animate({left: '500px'}, 1000) 
    $("#demo").text("Your order is complete");
  });

    });

