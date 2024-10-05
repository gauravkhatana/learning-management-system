const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {name: "Computer Science"},
        {name: "Fitness"},
        {name: "Music"},
        {name: "Photography"},
        {name: "Accounting"},
        {name: "Engineering"},
        {name: "Filming"},
       
      ],
    });
  } catch (error) {
    console.log(`Error in seeding categories ${error}`);
  } finally {
    database.$disconnect();
  }
}

 main();
