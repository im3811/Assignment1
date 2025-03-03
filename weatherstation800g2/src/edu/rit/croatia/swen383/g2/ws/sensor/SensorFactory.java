package edu.rit.croatia.swen383.g2.ws.sensor;

import edu.rit.croatia.swen383.g2.ws.util.SensorType;
import java.util.EnumMap;

public class SensorFactory {
  private final EnumMap<SensorType, Sensor> sensors;

  public SensorFactory() {
    sensors = new EnumMap<>(SensorType.class);
    createSensors();
  }

  private void createSensors() {
    sensors.put(SensorType.TEMPERATURE, new TemperatureSensor());
    sensors.put(SensorType.PRESSURE, new PressureSensor());
    sensors.put(SensorType.HUMIDITY, new HumiditySensor());
  }

  public Sensor getSensor(SensorType type) {
    return sensors.get(type);
  }
}
