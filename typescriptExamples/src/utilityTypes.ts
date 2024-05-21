const utilMain = function () {

    // Partial<T>
    interface Todo {
        title: string,
        description: string
    }
    
    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
        return { ...todo, ...fieldsToUpdate };
    }
    
    const todo1 = {
        title: 'organize desk',
        description: 'clear clutter'
    }
    
    const todo2 = updateTodo(todo1, {
        description: 'throw out trash'
    });
    
    console.log('todo1', todo1);
    console.log('todo2', todo2);

    // Readonly<T>

    const todoReadonly: Readonly<Todo> = {
        title: 'Delete inactive users',
        description: 'get rid of them bad bois.'
    };
    // todoReadonly.title = 'hello'; // throws error: Cannot assign to 'title' because it is a read-only property.
    // Readonly is useful for representing assignment expressions that will fail at runtime
    // i.e. when attempting to reassign properties of a frozen object
    function freeze<T>(obj: T): Readonly<T> {
        return Object.freeze(obj);
    };

    // Record<K,T>
    // constructs a type with a set of properties K of type T.
    // can be used to map the properties of a type to another type

    interface PageInfo {
        title: string;
    }

    type Page = 'home' | 'about' | 'contact';

    const x: Record<Page, PageInfo> = {
        about: { title: 'about' },
        contact: { title: 'contact' },
        home: { title: 'home' }
    }
    console.log('x', x);

    // Pick<T,K>
    // constructs a type by picking the set of properties K from T

    interface TodoPick extends Todo {
        completed: boolean
    }

    type TodoPreview = Pick<TodoPick, 'title' | 'completed'>;

    const todoPick: TodoPreview = {
        title: 'Clean Room',
        completed: false
    };

    console.log('todoPick', todoPick);

    // Exclude<T,U>
    // constructs a type by excluding from T all properties that are assignable to U

    type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
    type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
    type T2 = Exclude<string | number | (() => void), Function>; // string | number 

    // Extract<T,U>
    // Constructs a type by extracting from T all properties that are assignable to U.
    // Basically the opposite of exclude
    type extract1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
    type extract2 = Extract<string | number | (() => void), Function>; // () => void

    // NonNullable<T>
    // Constructs a type by excluding null and undefined from T.
    type nonNull1 = NonNullable<string | number | undefined>; // string | number
    type nonNull2 = NonNullable<string[] | null | undefined>; // string[]

    // ThisType<T>
    // This utility does not return a transformed type.
    // Instead, it serves a marker for contextual `this` type.
    // Note that the --noImplicitThis flag must be enabled to use this utility.
    type ObjectDescription<D,M,Q> = {
        data?: D;
        methods?: M & ThisType<D & M &                                                                                               Q>; // Type of 'this' in methods is D & M
        mutations?: Q & ThisType<D & M>;
    }

    function makeObject<D,M,Q>(desc: ObjectDescription<D,M,Q>): D & M {
        let data: object = desc.data || {};
        let methods: object = desc.methods || {};
        let mutations: object = desc.mutations || {};
        return { ...data, ...methods, ...mutations } as D & M & Q;
    }

    let obj = makeObject({
        data: { x: 0, y: 0, words: 'things' },
        methods: {
            moveBy(dx: number, dy: number) {
                this.x += dx; // Strongly typed this
                this.y += dy; // Strongly typed this
            },
            writeThings() {
                this.words('test');
                console.log('write this', this.words)
            }
        },
        mutations: {
            words(test: string): void {
                this.writeThings();
            },
        }
    })

    obj.x = 10;
    obj.y = 20;
    console.log('obj', obj);
    obj.moveBy(5,5);
    console.log('obj after move by', obj);

    /**
     * In the example above, the methods object in the argument to makeObject has a contextual type
     * that includes ThisType<D & M> and therefore the type of this in methods within the methods object
     * is { x: number, y: number } & { moveBy(dx: number, dy: number): number }.
     * Notice how the type of the methods property simultaneously is an inference target and a source
     * for the this type in methods
     * 
     * The ThisType<T> marker interface is simply an empty interface declared in lib.d.ts.
     * Beyond being recognized in the contextual type of an object literal, the interface acts 
     * like any empty interface.
     */
}

export { utilMain };