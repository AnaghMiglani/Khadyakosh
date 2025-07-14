#include <DHT.h>
#include <LiquidCrystal_I2C.h>

#define DHTPIN 15
#define DHTTYPE DHT22
#define MQ135_PIN 4
#define SOIL_PIN 35
#define LDR_PIN 33

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() {
  Serial.begin(115200);
  dht.begin();
  delay(2000);

  lcd.init();
  lcd.backlight();

  lcd.setCursor(0, 0);
  lcd.print("Khadyakosh Ready");
  delay(1000);
  lcd.clear();
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int gasRaw = analogRead(MQ135_PIN);
  float gasVoltage = gasRaw * (3.3 / 4095.0);

  int soilValue = analogRead(SOIL_PIN); // Raw value: dry ~ 4095, wet ~ 0
  int ldrValue = analogRead(LDR_PIN);   // Higher means more light

  if (isnan(temp) || isnan(hum)) {
    Serial.println("Failed to read from DHT sensor!");
    lcd.setCursor(0, 0);
    lcd.print("DHT Read Error   ");
    delay(2000);
    return;
  }

  // Page 1: Temp + Hum
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("T:"); lcd.print(temp, 1); lcd.print("C ");
  if (temp < 35) lcd.print("L");
  else if (temp > 65) lcd.print("H");
  else lcd.print("OK");

  lcd.setCursor(0, 1);
  lcd.print("H:"); lcd.print(hum, 1); lcd.print("% ");
  if (hum < 40) lcd.print("L");
  else if (hum > 80) lcd.print("H");
  else lcd.print("OK");

  delay(2000);

  // Page 2: Gas + Soil
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Gas:"); lcd.print(gasVoltage, 2); lcd.print("V ");
  if (gasVoltage < 1.2) lcd.print("L");
  else if (gasVoltage > 2.2) lcd.print("H");
  else lcd.print("OK");

  lcd.setCursor(0, 1);
  lcd.print("Soil:");
  if (soilValue < 1500) lcd.print("Wet ");
  else if (soilValue > 3000) lcd.print("Dry ");
  else lcd.print("Moist");

  delay(2000);

  // Page 3: LDR + Status
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Light:");
  if (ldrValue < 1000) lcd.print("Dark");
  else if (ldrValue > 3000) lcd.print("Bright");
  else lcd.print("Normal");

  lcd.setCursor(0, 1);
  if (
    temp < 35 || temp > 65 ||
    hum < 40 || hum > 80 ||
    gasVoltage > 2.5 ||
    soilValue > 3000
  ) {
    lcd.print("Status: ALERT  ");
  } else {
    lcd.print("Status: OK     ");
  }

  Serial.print("Temp: "); Serial.print(temp);
  Serial.print(" C, Hum: "); Serial.print(hum);
  Serial.print(" %, Gas: "); Serial.print(gasVoltage); Serial.print(" V");
  Serial.print(", Soil: "); Serial.print(soilValue);
  Serial.print(", Light: "); Serial.println(ldrValue);

  delay(2000);
}
