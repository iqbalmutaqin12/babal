window.addEventListener('load', ()=>{
    var long;
    var lat;

        // Menggunakan Geolocation
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(letak =>{
                long = letak.coords.longitude;
                lat = letak.coords.latitude;
                console.log(long,lat);
                let weatherApi = {
                "api": "2e20d58821e364bba1afafd5482021ca",
                    
               fetchCuaca: function(){
                   fetch(
                        "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&lang=id&appid=2e20d58821e364bba1afafd5482021ca"
                        ).then((response) => response.json())
                        .then((data) => this.displayCuaca(data));
            
                },
                
                // Menggunakan search
                fetchCuaca1: function(tempat){
                    fetch(
                         "https://api.openweathermap.org/data/2.5/weather?q=" + tempat + "&units=metric&lang=id&appid=2e20d58821e364bba1afafd5482021ca"
                         ).then((response) => response.json())
                         .then((data) => this.displayCuaca(data));
             
                 },
                displayCuaca: function(data){
                    // Mengambil data cuaca
                    const { name } = data;
                    const { main, description, icon } = data.weather[0];
                    const { temp, humidity } = data.main;
                    const { speed } = data.wind;
                    
                    // Menampilkan data cuaca
                    document.querySelector(".tempat").textContent = name;
                    document.querySelector(".derajat").textContent = "Suhu : " +  Math.floor(temp) + "°C" ;
                    document.querySelector(".kelembapan").textContent = "Kelembapan : " + humidity + "%";
                    document.querySelector(".kecepatan-angin").textContent = "Angin : " + speed + " km/h";
                    document.querySelector(".kondisi-awan").textContent = description; 
                    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                    
                    
                },
                
                search: function(){
                    
                    this.fetchCuaca1(document.querySelector("#searchCity").value);
                },
            
               
            }   
            
            
            document.querySelector("#searchCity").addEventListener("keyup",function(event) {
                if(event.key == "Enter"){
                    weatherApi.search();
                }
            
                
            });
            
           document.querySelector("#search").addEventListener("click", function(){
                weatherApi.search();
           });
            weatherApi.fetchCuaca();
           
            
            })
        }
    });
    
   function gantiBg(){
        let jam = new Date().getHours();
        let bg1 = document.querySelectorAll("#weather");
        let bg = document.querySelector("#waktu");
        
        
        // Pagi
        if(jam < 12){
            bg.classList.add("pagi");
            for(var i = 0;i <= bg1.length;i++){
                bg1[i].classList.add("display-pagi")
                
            }
        }
        
        // siang
        else if(jam >= 12 && jam < 17){
            bg.classList.add("siang");
            
            
            for(var i = 0;i <= bg1.length;i++){
                bg1[i].classList.add("display-siang")
                
            }
            
        }
        
        // Malam
        else if(jam >= 17 && jam <= 24){
            bg.classList.add("malam");
            
            for(var i = 0;i <= bg1.length;i++){
                bg1[i].classList.add("display-malam")
                

    
            }
        }



    }

    gantiBg();
