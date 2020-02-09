function foo(){
    if(true){
        var fruit1 = 'apple';        //exist in function scope
        const fruit2 = 'banana';     //exist in block scope
        let fruit3 = 'strawberry';   //exist in block scope

    }
    console.log(fruit1); // output apple
    console.log(fruit2); // output error
    console.log(fruit3);  // output error
}

foo();