class User {
    constructor(id, name,last,email,password,password_confirmation,terms) {
        this.id = id;
        this.name = name;
        this.last = last;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.terms = terms;
      }
}

export { User }