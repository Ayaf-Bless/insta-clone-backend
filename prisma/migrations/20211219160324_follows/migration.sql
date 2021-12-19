-- CreateTable
CREATE TABLE "_followRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_followRelation_AB_unique" ON "_followRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_followRelation_B_index" ON "_followRelation"("B");

-- AddForeignKey
ALTER TABLE "_followRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
