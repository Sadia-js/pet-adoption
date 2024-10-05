// open modal throughout fetching api by id
const showDetails = async(id) => {
    my_modal_1.showModal();
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModal(data.petData);
}

const displayModal = (petId) => {
    const {image, pet_name, breed, date_of_birth, gender, price, pet_details, 
        vaccinated_status} = petId;
    const modal = document.getElementById('my_modal_1');
    modal.innerHTML = `
      <div class="modal-box space-y-4">
              <img class="w-full rounded-md" src=${image} alt="">
              <h3 class="text-lg font-bold">${pet_name}</h3>
              <div class="flex flex-col lg:flex-row justify-between">
                <div>
                  <p><i class="fa-solid fa-shield-dog text-sm"></i> Bread: ${breed || 'Not Available'}</p>
                  <p><i class="fa-solid fa-mercury"></i> Gender: ${gender || 'Not Available'}</p>
                  <p><i class="fa-solid fa-certificate text-xs"></i> Vaccinated-Status: ${vaccinated_status || 'Not Available'}</p>
                </div>
                <div>
                  <p><i class="fa-solid fa-cake-candles text-sm"></i> Birth: ${ date_of_birth || 'Not Available'}</p>
                  <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price || 'Not Available'}</p>
                </div>
              </div>
              <h1 class="text-lg font-bold">Detail Information</h1>
              <p>${pet_details}</p>
              <div class="modal-action">
                <form method="dialog" class="w-full">
                  <button class="btn w-full bg-red-400">Cancel</button>
                </form>
              </div>
            </div>
    `
    console.log(petId);
}