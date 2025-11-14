export interface Course {
    id: number;
    title: string;
    instructor: string;
    description: string;
    difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    duration: string;
    capacity: number;
    enrolledCount: number;
  }
  