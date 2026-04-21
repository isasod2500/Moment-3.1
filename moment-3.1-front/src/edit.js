"use strict";

window.addEventListener("load", async () => {
    let sendUpdate = document.getElementById("sendUpdate")
    sendUpdate.addEventListener("click", updateQuery)

    let params = new URLSearchParams(document.location.search)
    let id = params.get("id");

    try {
        const getDatabase = await fetch(`https://mongodb-lab3.onrender.com/api/workexperience/${id}`)
        const db = await getDatabase.json()
        console.log(db)
        console.log(id)
        let company = db.company
        let jobtitle = db.jobtitle
        let joblocation = db.joblocation
        let workfromwhere = db.workfromwhere
        let workinghours = db.workinghours
        let description = db.description

        document.getElementById("company").value = company
        document.getElementById("jobtitle").value = jobtitle
        document.getElementById("joblocation").value = joblocation
        document.getElementById("workfromwhere").value = workfromwhere
        document.getElementById("workinghours").value = workinghours
        document.getElementById("description").value = description

    } catch (err) {
        console.log(err)
    }

});

//Funktion som POSTar formulärdata
async function updateQuery() {
    //Stoppa sidan att ladda om vid submit
    event.preventDefault()

    let params = new URLSearchParams(document.location.search)
    let id = params.get("id");

    //Tom error array för felmeddelanden.
    const errors = [];

    //Skapande av variabler för HTML DOM
    let company = document.getElementById("company").value
    let jobtitle = document.getElementById("jobtitle").value
    let joblocation = document.getElementById("joblocation").value
    let workfromwhere = document.getElementById("workfromwhere").value
    let workinghours = document.getElementById("workinghours").value
    let description = document.getElementById("description").value

    //Skapar objekt för att skicka till APIn
    let work = {
        company: company,
        jobtitle: jobtitle,
        joblocation: joblocation,
        workfromwhere: workfromwhere,
        workinghours: workinghours,
        description: description
    }

    console.log(work)
    //Stoppar dubbletter
    let result = await fetch(`https://mongodb-lab3.onrender.com/api/workexperience/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }

    })
    let dbResult = await result.json()
    //validerare för entries.
    Object.values(dbResult).forEach(entry => {
        if (company === entry.company &&
            jobtitle === entry.jobtitle) {
            errors.push(`Angiven befattning finns redan registrerad på arbetsplats - kontrollera även start- och slutdatum`)

            if (company === entry.company) {
                document.getElementById("company").value = ""
            }

            if (jobtitle === entry.jobtitle) {
                document.getElementById("jobtitle").value = ""
            }

            return;
        }

    })
    //Om errors har fler än ett entry, fyll errorlistan.
    if (errors.length > 0) {
        let errorList = document.getElementById("errorList")
        errors.forEach(error => {
            let errorLine = document.createElement("li")
            errorLine.innerHTML = error

            errorList.appendChild(errorLine)
        })

    }

        //I fall inga fel finns, skicka till PUT
    if (errors.length === 0) {

        let response = await fetch(`https://mongodb-lab3.onrender.com/api/workexperience/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(work)
        });
        let data = await response.json();
        console.log(data);

       //Ladda index vid lyckad input
        window.location = `./index.html`
    }
}