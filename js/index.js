document.addEventListener('DOMContentLoaded', event =>{
    let allMonsters;
    let currentBatchStart = 0;
    let currentBatchEnd = 50;
    const monsterContainer = document.getElementById('monster-container')

    fetch('http://localhost:3000/monsters')
    .then(result => result.json())
    .then(data => {
        allMonsters = data;

        const first50Monsters = allMonsters.slice(0, 50)        
        createMonsterDetails(first50Monsters)
    })

    document.getElementById('forward')
    .addEventListener('click', event =>{
        
        if(currentBatchEnd < allMonsters.length - 50){
            monsterContainer.innerHTML = ''
            currentBatchStart += 50
            currentBatchEnd += 50
            const currentMonsters = allMonsters.slice(currentBatchStart, currentBatchEnd)
            createMonsterDetails(currentMonsters)
            console.log(currentBatchStart, currentBatchEnd)
        }
    })

    document.getElementById('back')
    .addEventListener('click', event =>{
        
        if(currentBatchStart - 50 >= 0){
            monsterContainer.innerHTML = ''
            currentBatchStart -= 50
            currentBatchEnd -= 50
            const currentMonsters = allMonsters.slice(currentBatchStart, currentBatchEnd)
            createMonsterDetails(currentMonsters)
            console.log(currentBatchStart, currentBatchEnd)
        }
    })

    function createMonsterDetails(monsters){
        monsters.forEach(monster => {
            let domMonster = document.createElement('div')
            domMonster.innerHTML = `
                <h1>${monster.name}</h1>
                <p><strong>${monster.age}</strong></p>
                <p>${monster.description}</p>
                `
            monsterContainer.append(domMonster)
        })
    }


    const createMonster = document.getElementById('create-monster')
    createMonster.innerHTML = `<div>
        <form>
            <input type="text" id="monster-name" placeholder="name..."></input>
            <input type="text" id="monster-age" placeholder="age..."></input>
            <input type="text" id="monster-description" placeholder="description..."></input>
            <input type="submit" value="create"></input>
        </form>
    </div>`

    const createMonsterForm = createMonster.querySelector('form')
    createMonsterForm.addEventListener('submit', event =>{
        createMonsterForm.reset()
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    "name": createMonsterForm.querySelector('#monster-name').value,
                    "age": createMonsterForm.querySelector('#monster-age').value,
                    "description": createMonsterForm.querySelector('#monster-description').value
                }
            )
        })
        .then(result => result.json())
        .then(data => console.log(data))
    })
})

