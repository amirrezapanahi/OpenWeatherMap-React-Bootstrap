import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container'
import Header from './components/Header'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import countries from 'i18n-iso-countries';

document.body.style.backgroundColor = "#0d1117";
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('tehran');
  const [state, setState] = useState('tehran');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };



  return (
    <div>
      <Header/>
    <Container>
      <Card style={{backgroundColor:"#0d1117" , border:" 2px solid #21262d"}}>
      <div align = "center">
        <Card.Header className="h1" style={{backgroundColor:"#0d1117" , color:"#c9d1d9"}}>Get Weather</Card.Header>
        <Card.Body style={{backgroundColor:"#0d1117"}}>
          <Form.Group>
            <Form.Control
              style={{color:"#c9d1d9",
              backgroundColor:"#090d13",
              border:" 2px solid #21262d"}} 
              type="text" 
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
              placeholder="search weather by city"/>
            </Form.Group>
            <Button style={{backgroundColor:"#3fb950" ,  border: "#3fb950"}} onClick={submitHandler}>Search</Button>
          </Card.Body>
        </div>
      </Card>
    </Container>
      
      <br></br>
      
        <Container style={{color:"#c9d1d9"}}>
          <Card style={{backgroundColor:"#0d1117" , border:" 2px solid #21262d"}} >
          {apiData.main ? ( 
            <div align = "center">
              <br></br>
          <Container>
            <CardDeck>
              <Card style={{border: "#21262d"}}>
                <Card.Header className="h3" style={{backgroundColor:"#161b22" , color:"#8957e5"}}>Location</Card.Header>
                <Card.Body style={{backgroundColor:"#0d1117"}}>
                <h2>{apiData.name}</h2>
                <Card.Text className="h6" style={{color:"#388afc"}}>
                  {countries.getName(apiData.sys.country, 'en')}
                </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{border: "#21262d"}}>
                <Card.Header className="h3" style={{backgroundColor:"#161b22" , color:"#da3633"}}>Temperature</Card.Header>
                
                <Card.Body style={{backgroundColor:"#0d1117"}}>
                  <h2>{kelvinToFarenheit(apiData.main.temp)}&deg;C</h2>
                  <Card.Text className="h6" style={{color:"#e3b341"}}>
                    {apiData.weather[0].main}
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </Container>

          <Container>
            <CardDeck>
              <Card style={{border: "#21262d"}}>
                <Card.Header className="h5" style={{backgroundColor:"#161b22" , color:"#e3b341"}}>feelslike</Card.Header>
                <Card.Body style={{backgroundColor:"#0d1117"}}>
                <Card.Text className="h6">
                  {kelvinToFarenheit(apiData.main.feels_like)}&deg;C
                </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{border: "#21262d"}}>
                <Card.Header className="h5" style={{backgroundColor:"#161b22" , color:"#da3633"}}>temp max</Card.Header>
                <Card.Body style={{backgroundColor:"#0d1117"}}>
                <Card.Text className="h6">
                  {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{border: "#21262d"}}>
                <Card.Header className="h5" style={{backgroundColor:"#161b22" , color:"#8957e5"}}>temp min</Card.Header>
                <Card.Body style={{backgroundColor:"#0d1117"}}>
                <Card.Text className="h6">
                  {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{border: "#21262d"}}>
                <Card.Header className="h5" style={{backgroundColor:"#161b22" , color:"#388afc"}}>Humidity</Card.Header>
                <Card.Body style={{backgroundColor:"#0d1117"}}>
                <Card.Text className="h6">
                  {apiData.main.humidity} %
                </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </Container>

          </div>
          ) : (<div align = "center"><Spinner animation="border" /></div>)}
        </Card>
      </Container>
    </div>
  );
}

export default App;