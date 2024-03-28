const openMenuBtn = document.querySelector(".open-menu-header-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuBtn = document.querySelector(".modal-btn");
const mainBtn = document.querySelector(".main-btn");
const modalWindow = document.querySelector(".backdrop");
const modalBtn = document.querySelector(".modal > .modal-btn");
const modalForm = document.querySelector(".modal-form");
const modalSendBtn = document.querySelector(".modal-send-btn");
const modalCheckBox = document.querySelector("form .input-check");
const USER_STORAGE_KEY = "userData";
const MODAL_STORAGE_KEY = "isModalOpen";

openMenuBtn.addEventListener("click", onOpenMenuBtnClick);
mainBtn.addEventListener("click", onMainBtnClick);
modalSendBtn.disabled = true;

function onOpenMenuBtnClick() {
  mobileMenu.classList.add("is-open");

  mobileMenuBtn.addEventListener("click", onMobileMenuBtnClick);
}

function onMobileMenuBtnClick() {
  mobileMenu.classList.remove("is-open");
  mobileMenuBtn.removeEventListener("click", onMobileMenuBtnClick);
}

function onMainBtnClick() {
  modalWindow.classList.add("is-open");
  modalBtn.addEventListener("click", omModalBtnClick);
  localStorage.setItem(MODAL_STORAGE_KEY, "true");
}
function omModalBtnClick() {
  modalWindow.classList.remove("is-open");

  modalBtn.removeEventListener("click", omModalBtnClick);
  localStorage.removeItem(MODAL_STORAGE_KEY);
}

modalForm.addEventListener("input", onAddEventListenerInput);

function onAddEventListenerInput(evt) {
  const formData = {
    name: modalForm.elements.name.value.trim(),
    phone: modalForm.elements.phone.value.trim(),
    email: modalForm.elements.email.value.trim(),
    comment: modalForm.elements.comment.value.trim(),
  };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(formData));
}

function restoreData() {
  const savedUserData = localStorage.getItem(USER_STORAGE_KEY) || "{}";
  const parsedUserData = JSON.parse(savedUserData);

  const formDataKeys = Object.keys(parsedUserData);
  for (const key of formDataKeys) {
    modalForm.elements[key].value = parsedUserData[key] || "";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const modalState = localStorage.getItem(MODAL_STORAGE_KEY);
  if (modalState === "true") {
    onMainBtnClick();
  }
});
restoreData();

modalForm.addEventListener("submit", onModalFormSubmit);
function onModalFormSubmit(evt) {
  evt.preventDefault();
  modalSendBtn.disabled = true;
  localStorage.removeItem(USER_STORAGE_KEY);
  modalForm.reset();
}

modalCheckBox.addEventListener("click", checkAgreementCheckbox);

function checkAgreementCheckbox() {
  modalSendBtn.disabled = !modalCheckBox.checked;
}
