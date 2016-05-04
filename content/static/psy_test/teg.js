var data = null;
$(function() {
  $.getJSON('/static/psy_test/data/teg.json', function(_data) {
    data = _data;
    var tmpl = Hogan.compile($('#content_tmpl').text());
    $('#questions').html(tmpl.render(data));
  });
  $('#evaluate').click(function(e) {
    var result = {};
    for (var i = 0; i < data.groups.length; ++i) {
      var curGroup = data.groups[i];
      var tmp = 0;
      $('.question.group_'+curGroup).each(function() {
        var $clicked = $('.btn.active', $(this));
        if (!$clicked) alert('error!');
        if ($clicked.hasClass('btn-yes')) tmp += 2;
        else if ($clicked.hasClass('btn-mid')) tmp += 1;
        else if ($clicked.hasClass('btn-no')) ;
        else alert('error!');
      });
      result[curGroup] = tmp;
    }
    result['Q'] = $('.btn-mid.active').length;
    var sex = $('#evaluate_form .btn.active').hasClass('male') ? 'male' : 'female';
    var graph_data = [], ticks = [], tmpl_data = {};
    for (var tick in result) {
      if (tick == 'Q' || tick == 'L') {
        tmpl_data[tick] = String(result[tick]);
      } else {
        tmpl_data[tick] = String(result[tick]) + ' (' + String(data.score[sex][tick][result[tick]]) + ')';
        ticks.push(tick);
        graph_data.push(data.score[sex][tick][result[tick]]);
      }
    }
    var tmpl = Hogan.compile($('#result_tmpl').text());
    $('#result').html(tmpl.render(tmpl_data));
    var plot = $.jqplot('chart', [graph_data], {
      seriesDefaults: {
        renderer:$.jqplot.BarRenderer,
        rendererOptions: {fillToZero: true}
      },
      series: [
        {}
      ],
      legend: {
        show: false
      },
      axes: {
        xaxis: {
          renderer: $.jqplot.CategoryAxisRenderer,
          ticks: ticks
        },
        yaxis: {
          min: 0,
          max: 100,
          tickOptions: {formatString: '%d%%'}
        }
      }
    });
    console.log(result);
  });
  $(document).on('click', '.question .btn, #evaluate_form .btn', function(e) {
    setTimeout(function() {
      if ($('.question .btn.active').length == $('.question').length && $('#evaluate_form .btn.active').length > 0) {
        $('#evaluate').prop('disabled', false);
      } else {
        $('#evaluate').prop('disabled', true);
      }
    }, 100);
  });
});
