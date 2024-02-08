export const displayModal = () => {
	const modal = document.querySelector('#contact_modal')
	if (modal) {
		modal.style.display = 'block'
		modal.setAttribute("aria-hidden", "false");
		return modal
	}

	const contactArray = {
		"Prénom": "firstname",
		"Nom": "lastname",
		"Email": "email",
		"Votre message": "message"
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

	/* form */
	const modalForm = document.createElement("form");

	const contactArrayKeys = Object.keys(contactArray);
	console.log(Object.keys(contactArray).length, "contactArray length");

	for (let i = 0; i < contactArrayKeys.length; i++) {
		const key = contactArrayKeys[i];
		const value = contactArray[key];
		console.log(value,key, "element");

		const modalFormLabel = document.createElement("label");
		modalFormLabel.textContent = key;
		modalFormLabel.htmlFor = value;

		const modalFormInput = document.createElement("input");
		modalFormInput.id = value;
		modalFormInput.name = value;
		if (value === "message") {

			const modalFormTextArea = document.createElement("textarea");
			modalFormTextArea.id = value;
			modalFormTextArea.name = value;
			modalForm.appendChild(modalFormLabel);
			modalForm.appendChild(modalFormTextArea);
			
		} else if (value === "email") {
			modalFormInput.type = "email";
			
			modalForm.appendChild(modalFormLabel);
			modalForm.appendChild(modalFormInput);
		} else {
			modalFormInput.type = "text";
			
			
			modalForm.appendChild(modalFormLabel);
			modalForm.appendChild(modalFormInput);
			
			
		}
		
		
	}



	const modalFormButton = document.createElement("button");
	modalFormButton.classList.add("contact_button");
	modalFormButton.textContent = "Envoyer";

	newModal.appendChild(modalContent);
	modalContent.appendChild(modalHeader);
	modalHeader.appendChild(modalTitle);
	modalHeader.appendChild(modalCloseBtn);
	modalContent.appendChild(modalForm);
	modalForm.appendChild(modalFormButton);
	const $main = document.querySelector("main");
	$main.prepend(newModal);
	
    return newModal
}

export const checkName = (name) => {
	const nameRegex = /^[A-Za-z][A-Za-z\é\è\ê\-]+$/;
	const nameTest = nameRegex.test(name);
	return nameTest;
  }
  
export const checkEmail = () => {
	const email = document.getElementById("email").value;
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	const emailTest = emailRegex.test(email);
	return emailTest;
  }
