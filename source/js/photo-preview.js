const ACCEPTABLE_FILE_TYPES = ['image/jpeg', 'image/png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const photoFileChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo')

const onFileChooserChange = (preview) => {
  return (evt) => {
    const deafultPreview = preview.children[0];
    const file = evt.target.files[0];
    const fileType = file.type;
    const matched = ACCEPTABLE_FILE_TYPES.some((type) => {
      return fileType === type;
    });
    if (matched) {
      const reader = new FileReader();

      const onReaderLoad = () => {
        if (deafultPreview && deafultPreview.style.opacity !== '0') {
          deafultPreview.style.opacity = '0';
        }
        preview.style.backgroundSize = 'cover';
        preview.style.backgroundPosition = 'center';
        preview.style.backgroundImage = `url("${reader.result}")`;

        reader.removeEventListener('load', onReaderLoad);
      }

      reader.addEventListener('load', onReaderLoad);
      reader.readAsDataURL(file);
    }
    
  };
};

const resetPreview = (preview) => {
  if (preview.children[0]) {
    preview.children[0].style.opacity = '1';
  }

  if (preview.style.backgroundImage) {
    preview.style.backgroundImage = 'none';
  }
};

avatarFileChooser.addEventListener('change', onFileChooserChange(avatarPreview));
photoFileChooser.addEventListener('change', onFileChooserChange(photoPreview));

export { resetPreview, avatarPreview, photoPreview };