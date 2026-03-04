-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Succulent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inStock" INTEGER NOT NULL,
    "reservationId" TEXT,

    CONSTRAINT "Succulent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "succulentId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Succulent_name_key" ON "Succulent"("name");

-- AddForeignKey
ALTER TABLE "Succulent" ADD CONSTRAINT "Succulent_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_succulentId_fkey" FOREIGN KEY ("succulentId") REFERENCES "Succulent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
