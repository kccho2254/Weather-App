//make a for loop that loops through an array for each day of the week/temperature/humidity/wind speed/uv index
//five day forecast
//html doesn't need to be extensive

$(document).ready(function () {
    //var queryURL
    //  holds the API key
    //  console log response.name, response.main.temp/humidity/speed
    //  ${response.main.temp} + 'degrees F'
    //  do the same for humidity and wind speed
    //  add a CSS class to all three of these 


    // function for getting the forecast (five day forecast)
    // make an array for response.list[i] within a for loop
    // DIV.append image/divClasses/${date}/
    // getForecast(UserInput)--userInput comes from API URL
    // get the icon for each weather report
    // image.attr ( 'src' '${hour.weather[0].icon}.png' )


    // need two different calls with two different API'

    function displayWeatherInfo(cityName) {


        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0a9a4df09118ecfa80161ac660502a6e&units=imperial`

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);

            // var cardBody = $('div').addClass('card-body');
            // var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            var feelsLike = $("<ul>").text("Feels like: " + res.main.feels_like + "°F");
            var humidity = $("<ul>").text("Humidity is: " + res.main.humidity + "%");
            var temp = $("<ul>").text("Temperature is: " + res.main.temp + "°F");

            $("#todayWeather").append(cityName, feelsLike, humidity, temp);


            var uvQueryURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=0a9a4df09118ecfa80161ac660502a6e`;

            console.log(res.coord.lat);
            console.log(res.coord.lon);

            $.ajax({
                url: uvQueryURL,
                method: "GET"

            }).then(function (res) {

                if (res.value > 7) {
                    var uvIndex = $("<ul>").text("UV index is: " + res.value).addClass('text-danger');
                    $("#todayWeather").append(uvIndex);
                }
                else if (res.value > 4 && res.value < 7) {
                    var uvIndex = $("<ul>").text("UV index is: " + res.value).addClass('text-warning');
                    $("#todayWeather").append(uvIndex);
                }
                if (res.value > 0 && res.value < 4) {
                    var uvIndex = $("<ul>").text("UV index is: " + res.value).addClass('text-success');
                    $("#todayWeather").append(uvIndex);
                }


            })

            var fiveDayQueryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=0a9a4df09118ecfa80161ac660502a6e`;
            // date, temp, humidity, icon

            $.ajax({
                url: fiveDayQueryURL,
                method: "GET"

            }).then(function (res) {
                console.log(res.list[0]);
                for (i = 0; i < 5; i++) {
                   
                    // var imageLocation = image.attr('src', '${res.list[i+0].weather[0].icon}.png');
                    
                    // var image = res.list[i+0].weather.icon;
                    // image.attr("src", `https://openweathermap.org/img/wn/${image}@2x.png`);
                    
                    // $("<img>").append(image);


                    console.log(res.list[i+0].dt_txt);
                    console.log(res.list[i+0].main.temp);
                    console.log(res.list[i+0].main.humidity);
                

                    var fiveDay = $("<ul>").text(res.list[i+0].dt_txt + " Temperature: " + res.list[i+0].main.temp +"°F + Humidity: "+ res.list[i+0].main.humidity + "%");
                  
                    $('#fiveDay').append(fiveDay);



                }
            })

        })
    }
    $('#search-button').on("click", function () {

        $("#todayWeather, #fiveDay").empty();
        var city = $('#search-value').val();
        displayWeatherInfo(city);

    })
})