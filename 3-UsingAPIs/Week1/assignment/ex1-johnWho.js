/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/3-UsingAPIs/Week1#exercise-1-john-who

Rewrite this function, but replace the callback syntax with the Promise syntax:
- Have the `getAnonName` function return a `new Promise`.
- If the Promise `resolves`, pass the full name as an argument to resolve with.
- If the Promise `rejects`, pass an error as the argument to reject with: "You 
  didn't pass in a first name!"
------------------------------------------------------------------------------*/
// TODO see above
export const getAnonName = (firstName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (firstName) {
        const fullName = `${firstName} Doe`;
        resolve(fullName);
        return;
      } else {
        reject(new Error("You didn't pass in a first name!"));
      }
    }, 1000);
  });
};

function main() {
  getAnonName('John')
    .then((fullName) => {
      console.log(fullName);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
