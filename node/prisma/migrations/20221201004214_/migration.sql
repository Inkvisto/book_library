-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" JSONB
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_id_key" ON "Book"("id");
