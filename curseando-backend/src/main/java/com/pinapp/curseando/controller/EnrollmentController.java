package com.pinapp.curseando.controller;

import com.pinapp.curseando.dto.EnrollmentRequest;
import com.pinapp.curseando.model.Enrollment;
import com.pinapp.curseando.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<Enrollment> enrollStudent(@PathVariable Long courseId, @Valid @RequestBody EnrollmentRequest request){
        return ResponseEntity.ok(enrollmentService.enrollStudent(courseId, request.getFullName(), request.getEmail()));
    }
}
