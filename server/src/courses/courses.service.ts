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

        const data = {
            courseName : 'Course Name',
            modules : [
                {
                    moduleName : 'Module 1',
                    content : [
                        {
                            contentType : null,
                            fileType : null,
                            fileLocation : null,
                            fileName : null,
                            quizID : null,
                            Description : null
                        }]
                }
            ]
        }

        if(courses > 0) return

        const coursesToSeed = [
            { courseName: 'Default Name', instructor: 'Default Teacher', content: JSON.stringify(data)},
            { courseName: 'Test Course', instructor: 'Test Teacher', content: JSON.stringify(data)},
            { courseName: 'Dummy Course', instructor: 'Dummy Teacher', content: JSON.stringify(data)}
        ];

        const voteEntities = this.courseRepository.create(coursesToSeed)
        await this.courseRepository.insert(voteEntities)

    }
}
