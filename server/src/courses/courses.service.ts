import { Injectable } from '@nestjs/common';
import { Courses } from './courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// logic for courses
@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Courses)
        private courseRepository: Repository<Courses>,
    ) {}

    // get course by id
    findCourse(id: number) {
        return this.courseRepository.findOneBy({id: id})
    }

    // inserts default courses into seed
    async seedCourses() {
        let courses = await this.courseRepository.count();

        if(courses > 0) return

        const coursesToSeed = [
            { courseName: 'Default Name'},
            { instructor: 'Default Teacher'}
        ];

        const voteEntities = this.courseRepository.create(coursesToSeed)
        await this.courseRepository.insert(voteEntities)

    }
}
