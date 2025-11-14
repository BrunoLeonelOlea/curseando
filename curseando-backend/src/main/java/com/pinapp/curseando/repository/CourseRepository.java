package com.pinapp.curseando.repository;

import com.pinapp.curseando.model.Course;
import com.pinapp.curseando.model.enums.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByDifficulty(Difficulty difficulty);
}
