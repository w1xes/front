import { COLORS } from "../components/constants";

const API_URL = import.meta.env.VITE_GAS_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error(
      "Не налаштовано URL GAS API. Вкажіть VITE_GAS_API_URL у файлі .env.local.",
    );
  }

  let url;
  try {
    url = new URL(API_URL);
  } catch {
    throw new Error("VITE_GAS_API_URL має бути коректною HTTPS-адресою, що закінчується на /exec.");
  }

  if (url.protocol !== "https:" || !url.pathname.endsWith("/exec")) {
    throw new Error("VITE_GAS_API_URL має бути коректною HTTPS-адресою, що закінчується на /exec.");
  }

  return url.toString();
}

async function parseEnvelope(response) {
  if (!response.ok) {
    throw new Error(`Помилка запиту до GAS (HTTP ${response.status}).`);
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error(
      "GAS повернув відповідь, яку неможливо прочитати як JSON.",
      { cause: error },
    );
  }

  if (!payload || typeof payload !== "object" || typeof payload.ok !== "boolean") {
    throw new Error("GAS повернув некоректну обгортку відповіді.");
  }

  if (!payload.ok) {
    const message =
      typeof payload.error?.message === "string"
        ? payload.error.message
        : "Не вдалося виконати запит до GAS.";
    throw new Error(message);
  }

  if (!payload.data || typeof payload.data !== "object") {
    throw new Error("GAS повернув некоректні дані.");
  }

  return payload.data;
}

function isTrafficLight(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    COLORS.includes(value.currentSignal)
  );
}

export async function listTrafficLights() {
  const url = new URL(getApiUrl());
  url.searchParams.set("action", "list");

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error("Не вдалося з'єднатися з GAS Web App.", { cause: error });
  }

  const data = await parseEnvelope(response);

  if (
    !Array.isArray(data.trafficLights) ||
    !data.trafficLights.every(isTrafficLight)
  ) {
    throw new Error("GAS повернув некоректну колекцію світлофорів.");
  }

  return data.trafficLights;
}

export async function updateTrafficLightState(id, currentSignal) {
  if (typeof id !== "string" || !id || !COLORS.includes(currentSignal)) {
    throw new Error("Потрібно вказати ідентифікатор світлофора та коректний сигнал.");
  }

  let response;
  try {
    response = await fetch(getApiUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "updateState",
        id,
        currentSignal,
      }),
    });
  } catch (error) {
    throw new Error("Не вдалося з'єднатися з GAS Web App.", { cause: error });
  }

  const data = await parseEnvelope(response);

  if (!isTrafficLight(data.trafficLight) || data.trafficLight.id !== id) {
    throw new Error("GAS повернув некоректний оновлений запис світлофора.");
  }

  return data.trafficLight;
}
