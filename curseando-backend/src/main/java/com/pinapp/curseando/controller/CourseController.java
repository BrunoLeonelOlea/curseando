package com.pinapp.curseando.controller;

import com.pinapp.curseando.model.Course;
import com.pinapp.curseando.model.enums.Difficulty;
import com.pinapp.curseando.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses(@RequestParam(required = false) Difficulty difficulty) {
        List<Course> courses = (difficulty != null)
                ? courseService.getCoursesByDifficulty(difficulty)
                : courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable long id){
        var course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }


}
