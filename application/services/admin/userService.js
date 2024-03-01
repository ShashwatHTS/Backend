class UserService {
    constructor(UserDatabase) {
        this.UserDatabase = UserDatabase;
    }

    async createUser(postBody) {
        const user = await this.UserDatabase.createUser(postBody);
        if (!user) {
            throw new Error(`user not found`);
        }
        return user;
    }
    async login (postBody) {
        const user = await this.UserDatabase.login(postBody);
        if (!user) {
            throw new Error(`user not found`);
        }
        return user;
    }

    async getUser(page, limit) {
        const user = await this.UserDatabase.getUser(page, limit);
        if (!user) {
            throw new Error(`user not found`);
        }
        return user;
    }

    async updateUser(postBody, id) {
        // console.log("postBody", postBody, id)
        const user = await this.UserDatabase.updateUser(postBody, id);
        if (!user) {
            throw new Error(`user not found`);
        }
        return user;
    }

    
}

module.exports = { UserService };