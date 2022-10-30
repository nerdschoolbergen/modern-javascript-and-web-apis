# Troubleshooting common JavaScript errors

## ReferenceError

This error is thrown when a reference made to a variable/item is broken. That is the variable/item doesn’t exist.

For example:

```javascript
const cat = 'cat';
console.log(cat); // 'cat'
console.log(dog); // ReferenceError: dog is not defined
```

We have a variable `cat` initialized to `'cat'`. Next, we referred to the `cat` variable and `dog` variable. The `cat` variable exists but `dog` variable doesn’t.

`cat` will return `'cat'`, while `dog` will throw a reference error because the variable `dog` can’t be found.

This also occurs if the referenced variable is not in scope:

```javascript
for (let i = 0; i < 10; i++) {
  const count = 5;
}
console.log(count); //ReferenceError: count is not defined
```

## SyntaxError

This is the most common error we encounter. This error occurs when we type code that the JavaScript engine can't understand.

For example:

```javascript
let cat h = 'cat'
```

This code will throw an SyntaxError telling you where the error occured:

```javascript
SyntaxError: Unexpected identifier 'h'
```

What is with the lone `h`? The `h` being there breaks the code.

## TypeError

TypeError is used to indicate an unsuccessful operation when none of the other NativeError objects are an appropriate indication of the failure cause.

TypeError occurs when an operation is performed on a wrong data type. Maybe a boolean is expected but a sting is found.

For example, if we try to convert a number to uppercase like this:

```javascript
const num = 123;
num.toUpperCase();
```

This will throw a TypeError:

```javascript
TypeError: num.toUpperCase is not a function
```

Another example, if we try to convert an undefined value to uppercase:

```javascript
const nothing = undefined;
nothing.toUpperCase(;
```

This will throw a TypeError as well:

```javascript
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
```

Changing a value that cannot be changed is another example:

```javascript
const a = 5;
a = '5';
```

This will throw a TypeError:

```javascript
TypeError: Assignment to constant variable
```

If you try to iterate over a value that is non-iterable, like an object:

```javascript
const a = { b: 1, c: 2 }; // Object (non-iterable)
for (const x of a) {
  // do stuff
}
```

This will throw a TypeError:

```javascript
TypeError: a is not iterable
```
