import { Organization } from "./organization.model";
import { Role } from "./role.model";
import { Courses } from "./courses.model";

export interface User {
    id: number | undefined;
    username: string | undefined;
    email: string | undefined;
    organization: Organization | undefined;
    role: Role | undefined;
    courses: Courses | undefined;
}