// Client Management System

class ClientManager {
    constructor() {
        this.clients = [];
        this.initEventListeners();
    }

    initEventListeners() {
        const optionsLinks = document.querySelectorAll('#options a');
        const modal = document.getElementById('modal');
        const closeButton = document.querySelector('.close-button');

        optionsLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const action = event.target.dataset.action;
                this.displayContent(action);
            });
        });

        // Close modal when close button is clicked
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeModal();
            }
        });
    }

    displayContent(action) {
        const contentSection = document.getElementById('content');
        const modalBody = document.getElementById('modal-body');

        switch (action) {
            case 'registrar':
                this.showRegistrationForm();
                break;
            case 'consultar':
                this.showClientList();
                break;
            case 'actualizar':
                this.showUpdateForm();
                break;
            case 'desactivar':
                this.showDeactivationForm();
                break;
            default:
                contentSection.innerHTML = `
                    <h2>Opción no válida</h2>
                    <p>Por favor, selecciona una opción válida.</p>
                `;
        }
    }

    showRegistrationForm() {
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>Registrar Nuevo Cliente</h2>
            <form id="registration-form">
                <div class="form-group">
                    <label for="name">Nombre Completo:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Teléfono:</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <button type="submit">Registrar Cliente</button>
            </form>
        `;
        this.openModal();

        const form = document.getElementById('registration-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.registerClient(form);
        });
    }

    registerClient(form) {
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const newClient = {
            id: this.clients.length + 1,
            name,
            email,
            phone,
            active: true
        };

        this.clients.push(newClient);
        this.showAlert('Cliente registrado con éxito', 'success');
        this.closeModal();
        console.log('Clients:', this.clients);
    }

    showClientList() {
        const contentSection = document.getElementById('content');
        
        if (this.clients.length === 0) {
            contentSection.innerHTML = `
                <h2>Consultar Clientes</h2>
                <p>No hay clientes registrados.</p>
            `;
            return;
        }

        const clientTable = `
            <h2>Clientes Registrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>CEDULA</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.clients.map(client => `
                        <tr>
                            <td>${client.id}</td>
                            <td>${client.name}</td>
                            <td>${client.email}</td>
                            <td>${client.phone}</td>
                            <td>${client.active ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        contentSection.innerHTML = clientTable;
    }

    showUpdateForm() {
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>Actualizar Cliente</h2>
            <form id="update-form">
                <div class="form-group">
                    <label for="client-id">ID del Cliente:</label>
                    <input type="number" id="client-id" name="client-id" required>
                </div>
                <div class="form-group">
                    <label for="name">Nombre Completo:</label>
                    <input type="text" id="name" name="name">
                </div>
                <div class="form-group">
                    <label for="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="form-group">
                    <label for="phone">Teléfono:</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <button type="submit">Actualizar Cliente</button>
            </form>
        `;
        this.openModal();

        const form = document.getElementById('update-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateClient(form);
        });
    }

    updateClient(form) {
        const clientId = parseInt(form['client-id'].value);
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const clientIndex = this.clients.findIndex(client => client.id === clientId);

        if (clientIndex === -1) {
            this.showAlert('Cliente no encontrado', 'error');
            return;
        }

        // Update only provided fields
        if (name) this.clients[clientIndex].name = name;
        if (email) this.clients[clientIndex].email = email;
        if (phone) this.clients[clientIndex].phone = phone;

        this.showAlert('Cliente actualizado con éxito', 'success');
        this.closeModal();
        console.log('Updated Clients:', this.clients);
    }

    showDeactivationForm() {
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>Desactivar Cliente</h2>
            <form id="deactivation-form">
                <div class="form-group">
                    <label for="client-id">ID del Cliente:</label>
                    <input type="number" id="client-id" name="client-id" required>
                </div>
                <button type="submit">Desactivar Cliente</button>
            </form>
        `;
        this.openModal();

        const form = document.getElementById('deactivation-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.deactivateClient(form);
        });
    }

    deactivateClient(form) {
        const clientId = parseInt(form['client-id'].value);
        const clientIndex = this.clients.findIndex(client => client.id === clientId);

        if (clientIndex === -1) {
            this.showAlert('Cliente no encontrado', 'error');
            return;
        }

        this.clients[clientIndex].active = false;
        this.showAlert('Cliente desactivado con éxito', 'success');
        this.closeModal();
        console.log('Updated Clients:', this.clients);
    }

    openModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }

    showAlert(message, type) {
        const alertContainer = document.createElement('div');
        alertContainer.classList.add('alert', `alert-${type}`);
        alertContainer.textContent = message;
        
        document.body.appendChild(alertContainer);

        // Remove alert after 3 seconds
        setTimeout(() => {
            document.body.removeChild(alertContainer);
        }, 3000);
    }
}

// Initialize the client manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.clientManager = new ClientManager();
});

