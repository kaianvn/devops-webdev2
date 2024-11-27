import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

void async function () {
  // // C: CREATE / INSERT
  // const user = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: 'Alice',
  //       email: 'alice@prisma.io',
  //     },
  //     {
  //       name: 'Deleteme',
  //       email: 'deleteme@prisma.io',
  //     },
  //   ]
  // })

  // R: READ / SELECT
  console.log("aaaa")
  const user = await prisma.user.findMany({
    // take: 10,
    // where: {
    //   id: 1
    // }
  })

  // // U: UPDATE / UPDATE
  // const user = await prisma.user.update({
  //   data: {
  //     name: "Alice (updated)"
  //   },
  //   where: {
  //     id: 1
  //   },
  // })

  // // D: DELETE / DELETE
  // const user = await prisma.user.delete({
  //   where: {
  //     email: "deleteme@prisma.io",
  //     // // CAMPOS NÃO ÚNICOS NÃO PODEM SER USADOS 
  //     // // EM DELETE SIMPLES SOMENTE EM DELETE MANY
  //     // name: "Deleteme",
  //   }
  // })

  console.log(user)
}();