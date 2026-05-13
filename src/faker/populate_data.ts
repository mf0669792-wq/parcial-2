import { sequelize } from "../database/db";
import { Car } from "../models/CarI";
import { Tuition } from "../models/TuitionI";
import { Resource } from "../models/authorization/Resource";
import { ResourceRole } from "../models/authorization/ResourceRole";
import { Role } from "../models/authorization/Role";
import { RoleUser } from "../models/authorization/RoleUser";
import { User } from "../models/authorization/User";

type FakerModule = typeof import("@faker-js/faker");

const loadFaker = async (): Promise<FakerModule["faker"]> => {
  const module = await new Function('return import("@faker-js/faker")')();
  return module.faker;
};

async function createFakeData() {
  const faker = await loadFaker();

  await sequelize.authenticate();
  await sequelize.sync({ force: false });

  const roles = await Promise.all(
    ["ADMIN", "USER", "MANAGER"].map((name) =>
      Role.create({
        name,
        is_active: "ACTIVE",
      })
    )
  );

  const resourcesData = [
    { path: "/api/car/public", method: "GET" },
    { path: "/api/car/public", method: "POST" },
    { path: "/api/car/public/:id", method: "GET" },
    { path: "/api/car/public/:id", method: "PATCH" },
    { path: "/api/car/public/:id", method: "DELETE" },
    { path: "/api/tuition/public", method: "GET" },
    { path: "/api/tuition/public", method: "POST" },
    { path: "/api/tuition/public/:id", method: "GET" },
    { path: "/api/tuition/public/:id", method: "PATCH" },
    { path: "/api/tuition/public/:id", method: "DELETE" },
  ];

  const resources = await Promise.all(
    resourcesData.map((resource) =>
      Resource.create({
        ...resource,
        is_active: "ACTIVE",
      })
    )
  );

  for (const role of roles) {
    for (const resource of resources) {
      await ResourceRole.create({
        role_id: role.id,
        resource_id: resource.id,
        is_active: "ACTIVE",
      });
    }
  }

  const users: User[] = [];
  for (let i = 0; i < 20; i++) {
    const user = await User.create({
      username: faker.internet.username(),
      email: `user${Date.now()}_${i}@example.com`,
      password: "password123",
      avatar: faker.image.avatar(),
      is_active: "ACTIVE",
    });

    users.push(user);
  }

  for (const user of users) {
    const role = faker.helpers.arrayElement(roles);
    await RoleUser.create({
      user_id: user.id,
      role_id: role.id,
      is_active: "ACTIVE",
    });
  }

  const cars: Car[] = [];
  for (let i = 0; i < 30; i++) {
    const car = await Car.create({
      brand: faker.vehicle.manufacturer(),
      carClass: faker.vehicle.type(),
      model: faker.vehicle.model(),
      cylinderCapacity: faker.number.int({ min: 1000, max: 6000 }),
      capacity: faker.number.int({ min: 2, max: 8 }),
      status: "ACTIVE",
    });

    cars.push(car);
  }

  for (let i = 0; i < 50; i++) {
    const car = faker.helpers.arrayElement(cars);

    await Tuition.create({
      registrationDate: faker.date.past({ years: 5 }),
      city: faker.location.city(),
      payment: faker.number.float({ min: 100000, max: 3000000, fractionDigits: 2 }),
      car_id: car.id,
      status: "ACTIVE",
    });
  }
}

createFakeData()
  .then(async () => {
    console.log("Datos falsos creados exitosamente");
    await sequelize.close();
  })
  .catch(async (error) => {
    console.error("Error al crear datos falsos:", error);
    await sequelize.close();
    process.exit(1);
  });
