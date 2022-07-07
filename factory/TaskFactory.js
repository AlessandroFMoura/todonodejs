module.exports = () => ({ title, description, id=0 }) =>{
    const task = { title, description, done: false } 
 
    return id === 0 ? task : { ...task, id }
 }
     