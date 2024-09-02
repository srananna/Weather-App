import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "43217a367c4c3b0a01c03e55f1c35d4a";

    let getWeatherInfo = async () => {
        try {
            let response =  await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=matric`);
      let jsonResponse = await response.json();
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
        } catch(err) {
            throw err;
        }
      
    };

    
    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        try {
        evt.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
        } catch(err) {
            setError(true);
        }
        
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required onChange={handleChange}/>
            <br /><br />
            <Button variant="contained" type="submit">
            Send
            </Button>
            {error && <p style={{color:"red"}}>No such place exist!</p>}
            </form>
        </div>
    );
}