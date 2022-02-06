export default function Modal() {
  const modalWrapper = document.querySelector(".modal-wrapper");
  const cancelButton = document.querySelector(".button.cancel");

  cancelButton.addEventListener("click", close);

  function open() {
    // adicionar classe active no modal
    modalWrapper.classList.add("active");
  }

  function close() {
    // remover classe active pra fechar o modal
    modalWrapper.classList.remove("active");
  }

  return {
    open,
    close,
  };
}
