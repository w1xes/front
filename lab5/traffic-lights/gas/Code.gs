const SHEET_NAME = "TRAFFIC_LIGHTS";
const VALID_SIGNALS = ["red", "yellow", "green"];

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonOk_(data) {
  return json_({
    ok: true,
    data: data,
    error: null,
  });
}

function jsonError_(code, message) {
  return json_({
    ok: false,
    data: null,
    error: {
      code: code,
      message: message,
    },
  });
}

function getTrafficLightsSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties()
    .getProperty("DB_SPREADSHEET_ID");

  if (!spreadsheetId) {
    throw new Error("Не налаштовано властивість DB_SPREADSHEET_ID.");
  }

  const sheet = SpreadsheetApp.openById(spreadsheetId)
    .getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error("Аркуш TRAFFIC_LIGHTS не знайдено.");
  }

  return sheet;
}

function listTrafficLights_() {
  const sheet = getTrafficLightsSheet_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  return sheet.getRange(2, 1, lastRow - 1, 2).getValues()
    .filter(function (row) {
      return row[0] !== "" || row[1] !== "";
    })
    .map(function (row) {
      const id = String(row[0]).trim();
      const currentSignal = String(row[1]).trim();

      if (!id || VALID_SIGNALS.indexOf(currentSignal) === -1) {
        throw new Error("Аркуш TRAFFIC_LIGHTS містить некоректний запис.");
      }

      return {
        id: id,
        currentSignal: currentSignal,
      };
    });
}

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : null;

  if (action !== "list") {
    return jsonError_("unknown_action", "Непідтримувана дія.");
  }

  try {
    return jsonOk_({
      trafficLights: listTrafficLights_(),
    });
  } catch (error) {
    return jsonError_("storage_error", error.message || "Помилка читання сховища.");
  }
}

function doPost(e) {
  let command;

  try {
    command = JSON.parse(e && e.postData ? e.postData.contents : "{}");
  } catch (error) {
    return jsonError_("bad_request", "Тіло запиту має містити коректний JSON.");
  }

  if (!command || command.action !== "updateState") {
    return jsonError_("unknown_action", "Непідтримувана дія.");
  }

  if (typeof command.id !== "string" || !command.id.trim()) {
    return jsonError_("bad_request", "Потрібно вказати ідентифікатор світлофора.");
  }

  if (VALID_SIGNALS.indexOf(command.currentSignal) === -1) {
    return jsonError_("invalid_signal", "Непідтримуваний сигнал світлофора.");
  }

  try {
    const sheet = getTrafficLightsSheet_();
    const lastRow = sheet.getLastRow();

    if (lastRow < 2) {
      return jsonError_("not_found", "Світлофор не знайдено.");
    }

    const records = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
    const rowIndex = records.findIndex(function (row) {
      return String(row[0]).trim() === command.id.trim();
    });

    if (rowIndex === -1) {
      return jsonError_("not_found", "Світлофор не знайдено.");
    }

    const sheetRow = rowIndex + 2;
    sheet.getRange(sheetRow, 2).setValue(command.currentSignal);
    SpreadsheetApp.flush();

    return jsonOk_({
      trafficLight: {
        id: command.id.trim(),
        currentSignal: command.currentSignal,
      },
    });
  } catch (error) {
    return jsonError_("storage_error", error.message || "Помилка оновлення сховища.");
  }
}
