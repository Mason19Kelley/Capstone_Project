import { Injectable } from '@nestjs/common';
import { Courses } from './courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Equal, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

// logic for courses
@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Courses)
        private courseRepository: Repository<Courses>,
    ) {}

    // get course by id
    findCourseById(cid: number): Promise<Courses | undefined> {
        //console.log(cid)
        return this.courseRepository.findOneBy({cid})
    }

    // inserts default courses into seed
    async seedCourses() {
        let courses = await this.courseRepository.count();

        if(courses > 0) return

        const coursesToSeed = [
            { courseName: 'Default Name', instructor: 'Default Teacher'},
            { courseName: 'Test Course', instructor: 'Test Teacher'},
            { courseName: 'Dummy Course', instructor: 'Dummy Teacher'}
        ];

        const voteEntities = this.courseRepository.create(coursesToSeed)
        await this.courseRepository.insert(voteEntities)

    }
}
