let listener = null;

export function useModal(onSubmit) {
  const dialog = document.querySelector("dialog");
  const button = document.querySelector("button");

  const handleClose = () => {
    dialog.close();
    if (listener) {
      removeEventListener("click", listener);
    }
  };

  button.onclick = () => {
    dialog.showModal();
    listener = document.querySelector("body").addEventListener("click", (e) => {
      if (e.target.id === "modal") {
        handleClose();
      }
    });
  };

  const closeButton = document.querySelector("#closeModalForm");

  closeButton.onclick = handleClose;

  const submitButton = document.querySelector("#submitModalForm");
  submitButton.onclick = (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    onSubmit(title, author, pages);
    document.querySelector("#modalForm").reset();
    dialog.close();
  };
}