export interface EnrollmentRequest {
  fullName: string;
  email: string;
}

export interface Student {
  id: number;
  fullName: string;
  email: string;
}

export interface Enrollment {
  id: number;
  course: {
    id: number;
    title: string;
    instructor: string;
    description: string;
    difficulty: string;
    capacity: number;
    enrolledCount: number;
    duration: string;
  };
  student: Student;
  status: string;
  enrolledAt: string;
}
  