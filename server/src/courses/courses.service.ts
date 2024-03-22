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

    async findCourseByName(courseName: string): Promise<Courses | undefined> {
        //console.log(cid)
        return await this.courseRepository.findOneBy({courseName})
    }

    insertCourse(course: string, jsonInformation: string, instructor: string, organization: number){
        const courseEntity = this.courseRepository.create({courseName: course, jsonInformation: jsonInformation, instructor: instructor, organization_ID: organization})
        return this.courseRepository.insert(courseEntity)
    }

    async save(course: Courses) {
        return this.courseRepository.save(course)
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

    async getUsersInCourse(course: string) {
        const fullCourse = await this.courseRepository.findOneBy({courseName: course})
        const users = fullCourse.users
        return users
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
                    moduleID : '7c4b8214-42bb-4cc3-8015-3ad6f0874702',
                    content : [
                        {
                            contentType : "Quiz",
                            fileType : null,
                            fileName : null,
                            quizID : 7,
                            Description : null
                        }]
                },
                {
                  moduleName : "OSHA 2",
                  moduleID : '55642e05-40c5-4af9-a50f-c3cf4a20a0c3',
                  content : [
                      {
                          contentType : "Media",
                          fileType : "mp4",
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
                    moduleID : '1e6e19d8-e517-48f8-a556-161bb5d50c34',
                    content : [
                        {
                            contentType : "Media",
                            fileType : 'mp4',
                            fileName : 'this is hard work',
                            quizID : null,
                            Description : null
                        }]
                },
                {
                  moduleName : "Cyber 2",
                  moduleID : 'b082427f-14d7-4623-b519-448c8325098d',
                  content : [
                      {
                          contentType : "Media",
                          fileType : "mp4",
                          fileName : "Sample Video",
                          quizID : null,
                          Description : "This is a sample video"
                      }]
                }
            ]
          }

          const forkliftInfo = {
            courseName : "Forklift",
            modules : [
                {
                    moduleName : "Forklift 1",
                    moduleID : '7c4b8214-42bb-4cc3-8015-3ad6f0874702',
                    content : [
                        {
                            contentType : "Quiz",
                            fileType : null,
                            fileName : null,
                            quizID : 7,
                            Description : null
                        }]
                },
                {
                  moduleName : "Forklift 2",
                  moduleID : '55642e05-40c5-4af9-a50f-c3cf4a20a0c3',
                  content : [
                      {
                          contentType : "Media",
                          fileType : "mp4",
                          fileName : "Sample Video",
                          quizID : null,
                          Description : "This is a sample video"
                      }]
                }
            ]
          }

          const SafetyInfo = {
            courseName : "Safety",
            modules : [
                {
                    moduleName : "Safety 1",
                    moduleID : '7c4b8214-42bb-4cc3-8015-3ad6f0874702',
                    content : [
                        {
                            contentType : "Quiz",
                            fileType : null,
                            fileName : null,
                            quizID : 7,
                            Description : null
                        }]
                },
                {
                  moduleName : "Safety 2",
                  moduleID : '55642e05-40c5-4af9-a50f-c3cf4a20a0c3',
                  content : [
                      {
                          contentType : "Media",
                          fileType : "mp4",
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
            { courseName: 'Forklift', instructor: 'Jacob', jsonInformation: JSON.stringify(forkliftInfo),  organization_ID: 1 },
            { courseName: 'Safety', instructor: 'Gabe', jsonInformation: JSON.stringify(SafetyInfo),  organization_ID: 2 },
        ];

        const voteEntities = this.courseRepository.create(coursesToSeed)
        await this.courseRepository.insert(voteEntities)

    }
}
