package com.pinapp.curseando.model;

import com.pinapp.curseando.model.enums.Difficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String instructor;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @Column(nullable = false)
    private int capacity;

    private int enrolledCount;
    private String duration;

    @Version
    private Long version = 0L;

    public boolean isFull() {
        return this.enrolledCount >= this.capacity;
    }

    public void incrementEnrollment() {
        this.enrolledCount++;
    }
}
