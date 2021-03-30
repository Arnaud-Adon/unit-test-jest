import {
  showCalculAirMessage,
  airCalcul,
  squareCalcul,
  isAdmin,
} from "../src/calcuHelper";

describe("calculHelper test suite", () => {
  it("should return libelle with corrects values", () => {
    const width = 10;
    const height = 10;

    const result = showCalculAirMessage(width, height);
    expect(result).toContain(100);
  });

  it("should return 'L'air ne peut pas être calculer' with string in argument", () => {
    const width = "toto";
    const height = "tete";

    const result = showCalculAirMessage(width, height);
    expect(result).toContain("L'air ne peut pas être calculer");
  });

  it("should return 'L'air ne peut pas être calculer' with empty argument", () => {
    const result = showCalculAirMessage();
    expect(result).toContain("L'air ne peut pas être calculer");
  });

  it("should return 'Un des arguments n'est pas conforme' with array argument", () => {
    const width = [];
    const height = [];

    const result = showCalculAirMessage(width, height);
    expect(result).toContain("L'air ne peut pas être calculer");
  });

  it("should return 'Un des arguments n'est pas conforme' with {} argument", () => {
    const width = {};
    const height = {};

    const result = showCalculAirMessage(width, height);
    expect(result).toContain("L'air ne peut pas être calculer");
  });

  it("should return 'Un des arguments n'est pas conforme' with Date object argument", () => {
    const width = new Date();
    const height = new Date();

    const result = showCalculAirMessage(width, height);
    expect(result).toContain("L'air ne peut pas être calculer");
  });

  it("should return 'Un des arguments n'est pas conforme' with string number argument", () => {
    const width = "10";
    const height = "10";

    const result = showCalculAirMessage(width, height);
    expect(result).toContain(100);
  });
});

describe("airCalcul function test suite", () => {
  it("should return true when airCalcul is a function", () => {
    expect(airCalcul.name).toEqual("airCalcul");
  });

  it("should return 100 with 10 and 10 values", () => {
    expect(airCalcul(10, 10)).toBe(100);
  });

  it("should return true when result is greater", () => {
    expect(airCalcul(10, 10)).toBeGreaterThan(90);
  });

  it("should  return true when result is greater than or equal to 100", () => {
    expect(airCalcul(10, 10)).toBeGreaterThanOrEqual(100);
  });

  it("should return true when result is not a number", () => {
    expect(airCalcul("10", "10")).not.toBeNaN();
  });
});

describe("squareCalcul test suite", () => {
  it("should return 100 with 10 value", () => {
    expect(squareCalcul(10)).toEqual(100);
  });
  it("should return 100 with 10 value", () => {
    expect(squareCalcul(10)).toBeGreaterThan(0);
  });

  it("should return 100 with 10 string value", () => {
    expect(squareCalcul("10")).toEqual(100);
  });

  // ERROR PART

  describe("isAdmin function test suite", () => {
    it("should catch a error, when user doent have admin role", () => {
      let userSimple = { role: "guest" };
      expect(() => isAdmin(userSimple)).toThrowError(/^interdit/gi);
    });

    it("should return true when user has admin role", () => {
      let userAdmin = { role: "admin" };
      expect(isAdmin(userAdmin)).toBeTruthy();
    });

    it("should return error when there are no user", () => {
      expect(() => isAdmin()).toThrow(/Pas d'utilisateur/);
    });
  });

  // MATCH OBJECT

  const advancedPermission = {
    domain: "arnaudadon.fr",
    level: 4,
    perms: {
      roles: ["guest", "reader", "viewer"],
      delegeted: true,
      method: "oauth",
    },
  };
  describe("Advanced object test suite", () => {
    const userAdvanced = {
      level: 4,
      perms: {
        roles: ["guest", "reader", "viewer"],
        delegeted: true,
        method: expect.stringMatching(/sample|oauth|oauth2/),
      },
    };

    it("should return true when is the same object", () => {
      expect(advancedPermission).toMatchObject(userAdvanced);
    });
  });

  //INSTANCE TESTING

  class User {
    constructor(nom) {
      this.nom = nom;
    }
  }

  class Admin {
    constructor(nom) {
      this.nom = nom;
    }
  }

  function Auth(name) {
    if (!name) throw new Error("No name defined");
    return new User(name);
  }

  describe("Class test suite", () => {
    it("should return true when is a User instance", () => {
      expect(new User("toto")).toBeInstanceOf(User);
    });

    it("should return User instance with Auth function", () => {
      expect(Auth("tutu")).toBeInstanceOf(User);
    });

    it("should return Error when Auth function have no argument", () => {
      expect(() => Auth()).toThrow(/No name defined/);
    });
  });

  // ARRAY TEST
  describe("Array test suite", () => {
    function getNames() {
      return ["toto", "tete", "tutu"];
    }
    const expected = ["toto", "tete"];
    it("should return true when expected array contain values defined", () => {
      expect(expected).not.toEqual(expect.arrayContaining(getNames()));
    });

    it("should return true when expected array contain values defined", () => {});
  });

  // ASSERTION NUMBER - ASSERTION - HAS_ASSERTION

  // SENTENCE

  function getSentence() {
    return "Bonjour, comment allez-vous ?";
  }

  describe("Characters test suite", () => {
    const array = ["toto", "tutu"];
    const expected = [
      expect.stringMatching(/toto/),
      expect.stringMatching(/tutu/),
    ];
    it("should return true when array contain toto and tutu value ", async () => {
      expect(array).toEqual(expect.arrayContaining(expected));
    });

    it("should be contain Bonjour word", () => {
      expect(getSentence()).toEqual(expect.stringMatching(/bonjour/gi));
    });
  });

  // ASYNCHRONE TEST
  function fetchApi(callback) {
    setTimeout(() => {
      callback(`{status: "ok"}`);
    }, 3000);
  }

  function fetchApiPromise() {
    return new Promise((onSuccess, onFail) => {
      setTimeout(() => {
        onSuccess("{status: ok}");
      }, 4000);
    });
  }

  describe(" asynchrone test suite", () => {
    it("should return status ok with callback method", (done) => {
      function callback(data) {
        try {
          expect(data).toEqual(`{status: "ok"}`);
          done();
        } catch (error) {
          done(error);
        }
      }

      fetchApi(callback);
    });

    it("should return status ok with promise method", () => {
      return fetchApiPromise().then((data) =>
        expect(data).toEqual(`{status: ok}`)
      );
    });
  });

  // MOCK TEST

  describe("Mock test suite", () => {
    it("should return true for a mock called two times", () => {
      const mockCallback = jest.fn((i) => i);
      const array = ["tutu", "toto", "tata"];

      function forEach(items, callback) {
        for (let i = 0; i < items.length; i++) {
          callback(items[i]);
        }
      }

      forEach(array, mockCallback);

      expect(mockCallback.mock.calls.length).toEqual(3);
      expect(mockCallback.mock.results[0].value).toEqual("tutu");
    });

    it("should return true when a equal b value", () => {
      const mock = jest.fn();
      const a = new mock();
      a.prenom = "toto";
      const b = {};
      const bound = mock.bind(b);
      bound();

      // console.log(mock.mock.instances);

      expect(b).not.toEqual(a);
    });
  });
});
