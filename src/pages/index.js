import './index.css'
import { selectors, popupProfileOpenButton, popupElementOpenButton,
formProfile, formAddCard, elementsList, nameInput, jobInput, formAvatar, avatarImage } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

let userId

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, elemList]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    elemList.reverse().forEach((data) => {
      cardsList.addItem(data);
    });
  })
  .catch((err) => console.log(err))

//Создаем экземпляр класса для каждой формы
const profileFormValidator = new FormValidator(selectors, formProfile);
const addCardFormValidator = new FormValidator(selectors, formAddCard);
const editAvatarFormValidator = new FormValidator(selectors, formAvatar);

//Включаем валидацию форм
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

//Попап с картинкой
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

//Разметка начальных карточек
const cardsList = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(item, '.element-template', {
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
      handleDeleteClick: (id) => {
        popupDeleteCard.open();
        popupDeleteCard.changeSubmitHandler(() => {
          api.deleteCard(id)
            .then(() => {
              card.deleteAddedCard();
              popupDeleteCard.close();
            })
            .catch((err) => console.log(err))
        })
      },
      handleLikeClick: (id) => {
        if(card.isLiked()) {
          api.deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(err))
        } else {
          api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(err))
        }
      }
    }, userId);
    const cardElement = card.generateCard();
    return cardElement;
  }
}, elementsList);

cardsList.renderItems();

//Попап добавления карточек
const popupAddCard = new PopupWithForm('.popup_type_add', {
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true);
    const {name, link} = data;
    api.addCard(name, link)
      .then((res) => {
        cardsList.addItem(res);
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddCard.renderLoading(false))
    popupAddCard.close();
  }
});

popupElementOpenButton.addEventListener('click', () => {
  popupAddCard.open();
  addCardFormValidator.resetValidation();
});
popupAddCard.setEventListeners();

//Попап удаления карточки
const popupDeleteCard = new PopupWithForm('.popup_type_delete', {});
popupDeleteCard.setEventListeners();

const userInfo = new UserInfo({
  name: '.profile__title',
  job: '.profile__caption',
  avatar: '.profile__image'
});

//Попап редактирования аватара
const popupAvatar = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data) => {
    popupAvatar.renderLoading(true);
    const {avatar} = data;
    api.editAvatar(avatar)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAvatar.renderLoading(false))
  }
});

avatarImage.addEventListener('click', () => {
  popupAvatar.open();
  editAvatarFormValidator.resetValidation();
})

popupAvatar.setEventListeners();

//Попап редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_type_edit', {
  handleFormSubmit: (data) => {
    popupEditProfile.renderLoading(true);
    const {name, about} = data;
    api.editProfile(name, about)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
     })
     .catch((err) => console.log(err))
     .finally(() => popupEditProfile.renderLoading(false))
    }
});

popupProfileOpenButton.addEventListener('click', () => {
  popupEditProfile.open();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;

  profileFormValidator.resetValidation();
});
popupEditProfile.setEventListeners();
