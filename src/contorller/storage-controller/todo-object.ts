function todoObject(  name : string , id : number,isCompleted : boolean = false){
    return {
        name : name ,
        id : id ,
        isCompleted : isCompleted,
    }
}

export { todoObject }