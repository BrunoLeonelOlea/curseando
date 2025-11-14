package com.pinapp.curseando.service;

import com.pinapp.curseando.exception.CourseNotFoundException;
import com.pinapp.curseando.exception.EnrollmentBusinessException;
import com.pinapp.curseando.model.Course;
import com.pinapp.curseando.model.Enrollment;
import com.pinapp.curseando.model.Student;
import com.pinapp.curseando.model.enums.EnrollmentStatus;
import com.pinapp.curseando.repository.CourseRepository;
import com.pinapp.curseando.repository.EnrollmentRepository;
import com.pinapp.curseando.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public Enrollment enrollStudent(Long courseId, String fullName, String email){
        var course = courseRepository.findById(courseId).orElseThrow(() -> new CourseNotFoundException(courseId));

        if(course.isFull()){
            throw new EnrollmentBusinessException("Course is full");
        }

        var student = studentRepository.findByEmail(email)
                .orElseGet(() -> {
                    Student newStudent = Student.builder()
                            .fullName(fullName)
                            .email(email)
                            .build();
                    return studentRepository.save(newStudent);
                });

        if(enrollmentRepository.existsByCourseIdAndStudentId(courseId, student.getId())){
            throw new EnrollmentBusinessException("Student is already enrolled in this course");
        }

        var enrollment = Enrollment.builder()
                .course(course)
                .student(student)
                .status(EnrollmentStatus.ACTIVE)
                .build();

        enrollmentRepository.save(enrollment);

        course.incrementEnrollment();
        courseRepository.save(course);

        return enrollment;
    }
}
