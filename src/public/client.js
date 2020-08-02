// const rovers = Immutable.List(['Curiosity', 'Opportunity', 'Spirit'])

let store = Immutable.Map({
    user_Name: "Student",
    loading: true,
    roverImages:'',
});

// add our markup to the page
const root = document.getElementById('root')
const curiosity = document.getElementById('curiosity');
const opportunity =document.getElementById('opportunity');
curiosity.addEventListener('click',async ()=>{

    // Update state to get Curiosity data by sending action with a payload 
    // get payload  
    const curiosityImages = await getImageOfTheRover('rover');
    updateStore(store,{type:'curiosity', payload:curiosityImages})
    
});

opportunity.addEventListener('click',async ()=>{

    // Update state to get Opportunity data by sending action with a payload 
    // get payload  
    const opportunityImages = await getImageOfTheRover('opportunity');
    updateStore(store,{type:'opportunity', payload:opportunityImages})
    
});



const updateStore = async (store, action) => {

    switch (action.type) {
        case 'curiosity':
            // store = Object.assign(store, {images:action.payload})
            store = store.merge({roverImages:action.payload})   
            render(root, store)      
            break;
        case 'opportunity':
            // store = Object.assign(store, {images:action.payload})
            store = store.merge({roverImages:action.payload})   
            render(root, store)      
            break;
    
        default:
            break;
    }
   
}

const render =  (root, state) => {
    root.innerHTML =  App(state.toJS())
}

const App =  (state) => {

    let {roverImages} = state; 

 
    if(!roverImages) { 
        return `
        <p> Choose the rover! </>
        `}
  
    return `
        <p>Image of Mars</p>
        <img src="${roverImages[0]}" height="350px" width="50%" />
     
   
        `
}


     




// // create content
// const App = (state) => {
//     let { rovers, apod } = state

//     return `
//         <header></header>
//         <main>
//             ${Greeting(store.user.name)}
//             ${getImageOfTheDay('rover')}
//             <section>
//                 <h3>Put things on the page!</h3>
//                 <p>Here is an example section.</p>
//                 <p>
//                     One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
//                     the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
//                     This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
//                     applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
//                     explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
//                     but generally help with discoverability of relevant imagery.
//                 </p>
//                 ${ImageOfTheDay(apod)}
                
//             </section>
//         </main>
//         <footer></footer>
//     `
// }

// // listening for load event because page should load before any JS is called
window.addEventListener('load', async () => {
    render(root, store)
})

// // ------------------------------------------------------  COMPONENTS

// // Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//     if (name) {
//         return `
//             <h1>Welcome, ${name}!</h1>
//         `
//     }

//     return `
//         <h1>Hello!</h1>
//     `
// }

// // Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {

//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(apod.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());
//     if (!apod || apod.date === today.getDate() ) {
//         getImageOfTheDay(store)
//     }

//     // check if the photo of the day is actually type video!
//     if (apod.media_type === "video") {
//         return (`
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `)
//     } else {
//         return (`
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `)
//     }
// }

// // ------------------------------------------------------  API CALLS

// // Example API call
// const getImageOfTheDay = (state) => {
//     let { apod } = state

//     fetch(`http://localhost:3000/apod`)
//         .then(res => res.json())
//         .then(apod => updateStore(store, { apod }))

//     return state
// }

// Example API call
const getImageOfTheRover = async (rover) => {

   const arImage = await fetch(`http://localhost:3000/${rover}`)
        .then(res => res.json())

    return arImage; 
  
}


