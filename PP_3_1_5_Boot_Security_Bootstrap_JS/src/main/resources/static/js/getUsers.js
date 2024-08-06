console.log('ответ получен')

async function getUsers() {

    const response = await fetch("http://localhost:8080/api/users");

    if (response.ok) {
        let json = await response.json()
            .then(data => replaceTable(data));
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

    function replaceTable(data) {

        const placement = document.getElementById("users-table-pane")
        placement.innerHTML = "";
        data.forEach(({id, username, lastname, age, email, roles}) => {
            let userRoles = "";
            roles.forEach((role) => {
                userRoles = userRoles + role.role.replace("ROLE_", "") + " ";
            })
            const element = document.createElement("tr");

            element.innerHTML = `
            <th scope="row">${id}</th>
            <td>${username}</td>
            <td>${lastname}</td>
            <td>${age}</td>
            <td>${email}</td>
            <td>${userRoles}</td>
            <td>
                <button type="button" class="btn btn-info text-white"
                    data-bs-userId=${id}
                    data-bs-userName=${username}
                    data-bs-userSurname=${lastname}
                    data-bs-userUsername=${age}
                    data-bs-userEmail=${email}
                    data-bs-userRoles=${roles}
                    data-bs-toggle="modal"
                    data-bs-target="#ModalEdit">Edit</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger"
                    data-bs-userId=${id}
                    data-bs-userName=${username}
                    data-bs-userSurname=${lastname}
                    data-bs-userUsername=${age}
                    data-bs-userEmail=${email}
                    data-bs-userEmail=${roles}
                    data-bs-toggle="modal"
                    data-bs-target="#ModalDelete">Delete</button>
            </td>
            `
            placement.append(element);
        })
    }
}
