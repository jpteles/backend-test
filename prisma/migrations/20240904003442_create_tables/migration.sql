-- CreateTable
CREATE TABLE "Cargo" (
    "id_cargo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FormaEntrega" (
    "id_forma_entrega" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_forma_entrega" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id_funcionario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_funcionario" TEXT NOT NULL,
    "nr_cpf" TEXT NOT NULL,
    "dt_inicio" DATETIME NOT NULL,
    "dt_fim" DATETIME,
    "id_cargo" INTEGER NOT NULL,
    CONSTRAINT "Funcionario_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "Cargo" ("id_cargo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prato" (
    "id_prato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_prato" TEXT NOT NULL,
    "ds_prato" TEXT,
    "vl_prato" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Bebida" (
    "id_bebida" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_bebida" TEXT NOT NULL,
    "ds_bebida" TEXT,
    "vl_bebida" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "FormaPagamento" (
    "id_forma_pagamento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_forma_pagamento" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id_endereco" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT,
    "bairro" TEXT,
    "cep" TEXT
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id_pedido" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dt_pedido" DATETIME NOT NULL,
    "id_forma_pagamento" INTEGER NOT NULL,
    "id_prato" INTEGER,
    "id_bebida" INTEGER,
    "id_forma_entrega" INTEGER NOT NULL,
    "id_endereco" INTEGER,
    CONSTRAINT "Pedido_id_forma_pagamento_fkey" FOREIGN KEY ("id_forma_pagamento") REFERENCES "FormaPagamento" ("id_forma_pagamento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_id_prato_fkey" FOREIGN KEY ("id_prato") REFERENCES "Prato" ("id_prato") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Pedido_id_bebida_fkey" FOREIGN KEY ("id_bebida") REFERENCES "Bebida" ("id_bebida") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Pedido_id_forma_entrega_fkey" FOREIGN KEY ("id_forma_entrega") REFERENCES "FormaEntrega" ("id_forma_entrega") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_id_endereco_fkey" FOREIGN KEY ("id_endereco") REFERENCES "Endereco" ("id_endereco") ON DELETE SET NULL ON UPDATE CASCADE
);
