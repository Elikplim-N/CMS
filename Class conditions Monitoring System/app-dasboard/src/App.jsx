import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sensorVals, setSensorVals] = useState({
    sensor1: { value: null, unit: "°C", icon: "temperature", threshold: 28 },
    sensor2: { value: null, unit: "%", icon: "humidity", threshold: 70 },
    sensor3: { value: null, unit: "ppm", icon: "CO2", threshold: 500 },
    sensor4: { value: null, unit: "dB", icon: "sound", threshold: 85 },
  });

  const getSensorValues = async () => {
    try {
      const response = await fetch("https://api.waziup.io/api/v2/devices/kofikofi/sensors");
      const data = await response.json();

      const sensorData = {
        sensor1: data.find(sensor => sensor.id === "TC"),
        sensor2: data.find(sensor => sensor.id === "HD"),
        sensor3: data.find(sensor => sensor.id === "aq"),
        sensor4: data.find(sensor => sensor.id === "snd"),
      };

      setSensorVals(prevState => ({
        sensor1: { ...prevState.sensor1, value: sensorData.sensor1.value.value },
        sensor2: { ...prevState.sensor2, value: sensorData.sensor2.value.value },
        sensor3: { ...prevState.sensor3, value: sensorData.sensor3.value.value },
        sensor4: { ...prevState.sensor4, value: sensorData.sensor4.value.value },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSensorValues();
    const interval = setInterval(getSensorValues, 10000); // Update every 10 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const checkThreshold = (sensor) => {
    return sensor.value !== null && sensor.value > sensor.threshold;
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center my-4">Class Monitoring System</h1>
        <div className="row">
          {/* Temperature Sensor */}
          <div className="col-md-3">
            <div className={`card mb-4 ${checkThreshold(sensorVals.sensor1) ? "bg-danger" : ""}`}>
              <div className="card-body">
                <h2 className="card-title">Temperature</h2>
                <p className="card-text" id="t1">
                  {sensorVals.sensor1.value !== null
                    ? `${sensorVals.sensor1.value} ${sensorVals.sensor1.unit}`
                    : "---"}
                </p>
                <p className="card-subtext">
                  <i className={`icon-${sensorVals.sensor1.icon}`}></i>
                </p>
                {checkThreshold(sensorVals.sensor1) && <p className="alert">Threshold breached!</p>}
              </div>
            </div>
          </div>

          {/* Humidity Sensor */}
          <div className="col-md-3">
            <div className={`card mb-4 ${checkThreshold(sensorVals.sensor2) ? "bg-danger" : ""}`}>
              <div className="card-body">
                <h2 className="card-title">Humidity</h2>
                <p className="card-text" id="t2">
                  {sensorVals.sensor2.value !== null
                    ? `${sensorVals.sensor2.value} ${sensorVals.sensor2.unit}`
                    : "---"}
                </p>
                <p className="card-subtext">
                  <i className={`icon-${sensorVals.sensor2.icon}`}></i>
                </p>
                {checkThreshold(sensorVals.sensor2) && <p className="alert">Threshold breached!</p>}
              </div>
            </div>
          </div>

          {/* Air Quality Sensor */}
          <div className="col-md-3">
            <div className={`card mb-4 ${checkThreshold(sensorVals.sensor3) ? "bg-danger" : ""}`}>
              <div className="card-body">
                <h2 className="card-title">Air Quality</h2>
                <p className="card-text" id="t3">
                  {sensorVals.sensor3.value !== null
                    ? `${sensorVals.sensor3.value} ${sensorVals.sensor3.unit}`
                    : "---"}
                </p>
                <p className="card-subtext">
                  <i className={`icon-${sensorVals.sensor3.icon}`}></i>
                </p>
                {checkThreshold(sensorVals.sensor3) && <p className="alert">Threshold breached!</p>}
              </div>
            </div>
          </div>

          {/* Sound Sensor */}
          <div className="col-md-3">
            <div className={`card mb-4 ${checkThreshold(sensorVals.sensor4) ? "bg-danger" : ""}`}>
              <div className="card-body">
                <h2 className="card-title">Noise Level</h2>
                <p className="card-text" id="t4">
                  {sensorVals.sensor4.value !== null
                    ? `${sensorVals.sensor4.value} ${sensorVals.sensor4.unit}`
                    : "---"}
                </p>
                <p className="card-subtext">
                  <i className={`icon-${sensorVals.sensor4.icon}`}></i>
                </p>
                {checkThreshold(sensorVals.sensor4) && <p className="alert">Threshold breached!</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
