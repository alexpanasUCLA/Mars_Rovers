const rovers = Immutable.List(['Curiosity', 'Opportunity', 'Spirit'])

let store = Immutable.Map({
    user_Name: "Student",
    loading: false,
    roverImages:'',
    selectedRover:'',
    launch_date:'',
    landing_date:'',
    status:'',
    max_date:''
});

// add our markup to the page
const root = document.getElementById('root');

// create event listeners for every button represening rover

const selector = (rover)=>{
    document.getElementById(rover).addEventListener('click',async ()=>{
        updateStore(store,{type:'LOADING',payload:true})
        const {photos,landing_date,launch_date,max_date,status} = await getRoverData(rover);
        updateStore(store,{type:'ADD_ROVER_DATA', payload:{
            photos,
            rover,
            launch_date,
            landing_date,
            max_date,
            status
        }})
    
        
    });
}

// create buttons for rovers 
rovers.forEach(element => selector(element.toLowerCase()));


// the single place to update store 
const updateStore = async (store, action) => {

    switch (action.type) {
        case 'ADD_ROVER_DATA':

            store = store.merge({
                roverImages:action.payload.photos, 
                selectedRover:action.payload.rover,
                status:action.payload.status,
                launch_date:action.payload.landing_date,
                max_date:action.payload.max_date,
                landing_date:action.payload.landing_date,

            })   
            render(root, store)      
            break;
        case 'LOADING':
            store = store.merge({loading:action.payload})   
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

    let {roverImages,
        loading,selectedRover} = state; 
  
    if(loading) {
        return `<h1>Loading...</h1>`
    }

 
    if(!roverImages) { 

        return `
        <p> Choose the rover! </>
        `}
  
    return `
        ${generateRoverInfo(state)}
        <div id="images">
        ${generateImages(roverImages)}
        </div>
        `
}

// Generate section with images from a rover
const generateImages =(roverImages) =>{
    return roverImages
      .map(img => `<img src="${img}" alt="image" ></img>`)
      .reduce((prev, img) => prev + img);
  }
     
const generateRoverInfo = ({selectedRover,launch_date,
    landing_date,
    max_date,
    status})=>{
    return `
    <section class="rover-info">
         <h2>Info on Rover from which images are received.</h2>
        <p>Name: ${selectedRover.toUpperCase()}</p>
        <p>Launch date: ${launch_date}</p>
        <p>Landing Date: ${landing_date}</p>
        <p>Photos Date: ${max_date}</p>
        <p>Status: ${status}</p>
    </section>

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
  // <img src="${roverImages[0]}" />
        // <img src="${roverImages[1]}" />
        // <img src="${roverImages[2]}" />

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

// API call to get images from the selected rover
const getRoverData = async (rover) => {

   const data = await fetch(`http://localhost:3000/rover?rover=${rover}`)
        .then(res => res.json())

    return data; 
  
}


