let slider = document.querySelector("#slider");
let verticalSlider = document.querySelector("#verticalSlider");
let blockSlider = document.querySelector("#blockSlider")
let buttonTop = document.querySelector(".scrollUp");
let buttonDown = document.querySelector(".scrollDown");
let leftBtn = document.querySelector(".leftBtn");
let rightBtn = document.querySelector(".rightBtn");
let blockItems = document.querySelector(".blockItems")
let stringItems = document.querySelector(".stringItems")
let btnAllMovies = document.querySelector("#btnAllMovies")
let btnMovies = document.querySelector("#btnMovies")
let btnSerials = document.querySelector("#btnSerials")

let listElems;
let verticalListElems;
let listMostPopular;
let movies;
let serials;

let position = 0; 
let countSlider = 0;
let widthSlider = 0;
let verticalPosition = 0;
let heightSlider = 227;
let verticalCountSlider = 3;

let windowWidth = () => {
    if(document.documentElement.clientWidth >= 1280) {
        widthSlider = 232;
        countSlider = 5;
    } else if(document.documentElement.clientWidth >= 1200) {
        widthSlider = 232;
        countSlider = 5;
    } else if(document.documentElement.clientWidth >= 1024) {
        widthSlider = 226;
        countSlider = 4;
    } else if(document.documentElement.clientWidth >= 992) {
        widthSlider = 160;
        countSlider = 5;
    } else if(document.documentElement.clientWidth >= 768) {
        widthSlider = 178;
        countSlider = 4;
    } else if(document.documentElement.clientWidth >= 576) {
        widthSlider = 176;
        countSlider = 3;
    } else if(document.documentElement.clientWidth >= 360) {
        widthSlider = 156;
        countSlider = 2;  
    }
}

window.addEventListener("resize", windowWidth());

let request = new XMLHttpRequest();
request.open("Get", "https://raw.githubusercontent.com/Ternario/Kaboodle/master/data.json" );
request.onloadend = function () {
    let data = JSON.parse(request.responseText);
    renderHTML(data);
};
request.send();

let renderHTML = (elem) => {

    for (i = 0; i < elem.length; i++) {

        let comingSoon = document.createElement("div");
        comingSoon.className = "comingSoon-slider__item";

        let clonComingSoon = comingSoon.cloneNode(true);
        clonComingSoon.className = "mostPopular-slider__item " + elem[i].type + " active";

        let clonComingSoonBlock = comingSoon.cloneNode(true);
        clonComingSoonBlock.className = "mostpopularBlock-slider__item " + elem[i].type + " active";

        let link = document.createElement("a");
        link.className = "link";
        link.href = elem[i].link;

        let clonLink = link.cloneNode(true)
        clonLink.innerHTML = "Read more";

        let clonLinkBlock = link.cloneNode(true);

        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = elem[i].title;

        let clonTitleBlock = title.cloneNode(true);

        let year = document.createElement("div");
        year.className = "year";
        year.innerHTML = elem[i].year;

        let clonYearBlock = year.cloneNode(true);

        let poster = document.createElement("img");
        poster.className = "poster";
        poster.src = elem[i].poster;

        let clonPoster = poster.cloneNode(true);

        let clonPosterBlock = poster.cloneNode(true);

        let soon = document.createElement("div");
        soon.className = "soon";
        soon.innerHTML = "...";

        let clonSoon = soon.cloneNode(true);
        clonSoon.className = "clonSoon";
        clonSoon.innerHTML = elem[i].rank;

        let clonSoonBlock = soon.cloneNode(true);      

        let comingItems = document.createElement("div");
        comingItems.className = "comingItems";

        let clonComingItems = comingItems.cloneNode(true)

        let clonComingItemsBlock = comingItems.cloneNode(true);

        let clonTitle = title.cloneNode(true);  

        let information = document.createElement("div");
        information.className = "information";

        let content = document.createElement("div");
        content.className = "content";
        content.innerHTML = elem[i].content;

        let itemsBar = document.createElement("div");
        itemsBar.className = "itemsBar";

        let clonYear = year.cloneNode(true);      

        let playMovie = document.createElement("a");
        playMovie.className = "playMovie";

        let clonPlayMovie = playMovie.cloneNode(true);

        let clonPlayMovieBlock = playMovie.cloneNode(true);

        let commentsCount = document.createElement("div");
        commentsCount.className = "commentsCount";
        commentsCount.innerHTML = elem[i].comments_count;

        let clonCommentsCount = commentsCount.cloneNode(true);       

        let clonCommentsCountBlock = commentsCount.cloneNode(true);

        let rank = document.createElement("div");
        rank.className = "rank";
        rank.innerHTML = elem[i].rank;

        let clonRank = rank.cloneNode(true);

        let clonRankBlock = rank.cloneNode(true);

        let likesCount = document.createElement("div");
        likesCount.className = "likesCount";
        likesCount.innerHTML = elem[i].likes_count;

        let clonLikesCounte = likesCount.cloneNode(true);

        let clonlikesCountBlock = likesCount.cloneNode(true);

        let director = document.createElement("div");
        director.className = "director";
        director.innerHTML = "Director: " + elem[i].director;

        let writer = document.createElement("div");
        writer.className = "writer";
        writer.innerHTML = "Writer: " + elem[i].writer;

        let genres = document.createElement("div");
        genres.className = "genres";
        genres.innerHTML = "Genres:";

        for (j = 0; j < elem[i].genres.length; j++) {
            let genresName = document.createElement("div")
            genresName.className = "genresName";
            genresName.innerHTML = elem[i].genres[j] + ";";
            genres.append(genresName);
        }   

        slider.append(comingSoon);
        comingSoon.append(link, title, year, poster, soon, comingItems, playMovie);
        comingItems.append(commentsCount, rank, likesCount);

        verticalSlider.append(clonComingSoon);
        clonComingSoon.append(clonLink, clonPoster, clonSoon, clonComingItems);
        clonComingItems.append(clonTitle, information, content, itemsBar, clonPlayMovie);
        information.append(clonYear, director, writer, genres);
        itemsBar.append(clonCommentsCount, clonRank, clonLikesCounte);

        blockSlider.append(clonComingSoonBlock);
        clonComingSoonBlock.append(clonLinkBlock, clonTitleBlock, clonYearBlock, clonPosterBlock, clonSoonBlock, clonComingItemsBlock, clonPlayMovieBlock);
        clonComingItemsBlock.append(clonCommentsCountBlock, clonRankBlock, clonlikesCountBlock);

    }
    
    listElems = document.querySelectorAll(".comingSoon-slider__item");
    listMostPopular = document.querySelectorAll(".mostPopular-slider__item");
    listMostpopularBlock = document.querySelectorAll(".mostpopularBlock-slider__item")
    verticalListElems = document.querySelectorAll(".active");
    movies = document.querySelectorAll(".Movie");
    serials = document.querySelectorAll(".Serial");

    let showAll = () => {
        for(let i = 0; i < listMostPopular.length || listMostpopularBlock.length; i++) {
            listMostPopular[i].classList.add("active");
            listMostpopularBlock[i].classList.add("active");
        }

        verticalListElems = document.querySelectorAll(".active");
        verticalSlider.style.marginTop = 0;
    }

    let hiddenSerials = () => {
        for(let i = 0; i < serials.length; i++) {
            serials[i].classList.add("active");
        }

        for(let i = 0; i < movies.length; i++) {
            movies[i].classList.remove("active");
        }

        verticalListElems = document.querySelectorAll(".active");
        verticalSlider.style.marginTop = 0;
    }

    let hiddenMovies = ()=> {
        for(let i = 0; i < movies.length; i++) {
            movies[i].classList.add("active");
        }

        for(let i = 0; i < serials.length; i++) {
            serials[i].classList.remove("active");
        }

        verticalListElems = document.querySelectorAll(".active");
        verticalSlider.style.marginTop = 0;
    }
    
    btnAllMovies.addEventListener("click", showAll);
    btnMovies.addEventListener("click", hiddenMovies);
    btnSerials.addEventListener("click", hiddenSerials);

    let nextSlide = () => {
        position = Math.max(position - widthSlider * countSlider, -widthSlider * (listElems.length - countSlider)) ;
        slider.style.marginLeft = position + "px";
    } 

    let prevSlide = () => {
        position = Math.min(position + widthSlider * countSlider, 0);
        slider.style.marginLeft = position + "px";
    }

    rightBtn.addEventListener("click", nextSlide);
    leftBtn.addEventListener("click", prevSlide);

    let goToTop = () => {
        verticalPosition = Math.min(verticalPosition + heightSlider * verticalCountSlider, 0);
        verticalSlider.style.marginTop = verticalPosition + "px";
    }

    let goToDown = () => {
        verticalPosition = Math.max(verticalPosition - heightSlider * verticalCountSlider, -heightSlider * (verticalListElems.length - verticalCountSlider)) ;
        verticalSlider.style.marginTop = verticalPosition + "px";
    }

    buttonTop.addEventListener("click", goToTop);
    buttonDown.addEventListener("click", goToDown); 

    let tr = () => {

        for(let i = 0; i < listMostPopular.length; i++) {
            listMostPopular[i].classList.remove("mostPopular-slider__item")
            listMostPopular[i].classList.add("active-slider__item");
            console.log(listMostPopular.className);
        }
        

    }
    
    // tr()
}





//Attempt to insert dynamic rating


// let grade = document.createElement("div");
//         grade.className = "grade";
//         grade.innerHTML = '<svg class="progress-ring">'  + '<circle class="progress-ring__circle" stroke="#22CA71" stroke-width="8" cx="40" cy="40" r="32" fill="transparent" />' + '</svg>';
//         clonComingSoon.append(grade);

// let circle = document.querySelector(".progress-ring__circle");
//         let radius = circle.r.baseVal.value;
//         let circumference = 2 * Math.PI * radius;

//         circle.style.strokeDasharray = `${circumference} ${circumference}`;
//         circle.style.strokeDashoffset = circumference;
//         let setProgress = (percent) => {
//             let offset = circumference - percent / 100 * circumference;
//             circle.style.strokeDashoffset = offset;

//         }
//         setProgress(elem[i].rank * 10); 

