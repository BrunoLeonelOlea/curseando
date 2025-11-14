package com.pinapp.curseando.enrollment;

import com.pinapp.curseando.model.Course;
import com.pinapp.curseando.model.enums.Difficulty;
import com.pinapp.curseando.repository.CourseRepository;
import com.pinapp.curseando.service.EnrollmentService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
public class ConcurrencyEnrollmentTest {

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private CourseRepository courseRepository;

    @Test
    void shouldPreventDoubleEnrollmentWhenCapacityIsFull() throws InterruptedException {
        var course = courseRepository.save(
                Course.builder()
                        .title("Concurrency 101")
                        .instructor("Bruno")
                        .capacity(1)
                        .enrolledCount(0)
                        .difficulty(Difficulty.BEGINNER)
                        .build()
        );

        // When: two users try to enroll at the same time
        Runnable task = () -> {
            try {
                enrollmentService.enrollStudent(course.getId(), "User", UUID.randomUUID() + "@mail.com");
            } catch (Exception e) {
                System.out.println(Thread.currentThread().getName() + " failed: " + e.getMessage());
            }
        };

        var t1 = new Thread(task, "Thread-1");
        var t2 = new Thread(task, "Thread-2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        Course updatedCourse = courseRepository.findById(course.getId()).orElseThrow();
        Assertions.assertEquals(1, updatedCourse.getEnrolledCount());
    }
}

