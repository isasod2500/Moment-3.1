"use strict";

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("submitBtn").addEventListener("click", sendQuery)
})

//Funktion som POSTar formulärdata
async function sendQuery(event) {
    //Stoppa sidan att ladda om vid submit
    event.preventDefault()

    //Tom error array för felmeddelanden.
    const errors = [];

    let errorList = document.getElementById("errorList")
    errors.length = 0;
    errorList.innerHTML = ""

    //Skapande av variabler för HTML DOM
    let company = document.getElementById("company").value
    let jobtitle = document.getElementById("jobtitle").value
    let joblocation = document.getElementById("joblocation").value
    let workfromwhere = document.getElementById("workfromwhere").value
    let workinghours = document.getElementById("workinghours").value
    let description = document.getElementById("description").value

    if(company === "") {
        errors.push(`Företag måste fyllas i`)
    }

    if(jobtitle === "") {
        errors.push(`Befattningsroll måste fyllas i`)
    }

    if(joblocation === "") {
        errors.push(`Arbetsort måste fyllas i`)
    }

    if(workfromwhere === "") {
        errors.push(`Arbetsform måste fyllas i`)
    }

    if(workinghours === "") {
        errors.push(`Arbetsgrad måste fyllas i`)
    }

    if(description === "") {
        errors.push(`Rollbeskrivning måste fyllas i`)
    } else {
            //Skapar objekt för att skicka till APIn
    let work = {
        company: company,
        jobtitle: jobtitle,
        joblocation: joblocation,
        startdate: startdate,
        enddate: enddate,
        description: description
    }
    }
    //Dubbelkollar i fall det som skrivits redan finns i databasen
    let result = await fetch(`https://mongodb-lab3.onrender.com/api/workexperience/`, {
        headers: {
            "Content-Type": "application/json"
        }

    })
    let dbResult = await result.json()

    if (jobtitle === "") {
        errors.push(`Befattning måste anges`)
    }

    if (company === "") {
        errors.push(`Företag måste anges. Vid sekretess skriv 'NDA'`)
    }

    if (workinghours === "") {
        errors.push(`Arbetstimmar måste anges`)
    }
    //validerare för entries. En anställd kan ha samma roll på samma företag, men inte flera gånger under samma tidsperiod.
    Object.values(dbResult).forEach(entry => {
        if (company === entry.company &&
            jobtitle === entry.jobtitle) {
            errors.push(`Angiven befattning finns redan registrerad på arbetsplats`)

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

        errors.forEach(error => {
            let errorLine = document.createElement("li")
            errorLine.innerHTML = error

            errorList.appendChild(errorLine)
        })

    }

    //I fall inga fel finns, skicka till POST
    if (errors.length === 0) {

        let response = await fetch(`https://mongodb-lab3.onrender.com/api/workexperience/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(work)
        });

        document.getElementById("form").reset()

        document.getElementById("success").innerHTML = `Post skapad!`
    }

}
