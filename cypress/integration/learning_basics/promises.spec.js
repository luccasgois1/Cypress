it('Teste de promisses (funções assincronas)', () => {})

function getSomething(number=12){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve(number);
        }, 1000)
    })
}

const system = () => {
    console.log('init');
    const prom = getSomething();
    prom.then( something =>{
        console.log(`Something is ${something}`);

    })
    console.log("end");
}

system();