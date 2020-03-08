function randomRange(min, max) {
    return min + Math.random() * (max - min);
}


function sickenessMap() {


    function handleHouseData(houses) {

        let lon = [];
        let lat = [];
        let z = [];

        const positions = houses;
        const used = [];

        for (let i = 0; i < positions.length; ++i) {
            if (+(positions[i][24]) > -64 && +(positions[i][24]) < -63
                && +(positions[i][23]) > 44 && +(positions[i][23]) < 44.8
            ) {
                if (Math.random() > 0.55) {
                    used.push(positions[i]);
                    lon.push(positions[i][24]);
                    lat.push(positions[i][23]);
                    z.push(randomRange(0.1, 3));
                }
            }
        }
        console.log(used);

        const data = [{ type: 'densitymapbox', lon: lon, lat: lat, z: z }];

        let layout = {
            width: 900, height: 700, mapbox: { style: 'stamen-terrain' },
            colorscale: 'YIOrRd',
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 30,
                pad: 4
            }
        };

        let hospData = hospitalsData();
        data.push({
            type: 'scattermapbox',
            mode: 'markers',
            marker: {
                size: 7,
                color: '#7a0b6f',
                marker: {
                    size: 32
                },
            },
            lon: hospData.map(x => x.x), lat: hospData.map(x => x.y), text: hospData.map(x => x.name)
        });



        Plotly.newPlot('heatMap', data, layout)
    }

    handleHouseData(smallHousesData());

    // d3.json("houses.json").then(houses => {
    //     handleHouseData(houses.data);
    // });

}

function hospitalsMap() {

    let hospData = hospitalsData();
    const data = [{
        type: 'scattermapbox',
        mode: 'markers',
        marker: {
            size: 7,
            color: [
                '#bebada', '#fdb462', '#fb8072', '#d9d9d9', '#bc80bd',
                '#b3de69', '#8dd3c7', '#80b1d3', '#fccde5', '#ffffb3'
            ],
            line: {
                width: 1
            }
        },
        lon: hospData.map(x => x.x), lat: hospData.map(x => x.y), text: hospData.map(x => x.name)
    }]

    let layout = { width: 800, height: 600, mapbox: { style: 'stamen-terrain' } };

    Plotly.newPlot('hospitalsMap', data, layout)
    // .then(gd => {
    //     var px2ll = gd._fullLayout.geo._subplot.projection.invert

    //     gd.addEventListener('mousemove', (evt) => {
    //         var ll = px2ll(px2ll([evt.clientX, evt.clientY]))
    //         console.log(ll)
    //     })
    // });
}

sickenessMap();
// hospitalsMap();



function updateBody(data) {
    const rect = d3.select("image").node().getBoundingClientRect();

    const colorScale = d3.scaleLinear().range(["#FF5555", "#990000"]).domain([0, 5])

    d3.select("#body-heat").selectAll("circle").data(data)
        .join(
            create => {
                const c = create.append("circle").classed("heat", true)
                    .attr("cx", d => d.x * rect.width)
                    .attr("cy", d => d.y * rect.height)
                    .attr("fill", d => colorScale(d.z))
                    .attr("r", d => 6).style("opacity", 0);
                c.transition().delay((d, i) => randomRange(1, 500)).duration(500)
                    .style("opacity", 0.1)
                return c;
            },
            update => update.attr("cx", d => d.x * rect.width)
                .attr("cy", d => d.y * rect.height)
                .attr("fill", d => colorScale(d.z))
                .attr("r", d => 6).style("opacity", 0)
                .transition().delay((d, i) => randomRange(1, 500)).duration(500)
                .style("opacity", 0.1)
            ,
            exit => exit.remove()
        )
}


function bodyData() {
    d3.csv("Notifiable_Diseases_Counts_and_Rates_By_Age_Group_2014-2017.csv").then(data => {
        console.log(data);

        // Setup year options
        const yearOptions = d3.select("#body-year");
        yearOptions.selectAll("option").remove();
        yearOptions.selectAll("option").data([...new Set(data.map(d => d.Year))])
            .join(create => create.append("option").text(d => d));

        const ageOptions = d3.select("#body-agegroup");
        ageOptions.selectAll("option").remove();
        ageOptions.selectAll("option").data([...new Set(data.map(d => d["Age Group"]))])
            .join(create => create.append("option").text(d => d));


        const bodyParts = [
            {
                "x": 0.3672922252010724,
                "y": 0.45166666666666666,
                "z": 11.271595034657295,
                "name": "lung"
            },
            {
                "x": 0.3272922252010724,
                "y": 0.69166666666666666,
                "z": 11.271595034657295,
                "name": "immuno"
            },
            {
                "x": 0.782922252010724,
                "y": 0.48166666666666666,
                "z": 11.271595034657295,
                "name": "muscle"
            },
            {
                "x": 0.6246648793565683,
                "y": 0.4533333333333333,
                "z": 10.529550815610099,
                "name": "lung"
            },
            {
                "x": 0.579088471849866,
                "y": 0.6316666666666667,
                "z": 13.553865548867993,
                "name": "stomach"
            },
            {
                "x": 0.48525469168900803,
                "y": 0.7783333333333333,
                "z": 17.08246520253466,
                "name": "intestine"
            },
            {
                "x": 0.3806970509383378,
                "y": 0.5916666666666667,
                "z": 18.410284497427604,
                "name": "liver"
            },
            {
                "x": 0.4445308310991957,
                "y": 0.055,
                "z": 11.61001551284453,
                "name": "brain"
            },
            {
                "x": 0.4845308310991957,
                "y": 0.105,
                "z": 11.61001551284453,
                "name": "forehead"
            },
            {
                "x": 0.5576407506702413,
                "y": 0.15,
                "z": 15.441133482847118,
                "name": "eye"
            },
            {
                "x": 0.4343163538873995,
                "y": 0.15,
                "z": 13.10077224351766,
                "name": "eye",
                "hide": true,
            },
            {
                "x": 0.2225201072386059,
                "y": 0.355,
                "z": 16.792112717904466,
                "name": "skin"
            },
            {
                "x": 0.4906166219839142,
                "y": 0.26,
                "z": 16.965084193019912,
                "name": "throat"
            },
            {
                "x": 0.55525469168900803,
                "y": 0.875,
                "z": 11.322608268398783,
                "name": "sexual"
            },
            {
                "x": 0.48525469168900803,
                "y": 0.90,
                "z": 11.322608268398783,
                "name": "anus"
            },
            {
                "x": 0.8605898123324397,
                "y": 0.575,
                "z": 14.638093828797214,
                "name": "joint"
            },
            {
                "x": 0.13404825737265416,
                "y": 0.5966666666666667,
                "z": 16.445571062120724,
                "name": "joint"
            },
            {
                "x": 0.06702412868632708,
                "y": 0.915,
                "z": 16.805639413837675,
                "name": "hand"
            },
            {
                "x": 0.9436997319034852,
                "y": 0.8933333333333333,
                "z": 10.873204905632676,
                "name": "hand"
            },
            {
                "x": 0.4906166219839142,
                "y": 0.42333333333333334,
                "z": 13.474213699350592,
                "name": "heart"
            }
        ];
        //bodyParts.forEach((d,i) => d.name = ""+i);

        // Setup labels
        const rect = d3.select("image").node().getBoundingClientRect();
        d3.select("#label-group").selectAll("text").data(bodyParts.filter(d => !d.hide), d => d.name)
            .join(
                create => create.append("text")
                    .text(d => d.name).classed("parts", true)
                    .attr("x", d => d.x * rect.width)
                    .attr("y", d => d.y * rect.height)
            );

        // Make dict list for body parts
        const bodyPartsByName = {};
        bodyParts.forEach(x => {
            if (!(x.name in bodyPartsByName)) {
                bodyPartsByName[x.name] = [x];
            }
            bodyPartsByName[x.name].push(x);
        });

        function dataPointAt(name, force) {
            let point = bodyPartsByName[name];
            if (point == undefined) {
                console.log("UNMAPED: " + name);
                //point = [bodyParts[Math.floor(randomRange(0, bodyParts.length))]];
                return [];
            }
            return point.map(point => {
                let rad = randomRange(0, Math.PI*2);
                return {
                    x: point.x + Math.cos(rad)*randomRange(0, 0.03),
                    y: point.y + Math.sin(rad)*randomRange(0, 0.03),
                    z: force,
                }
            });
        }

        function showBodyForYear(filterAge, filterYear) {
            const filteredData = data.filter(d => d["Age Group"] == filterAge).filter(d => d.Year == filterYear);
            let newPoints = [];
            filteredData.forEach(d => {
                for (let i = 0; i < +d["Number of Cases"]; ++i) {
                    newPoints = newPoints.concat(dataPointAt(d.bodypart, d.level))
                }
            });
            console.log(`${filterAge} ${filterYear} - ${newPoints.length}\n`);
            updateBody(newPoints);
        }

        d3.select("#body-year").on("change", function (d) {
            const filterAge = d3.select("#body-agegroup").node().value;
            showBodyForYear(filterAge, this.value);
        });
        d3.select("#body-agegroup").on("change", function (d) {
            const filterYear = d3.select("#body-year").node().value;
            showBodyForYear(this.value, filterYear);
        });

        showBodyForYear("2014"); // default

    });
}

window.onload = function () {

    let dataYear = {
        "2017": bodyDataSet2015(),
        "2016": bodyDataSet2016(),
        "2015": bodyDataSet2017(),
    };

    // let bodyMap = dataYear[2017];
    // updateBody(bodyMap);

    d3.select("button").on("click", d => bodyMap = [])

    d3.select("#body-year").on("change", function () {
        bodyMap = dataYear[this.value];
        updateBody(bodyMap);

        console.log(d);
    });

    d3.select("image").on("click", function (d) {
        console.log(this);
        const rect = this.getBoundingClientRect();
        const pos = d3.mouse(this);

        bodyMap.push({
            x: pos[0] / rect.width,
            y: pos[1] / rect.height,
            z: randomRange(10, 20),
        });
        console.log(bodyMap);

        updateBody(bodyMap);

    });

    bodyData();
}

