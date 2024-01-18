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
        if (response.ok)
            document.getElementById('dd').style.display = 'block';
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

function getCookie(name) {
    
    const cookies = document.cookie.split('; ');
    console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return '';
  }
// fonc()