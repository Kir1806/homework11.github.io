
class CardList {

  constructor(container, initialCards, card, api) {
    this.container = container;
    this.initialCards = initialCards;
    this.card = card;
    this.api = api;    
  }

  changeCard(event) {

    if(event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    } else if(event.target.closest('.place-card__delete-icon')) {
      const cardSection = document.querySelector('.places-list.root__section');
      const placeCard = event.target.closest('.place-card');
      cardSection.removeChild(placeCard);
    }
  }

  addCard(name, link) {
    const cardElement = this.card.createCard(name, link);

    this.initialCards.push(cardElement);
    this.container.appendChild(cardElement);    
  }
/*
  render(initialCards) { 
    
    this.initialCards = initialCards;

    this.initialCards.forEach((item) => {    
      this.addCard(item.name, item.link);      
    });
  }
*/
  render() {// бывший getFirstCard
    this.api.getInitialCards()
    .then((cardData) =>{
      this.cardData = cardData;
      this.cardData.forEach((item) =>{
        this.addCard(item.name, item.link);
      });
    });
  }  
}

