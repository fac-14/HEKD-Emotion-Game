var blah = document.getElementById("image-preview")
    var imgInp = document.getElementById("file-upload")

    function readURL(input){
            if(input.files && input.files[0]) {
              var reader = new FileReader();
            reader.onload = function(e) {
            blah.setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);

  }
}

imgInp.onchange = function(){
    readURL(this)
}
