-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "fields" JSONB,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
