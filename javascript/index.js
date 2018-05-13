

var coords = JSON.parse('[{"ID": "LBN406", "Brightness": "18", "Type": "Reflection Neb"},{"ID": "M101", "Brightness": "8.2", "Type": "Galaxy"},{"ID": "M13", "Brightness": "5.8", "Type": "Glob Cluster"},{"ID": "IC1318", "Brightness": "14", "Type": "Emission Nebula"},{"ID": "NGC7000", "Brightness": "14", "Type": "Reflection Neb"},{"ID": "LBN382", "Brightness": "18", "Type": "Emission Nebula"},{"ID": "IC5070", "Brightness": "16", "Type": "Emission Nebula"},{"ID": "NGC6991", "Brightness": "5", "Type": "Open Cluster"},{"ID": "B145", "Brightness": "12", "Type": "Dark Nebula"}]')


$(document).ready(function () {
    fillGrid(coords);



    //console.log(coords);

    $("#showbtn").click(function () {
        $("#form").toggle();
    });

    ///submit grid

    $("#submitgrid").click(function () {

        var valueId = $('#inID').val(),
            valueBrightness = $('#inBrightness').val(),
            valueType = $('#inType').val();


        var subcoords = { "ID": valueId, "Brightness": valueBrightness, "Type": valueType };
        if (valueBrightness >= -20 && valueBrightness <= 20) {
            if (valueType == "Dark Nebula" || valueType == "Reflection Nebula" || valueType == "Emission Nebula" || valueType == "Galaxy" || valueType == "Cluster") {
                if (valueId.replace(/\D+/g, '') >= 1 && valueId.replace(/\D+/g, '') <= 7480) {

                    coords.push(subcoords);
                    fillGrid(coords);
                } else { $("#logform").html("Invalid ID") };

            } else { $("#logform").html("Invalid Type") };

        } else { $("#logform").html("Invalid Brightness") };



    });


    $("#showfilter").click(function () {
        $("#filter").toggle();

    });


    //$("#myInput").on("keyup", function () {
    //  var value = $(this).val();
    //$("#grid").filter(function () {
    //   $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)
    //});     
    //
    // $("#grids").text().not(value).hide();
    // $("#grids").text().filter(value).show//();
    //});

    $("#resetform").click(function () {
        $('input[name=ID').val('');
        $('input[name=Brightness').val('');
        $('input[name=Type').val('');
        $('input[name=IDType').attr('checked', false);
    });

    //filters searching strings



    $("#myInput").keyup(function () {

        var searchcolumn = "ID";
        var filteritem = $(this).val();
        if (filteritem.length > 2) {



            var filteredresults =
                coords.filter(function (elem) {
                    return elem[searchcolumn].indexOf(filteritem) !== -1;


                });
            console.log(filteredresults)
            fillGrid(filteredresults);
        };



    });







});












//caclulator


$("#reset").click(function () {
    $('input[name=diam').val('');
    $('input[name=focal').val('');
    $("#focallength").html(" ");
});
//calculator

$("#calculator").click(function () {
    calculation();

});





function calculation() {
    var foc = $("#focal").val();
    var di = $("#diameter").val();
    if ($.isNumeric(di) && $.isNumeric(foc)) {
        var fr = foc / di;
        $("#focallength").html(fr);
    } else {
        $("#focallength").html("Must be number!");

    };
};


function deleteThis(elem) {
    var keyToRemove = $(elem).parent().data('key');
    coords.splice(keyToRemove, 1);
    fillGrid();
}


function fillGrid(obj) {

    var retHTML = `<tr>
                    <th>ID</th>
                    <th>Brightness</th>
                    <th>Type</th>
                    <th></th>
                </tr>`;
    $.each(obj, function (key, value) {

        retHTML += `<tr data-key="${key}">
                        <td>${value.ID}</td>
                        <td>${value.Brightness}</td>
                        <td>${value.Type}</td>
                        <td onclick="deleteThis(this)" class="deleteBtn">Remove</td>
                    </tr>`;
    });
    $("#grid").html(retHTML);

};

