let myDisplayRow = document.querySelector('.myDisplay')
let myInputsValidation;
let myInputsMsg;
let BtnValidate;
$(document).ready(() => {
  searchByName("").then(() => {
    $(".loadingScreen").fadeOut(1000)
    $("body").css("overflow", "visible")
  })
})

$('.myIcon').click(function (e) {
  if ($('.myReplacement').hasClass('fa-bars')) {
    openNav()
    console.log("OPEN");
  }

  else if ($('.myReplacement').hasClass('fa-xmark')) {
    closeNav()
    console.log("Close");
  }
})

function openNav() {
  $(".myReplacement").removeClass('fa-solid fa-bars');
  $(".myReplacement").addClass('fa-solid fa-xmark');

  $('.myIcon').css({ "left": "277px" })
  $('.myIconDiv').css({ "left": "250px" })
  $('#main-nav').css({ "left": "0" })
  $('#main-nav li').eq(0).animate({ top: 0 }, 60, () => {
    $('#main-nav li').eq(1).animate({ top: 0 }, 60, () => {
      $('#main-nav li').eq(2).animate({ top: 0 }, 60, () => {
        $('#main-nav li').eq(3).animate({ top: 0 }, 60, () => {
          $('#main-nav li').eq(4).animate({ top: 0 }, 60)
        })
      })
    })
  })
}

function closeNav() {
  $(".myReplacement").removeClass('fa-solid fa-xmark');
  $(".myReplacement").addClass('fa-solid fa-bars');
  $('.myIcon').css({ "left": "0px" })
  $('#main-nav').css({ "left": "-254px" })
  $('.myIconDiv').css({ "left": "0px" })
}


// **************************************************
// **************************************************
let mySearchClick = document.getElementById("search")
let myCategoriesClick = document.getElementById("categories")
let myAreaClick = document.getElementById("area")
let ingrediantsClick = document.getElementById("ingrediants")
let ContactClick = document.getElementById("Contact")
let mySearchByName;
let mySearchMeals;
let mySearchByFirst;
let myInputDisplay = document.querySelector('.myInpRow')
myInputDisplay.innerHTML = ""


mySearchClick.addEventListener('click', async () => {
  myDisplayRow.innerHTML = ""
  searchInputs();
  mySearchByName.addEventListener('keyup', () => {
    searchByName(mySearchByName.value);
  });


  mySearchByFirst.addEventListener('keyup', () => {
    searchByFirstL(mySearchByFirst.value);
  });
  // displaySearch(myMealName);

});

function searchInputs() {
  let cartona = ``
  closeNav()
  cartona = `
         <input type="text" class="form-control byName text-white" placeholder="Search By Name" aria-describedby="addon-wrapping">
         <input type="text" class="form-control byFirst text-white" placeholder="Search By First Letter" aria-describedby="addon-wrapping">
         `
  myInputDisplay.innerHTML = cartona;
  mySearchByName = document.querySelector('.byName');
  mySearchByFirst = document.querySelector('.byFirst');
}


async function searchByName(mealName) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
  let finalrespone = await response.json();
  let myMeals = finalrespone.meals
  // console.log(myMeals);
  displaySearch(myMeals.slice(0, 20)) //HERE   
  // displayMealsDetails(myMeals) //HERE


}


async function searchByFirstL(term) {

  // term == "" ? term == "a" : "";
  let Res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  let finalRes = await Res.json();
  let myMeal = finalRes.meals
  // console.log(myMeal);
  displaySearch(myMeal.slice(0, 20)) //HERE   
  // displayMealsDetails(myMeals) //HERE
  $('.loadingScreen').fadeOut(1000);

}

function displaySearch(meal) {
  myDisplayRow.innerHTML = ""

  let cartona = ``
  if (meal) {
    for (let i = 0; i < meal.length; i++) {
      // console.log(meal[i].strMeal, meal[i].strMealThumb);  //HERE
      cartona +=
        `
        <div class="col-lg-3">
        <div class="myCard" onclick="getMealDetails('${meal[i].idMeal}')">
          <img src="${meal[i].strMealThumb}" class="img-fluid" alt="">
          <div class="contentHover">
            <p class="mx-2" >${meal[i].strMeal}</p>
          </div>
        </div>
      </div>
        
        `
    }


  }
  else {
    console.log("NOT FOUND");
  }

  myDisplayRow.innerHTML = cartona;

  $('.loadingScreen').fadeOut(1000);

}



async function getMealDetails(mealID) {

  myInputDisplay.innerHTML = ""
  myDisplayRow.innerHTML = ""

  closeNav();

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  let finalres = await res.json()
  let myMeals = finalres.meals

  // console.log(displayMealsDetails(myMeals[0]));
  displayMealsDetails(myMeals[0])
  $('.loadingScreen').fadeOut(1000);

}


function displayMealsDetails(meal) {
  myInputDisplay.innerHTML = ""
  myDisplayRow.innerHTML = ""


 
  let cartona = ``
  if (meal) {

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {  //HERE
      if (meal[`strIngredient${i}`]) {
        ingredients += `<li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
      }
    }
    let myTag = ``;
    let tagMeal = meal.strTags;
    if (tagMeal != null) {
      tagMeal = meal.strTags.split(",")
      console.log(tagMeal, meal.idMeal);
      for (let i = 0; i < tagMeal.length; i++) {
        myTag += `<li>${tagMeal[i]}</li>`

      }
    }
    else {
      tagMeal = ' '
    }
    // console.log(meal.idMeal);
    cartona +=
      `
                <div class="col-md-4 mx-3">
                <div class="">
                  <img src="${meal.strMealThumb}" class="img-fluid" alt="">
                  <p class="display-6 fw-bold">${meal.strMeal}</p>
                </div>
              </div>


              <div class="col-md-7">
                <div class="">
                  <div>
                    <span class="display-6 fw-bold">Instructions</span>
                    <p>${meal.strInstructions}</p>
                  </div>
                  <div>
                    <h3>
                      <span class="fw-bolder">Area :</span>
                      ${meal.strArea}
                    </h3>

                    <h3>
                      <span class="fw-bolder">Category :</span>
                      ${meal.strCategory}
                    </h3>

                    <div>
                      <h3>
                        <span class="fw-bolder">Recipes :</span>
                      </h3>

                      <ul class="d-flex flex-wrap myRecipes">
                             ${ingredients}
                      </ul>

                    </div>

                    <div>
                      <h3>
                        <span class="fw-bolder">Tags :</span>
                      </h3>

                      <ul class="d-flex flex-wrap myTags">
                        ${myTag}
                      </ul>
                    </div>

                    <div class="btns d-flex">
                        <div>
                              <a href="${meal.strSource}" class="btn btn-success py-2" target="_blank">Source</a>
                        </div>

                        
                        <div>
                              <a href="${meal.strYoutube}" class="btn btn-danger mx-2 py-2" target="_blank">Youtube</a>
                        </div>

                        
                    </div>
                  </div>
                </div>
              </div>
        `
    // }
  }
  else {
    console.log("NOT FOUND");
  }

  myDisplayRow.innerHTML = cartona;
  $('.loadingScreen').fadeOut(1000);

}


// CATEGORY/////

myCategoriesClick.addEventListener('click', () => {
  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""

  closeNav()
  getCategories()

})

async function getCategories() {
  let Res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let finalRes = await Res.json();
  let myCategoy = finalRes.categories
  displayCategories(myCategoy.slice(0, 20)) //HERE   
  // console.log(myDisplayCategory)
}



function displayCategories(category) {
  myInputDisplay.innerHTML = ""
  myDisplayRow.innerHTML = ""

  let cartona = ``
  if (category) {
    for (let i = 0; i < category.length; i++) {
      cartona +=
        `
                <div class="col-md-3">
                <div class="myCard category" onclick="filterByCategory('${category[i].strCategory}')">
                  <img src="${category[i].strCategoryThumb}" class="img-fluid" alt="">
                  <div class="contentHover category">
                    <h2 class="text-center">${category[i].strCategory}<h2>
                        <p>${category[i].strCategoryDescription}</p>
                  </div>
      
                </div>
              </div>
        `
      // console.log(category[i].strCategory);
    }


  }
  else {
    console.log("NOT FOUND");
  }

  myDisplayRow.innerHTML = cartona;
  $('.loadingScreen').fadeOut(1000);

}

async function filterByCategory(categoryName) {

  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""

  closeNav();

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
  let finalres = await res.json()
  let myCategoryMeals = finalres.meals

  console.log(myCategoryMeals);
  displaySearch(myCategoryMeals.slice(0, 20));
  $(".loadingScreen").fadeOut(1000)

}


//  AREAAA


myAreaClick.addEventListener('click', () => {
  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""

  closeNav()
  getArea()
  $('.loadingScreen').fadeOut(1000);

})


async function getArea() {
  let Res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let finalRes = await Res.json();
  let myArea = finalRes.meals
  displayAreas(myArea.slice(0, 20)) //HERE   
  // console.log(myArea)
}

function displayAreas(area) {
  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""

  closeNav();

  let cartona = ``
  if (area) {
    for (let i = 0; i < area.length; i++) {
      cartona +=
        `
               
                <div class="col-md-3">
          <div class="Area text-white text-center" onclick="filterByArea('${area[i].strArea}')">
            <i class="fa-solid fa-house fa-4x"></i>
            <div class="area my-1">
              <h2 class="text-center">${area[i].strArea}<h2>
        </div>
        </div>
      </div>
        `
    }


  }
  else {
    console.log("NOT FOUND");
  }

  myDisplayRow.innerHTML = cartona;
  $('.loadingScreen').fadeOut(1000);

}

async function filterByArea(AreaName) {

  closeNav();
  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaName}`);
  let finalres = await res.json()
  let myAreaMeals = finalres.meals

  console.log(myAreaMeals);
  displaySearch(myAreaMeals.slice(0, 20));

}


// Ingrediants
ingrediantsClick.addEventListener('click', () => {
  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""

  closeNav()
  getIngrediant()

})


async function getIngrediant() {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let finalRes = await res.json()
  let myIngrediants = finalRes.meals
  console.log(myIngrediants);
  displayIngredients(myIngrediants.slice(0, 20))
}

function displayIngredients(ingrediants) {

  myDisplayRow.innerHTML = ``
  let cartona = ``
  for (let i = 0; i < ingrediants.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div class="ingrediant text-white text-center" onclick="filterByIngrediant('${ingrediants[i].strIngredient}')">
      <i class="fa-solid fa-drumstick-bite fa-4x"></i>            <div class="area my-1">
        <h2 class="text-center">${ingrediants[i].strIngredient}<h2>
          <p class=" p-2">${ingrediants[i].strDescription}</p>
      </div>
    </div>
  </div>
    `
  }
  myDisplayRow.innerHTML = cartona
  $('.loadingScreen').fadeOut(1000);

}

async function filterByIngrediant(IngrediantName) {
  closeNav();
  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngrediantName}`);
  let finalres = await res.json()
  let myIngredianMeals = finalres.meals

  // console.log(myIngredianMeals);
  displaySearch(myIngredianMeals.slice(0, 20));
  $('.loadingScreen').fadeOut(1000);


}


let inpValidationUser;
let inpValidationMail;
let inpValidationPhone;
let inpValidationAge;
let inpValidationPass;
let inpValidationRePass;

let MsgUser;
let MsgEmail;
let MsgPhone;
let MsgAge;
let MsgPassword;
let MsgRePassword;


let userTouch = false;
let emailTouch = false;
let phoneTouch = false;
let ageTouch = false;
let passwordTouch = false;
let rePasswordTouch = false;


ContactClick.addEventListener('click', () => {
  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""
  closeNav();
  console.log("HI");


  getForm()
  myInputsValidation = document.querySelectorAll('.inpValidation')
  myInputsMsg = document.querySelectorAll('.myInputsMsg')
  inpValidationUser = document.querySelector('.inpValidationUser')
  inpValidationMail = document.querySelector('.inpValidationMail')
  inpValidationPhone = document.querySelector('.inpValidationPhone')
  inpValidationAge = document.querySelector('.inpValidationAge')
  inpValidationPass = document.querySelector('.inpValidationPass')
  inpValidationRePass = document.querySelector('.inpValidationRePass')
  MsgUser = document.querySelector('.MsgUser')
  MsgEmail = document.querySelector('.MsgEmail')
  MsgPhone = document.querySelector('.MsgPhone')
  MsgAge = document.querySelector('.MsgAge')
  MsgPassword = document.querySelector('.MsgPassword')
  MsgRePassword = document.querySelector('.MsgRePassword')
  BtnValidate = document.getElementById('myBtnValidate')
  myInputData()

})


function myInputData() {
  inpValidationUser.addEventListener('keyup', () => {
    userTouch = true;
    myMainValidation()
  })

  inpValidationMail.addEventListener('keyup', () => {
    emailTouch = true;
    myMainValidation()

  })

  inpValidationPhone.addEventListener('keyup', () => {
    phoneTouch = true;
    myMainValidation()

  })

  inpValidationAge.addEventListener('keyup', () => {
    ageTouch = true;
    myMainValidation()

  })

  inpValidationPass.addEventListener('keyup', () => {
    passwordTouch = true;
    myMainValidation()

  })

  inpValidationRePass.addEventListener('keyup', () => {
    rePasswordTouch = true;
    myMainValidation()

  })

  BtnValidate.addEventListener('click', () => {
    clearData()
    BtnValidate.setAttribute('disabled', true)

  })


}

function getForm() {
  myDisplayRow.innerHTML = ""
  myInputDisplay.innerHTML = ""
  let cartona = `
    <div class="col-md-6  text-center d-flex flex-column justify-content-center align-items-center mx-auto">
    <input  type="text" id="userName" class="form-control bg-white w-75 inpValidationUser" aria-describedby=""
      placeholder="Enter your Name" name="userName">
    <div id="" class="form-text MsgUser w-75 d-none myInputsMsg">
      Special characters and numbers not allowed
    </div>
  </div>


  <div class="col-md-6 text-center d-flex flex-column justify-content-center align-items-center mx-auto">
    <input  type="email" id="userEmail" class="form-control bg-white w-75 inpValidationMail" aria-describedby=""
      placeholder="Enter your E-mail" name="userEmail">
    <div id="" class="form-text MsgEmail w-75 d-none myInputsMsg">
      Email not valid *example@yyy.com
    </div>
  </div>


  <div class="col-md-6 text-center d-flex flex-column justify-content-center align-items-center mx-auto">
    <input  type="tel" id="userTel" class="form-control bg-white w-75 inpValidationPhone" aria-describedby=""
      placeholder="Enter your Phone number" name="userTel">
    <div id="" class="form-text MsgPhone w-75 d-none myInputsMsg">
      Enter valid Phone Number
    </div>
  </div>


  <div class="col-md-6 text-center d-flex flex-column justify-content-center align-items-center mx-auto">
    <input  type="number" id="userAge" class="form-control bg-white w-75 inpValidationAge" aria-describedby=""
      placeholder="Enter your Age" name="userAge">
    <div id="" class="form-text MsgAge w-75 d-none myInputsMsg">
      Enter a valid age
    </div>
  </div>

  <div class="col-md-6 text-center d-flex flex-column justify-content-center align-items-center mx-auto">
    <input  type="password" id="userPassword" class="form-control bg-white w-75 inpValidationPass"
      aria-describedby="passwordHelpBlock" placeholder="Enter your password" name="userPassword">
    <div id="" class="form-text MsgPassword w-75 d-none myInputsMsg">
      Enter valid password *Minimum eight characters, at least one letter and one number:*
    </div>
  </div>


  <div class="col-md-6 text-center d-flex flex-column justify-content-center align-items-center mx-auto">
    <input  type="password" id="userRePassword" class="form-control bg-white w-75 inpValidationRePass"
      aria-describedby="passwordHelpBlock" placeholder="Enter your re-password" name="userRePassword">
    <div id="" class="form-text MsgRePassword w-75 d-none myInputsMsg">
      Enter the same password
    </div>

  </div>

  <div class="mx-auto d-flex justify-content-center">
    <button id="myBtnValidate" class="btn btn-outline-danger" disabled>
      Submit
    </button>
  </div>
    `

  myDisplayRow.innerHTML = cartona


}

// REGEXXXXX//
let RegexUserName = /^[a-z\sA-Z]{1,25}$/
let RegexEmail = /^.{0,}(@[a-z]{1,8})\.com$$/
let RegexPhoneNumber = /^01[0125][0-9]{8}$/
let RegexAge = /^(0|[1-9][0-9]?)$/
let RegexPassword = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
let Inputs = document.querySelectorAll('.inputValue')
let myIcon = document.querySelectorAll('.myIcon')
let myIconMarked = document.querySelectorAll('.myIconMarked')






function myMainValidation() {
  if (userTouch) {
    if (UserValidation()) {
      MsgUser.classList.replace('d-block', 'd-none')
    }
    else {
      MsgUser.classList.replace('d-none', 'd-block')

    }
  }

  if (emailTouch) {
    if (MailValidation()) {
      MsgEmail.classList.replace('d-block', 'd-none')
    }
    else {
      MsgEmail.classList.replace('d-none', 'd-block')

    }
  }


  if (ageTouch) {
    if (AgeValidation()) {
      MsgAge.classList.replace('d-block', 'd-none')
    }
    else {
      MsgAge.classList.replace('d-none', 'd-block')

    }
  }

  if (phoneTouch) {
    if (PhoneValidation()) {
      MsgPhone.classList.replace('d-block', 'd-none')
    }
    else {
      MsgPhone.classList.replace('d-none', 'd-block')

    }
  }


  if (passwordTouch) {
    if (passwordValidation()) {
      MsgPassword.classList.replace('d-block', 'd-none')
    }
    else {
      MsgPassword.classList.replace('d-none', 'd-block')

    }
  }

  if (rePasswordTouch) {
    if (rePassValidation()) {
      MsgRePassword.classList.replace('d-block', 'd-none')

    }
    else {
      MsgRePassword.classList.replace('d-none', 'd-block')

    }
  }


  if (UserValidation() && MailValidation() && PhoneValidation()
    && AgeValidation() && passwordValidation() && rePassValidation()) {
    BtnValidate.removeAttribute('disabled')
  }
  else {
    BtnValidate.setAttribute('disabled', true)

  }

}

function clearData() {
  inpValidationUser.value = '';
  inpValidationMail.value = '';
  inpValidationPhone.value = '';
  inpValidationAge.value = '';
  inpValidationPass.value = '';
  inpValidationRePass.value = '';

}



function UserValidation() {
  return RegexUserName.test(inpValidationUser.value)
}

function MailValidation() {
  return RegexEmail.test(inpValidationMail.value)
}


function PhoneValidation() {
  return RegexPhoneNumber.test(inpValidationPhone.value)
}

function AgeValidation() {
  return RegexAge.test(inpValidationAge.value)
}


function passwordValidation() {
  return RegexPassword.test(inpValidationPass.value)
}

function rePassValidation() {
  return inpValidationRePass.value == inpValidationPass.value
}








