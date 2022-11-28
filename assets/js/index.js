$('#add_data').submit(function () { 
    alert('Data inserted Successfully!');
});

$('#update_data').submit( function(event){
    event.preventDefault();

    var unindexed_arry = $(this).serializeArray();
    var data = {};

     $.map(unindexed_arry,function(n,i){
         data[n['name']] = n['value']
    })

    console.log("hello", data);

    let request ={  
        "url": `http://localhost:3000/api/admin/${data.id}`,
        "method":"PUT",
        "data":data
    }

    // console.log(data);


    $.ajax(request).done(function(cb){
        alert('Data Updated Successfully!')
    })
})



if(window.location.pathname == "/admin"){
    $ondelete = $(".btnDelete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            url : `http://localhost:3000/api/admin/${id}`,
            method : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }
    })
}






