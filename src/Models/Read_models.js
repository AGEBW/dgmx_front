class User {
    constructor(id, name, type) {
      this.id = id;
      this.name = name;
      this.type = type;
    }
  }

class Homework {
      constructor(id,id_user,homework, details, status) {
        this.id = id;
        this.id_user = id_user;
        this.homework = homework;
        this.details = details;
        this.status = status;
      }
  }

export { User, Homework };
/* export default class 
} */