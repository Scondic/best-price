const inputPhoto = document.querySelector('#photo') as HTMLInputElement;
const previewContainer = document.querySelector(".advertisement-images") as HTMLDivElement;
const uploadLabel = document.querySelector(".file-upload") as HTMLLabelElement;

let photos: File[] = [];

inputPhoto.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement | null;
  if (!target || !target.files) return;

  const newFiles = Array.from(target.files);
  photos = [...photos, ...newFiles];

  newFiles.forEach((file, index) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result) return;

      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("advertisement-image-wrapper");

      const img = document.createElement("img");
      img.src = e.target.result as string;
      img.classList.add("advertisement-image");
      img.dataset.index = String(photos.length - newFiles.length + index);

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("advertisement-image-delete");
      deleteButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.854 12.1465C12.9005 12.193 12.9373 12.2481 12.9625 12.3088C12.9876 12.3695 13.0006 12.4346 13.0006 12.5003C13.0006 12.566 12.9876 12.631 12.9625 12.6917C12.9373 12.7524 12.9005 12.8076 12.854 12.854C12.8076 12.9005 12.7524 12.9373 12.6917 12.9625C12.631 12.9876 12.566 13.0006 12.5003 13.0006C12.4346 13.0006 12.3695 12.9876 12.3088 12.9625C12.2481 12.9373 12.193 12.9005 12.1465 12.854L8.00028 8.70715L3.85403 12.854C3.76021 12.9478 3.63296 13.0006 3.50028 13.0006C3.3676 13.0006 3.24035 12.9478 3.14653 12.854C3.05271 12.7602 3 12.633 3 12.5003C3 12.3676 3.05271 12.2403 3.14653 12.1465L7.2934 8.00028L3.14653 3.85403C3.05271 3.76021 3 3.63296 3 3.50028C3 3.3676 3.05271 3.24035 3.14653 3.14653C3.24035 3.05271 3.3676 3 3.50028 3C3.63296 3 3.76021 3.05271 3.85403 3.14653L8.00028 7.2934L12.1465 3.14653C12.2403 3.05271 12.3676 3 12.5003 3C12.633 3 12.7602 3.05271 12.854 3.14653C12.9478 3.24035 13.0006 3.3676 13.0006 3.50028C13.0006 3.63296 12.9478 3.76021 12.854 3.85403L8.70715 8.00028L12.854 12.1465Z" fill="#343330"/></svg>';

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(deleteButton);
      previewContainer.insertBefore(imgWrapper, uploadLabel);
    };

    reader.readAsDataURL(file);
  });

  target.value = "";
});

previewContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.closest(".advertisement-image-delete")) {
    const imgWrapper = target.closest(".advertisement-image-wrapper") as HTMLDivElement;
    if (!imgWrapper) return;

    const img = imgWrapper.querySelector(".advertisement-image") as HTMLImageElement;
    const index = img.dataset.index ? parseInt(img.dataset.index, 10) : -1;

    if (index !== -1) {
      photos.splice(index, 1);
    }

    imgWrapper.remove();

    const allImages = previewContainer.querySelectorAll(".advertisement-image");
    allImages.forEach((image, newIndex) => {
      (image as HTMLImageElement).dataset.index = String(newIndex);
    });
  }

});

export { inputPhoto, photos, uploadLabel };
