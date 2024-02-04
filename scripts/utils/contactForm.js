export const displayModal = () => {
	const modal = document.querySelector('#contact_modal')
	if (modal) {
		modal.style.display = 'block'
		modal.setAttribute("aria-hidden", "false");
		return modal
	}
    const newModal = document.createElement("div");
	newModal.id = "contact_modal";
	newModal.classList.add("modal");
	newModal.setAttribute("role", "dialog");
	newModal.setAttribute("aria-hidden", "false");
	const modalContent = document.createElement("div");
	modalContent.classList.add("modal");
	const modalHeader = document.createElement("header");
	const modalTitle = document.createElement("h2");
	modalTitle.textContent = "Contactez-moi";
	const modalCloseBtn = document.createElement("img");
	modalCloseBtn.src = "assets/icons/close.svg";
	const modalForm = document.createElement("form");
	const modalFieldsetCoord = document.createElement("fieldset");
	const modalLegendCoord = document.createElement("legend");
	modalLegendCoord.textContent = "Vos Coordonnées";
	const modalFieldsetMessage = document.createElement("fieldset");
	const modalLegendMessage = document.createElement("legend");
	modalLegendMessage.textContent = "Votre Message";
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
	modalForm.appendChild(modalFieldsetCoord);
	modalForm.appendChild(modalFieldsetMessage);
	modalFieldsetMessage.appendChild(modalLegendMessage);
	modalFieldsetCoord.appendChild(modalFormLabel);
	modalFieldsetCoord.appendChild(modalFormInput);
	modalFieldsetCoord.appendChild(modalLegendCoord);
	modalForm.appendChild(modalFormButton);
	const $main = document.querySelector("main");
	$main.prepend(newModal);
	
    return newModal
}
