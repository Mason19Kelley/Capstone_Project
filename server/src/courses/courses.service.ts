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

    insertCourse(course: string, jsonInformation: string, instructor: string, organization: string){
        const courseEntity = this.courseRepository.create({courseName: course, jsonInformation: jsonInformation, instructor: instructor, organization: organization})
        return this.courseRepository.insert(courseEntity)
    }

    // get all courses
    getAllCourses() {

        const courseNames = this.courseRepository
        .createQueryBuilder('course') // 'course' is an alias for the Course entity
        .select(['course.courseName'])
        .getMany();

        return courseNames
    }

    //get one course
    async getOneCourse(course: string, org: string) {
        const courseEntity =  await this.courseRepository
        .createQueryBuilder('course')
        .select(['course.jsonInformation', 'course.instructor'])
        .where('course.courseName = :course AND course.organization = :org', {course: course, org: org})
        .getOne()

        console.log(courseEntity)

        return courseEntity
    }

    // delete course
    deleteCourse(course: string) {
        return this.courseRepository.delete({courseName: course})
    }

    // inserts default courses into seed
    async seedCourses() {
        let courses = await this.courseRepository.count();

        //temp json info
        const oshaInfo = {
            courseName : "OSHA",
            modules : [
                {
                    moduleName : "OSHA 1",
                    content : [
                        {
                            contentType : "Quiz",
                            fileType : null,
                            fileLocation :null,
                            fileName : null,
                            quizID : 7,
                            Description : null
                        }]
                },
                {
                  moduleName : "OSHA 2",
                  content : [
                      {
                          contentType : "Media",
                          fileType : "mp4",
                          fileLocation : "/here/there/everywhere",
                          fileName : "Sample Video",
                          quizID : null,
                          Description : "This is a sample video"
                      }]
                }
            ]
          }

          const cyberInfo = {
            courseName : "Cyber",
            modules : [
                {
                    moduleName : "Cyber 1",
                    content : [
                        {
                            contentType : "Media",
                            fileType : 'mp4',
                            fileLocation :'somewhere/over/the/rainbow',
                            fileName : 'this is hard work',
                            quizID : null,
                            Description : null
                        }]
                },
                {
                  moduleName : "Cyber 2",
                  content : [
                      {
                          contentType : "Media",
                          fileType : "mp4",
                          fileLocation : "/here/there/everywhere",
                          fileName : "Sample Video",
                          quizID : null,
                          Description : "This is a sample video"
                      }]
                }
            ]
          }

        if(courses > 0) return

        const coursesToSeed = [
            { courseName: 'Cyber', instructor: 'Mason', jsonInformation: JSON.stringify(cyberInfo), organization: 'Big Pharma' },
            { courseName: 'OSHA', instructor: 'Abigail', jsonInformation: JSON.stringify(oshaInfo), organization: 'Big Pharma' },
            { courseName: 'Forklift', instructor: 'Jacob', jsonInformation: JSON.stringify(cyberInfo),  organization: 'Big Pharma' },
            { courseName: 'Safety', instructor: 'Gabe', jsonInformation: JSON.stringify(oshaInfo),  organization: 'Amazon'}
        ];

        const voteEntities = this.courseRepository.create(coursesToSeed)
        await this.courseRepository.insert(voteEntities)

    }
}
