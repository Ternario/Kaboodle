let slider = document.querySelector("#slider");
let leftBtn = document.querySelector(".leftBtn");
let rightBtn = document.querySelector(".rightBtn");
let blockItems = document.querySelector("#blockItems")
let stringItems = document.querySelector("#stringItems")
let btnAllMovies = document.querySelector("#btnAllMovies")
let btnMovies = document.querySelector("#btnMovies")
let btnSerials = document.querySelector("#btnSerials")
let verticalSlider = document.querySelector("#verticalSlider")

let movies = [];

document.addEventListener("DOMContentLoaded", function() {
    dataRequest();
})

let dataRequest = () => {
    fetch("https://raw.githubusercontent.com/Ternario/Kaboodle/master/data.json")
    .then(data => data.json())
    .then(data => getData(data))
    .catch(err => console.error(err));
}

let getData = (data) => {
    data.forEach(data => {
        movies.push(data)
    });
    renderSlider(movies, slider);
    renderSlider(movies, verticalSlider);

    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 2,
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
}

let renderSlider = (elem, placeAppend) => {

    if(placeAppend == verticalSlider) {
        updateData();
    }

    for (i = 0; i < elem.length; i++) {

        let comingSoon = document.createElement("div");
            comingSoon.className = "comingSoon-slider__item " + elem[i].type;
            comingSoon.innerHTML = `
            <a class="link" href=${elem[i].link}></a>
            <div class="title">${elem[i].title}</div>
            <div class="year">${elem[i].year}</div>
            <img class="poster" src=${elem[i].poster}>
            <div class="soon">...</div>
            <div class="comingItems">
                <div class="commentsCount">${elem[i].comments_count}</div>
                <div class="rank">${elem[i].rank}</div>
                <div class="likesCount">${elem[i].likes_count}</div>
            </div>
            <a class="playMovie"></a>`

        placeAppend.append(comingSoon);
    }
}

let renderElementsRow = (elem) => {
    
    updateData();

    for (i = 0; i < elem.length; i++) {

        let genresName = "";

        for(j = 0; j < elem[i].genres.length; j++) {
            genresName += elem[i].genres[j] + ", ";
        }

        genresName = genresName.slice(0, -2);

        let clonComingSoonBlock = document.createElement("div");
            clonComingSoonBlock.className = "mostPopular-slider__item " + elem[i].type;
            clonComingSoonBlock.innerHTML = `
            <a class="link" href=${elem[i].link}>Read more</a>
            <img class="poster" src=${elem[i].poster}>
            <div class="soon">${elem[i].rank}</div>
            <div class="comingItems">
                <div class="title">${elem[i].title}</div>
                <div class="information">
                    <div class="year">${elem[i].year}</div>
                    <div class="director">"Director: ${elem[i].director}"</div>
                    <div class="writer">Writer: ${elem[i].writer}</div>
                    <div class="genres">Genres: ${genresName}</div>
                </div>
                <div class="content">${elem[i].content}</div>
                <div class="itemsBar">
                    <div class="commentsCount">${elem[i].comments_count}</div>
                    <div class="rank">${elem[i].rank}</div>
                    <div class="likesCount">${elem[i].likes_count}</div>
                </div>
                <a class="playMovie"></a>
            </div>
            `
        verticalSlider.append(clonComingSoonBlock);
    }
} 

let updateData = () => {
    while(verticalSlider.firstChild) {
        verticalSlider.removeChild(verticalSlider.firstChild);
    }
}

blockItems.addEventListener("click", () => {
    renderSlider(movies, verticalSlider);
});

stringItems.addEventListener("click", () => {
    renderElementsRow(movies);
});















// use fetch to retrieve the products and pass them to init
// report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
// fetch('products.json').then(function(response) {
//     return response.json();
//   }).then(function(json) {
//     let products = json;
//     initialize(products);
//   }).catch(function(err) {
//     console.log('Fetch problem: ' + err.message);
//   });
  

//   function initialize(products) {
//     const category = document.querySelector('#category');
//     const searchTerm = document.querySelector('#searchTerm');
//     const searchBtn = document.querySelector('button');
//     const main = document.querySelector('main');
  

//     let lastCategory = category.value;

//     let lastSearch = '';
  

//     let categoryGroup;
//     let finalGroup;
  

//     finalGroup = products;
//     updateDisplay();
  
//     categoryGroup = [];
//     finalGroup = [];
  

//     searchBtn.onclick = selectCategory;
  
//     function selectCategory(e) {

//       e.preventDefault();
  

//       categoryGroup = [];
//       finalGroup = [];
  

//       if(category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
//         return;
//       } else {
//         lastCategory = category.value;
//         lastSearch = searchTerm.value.trim();
   
//         if(category.value === 'All') {
//           categoryGroup = products;
//           selectProducts();

//         } else {

//           let lowerCaseType = category.value.toLowerCase();
//           for(let i = 0; i < products.length ; i++) {

//             if(products[i].type === lowerCaseType) {
//               categoryGroup.push(products[i]);
//             }
//           }
  
//           selectProducts();
//         }
//       }
//     }
  

//     function selectProducts() {

//       if(searchTerm.value.trim() === '') {
//         finalGroup = categoryGroup;
//         updateDisplay();
//       } else {

//         let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();

//         for(let i = 0; i < categoryGroup.length ; i++) {
//           if(categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
//             finalGroup.push(categoryGroup[i]);
//           }
//         }
  
//         updateDisplay();
//       }
  
//     }
  
//     function updateDisplay() {

//       while (main.firstChild) {
//         main.removeChild(main.firstChild);
//       }
  

//       if(finalGroup.length === 0) {
//         const para = document.createElement('p');
//         para.textContent = 'No results to display!';
//         main.appendChild(para);

//       } else {
//         for(let i = 0; i < finalGroup.length; i++) {
//           fetchBlob(finalGroup[i]);
//         }
//       }
//     }
  

//     function fetchBlob(product) {

//       let url = 'images/' + product.image;

//       fetch(url).then(function(response) {
//           return response.blob();
//       }).then(function(blob) {

//         let objectURL = URL.createObjectURL(blob);

//         showProduct(objectURL, product);
//       });
//     }
  

//     function showProduct(objectURL, product) {

//       const section = document.createElement('section');
//       const heading = document.createElement('h2');
//       const para = document.createElement('p');
//       const image = document.createElement('img');
  

//       section.setAttribute('class', product.type);
  

//       heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
  

//       para.textContent = '$' + product.price.toFixed(2);
  

//       image.src = objectURL;
//       image.alt = product.name;
  

//       main.appendChild(section);
//       section.appendChild(heading);
//       section.appendChild(para);
//       section.appendChild(image);
//     }
//   }



















































































    //grid display switching

    // listElems = document.querySelectorAll(".comingSoon-slider__item");
    // movies = document.querySelectorAll(".Movie");
    // serials = document.querySelectorAll(".Serial");
    // moviesBlock = document.querySelectorAll(".Movieblock");
    // serialsBlock = document.querySelectorAll(".Serialblock");

    // let showBlockPosition = () => {
    //     blockSlider.style.display = "flex";
    //     verticalSlider.style.display = "none";
    // }

    // let showStringPosition = () => {
    //     blockSlider.style.display = "none";
    //     verticalSlider.style.display = "block";
    // }

    // blockItems.addEventListener("click", showBlockPosition);
    // stringItems.addEventListener("click", showStringPosition);

    // let showAll = () => {

    //     if(verticalSlider.style.display === "block") {

    //         for(let i = 0; i < movies.length; i++) {
    //             movies[i].style.display = "flex";
    //             movies[i].classList.add("mostPopular-slider__item");
    //         }
    
    //         for(let i = 0; i < serials.length; i++) {
    //             serials[i].style.display = "flex";
    //             serials[i].classList.add("mostPopular-slider__item");
    //         } 

    //     } else {

    //         for(let i = 0; i < moviesBlock.length; i++) {
    //             moviesBlock[i].style.display = "block";
    //             moviesBlock[i].classList.add("mostPopularBlock-slider__item");
    //         }
    
    //         for(let i = 0; i < serialsBlock.length; i++) {
    //             serialsBlock[i].style.display = "block";
    //             serialsBlock[i].classList.add("mostPopularBlock-slider__item");
    //         }

    //     }
    // }

    // let hiddenSerials = () => {

    //     if(verticalSlider.style.display === "block") {

    //         for(let i = 0; i < serials.length; i++) {
    //             serials[i].style.display = "none";
    //             serials[i].classList.remove("mostPopular-slider__item");
    //         }

    //         for(let i = 0; i < movies.length; i++) {
    //             movies[i].style.display = "flex";
    //             movies[i].classList.add("mostPopular-slider__item");
    //         }

    //     } else {

    //         for(let i = 0; i < serialsBlock.length; i++) {
    //             serialsBlock[i].style.display = "none";
    //             serialsBlock[i].classList.remove("mostPopularBlock-slider__item");
    //         }

    //         for(let i = 0; i < movies.length; i++) {
    //             moviesBlock[i].style.display = "block";
    //             moviesBlock[i].classList.add("mostPopularBlock-slider__item");
    //         }

    //     }
    // }

    // let hiddenMovies = ()=> {

    //     if(verticalSlider.style.display === "block") {

    //         for(let i = 0; i < movies.length; i++) {
    //             movies[i].style.display = "none";
    //             movies[i].classList.remove("mostPopular-slider__item");
    //         }

    //         for(let i = 0; i < serials.length; i++) {
    //             serials[i].style.display = "flex";
    //             serials[i].classList.add("mostPopular-slider__item");
    //         }

    //     } else {

    //         for(let i = 0; i < moviesBlock.length; i++) {
    //             moviesBlock[i].style.display = "none";
    //             moviesBlock[i].classList.remove("mostPopularBlock-slider__item");
    //         }

    //         for(let i = 0; i < serials.length; i++) {
    //             serialsBlock[i].style.display = "block";
    //             serialsBlock[i].classList.add("mostPopularBlock-slider__item");
    //         }

    //     }
    // }
    
    // btnAllMovies.addEventListener("click", showAll);
    // btnMovies.addEventListener("click", hiddenSerials);
    // btnSerials.addEventListener("click", hiddenMovies);

    //slider
    
    // let nextSlide = () => {
    //     position = Math.max(position - widthSlider * countSlider, -widthSlider * (listElems.length - countSlider)) ;
    //     slider.style.marginLeft = position + "px";
    // } 

    // let prevSlide = () => {
    //     position = Math.min(position + widthSlider * countSlider, 0);
    //     slider.style.marginLeft = position + "px";
    // }

    // rightBtn.addEventListener("click", nextSlide);
    // leftBtn.addEventListener("click", prevSlide);

    



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
