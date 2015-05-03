(function()
{
    // todo library with init and expend + rework D3

    var TMPpercent = 77;

    var exploitableData = 360/100 * TMPpercent;

    var config = {
        width: 300,
        height: 300,
        start: 0
    };

    var outerRadius = config.height / 2,
        innerRadius = outerRadius / 2;

    // define arcs
    var mainArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(config.start)
        .endAngle(exploitableData * (Math.PI/180)); // transform deg to rad

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
        .attr('class', 'inner-circle')

    // add central text
    var text = svg.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('class', 'percent-text')
        .attr("dy", ".35em")
        .text(TMPpercent + '%');

    // draw arcs
    svg.append('path')
        .attr("d", backgroundArc)
        .attr('class', 'arc-background');

    svg.append('path')
        .attr("d", mainArc)
        .attr('class', 'arc-main');

})();