package edu.rit.croatia.swen383.g2.ws.sensor;

import edu.rit.marasovic.swen383.thirdparty.sensor.HumidityReader;

public class HumiditySensor implements Sensor {
    private HumidityReader humidityReader;

    public HumiditySensor(){
        this.humidityReader = new HumidityReader();
    }

    @Override
    public int read(){
        return humidityReader.get();
    }
}