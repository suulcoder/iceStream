const simulateDay = ({validTracks, validUsers, state, sellsByDay, playsByDay }) => {
    //const numberOfSells = Math.floor(2*sellsByDay*Math.random()+0.1)       // Define the number of sells by a factor between 0.1 and 2.1 
    //const numberOfPlays = Math.floor(2*playsByDay*Math.random()+0.1)
    const day = []
    for (let index = 0; index < sellsByDay; index++) {
        const action = {
            userid : validUsers[Math.floor(Math.random()*validUsers.length)][1],
            id : validTracks[Math.floor(Math.random()*validTracks.length)][1],
            action : 'BUY'
        }
        day.push(action)
    }
    for (let index = 0; index < playsByDay; index++) {
        const userid = validUsers[Math.floor(Math.random()*validUsers.length)][1]
        let id = validTracks[Math.floor(Math.random()*validTracks.length)][1],
        while (!state[userid].includes(id)){
            id = validTracks[Math.floor(Math.random()*validTracks.length)][1]
        }
        const action = {
            userid,
            id,
            action : 'PLAY'
        }
        day.push(action)
    }
    return shuffle(day)
}

export default simulateDay