var coords = JSON.parse('[{"ID": "Nebula", "Mag": "10", "Size": "10"}, {"ID": "Nebula", "Mag": "10", "Size": "10"},{"ID": "Nebula", "Mag": "10", "Size": "10"},{"ID": "Nebula", "Mag": "10", "Size": "10"},{"ID": "Nebula", "Mag": "10", "Size": "10"},{"ID": "Nebula", "Mag": "10", "Size": "10"},{"ID": "Nebula", "Mag": "10", "Size": "10"},{"ID": "Nebula", "Mag": "10", "Size": "10"}]')

$(document).ready(function () {

    fillGrid(coords);
    console.log(coords);

    $("#showbtn").click(function () {
        $("#form").toggle();
    });


    $("#submitgrid").click(function () {

        var valueId = $('#inID').val(),
            valuemag = $('#inMag').val(),
            valuesize = $('#inSize').val();

        var subcoords = { "ID": valueId, "Mag": valuemag, "Size": valuesize };
        coords.push(subcoords);

        fillGrid();

    });

    $("#showfilter").click(function(){
        $("#filter").toggle();


    });


    $("#myInput").on("keyup", function () {
        var value = $(this).val();
        $("#grid").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput2").on("keyup", function () {
        var value = $(this).val();
        $("#grid").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myInput3").on("keyup", function () {
        var value = $(this).val();
        $("#grid").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    
    $("#calculator").click(function(){
       calculation();
    });

    $("#reset").click(function () {
        $('input[name=diam').val('');
        $('input[name=focal').val('');
        $("#focallength").html(" ");
    });

});

  


    function calculation(){
        var foc=$("#focal").val();
        var di=$("#diameter").val();
        if ($.isNumeric(di)&&$.isNumeric(foc)){
            var fr =foc/di;
            $("#focallength").html(fr);
        }else{
            $("#focallength").html("Must be number!");
    
        };
    };
    


function deleteThis(elem) {
    var keyToRemove = $(elem).parent().data('key');
    coords.splice(keyToRemove, 1);
    fillGrid();
}




function fillGrid() {

    var retHTML = `<tr>
                    <th>ID</th>
                    <th>Mag</th>
                    <th>Size</th>
                    <th></th>
                </tr>`;
    $.each(coords, function (key, value) {

        retHTML += `<tr data-key="${key}">
                        <td>${value.ID}</td>
                        <td>${value.Mag}</td>
                        <td>${value.Size}</td>
                        <td onclick="deleteThis(this)" class="deleteBtn">Remove</td>
                    </tr>`;
    });
    $("#grid").html(retHTML);

};
