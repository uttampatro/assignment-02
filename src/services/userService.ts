import axios from './axios';
import * as config from './../config/api';

export interface CreateUserDTO {
    name: string;
    phoneNumber: string;
    email: string;
    hobbies: string;
}

interface IUsersService {
    createUser(dto: CreateUserDTO): Promise<any>;
    getAllUser(): Promise<any[]>;
    deleteUser(id: any): Promise<any>;
    updateUser(id: any, dto: CreateUserDTO): Promise<any>;
}

export class UserService implements IUsersService {
    async createUser(dto: CreateUserDTO): Promise<any> {
        const { name, phoneNumber, email, hobbies } = dto;
        try {
            const response = await axios.post(
                `${config.apiConfig.baseUrl}/v1/createUser`,
                {
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email,
                    hobbies: hobbies,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllUser(): Promise<any> {
        try {
            const response = await axios.get(
                `${config.apiConfig.baseUrl}/v1/getUserList`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteUser(id: any): Promise<any> {
        try {
            const response = await axios.delete(
                `${config.apiConfig.baseUrl}/v1/deleteUser/${id}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async updateUser(id: any, dto: CreateUserDTO): Promise<any> {
        try {
            const { name, phoneNumber, email, hobbies } = dto;
            const response = await axios.put(
                `${config.apiConfig.baseUrl}/v1/updateUser/${id}`,
                {
                    name,
                    phoneNumber,
                    email,
                    hobbies,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserService();
