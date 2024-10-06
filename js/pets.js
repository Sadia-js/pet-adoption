
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
        div.classList.add('inter');
        div.innerHTML = `
        <button onclick="categoryClickHandle('${category}')" class="btn bg-white border-2 shadow-none btn-md lg:btn-lg">
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

const categoryClickHandle = (name) => {
    document.getElementById('load-spinner').classList.remove('hidden');
    document.querySelector('#all-pets-container').classList.add('hidden');
    setTimeout(()=>{
        // stop spinner after 2 sec
        document.getElementById('load-spinner').classList.add('hidden');
        displayPetCard(true, name);
    }, 2000);
}

// while triggered sort
let currentPrice = []; 
const sortingPrice = () => {
        currentPrice.sort((a, b) => (b.price - a.price))
        displayAllPets(currentPrice);
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
    // console.log(pets)
    if(pets.length === 0){
        document.getElementById('error-data').classList.remove('hidden');
        document.getElementById('error-data').classList.add('flex');
    }
    else{
        document.getElementById('error-data').classList.add('hidden');
        document.getElementById('error-data').classList.remove('flex');
    }
    document.querySelector('#all-pets-container').classList.remove('hidden');
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
                <p><i class="fa-solid fa-cake-candles text-sm"></i> Birth: ${ date_of_birth || 'Not Available'}</p>
                <p><i class="fa-solid fa-mercury"></i> Gender: ${gender || 'Not Available'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price || 'Not Available'}</p>
                <div class="flex justify-between gap-4">
                  <button onclick="showImage('${image}')" class="btn btn-ghost btn-sm"><i class="fa-regular fa-thumbs-up"></i></button>
                  <button class="btn btn-ghost btn-sm text-btn-bg">Adopt</button>
                  <button onclick="showDetails(${petId})" class="btn btn-ghost btn-sm text-btn-bg">Details</button>
                </div>
              </div>
        `
        petsContainer.append(div);
    });

}

// open the right part clicking thumbs-up button
const showImage = (image) => {
    const petImageCard = document.querySelector('#pet-image-card');
    petImageCard.classList.add('grid');
    petImageCard.classList.remove('hidden');
    const div = document.createElement('div');
    div.classList = "border-2 p-2 rounded-lg md:rounded-xl";
    div.innerHTML = 
    `
        <img src= ${image} alt="pet-img" class="rounded-xl" />
    `
    petImageCard.append(div);
    console.log(image)
}

allPets(false);