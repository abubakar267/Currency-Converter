let URLto ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/pkr.json";
let URLfrom ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
let fromCode = "usd";
let toCode = "pkr";
let r;
let convertBtn = document.querySelector(".btn")
let output = document.getElementById('finalOutput')

let displayAmount;

let rate = (x)=>{
    
    x = parseFloat(x)
    console.log('x',x);
    console.log('r',r);
    setTimeout(() => {
        let finalAmount = x*r;
        console.log('final',finalAmount);
        if(isNaN(finalAmount)){
            output.style.color = "red"
             output.innerText = `Make sure the input is valid or refresh the page`
             
        }else{
        output.style.color = "black"
        output.innerText = `${finalAmount.toFixed(2)} ${toCode.toUpperCase()}`}
        
    }, 2000);


}

const setDefaultValues = () => {
    let fromSelect = document.querySelector(".from-dropdown");
    let toSelect = document.querySelector(".to-dropdown");

    // Set default selected options based on fromCode and toCode
    fromSelect.value = fromCode.toUpperCase();
    toSelect.value = toCode.toUpperCase();
}


const getApi = async () =>{

    const data1 = await fetch(URLfrom);
    const newdata1 = await data1.json();
    
        r=newdata1[fromCode][toCode];

        console.log(r)
        setDefaultValues();
    

}

convertBtn.addEventListener("click",event=>{

    event.preventDefault();
    getApi();
    let amount = document.querySelector(".amount input")
    if(amount.value === ""){
        rate("1");
    }else{
    rate(amount.value);
    }



})


let toSelect = document.querySelector(".to-dropdown");
let fromSelect = document.querySelector(".from-dropdown");

for (code in countryList){
let newoptfrom = document.createElement("option");
newoptfrom.value = countryList[code];
newoptfrom.text = code;
let newoptto= document.createElement("option");
newoptto.value = countryList[code];
newoptto.text = code;

if(newoptfrom.value === "US"){
    newoptfrom.selected = "selected";
}
if(newoptto.value === "PK"){
    newoptto.selected = "selected";
}
fromSelect.add(newoptfrom);
toSelect.add(newoptto);
    
}

fromSelect.addEventListener("change",(event)=>{
    
        let fromimage = document.querySelector(".image-parent").querySelector("img");
        
        event.target.selected = "selected";


        //error from api so i will add condition to convert usd to us 
        if(event.target.value === "USD"){
            event.target.value = "US"
        }
        let currCode = "";
        for(code in countryList){
            
            if(countryList[code] === event.target.value){
                currCode = code.toLowerCase();
                console.log(currCode);
               
            }
        }
      
        URLfrom =`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currCode}.json`;
        fromimage.src = `https://flagsapi.com/${event.target.value}/flat/64.png`;
        fromCode = currCode;

      
        

})


toSelect.addEventListener("change",(event)=>{
    
    let toimage = document.querySelector(".image-parent2").querySelector("img");
    
    event.target.selected = "selected";

    if(event.target.value === "USD"){
        event.target.value = "US"
    }

    let currCode = "";
    for(code in countryList){
        
        if(countryList[code] === event.target.value){
            currCode = code.toLowerCase();
            console.log(currCode);
          
        }
    }
  
    URLto =`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currCode}.json`;
    toimage.src = `https://flagsapi.com/${event.target.value}/flat/64.png`;
    toCode = currCode;
    console.log(toCode);
})






