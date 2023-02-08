/* eslint-disable no-console */
import { connection } from "../boot.js";
import RestaurantSeeder from "./seeders/RestaurantSeeder.js";
import ReviewSeeder from "./seeders/ReviewSeeder.js";
import VoteSeeder from "./seeders/VoteSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";


class Seeder {
  static async seed() {
    console.log("seeding restaurants")
    await RestaurantSeeder.seed()

    console.log("seeding users")
    await UserSeeder.seed()

    console.log("seeding reviews")
    await ReviewSeeder.seed()

    console.log("seeding votes")
    await VoteSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder