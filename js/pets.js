// buttons fetch by categories api
const categoryBasedPetLoad = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => buttonDisplay(data.categories))
    .catch(err => console.log(err))
}
// show buttons
const buttonDisplay = (card) => {
    const buttonsContainer = document.getElementById('button-container');
    card.forEach(btn => {
        const{category, category_icon} = btn;
        // console.log(btn.category)
        const div = document.createElement('div');
        div.innerHTML = `
        <button id= "btn-${category}" onclick="categoryClickHandle('${category}')" class="text-xl inter btn border-2 shadow-none btn-md lg:btn-lg">
        <img
            class="w-5 md:w-7"
            src= ${category_icon}
            alt="pets"
           />
        ${category}
        
        </button>
        `
        buttonsContainer.append(div);
    })
}

let active = null; 
const categoryClickHandle = (name) => {
    document.getElementById('error-data').classList.add('hidden');
    if(active){
        active.style.cssText = "";
    }
    active = document.getElementById(`btn-${name}`);
    active.style.cssText = "background-color : #CFFCFF; border-radius: 30px";
    loadSpinner(name);
}

const loadSpinner = (name) => {
    document.getElementById('load-spinner').classList.remove('hidden');
    document.querySelector('#deals-section').classList.add('hidden');
    setTimeout(()=>{
        // stop spinner after 2 sec
        document.getElementById('load-spinner').classList.add('hidden');
        displayPetCard(true, name);
    }, 2000);
}

// while triggered sort
let currentPrice = []; 
const sortingPrice = () => {
    const dealsSection =  document.getElementById('deals-section');
    dealsSection.classList.add('hidden');
    document.getElementById('load-spinner').classList.remove('hidden');
    document.querySelector('#deals-section').classList.add('hidden');
    setTimeout(()=>{
        // stop spinner after 2 sec
        document.getElementById('load-spinner').classList.add('hidden');
        currentPrice.sort((a, b) => (b.price - a.price))
        displayAllPets(currentPrice);
    }, 2000);
} 

//show category on clicking name based buttons
const displayPetCard = async(isLoad, name) => {
    // console.log(name)
    const url = `https://openapi.programming-hero.com/api/peddy/category/${name ? name : 'Not Available'}`
    const res = await fetch(url);
    const data = await res.json();
    currentPrice = isLoad ? data.data : [];
    displayAllPets(currentPrice);
}

categoryBasedPetLoad();

// fetching all pets data
const allPets = (statement) => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data =>  {
       if(statement === false){
       currentPrice = data.pets;
       displayAllPets(currentPrice);
       }
    })
    .catch(err => console.log(err))
}

const displayAllPets = (pets) => {
    document.querySelector('#deals-section').classList.remove('hidden');
    // console.log(pets)
    const error = document.getElementById('error-data');
    if(pets.length > 0 ){
        error.classList.add('hidden');
        error.classList.remove('flex');
        document.querySelector('#all-pets-container').classList.remove('hidden');
    }
    else{
        error.classList.remove('hidden');
        error.classList.add('flex');
        document.querySelector('#all-pets-container').classList.add('hidden');
    }
    const petsContainer = document.querySelector('#all-pets-container');
    petsContainer.innerHTML = "";
    pets.forEach(pet => {
        // console.log(pet);
        const {image, pet_name, breed, date_of_birth, gender, price, petId
        } = pet;
        const div = document.createElement('div');
        div.classList = "card border-2"
        div.innerHTML = `
        <figure class="px-4 pt-4">
                <img
                  src= ${image}
                  alt="pet-img"
                  class="rounded-xl" />
              </figure>
              <div class="lato font-normal card-body py-4 px-4">
                <h2 class="card-title inter">${pet_name || 'Not Available'}</h2>
                <p><i class="fa-solid fa-shield-dog text-sm"></i> Bread: ${breed || 'Not Available'}</p>
                <p><i class="fa-solid fa-calendar-days text-xs"></i> Birth: ${new Date(date_of_birth).getFullYear() || 'Not Available'}</p>
                <p><i class="fa-solid fa-mercury"></i> Gender: ${gender || 'Not Available'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price || 'Not Available'}</p>
                <div class="divider mt-0 mb-1"></div>
                <div class="flex justify-between gap-4">
                  <button onclick="showImage('${image}')" class="btn hover:text-white hover:bg-btn-bg btn-xs"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button id="btn-${petId}" onclick="greetingsBtn(${petId})" class="btn hover:bg-btn-bg btn-xs hover:text-white text-btn-bg">Adopt</button>
                  <button onclick="showDetails(${petId})" class="btn hover:bg-btn-bg hover:text-white btn-xs text-btn-bg">Details</button>
                </div>
              </div>
        `
        petsContainer.append(div);
    });

}

// greetingsBtn
const greetingsBtn = (id) => {
    // console.log(id)
    congratulate.showModal();
    let counter = 3;
    let button = document.getElementById(`btn-${id}`);
    let timeCount = document.getElementById('counter');
    timeCount.innerText = counter;
    // console.log(counter);

   const remainingTime = setInterval(() => {
        counter --;
        timeCount.innerText = counter;
        if(counter <= 0){
            clearInterval(remainingTime);
            timeCount.innerText = "";
            congratulate.close();
            button.disabled = true;
        }
    }, 1000);
}

// open the right part clicking thumbs-up button
const showImage = (image) => {
    const petImageCard = document.querySelector('#pet-image-card');
    petImageCard.innerHTML += 
    `
     <img src= ${image} alt="pet-img" class="rounded-xl border-2 p-2" />
    `
    // console.log(image)
}

allPets(false);