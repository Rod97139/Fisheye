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
	modalForm.name = "contact";
	modalForm.action = "";
	modalForm.method = "post";

	const contactArrayKeys = Object.keys(contactArray);
	console.log(Object.keys(contactArray).length, "contactArray length");

	for (let i = 0; i < contactArrayKeys.length; i++) {
		const key = contactArrayKeys[i];
		const value = contactArray[key];
		console.log(value,key, "element");

		const modalFormLabel = document.createElement("label");
		modalFormLabel.textContent = key;
		modalFormLabel.htmlFor = value;

		let modalFormInput;
		
		
		if (value === "message") {
			modalFormInput = document.createElement("textarea");
			
		} else if (value === "email") {
			modalFormInput = document.createElement("input");
			modalFormInput.type = "email";
		} else {
			modalFormInput = document.createElement("input");
			modalFormInput.type = "text";
		}
		
		modalFormInput.id = value;
		modalFormInput.name = value;
		const formData = document.createElement("div");
		formData.classList.add("formData");
		formData.appendChild(modalFormLabel);
		formData.appendChild(modalFormInput);
		modalForm.appendChild(formData);
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
	formEvents();
	
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
  // Verifier le champ du formulaire avec en argument l'input
export const checkInput = (input) => {
    let errorMessage = '';
    const inputContainer = input.parentElement;
  
    // Verifier si le champ est vide
  if (!input.value.trim()) {
    errorMessage = "Veuillez renseigner ce champ";
    //return
    // Si il n'est pas vide, verifier si le format est correct en fonction de l'id de l'input
  } else {

    switch (input.id) {
      case "firstname":
      case "lastname":
        errorMessage = checkName(input.value) ? "" : "Veuillez entrer au moins 2 caractères valides";
        break;
      case "email":
        errorMessage = checkEmail() ? "" : "Veuillez entrer une adresse email valide";
        break;
      case "message":
		errorMessage = checkName(input.value) ? "" : "Veuillez entrer au moins 2 caractères valides";
        break;
    }
  }
  inputContainer.dataset.error = errorMessage;
  inputContainer.dataset.errorVisible = (!!errorMessage).toString();
}


export const formEvents = () => {
	const contactForm = document.querySelector("form[name='contact']");

	contactForm.addEventListener("blur", e => checkInput(e.target), true);
  }
