

String data = "";
int sensorPin = 0; //IR Sensor

void setup() { 
	Serial.begin(9600);
	pinMode(10,OUTPUT);
 

}

void loop(){
  
  data = analogRead(sensorPin);
  Serial.println(data);
  //Serial.println("test");
}


  
