export function getDashboardStats(students) {
  const total = students.length;
  const boys = students.filter((student) => student.gender === "Boy").length;
  const girls = students.filter((student) => student.gender === "Girl").length;
  const attendance = total
    ? Math.round(students.reduce((sum, student) => sum + Number(student.attendance), 0) / total)
    : 0;

  return { total, boys, girls, attendance };
}

export function getGradeData(students) {
  return ["Grade 7", "Grade 8", "Grade 9", "Grade 10"].map((grade) => ({
    grade,
    students: students.filter((student) => student.grade === grade).length
  }));
}

export function getGenderData(students) {
  return [
    { name: "Boys", count: students.filter((student) => student.gender === "Boy").length },
    { name: "Girls", count: students.filter((student) => student.gender === "Girl").length }
  ];
}

export function getClassStats(students) {
  return getGradeData(students).map((item) => {
    const gradeStudents = students.filter((student) => student.grade === item.grade);
    const attendance = gradeStudents.length
      ? Math.round(
          gradeStudents.reduce((sum, student) => sum + Number(student.attendance), 0) /
            gradeStudents.length
        )
      : 0;

    return { ...item, attendance };
  });
}
