export enum Difficulty {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED"
  }

export type DifficultyFilter = Difficulty | "ALL";

export interface Course {
    id: number;
    title: string;
    instructor: string;
    description: string;
    difficulty: Difficulty;
    duration: string;
    capacity: number;
    enrolledCount: number;
  }
  