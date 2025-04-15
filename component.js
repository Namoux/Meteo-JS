/**
 * Fonction qui recupère la date
 */
export function GetDate () {
    const date = new Date();

    // Tableau contenant jour mois année
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    // Affichage de la date en français
    const formattedDate = date.toLocaleDateString("fr-FR", options);

    // On l'affiche sur le HTML
    const logDate = document.querySelector(".date>p");
    logDate.innerText = (formattedDate);
};

/**
 * Fonction qui recupere les données météo 
 * @param {*} name 
 * @param {*} longitude 
 * @param {*} latitude 
 */
export function GetMeteo (name, longitude, latitude) {

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,sunrise,sunset&current=temperature_2m,weather_code,precipitation,is_day,wind_speed_10m,wind_direction_10m,relative_humidity_2m`)
    .then(response=>response.json()) 
    .then(object=>{
        console.log(object);
        // console.log(object.current);
        // console.log(object.current.weather_code);
        SetCurrentWeather(name, object);
    })
    .catch((error)=>{
        console.error(error.message);
    });
};

/**
 * Focntion qui affiche les données météo
 * @param {*} name 
 * @param {*} object 
 */
function SetCurrentWeather(name, object) {

    
    const firstPlan = document.querySelector(".firstPlan");
    const template = document.querySelector(".post-template");
    
    // Si un élément est présent, on le supprime
    const div = document.querySelector(".CurrentWeather");
    if (div != null) {
        div.remove();
    };
    
    // On clone la template
    const cloneTemplate = template.content.cloneNode(true);
    
    // Definition de la ville
    const nameTown = cloneTemplate.querySelector("#Town");
    nameTown.innerText = (name);
    
    // Définition de la température
    const degree = cloneTemplate.querySelector("#degree");
    degree.innerText = (object.current.temperature_2m+"°C");

    // Définition de l'humidité
    const humidite = cloneTemplate.querySelector("#humidite");
    humidite.innerText = ("Humidité: "+object.current.relative_humidity_2m+"%");

    // Définition de la vitesse du vent
    const windSpeed = cloneTemplate.querySelector("#windspeed");
    windSpeed.innerText = ("Vitesse du vent: "+object.current.wind_speed_10m+"km/h");

    // Définittion de la direction du vent
    const windDirection = cloneTemplate.querySelector("#winddirection");
    windDirection.innerText = ("Direction du vent: "+object.current.wind_direction_10m+"°");
    
    // Définition du temps actuel
    const forecast = object.current.weather_code;
    console.log("WeatherCode", forecast);
    
    const description = cloneTemplate.querySelector("#meteoTxt");
    const iconMeteo = cloneTemplate.querySelector("#meteoImg");
    
    // Selon le temps on attribue la bon icone
    if (forecast == 0) {
        description.innerText = ("Ensoleillé");
        iconMeteo.setAttribute("src", "public/clear.png");
    } else if (forecast == 1) {
        description.innerText = ("Eclaircies");
        iconMeteo.setAttribute("src", "public/mostly-clear.png");
    } else if (forecast == 2) {
        description.innerText = ("Partiellement nuageux");
        iconMeteo.setAttribute("src", "public/partly-cloudy.png");
    } else if (forecast == 3) { 
        description.innerText = ("Très nuageux");
        iconMeteo.setAttribute("src", "public/overcast.png");
    } else if (forecast == 45) { 
        description.innerText = ("Brouillard");
        iconMeteo.setAttribute("src", "public/fog.png");
    } else if (forecast == 48) { 
        description.innerText = ("Brouillard givré");
        iconMeteo.setAttribute("src", "public/rime-fog.png");
    } else if (forecast == 51) { 
        description.innerText = ("Légère brume");
        iconMeteo.setAttribute("src", "public/light-drizzle.png");
    } else if (forecast == 53) { 
        description.innerText = ("Brume modérée");
        iconMeteo.setAttribute("src", "public/moderate-drizzle.png");
    } else if (forecast == 55) { 
        description.innerText = ("Brume Dense");
        iconMeteo.setAttribute("src", "public/dense-drizzle.png");
    } else if (forecast == 80) { 
        description.innerText = ("Légère pluie");
        iconMeteo.setAttribute("src", "public/light-rain.png");
    } else if (forecast == 81) { 
        description.innerText = ("Pluie modérée");
        iconMeteo.setAttribute("src", "public/moderate-rain.png");
    } else if (forecast == 82) { 
        description.innerText = ("Forte pluie");
        iconMeteo.setAttribute("src", "public/heavy-rain.png");
    } else if (forecast == 61) { 
        description.innerText = ("Légère pluie");
        iconMeteo.setAttribute("src", "public/light-rain.png");
    } else if (forecast == 63) { 
        description.innerText = ("Pluie modérée");
        iconMeteo.setAttribute("src", "public/moderate-rain.png");
    } else if (forecast == 65) { 
        description.innerText = ("Forte pluie");
        iconMeteo.setAttribute("src", "public/heavy-rain.png");
    } else if (forecast == 56) { 
        description.innerText = ("Légère brume verglaçante");
        iconMeteo.setAttribute("src", "public/light-freezing-drizzle.png");
    } else if (forecast == 57) { 
        description.innerText = ("Brume dense verglaçante");
        iconMeteo.setAttribute("src", "public/dense-freezing-drizzle.png");
    } else if (forecast == 66) { 
        description.innerText = ("Légère pluie verglaçante");
        iconMeteo.setAttribute("src", "public/light-freezing-rain.png");
    } else if (forecast == 67) { 
        description.innerText = ("Forte pluie verglaçante");
        iconMeteo.setAttribute("src", "public/heavy-freezing-rain.png");
    } else if (forecast == 77) { 
        description.innerText = ("Neige");
        iconMeteo.setAttribute("src", "public/snowflake.png");
    } else if (forecast == 85) { 
        description.innerText = ("Légère neige");
        iconMeteo.setAttribute("src", "public/slight-snowfall.png");
    } else if (forecast == 86) { 
        description.innerText = ("Neige forte");
        iconMeteo.setAttribute("src", "public/heavy-snowfall.png");
    } else if (forecast == 71) { 
        description.innerText = ("Légère neige");
        iconMeteo.setAttribute("src", "public/slight-snowfall.png");
    } else if (forecast == 73) { 
        description.innerText = ("Neige modérée");
        iconMeteo.setAttribute("src", "public/moderate-snowfall.png");
    } else if (forecast == 75) { 
        description.innerText = ("Neige forte");
        iconMeteo.setAttribute("src", "public/heavy-snowfall.png");
    } else if (forecast == 95) { 
        description.innerText = ("Orageux");
        iconMeteo.setAttribute("src", "public/thunderstorm.png");
    } else if (forecast == 96) { 
        description.innerText = ("Orage avec grêle");
        iconMeteo.setAttribute("src", "public/thunderstorm-with-hail.png");
    } else if (forecast == 99) { 
        description.innerText = ("Orage avec grêle");
        iconMeteo.setAttribute("src", "public/thunderstorm-with-hail.png");
    }    
    
    firstPlan.appendChild(cloneTemplate);

    // Mode nuit
    const body = document.querySelector("body");
    const listSearch = document.querySelector(".listSearch");

    if (object.current.is_day == 0) {
        body.classList.add("night");
        listSearch.classList.add("night");
    } else if (object.current.is_day == 1) {
        body.classList.remove("night");
        listSearch.classList.remove("night");
    }
};

/**
 * Focntion qui cherche par le bouton submit
 */
export function searchBySubmit () {
    
    const form = document.querySelector("form");
    
    // Ecouteur d'évenement mode submit
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        
        // On lit les entrées utilisateurs
        const newTown = formData.get("searchTown");
        const latitude = formData.get("latitude");
        const longitude = formData.get("longitude");
        
        // Si recherche par ville
        if (newTown != 0 & latitude == 0 & longitude == 0) {
            
            // Definition de la route par la ville
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${newTown}&count=10&language=fr&format=json`)
            .then(response => response.json())
            .then(objects => {
                // console.log("resultat de la recherche", objects);
                
                console.log(newTown); 
                const resultsTown = objects.results;
                
                // On recupère dans le tableau les données necessaires
                for (let i = 0; i < 1; i++) {
                    // console.log("results", resultsTown[0].name);
                    // console.log("results", resultsTown[0].admin1);
                    // console.log("results", resultsTown[0].admin2);
                    // console.log("results", resultsTown[0].country);
                    // console.log("results", resultsTown[0].longitude);
                    // console.log("results", resultsTown[0].latitude);
                    
                    const nameTown = resultsTown[0].name;
                    const longitude = resultsTown[0].longitude;
                    const latitude = resultsTown[0].latitude;
                    GetMeteo (nameTown, longitude, latitude);
                };
            });
            
            // L'element listSearch si present on la supprime
            const DivVilleFounds = document.querySelectorAll(".VilleFound");
            DivVilleFounds.forEach((VilleFound) => {
                VilleFound.remove();
                // console.log("List search's div removed");
            });
            
            // on réinitialise les champs de saisie titre et description
            document.querySelector("#searchTown").value = ""; 
            
        // Recherche par les coordonnées GPS   
        } else if (newTown == 0 & latitude != 0 & longitude != 0){
            const Plat = ("latitude :"+" "+latitude);
            const Plong = (" longitude : "+" "+longitude);
            const name = [
                Plat,
                Plong
            ]

            GetMeteo (name, longitude, latitude);

            // on réinitialise les champs de saisie titre et description
            document.querySelector("#latitude").value = ""; 
            document.querySelector("#longitude").value = ""; 

        // Erreur dans la recherche    
        } else {
            console.log("Erreur dans les coordonées");

            const DivVilleFounds = document.querySelectorAll(".VilleFound");
            DivVilleFounds.forEach((VilleFound) => {
                VilleFound.remove();
                // console.log("List search's div removed");
            });

            const message = "Pas de correspondance..."
            const firstPlan = document.querySelector(".firstPlan");
            const template = document.querySelector(".post-template");
            
            const div = document.querySelector(".CurrentWeather");
            if (div != null) {
                div.remove();
            };
            
            const cloneTemplate = template.content.cloneNode(true);
        
            const nameTown = cloneTemplate.querySelector("#Town");
            nameTown.innerText = (message);

            const iconMeteo = cloneTemplate.querySelector("#meteoImg");
            iconMeteo.setAttribute("src", "public/not-found-location.png");

            firstPlan.appendChild(cloneTemplate);
        };
    });     
};

/**
 * Fonction qui préaffiche les villes selon l'entrée utilisateur
 */
export function listSearch () {
    
    const inputTown = document.querySelector("#searchTown");
    const listSearch = document.querySelector(".listSearch");

    // Avant chaque input, on supprime l'element listSearch
    inputTown.addEventListener("beforeinput", () => {
        const DivVilleFounds = document.querySelectorAll(".VilleFound");
        DivVilleFounds.forEach((VilleFound) => {
            VilleFound.remove();
            // console.log("List search's div removed");
        });
    });

    // Ecouteur d'evenement sur le input
    inputTown.addEventListener("input", (event) => {
        const userInput = event.target.value;

        // On definit la route selon l'entrée utilisateur
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${userInput}&count=10&language=fr&format=json`)
        .then(response => response.json())
        .then(objects => {

            const resultsTown = objects.results;
            console.log(resultsTown);

            // On recupère dans le tableau les données necessaires
            for (let i = 0; i < resultsTown.length; i++) {
                // console.log("results town", resultsTown[i].name);
                // console.log("results admin1", resultsTown[i].admin1);
                // console.log("results admin2", resultsTown[i].admin2);
                // console.log("results country", resultsTown[i].country);
                
                const resultTown = resultsTown[i].name;
                const resultAdmin1 = resultsTown[i].admin1;
                const resultAdmin2 = resultsTown[i].admin2;
                const resultCountry = resultsTown[i].country;
                const longitude = resultsTown[i].longitude;
                const latitude = resultsTown[i].latitude;
                const tabTown = [];

                // On insere dans un tableau les données non nulles
                if (resultTown != null) {
                    tabTown.push(resultTown);
                }

                if (resultAdmin1 != null) {
                    tabTown.push(resultAdmin1);
                }

                if (resultAdmin2 != null) {
                    tabTown.push(resultAdmin2);
                }

                if (resultCountry != null) {
                    tabTown.push(resultCountry);
                }

                // console.log(tabTown);

                // On clone les elements et affichage dans le HTML
                const template = document.querySelector(".SearchVille");
                const cloneTemplate = template.content.cloneNode(true);

                const VilleFound = cloneTemplate.querySelector(".VilleFound>p");
                VilleFound.innerText = (tabTown);

                // Ecouteur d'evenement sur la ville affichée 
                VilleFound.addEventListener("click", () => {
                    GetMeteo(resultTown, longitude, latitude);
                    const DivVilleFounds = document.querySelectorAll(".VilleFound");
                    DivVilleFounds.forEach((VilleFound) => {
                        VilleFound.remove();
                        // console.log("List search's div removed");
                    });
                    // on réinitialise les champs de saisie titre et description
                    document.querySelector("#searchTown").value = ""; 
                })

                listSearch.appendChild(cloneTemplate);
            };

        });
        
    })
};

/**
 * Fonction qui recupere la geolocalisation
 */
export function getCurrentPosition () {
    navigator.geolocation.getCurrentPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude, position.coords.longitude);
      });

      const watchID = navigator.geolocation.watchPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
      });
      
      console.log(navigator);
      console.log("watchID:", watchID);
};
