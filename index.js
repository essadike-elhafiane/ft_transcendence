const url = 'http://localhost:3000/status'; // Replace with your API endpoint URL
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoiMjAyNC0wMS0xN1QyMDowNDoyNy44NjZaIiwidXBkYXRlQXQiOiIyMDI0LTAxLTE3VDIwOjA0OjI3Ljg2NloiLCJ1c2VyTmFtZSI6ImVzc2FkaWtlIGVsaGFmaWFuZSIsImVtYWlsIjoiZXNzYWRpa2VlbGhhZmlhbmVAZ21haWwuY29tIiwiaGFzaCI6IiRhcmdvbjJpZCR2PTE5JG09NjU1MzYsdD0zLHA9NCQrSHIrUXpuUHlwcU1qTFlPL0NzeHpBJEFpZXBlVzFrVWZ3RmxWcE9sNU1iMVVGSnhpNEgyWDlUZmQ3QUE5VmhhbDQiLCJpbWFnZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0l3ODV6SVBuMnJhSTM0RlZlYVVpS210WmI1cWkzaml5eUlMS2ZKVFFUNz1zOTYtYyIsImZpcnN0TmFtZSI6ImhoaGhoIiwibGFzdE5hbWUiOm51bGwsImlhdCI6MTcwNTUyMjk1NywiZXhwIjoxNzA1NjA5MzU3fQ.Dwv2zVuyYIVHGyWrwGMNX2BxebrOml5DXE3T4EIOrc8'; // Replace with your authentication token

async function fonc() {
    try {
        // const token = document.cookie.split("; ")
        // console.log(token);
        const response = await fetch(url, {
            
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
            // withCredentials: true,
        });
        let div = document.getElementById('dd');
        if (response.ok)
            div.style.display = 'block';
        else 
            div.style.display = 'none';
        if (response.ok) {
            const data = await response.json();
            console.log('dsgsdgsdgsdg---------',data);
            document.getElementById('img').setAttribute('src', data.image);
            document.getElementById('name').innerText = 'Username: ' + data.userName;
            document.getElementById('email').innerText = 'Email: ' + data.email;
            document.getElementById('fe').innerText = JSON.stringify(data);
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
  
}

async function logout() {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
        if (response.ok) {
            let div = document.getElementById('dd');
            div.style.display = 'none';
            const data = await response.json();
            console.log(data);
            document.querySelector('h3').innerText = data.logout;
            // window.location.href = '/';
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

fonc();

function authenticationgoogle(){
    window.location.href = 'http://localhost:3000/api/auth/google';
    // alert('login google');
}

function authenticationintra(){
    window.location.href = 'http://localhost:3000/api/auth/intra';
    // alert('login intra');
    // fonc()
}
async function ggame() {
    try {
        const response = await fetch('http://localhost:3000/generategame', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            document.getElementById('hhh').innerText ='gameId : ' + data.id;
            let div = document.getElementById('dd');
            div.style.display = 'none';
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
}


function jg(){
    document.getElementById('jgame').style.display = 'block';
    let div = document.getElementById('dd');
    div.style.display = 'none';
}
async function jgame(){

    const value = document.getElementById('input').value;
    console.log(value);
    if (!Number.isInteger(Number(value)))
       return document.getElementById('input').style.border = '1px solid red';
    else
        document.getElementById('input').style.border = '1px solid black';

    try {
        const response = await fetch(`http://localhost:3000/joingame?gameid=${encodeURIComponent(value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            document.getElementById('hhh').innerText = JSON.stringify(data);
            
        } else {
            throw new Error('Error: ' + response.status);
        }
    }catch (error) {
        console.error(error);
    }
}

// async function login() {
//     try {
//         const response = await fetch('http://localhost:3000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//             body: JSON.stringify({
//                 email: document.getElementById('email').value,
//                 password: document.getElementById('password').value,
//             }),
//         });
//         if (response.ok) {
//             const data = await response.json();
//             console.log(data);
//             window.location.href = '/profile';
//         } else {
//             throw new Error('Error: ' + response.status);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

