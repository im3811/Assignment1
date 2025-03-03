
package edu.rit.croatia.swen383.g2.ws;
import java.util.EnumMap;
import java.util.Map;

import edu.rit.croatia.swen383.g2.ws.observer.Observer;
import edu.rit.croatia.swen383.g2.ws.sensor.Sensor;
import edu.rit.croatia.swen383.g2.ws.sensor.SensorFactory;
import edu.rit.croatia.swen383.g2.ws.ui.UIFactory;
import edu.rit.croatia.swen383.g2.ws.util.SensorType;

public class WeatherStationRunner {
  public static void main(String[] args) {

    SensorFactory sensorFactory = new SensorFactory();

    Map<SensorType, Sensor> sensorMap = new EnumMap<>(SensorType.class);

    for (SensorType type : SensorType.values()) {
      Sensor sensor = sensorFactory.getSensor(type);
      sensorMap.put(type, sensor);
    }

    WeatherStation station = new WeatherStation(sensorMap);

    UIFactory uiFactory = new UIFactory(station);

    Observer textUI = uiFactory.getUI("text");
    Observer swingUI = uiFactory.getUI("swing");
    Observer javafxUI = uiFactory.getUI("javafx");
    Observer statsUI = uiFactory.getUI("statistics");
    Observer forecastUI = uiFactory.getUI("forecast");

    station.attach(textUI);
    station.attach(swingUI);
    station.attach(javafxUI);
    station.attach(statsUI);
    station.attach(forecastUI);

    System.out.println(
        "\nStarting Weather Station with all UI components...\n");
    station.run();
  }
}