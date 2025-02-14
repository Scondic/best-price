import { buttonsState, state } from './core/buttons-state';
import { advertisementType, buttonsAdvertisement } from './core/buttons-advertisement-type';
import { Place, selectPlace } from './core/select-place';
import { Communication, selectCommunication } from './core/select-communication';
import { inputTitle } from "./core/input-title";
import { textareaDescription } from "./core/textarea-description";
import { inputPrice } from "./core/input-price";
import { inputVideo } from "./core/input-video";
import { inputPhone } from "./core/input-phone";
import { photos, uploadLabel } from "./core/input-file";
import { showErrors } from "./helpers/show-errors";
import { AdvertisementDto, AdvertisementDtoType } from "./helpers/adventsement-validation";

const buttonSend = document.querySelector('#send') as HTMLButtonElement;

document.addEventListener("DOMContentLoaded", () => {
  const selectWrappers = document.querySelectorAll(".select-wrapper");

  selectWrappers.forEach((wrapper) => {
    const select = wrapper.querySelector("select");

    select?.addEventListener("focus", () => {
      wrapper.classList.add("open");
    });

    select?.addEventListener("blur", () => {
      wrapper.classList.remove("open");
    });
  });
});

buttonSend.addEventListener("click", () => {
  const data: AdvertisementDtoType = {
    title: inputTitle.value,
    state: state,
    advertisementType: advertisementType,
    description: textareaDescription.value,
    price: Number(inputPrice.value),
    photos: photos.map(file => ({ file })),
    video: inputVideo.value,
    place: selectPlace.value as Place,
    phone: inputPhone.value,
    communication: selectCommunication.value as Communication,
  };

  const parse = AdvertisementDto.safeParse(data);

  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().title, element: inputTitle });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().state, element: buttonsState });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().advertisementType, element: buttonsAdvertisement });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().description, element: textareaDescription });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().price, element: inputPrice });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().photos, element: uploadLabel });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().video, element: inputVideo });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().place, element: selectPlace });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().phone, element: inputPhone });
  showErrors<AdvertisementDtoType>({ errors: parse.error?.format().communication, element: selectCommunication });


  if (parse.success) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('state', data.state);
    formData.append('advertisementType', data.advertisementType);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());

    const filesArray = photos.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));

    const filesBlob = new Blob([JSON.stringify(filesArray)], { type: "application/json" });

    formData.append("photos", filesBlob);

    formData.append('video', data.video);
    formData.append('place', data.place);
    formData.append('phone', data.phone);
    formData.append('communication', data.communication);

    console.log({ formData });
  } else {
    console.log(JSON.stringify(parse.error.format()));
  }
});
