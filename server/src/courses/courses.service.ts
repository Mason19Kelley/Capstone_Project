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

    insertCourse(course: string, jsonInformation: string, instructor: string, organization: number){
        const courseEntity = this.courseRepository.create({courseName: course, jsonInformation: jsonInformation, instructor: instructor, organization_ID: organization})
        return this.courseRepository.insert(courseEntity)
    }

    // get all courses

    getAllCourses(org_ID: number) {

        const courseNames = this.courseRepository
        .createQueryBuilder('course') // 'course' is an alias for the Course entity
        .select(['course.courseName'])
        .where('course.organization_ID = :org_ID', {org_ID: org_ID})
        .getMany();

        return courseNames
    }

    //get one course
    async getOneCourse(course: string, org: number) {
        const courseEntity =  await this.courseRepository
        .createQueryBuilder('course')
        .select(['course.jsonInformation', 'course.instructor'])
        .where('course.courseName = :course AND course.organization_ID = :org', {course: course, org: org})
        .getOne()

        return courseEntity
    }

    // delete course
    deleteCourse(course: string) {
        return this.courseRepository.delete({courseName: course})
    }

    // update course
    async updateCourse(courseName: string, oldCourseName:string, instructor: string, oldInstructorName: string): Promise<void> {
        const updateJSON = await this.courseRepository
        .createQueryBuilder('course')
        .select(['course.jsonInformation'])
        .where('course.courseName = :course', {course: oldCourseName})
        .getOne()

        const json = JSON.parse(updateJSON.jsonInformation)

        json.courseName = courseName


        const updateCourse = await this.courseRepository
            .createQueryBuilder()
            .update(Courses)
            .set({ instructor: instructor, courseName: courseName, jsonInformation: JSON.stringify(json)})
            .where("courseName = :oldcourseName AND instructor = :oldInstructorName", { oldcourseName: oldCourseName, oldInstructorName: oldInstructorName })
            .execute();

    }

    // update course json
    async updateCourseJSON(courseName: string, courseJSON: string): Promise<void> {
        const updateCourse = await this.courseRepository
            .createQueryBuilder()
            .update(Courses)
            .set({ jsonInformation: courseJSON})
            .where("courseName = :courseName", { courseName: courseName })
            .execute();
        console.log(updateCourse)
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
            { courseName: 'Cyber', instructor: 'Mason', jsonInformation: JSON.stringify(cyberInfo), organization_ID: 1 },
            { courseName: 'OSHA', instructor: 'Abigail', jsonInformation: JSON.stringify(oshaInfo), organization_ID: 1 },
            { courseName: 'Forklift', instructor: 'Jacob', jsonInformation: JSON.stringify(cyberInfo),  organization_ID: 1 },
            { courseName: 'Safety', instructor: 'Gabe', jsonInformation: JSON.stringify(oshaInfo),  organization_ID: 2 },
        ];

        const voteEntities = this.courseRepository.create(coursesToSeed)
        await this.courseRepository.insert(voteEntities)

    }
}
