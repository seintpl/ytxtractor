  function extract() {
    url = document.getElementById("yturlinput").value;
    // Youtube parser based on concept from https://web.archive.org/web/20160926134334/http://lasnv.net/foro/839/Javascript_parsear_URL_de_YouTube
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  	var match = url.match(regExp);
  	if (match&&match[7].length==11){
  	    var b=match[7];
  	    if (document.getElementById("yturlinput").classList.contains("is-invalid")) {document.getElementById("yturlinput").classList.remove("is-invalid");} 
  	    document.getElementById("yturlinput").classList.add("is-valid");
        document.getElementById("ytresult").innerHTML = '<div class="valid-feedback" id="fdb">The link looks legit. Trying to fetch data for <b>'.concat(b,'</b></div>');
        document.getElementById("fdb").style.display = 'block';
        var urljson = 'https://www.youtube.com/oembed?url='.concat(url,'&format=json');
        fetch(urljson).then(res => res.json()).then(out => {
          document.getElementById("ytresult").innerHTML += '<div  style="padding-top: 10px;"><b>Title:</b> '.concat(out.title,'</div>');
          document.getElementById("ytresult").innerHTML += '<div><b>Author:</b> <a href="'.concat(out.author_url,'">',out.author_name,'</a></div>');
        });
        document.getElementById("ytimages").innerHTML = '<div style="padding-bottom: 10px;">Getting thumbnails:<br/><img src="https://i1.ytimg.com/vi/'.concat(b,'/1.jpg" /> <img src="https://i1.ytimg.com/vi/',b,'/2.jpg" /> <img src="https://i1.ytimg.com/vi/',b,'/3.jpg" /></div>');
        document.getElementById("ytimages").innerHTML += '<div>Trying high quality:<br/><img src="https://i1.ytimg.com/vi/'.concat(b,'/hqdefault.jpg" style="height: 360px; width: auto; padding-bottom: 5px;" /></div>');
        document.getElementById("ytimages").innerHTML += '<div>Trying higher quality:<br/><img src="https://i1.ytimg.com/vi/'.concat(b,'/sddefault.jpg" style="height: 480px; width: auto; padding-bottom: 5px;" /></div>');
        document.getElementById("ytimages").innerHTML += '<div>Trying best quality:<br/><img src="https://i1.ytimg.com/vi/'.concat(b,'/maxresdefault.jpg" style="width: 80%; padding-bottom: 5px;" /></div>'); 
  	} else {
  	    if (document.getElementById("yturlinput").classList.contains("is-valid")) {document.getElementById("yturlinput").classList.remove("is-valid");}
        document.getElementById("yturlinput").classList.add("is-invalid");
        document.getElementById("ytresult").innerHTML = '<div class="invalid-feedback" id="fdb">There is something wrong with the provided link. Please check it once again.</div>';
        document.getElementById("fdb").style.display = 'block';
        document.getElementById("ytimages").innerHTML = '';
  	}
  }