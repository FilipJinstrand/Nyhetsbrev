const page = document.getElementById("content")

DisplayContent();

function DisplayContent() {
    if (localStorage.getItem("userId") !== null) {
        LoggedIn();
    }
    else {
        NotLoggedIn();
    }
}


async function LogIn() {
    var uName = document.getElementById("uName").value;
    var password = document.getElementById("password").value;


    await fetch('http://localhost:3000/admin/account')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (uName === data[0].userName && password === data[0].password) {
                console.log("Logged in!");
                localStorage.setItem("userId", data[0].id)
            }
            else {
                console.log("Nope");
            }
        });
}

function LoggedIn() {
    page.innerHTML = "";
    page.insertAdjacentHTML("beforebegin", `
    <nav class="nav">
        <button type="button" id="logout" class="btn btn-primary">Logout</button>
    </nav>
    `);

    page.insertAdjacentHTML("afterbegin", `
        <h1>Nyhetsbrev</h1>
        <h3>Admin</h3>
        <div id="listContainer"></div>
    `)

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var listContainer = document.getElementById("listContainer");
            data.forEach(element => {
                listContainer.insertAdjacentHTML("afterbegin", `
                    <ul class="list-group list-group-horizontal listGrp">
                        <li class="list-group-item">Username: ${element.userName}</li>
                        <li class="list-group-item">Email: ${element.email}</li>
                        <li class="list-group-item">Subscribed: ${element.subscribed}</li>
                    </ul>
                `)
            });
        });

    var logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}

function NotLoggedIn() {
    page.insertAdjacentHTML("beforeend", `
    <div>
        <form>
        <div class="form-group">
            <input type="text" class="form-control" id="uName" placeholder="User name" style="max-width: 350px;">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" id="password" placeholder="Password" style="max-width: 350px;">
        </div>
        <button id="logIn" type="button" class="btn btn-primary">Sign in</button>
        </form>
    </div>
    `);

    var btn = document.getElementById("logIn");

    btn.addEventListener("click", async () => {
        await LogIn();
        DisplayContent();
    });
}