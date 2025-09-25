import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Header from './components/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import countries from 'i18n-iso-countries';

document.body.style.backgroundColor = "#0d1117";
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState(null);
  const [getState, setGetState] = useState('tehran');
  const [state, setState] = useState('tehran');
  const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'metric'); // 'metric' | 'imperial'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(state)}&appid=${apiKey}&units=${unit}`;

  const fetchWeather = async (url) => {
    if (!apiKey) {
      setError('Missing REACT_APP_API_KEY. Please set it in your .env.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod && String(data.cod) !== '200') {
        setApiData(null);
        setError(data.message || 'Failed to fetch weather.');
      } else {
        setApiData(data);
        setLastUpdated(new Date());
      }
    } catch (e) {
      setError('Network error. Please try again.');
      setApiData(null);
    } finally {
      setLoading(false);
    }
  };

  // Side effect: fetch when city or unit changes
  useEffect(() => {
    fetchWeather(apiUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    if (getState && getState.trim()) {
      setState(getState.trim());
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitHandler();
    }
  };

  const changeUnit = (next) => {
    setUnit(next);
    localStorage.setItem('unit', next);
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported in this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
        fetchWeather(url);
        setGetState('My Location');
        setState('My Location');
      },
      () => setError('Unable to retrieve your location.')
    );
  };

  const formatTemp = (t) => {
    if (t === undefined || t === null) return '-';
    return Number(t).toFixed(1);
  };

  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div>
      <Header/>
    <Container>
      <Card style={{backgroundColor:"#0d1117" , border:" 2px solid #21262d"}}>
        <div align="center">
          <Card.Header className="h1" style={{backgroundColor:"#0d1117" , color:"#c9d1d9"}}>Weather</Card.Header>
          <Card.Body style={{backgroundColor:"#0d1117"}}>
            {error && (
              <Alert variant="danger" style={{textAlign:'left'}}>{error}</Alert>
            )}
            <Form.Group>
              <Form.Control
                style={{color:"#c9d1d9",
                backgroundColor:"#090d13",
                border:" 2px solid #21262d"}}
                type="search"
                id="location-name"
                className="form-control"
                onChange={inputHandler}
                onKeyDown={onKeyDown}
                value={getState}
                placeholder="Search weather by city"/>
            </Form.Group>
            <Row className="mt-2" style={{gap: '8px'}}>
              <Col xs="auto">
                <Button style={{backgroundColor:"#238636" ,  border: "#238636"}} onClick={submitHandler} disabled={loading}>
                  {loading ? 'Searching…' : 'Search'}
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="outline-light" onClick={useMyLocation} disabled={loading}>
                  Use My Location
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  variant={unit === 'metric' ? 'primary' : 'outline-light'}
                  onClick={() => changeUnit('metric')}
                >
                  °C
                </Button>{' '}
                <Button
                  variant={unit === 'imperial' ? 'primary' : 'outline-light'}
                  onClick={() => changeUnit('imperial')}
                >
                  °F
                </Button>
              </Col>
            </Row>
            {lastUpdated && (
              <div className="mt-3" style={{color:'#8b949e', fontSize: 12}}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </Card.Body>
        </div>
      </Card>
    </Container>
      
      <br></br>
      
        <Container style={{color:"#c9d1d9"}}>
          <Card style={{backgroundColor:"#0d1117" , border:" 2px solid #21262d"}} >
            {loading && (
              <div align="center" className="p-4"><Spinner animation="border" /></div>
            )}
            {!loading && apiData && apiData.main ? (
              <div align="center">
                <br />
                <Container>
                  <Row xs={1} md={2} className="g-3">
                    <Col>
                    <Card style={{border: "#21262d"}}>
                      <Card.Header className="h3" style={{backgroundColor:"#161b22" , color:"#8957e5"}}>Location</Card.Header>
                      <Card.Body style={{backgroundColor:"#0d1117"}}>
                        <h2>{apiData.name}</h2>
                        <Card.Text className="h6" style={{color:"#388afc"}}>
                          {countries.getName(apiData.sys.country, 'en')}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{border: "#21262d"}}>
                      <Card.Header className="h3" style={{backgroundColor:"#161b22" , color:"#da3633"}}>Temperature</Card.Header>
                      <Card.Body style={{backgroundColor:"#0d1117"}}>
                        <h2>{formatTemp(apiData.main.temp)}{unitSymbol}</h2>
                        <Card.Text className="h6" style={{color:"#e3b341"}}>
                          {apiData.weather?.[0]?.main}{' '}
                          {apiData.weather?.[0]?.icon && (
                            <img
                              alt={apiData.weather?.[0]?.description || 'icon'}
                              src={`https://openweathermap.org/img/wn/${apiData.weather?.[0]?.icon}@2x.png`}
                              style={{verticalAlign:'middle'}}
                            />
                          )}
                        </Card.Text>
                        {apiData.weather?.[0]?.description && (
                          <Badge bg="secondary" style={{background:'#30363d', color:'#c9d1d9'}}>
                            {apiData.weather?.[0]?.description}
                          </Badge>
                        )}
                      </Card.Body>
                    </Card>
                    </Col>
                  </Row>
                </Container>

                <Container>
                  <Row xs={1} sm={2} md={4} className="g-3">
                    <Col>
                    <Card style={{border: "#21262d"}}>
                      <Card.Header className="h5" style={{backgroundColor:"#161b22" , color:"#e3b341"}}>Feels Like</Card.Header>
                      <Card.Body style={{backgroundColor:"#0d1117"}}>
                        <Card.Text className="h6">
                          {formatTemp(apiData.main.feels_like)}{unitSymbol}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{border: "#21262d"}}>
                      <Card.Header className="h5" style={{backgroundColor:"#161b22" , color:"#da3633"}}>Temp Max</Card.Header>
                      <Card.Body style={{backgroundColor:"#0d1117"}}>
                        <Card.Text className="h6">
                          {formatTemp(apiData.main.temp_max)}{unitSymbol}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{border: "#21262d"}}>
                      <Card.Header className="h5" style={{backgroundColor:"#161b22" , color:"#8957e5"}}>Temp Min</Card.Header>
                      <Card.Body style={{backgroundColor:"#0d1117"}}>
                        <Card.Text className="h6">
                          {formatTemp(apiData.main.temp_min)}{unitSymbol}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{border: "#21262d"}}>
                      <Card.Header className="h5" style={{backgroundColor:"#161b22" , color:"#388afc"}}>Humidity</Card.Header>
                      <Card.Body style={{backgroundColor:"#0d1117"}}>
                        <Card.Text className="h6">
                          {apiData.main.humidity} %
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
            ) : (!loading && !error ? (
              <div align="center" className="p-4"><Spinner animation="border" /></div>
            ) : null)}
          </Card>
        </Container>
    </div>
  );
}

export default App;
