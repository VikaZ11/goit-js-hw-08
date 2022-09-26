import throttle from 'lodash.throttle';
import storage from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

initPage();

const onFormInput = event => {
  const { name, value } = event.target;
  let saveData = storage.load(LOCAL_STORAGE_KEY);
  saveData = saveData ? saveData : {};

  saveData[name] = value;

  storage.save(LOCAL_STORAGE_KEY, saveData);
};

const throttleOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttleOnFormInput);

function initPage() {
  const saveData = storage.load(LOCAL_STORAGE_KEY);

  if (!saveData) {
    return;
  }

  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

const handleSubmit = event => {
  event.preventDefault();

  event.currentTarget.reset();
  storage.remove(LOCAL_STORAGE_KEY);
};

formRef.addEventListener('submit', handleSubmit);
