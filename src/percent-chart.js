(function()
{
    var TMPpercent = 78;

    var exploitableData = 360/100 * TMPpercent;

    var config = {
        width: 300,
        height: 300,
        start: 0,
        radial: false,
        circle: true,
        duration: 1250,
        easeAnimation: 'bounce'
    };

    var outerRadius = config.height / 2,
        innerRadius = outerRadius / 2,
        percentRadius = ((outerRadius - innerRadius)/100) * TMPpercent,
        mainOuterRadius = (config.radial) ? innerRadius + percentRadius : outerRadius,
        endAngle = ((config.circle) ? exploitableData : 360) * (Math.PI/180);

    // define arcs
    var mainArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(mainOuterRadius);

    var backgroundArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(config.start)
        .endAngle(360 * (Math.PI/180));

    // add svg container
    var svg = d3.select(".percent-chart")
        .append('svg')
        .attr('width', config.width)
        .attr('height', config.height)
        .append('g')
        .attr('transform', 'translate(' + (config.width / 2) +  ',' + (config.height / 2) + ')');

    // add white central circle
    var circle = svg.append('circle')
        .attr('r', innerRadius)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('class', 'inner-circle');

    // add central text
    var text = svg.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('class', 'percent-text')
        .attr("dy", ".35em")
        .text(0)
        .transition()
        .duration(config.duration)
        .ease(config.easeAnimation)
        .tween("text", function()
        {
            var i = d3.interpolate(this.textContent, TMPpercent);
            return function(t) {
                this.textContent = Math.round(i(t)) + '%';
            };
        });

    // draw arcs
    svg.append('path')
        .attr("d", backgroundArc)
        .attr('class', 'arc-background');

    svg.append('path')
        .data([{startAngle: config.start, endAngle: endAngle}])
        .attr('class', 'arc-main')
        .transition()
        .duration(config.duration)
        .ease(config.easeAnimation)
        .attrTween("d", function (d)
        {
            var start = {
                startAngle: config.start,
                endAngle: config.start
            };

            var interpolate = d3.interpolate(start, d);
            return function (t)
            {
                return mainArc(interpolate(t));
            };
        });

})();