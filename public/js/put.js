$("#updatePost").submit(function(e){
   e.preventDefault();
   $(".message").html("Wait, we are submitting your post...");
   // const createdBy = $(this).find("id","datarange").val();
   var title =  $('#title').val();
   var summary =  $('#summary').val();
   var content =  $('#content').val();
   var id = $('#id').val();
   var values = { title:title, summary:summary, content:content, id:id};
   values = JSON.stringify(values);  
   $.ajax({  
      url: 'https://kigali.herokuapp.com/posts',  
      type: 'PUT',  
      dataType: 'json', 
      data:values,
      contentType: 'application/json; charset=utf-8',
      timeout: 20000,  
      success: function (data, textStatus, xhr) { 
            $(".message").html(data.message);
            $(".error").hide();
      },
      error: function (xhr, textStatus, errorThrown) {  
            $(".message").html("");      
            if(textStatus==="timeout") {
                  $(".error").show().html("Whooch, the server is taking to long time to respond!");
            } else {
                  var err = JSON.parse(xhr.responseText);
                  $(".error").show().html(err.error);
            } 
      }  
   });
});