const tableName = 'role';



class RoleDatabase {
    constructor(db) {
        this.db = db;
    }

    async createRole(postBody) {
        const role = await this.db.from(tableName).insert({ ...postBody }).select('*').maybeSingle();
        
        if (!role.data) {
            throw role?.error?.message;
        }
        return role;
    }

    async getRole() {
        let role = await this.db.from(tableName).select("*");
        if (!role.data) {
            throw role?.error?.message;
        }
        return role;
    }

    async updateRole(postBody, id) {
        const role = await this.db.from(tableName).update(postBody).eq("id", id).select("*").maybeSingle()
        if (!role.data) {
            throw role?.error?.message;
        }
        return role;
    }
}

module.exports = RoleDatabase;
