-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'published',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "session" TEXT NOT NULL DEFAULT 'morning',
    "marketConditions" TEXT NOT NULL DEFAULT '',
    "emotion" TEXT,
    "energyLevel" INTEGER NOT NULL DEFAULT 5,
    "confidence" INTEGER NOT NULL DEFAULT 5,
    "discipline" INTEGER NOT NULL DEFAULT 5,
    "psychologyNotes" TEXT NOT NULL DEFAULT '',
    "triggers" TEXT NOT NULL DEFAULT '[]',
    "planFollowed" BOOLEAN NOT NULL DEFAULT true,
    "entryTiming" INTEGER NOT NULL DEFAULT 3,
    "exitTiming" INTEGER NOT NULL DEFAULT 3,
    "riskManagement" INTEGER NOT NULL DEFAULT 3,
    "mistake" TEXT,
    "mistakeNote" TEXT NOT NULL DEFAULT '',
    "lessonLearned" TEXT NOT NULL DEFAULT '',
    "aiSummary" TEXT,
    "aiScore" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "target" REAL NOT NULL,
    "current" REAL NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'trades',
    "deadline" DATETIME,
    "category" TEXT NOT NULL DEFAULT 'performance',
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Playbook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "direction" TEXT NOT NULL DEFAULT 'long',
    "entryRules" TEXT NOT NULL DEFAULT '[]',
    "exitRules" TEXT NOT NULL DEFAULT '[]',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "winRate" REAL NOT NULL DEFAULT 0,
    "totalTrades" INTEGER NOT NULL DEFAULT 0,
    "pnl" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Playbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
