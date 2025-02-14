import { AdvertisementType } from "./buttons-advertisement-type.types";

let advertisementType: AdvertisementType = AdvertisementType.YOURSELF;

const buttonAdvertisementYourself = document.querySelector('#yourself') as HTMLButtonElement;
const buttonAdvertisementResale = document.querySelector('#resale') as HTMLButtonElement;
const buttonsAdvertisement = document.querySelector('#advertisement-buttons') as HTMLDivElement;

function updateButtons() {
  if (advertisementType === AdvertisementType.YOURSELF) {
    buttonAdvertisementYourself.classList.add("button-secondary");
    buttonAdvertisementYourself.classList.remove("button-outline");
    buttonAdvertisementResale.classList.add("button-outline");
    buttonAdvertisementResale.classList.remove("button-secondary");
  } else {
    buttonAdvertisementResale.classList.add("button-secondary");
    buttonAdvertisementResale.classList.remove("button-outline");
    buttonAdvertisementYourself.classList.add("button-outline");
    buttonAdvertisementYourself.classList.remove("button-secondary");
  }
}

buttonAdvertisementYourself.addEventListener("click", () => {
  advertisementType = AdvertisementType.YOURSELF;
  updateButtons();
});

buttonAdvertisementResale.addEventListener("click", () => {
  advertisementType = AdvertisementType.RESALE;
  updateButtons();
});

export { buttonAdvertisementYourself, buttonAdvertisementResale, buttonsAdvertisement, advertisementType };
