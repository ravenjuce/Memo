import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://evemeno-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const menolistInDB = ref(database, "monoList")

const inputEl = document.getElementById("input-el")
const btnEl = document.getElementById("btn-el")
const ulEl = document.getElementById("ul-el")

// click and save data from input
btnEl.addEventListener("click",  function(){
    if (inputEl.value!="") {
        push(menolistInDB, inputEl.value)
        inputEl.value=""
    } 
})

// fetch data from database & create list
onValue(menolistInDB,function(snapshot) {
    if (snapshot.exists()) {
        let itemsArr = Object.entries(snapshot.val())

        // empty the ulEL
        ulEl.innerHTML = ""

        // go through the array & create list
        for (let i = 0; i < itemsArr.length; i++) {

            const li = document.createElement("li")
            li.textContent = itemsArr[i][1]
            ulEl.append(li)

            li.addEventListener("dblclick", function() {
                // find the item place in database
                let exactLocationOfItemInDB = ref(database, `monoList/${itemsArr[i][0]}`)
                remove(exactLocationOfItemInDB)
                console.log("hei")
            })
        }
    } else {
        ulEl.innerHTML = ""
    }
})