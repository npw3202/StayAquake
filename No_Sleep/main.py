import serial
import time
import requests
url = "http://52.23.180.124:8000"

arduino = serial.Serial('COM5', 9600, timeout=0)
while 1:
    try:
        line = arduino.readline().decode("utf-8")[:-1]
        # print(line[0])
        # if(line[0] == 't'):
            # print("fuck")
            # line = line[1:]
        print(line)
        r = requests.post(url,line)
        time.sleep(1)
    except Exception:
        print('Data could not be read')
        time.sleep(1)
