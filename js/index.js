let allPhones = [];

const handlerButton = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    allPhones = data.data.tools; 

    showCardContainer(allPhones); 
}


const showCardContainer = (phones, isShowAll) => {
    const showCardContext = document.getElementById('card-container');
    showCardContext.textContent = '';

    const seeMoreBtn = document.getElementById('see-more-button');

    // Show/hide See More button
    if (phones.length > 6 && !isShowAll ) {
        seeMoreBtn.classList.remove('hidden');
        
    } else {
        seeMoreBtn.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0, 6);
    }


    phones.forEach(tool => {
        const cardMedia = document.createElement('div');
        cardMedia.classList = `card bg-base-100 w-96 shadow-2xl`;

        const featureItems = tool.features.map((feature, index) => `<h4>${index + 1}. ${feature}</h4>`).join('');

        cardMedia.innerHTML = `
            <figure class="px-4 pt-6">
                <img src="${tool.image}" alt="${tool.name}" class="rounded-xl" />
            </figure>
            <div class="card-body text-start">
                <h2 class="card-title text-2xl font-bold text-black">Features</h2>
                ${featureItems}
            </div>

            <hr class="border-solid border-2">

            <div>
                <div class="flex justify-between px-6 py-6">
                    <div>
                        <h1 class="text-2xl font-bold text-black">${tool.name}</h1>
                        <p><i class="fa-regular fa-calendar-days"></i> ${tool.published_in || 'Date not available'}</p>
                    </div>
                    <div class="bg-[#fccece] p-2 rounded-full w-10 h-10 flex items-center justify-center">
                        <button onclick="handlerShowDetailes('${tool.id}')" class="text-[#e05858]">
                            <i class="fa-solid fa-right-long"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        showCardContext.appendChild(cardMedia);
    });
}





// Show More button click handler.................
const showMoreMedia = () => {
    showCardContainer(allPhones, true); 
}

// handlershow detailes............

const handlerShowDetailes =async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const phones = data.data;
    showMediaDetailes(phones)
}

// show the media detailes......................

const showMediaDetailes = (phones) => {
    show_modal_detailes.showModal();
    
    console.log(phones)
    // Features list
    const features = phones.features;
    const featureItems = Object.values(features).map((item) => `<li> ${item.feature_name}</li>`).join('');

    // Integrations list
    const integrationItems = phones.integrations?.map(item => `<li> ${item}</li>`).join('') || '<li>No Data Found</li>';

    const modalDataShow = document.getElementById('show_modal_detailes');
    modalDataShow.innerHTML = `
        <div class="modal-box w-11/12 max-w-5xl">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="flex flex-col lg:flex-row gap-6">
                <!-- card-1 -->
                <div class="bg-[#EB57570D] px-4 py-6 rounded-md w-full lg:w-1/2">
                    <h1 class="text-2xl font-bold text-black mb-4">${phones.description}</h1>
                    <div class="flex justify-around mt-4">
                        <div class="bg-[#FFFFFF] rounded-md p-2 flex justify-center items-center">
                            <h1 class="text-xs font-normal text-[#03A30A] text-center">${phones.pricing?.[0]?.price || 'Free'} <br> ${phones.pricing?.[0]?.plan || 'Basic'}</h1>
                        </div>
                        <div class="bg-[#FFFFFF] rounded-md p-2 flex justify-center items-center">
                            <h1 class="text-xs font-normal text-[#F28927] text-center">${phones.pricing?.[1]?.price || 'Free'} <br> ${phones.pricing?.[1]?.plan || 'Pro'}</h1>
                        </div>
                        <div class="bg-[#FFFFFF] rounded-md p-2 flex justify-center items-center">
                            <h1 class="text-xs font-normal text-[#EB5757] text-center">${phones.pricing?.[2]?.price || 'Contact us'} <br> ${phones.pricing?.[2]?.plan || 'Enterprise'}</h1>
                        </div>
                    </div>
                    <div class="mt-5 flex justify-between gap-4">
                        <div>
                            <h1 class="text-xl font-bold text-black">Features</h1>
                            <ul class="text-sm mt-2">${featureItems}</ul>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-black">Integrations</h1>
                            <ul class="text-sm mt-2">${integrationItems}</ul>
                        </div>
                    </div>
                </div>

                <!-- card-2 -->
                <div class="bg-[#E7E7E7] rounded-md shadow-lg px-6 pt-4 w-full lg:w-1/2">
                    <div class="relative">
                        <img src="${phones.image_link[0]}" alt="${phones.tool_name}" class="rounded-md w-[500px] h-[200px] object-contain" />
                        ${phones.accuracy?.score ? `
                        <div class="absolute top-2 right-12 bg-[#EB5757] px-3 py-1 rounded-xl">
                            <h1 class="text-xs font-normal text-white">${phones.accuracy.score * 100}% accuracy</h1>
                        </div>` : ''}
                    </div>
                    <h1 class="text-xl font-bold text-black text-center mt-4">${phones.input_output_examples?.[0]?.input || 'No example available'}</h1>
                    <p class="text-xs font-normal text-[#585858] text-center mt-3">${phones.input_output_examples?.[0]?.output || 'No output found'}</p>
                </div>
            </div>
        </div>
    `;
}
