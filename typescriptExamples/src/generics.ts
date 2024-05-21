const main = function () {
    // without generics, we would either have to give the identity function a specific type:
    function identityNum(arg: number): number {
         return arg
    }

    // or, we could describe the identity function using the any type:
    function identityAny(arg: any): any {
        return arg;
    }
    // by using any we lose what the type was when the function returns
    // the only info we have is that any type could be returned.

    // By using a type variable, a special kind of variable that works on types rather than values,
    // we can denote what is being returned
    function identityTypeVar<T>(arg: T): T {
        return arg;
    }
    // this function is now generic, as it works over a range of types
    // without losing any information unlike using any. 

    // Now to call the generic function... there are two ways
    // Explicit 
    let outputEx = identityTypeVar<string>("myString");
    console.log(`type: ${typeof outputEx}, val: ${outputEx}`);

    // or implicit using type argument inference; where the compiler sets the value of T automatically
    let outputImp = identityTypeVar(43);
    console.log(`type: ${typeof outputImp}, val: ${outputImp}`);
    // while type arg inference can be helpful to keep code shorter and more readable
    // you may need to explicitly pass the type argument when the compiler fails to infer the type

    // Working with generic type variables
    function loggingIdentyError<T>(arg: T): T {
        // This log statement will throw an error because arg doesn't always have .length
        // console.log(arg.length);
        return arg;
    }

    // To fix that, if you intend a function to accept or return arrays but of any type you can do:
    // function loggingIdentity<T>(arg: T[]): T[] {
    // can be set with T[] or with Array<T>
    function loggingIdentity<T>(arg: Array<T>): Array<T> {
        console.log(arg.length);
        return arg;
    }

    let outputArr = loggingIdentity([1,"2",3]);
    console.log(`type: ${typeof outputArr}, val: ${outputArr}`)
    console.log(`type of element: ${typeof outputArr[0]}, val: ${outputArr[0]}`)
    console.log(`type of element: ${typeof outputArr[1]}, val: ${outputArr[1]}`)
    console.log(`type of element: ${typeof outputArr[2]}, val: ${outputArr[2]}`)
    // This way if we pass in an array of numbers than we will get an array of numbers back...
    // or more generically if we pass in an array of T we will get an array of T back

    // Generic Types
    // we've created generic functions that worked over a range of types
    // now we will explore the type of the functions and how to create generic interfaces
    function identity<T>(arg: T): T {
        return arg;
    }
    // the type of generic function is setup just like those of non-generic functions
    let myIdentity: <T>(arg: T) => T = identity;
    // you could also use different type variable as long as they're all the same
    let myIdentityU: <U>(arg: U) => U = identity;
    // we can also write the generic type as a call signature of an object literal type
    let myIdentityObj: {<T>(arg: T): T} = identity;

    // generic interfaces: moving the object literal we just used to an interface
    interface GenericIdentityFn {
        <T>(arg: T): T;
    }

    let myIdentityInt: GenericIdentityFn = identity;

    // we may want to move the generic parameter to be a parameter of the whole interface
    // this makes the type parameter visible to all the other members of the interface
    interface GenericIdentityFnTyped<T> {
        (arg: T): T;
    }
    
    let myIdentityIntTyped: GenericIdentityFnTyped<number> = identity;
    // instead of describing a generic function, we now have a non-generic function signature
    // that is a part of a generic type. 
    // Understanding when to put the type parameter directly on the call signature and 
    // when to put it on the interface itself will be helpful in describing what aspects of a type are generic.

    // Generic Classes
    class GenericClass<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericClass<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
    console.log(myGenericNumber.add(myGenericNumber.zeroValue, 4));

    // could have also used a string
    let myGenericString = new GenericClass<string>();
    myGenericString.zeroValue = "";
    myGenericString.add = function(x, y) { return x + y; };
    console.log(myGenericString.add(myGenericString.zeroValue, " words"));

    // Generic Constraints
    // in the loggingIdentity function we wanted to use the .length property
    // but the compiler threw an error as not all types of .length property
    // to fix this create an interface with that property and extend it in the function
    interface Lengthwise {
        length: number;
    }

    function loggingIdentityConstraint<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        // now we know it has a .length property, so no more error
        return arg;
    }
    // because the generic function is now constrained, 
    // it will no longer work over any and all types
    // loggingIdentityConstraint(3); // error, number doesn't have a .length property;
    // instead we need to pass in values whose type has all the required properties:
    loggingIdentityConstraint({ length: 10, value: 3});

    // Using type parameters in generic constraints
    // you can declare a type parameter that is constrained by another type parameter.
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };
    console.log(getProperty(x, "a")); // okay
    // getProperty(x, "m"); //throws error: argument of type 'm' isn't assignable

    // Using Class Types in Generics
    // when creating factories in TS using generics, 
    // it is necessary to refer to class types by their constructor functions

    function create<T>(c: {new(): T;}): T {
        return new c();
    }

    // a more advanced example uses the prototype property to infer and 
    // constrain relationships between the constructor function and the instance side of class types
    class BeeKeeper {
        hasMask: boolean;
    }
    class ZooKeeper {
        nametag: string;
    }
    class Animal {
        numLegs: number;
    }
    class Bee extends Animal {
        keeper: BeeKeeper;
    }
    class Lion extends Animal {
        keeper: ZooKeeper;
    }
    
    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }
    // createInstance(Lion).keeper.nametag; // typechecks
    // createInstance(Bee).keeper.hasMask; // typechecks

}

export { main };


