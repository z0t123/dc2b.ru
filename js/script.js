var isScroll = true;
var isScrollToClick;


function initMask() {
  $('input[name=tel]').mask("+7 (999) 999-9999");
}

function validateInput(inp){
    if (inp.val().length<=0) {
        inp.parent().addClass('error');
        return false;
    }
    return true;
}

$('input[name=a_check]').on('keyup', function(){
    $(this).val($(this).val().replace (/\D/, ''));
});

$('input[name=a_sale]').on('keyup', function(){
    $(this).val($(this).val().replace (/\D/, ''));
});

$(".send-form").click(function(){
    var valid = true;
    valid = valid && validateInput($("input[name=name]"));
    valid = valid && validateInput($("input[name=email]"));
    valid = valid && validateInput($("input[name=tel]"));
    valid = valid && validateInput($("input[name=adress]"));
    valid = valid && validateInput($("input[name=a_check]"));
    valid = valid && validateInput($("input[name=a_sale]"));
    valid = valid && validateInput($("textarea[name=coment]"));
    //if ($("input[name=attempt]").is(':checked')) {
    if (valid) {
        var send = {};
        send.name = $("input[name=name]").val();
        send.email = $("input[name=email]").val();
        send.tel = $("input[name=tel]").val();
        send.adress = $("input[name=adress]").val();
        send.a_check = $("input[name=a_check]").val();
        send.a_sale = $("input[name=a_sale]").val();
        send.coment = $("textarea[name=coment]").val();
        var aj = $.ajax({
            type: 'POST',
            data: "send=" + JSON.stringify(send),
            dataType: 'json',
            async: false,
            url: 'mail.php',
        });
        $(".order-form").remove();
        $(".screen-in h2").text("Спасибо! Ваша заявка отправлена.");
    }

    //}
    /*else {
     $(".checkbox input + span").css("border-color","red");
     $(".checkbox span").css("color","red");
     }*/
});

$(".checkbox").click(function(){
    $(".checkbox input + span").css("border-color","#0074bc");
    $(".checkbox span").css("color","#97abb3");
});

function toggleCities() {
    const activeClass = 'active';
    const $cityName = $('.js-city-name');
    const $contactCard = $('.j-contact-card');
    const $showMore = $('.js-show-more');
    const $citiesList = $('.js-cities');
    const $backBtn = $('.js-back-btn');
    const $citiesMobile = $('.js-cities-mobile');
    const $cityNameMobile = $('.js-city-name-mobile');


    $cityName.on('click touchstart', function (e) {
        if ($(this).hasClass(activeClass)) {
            return;
        }
        $cityName.each(function (i, item) {
            $(item).removeClass(activeClass);
        });
        $(this).addClass(activeClass);

        const id = $(this).data().id;

        $contactCard.each(function(i, card) {
            $(card).removeClass(activeClass);
        });

        $($contactCard[id]).addClass(activeClass);
    });
    
    $citiesMobile.on('click touchstart', function (e) { 
        //$(this).addClass(activeClass);
        //e.stopPropagation();
        $(window).resize();
    });

    // $cityNameMobile.on('click touchstart', function (e) {
    //     const id = $(this).data().id;

    //     $contactCard.each(function(i, card) {
    //         $(card).removeClass(activeClass);
    //     });

    //     $($contactCard[id]).addClass(activeClass);
    // });

    $cityNameMobile.on('click', function (e) {
        
        const id = $(this).data().id;
        $contactCard.each(function(i, card) {
          $(card).removeClass(activeClass);
        });
        $($contactCard[id]).addClass(activeClass);
        
        //second block code
        e.stopPropagation();
        $cityNameMobile.sort(function(a, b) {
          return $(a).data("id") - $(b).data("id");
        }).appendTo($citiesMobile);
        $($cityNameMobile[0]).before($(this));
        $citiesMobile.toggleClass(activeClass);
        //$citiesMobile.removeClass(activeClass);
        $(window).resize();
        
    });

    $showMore.on('click touchstart', function () {
        $($citiesList[0]).removeClass(activeClass);
        $($citiesList[1]).addClass(activeClass);
        $(this).hide();
        $($backBtn).show();
    });

    $backBtn.on('click touchstart', function () {
        $($citiesList[1]).removeClass(activeClass);
        $($citiesList[0]).addClass(activeClass);
        $(this).hide();
        $($showMore).show();
    });
}

function initFullPage() {
  var timerScroll;
  var anchorsList = []
  var navigationTooltipsList = []
  $('.section').each(function (i) {
    var elIndex = $(this).index() + 1
    anchorsList.push($(this).data('id'))
    navigationTooltipsList.push(elIndex.length < 2 ? '' : '0' + elIndex)
  });
  if ($('#fullpage').length) {
    $('#fullpage').fullpage({
      scrollOverflow: true,
      paddingTop: '100px',
      paddingBottom: '90px',
      css3: true,
      anchors: anchorsList,
      navigation: true,
      navigationPosition: 'left',
      navigationTooltips: navigationTooltipsList,
      afterLoad: function () {
        clearTimeout(timerScroll)
        isScroll = false;
        if (!!$('.section.active').prev().find('.fp-scrollable').data('iscrollInstance')) {
          $('.section.active').prev().find('.fp-scrollable').data('iscrollInstance').scrollTo(0, 0)
        }
      },
      onLeave: function (index, nextIndex, direction) {
        if (!!$('.section.active').next().find('.fp-scrollable').data('iscrollInstance')) {
          $('.section.active').next().find('.fp-scrollable').data('iscrollInstance').scrollTo(0, 0)
        }
        //if (!!$('.section.active').find('.fp-scrollable').data('iscrollInstance')) {
        //  if(!isScroll){
        //    timerScroll = setTimeout(function () {
        //      isScroll = true
        //    }, 701)
        //    return false
        //  }
        //  else{
        //    isScroll = false
        //  }
        //}

        $('.page-nav').removeClass('revert');
        if ($('#fp-nav li').length == nextIndex) {
          $('.page-nav').addClass('revert')
        }

      }
    });
  }
  if ($('.header').hasClass('header-white')) {
    $('#fp-nav').addClass('nav-white')
  }
  $('.page-nav i').on('click', function () {
    if ($(this).hasClass('icon-arr-d')) {
      $.fn.fullpage.moveSectionDown();
    }
    if ($(this).hasClass('icon-arr-u')) {
      $.fn.fullpage.moveSectionUp();
    }
  })
  $.fn.fullpage.reBuild();

}

function initAccordion() {
  $('.accordion-title').on('click', function () {

    $.fn.fullpage.reBuild();
    $(this).toggleClass('active').next().slideToggle(400, function () {
      $.fn.fullpage.reBuild();
      if ($('.section.active').find('.fp-scrollable').length) {
        refreshScroll();
      }
    })
  })
}

function refreshScroll() {
  if ($('.section.active').find('.fp-scrollable').length) {
    $('.section.active').find('.fp-scrollable').data('iscrollInstance').refresh();
  }
  setTimeout(function () {
    if ($('.section.active').find('.fp-scrollable').length) {
      $('.section.active').find('.fp-scrollable').data('iscrollInstance').refresh();
    }
  }, 0);
}

function loader() {
  var img_to_load = [];
  var loaded_images = 0;


  $('img').each(function () {
    img_to_load.push($(this).attr('src'))
  })

  for (var i = 0; i < img_to_load.length; i++) {
    var img = document.createElement('img');
    img.src = img_to_load[i];
    img.style.display = 'hidden';
    img.onload = function () {
      loaded_images++;
      if (loaded_images == img_to_load.length) {
        $('.loader-progress span').text('100')
        $('.loader-progress-in p').css('width', "100%")
        setTimeout(function () {
          if ($('#fullpage').length) {
            $.fn.fullpage.reBuild();
          }
          $('.loader').fadeOut('slow');
        }, 1000);
        initFullPage();
      }
      else {
        $('.loader-progress span').text((100 * loaded_images / img_to_load.length).toFixed())
        $('.loader-progress-in p').css('width', 100 * loaded_images / img_to_load.length + "%")
      }
    }
  }
}

function toggleNav() {
  $('.nav-icon').on('click', function () {
    //$.fn.fullpage.setAutoScrolling(false);
    $('.nav-menu').addClass('open')
  })

  $('.nav-menu .close').on('click', function () {
    $('.nav-menu').removeClass('open')
    $.fn.fullpage.setAutoScrolling(true);
  })

  $('.nav-menu a').bind('touchstart click', function () {
    if ($(this).next('ul').length) {
      $('.drop-nav-menu').slideUp(400)
      $('.nav-img-item').hide()
      $(this).parent().toggleClass('active').siblings().removeClass('active')
      if ($(this).parent().hasClass('active')) {
        $('.nav-img-item').eq($(this).parent().index()).fadeIn()
        $(this).next('ul').slideDown(400);
      }
      return false
    }
    else {
      $('.nav-menu').removeClass('open')
      $.fn.fullpage.setAutoScrolling(true);
    }

  })
}

function closeEl() {
  $('body').on('click touchstart', function (e) {
    if ($(e.target).hasClass('nav-menu-in')) {
      $('.nav-menu').removeClass('open')
    }
  })
}

function validate() {
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validateName(name) {
    var re = /^[A-Za-zА-Яа-я\s]+$/;
    return re.test(name);
  }

  function validateSaytName(name) {
     if (name.length>0){
         return true;
     }
     return false;
  }

  function validateNick(nick) {
    return nick.length > 4;
  }

  function validateTel(tel) {
    return tel != "";
  }

  function validateNumber(number) {
  }

  function validatePass(pass) {
    return pass.length > 7;

  }

  var isValide = true;

  $('input').on('change', function () {
    var _thisValue = $(this).val();
    var _thisName = $(this).attr('name');


    switch (_thisName) {
      case 'name':
        isValide = isValide && validateName(_thisValue);
        if (validateName(_thisValue)) {
          $(this).parent().removeClass('error').addClass('done')
        }
        else {
          $(this).parent().addClass('error').removeClass('done')
        }
        return validateName(_thisValue)
        break;

      case 'nick':
        isValide = isValide && validateNick(_thisValue);
        if (validateNick(_thisValue)) {
          $(this).parent().removeClass('error').addClass('done')
        }
        else {
          $(this).parent().addClass('error').removeClass('done')
        }
        return validateNick(_thisValue)
        break;

      case 'email':
        isValide = isValide && validateEmail(_thisValue);
        if (validateEmail(_thisValue)) {
          $(this).parent().removeClass('error').addClass('done')
        }
        else {
          $(this).parent().addClass('error').removeClass('done')
        }
        return validateEmail(_thisValue)
        break;

      case 'tel':
        isValide = isValide && validateTel(_thisValue);
        if (validateTel(_thisValue)) {
          $(this).parent().removeClass('error').addClass('done')
        }
        else {
          $(this).parent().addClass('error').removeClass('done')
        }
        return validateTel(_thisValue)
        break;

      case 'pass':
        isValide = isValide && validatePass(_thisValue);
        if (validatePass(_thisValue)) {
          $(this).parent().removeClass('error').addClass('done')
        }
        else {
          $(this).parent().addClass('error').removeClass('done')
        }
        return validatePass(_thisValue)
        break;

      case 'all':
        isValide = isValide && validatePass(_thisValue);
        if (validatePass(_thisValue)) {
          $(this).parent().removeClass('error').addClass('done')
        }
        else {
          $(this).parent().addClass('error').removeClass('done')
        }
        return validatePass(_thisValue)
        break;

        case 'adress':
            isValide = isValide && validateSaytName(_thisValue);
            if (validateSaytName(_thisValue)) {
                $(this).parent().removeClass('error').addClass('done')
            }
            else {
                $(this).parent().addClass('error').removeClass('done')
            }
            return validateSaytName(_thisValue)
            break;

        case 'a_check':
            isValide = isValide && validateTel(_thisValue);
            if (validateTel(_thisValue)) {
                $(this).parent().removeClass('error').addClass('done')
            }
            else {
                $(this).parent().addClass('error').removeClass('done')
            }
            return validateTel(_thisValue)
            break;

        case 'a_sale':
            isValide = isValide && validateTel(_thisValue);
            if (validateTel(_thisValue)) {
                $(this).parent().removeClass('error').addClass('done')
            }
            else {
                $(this).parent().addClass('error').removeClass('done')
            }
            return validateTel(_thisValue)
            break;

        case 'coment':
            isValide = isValide && validateName(_thisValue);
            if (validateName(_thisValue)) {
                $(this).parent().removeClass('error').addClass('done')
            }
            else {
                $(this).parent().addClass('error').removeClass('done')
            }
            return validateName(_thisValue)
            break;
    }
    return false
  });
}

function initTab() {
  $('.tab-menu li').on('click touchstart', function () {
    var _this = $(this);
    if (_this.hasClass('active')) {
      return
    }
    _this.addClass('active').siblings().removeClass('active')
      .parents('.tab')
      .find('.tab-item').removeClass('active').hide().eq(_this.index()).fadeToggle(400, function () {
      _this.parents('.tab')
        .find('.tab-item').eq(_this.index()).addClass('active')
    })

    if ($(this).parents('.tab').find('.count').length) {
      $(this).parents('.tab').find('.count').find('span').text($(this).index() + 1)
    }
    refreshScroll();
    $.fn.fullpage.reBuild();
  })
}

$(document).ready(function () {
  initTab();
  validate();
  closeEl();
  toggleCities();
  toggleNav();
  loader();
  initAccordion();
  initMask();

  if ($('#fullpage').length) {
    refreshScroll();
  }
});


$(window).on('resize', function () {
  if ($('#fullpage').length) {
    if ($('.section.active').find('.fp-scrollable').length) {
      refreshScroll();
    }
    $.fn.fullpage.reBuild();
    setTimeout(function () {
      $.fn.fullpage.reBuild();
      if ($('.section.active').find('.fp-scrollable').length) {
        refreshScroll();
      }
    }, 1000)
  }
})
