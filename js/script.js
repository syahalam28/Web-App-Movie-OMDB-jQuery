// Merubah Json Menjadi Objek

		// $.getJSON('http://www.omdbapi.com/?apikey=9aae4b93&s=harry%20potter',function(hasil){
		// console.log(hasil);
		// // console.log(hasil['Search'][0]['Title']);
		// // let movie = hasil.Search;
		// // console.log(movie[0]['Title']);

		// });

function searchMovie() {
// Ketika Button Search di click maka layar akan menghilangkan isi data terlebih dahulu kemudian baru menampilkan data yang dipilih
$('#movie-list').html('');
// $.getJson = $.ajax (Beda cara penulisannya saja)
// data berisikan parameter yang digunakan pada api, berdasarkan dokumentasi omdb api bahwa parameter yang wajib dituliskan adalah 'apikey' untuk auth dan 's' untuk pencarian (optional) disesuaikan dengan kebutuhan
// Mengambil value / nilai dari inputan menggunakan jQuery dengan perintah $('#serach-input').val();
$.ajax({
	url : 'http://www.omdbapi.com/',
	type : 'get',
	dataType : 'json',
	data : {
		'apikey' : '9aae4b93',
		's' : $('#search-input').val()
	},
	success : function(isi_json){
		// Response == "True" diambil dari data yang ada pada json yaitu data response
		// Error = merupakan key yang ada pada data json ketika tidak ada movie.

		if (isi_json.Response == "True") {

			// Untuk mengambil data array yang ada pada json dengan menghilangkan objek key Search

			// "Search": [
			// 	{
			// 		"Title": "Harry Potter and the Deathly Hallows: Part 2",
			// 		"Year": "2011",
			// 		"imdbID": "tt1201607",
			// 		"Type": "movie",
			// 		"Poster": "https://m.media-amazon.com/images/M/SX300.jpg"
			// 	},

			// Sehingga langsung bisa didapatkan Value lainnya seperti Title dsb
			// `` =  Agar kita bisa membuat spasi dan enter ketika membuat kode HTML di JQuery
			// Pada detail terdapat data-toggle dan data-target berfungsi ketika see detail di click akan menampilkan sebuah modal, class sumber bootstarp, see detail digunakan sebagai trigger

			let movies = isi_json.Search;
			
			$.each(movies,function(i, hasil_json){

				$('#movie-list').append(`
					<div class="col-md-4">
					<div class="card mb-3">
					  <img class="card-img-top" src="`+ hasil_json.Poster+`" alt="Card image cap">
					  <div class="card-body">
					    <h5 class="card-title">`+hasil_json.Title +`</h5>
					     <h6 class="card-subtitle mb-2 text-muted">`+hasil_json.Year+`</h6>
					    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					      <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ hasil_json.imdbID +`">See Detail</a>
					  </div>
					</div>
			`);


			});

			// Menghilangkan Teks pada kolom pencarian setelah berhasil menampilkan film
			$('#search-input').val('');

		}else{
			$('#movie-list').html(`
				<div class="col">	
				<h1 class="text-center">`+isi_json.Error+`</h1>
				<div>
				`)
			// Menghilangkan Teks pada kolom Pencarian Setelah Berhasil Menampilkan Film
				$('#search-input').val('');
		}
	}

});
	
}

// Ketika Tombol Pencarian Di Click Maka Lakukan Pencarian Data Json
$('#search-button').on('click', function(){
searchMovie();
});

// Ketika Tombol Pencarian di Enter
// Parameter e membuat sebuah function dijalankan berdasarkan parameternya.
// KeyCode enter = 13
// keyCode = which
$('#search-input').on('keyup',function(e){
	if (e.keyCode === 13) {
		searchMovie();
	}

});

// Membuat fungsi ketika see detail di click akan menampilkan detail film
// Pada see detail terdapat id dari film yang diambil dari API
// Ketika see detail di click maka akan membawa data id film, kemudian akan dilakukan parsing api kembali berdasarkan id
// Event Bubble (binding / delegation)
// Karena class see-detail tidak ada pada HTML adanya pada Javascript, yang muncul ketika melakukan pencarian film, maka pada fungsi yang dipanggil harus parent dari class see-detail yaitu paren utama tempat dimana see-detail akan ditampilkan kemudian di ikuti class yang akan dipanggil

{/* <div class="row" id="movie-list">
// Disini tempat card list film ditampilkan dimana di dalamnya akan ada see-detail
</div> */}
// Sehingga format penulisannya menjadi seperti di bawah ini
$('#movie-list').on('click','.see-detail',function(){
// Mengambil Id (data-id) yang berada pada see detail yang bersumber dari API
// console.log($(this).data('id')); 

// Parsing data dari API
// Ambil Id berdasarkan apa yang di pilih, this untuk menunjukan pada javascript bahwa item ini yang sedang di pilih / tombol detail yang sedang di click
// 	'i' : $(this).data('id')
$.ajax({
	url : 'http://www.omdbapi.com/',
	type : 'get',
	dataType : 'json',
	data : {
		'apikey' : '9aae4b93',
		'i' : $(this).data('id')
	},
	success : function(isi_json){
		if (isi_json.Response === "True") {
			$('.modal-body').html(`
			<div class="container-fluid">
   		 		<div class="row">
      				<div class="col-md-4">
					<img src="`+ isi_json.Poster +`" class="img-fluid">
					</div>

					<div class="col-md-8">
					<ul class="list-group">
						<li class="list-group-item"><h4>`+isi_json.Title+`</li>
						<li class="list-group-item">`+isi_json.Released+`</li>
						<li class="list-group-item">`+isi_json.Genre+`</li>
						<li class="list-group-item">`+isi_json.Director+`</li>
						<li class="list-group-item">`+isi_json.Actors+`</li>
				
					</ul>
					</div>
				</div>
			</div>
			
			`)
		}

	}
});


});
