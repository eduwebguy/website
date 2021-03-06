if ($.cookie("theme_csspath")) {
    $('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
}

$(function () {

    animations();
    sliders();
    fullScreenContainer();
    utils();
    contactForm();
    counters();
    parallax();
});

$(window).load(function () {
    windowWidth = $(window).width();
    $(this).alignElementsSameHeight();

    masonry();

});
$(window).resize(function () {

    newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
	setTimeout(function () {
	    $(this).alignElementsSameHeight();
	    fullScreenContainer();
	    waypointsRefresh();
	}, 205);
	windowWidth = newWindowWidth;
    }

});


/* =========================================
 *  animations
 *  =======================================*/

function animations() {

    if (Modernizr.csstransitions) {

	delayTime = 0;
	$('[data-animate]').css({opacity: '0'});
	$('[data-animate]').waypoint(function (direction) {
	    delayTime += 150;
	    $(this).delay(delayTime).queue(function (next) {
		$(this).toggleClass('animated');
		$(this).toggleClass($(this).data('animate'));
		delayTime = 0;
		next();
		//$(this).removeClass('animated');
		//$(this).toggleClass($(this).data('animate'));
	    });
	},
		{
		    offset: '95%',
		    triggerOnce: true
		});
	$('[data-animate-hover]').hover(function () {
	    $(this).css({opacity: 1});
	    $(this).addClass('animated');
	    $(this).removeClass($(this).data('animate'));
	    $(this).addClass($(this).data('animate-hover'));
	}, function () {
	    $(this).removeClass('animated');
	    $(this).removeClass($(this).data('animate-hover'));
	});
    }

}

/* =========================================
 * sliding
 *  =======================================*/

/*sliding that will allow for new page links in navbar rather than just # anchor links */

$('a.smooth-scroll[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});



/* =========================================
 * sliders
 *  =======================================*/

function sliders() {
    if ($('.owl-carousel').length) {

	$(".customers").owlCarousel({
	    items: 6,
	    itemsDesktopSmall: [990, 4],
	    itemsTablet: [768, 2],
	    itemsMobile: [480, 1]
	});
	$(".testimonials").owlCarousel({
	    items: 4,
	    itemsDesktopSmall: [1170, 3],
	    itemsTablet: [970, 2],
	    itemsMobile: [750, 1]
	});
    }

}

/* collapse menu on mobile after click */


$('.navbar-collapse ul li a').click(function() {
         $('.navbar-collapse').collapse('hide');
 });


/* =========================================
 * counters
 *  =======================================*/

function counters() {

    $('.counter').counterUp({
	delay: 10,
	time: 1000
    });

}

/* =========================================
 * parallax
 *  =======================================*/

function parallax() {

    $('.text-parallax').parallax("50%", 0.1);

}

/* =========================================
 *  masonry
 *  =======================================*/

function masonry() {

    $('#references-masonry').css({visibility: 'visible'});

    $('#references-masonry').masonry({
	itemSelector: '.reference-item:not(.hidden)',
	isFitWidth: true,
	isResizable: true,
	isAnimated: true,
	animationOptions: {
	    duration: 200,
	    easing: 'linear',
	    queue: true
	},
	gutter: 30
    });
    scrollSpyRefresh();
    waypointsRefresh();
}

/* =========================================
 * filter
 *  =======================================*/

$('#filter a').click(function (e) {
    e.preventDefault();



    $('#filter li').removeClass('active');
    $(this).parent('li').addClass('active');

    var categoryToFilter = $(this).attr('data-filter');

    $('.reference-item').each(function () {
	if ($(this).data('category') === categoryToFilter || categoryToFilter === 'all') {
	    $(this).removeClass('hidden');
	}
	else {
	    $(this).addClass('hidden');
	}
    });

    if ($('#detail').hasClass('open')) {
	closeReference();
    }
    else {
	$('#references-masonry').masonry('reloadItems').masonry('layout');

    }

    scrollSpyRefresh();
    waypointsRefresh();
});

/* =========================================
 *  open reference
 *  =======================================*/

$('.reference-item').click(function (e) {
    e.preventDefault();

    var element = $(this);
    var title = element.find('.reference-title').text();
    var description = element.find('.reference-description').html();

    images = element.find('.reference-description').data('images').split(',');

    if (images.length > 0) {
	slider = '';
	for (var i = 0; i < images.length; ++i) {
	    slider = slider + '<div class="item"><img src=' + images[i] + ' alt="" class="img-responsive"></div>';
	}
    }
    else {
	slider = '';
    }



    $('#detail-title').text(title);
    $('#detail-content').html(description);
    $('#detail-slider').html(slider);

    openReference();

});

function openReference() {

    $('#detail').addClass('open');
    $('#references-masonry').animate({opacity: 0}, 300);
    $('#detail').animate({opacity: 1}, 300);

    setTimeout(function () {
	$('#detail').slideDown();
	$('#references-masonry').slideUp();

	if ($('#detail-slider').html() !== '') {

	    $('#detail-slider').owlCarousel({
		slideSpeed: 300,
		paginationSpeed: 400,
		autoPlay: true,
		stopOnHover: true,
		singleItem: true,
		afterInit: ''
	    });
	}
    }, 300);

    setTimeout(function () {
	$('body').scrollTo($('#detail'), 1000, {offset: -80});
    }, 500);

}

function closeReference() {

    $('#detail').removeClass('open');
    $('#detail').animate({'opacity': 0}, 300);

    setTimeout(function () {
	$('#detail').slideUp();
	$('#detail-slider').data('owlCarousel').destroy();
	$('#references-masonry').slideDown().animate({'opacity': 1}, 300).masonry('reloadItems').masonry();

    }, 300);

    setTimeout(function () {
	$('body').scrollTo($('#filter'), 1000, {offset: -110});
    }, 500);


    setTimeout(function () {
	$('#references-masonry').masonry('reloadItems').masonry();
    }, 800);

}

$('#detail .close').click(function () {
    closeReference(true);
})

/* =========================================
 * full screen intro
 *  =======================================*/

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    var screenHeight = '';
    if ($(window).height() > 500) {
	screenHeight = $(window).height() + "px";
    }
    else {
	screenHeight = "500px";
    }


    $("#intro, #intro .item").css({
	width: screenWidth,
	height: screenHeight
    });
}



/* =========================================
 *  UTILS
 *  =======================================*/

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* external links in new window*/

    $('.external').on('click', function (e) {

	e.preventDefault();
	window.open($(this).attr("href"));
    });
    /* animated scrolling */

}

$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

	var maxHeight = 0;
	var children = $(this).find('.same-height');
	children.height('auto');
	if ($(window).width() > 768) {
	    children.each(function () {
		if ($(this).innerHeight() > maxHeight) {
		    maxHeight = $(this).innerHeight();
		}
	    });
	    children.innerHeight(maxHeight);
	}

	maxHeight = 0;
	children = $(this).find('.same-height-always');
	children.height('auto');
	children.each(function () {
	    if ($(this).height() > maxHeight) {
		maxHeight = $(this).innerHeight();
	    }
	});
	children.innerHeight(maxHeight);
    });
}

/* refresh scrollspy */
function scrollSpyRefresh() {
    setTimeout(function () {
	$('body').scrollspy('refresh');
    }, 1000);
}

/* refresh waypoints */
function waypointsRefresh() {
    setTimeout(function () {
	$.waypoints('refresh');
    }, 1000);
}

/* ajax contact form */

function contactForm() {
    $("#contact-form").submit(function () {

	var url = "contact.php"; // the script where you handle the form input.

	$.ajax({
	    type: "POST",
	    url: url,
	    data: $(this).serialize(), // serializes the form's elements.
	    success: function (data)
	    {
		var messageAlert = 'alert-' + data.type;
		var messageText = data.message;
		var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable animated bounceIn"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
		if (messageAlert && messageText) {
		    $('#contact-form').find('.messages').html(alertBox);
		}
	    }
	});
	return false; // avoid to execute the actual submit of the form.
    });
}

/* blog menu item test
 document.getElementById("blog").onclick = function () {
    location.href = "blog/index.html";
};
*/
