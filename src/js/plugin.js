var Plugin = function() {
  /*判断浏览器是否低于ie8，低于ie8提示用户升级浏览器*/
  var DEFAULT_VERSION = "8.0";
  var ua = navigator.userAgent.toLowerCase();
  var isIE = ua.indexOf("msie") > -1;
  var safariVersion;
  if (isIE) {
    safariVersion = ua.match(/msie ([\d.]+)/)[1];
  }

  if (parseFloat(safariVersion) < parseFloat(DEFAULT_VERSION)) {
    $('body').html($('<div>您的浏览器太低，请升级您的浏览器，或者使用最新版的谷歌浏览器！</div>')
      .css({
        display: 'inline-block',
        margin: '50px 0',
        fontSize: '28px',
        color: '#5bc9b0',
        padding: '50px',
        background: '#fff',
        border: '1px dashed #5bc9b0'
      })).css('text-align', 'center');
  }
  if (parseFloat(safariVersion) < 10) {
    $('body').addClass('iehack');
  }
  $('.radio').each(function() {
    var id = 'JQ' + Date.now() + parseInt(Math.random() * 1000);
    $(this).children('label').attr('for', id);
    var input = $(this).children('input[type="radio"]');
    if (input.attr('id', id).prop('checked')) {
      $($('input[name="' + $(input).attr('name') + '"]')).parents('.radio').removeClass('checked');
      if ($(input).prop('checked')) {
        $(input).parents('.radio').addClass('checked');
      } else {
        $(input).parents('.radio').removeClass('checked');
      }
    }
  }).on('change', 'input[type="radio"]', function() {
    $($('input[name="' + $(this).attr('name') + '"]')).parents('.radio').removeClass('checked');
    if ($(this).prop('checked')) {
      $(this).parents('.radio').addClass('checked');
    } else {
      $(this).parents('.radio').removeClass('checked');
    }
  });
  $('.checkbox').on('click', function() {
    var label = $(this).children('label');
    var input = $(this).children('input');
    if (input.prop('checked')) {
      label.addClass('checked');
    } else {
      label.removeClass('checked');
    }
  });
  return {}
}();
