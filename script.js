const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCheck = document.querySelector("#uppercase");
const lowerCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator");
const generateBtn = document.querySelector(".generateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password =  "";
let passwordLength = 10;
let checkCount =0;
handleSlider();
setIndicator("#ccc");

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.value = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
 function generateNumber(){
    return getRandomInteger(0,9);
 }

 function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
 }
  function generateLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
  }

  function generateSymbol(){
    const randNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randNum);
  }

  function calcStrength(){
    let hasNum = false;
    let hasUpper = false;
    let hasLower =  false;
    let hasSymbol = false;

    if(upperCheck.checked) hasUpper = true;
    if(lowerCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8 ){
    setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNum || hasSymbol) && passwordLength >=6){
    setIndicator("#ff0");
     }
    else{
    setIndicator("#F00");
    }
  }

  async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText =  "copied";
    } catch (error) {
        copyMsg.innerText = "Failed";
    }

    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

  }


  function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

  function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked) 
        checkCount++;
    });
    // special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
  }
 allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange );
 })

 inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
 })

 copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value) 
    copyContent();
 }) 

 generateBtn.addEventListener('click', () =>{
    if(checkCount = 0) return;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    
    password = "";
    let funcArr = [];

    if(upperCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowerCheck.checked)
    funcArr.push(generateLowercase);

    if(numbersCheck.checked)
    funcArr.push(generateNumber);

    if(symbolsCheck.checked) 
    funcArr.push(generateSymbol);

    // compulsory addititon
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }
    // remaining addition
    for(let i=0; i<passwordLength - funcArr.length;i++){
        let randIndex = getRandomInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));

    passwordDisplay.value=password;
    calcStrength();
 });