export interface Privilege {
  id: number;
  name: string;
  key: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  privileges: Privilege[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
  roles: Role[];
}

export interface CreateUserDto {
  username: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roleIds: number[];
}

export interface UpdateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  password?: string;
  roleIds: number[];
}

export interface CreateRoleDto {
  name: string;
  description: string;
  privilegeIds: number[];
}

export interface UpdateRoleDto {
  name: string;
  description: string;
  privilegeIds: number[];
}

export interface SystemDomain {
  key: string;
  name: string;
  viewPrivilege?: Privilege;
  editPrivilege?: Privilege;
}
