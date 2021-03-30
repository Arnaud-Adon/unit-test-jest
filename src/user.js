import axios from "axios";

class User {
  static all() {
    return axios
      .get("/jest-sample/src/user.json")
      .then((response) => response.data)
      .catch((error) => error);
  }
}

export default User;
