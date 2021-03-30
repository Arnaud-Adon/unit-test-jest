import axios from "axios";
import User from "../src/user";

jest.mock("axios");

describe("Users test suite", () => {
  it("should return users with api worker", () => {
    const user = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    ];

    const response = { data: user };
    axios.get.mockResolvedValue(response);
    // console.log(axios.get.mockResolvedValue(response));

    return User.all().then((data) => {
      // console.log(data);
      expect(data).toEqual(user);
    });
  });
});
