$(function(){
	$('header a').click(function() {
		var id = $(this).attr('href');
		var position = $(id).offset().top;
	
		$('html, body').animate({
			'scrollTop': position
		}, 500);
	});

	// アコーディオン
  $('.block-top').click(function() {
    var $description = $(this).parent('.block').find('.block-contents');
    if($description.hasClass('open')) { 
      $description.removeClass('open');
      $description.slideUp();
    } else {
      $description.addClass('open'); 
      $description.slideDown();
    }
  });
});