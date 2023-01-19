-- DropIndex
DROP INDEX "Book_id_key";

-- AlterTable
ALTER TABLE "Book" ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");
