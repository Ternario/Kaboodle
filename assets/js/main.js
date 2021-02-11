const slider = document.querySelector("#slider"),
    blockItems = document.querySelector("#blockItems"),
    stringItems = document.querySelector("#stringItems"),
    btnAllMovies = document.querySelector("#btnAllMovies"),
    btnMovies = document.querySelector("#btnMovies"),
    btnSerials = document.querySelector("#btnSerials"),
    itemsPlaceBlock = document.querySelector("#itemsPlaceBlock"),
    itemsPlaceString = document.querySelector("#itemsPlaceString");

const movies = [];
let flag = true;
let type = ""; 

fetch("https://raw.githubusercontent.com/Ternario/Kaboodle/master/data.json")
    .then(response => response.json())
    .then(data => getData(data))
    .catch(err => console.error(err));

window.addEventListener("resize", () => {
    if (document.documentElement.clientWidth <= 576 && flag !== true) {
        flag = true;
        updateData(itemsPlaceString);

        if (type === "") {
            renderSlider(movies, itemsPlaceBlock);
        } else {
            filterItems(movies, type);
        }
    };
});

let getData = (data) => {
    data.forEach(data => {
        movies.push(data);
    });

    renderSlider(movies, slider);
    renderSlider(movies, itemsPlaceBlock);

    $('.multiple-items').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
};

let renderSlider = (elem, placeAppend) => {
    let place = "comingSoon-slider__item ";

    if (placeAppend == itemsPlaceBlock) {
        updateData(itemsPlaceBlock);
        place = "mostPopular-block__item ";
    };

    elem.map(elem => {
        let comingSoon = document.createElement("div");
        comingSoon.className = place;
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

        let mostPopular = document.createElement("div");
        mostPopular.className = "mostPopular-string__item ";
        mostPopular.innerHTML = `
            <a class="link" href=${elem.link}>Read more</a>
            <img class="poster" src=${elem.poster}>
            <div class="soon">${elem.rank}</div>
            <div class="comingItems">
                <div class="title">${elem.title}</div>
                <div class="information">
                    <div class="year">${elem.year}</div>
                    <div class="director">Director: ${elem.director}</div>
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
        itemsPlaceString.append(mostPopular);
    });
};

let updateData = (place) => {
    while (place.firstChild) {
        place.removeChild(place.firstChild);
    };
};

let filterItems = (movies, type) => {
    let item = [];
    item = movies.filter(movie => movie.type === type);

    if (flag) {
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

    if (type === "") {
        renderSlider(movies, itemsPlaceBlock);
    } else {
        filterItems(movies, type);
    }
});

stringItems.addEventListener("click", () => {
    flag = false;
    updateData(itemsPlaceBlock);

    if (type === "") {
        renderElementsRow(movies);
    } else {
        filterItems(movies, type);
    }
});