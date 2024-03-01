const tableName = 'user';
const cryptoJs = require('crypto-js');
const secret = "secret"

class UserDatabase {
    constructor(db) {
        this.db = db;
    }

    async createUser(postBody) {
        const hash = cryptoJs.AES.encrypt(postBody.password.toString(), secret).toString();
        const user = await this.db.from(tableName).insert({ ...postBody, password: hash }).select('*').maybeSingle();
        console.log("user", user);
        if (!user.data) {
            throw user?.error?.message;
        }
        return user;
    }

    async login(postBody) {
        if (postBody.email && postBody.password) {
            const decrypt_password = await supabase
                .from("user").select("*").eq("email", email)
            var decrypted = cryptoJs.AES.decrypt(decrypt_password?.data[0].password, secret).toString(cryptoJs.enc.Utf8);
            if (!(decrypted === password)) {
                res.send("invalid user")
            }
            res.send(decrypt_password)
        }
    }

    async updateUser(postBody, id) {
        const user = await this.db.from(tableName).update(postBody).eq("id", id).select("*").maybeSingle()
        if (!user.data) {
            throw user?.error?.message;
        }
        return user;
    }
    async login(postBody) {
        try {
            const decrypt_password = await this.db.from(tableName).select("*").eq("email", postBody.email)
            var decrypted = cryptoJs.AES.decrypt(decrypt_password?.data[0].password, secret).toString(cryptoJs.enc.Utf8);
            if (!(decrypted === postBody.password)) {
                console.log("invalid user")
                return false
            }
            return decrypt_password
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(page, limit) {
        const pageNumber = parseInt(page) || 1;
        const itemsPerPage = parseInt(limit) || 10;

        const user = await this.db.from(tableName).select("*", { count: "exact" })
            .range((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage - 1)

        if (user) {
            const totalPages = Math.ceil(user.count / itemsPerPage);

            const data = {
                ...user,
                metadata: {
                    page: pageNumber,
                    perPage: itemsPerPage,
                    totalPages,
                    totalCount: user.count
                }
            }
            return data

        } else {
            throw user?.error?.message || `user not found`;
        }
    }
}

module.exports = UserDatabase;
