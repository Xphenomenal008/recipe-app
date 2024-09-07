const sideB=document.querySelector(".sidebarbuttons")
let content = document.querySelector(".content");
let loading = document.querySelector(".loading");
let foodImg = document.querySelector(".foodimg");
let nameFoodee = document.querySelector(".namefood");
const time = document.querySelector(".time");
const serving = document.querySelector(".serving");
const nameingrde = document.querySelector(".nameingrde");
const detailRecipe = document.querySelector(".detail");
const myimg = document.getElementById("myimg");
const errom = document.querySelector(".errorm");
const form=document.querySelector(".form")
let input=document.querySelector("#input") 
const allRecipes=document.querySelector(".allrecipes")
const searchError=document.querySelector(".h1")
const det1=document.querySelector(".det1")
let cook=document.querySelector(".cook")
const before=document.querySelector(".before")
const after=document.querySelector(".after")
let servings=document.querySelector(".servings")
let  cookingTime=document.querySelector(".cookt")
let spane = document.createElement("span");
let plusServings=document.querySelector(".plusS")
let minusServings=document.querySelector(".minusS")
const bokmrkBtn=document.querySelector(".bookmark")
let bookmarkIcon=document.querySelector("#bookmarkIcon")
let actualData=[]
let recipez=[]//you can also save incregrents here in variable and change thier quantiity acc to the servings//it is current recipe that you called
 
let bookmarks=[]
 

let callrecipes = async () => {
    try {
        let id = window.location.hash.substring(1);
        console.log(id);

        loading.classList.remove("hidden");
        let url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
        let res = await fetch(url);
        let data = await res.json();

        if (!res.ok) {
            throw new Error(res.status);
        }

         recipez = data.data.recipe;
         console.log(recipez)
         
         
        let  recipees = {
            id: recipez.id,
            title: recipez.title,
            imgurl: recipez.image_url,
            publisher: recipez.publisher,
            ingredients: recipez.ingredients,
            source: recipez.source_url,
            servings:recipez.servings,
            source:recipez.source_url,
            cookingtime:recipez.cooking_time,
        };
        
        cook.innerHTML=recipees.publisher
        cookingTime.innerHTML=`${recipees.cookingtime}min`
        servings.innerHTML=`${recipees.servings}`
         
        let nameFood = document.createElement("div");

        loading.classList.add("hidden");
        nameFoodee.innerHTML = '';

        let spane = document.createElement("span");
        myimg.src = recipees.imgurl;

        spane.innerText = recipees.title;
        nameFoodee.append(spane)
        det1.innerHTML=''
        recipees.ingredients.forEach((ingre) => {
            
            let spaningre = document.createElement("span");
            spaningre.innerHTML = ingre.quantity || "";  
            
            let des = document.createElement("span");
            des.innerHTML = ingre.description;

            let icn = document.createElement("i");
            icn.classList.add("fa", "fa-check","text-orange-400");  

            // Created a wrapper div to hold the icon, quantity, and description
            let wrapper = document.createElement("div");
            wrapper.classList.add("custom-recipe-size");
             
            wrapper.appendChild(icn);
            wrapper.appendChild(spaningre);
            wrapper.appendChild(des);

            nameFood.appendChild(wrapper);
            nameFood.classList.add("flex","flex-wrap");
        });

        det1.appendChild(nameFood);
        //here we checking any called recipe is part of bookmarks array recipes,if yes thank color of btn stayes or change to black unless remove existing color
        let isbookmarked=bookmarks.some((one)=>one.id===recipez.id)
        if(isbookmarked){
            bookmarkIcon.classList.remove("fa-regular");
            bookmarkIcon.classList.add("fa-solid");
        }else{
            bookmarkIcon.classList.remove("fa-solid");
            bookmarkIcon.classList.add("fa-regular");
            
        }

    } catch (e) {
        console.error(e);
        loading.classList.add("hidden");
    }
};
;

window.addEventListener("hashchange", callrecipes);
window.addEventListener("load", callrecipes);


//implement search
 let search=async(query)=>{
    let url=`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    try{
       
        let res=await fetch(url)
        let data=await res.json()
        
        if (!res.ok) {
            throw new Error(res.status);
        }
         actualData=data.data.recipes 
        let onlydata=only(actualData) //-------------------here we called only function
        viewAllrecipes(onlydata)
    }catch(e){
        console.error(e)
    }

 }

 form.addEventListener("submit",(e)=>{
    e.preventDefault()
let inputV=input.value
 
search(inputV)
 })

 //view all your recipes
let viewAllrecipes=(actualData)=>{
    allRecipes.innerHTML = '';
   if(actualData.length===0){
searchError.classList.remove("hidden")
   }
    actualData.forEach((resp)=>{
        const li=document.createElement("li")
        const a=document.createElement("a")
        const figure=document.createElement("figure")
        const poster=document.createElement("img")
        const parentDiv=document.createElement("div")
        const child1=document.createElement("div")
        const child2=document.createElement("div")
        
        let recipees={
            id:resp.id,
            title:resp.title,
            publisher:resp.publisher,
            imgurl:resp.image_url,
        }
        searchError.classList.add("hidden")
       a.href=`#${recipees.id}`
       
       poster.src=`${recipees.imgurl}`
       figure.appendChild(poster)
       child1.innerHTML=`${recipees.publisher}`
       child2.innerHTML=`${recipees.title}`.substring(0,26)+"..."

       parentDiv.appendChild(child2)
       parentDiv.appendChild(child1)
       child2.classList.add("text-orange-500","lg:font-bold")
        a.classList.add("custom-a-size")
        parentDiv.classList.add("flex-col","text-sm","item-center","text-xs","lg:text-sm")
       a.appendChild(figure)
       a.appendChild(parentDiv)
       li.appendChild(a)
       poster.classList.add("custom-img-size");

    li.classList.add("custom-recipelist-size")
    allRecipes.appendChild(li)
    

       
        
    })




}
 
let page = 1;

 
after.addEventListener("click", () => {
    page++;
    if (page >= 6) {
        page = 1;
    }
     
     
    let onlydata=only(actualData) //-------------------here we called only function
        viewAllrecipes(onlydata)
});

before.addEventListener("click", () => {
    page--;
    if (page <= 0) {
        page = 5;
    }
     
   
    let onlydata=only(actualData) //-------------------here we called only function
        viewAllrecipes(onlydata)
});

// Modify the only function 
let only = (actualData) => {
    let start = (page - 1) * 10;
    let end = page * 10;
    sideB.classList.remove("hidden")
    return actualData.slice(start, end);
};


//increment and decrement servings
const incrementDecremntS=()=>{
    
    plusServings.addEventListener("click",()=>{
      
        if(recipez.servings<8){
            recipez.servings++
            recipez.cooking_time+=5
        }
       
        spane.innerHTML=recipez.title
        cookingTime.innerHTML=`${recipez.cooking_time}min`
        servings.innerHTML=`${recipez.servings}`
        
         
    })
    minusServings.addEventListener("click",()=>{

       
        if(recipez.servings>4){
            recipez.servings--
            recipez.cooking_time-=5
        }
       
        spane.innerHTML=recipez.title
        cookingTime.innerHTML=`${recipez.cooking_time}min`
        servings.innerHTML=`${recipez.servings}`
         
         
    })
}

incrementDecremntS()

//addbbookmarks
const addBookmarks = () => {
    // Check if the current recipe is already in the bookmarks
    const recipeIndex = bookmarks.findIndex(one => one.id === recipez.id);

    if (recipeIndex === -1) {
        // If the recipe is not bookmarked, add it
        bookmarks.push({...recipez, bookmarks: true});
        recipez.bookmarks = true;  // Mark as bookmarked
    } else {
        // If the recipe is already bookmarked, remove it
        bookmarks.splice(recipeIndex, 1);
        recipez.bookmarks = false;  // Mark as unbookmarked
    }

    // Update the bookmark button's appearance based on bookmark status
    if (recipez.bookmarks === true) {
        bookmarkIcon.classList.remove("fa-regular");
        bookmarkIcon.classList.add("fa-solid");  
    }else{
        bookmarkIcon.classList.remove("fa-solid");  
        bookmarkIcon.classList.add("fa-regular");
    }

    console.log(bookmarks);
};

bokmrkBtn.addEventListener("click", () => {
    addBookmarks();
});



   
 