function addInfluencer(){
    const inputURL = document.querySelector('.input-url').value;
    //send to server
    fetch('http://localhost:8080/influencers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputURL})
    });
    console.log("hi hi")

}