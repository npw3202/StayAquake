
int sensorPin  = 0;        // IR Sensor
int ledPin = 13;           // Visualization
int lastLevel = 0;         // Previous IR level
int lastChange = 0;        // Change in IR level
int changeThreshold = 2;   // How hard a rising edge

// visualization
int duration = 100;
float lastStart = 0;



void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int sensorValue = analogRead(sensorPin);Serial.println(sensorValue);  // Read Data
  // look for rising edges
  lastChange = sensorValue - lastLevel;
  lastLevel = sensorValue;
  if (lastChange >=changeThreshold) {
    digitalWrite(ledPin, HIGH);
    lastStart = millis();
  }
  if (millis() >= lastStart + duration) {
     digitalWrite(ledPin, LOW);
  }
}
