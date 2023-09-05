export const displayModal = () => {
    document.body.insertAdjacentHTML('beforeend', createModal());
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    return modal
}

export const createModal = () => {
    return`<div id="contact_modal">
			<div class="modal">
			<header>
                <h2>Contactez-moi</h2>
                <img src="assets/icons/close.svg" />
            </header>
				<form>
					<div>
						<label>Prénom</label>
						<input />
					</div>
                    <button class="contact_button">Envoyer</button>
				</form>
			</div>
		</div>`
}
