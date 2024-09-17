import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  // Limpar dados existentes
  await prisma.pedido.deleteMany()
  await prisma.endereco.deleteMany()
  await prisma.funcionario.deleteMany()
  await prisma.formaPagamento.deleteMany()
  await prisma.formaEntrega.deleteMany()
  await prisma.bebida.deleteMany()
  await prisma.prato.deleteMany()
  await prisma.cargo.deleteMany()

  // Criar cargos
  const cargo1 = await prisma.cargo.create({
    data: {
      nm_cargo: 'Garçom'
    }
  })

  const cargo2 = await prisma.cargo.create({
    data: {
      nm_cargo: 'Cozinheiro'
    }
  })

  // Criar funcionários
  const funcionario1 = await prisma.funcionario.create({
    data: {
      nm_funcionario: 'João Silva',
      nr_cpf: '12345678901',
      dt_inicio: new Date('2023-01-01T03:00:00.000Z'),
      id_cargo: cargo1.id_cargo,
    }
  })

  const funcionario2 = await prisma.funcionario.create({
    data: {
      nm_funcionario: 'Maria Oliveira',
      nr_cpf: '09876543210',
      dt_inicio: new Date('2023-01-02T03:00:00.000Z'),
      id_cargo: cargo2.id_cargo,
    }
  })

  // Criar formas de pagamento
  const formaPagamento1 = await prisma.formaPagamento.create({
    data: {
      nm_forma_pagamento: 'Dinheiro'
    }
  })

  const formaPagamento2 = await prisma.formaPagamento.create({
    data: {
      nm_forma_pagamento: 'Cartão de Crédito'
    }
  })

  // Criar formas de entrega
  const formaEntrega1 = await prisma.formaEntrega.create({
    data: {
      nm_forma_entrega: 'Retirada no local'
    }
  })

  const formaEntrega2 = await prisma.formaEntrega.create({
    data: {
      nm_forma_entrega: 'Delivery'
    }
  })

  // Criar pratos
  const prato1 = await prisma.prato.create({
    data: {
      nm_prato: 'Pizza Margherita',
      ds_prato: 'Pizza com molho de tomate, mozzarella e manjericão',
      vl_prato: 25.50
    }
  })

  const prato2 = await prisma.prato.create({
    data: {
      nm_prato: 'Lasanha Bolonhesa',
      ds_prato: 'Lasanha recheada com carne moída e molho bolonhesa',
      vl_prato: 32.00
    }
  })

  // Criar bebidas
  const bebida1 = await prisma.bebida.create({
    data: {
      nm_bebida: 'Coca-Cola',
      ds_bebida: 'Refrigerante de cola',
      vl_bebida: 5.00
    }
  })

  const bebida2 = await prisma.bebida.create({
    data: {
      nm_bebida: 'Suco de Laranja',
      ds_bebida: 'Suco natural de laranja',
      vl_bebida: 7.50
    }
  })

  // Criar endereços
  const endereco1 = await prisma.endereco.create({
    data: {
      logradouro: 'Rua das Flores',
      numero: '123',
      bairro: 'Jardim Primavera',
      cep: '12345-678',
    }
  })

  const endereco2 = await prisma.endereco.create({
    data: {
      logradouro: 'Avenida Central',
      numero: '456',
      bairro: 'Centro',
      cep: '87654-321',
    }
  })

  // Criar pedidos
  await prisma.pedido.createMany({
    data: [
      {
        dt_pedido: new Date('2023-01-03T12:00:00.000Z'),
        id_forma_pagamento: formaPagamento1.id_forma_pagamento,
        id_prato: prato1.id_prato,
        id_bebida: bebida1.id_bebida,
        id_forma_entrega: formaEntrega1.id_forma_entrega,
        id_endereco: endereco1.id_endereco,
      },
      {
        dt_pedido: new Date('2023-01-04T18:00:00.000Z'),
        id_forma_pagamento: formaPagamento2.id_forma_pagamento,
        id_prato: prato2.id_prato,
        id_bebida: bebida2.id_bebida,
        id_forma_entrega: formaEntrega2.id_forma_entrega,
        id_endereco: endereco2.id_endereco,
      }
    ]
  })
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })