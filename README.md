## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript hands-on repository.

## Learning Breakpoints
1. REST API - Task Management Application (CRUD)
   ```bash
   # GIT Branch
   $ git checkout breakpoint/1.basic-curd
   ```
2. Validation and Error Handling 
   ```bash
   # GIT Branch
   $ git checkout breakpoint/2.validation-error-handling
   ```
   Here is list of all available decorators form GitHub Resource: [class-validator](https://github.com/typestack/class-validator#validation-decorators)

3. Data Persistence - PostgreSQL & Type ORM
   ```bash
   # GIT Branch
   $ git checkout breakpoint/3.postgresql-typeorm
   ```
   **Installing PostgreSQL and pgAdmin**

   In this hands-on requires you to have PostgreSQL installed and running.

   We will also use pgAdmin as a tool to view our database. Bellow you can find download links to both. Please download and start both PostgreSQL and pgAdmin.

   1. Installing PostgreSQL:
      * Windows users: [Windows Installer Download - Official PostgreSQL Website](https://www.postgresql.org/download/windows/)
      
      * macOS users: [Postgres.app Downloads (Recommended)](https://postgresapp.com/downloads.html)

   2. Installing pgAdmin:
      
      * Windows & macOS: [pgAdmin Download Page](https://www.pgadmin.org/download/)
   
   </br>
   
   TypeORM Documentation: [https://typeorm.io](https://typeorm.io)
   </br>
   TypeORM Entity Explain: [https://github.com/typeorm/typeorm/blob/master/docs/entities.md](https://github.com/typeorm/typeorm/blob/master/docs/entities.md)


      TypeORM Query Builder: [https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md](https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md)

4. Authentication - Setting up JWT Passport
   ```bash
   # GIT Branch
   $ git checkout breakpoint/4.authentication
   ```
5. Logging
   ```bash
   # GIT Branch
   $ git checkout breakpoint/5.logging
   ```
5. Logging
   ```bash
   # GIT Branch
   $ git checkout breakpoint/5.production-configuration
   ```
5.1. Frontend Application
   ```bash
   # For try frontend application to clone 
   $ git clone git@github.com:arielweinberger/task-management-frontend.git
   ```
6. Testing
   ```bash
   # GIT Branch
   $ git checkout breakpoint/6.testing
   ```
7. Swagger
   ```bash
   # GIT Branch
   $ git checkout breakpoint/6.swagger
   ```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Nest CLI Commands 

```bash
# Generating module
$ nest g module <module-name>

# Generating controller
$ nest g controller <module-name> --no-spec

# Generating service
$ nest g service <module-name> --no-spec
```


## Extra Concepts
Here are some concepts which used in this project:
```javascript
/* findIndex vs indexOf methods.
All return -1 when no value is found. */

let myArray = [1, 2, 2, 8, 4, 2, 5, 6, 2, 9];

// findIndex(arg => argCondition): return the first index 
// for which the given function is true.
myArray.findIndex(x => x > 2); // ??? 3

// indexOf(value): return the value's first index.
myArray.indexOf(2); // ??? 1

// lastIndexOf(value): return the value's last index.
myArray.lastIndexOf(2); // ??? 8

// indexOf(value, start): return the value's first index, 
// starting at the given position.
myArray.indexOf(2, 3); // ??? 5

// lastIndexOf(value, stop): return the value's last index, 
// stopping at the given position.
myArray.lastIndexOf(2, 3); // ??? 2
```

```javascript
// delete item from array of objects javascript
const apps = [
  {id:1, name:'Jon'}, 
  {id:2, name:'Dave'},
  {id:3, name:'Joe'}
]

//remove item with id=2
const itemToBeRemoved = {id:2, name:'Dave'}

apps.splice(apps.findIndex(a => a.id === itemToBeRemoved.id) , 1)

//print result
console.log(apps)
//Run code snippet
```

```typescript
// example.spec.ts

// feature
class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friends not found!');
    }
    this.friends.splice(idx, 1);
  }
}

// tests
describe('FriendsList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('add a friend to the list', () => {
    friendsList.addFriend('Piyush');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn();
    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Piyush');
    expect(friendsList.announceFriendship).toHaveBeenCalled();
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Piyush');
      expect(friendsList.friends[0]).toEqual('Piyush');
      friendsList.removeFriend('Piyush');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throws an error as friend does not exist', () => {
      expect(() => friendsList.removeFriend('Piyush')).toThrow(
        new Error('Friends not found!'),
      );
    });
  });
});
```

## Stay in touch

- Author - [Piyush Kacha](https://github.com/piyush-kacha)
- Twitter - [piyushkacha75](https://twitter.com/piyushkacha75)

