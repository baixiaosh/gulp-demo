(function($) {
  var a = function(time) {
    var $this = $(this),
      timer = 0,
      pager = $this.find('.s-pager'),
      wrapper = $this.find('.s-wrapper'),
      slides = $this.find('.s-slide');
    var setSize = function() {
      var
        width = $this.width(),
        height = slides.height();

      $this.height(height);
      slides.width(width);
      wrapper.width(width * slides.length);
      wrapper.height(height);
    }
    setSize();
    pager.html('');
    for (var i = 0; i < slides.length; i++) {
      pager.append('<span></span>');
    }
    pager.find('span').eq(slides.filter('.active').index()).addClass('active').siblings().removeClass('active');

    var next = function() {
      var active = slides.filter('.active');
      var nextEl = active.next();
      nextEl.length ? nextEl = nextEl : nextEl = slides.eq(0);
      pager.find('span').eq(nextEl.index()).addClass('active').siblings().removeClass('active');
      nextEl.addClass('active').siblings().removeClass('active');
      wrapper.stop(true, false).animate({
        left: -nextEl.position().left + 'px'
      }, 'slow', 'swing');
      timer = setTimeout(next, time);
    }
    pager.on('click', 'span', function() {
      clearTimeout(timer);
      var nextEl = slides.eq($(this).index());
      $(this).addClass('active').siblings().removeClass('active');
      nextEl.addClass('active').siblings().removeClass('active');
      wrapper.stop(true, false).animate({
        left: -nextEl.position().left + 'px'
      }, 'slow', 'swing');
      timer = setTimeout(next, time);
    });
    timer = setTimeout(next, time);
    $(window).resize(function() {
      setSize();
    });
  };
  $.fn.extend({
    swiper: a
  });
})(jQuery);
