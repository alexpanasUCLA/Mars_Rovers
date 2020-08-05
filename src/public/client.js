const rovers = Immutable.List(['Curiosity', 'Opportunity', 'Spirit'])

let store = Immutable.Map({
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
        loading} = state; 
  
    if(loading) {
        return `<h1>Loading...</h1>`
    }

 
    if(!roverImages) { 

        return `
        <p> Choose the rover above to get images! </>
        `}
  
    return `
        ${generateRoverInfo(state)}
        ${generateImages(roverImages)}
     
        `
}

// Component: Generate section with images from a rover
const generateImages =(roverImages) =>{
    return `
    <div id="images">
    ${roverImages
      .map(img => `<img src="${img}" alt="image" ></img>`)
      .reduce((prev, img) => prev + img)}
      </div>`
  }


// Component: Generate info on the selected rover
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


// listening for load event because page should load before any JS is called
window.addEventListener('load', async () => {
    render(root, store)
})


// API call to get images from the selected rover
const getRoverData = async (rover) => {

   const data = await fetch(`http://localhost:3000/rover?rover=${rover}`)
        .then(res => res.json())

    return data; 
  
}


