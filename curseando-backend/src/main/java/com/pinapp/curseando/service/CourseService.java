package com.pinapp.curseando.service;

import com.pinapp.curseando.exception.CourseNotFoundException;
import com.pinapp.curseando.model.Course;
import com.pinapp.curseando.model.enums.Difficulty;
import com.pinapp.curseando.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesByDifficulty(Difficulty difficulty) {
        return courseRepository.findByDifficulty(difficulty);
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException(id));
    }
}
