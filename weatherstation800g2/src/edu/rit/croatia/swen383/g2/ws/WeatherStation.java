package edu.rit.croatia.swen383.g2.ws;
import java.util.EnumMap;
import java.util.Map;
import edu.rit.croatia.swen383.g2.ws.util.MeasurementUnit;
import edu.rit.croatia.swen383.g2.ws.observer.Subject;
import edu.rit.croatia.swen383.g2.ws.sensor.Sensor;
import edu.rit.croatia.swen383.g2.ws.sensor.SensorFactory;
import edu.rit.croatia.swen383.g2.ws.util.SensorType;

public class WeatherStation extends Subject {
    private final EnumMap<MeasurementUnit, Double> readingMap;
    private final Map<SensorType, Sensor> sensorMap;
    private static final long PERIOD = 1000;

    public WeatherStation(Map<SensorType, Sensor> sensorMap) {
            this.readingMap = new EnumMap<>(MeasurementUnit.class);
            this.sensorMap = sensorMap;
    }

    private void getSensorReadings() {
        int tempVal = sensorMap.get(SensorType.TEMPERATURE).read();
        int pressureVal = sensorMap.get(SensorType.PRESSURE).read();
        
        readingMap.put(MeasurementUnit.CELSIUS,MeasurementUnit.CELSIUS.get(tempVal));
        readingMap.put(MeasurementUnit.KELVIN, MeasurementUnit.KELVIN.get(tempVal));
        readingMap.put(MeasurementUnit.FAHRENHEIT, MeasurementUnit.FAHRENHEIT.get(tempVal));


        readingMap.put(MeasurementUnit.MBAR, MeasurementUnit.MBAR.get(pressureVal));
        readingMap.put(MeasurementUnit.INHG, MeasurementUnit.INHG.get(pressureVal));
    }

    public double getReading(MeasurementUnit unit) {
        return readingMap.getOrDefault(unit, 0.0);
    }

    public void run() {
        while (true) {
            try {
                getSensorReadings();
                notifyObservers();
                Thread.sleep(PERIOD);
            } catch (InterruptedException e) {
                System.err.println("Weather station monitoring interrupted!");
                break;
            }
        }
    }
}
