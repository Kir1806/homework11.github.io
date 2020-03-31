class Card {
  constructor(name, link) {

  }

  createCard(nameValue, linkValue) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.insertAdjacentHTML('beforeend', `
    <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>
      </div>`);
    placeCard.querySelector(".place-card__name").textContent = nameValue;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${linkValue})`;
    return placeCard;
  }
}