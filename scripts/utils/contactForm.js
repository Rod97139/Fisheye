export const displayModal = () => {
	const modal = document.querySelector('#contact_modal')
	if (modal) {
		modal.style.display = 'block'
		return modal
	}
    const newModal = document.createElement("div");
	newModal.id = "contact_modal";
	const modalContent = document.createElement("div");
	modalContent.classList.add("modal");
	const modalHeader = document.createElement("header");
	const modalTitle = document.createElement("h2");
	modalTitle.textContent = "Contactez-moi";
	const modalCloseBtn = document.createElement("img");
	modalCloseBtn.src = "assets/icons/close.svg";
	const modalForm = document.createElement("form");
	const modalFormDiv = document.createElement("div");
	const modalFormLabel = document.createElement("label");
	modalFormLabel.textContent = "Prénom";
	const modalFormInput = document.createElement("input");
	const modalFormButton = document.createElement("button");
	modalFormButton.classList.add("contact_button");
	modalFormButton.textContent = "Envoyer";

	newModal.appendChild(modalContent);
	modalContent.appendChild(modalHeader);
	modalHeader.appendChild(modalTitle);
	modalHeader.appendChild(modalCloseBtn);
	modalContent.appendChild(modalForm);
	modalForm.appendChild(modalFormDiv);
	modalFormDiv.appendChild(modalFormLabel);
	modalFormDiv.appendChild(modalFormInput);
	modalForm.appendChild(modalFormButton);
	const $main = document.querySelector("main");
	$main.prepend(newModal);
	
    return newModal
}
