import { User } from '../types';

const MOCK_USERS = [
    {
        id: '1',
        email: 'admin@blackbox.com',
        username: 'admin',
        password: 'admin123',
        name: 'Administrador',
        role: 'admin',
        avatar: null
    },
    {
        id: '2',
        email: 'test@example.com',
        username: 'testuser',
        password: 'test123',
        name: 'Usuario Test',
        role: 'user',
        avatar: null
    },
    {
        id: '3',
        email: 'user@demo.com',
        username: 'demouser',
        password: 'demo123',
        name: 'Usuario Demo',
        role: 'user',
        avatar: null
    }
];

export const authMock = {
    async login(email: string, password: string) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = MOCK_USERS.find(u =>
            u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!user) {
            throw new Error('Credenciales incorrectas');
        }

        const { password: _, role, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token: 'mock-jwt-token-' + Date.now()
        };
    },

    async register(userData: any) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const existingUser = MOCK_USERS.find(u =>
            u.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (existingUser) {
            throw new Error('El correo ya está registrado');
        }

        const newUser: User = {
            id: String(MOCK_USERS.length + 1),
            email: userData.email,
            username: userData.username || userData.email.split('@')[0],
            name: userData.name,
            avatar: null
        };

        return {
            user: newUser,
            token: 'mock-jwt-token-' + Date.now()
        };
    },

    getTestUsers() {
        return MOCK_USERS.map(u => ({
            email: u.email,
            password: u.password,
            name: u.name,
            username: u.username
        }));
    }
};
