// console.log("zzzzzzzzzzzzzzzzzzzzzzz...");

// fetch('http://localhost:3000/weather?address=padmabati,nayagarh,odisha').then((response)=>{
//     response.json().then((data)=>{
//       console.log(data)
//     }).catch((error)=>{
//         console.log(error);
//     })
// })

const formdata = document.querySelector("form");
const add = document.querySelector("input");
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
formdata.addEventListener("submit", (e) => {
    const address = add.value;
    e.preventDefault(); // will prevent the default behaviour of regreshing the browser
    p1.textContent = 'Loading...';
    p2.textContent = '';
  fetch('http://localhost:3000/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
              p1.textContent = data.error;
            } else {
                p1.textContent = data.forecast
                p2.textContent = data.address;
              
            }
        })
    })
});

