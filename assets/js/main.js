const slider = document.querySelector("#slider"),
      blockItems = document.querySelector("#blockItems"),
      stringItems = document.querySelector("#stringItems"),
      btnAllMovies = document.querySelector("#btnAllMovies"),
      btnMovies = document.querySelector("#btnMovies"),
      btnSerials = document.querySelector("#btnSerials"),
      itemsPlaceBlock = document.querySelector("#itemsPlaceBlock"),
      itemsPlaceString = document.querySelector("#itemsPlaceString");

fetch("https://raw.githubusercontent.com/Ternario/Kaboodle/master/data.json")
    .then(response => response.json())
    .then(data => getData(data))
    .catch(err => console.error(err));

const movies = [];
let flag = true;
let type = "";

let getData = (data) => {
    data.forEach(data => {
        movies.push(data);
    });

    renderSlider(movies, slider);
    renderSlider(movies, itemsPlaceBlock);

    $(".responsive").slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1111,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2
            }
          }
        ]
    });
};

let renderSlider = (elem, placeAppend) => {
    let place = "comingSoon-slider__item ";

    if(placeAppend == itemsPlaceBlock) {
        updateData(itemsPlaceBlock);
        place = "mostPopular-block__item ";
    };

    elem.map(elem => {
        let comingSoon = document.createElement("div");
            comingSoon.className = "comingSoon-slider__item ";
            comingSoon.innerHTML = `
            <a class="link" href=${elem.link}></a>
            <div class="title">${elem.title}</div>
            <div class="year">${elem.year}</div>
            <img class="poster" src=${elem.poster}>
            <div class="soon">...</div>
            <div class="comingItems">
                <div class="commentsCount">${elem.comments_count}</div>
                <div class="rank">${elem.rank}</div>
                <div class="likesCount">${elem.likes_count}</div>
            </div>
            <a class="playMovie"></a>`

        placeAppend.append(comingSoon);
    });
};

let renderElementsRow = (elem) => {
    
    updateData(itemsPlaceString);

    elem.map(elem => {

        let genresName = "";

        elem.genres.map(elem => {
            genresName += elem + ", ";
        });

        genresName = genresName.slice(0, -2);

        let clonComingSoonBlock = document.createElement("div");
            clonComingSoonBlock.className = "mostPopular-string__item ";
            clonComingSoonBlock.innerHTML = `
            <a class="link" href=${elem.link}>Read more</a>
            <img class="poster" src=${elem.poster}>
            <div class="soon">${elem.rank}</div>
            <div class="comingItems">
                <div class="title">${elem.title}</div>
                <div class="information">
                    <div class="year">${elem.year}</div>
                    <div class="director">"Director: ${elem.director}"</div>
                    <div class="writer">Writer: ${elem.writer}</div>
                    <div class="genres">Genres: ${genresName}</div>
                </div>
                <div class="content">${elem.content}</div>
                <div class="itemsBar">
                    <div class="commentsCount">${elem.comments_count}</div>
                    <div class="rank">${elem.rank}</div>
                    <div class="likesCount">${elem.likes_count}</div>
                </div>
                <a class="playMovie"></a>
            </div>
            `
        itemsPlaceString.append(clonComingSoonBlock);
    });
} ;

let updateData = (place) => {
    while(place.firstChild) {
        place.removeChild(place.firstChild);
    };
};

let filterItems = (movies, type) => {
    let item = [];
    item = movies.filter(movie => movie.type === type);

    if(flag) {
        renderSlider(item, itemsPlaceBlock);
    } else {
        renderElementsRow(item);
    };
};

btnAllMovies.addEventListener("click", () => {
    type = "";
    if (flag) {
        renderSlider(movies, itemsPlaceBlock);
    } else {
        renderElementsRow(movies);
    };
});

btnMovies.addEventListener("click", () => {
    type = "Movie";
    filterItems(movies, type);
});

btnSerials.addEventListener("click", () => {
    type = "Serial";
    filterItems(movies, type);
});

blockItems.addEventListener("click", () => {
    flag = true;
    updateData(itemsPlaceString);

    if(type === "") {
        renderSlider(movies, itemsPlaceBlock);
    } else {
        filterItems(movies, type);
    }
});

stringItems.addEventListener("click", () => {
    flag = false;
    updateData(itemsPlaceBlock);

    if(type === "") {
        renderElementsRow(movies);
    } else {
        filterItems(movies, type);
    }
});


//insert dynamic rating


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
