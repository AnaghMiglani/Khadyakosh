#include <DHT.h>
#include <LiquidCrystal_I2C.h>

#define DHTPIN 15
#define DHTTYPE DHT22
#define MQ135_PIN 4

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

  if (isnan(temp) || isnan(hum)) {
    Serial.println("Failed to read from DHT sensor!");
    lcd.setCursor(0, 0);
    lcd.print("DHT Read Error   ");
    delay(2000);
    return;
  }

  lcd.setCursor(0, 0);
  lcd.print("Temp:");
  lcd.print(temp, 1);
  lcd.print("C ");
  if (temp < 35) lcd.print("Low ");
  else if (temp > 65) lcd.print("High");
  else lcd.print("OK  ");

  lcd.setCursor(0, 1);
  lcd.print("Hum :");
  lcd.print(hum, 1);
  lcd.print("% ");
  if (hum < 40) lcd.print("Low ");
  else if (hum > 80) lcd.print("High");
  else lcd.print("OK  ");

  lcd.setCursor(0, 2);
  lcd.print("Gas :");
  lcd.print(gasVoltage, 2);
  lcd.print("V ");
  if (gasVoltage < 1.2) lcd.print("Low ");
  else if (gasVoltage > 2.2) lcd.print("High");
  else lcd.print("OK  ");

  lcd.setCursor(0, 3);
  if (
    temp < 35 || temp > 65 ||
    hum < 40 || hum > 80 ||
    gasVoltage > 2.5
  ) {
    lcd.print("Status: ALERT     ");
  } else {
    lcd.print("Status: OK        ");
  }

  Serial.print("Temp: "); Serial.print(temp);
  Serial.print(" °C, Hum: "); Serial.print(hum);
  Serial.print(" %, Gas: "); Serial.print(gasVoltage); Serial.println(" V");

  delay(3000);
}