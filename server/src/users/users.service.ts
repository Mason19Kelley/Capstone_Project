
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { CoursesService } from 'src/courses/courses.service';
import { Courses } from 'src/courses/courses.entity';
import { UpdateUser } from './UpdateUser.model';
import { CreateUserArgs } from './CreateUserArgs.model';


// user business logic class
@Injectable()
export class UsersService {
    constructor(
        private orgsService: OrganizationsService,
        private rolesService: RolesService,
        private courseService: CoursesService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,    
      ) {}
  // finds user by username
  async findUser(email: string): Promise<User | undefined> {
    const user = this.usersRepository.findOneBy({email})
    return user
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({id});
  }

    async getUsersByOrg(orgId: number): Promise<User[] | undefined>{
    return this.usersRepository.find({ where: { organization: Equal(orgId) } });
  }

  async getAdminByOrg(orgId: number): Promise<User[] | undefined>{
    const superAdmin = await this.rolesService.findRole(1);
    const admin = await this.rolesService.findRole(2);
    return this.usersRepository.find({ where: { organization: Equal(orgId), role: [superAdmin, admin]} });
  }

  async deleteUser(id:number): Promise<DeleteResult | undefined> {
    return this.usersRepository.delete({ id })
  }

  async addUsersToCourse(courseName: string, users: number[]){
    const course = await this.courseService.findCourseByName(courseName)
    const userEntities = await Promise.all(users.map( async (userId) => {
      return await this.usersRepository.findOneBy({id: userId})
    }));

    userEntities.forEach(async user => {
      if (!course.users.some(existingUser => existingUser.id === user.id)) {
          course.users.push(user);
          await this.courseService.addCourseCompletion(user.id, course.cid, 0, 0)
      }
  });

  return await this.courseService.save(course);

    
}

  // insert user into course
  async insertUserInCourse(cid: number, id: number) {
    const user = await this.usersRepository.findOne({relations: ['courses'], where: {id: id}});
    const course = await this.courseService.findCourseById(cid);
    
    // return if one doesnt exsist
    if(!user || !course){
      return;
    }

    // check to see if user is in the course already
    const alreadyIn = user.courses && user.courses.some((c) => c.cid === cid);
    if(!alreadyIn) {
      user.courses = user.courses || [];

      user.courses = [...user.courses, course]
      await this.usersRepository.save(user);
    } else {
      console.log("User is already in the course")
    }
  }

  // delete user from course
  async deleteUserInCourse(cid: number, id:number) {
    const user = await this.usersRepository.findOneBy({id});
    const course = await this.courseService.findCourseById(cid)

    if (user && course) {
      user.courses = user.courses || [];

      user.courses = user.courses.filter(curCourse => curCourse.cid !== cid);

      await this.usersRepository.save(user)
    }
  }

  // get courses a user is in
  async getCoursesById(uid: number): Promise<Courses[]> {
    const user = (await this.usersRepository.findOne({relations: ['courses'], where: {id: uid}}));

    
    if(!user) {
      return
    }

    const ret = user.courses;

    return ret as Courses[]
  }

  async insert(data) {
    const dataEntity = this.usersRepository.create(data)
    await this.usersRepository.insert(dataEntity)
  }

  async saveUserEntity(user: User){
    await this.usersRepository.save(user)
  }

  async updateUser(updatedUser: UpdateUser){
    let user = await this.findUserById(updatedUser.id)

    user.fullName = updatedUser.fullName
    user.email = updatedUser.email
    user.role = await this.rolesService.findRoleByName(updatedUser.role)

    this.usersRepository.save(user)
    return true
  }

  async createUser(newUser: CreateUserArgs){
    try {
      const userOrg = await this.orgsService.findOrg(newUser.orgId);
      const userRole = await this.rolesService.findRoleByName(newUser.role);
      const user = { fullName: newUser.fullName, email: newUser.email, password: null, organization: userOrg, role: userRole}
      const userEntity = this.usersRepository.create(user)
      await this.usersRepository.insert(userEntity)
      return userEntity;
    } catch(error){
      console.log(error)
    }
  }

  async getUsersWithCourseCompletion(orgId: number){
    try {
      const org = await this.orgsService.findOrg(orgId);
      const users = await this.usersRepository.findBy({organization: org})
      const completions = this.courseService.getUsersCompletions(users)
      return completions;
    } catch(error){
      console.log(error)
    }
  }
  
  // inserts a default users into db
  async seedUsers() {

    let users = await this.usersRepository.count();

    if(users > 0) return

    const hashedPass = await bcrypt.hash("password", 10);

    const organization1 = await this.orgsService.findOrg(1);
    const organization2 = await this.orgsService.findOrg(2);

    const superAdmin = await this.rolesService.findRole(1);
    const admin = await this.rolesService.findRole(2);
    const regularRole = await this.rolesService.findRole(3);

    const usersToSeed = [
      //{ username: 'username', password: hashedPass, organization: organization, role:role, email: "email", orgName: "orgName"}
      { fullName: 'John Smith', email: 'mkk020@latech.edu', password: hashedPass, organization: organization1, role: superAdmin},
      { fullName: 'Martha Johnson', email: 'mkk020+a@latech.edu', password: hashedPass, organization: organization1, role: admin},
      { fullName: 'Mason Kelley', email: 'mkk020+b@latech.edu', password: hashedPass, organization: organization1, role: regularRole},
      { fullName: 'Jacob Roberts', email: 'mkk020+c@latech.edu', password: hashedPass, organization: organization2, role: regularRole}
    ];

    const newUsers = this.usersRepository.create(usersToSeed);


    await this.usersRepository.insert(newUsers);
   
    
  }
}
