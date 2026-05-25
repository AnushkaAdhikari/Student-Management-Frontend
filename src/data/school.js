export const teachers = [
  { id: 1, name: "Milan Adhikari", subject: "Mathematics", classTeacher: "Grade 10 A", phone: "984-120-3355", status: "Active" },
  { id: 2, name: "Sabina Shrestha", subject: "Science", classTeacher: "Grade 9 B", phone: "981-440-7120", status: "Active" },
  { id: 3, name: "Dinesh Tamang", subject: "English", classTeacher: "Grade 8 A", phone: "980-224-6611", status: "On Leave" },
  { id: 4, name: "Asmita Rai", subject: "Social Studies", classTeacher: "Grade 7 C", phone: "986-772-9340", status: "Active" }
];

export const feeRecords = [
  { roll: "10A-01", month: "May", amount: 5200, status: "Paid", dueDate: "2026-05-10" },
  { roll: "9B-04", month: "May", amount: 4800, status: "Due", dueDate: "2026-05-10" },
  { roll: "8A-07", month: "May", amount: 4500, status: "Paid", dueDate: "2026-05-10" },
  { roll: "10C-02", month: "May", amount: 5200, status: "Partial", dueDate: "2026-05-10" },
  { roll: "7A-03", month: "May", amount: 4200, status: "Paid", dueDate: "2026-05-10" },
  { roll: "8B-11", month: "May", amount: 4500, status: "Due", dueDate: "2026-05-10" }
];

export const examResults = [
  { roll: "10A-01", exam: "Mid Term", math: 94, science: 91, english: 88 },
  { roll: "9B-04", exam: "Mid Term", math: 86, science: 89, english: 92 },
  { roll: "8A-07", exam: "Mid Term", math: 79, science: 83, english: 87 },
  { roll: "10C-02", exam: "Mid Term", math: 72, science: 76, english: 81 },
  { roll: "7A-03", exam: "Mid Term", math: 91, science: 87, english: 90 },
  { roll: "8B-11", exam: "Mid Term", math: 68, science: 74, english: 70 }
];

export const timetableByGrade = {
  "Grade 7": [
    { day: "Sunday", p1: "English", p2: "Math", p3: "Nepali", p4: "Science", p5: "Art" },
    { day: "Monday", p1: "Social", p2: "English", p3: "Computer", p4: "Math", p5: "Sports" },
    { day: "Tuesday", p1: "Science", p2: "Nepali", p3: "Math", p4: "English", p5: "Library" },
    { day: "Wednesday", p1: "Math", p2: "Social", p3: "Science", p4: "Computer", p5: "Art" },
    { day: "Thursday", p1: "Nepali", p2: "Science", p3: "English", p4: "Math", p5: "Club" }
  ],
  "Grade 8": [
    { day: "Sunday", p1: "Math", p2: "Science", p3: "English", p4: "Computer", p5: "Sports" },
    { day: "Monday", p1: "English", p2: "Social", p3: "Math", p4: "Science", p5: "Library" },
    { day: "Tuesday", p1: "Science", p2: "Math", p3: "Nepali", p4: "English", p5: "Art" },
    { day: "Wednesday", p1: "Computer", p2: "Math", p3: "Science", p4: "Social", p5: "Club" },
    { day: "Thursday", p1: "Nepali", p2: "English", p3: "Math", p4: "Science", p5: "Revision" }
  ],
  "Grade 9": [
    { day: "Sunday", p1: "Science", p2: "Math", p3: "English", p4: "Account", p5: "Computer" },
    { day: "Monday", p1: "Math", p2: "Optional Math", p3: "Nepali", p4: "Science", p5: "Sports" },
    { day: "Tuesday", p1: "English", p2: "Social", p3: "Math", p4: "Computer", p5: "Library" },
    { day: "Wednesday", p1: "Account", p2: "Science", p3: "English", p4: "Optional Math", p5: "Club" },
    { day: "Thursday", p1: "Nepali", p2: "Math", p3: "Science", p4: "Social", p5: "Revision" }
  ],
  "Grade 10": [
    { day: "Sunday", p1: "Optional Math", p2: "Science", p3: "English", p4: "Math", p5: "Computer" },
    { day: "Monday", p1: "Math", p2: "English", p3: "Science", p4: "Account", p5: "Library" },
    { day: "Tuesday", p1: "Science", p2: "Optional Math", p3: "Nepali", p4: "Math", p5: "Sports" },
    { day: "Wednesday", p1: "English", p2: "Science", p3: "Computer", p4: "Social", p5: "Revision" },
    { day: "Thursday", p1: "Math", p2: "Nepali", p3: "Optional Math", p4: "Science", p5: "Test Prep" }
  ]
};

export const notices = [
  { id: 1, title: "Parent meeting", date: "2026-05-29", audience: "Grades 7-10", priority: "High" },
  { id: 2, title: "Mid-term result review", date: "2026-06-02", audience: "Teachers", priority: "Normal" },
  { id: 3, title: "Sports week registration", date: "2026-06-08", audience: "Students", priority: "Normal" },
  { id: 4, title: "Library book return deadline", date: "2026-06-12", audience: "All", priority: "Low" }
];

export const admissions = [
  { id: 1, name: "Ishan Bhandari", applyingFor: "Grade 7", guardian: "Nirmala Bhandari", status: "Pending" },
  { id: 2, name: "Kriti Maharjan", applyingFor: "Grade 8", guardian: "Sanjay Maharjan", status: "Approved" },
  { id: 3, name: "Bibek Ghimire", applyingFor: "Grade 9", guardian: "Laxmi Ghimire", status: "Review" },
  { id: 4, name: "Sakshi Lama", applyingFor: "Grade 7", guardian: "Nima Lama", status: "Pending" }
];

export const libraryIssues = [
  { roll: "10A-01", book: "Algebra Practice", issueDate: "2026-05-05", dueDate: "2026-05-28", status: "Issued" },
  { roll: "9B-04", book: "Science Workbook", issueDate: "2026-05-03", dueDate: "2026-05-24", status: "Overdue" },
  { roll: "8A-07", book: "English Reader", issueDate: "2026-05-12", dueDate: "2026-06-02", status: "Issued" },
  { roll: "7A-03", book: "Nepali Stories", issueDate: "2026-05-15", dueDate: "2026-06-05", status: "Returned" }
];
