const STORAGE_KEY = "devcards_deck";

const DEFAULT_CARDS = [
  {
    id: 1,
    category: "C++",
    question:
      "What is the difference between a pointer and a reference in C++?",
    answer:
      "A pointer stores a memory address and can be null or reassigned. A reference is an alias to an existing variable and cannot be null or rebound.",
  },
  {
    id: 2,
    category: "Git",
    question: "What does 'git rm --cached <file>' do?",
    answer:
      "It removes the file from Git's tracking index while leaving the file intact in your local working directory.",
  },
  {
    id: 3,
    category: "JavaScript",
    question: "What is event delegation?",
    answer:
      "Attaching a single event listener to a parent element to handle events triggered by its current or future children via event bubbling.",
  },
  {
    id: 4,
    category: "CSS",
    question: "What does 'transform-style: preserve-3d' do?",
    answer:
      "It indicates that the children of an element should be positioned in 3D space rather than flattened into the plane of the element.",
  },
];

function loadCards() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    saveCards(DEFAULT_CARDS);
    return DEFAULT_CARDS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse local storage, resetting to defaults", e);
    return DEFAULT_CARDS;
  }
}

function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}
