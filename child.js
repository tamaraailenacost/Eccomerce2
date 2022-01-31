process.on('message', cant => {
    console.log("mensaje del padre", cant)
    const numbers = [];
    for (let i = 0; i < cant.num; i++) {
        const random = Math.floor(Math.random() * (1000 - 1) + 1);
        numbers.push(random)
    };
    console.log(numbers)
    process.send(numbers);
});