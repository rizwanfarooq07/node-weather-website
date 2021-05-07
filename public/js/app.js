
const weatherForm = document.querySelector(`form`);
const search = document.querySelector(`input`);

const messageOne = document.querySelector(`#message-1`);
const messsageTwo = document.querySelector(`#message-2`); 

weatherForm.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const location = search.value
    
    messageOne.textContent = `Loading...`
    messsageTwo.textContent = ``

    fetch(`http://localhost:3000/weather?address=`+ location ).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error  
        } else {
            messageOne.textContent = data.forecast;
            messsageTwo.textContent = data.location
        }
        
    });
});

});