import { z } from "zod";

import rawStudentsGrades from "./students-grades.json";

const subjectCategoriesSchema = z.enum([
  "Chemistry",
  "Biology",
  "Math",
  "Informatics",
  "Physics",
  "Geography",
]);

const studentsGradesSchema = z.object({
  subjectCategories: z.array(subjectCategoriesSchema).min(1),
  subjectGrades: z.record(
    z.string(),
    z.record(z.string(), z.number())
  ),
});

const parsed = studentsGradesSchema.safeParse(rawStudentsGrades);

if (!parsed.success) {
  throw new Error(
    "Invalid training requirements JSON structure. Check training-requirements.json."
  );
}

const MIN_SCORES = 0;
const MAX_SCORES = 100;

const warnings: string[] = [];

function clampGrades(value: unknown, studentName: string, category: string) {
  const grades = Number(value);

  if (!Number.isFinite(grades)) {
    warnings.push(`${studentName}.${category}: invalid value "${value}"; using 0.`);
    return 0;
  }

  if (grades < MIN_SCORES) {
    warnings.push(
      `${studentName}.${category}: ${grades} is below ${MIN_SCORES}; using ${MIN_SCORES}.`
    );
    return MIN_SCORES;
  }

  if (grades > MAX_SCORES) {
    warnings.push(
      `${studentName}.${category}: ${grades} is above ${MAX_SCORES}; using ${MAX_SCORES}.`
    );
    return MAX_SCORES;
  }

  return grades;
}

const validatedSubjectGrades = Object.fromEntries(
  Object.entries(parsed.data.subjectGrades).map(([studentName, subjectCategories]) => [
    studentName,
    Object.fromEntries(
      Object.entries(subjectCategories).map(([category, grades]) => [
        category,
        clampGrades(grades, studentName, category),
      ])
    ),
  ])
);

export const validatedCategories = parsed.data.subjectCategories;

export const selectedSubjectGrades = Object.keys(validatedSubjectGrades);

export const validationWarnings = warnings;

export const radarData = validatedCategories.map((category) => {
  const row: Record<string, string | number> = {
    subject: category,
  };

  for (const studentName of selectedSubjectGrades) {
    row[studentName] = validatedSubjectGrades[studentName][category];
  }

  return row;
});

const seriesColors = ["#f48108", "#229117", "#1f48e1"];

export const series = selectedSubjectGrades.map((studentName, index) => ({
  name: studentName,
  dataKey: studentName,
  color: seriesColors[index % seriesColors.length],
}));
