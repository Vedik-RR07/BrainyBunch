import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Enrollment {
  id: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childGrade: string;
  subject: string;
  format: "In-Person" | "Online Live" | "1-on-1 Dedicated";
  preferredTime: string;
  assessmentDate?: string;
  assessmentTime?: string;
  notes?: string;
  status: "Pending" | "Contacted" | "Approved" | "Enrolled" | "Archived";
  createdAt: string;
  confirmationCode: string;
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "Unread" | "Replied";
}

const DATA_DIR = path.join(process.cwd(), "data");
const ENROLLMENTS_FILE = path.join(DATA_DIR, "enrollments.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

// Helper to ensure data directory and initial storage exists
function initializeStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(ENROLLMENTS_FILE)) {
    const initialEnrollments: Enrollment[] = [
      {
        id: "enr_101",
        parentName: "Sarah Jenkins",
        parentEmail: "sarah.j@example.com",
        parentPhone: "(972) 555-0144",
        childName: "Ethan Jenkins",
        childGrade: "7th Grade",
        subject: "Mathematics",
        format: "In-Person",
        preferredTime: "Mon & Wed Afternoons (4:00 PM)",
        notes: "Needs help with Pre-Algebra and building math test confidence.",
        status: "Approved",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        confirmationCode: "BB-701-SJ",
      },
      {
        id: "enr_102",
        parentName: "Michael Rodriguez",
        parentEmail: "mrodriguez@example.com",
        parentPhone: "(214) 555-0188",
        childName: "Sophia Rodriguez",
        childGrade: "10th Grade",
        subject: "Coding & Computer Science",
        format: "Online Live",
        preferredTime: "Saturday Mornings (10:00 AM)",
        notes: "Interested in Python programming and problem solving.",
        status: "Pending",
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        confirmationCode: "BB-102-MR",
      },
      {
        id: "enr_103",
        parentName: "Priya Sharma",
        parentEmail: "priya.s@example.com",
        parentPhone: "(972) 555-0129",
        childName: "Aarav Sharma",
        childGrade: "4th Grade",
        subject: "English & Reading Comprehension",
        format: "1-on-1 Dedicated",
        preferredTime: "Tue & Thu Evenings (5:30 PM)",
        notes: "Looking to excel in reading vocabulary and writing skills.",
        status: "Enrolled",
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        confirmationCode: "BB-403-PS",
      },
    ];
    fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(initialEnrollments, null, 2));
  }

  if (!fs.existsSync(CONTACTS_FILE)) {
    const initialContacts: ContactInquiry[] = [
      {
        id: "cnt_201",
        name: "David Miller",
        email: "david.m@example.com",
        phone: "(469) 555-0172",
        subject: "Summer SAT Test Prep",
        message: "Hi, do you offer intensive SAT prep courses for high school juniors in Irving?",
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        status: "Replied",
      },
    ];
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(initialContacts, null, 2));
  }
}

function readEnrollments(): Enrollment[] {
  try {
    const data = fs.readFileSync(ENROLLMENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeEnrollments(data: Enrollment[]) {
  try {
    fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to write enrollments:", err);
  }
}

function readContacts(): ContactInquiry[] {
  try {
    const data = fs.readFileSync(CONTACTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeContacts(data: ContactInquiry[]) {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to write contacts:", err);
  }
}

async function startServer() {
  initializeStorage();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Get Statistics
  app.get("/api/stats", (req, res) => {
    const enrollments = readEnrollments();
    const total = enrollments.length;
    const pending = enrollments.filter((e) => e.status === "Pending").length;
    const enrolled = enrollments.filter((e) => e.status === "Enrolled" || e.status === "Approved").length;

    const inPerson = enrollments.filter((e) => e.format === "In-Person").length;
    const online = enrollments.filter((e) => e.format === "Online Live").length;
    const oneOnOne = enrollments.filter((e) => e.format === "1-on-1 Dedicated").length;

    const subjectCounts: Record<string, number> = {};
    enrollments.forEach((e) => {
      subjectCounts[e.subject] = (subjectCounts[e.subject] || 0) + 1;
    });

    res.json({
      total,
      pending,
      enrolled,
      formats: { inPerson, online, oneOnOne },
      subjectCounts,
    });
  });

  // API Route: Get All Enrollments
  app.get("/api/enrollments", (req, res) => {
    const { status, search } = req.query;
    let list = readEnrollments();

    if (status && typeof status === "string" && status !== "All") {
      list = list.filter((e) => e.status === status);
    }

    if (search && typeof search === "string") {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.parentName.toLowerCase().includes(q) ||
          e.childName.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.parentEmail.toLowerCase().includes(q) ||
          e.confirmationCode.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(list);
  });

  // API Route: Create Enrollment
  app.post("/api/enrollments", (req, res) => {
    const { parentName, parentEmail, parentPhone, childName, childGrade, subject, format, preferredTime, assessmentDate, assessmentTime, notes } = req.body;

    if (!parentName || !parentEmail || !childName || !childGrade || !subject || !format) {
      return res.status(400).json({ error: "Missing required fields for enrollment." });
    }

    const enrollments = readEnrollments();
    const id = "enr_" + Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const confirmationCode = `BB-${childGrade.replace(/[^0-9]/g, "") || "K12"}-${parentName.substring(0, 2).toUpperCase()}${randomSuffix}`;

    const newEnrollment: Enrollment = {
      id,
      parentName,
      parentEmail,
      parentPhone: parentPhone || "N/A",
      childName,
      childGrade,
      subject,
      format: format || "In-Person",
      preferredTime: preferredTime || "Flexible",
      assessmentDate: assessmentDate || "",
      assessmentTime: assessmentTime || "",
      notes: notes || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
      confirmationCode,
    };

    enrollments.unshift(newEnrollment);
    writeEnrollments(enrollments);

    res.status(201).json({
      message: "Enrollment application submitted successfully!",
      enrollment: newEnrollment,
    });
  });

  // API Route: Update Enrollment Status
  app.patch("/api/enrollments/:id", (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const enrollments = readEnrollments();
    const index = enrollments.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Enrollment record not found." });
    }

    if (status) enrollments[index].status = status;
    if (notes !== undefined) enrollments[index].notes = notes;

    writeEnrollments(enrollments);
    res.json({ message: "Enrollment updated successfully", enrollment: enrollments[index] });
  });

  // API Route: Delete Enrollment
  app.delete("/api/enrollments/:id", (req, res) => {
    const { id } = req.params;
    let enrollments = readEnrollments();
    const initialLen = enrollments.length;
    enrollments = enrollments.filter((e) => e.id !== id);

    if (enrollments.length === initialLen) {
      return res.status(404).json({ error: "Enrollment record not found." });
    }

    writeEnrollments(enrollments);
    res.json({ message: "Enrollment record deleted successfully." });
  });

  // API Route: Contact Inquiry
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const contacts = readContacts();
    const newInquiry: ContactInquiry = {
      id: "cnt_" + Date.now(),
      name,
      email,
      phone: phone || "N/A",
      subject: subject || "General Inquiry",
      message,
      createdAt: new Date().toISOString(),
      status: "Unread",
    };

    contacts.unshift(newInquiry);
    writeContacts(contacts);

    res.status(201).json({ message: "Message received! We will contact you shortly.", inquiry: newInquiry });
  });

  app.get("/api/contact", (req, res) => {
    const contacts = readContacts();
    res.json(contacts);
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Brainy Bunch Learning Academy server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
