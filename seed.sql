CREATE TABLE "downloadables" (
        "id_number" SERIAL NOT NULL,
        "folder_name" TEXT NOT NULL,
        "download_link" TEXT NOT NULL,
        "active" BOOLEAN NOT NULL,
        PRIMARY KEY ("id_number")
);
