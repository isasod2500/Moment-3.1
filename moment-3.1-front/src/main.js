"use strict";

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

async function fetchData() {

  try {
    const getData = await fetch(`https://mongodb-lab3.onrender.com/api/workexperience`)
    const db = await getData.json()

    let company = db.company
    let jobtitle = db.jobtitle
    let joblocation = db.joblocation
    let workfromwhere = db.workfromwhere
    let workinghours = db.workinghours
    let description = db.description

    //forEach loop för object
    Object.values(db).forEach(entry => {
      let listContainer = document.getElementById("listContainer")
      let listItem = document.createElement("div")
      listItem.setAttribute("class", "listItem")

      let listHeader = document.createElement("h2")
      listHeader.innerHTML = `${entry.company} - ${entry.jobtitle}`

      let listjoblocation = document.createElement("h3")
      listjoblocation.innerHTML = `${entry.joblocation}`

      let workfromwhere = entry.workfromwhere
      let workinghours = entry.workinghours
      let listDate = document.createElement("h3")
      listDate.innerHTML = `${workfromwhere}, ${workinghours}`

      let listDescription = document.createElement("p")

      listDescription.innerHTML = `${entry.description}`
      listDescription.style.fontStyle = "italic"

      let buttonsDiv = document.createElement("div")
      buttonsDiv.setAttribute("class", "buttonsDiv")

      let updateBtn = document.createElement("button")
      updateBtn.setAttribute("class", "updateBtn")
      updateBtn.value = entry._id
      updateBtn.textContent = `Ändra post`


      let deleteBtn = document.createElement("button")
      deleteBtn.setAttribute("class", "deleteBtn")
      deleteBtn.value = entry._id
      deleteBtn.textContent = `Radera post`

      buttonsDiv.appendChild(updateBtn)
      buttonsDiv.appendChild(deleteBtn)

      listItem.appendChild(listHeader)
      listItem.appendChild(listjoblocation)
      listItem.appendChild(listDate)
      listItem.appendChild(listDescription)
      listItem.appendChild(buttonsDiv)
      listContainer.appendChild(listItem)

      updateBtn.addEventListener("click", () => {
        updatePage(entry._id)
      })
      deleteBtn.addEventListener("click", deleteQuery)

    })

  } catch (err) {
    console.log(`Error: ${err}`)
  }
}
//Byta sida till uppdatera, och IDt följer med
function updatePage(id) {
  window.location=`./edit.html?id=${id}`
}

async function deleteQuery(event) {
  let id = event.target.value
  try {
    const deleteDatabase = await fetch(`https://mongodb-lab3.onrender.com/api/workexperience/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await deleteDatabase.json();

    document.getElementById("listContainer").innerHTML = ""
    fetchData()
  } catch (err) {
    console.error(err)
  }
}
