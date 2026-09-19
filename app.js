"use strict";

const EVENTS = [
  {
    key: "gohan",
    icon: "🍚",
    label: "ごはん",
    title: "ごはんたべたわん",
    text: "おなかいっぱいになったわん。",
    image: null,
  },
  {
    key: "wanpro",
    icon: "💨",
    label: "わんぷろ",
    title: "わんぷろするわん",
    text: "どたどたどた！ げんきいっぱいわん。",
    image: null,
  },
  {
    key: "asobu",
    icon: "🧸",
    label: "あそぶ",
    title: "あそぶわん！",
    text: "まだまだあそべるわん！",
    image: null,
  },
  {
    key: "neko",
    icon: "🐈",
    label: "ねこさん",
    title: "ねこさんにおこられたわん…",
    text: "しばちゃん、ちょっとしょんぼりわん。",
    image: null,
  },
  {
    key: "oyatsu",
    icon: "🍠",
    label: "おやつ",
    title: "おやつくださいわん",
    text: "悲しかったので、おやつが必要わん。",
    image: null,
  },
  {
    key: "unchi",
    icon: "💩",
    label: "うんち",
    title: "うんちでるわん！",
    text: "いま大事なおしごとしてるわん。",
    image: null,
  },
  {
    key: "kimochii",
    icon: "✨",
    label: "すっきり",
    title: "きもちいーわん",
    text: "今日の大仕事、おわったわん。",
    image: null,
  },
  {
    key: "nenne",
    icon: "💤",
    label: "ねんね",
    title: "ねんねするわん",
    text: "すぴー……。起きたらまたごはんわん。",
    image: null,
  },
];

const clockFace = mustGetElement("clockFace");
const timeElement = mustGetElement("time");
const eventTitle = mustGetElement("eventTitle");
const eventText = mustGetElement("eventText");
const shibaPlaceholder = mustGetElement("shibaPlaceholder");
const shibaArt = mustGetElement("shibaArt");
const prevButton = mustGetElement("prevButton");
const nowButton = mustGetElement("nowButton");
const nextButton = mustGetElement("nextButton");

let previewIndex = null;

function mustGetElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Required element #${id} was not found.`);
  }
  return element;
}

function stageIndexForDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("stageIndexForDate requires a valid Date.");
  }

  const minutes = date.getHours() * 60 + date.getMinutes();
  const minutesPerStage = (24 * 60) / EVENTS.length;
  return Math.floor(minutes / minutesPerStage);
}

function renderClockItems() {
  clockFace.replaceChildren();

  EVENTS.forEach((event, index) => {
    const item = document.createElement("div");
    item.className = "clock-item";
    item.dataset.index = String(index);
    item.style.setProperty("--angle", `${index * (360 / EVENTS.length)}deg`);
    item.style.setProperty("--radius", "270px");

    const dot = document.createElement("div");
    dot.className = "clock-dot";
    dot.textContent = event.icon;

    const label = document.createElement("div");
    label.className = "clock-label";
    label.textContent = event.label;

    item.append(dot, label);
    clockFace.append(item);
  });
}

function renderStage(index, date) {
  if (!Number.isInteger(index) || index < 0 || index >= EVENTS.length) {
    throw new RangeError(`Stage index out of range: ${index}`);
  }

  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("renderStage requires a valid Date.");
  }

  const event = EVENTS[index];

  document.querySelectorAll(".clock-item").forEach((item) => {
    item.classList.toggle("active", Number(item.dataset.index) === index);
  });

  timeElement.textContent = date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });

  eventTitle.textContent = event.title;
  eventText.textContent = event.text;

  if (event.image) {
    shibaArt.src = event.image;
    shibaArt.alt = event.title;
    shibaArt.hidden = false;
    shibaPlaceholder.hidden = true;
  } else {
    shibaArt.removeAttribute("src");
    shibaArt.hidden = true;
    shibaPlaceholder.hidden = false;
    shibaPlaceholder.textContent = event.icon === "💩" ? "🐕💩" : "🐕";
  }
}

function renderNow() {
  const now = new Date();
  const index = previewIndex ?? stageIndexForDate(now);
  renderStage(index, now);
}

function movePreview(delta) {
  const now = new Date();
  const current = previewIndex ?? stageIndexForDate(now);
  previewIndex = (current + delta + EVENTS.length) % EVENTS.length;
  renderStage(previewIndex, now);
}

prevButton.addEventListener("click", () => movePreview(-1));
nextButton.addEventListener("click", () => movePreview(1));
nowButton.addEventListener("click", () => {
  previewIndex = null;
  renderNow();
});

renderClockItems();
renderNow();
setInterval(renderNow, 30_000);
