const simulateDay = (validTracks, validUsers, state, sellsByDay, playsByDay ) => {
    //const numberOfSells = Math.floor(2*sellsByDay*Math.random()+0.1)       // Define the number of sells by a factor between 0.1 and 2.1 
    //const numberOfPlays = Math.floor(2*playsByDay*Math.random()+0.1)
    const day = []
    for (let index = 0; index < sellsByDay; index++) {
        const my_Random = Math.floor(Math.random()*validUsers.length)
        let my_RandomT = Math.floor(Math.random()*validTracks.length)
        const action = {
            user : validUsers[my_Random][1],
            track : validTracks[my_RandomT][1],
            action : 'BUY',
            userid: validUsers[my_Random][0],
            id: validTracks[my_RandomT][0]
        }
        day.push(action)
    }
    for (let index = 0; index < playsByDay; index++) {
        const my_Random = Math.floor(Math.random()*validUsers.length)
        const userid = validUsers[my_Random][0]
        let my_RandomT = Math.floor(Math.random()*validTracks.length)
        while (!state[userid] || state[userid].includes(validTracks[my_RandomT][0])){
            my_RandomT = Math.floor(Math.random()*validTracks.length)
        }
        const action = {
            user:validUsers[my_Random][1],
            track:validTracks[my_RandomT][1],
            action : 'PLAY',
            userid: validUsers[my_Random][0],
            id:validTracks[my_RandomT][0]
        }
        day.push(action)
    }
    return day.sort(function (a, b) { return (0.5 - Math.random()) })
}

export default simulateDay