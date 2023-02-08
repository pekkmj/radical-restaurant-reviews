import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "john@gmail.com",
        cryptedPassword: "$2b$10$8VJYZpQ.z/QPX4GAe6bPVO.jrWDHqN12/kT0enDhBESRYTBgi/0Sm",
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