/* eslint-disable no-console */
import { connection } from "../boot.js";
import RestaurantSeeder from "./seeders/RestaurantSeeder.js";
import ReviewSeeder from "./seeders/ReviewSeeder.js";


class Seeder {
  static async seed() {
    console.log("seeding restaurants")
    await RestaurantSeeder.seed()

    console.log("seeding reviews")
    await ReviewSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder