function getPlots(id) {


d3.json("samples.json").then (bellydata =>{
    console.log(bellydata)
        var sample_ids = bellydata.samples[0].otu_ids;
    console.log(sample_ids)
        var OTU_values =  bellydata.samples[0].sample_values.slice(0,10).reverse();
    console.log(OTU_values)
        var sample_labels =  bellydata.samples[0].otu_labels.slice(0,10);
    console.log (sample_labels)
        var Top_OTU = ( bellydata.samples[0].otu_ids.slice(0, 10)).reverse();
        var Subject_id = Top_OTU.map(d => "OTU " + d);
    console.log(`OTU IDS: ${Subject_id}`)
        var sample_labels =  bellydata.samples[0].otu_labels.slice(0,10);
    console.log(`OTU_labels: ${sample_labels}`)
        var trace1 = {
            x: OTU_values,
            y: Subject_id,
            text: sample_labels,
            marker: {
            color: 'orange'},
            type:"bar",
            orientation: "h",
};


        var data = [trace1];

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 150,
                r: 150,
                t: 150,
                b: 25
            }
};



Plotly.newPlot("bar", data, layout);

        var trace2 = {
            x: bellydata.samples[0].otu_ids,
            y: bellydata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: bellydata.samples[0].sample_values,
                color: bellydata.samples[0].otu_ids
            },
            text:  bellydata.samples[0].otu_labels

        };
    
    });
}  


function init() {

        var drop_down = d3.select("#selDataset");


d3.json("samples.json").then((data)=> {
    console.log(data)

        data.names.forEach(function(name) {
            drop_down.append("option").text(name).property("value");
        });

            getPlots(data.names[0]);
    });
}


init()