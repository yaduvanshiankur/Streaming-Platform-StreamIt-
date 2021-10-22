const toggleButton = document.getElementsByClassName('toggleButton')[0]
const navbarLinks = document.getElementsByClassName('navLinks')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

var slideIndex = 0;
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 15000); // Change image every 15 seconds
}


let xhr;
const loadData = () => {
    xhr = new XMLHttpRequest();
    if(!xhr){
        alert('couldn\'t create xhr object');
        return false;
    }
    xhr.onreadystatechange = reqListener;
    xhr.open('GET' , '/carousel.json');
    xhr.send();
}
window.onload = loadData();
function reqListener() {
    if(xhr.readyState === 4) {
        if(xhr.status === 200 ) {
            carousel = JSON.parse(xhr.responseText).carousel;
            console.log(carousel);
                var fragment = document.createDocumentFragment();
                for(let i=0 ; i<carousel.length ; i++){
                    let item = carousel[i];
                    let slide = document.createElement("div");
                    slide.className = "mySlides fade";
                    slide.innerHTML = '<a href="' + item.href + '">' +
                        '<img class="carouselImage" src=" '+item.src+'" alt="'+ item.alt +'"> </a>' +
                        '<div class="details">'+
                        '<h2 class="title"> '+item.name+' </h2>'+
                        '<p class="description">'+item.description+'</p>'+ 
                        '<button class="watchNow">Watch Now</button>'+
                        '<button class="moreInfo">More info</button>'+
                        '</div>';
                    fragment.appendChild(slide);
                }
                var targetEl = document.getElementsByClassName('slideshow-container')[0];
                targetEl.appendChild(fragment);
                showSlides();
        }
    }
}



const api = "api_key=13947cdbc75b2ddc6fc988b1a5ff95fa";
const base_url = "https://api.themoviedb.org/3";
const img_url= "https://image.tmdb.org/t/p/original/";

const requests = {
    fetchPopular: `${base_url}/discover/movie?${api}&sort_by=popularity.desc`,
    fetchRrated: `${base_url}/discover/movie/?${api}&certification_country=US&certification=R&sort_by=vote_average.desc`,
    fetchKidsMovies: `${base_url}/discover/movie?${api}&certification_country=US&certification.lte=G&sort_by=popularity.desc`,
    fetchHorror: `${base_url}/discover/movie/?${api}&with_genres=27`,
};

fetch(requests.fetchPopular)
.then((res) => res.json())
.then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");                       //<div class="row">
    row.className = "row";                                           //    <h2 class="rowtitle"></h2>
    headrow.appendChild(row);                                        //    <div class="rowCards"
    const title = document.createElement("h2");                      //        <div class="card">     
    title.className = "rowtitle";                                    //            <img src="" alt="">               
    title.innerText = "POPULAR";                                     //            <div class="cardDetails">
    row.appendChild(title);                                          //                <div class="cardTitle"></div>
    const rowCards = document.createElement("div");                  //                <div class="cardDate"></div>
    rowCards.className = "rowCards";                                 //                <div class="cardRating"></div>
    row.appendChild(rowCards);                                       //                <div class="cardRatedBy"></div>
    data.results.forEach(movie => {                                  //                <a class="watchCard" href="#">Watch Now</a>
        const card = document.createElement("div");                  //                <a class="addToList" href="#">Add to List</a>
        card.className = "card";                                     //            </div>
        const posterimg = document.createElement("img");             //        </div>
        posterimg.className= "cardImgLarge";                         //    </div>
        posterimg.src = img_url + movie.poster_path;                 //</div>
        posterimg.alt = img_url + movie.poster_path;
        card.appendChild(posterimg);
        const cardDetails = document.createElement("div");
        cardDetails.className = "cardDetails";
        const cardTitle = document.createElement("div");
        cardTitle.className = "cardTitle";
        cardTitle.innerText = movie.original_title;
        cardDetails.appendChild(cardTitle);
        const cardDate = document.createElement("div");
        cardDate.className = "cardDate"; 
        cardDate.innerText = movie.release_date;
        cardDetails.appendChild(cardDate);
        const cardRating = document.createElement("div");
        cardRating.className = "cardRating";
        cardDetails.appendChild(cardRating);
        cardRating.innerText = "Rating: " + movie.vote_average;
        const cardratedby = document.createElement ("div");
        cardratedby.className = "cardRatedBy";
        cardratedby.innerText = "Rated By: " + movie.vote_count;
        cardDetails.appendChild(cardratedby);
        const watchCard = document.createElement("a");
        watchCard.href = "#";
        watchCard.className = "watchCard";
        watchCard.innerText = "Watch Now";
        cardDetails.appendChild(watchCard);
        const addToList = document.createElement("a");
        addToList.href = "#";
        addToList.className = "addToList";
        addToList.innerText = "Add to List";
        cardDetails.appendChild(addToList)
        card.appendChild(cardDetails);
        rowCards.appendChild(card);
    });
});

fetch(requests.fetchRrated)
.then((res) => res.json())
.then((data) => {
    console.log(data);
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");                  //<div class="row">
    row.className = "row";                                      //    <h2 class="rowtitle"></h2>
    headrow.appendChild(row);                                   //    <div class="rowCards">
    const title = document.createElement("h2");                 //        <div class="card">
    title.className = "rowtitle";                               //            <img src="" alt="">
    title.innerText = "R RATED";                                //            <div class="cardDetails">
    row.appendChild(title);                                     //                <div class="cardTitle"></div>
    const rowCards = document.createElement("div");             //               <div class="cardDate"></div
    rowCards.className = "rowCards";                            //                <div class="cardRating"></div>
    row.appendChild(rowCards);                                  //                <div class="cardRatedBy"></div>
    data.results.forEach(movie => {                             //                <a class="watchCard" href="#">Watch Now</a>
        const card = document.createElement("div");             //                <a class="addToList" href="#">Add to List</a>
        card.className = "card";                                //            </div>
        const posterimg = document.createElement("img");        //        </div>
        posterimg.className= "cardImgLarge";                    //    </div>
        posterimg.src = img_url + movie.poster_path;            //</div>
        card.appendChild(posterimg);                            
        const cardDetails = document.createElement("div");
        cardDetails.className = "cardDetails";
        const cardTitle = document.createElement("div");
        cardTitle.className = "cardTitle";
        cardTitle.innerText = movie.original_title;
        cardDetails.appendChild(cardTitle);
        const cardDate = document.createElement("div");
        cardDate.className = "cardDate"; 
        cardDate.innerText = movie.release_date;
        cardDetails.appendChild(cardDate);
        const cardRating = document.createElement("div");
        cardRating.className = "cardRating";
        cardDetails.appendChild(cardRating);
        cardRating.innerText = "Rating: " + movie.vote_average;
        const cardratedby = document.createElement ("div");
        cardratedby.className = "cardRatedBy";
        cardratedby.innerText = "Rated By: " + movie.vote_count;
        cardDetails.appendChild(cardratedby);
        const watchCard = document.createElement("a");
        watchCard.href = "#";
        watchCard.className = "watchCard";
        watchCard.innerText = "Watch Now";
        cardDetails.appendChild(watchCard);
        const addToList = document.createElement("a");
        addToList.href = "#";
        addToList.className = "addToList";
        addToList.innerText = "Add to List";
        cardDetails.appendChild(addToList)
        card.appendChild(cardDetails);
        rowCards.appendChild(card);
    });
});


fetch(requests.fetchKidsMovies)
.then((res) => res.json())
.then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");                      //<div class="row">
    row.className = "row";                                          //    <h2 class="rowtitle"></h2>
    headrow.appendChild(row);                                       //    <div class="rowCards">
    const title = document.createElement("h2");                     //        <div class="card">
    title.className = "rowtitle";                                   //            <img src="" alt="">
    title.innerText = "KIDS";                                       //            <div class="cardDetails">
    row.appendChild(title);                                         //                <div class="cardTitle"></div>
    const rowCards = document.createElement("div");                 //                <div class="cardDate"></div>
    rowCards.className = "rowCards";                                //                <div class="cardRating"></div>
    row.appendChild(rowCards);                                      //                <div class="cardRatedBy"></div>
    data.results.forEach(movie => {                                 //                <a class="watchCard" href="#">Watch Now</a>
        const card = document.createElement("div");                 //                <a class="addToList" href="#">Add to List</a>
        card.className = "card";                                    //            </div>
        const posterimg = document.createElement("img");            //        </div>
        posterimg.className= "cardImgLarge";                        //    </div>
        posterimg.src = img_url + movie.poster_path;                //</div>
        card.appendChild(posterimg);                                
        const cardDetails = document.createElement("div");
        cardDetails.className = "cardDetails";
        const cardTitle = document.createElement("div");
        cardTitle.className = "cardTitle";
        cardTitle.innerText = movie.original_title;
        cardDetails.appendChild(cardTitle);
        const cardDate = document.createElement("div");
        cardDate.className = "cardDate"; 
        cardDate.innerText = movie.release_date;
        cardDetails.appendChild(cardDate);
        const cardRating = document.createElement("div");
        cardRating.className = "cardRating";
        cardDetails.appendChild(cardRating);
        cardRating.innerText = "Rating: " + movie.vote_average;
        const cardratedby = document.createElement ("div");
        cardratedby.className = "cardRatedBy";
        cardratedby.innerText = "Rated By: " + movie.vote_count;
        cardDetails.appendChild(cardratedby);
        const watchCard = document.createElement("a");
        watchCard.href = "#";
        watchCard.className = "watchCard";
        watchCard.innerText = "Watch Now";
        cardDetails.appendChild(watchCard);
        const addToList = document.createElement("a");
        addToList.href = "#";
        addToList.className = "addToList";
        addToList.innerText = "Add to List";
        cardDetails.appendChild(addToList)
        card.appendChild(cardDetails);
        rowCards.appendChild(card);
    });
});


fetch(requests.fetchHorror)
.then((res) => res.json())
.then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");                              //<div class="row">
    row.className = "row";                                                  //    <h2 class="rowtitle"></h2>                                                                
    headrow.appendChild(row);                                               //    <div class="rowCards">
    const title = document.createElement("h2");                             //        <div class="card">     
    title.className = "rowtitle";                                           //            <img src="" alt="">
    title.innerText = "Horror Movies";                                      //            <div class="cardDetails">
    row.appendChild(title);                                                 //                <div class="cardTitle"></div>
    const rowCards = document.createElement("div");                         //                <div class="cardDate"></div>
    rowCards.className = "rowCards";                                        //                <div class="cardRating"></div>
    row.appendChild(rowCards);                                              //                <div class="cardRatedBy"></div>
    data.results.forEach(movie => {                                         //                <a class="watchCard" href="#">Watch Now</a>
        const card = document.createElement("div");                         //                <a class="addToList" href="#">Add to List</a>
        card.className = "card";                                            //            </div>
        const posterimg = document.createElement("img");                    //        </div>
        posterimg.className= "cardImgLarge";                                //
        posterimg.src = img_url + movie.poster_path;                        //
        card.appendChild(posterimg);
        const cardDetails = document.createElement("div");
        cardDetails.className = "cardDetails";
        const cardTitle = document.createElement("div");
        cardTitle.className = "cardTitle";
        cardTitle.innerText = movie.original_title;
        cardDetails.appendChild(cardTitle);
        const cardDate = document.createElement("div");
        cardDate.className = "cardDate"; 
        cardDate.innerText = movie.release_date;
        cardDetails.appendChild(cardDate);
        const cardRating = document.createElement("div");
        cardRating.className = "cardRating";
        cardDetails.appendChild(cardRating);
        cardRating.innerText = "Rating: " + movie.vote_average;
        const cardratedby = document.createElement ("div");
        cardratedby.className = "cardRatedBy";
        cardratedby.innerText = "Rated By: " + movie.vote_count;
        cardDetails.appendChild(cardratedby);
        const watchCard = document.createElement("a");
        watchCard.href = "#";
        watchCard.className = "watchCard";
        watchCard.innerText = "Watch Now";
        cardDetails.appendChild(watchCard);
        const addToList = document.createElement("a");
        addToList.href = "#";
        addToList.className = "addToList";
        addToList.innerText = "Add to List";
        cardDetails.appendChild(addToList)
        card.appendChild(cardDetails);
        rowCards.appendChild(card);
    });
});