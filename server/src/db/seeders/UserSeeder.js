import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const userData = [
      {
        username: "john",
        email: "john@gmail.com",
        cryptedPassword: "$2b$10$8VJYZpQ.z/QPX4GAe6bPVO.jrWDHqN12/kT0enDhBESRYTBgi/0Sm",
      },
      {
        username: "bob",
        email: "bob@gmail.com",
        cryptedPassword: "ASF#9f39JF3AW9FJAW39FJAW9EJFAW#(FJAW3F9JAW3F(JAW3RF(AJW3FW"
      },
      {
        username: "joe",
        email: "joe@gmail.com",
        cryptedPassword: "adsfasdfasdfasdfadsfadsadsfadsfdsaAW3F9JAW3F(JAW3RF(AJW3FW"
      }
    ]

    for (const singleUserData of userData) {
      const currentUser = await User.query().findOne(singleUserData)
      if (!currentUser) {
        await User.query().insert(singleUserData)
      }
    }
  }
}

export default UserSeeder