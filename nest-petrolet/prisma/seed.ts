// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function hashedPassword(token: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(token, salt);
}

async function main() {
  // Create roles
  const roleAdmin = await prisma.role.upsert({
    where: { name: 'ROLE_ADMIN' },
    update: {},
    create: { name: 'ROLE_ADMIN' },
  });

  console.log('Creating admin...');
  // Seed a user and assign the ROLE_ADMIN
  const adminUser = await prisma.user.upsert({
    where: {
      username: 'admin',
      email: 'admin@petrolet.com',
      phoneNumber: '+123456789',
    },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@petrolet.com',
      username: 'admin',
      phoneNumber: '+123456789',
      createdAt: new Date(),
      passwordDigest: hashedPassword('Password123@'),
    },
  });

  // Assign the ROLE_ADMIN to the user using the UserRole model
  await prisma.userRole.create({
    data: {
      userId: adminUser.id,
      roleId: roleAdmin.id,
    },
  });

  console.log('Seeding users...');
  const members = [
    'Francie;Orwa;francieorwa@gmail.com;francie;0792753471',
    'Sila;Stephene;silastephene@gmail.com;sila;0718238175',
    'David;Masilva;davidmasilva@gmail.com;masilva;0795891318',
    'Andrew;Nzioki;andrew-nzioki@gmail.com;drew;0797743568',
    'Quincy;Linet;quincylinet@gmail.com;quincy;0718588815',
  ];
  members.forEach(async (member) => {
    const [firstName, lastName, email, username, phoneNumber] =
      member.split(';');
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
        createdAt: new Date(),
        passwordDigest: hashedPassword('Password123@'),
      },
    });
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
