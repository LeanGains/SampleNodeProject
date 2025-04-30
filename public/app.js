document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    // Fetch and display users
    function fetchUsers() {
        fetch('/api/users')
            .then(response => response.json())
            .then(users => {
                userList.innerHTML = '';
                users.forEach(user => {
                    const userElement = document.createElement('div');
                    userElement.className = 'user-item';
                    userElement.innerHTML = `
                        <span>${user.name} (${user.email})</span>
                        <button onclick="updateUser('${user.id}')">Update</button>
                        <button onclick="deleteUser('${user.id}')">Delete</button>
                    `;
                    userList.appendChild(userElement);
                });
            });
    }

    // Add user
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
        .then(() => {
            fetchUsers();
            userForm.reset();
        });
    });

    // Update user
    window.updateUser = (id) => {
        const name = prompt('Enter new name:');
        const email = prompt('Enter new email:');
        if (name && email) {
            fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            })
            .then(() => fetchUsers());
        }
    };

    // Delete user
    window.deleteUser = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            fetch(`/api/users/${id}`, {
                method: 'DELETE',
            })
            .then(() => fetchUsers());
        }
    };

    // Initial fetch
    fetchUsers();
});