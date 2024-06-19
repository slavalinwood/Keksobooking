const ACCEPTABLE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').children[0];
const photoFileChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo')

const avatarChange = (preview, reader) => {
  preview.src = reader.result;
};

const photoChange = (preview, reader) => {
  preview.style.backgroundImage = `url("${reader.result}")`;
  preview.style.backgroundSize = 'cover';
  preview.style.backgroundPosition = 'center';
} ;

const onFileChooserChange = (preview, cb) => {
  return (evt) => {
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();
    const matched = ACCEPTABLE_FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matched) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        cb(preview, reader);
      });

      reader.readAsDataURL(file);
    }
    
  };
};

avatarFileChooser.addEventListener('change', onFileChooserChange(avatarPreview, avatarChange));
photoFileChooser.addEventListener('change', onFileChooserChange(photoPreview, photoChange));