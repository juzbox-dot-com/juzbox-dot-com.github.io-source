var data = null;
$(function() {
  $.getJSON('/static/psy_test/data/poms.json', function(_data) {
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
        var val;
        if ($clicked.hasClass('btn-0')) val = 0;
        else if ($clicked.hasClass('btn-1')) val = 1;
        else if ($clicked.hasClass('btn-2')) val = 2;
        else if ($clicked.hasClass('btn-3')) val = 3;
        else if ($clicked.hasClass('btn-4')) val = 4;
        else alert('error!');
        tmp += (($(this).hasClass('inverse')) ? (4 - val) : val);
      });
      result[curGroup] = tmp;
    }
    var sex = $('#evaluate_form .btn.active').hasClass('male') ? 'male' : 'female';
    var graph_data = [], tmpl_data = {};
    for (var tick in result) {
      var score_table = data.score[sex][tick], idx;
      if (result[tick] >= score_table.length) {
        idx = score_table.length - 1;
        tmpl_data[tick] = String(result[tick]) + ' (' + String(score_table[idx]) + '+)';
      } else {
        idx = result[tick];
        tmpl_data[tick] = String(result[tick]) + ' (' + String(score_table[idx]) + ')';
      }
      graph_data.push(
        [tick.split('').join('-'),
         data.score[sex][tick][idx]]);
    }
    var tmpl = Hogan.compile($('#result_tmpl').text());
    $('#result').html(tmpl.render(tmpl_data));
    console.log(result);
    $.jqplot.postDrawHooks.push(function() {
      $(".jqplot-overlayCanvas-canvas").css('z-index', '0');//send overlay canvas to back
      $(".jqplot-series-canvas").css('z-index', '1');//send series canvas to front
      $(".jqplot-highlighter-tooltip").css('z-index', '2');
      $(".jqplot-event-canvas").css('z-index', '5');//must be on the very top since it is responsible for event catching and propagation
    });
    var grid = {
        gridLineWidth: 1.5,
        gridLineColor: 'rgb(235,235,235)',
        drawGridlines: true
    };

    var plot = $.jqplot('chart', [graph_data], {
        series:[{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
                barWidth: 30
            }
        }],
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
            },
            yaxis: {
              min: 25,
              max: 85
            }
        }/*,
        //grid: grid,
        canvasOverlay: {
            show: true,
            objects: [
                {horizontalLine: {
                    name: 'danger1',
                    y: 80,
                    lineWidth: 70,
                    color: 'rgba(230, 220, 0, 0.5)',
                    xminOffset: '0',
                    xmaxOffset: '133',
                    lineCap: 'butt',
                    shadow: false
                }},
                {horizontalLine: {
                    name: 'danger2',
                    y: 80,
                    lineWidth: 70,
                    color: 'rgba(230, 220, 0, 0.5)',
                    xminOffset: '180',
                    xmaxOffset: '0',
                    lineCap: 'butt',
                    shadow: false
                }},
                {horizontalLine: {
                    name: 'warn1',
                    y: 67.5,
                    lineWidth: 105,
                    color: 'rgba(255, 255, 120, 0.5)',
                    xminOffset: '0',
                    xmaxOffset: '133',
                    lineCap: 'butt',
                    shadow: false
                }},
                {horizontalLine: {
                    name: 'warn2',
                    y: 67.5,
                    lineWidth: 105,
                    color: 'rgba(255, 255, 120, 0.5)',
                    xminOffset: '180',
                    xmaxOffset: '0',
                    lineCap: 'butt',
                    shadow: false
                }},
                {horizontalLine: {
                    name: 'warn3',
                    y: 32.5,
                    lineWidth: 105,
                    color: 'rgba(255, 255, 120, 0.5)',
                    xminOffset: '134',
                    xmaxOffset: '88',
                    lineCap: 'butt',
                    shadow: false
                }}
            ]
        }*/
    });
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
