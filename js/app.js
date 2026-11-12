// State
let cards = loadCards();
let currentIndex = 0;
let isFlipped = false;

// DOM Elements
const cardEl = document.getElementById("flashcard");
const questionEl = document.getElementById("card-question");
const answerEl = document.getElementById("card-answer");
const categoryBadge = document.getElementById("category-badge");
const deckCounter = document.getElementById("deck-counter");
const progressBar = document.getElementById("progress-bar");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const flipBtn = document.getElementById("flip-btn");
const shuffleBtn = document.getElementById("shuffle-btn");

// Modal Elements
const addCardBtn = document.getElementById("add-card-btn");
const modal = document.getElementById("card-modal");
const modalCancelBtn = document.getElementById("modal-cancel-btn");
const addCardForm = document.getElementById("add-card-form");

function renderCard() {
  if (cards.length === 0) {
    questionEl.textContent = "No cards available. Add one!";
    answerEl.textContent = "Click '+ Add Card' above.";
    categoryBadge.textContent = "Empty";
    deckCounter.textContent = "0 of 0";
    progressBar.style.width = "0%";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  // Reset flip before swapping text
  if (isFlipped) toggleFlip();

  const current = cards[currentIndex];
  questionEl.textContent = current.question;
  answerEl.textContent = current.answer;
  categoryBadge.textContent = current.category;
  deckCounter.textContent = `Card ${currentIndex + 1} of ${cards.length}`;

  // Update progress bar
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Update navigation button states
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;
}

function toggleFlip() {
  isFlipped = !isFlipped;
  cardEl.classList.toggle("is-flipped", isFlipped);
}

function nextCard() {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    renderCard();
  }
}

function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    renderCard();
  }
}

function shuffleDeck() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  currentIndex = 0;
  renderCard();
}

// Event Listeners
cardEl.addEventListener("click", toggleFlip);
flipBtn.addEventListener("click", toggleFlip);
nextBtn.addEventListener("click", nextCard);
prevBtn.addEventListener("click", prevCard);
shuffleBtn.addEventListener("click", shuffleDeck);

// Keyboard Navigation
window.addEventListener("keydown", (e) => {
  if (modal.open) return; // Ignore while typing in modal
  if (e.code === "Space") {
    e.preventDefault();
    toggleFlip();
  } else if (e.key === "ArrowRight") {
    nextCard();
  } else if (e.key === "ArrowLeft") {
    prevCard();
  }
});

// Modal Operations
addCardBtn.addEventListener("click", () => modal.showModal());
modalCancelBtn.addEventListener("click", () => modal.close());

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = {
    id: Date.now(),
    category: document.getElementById("input-category").value.trim(),
    question: document.getElementById("input-question").value.trim(),
    answer: document.getElementById("input-answer").value.trim(),
  };

  cards.push(newCard);
  saveCards(cards);

  addCardForm.reset();
  modal.close();
  currentIndex = cards.length - 1; // Jump to new card
  renderCard();
});

// Initial Render
renderCard();
