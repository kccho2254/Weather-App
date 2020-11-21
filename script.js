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

        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0a9a4df09118ecfa80161ac660502a6e&units=imperial`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);

            // var card = $('div').addClass('card');
            // // var cardBody = $('div').addClass('card-body');
            // // var cityTitle = $('<h3>').text(res.name);
            // // var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            var feelsLike = $("<td>").text("Feels like: " + res.main.feels_like + "°F");
            var humidity = $("<td>").text("Humidity is: " + res.main.humidity);
            var temp = $("<td>").text("Temperature is: " + res.main.temp + "°F");

            temp.append(card)
            humidity.append(card);
            feelsLike.append(card);
            $("#todayWeather").append(cityName, lSection, mSection, nSection);

        });
    }
    $('#search-button').on("click", function () {
        var city = $('#search-value').val();
        displayWeatherInfo(city);

    })

})