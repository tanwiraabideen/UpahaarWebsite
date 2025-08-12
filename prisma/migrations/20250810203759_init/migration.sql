-- CreateTable
CREATE TABLE "public"."Story" (
    "storyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Story_pkey" PRIMARY KEY ("storyId")
);
