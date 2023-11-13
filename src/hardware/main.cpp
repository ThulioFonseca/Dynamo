#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>
#include <FS.h>
#include <LittleFS.h>
#include <esp_chip_info.h>
#include <esp_cpu.h>
#include <esp_system.h>


// constantes
const int MAX_SENSOR_VALUE = 4095; // Valor máximo do sensor analógico
const int MIN_SENSOR_VALUE = 0;    // Valor mínimo do sensor analógico
const char *ssid = "CN THULIO";
const char *password = "Cn130987";
const int httpPort = 80;
const int wsPort = 1337;

IPAddress ip(192, 168, 0, 33);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);

AsyncWebServer server(httpPort);
WebSocketsServer webSocket = WebSocketsServer(wsPort);

struct Actuator
{
    String id;
    String label;
    int pin;
    float value;
    float minValue;
    float maxValue;
    String signalType;
    String type;
    String unit;
};

struct SensorData
{
    String id;
    String label;
    int pin;
    float value;
    float minValue;
    float maxValue;
    String signalType;
    String type;
    String unit;
};

Actuator actuators[] = {
    {"95bd32ab-2747-4ca9-b437-a7e11dac3d37", "Atuador", 2, 0, 0, 1, "digital", "output", "relay"},
    {"62fb3b2c-4c8b-48a6-aae8-e2df0724e37a", "Atuador", 4, 0, 0, 1, "digital", "output", "relay"},
    {"609ddb7e-16cf-4cbd-b15d-9faacbf75c9f", "Atuador", 16, 0, 0, 1, "digital", "output", "relay"},
    {"fbc41b78-37b4-4c3c-999a-1d338e371a78", "Atuador", 17, 0, 0, 1, "digital", "output", "relay"},
    {"baab0a7f-0fbd-48c2-a724-cc97e199f253", "Atuador", 18, 0, 0, 1, "digital", "output", "relay"},
    {"9b300e46-2246-4ac3-91f0-0f0c2cc27147", "Atuador", 19, 0, 0, 1, "digital", "output", "relay"},
    {"da105912-d5bf-45e2-8314-83b1fed8b42c", "Atuador", 21, 0, 0, 1, "digital", "output", "relay"},
    {"c3f7fc65-07c8-4cbc-a991-e8f455884792", "Atuador", 22, 0, 0, 1, "digital", "output", "relay"}

};

SensorData sensors[] = {
    {"1a216ff2-8882-420d-8900-3a9be632d3e5", "Sensor", 5, 0.0, 0.0, 1.0, "digital", "input", "relay"},
    {"ef147109-3386-4af5-8d48-a19a00ad8cef", "Sensor", 34, 0.0, 0.0, 1, "analog", "input", "%"}

};

void handleWebSocketMessage(uint8_t num, uint8_t *payload, size_t length)
{
    DynamicJsonDocument jsonBuffer(1024);
    deserializeJson(jsonBuffer, payload, length);
    JsonObject root = jsonBuffer.as<JsonObject>();

    if (root.containsKey("type"))
    {
        String messageType = root["type"];

        if (messageType == "controlEvent")
        {
            if (root.containsKey("id") && root.containsKey("value"))
            {
                String id = root["id"];
                int value = root["value"];

                for (int i = 0; i < sizeof(actuators) / sizeof(actuators[0]); i++)
                {
                    if (actuators[i].id == id)
                    {
                        int actuatorPin = actuators[i].pin;
                        if (actuators[i].value == 1)
                        {
                            if (actuatorPin != 2)
                            {
                                digitalWrite(actuatorPin, HIGH);
                                actuators[i].value = value;
                            }
                            else
                            {
                                digitalWrite(actuatorPin, LOW);
                                actuators[i].value = value;
                            }
                        }
                        else
                        {
                            if (actuatorPin != 2)
                            {
                                digitalWrite(actuatorPin, LOW);
                                actuators[i].value = value;
                            }
                            else
                            {
                                digitalWrite(actuatorPin, HIGH);
                                actuators[i].value = value;
                            }
                        }
                        break;
                    }
                }
            }
        }
        else
        {
            // Outro tipo de mensagem, trate de acordo com as necessidades
        }
    }
}

void handleIOStartup()
{
    for (int i = 0; i < sizeof(actuators) / sizeof(actuators[0]); i++)
    {
        int actuatorPin = actuators[i].pin;
        int actuatorValue = actuators[i].value;
        
        if (actuatorValue == 1)
        {
            digitalWrite(actuatorPin, (actuatorPin == 2) ? HIGH : LOW);
        }
        else
        {
            digitalWrite(actuatorPin, (actuatorPin == 2) ? LOW : HIGH);
        }
    }
}

void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
    switch (type)
    {
    case WStype_CONNECTED:
        Serial.printf("[%u] WebSocket client connected\n", num);
        break;
    case WStype_TEXT:
        handleWebSocketMessage(num, payload, length);
        break;
    case WStype_DISCONNECTED:
        Serial.printf("[%u] WebSocket client disconnected\n", num);
        break;
    }
}

void readSensorData()
{

    for (int i = 0; i < sizeof(sensors) / sizeof(sensors[0]); i++)
    {
        if (strcmp(sensors[i].signalType.c_str(), "analog") == 0)
        {

            int sensorPin = sensors[i].pin;
            int sensorValue = analogRead(sensorPin);
            sensors[i].value = map(sensorValue, MIN_SENSOR_VALUE, MAX_SENSOR_VALUE, sensors[i].minValue, sensors[i].maxValue);
        }
        else if (sensors[i].type == "digital")
        {
            int sensorPin = sensors[i].pin;
            int sensorValue = digitalRead(sensorPin);
            sensors[i].value = map(sensorValue, 0, 1, sensors[i].minValue, sensors[i].maxValue);
        }
    }
}

String createIODataJSON()
{
    DynamicJsonDocument jsonBuffer(2048);

    JsonArray IOArray = jsonBuffer.to<JsonArray>();

    for (int i = 0; i < sizeof(sensors) / sizeof(sensors[0]); i++)
    {
        JsonObject sensor = IOArray.createNestedObject();
        sensor["id"] = sensors[i].id;
        sensor["label"] = sensors[i].label;
        sensor["value"] = sensors[i].value;
        sensor["unit"] = sensors[i].unit;
        sensor["minValue"] = sensors[i].minValue;
        sensor["maxValue"] = sensors[i].maxValue;
    }

    for (int i = 0; i < sizeof(actuators) / sizeof(actuators[0]); i++)
    {
        JsonObject actuator = IOArray.createNestedObject();
        actuator["id"] = actuators[i].id;
        actuator["label"] = actuators[i].label;
        actuator["value"] = actuators[i].value;
        actuator["minValue"] = actuators[i].minValue;
        actuator["maxValue"] = actuators[i].maxValue;
    }
    String jsonStr;
    serializeJson(jsonBuffer, jsonStr);
    return jsonStr;
}

void sendIOData()
{
    String IODataJSON = createIODataJSON();
    webSocket.broadcastTXT(IODataJSON);
}

String handleDeviceRequest()
{
    StaticJsonDocument<3096> jsonResponse;

    JsonArray outputs = jsonResponse.createNestedArray("outputs");
    JsonArray inputs = jsonResponse.createNestedArray("inputs");

    for (const Actuator &actuator : actuators)
    {
        JsonObject output = outputs.createNestedObject();
        output["id"] = actuator.id;
        output["label"] = actuator.label;
        output["pin"] = actuator.pin;
        output["value"] = actuator.value;
        output["minValue"] = actuator.minValue;
        output["maxValue"] = actuator.maxValue;
        output["signalType"] = actuator.signalType;
        output["type"] = actuator.type;
        output["unit"] = actuator.unit;
    }

    for (const SensorData &sensor : sensors)
    {
        JsonObject input = inputs.createNestedObject();
        input["id"] = sensor.id;
        input["label"] = sensor.label;
        input["pin"] = sensor.pin;
        input["value"] = sensor.value;
        input["minValue"] = sensor.minValue;
        input["maxValue"] = sensor.maxValue;
        input["signalType"] = sensor.signalType;
        input["type"] = sensor.type;
        input["unit"] = sensor.unit;
    }

    String response;
    serializeJson(jsonResponse, response);
    return response;
}

void handleUpdateJsonFiles()
{
    if (LittleFS.begin())
    {
        // Atualize o arquivo sensors.json
        File sensorsFile = LittleFS.open("/sensors.json", "w");
        if (sensorsFile)
        {
            DynamicJsonDocument sensorsData(3096);

            for (int i = 0; i < sizeof(sensors) / sizeof(sensors[0]); i++)
            {
                JsonObject sensorData = sensorsData.createNestedObject(sensors[i].id);
                sensorData["pin"] = sensors[i].pin;
                sensorData["value"] = sensors[i].value;
                sensorData["minValue"] = sensors[i].minValue;
                sensorData["maxValue"] = sensors[i].maxValue;
                sensorData["signalType"] = sensors[i].signalType;
                sensorData["type"] = sensors[i].type;
                sensorData["unit"] = sensors[i].unit;
                sensorData["label"] = sensors[i].label;
            }

            serializeJson(sensorsData, sensorsFile);
            sensorsFile.close();
        }
        else
        {
            Serial.println("Failed to open sensors.json for writing.");
        }

        // Atualize o arquivo actuators.json
        File actuatorsFile = LittleFS.open("/actuators.json", "w");
        if (actuatorsFile)
        {
            DynamicJsonDocument actuatorsData(3096);

            for (int i = 0; i < sizeof(actuators) / sizeof(actuators[0]); i++)
            {
                JsonObject actuatorData = actuatorsData.createNestedObject(actuators[i].id);
                actuatorData["pin"] = actuators[i].pin;
                actuatorData["value"] = actuators[i].value;
                actuatorData["minValue"] = actuators[i].minValue;
                actuatorData["maxValue"] = actuators[i].maxValue;
                actuatorData["signalType"] = actuators[i].signalType;
                actuatorData["type"] = actuators[i].type;
                actuatorData["unit"] = actuators[i].unit;
                actuatorData["label"] = actuators[i].label;
            }

            serializeJson(actuatorsData, actuatorsFile);
            actuatorsFile.close();
        }
        else
        {
            Serial.println("Failed to open actuators.json for writing.");
        }
    }
}

boolean handleDeviceEdit(AsyncWebServerRequest *request, uint8_t *datas)
{

    StaticJsonDocument<1024> doc;
    DeserializationError error = deserializeJson(doc, datas);

    if (error)
    {
        Serial.print(error.f_str());
        return false;
    }

    String deviceId = doc["id"];

    for (int i = 0; i < sizeof(sensors) / sizeof(sensors[0]); i++)
    {
        if (sensors[i].id == deviceId)
        {
            String signal = doc["signalType"];
            String type = doc["type"];
            String unit = doc["unit"];
            String label = doc["label"];

            sensors[i].pin = doc["pin"];
            sensors[i].value = doc["value"];
            sensors[i].minValue = doc["minValue"];
            sensors[i].maxValue = doc["maxValue"];
            sensors[i].signalType = signal.c_str();
            sensors[i].type = type.c_str();
            sensors[i].unit = unit.c_str();
            sensors[i].label = label.c_str();
        }
    }

    for (int i = 0; i < sizeof(actuators) / sizeof(actuators[0]); i++)
    {
        if (actuators[i].id == deviceId)
        {
            String signal = doc["signalType"];
            String type = doc["type"];
            String unit = doc["unit"];
            String label = doc["label"];

            actuators[i].pin = doc["pin"];
            actuators[i].value = doc["value"];
            actuators[i].minValue = doc["minValue"];
            actuators[i].maxValue = doc["maxValue"];
            actuators[i].signalType = signal.c_str();
            actuators[i].type = type.c_str();
            actuators[i].label = label.c_str();
            actuators[i].unit = unit.c_str();
        }
    }

    handleUpdateJsonFiles();

    return true;
}

void Spinner(int counter) // Load Console Spinner
{
    switch (counter % 4)
    {
    case 0:
        Serial.print("/");
        break;
    case 1:
        Serial.print("-");
        break;
    case 2:
        Serial.print("\\");
        break;
    case 3:
        Serial.print("|");
        break;
    }
    delay(150);
    Serial.print("\b \b \b");
}

void setupCORS() // Configuração do cabeçalho CORS
{

    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
}

void setupActuators() // Configuração dos atuadores
{

    for (int i = 0; i < sizeof(actuators) / sizeof(actuators[0]); i++)
    {
        pinMode(actuators[i].pin, OUTPUT);
        digitalWrite(actuators[i].pin, LOW); // Defina o estado inicial como LOW
    }
}

void setupSensors() // Configuração dos sensores
{

    for (int i = 0; i < sizeof(sensors) / sizeof(sensors[0]); i++)
    {
        pinMode(sensors[i].pin, INPUT);
    }
}

String translateResetReason(esp_reset_reason_t reason) // Função para traduzir o motivo do reset
{
    switch (reason)
    {
    case ESP_RST_UNKNOWN:
        return "Razão do reset desconhecida";
    case ESP_RST_POWERON:
        return "Reset devido a evento de ligar";
    case ESP_RST_EXT:
        return "Reset por pino externo (não aplicável para ESP32)";
    case ESP_RST_SW:
        return "Reset de software via esp_restart";
    case ESP_RST_PANIC:
        return "Reset de software devido a exceção/panic";
    case ESP_RST_INT_WDT:
        return "Reset (software ou hardware) devido ao watchdog de interrupção";
    case ESP_RST_TASK_WDT:
        return "Reset devido ao watchdog de tarefa";
    case ESP_RST_WDT:
        return "Reset devido a outros watchdogs";
    case ESP_RST_DEEPSLEEP:
        return "Reset após sair do modo de deep sleep";
    case ESP_RST_BROWNOUT:
        return "Reset por brownout (software ou hardware)";
    case ESP_RST_SDIO:
        return "Reset sobre SDIO";
    default:
        return "Razão de reset não reconhecida";
    }
}

String translateChipModel(esp_chip_model_t model) // Função para traduzir o modelo do chip
{
    switch (model)
    {
    case CHIP_ESP32:
        return "ESP32";
    case CHIP_ESP32S2:
        return "ESP32-S2";
    case CHIP_ESP32S3:
        return "ESP32-S3";
    case CHIP_ESP32C3:
        return "ESP32-C3";
    case CHIP_ESP32H2:
        return "ESP32-H2";
    default:
        return "Modelo de chip não reconhecido";
    }
}

void handleDeviceInfo(AsyncWebServerRequest *request)
{
    DynamicJsonDocument jsonBuffer(1024);

    // Informações do Hardware
    esp_chip_info_t chipInfo;
    esp_chip_info(&chipInfo);


    jsonBuffer["chipId"] = ESP.getEfuseMac(); // Usando o MAC Address como ID do chip
    jsonBuffer["flashChipId"] = chipInfo.features;
    jsonBuffer["flashChipSize"] = ESP.getFlashChipSize();
     // Obter o modelo do chip
    esp_chip_model_t chipModel = chipInfo.model;
    String chipModelStr = translateChipModel(chipModel);

    jsonBuffer["chipModel"] = chipModelStr;
    jsonBuffer["chipRevision"] = chipInfo.revision;
    jsonBuffer["numCores"] = chipInfo.cores;

    // Informações do Sistema
    jsonBuffer["freeHeap"] = ESP.getFreeHeap();

      // Informações de conectividade
    jsonBuffer["ipAddress"] = WiFi.localIP().toString();
    jsonBuffer["macAddress"] = WiFi.macAddress();
    jsonBuffer["ssid"] = WiFi.SSID();
    jsonBuffer["rssi"] = WiFi.RSSI();
    jsonBuffer["cpuFrequency"] = ESP.getCpuFreqMHz();
    jsonBuffer["uptime"] = millis() / 1000; // Tempo de atividade em segundos

     // Obter o motivo do reset
    esp_reset_reason_t resetReason = esp_reset_reason();
    String resetReasonStr = translateResetReason(resetReason);
    jsonBuffer["resetReason"] = resetReasonStr;

    String jsonResponse;
    serializeJson(jsonBuffer, jsonResponse);

    request->send(200, "application/json", jsonResponse);
}

void setupWebServer() // Configuração do servidor web: http e websocket
{

    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(200, "text/plain", "Resposta para a requisição GET."); });

    server.on("/", HTTP_POST, [](AsyncWebServerRequest *request)
              { request->send(200, "text/plain", "Resposta para a requisição POST."); });

    server.on("/", HTTP_OPTIONS, [](AsyncWebServerRequest *request)
              { request->send(200, "text/plain", "Resposta para a requisição OPTIONS."); });

    server.on("/device", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(200, "text/plain", handleDeviceRequest()); });

    server.onRequestBody([](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total)
                         {
        if (request->url() == "/device/edit") {
            if (!handleDeviceEdit(request, data)) {
                request->send(500, "text/plain",  handleDeviceRequest());
            } else {
                request->send(200, "text/plain",  handleDeviceRequest());
            }
        } });

    server.on("/device", HTTP_OPTIONS, [](AsyncWebServerRequest *request)
              { request->send(200, "text/plain", "Resposta para a requisição OPTIONS."); });

    server.on("/info", HTTP_OPTIONS, [](AsyncWebServerRequest *request)
              { request->send(200, "text/plain", "Resposta para a requisição OPTIONS."); });

    server.on("/info", HTTP_GET, handleDeviceInfo);

    server.begin();
    webSocket.begin();
    webSocket.onEvent(onWebSocketEvent);

    Serial.println("WEB-Server..............: Running");
}

void setupNetwork() // Configuração da rede Wi-Fi
{
    int count = 0;

    Serial.println("\n");
    Serial.println("=====================[ Dynamo Control Unit ]=====================");
    Serial.println("\n");
    WiFi.begin(ssid, password); // Connect to the network
    WiFi.config(ip, gateway, subnet);
    Serial.print("Connecting to ");
    Serial.print(ssid);
    Serial.print(" ");

    while (WiFi.status() != WL_CONNECTED)
    { // Wait for the Wi-Fi to connect
        Spinner(count);
        count++;
    }
    Serial.print("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
    Serial.print("WLAN....................: ");
    Serial.println(ssid);
    Serial.print("IP address..............: ");
    Serial.println(WiFi.localIP());
}

void setupFileSystem() // Configuração e leitura de dados no sistema de arquivos
{
    if (LittleFS.begin())
    {
        Serial.println("LittleFS................: Running");

        File sensorsFile = LittleFS.open("/sensors.json", "r");
        if (sensorsFile)
        {
            size_t fileSize = sensorsFile.size();
            std::unique_ptr<char[]> buf(new char[fileSize]);
            sensorsFile.readBytes(buf.get(), fileSize);

            DynamicJsonDocument sensorsData(3096);
            deserializeJson(sensorsData, buf.get());

            // Atualize os dados dos sensores
            for (int i = 0; i < sizeof(sensors) / sizeof(sensors[0]); i++)
            {
                String id = sensors[i].id;
                if (sensorsData.containsKey(id))
                {
                    JsonObject sensorData = sensorsData[id];
                    sensors[i].pin = sensorData["pin"];
                    sensors[i].value = sensorData["value"];
                    sensors[i].minValue = sensorData["minValue"];
                    sensors[i].maxValue = sensorData["maxValue"];
                    sensors[i].signalType = sensorData["signalType"].as<String>();
                    sensors[i].type = sensorData["type"].as<String>();
                    sensors[i].unit = sensorData["unit"].as<String>();
                    sensors[i].label = sensorData["label"].as<String>();
                }
            }
            sensorsFile.close();
        }
        else
        {
            Serial.println("LittleFS................: Failed to open sensors.json for reading.");
        }

        // Carregue os dados dos atuadores
        File actuatorsFile = LittleFS.open("/actuators.json", "r");
        if (actuatorsFile)
        {
            size_t fileSize = actuatorsFile.size();
            std::unique_ptr<char[]> buf(new char[fileSize]);
            actuatorsFile.readBytes(buf.get(), fileSize);

            DynamicJsonDocument actuatorsData(3096);
            deserializeJson(actuatorsData, buf.get());

            // Atualize os dados dos atuadores
            for (int i = 0; i < sizeof(actuators) / sizeof(actuators[0]); i++)
            {
                String id = actuators[i].id;
                if (actuatorsData.containsKey(id))
                {
                    JsonObject actuatorData = actuatorsData[id];
                    actuators[i].pin = actuatorData["pin"];
                    actuators[i].value = actuatorData["value"];
                    actuators[i].minValue = actuatorData["minValue"];
                    actuators[i].maxValue = actuatorData["maxValue"];
                    actuators[i].signalType = actuatorData["signalType"].as<String>();
                    actuators[i].type = actuatorData["type"].as<String>();
                    actuators[i].unit = actuatorData["unit"].as<String>();
                    actuators[i].label = actuatorData["label"].as<String>();
                }
            }
            actuatorsFile.close();
        }
        else
        {
            Serial.println("LittleFS................: Failed to open actuators.json for reading.");
        }
    }
    else
    {
        Serial.println("LittleFS................: Failed to Start");
    }
}

void setup()
{

    Serial.begin(115200);

    setupNetwork();
    setupFileSystem();
    setupActuators();
    setupSensors();
    handleIOStartup();
    setupCORS();
    setupWebServer();
}

void loop()
{
    webSocket.loop();
    sendIOData();
    readSensorData();
    delay(250);
}
