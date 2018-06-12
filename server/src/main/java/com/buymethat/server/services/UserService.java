package com.buymethat.server.services;

import com.buymethat.server.VerifyIdentity;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

import static com.buymethat.db.tables.UsersTable.USERS_TABLE;

@Service
public class UserService {

    private DSLContext dsl;

    public UserService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public int userIdCount(String userId) {
        return dsl
                .selectCount()
                .from(USERS_TABLE)
                .where(USERS_TABLE.ID.eq(userId))
                .fetchOne(0, int.class);
    }

    public int postNewUser(String token) throws GeneralSecurityException, IOException {

        VerifyIdentity identity = new VerifyIdentity(token);

        return dsl.insertInto(USERS_TABLE)
                .set(USERS_TABLE.ID, identity.getId())
                .set(USERS_TABLE.EMAIL, identity.getEmail())
                .set(USERS_TABLE.USERTYPE, 0)
                .set(USERS_TABLE.FIRSTNAME, identity.getFirstName())
                .set(USERS_TABLE.LASTNAME, identity.getLastName())
                .execute();
    }

    public int getIdCount(String userId) {
        return dsl
                .selectCount()
                .from(USERS_TABLE)
                .where(USERS_TABLE.ID.eq(userId))
                .fetchOne(0, int.class);
    }

    public int getUserType(String userId) {
        return dsl
                .select(USERS_TABLE.USERTYPE)
                .from(USERS_TABLE)
                .where(USERS_TABLE.ID.eq(userId))
                .fetchOne(USERS_TABLE.USERTYPE);
    }

   /* public int postNewUser(User user) {
        return dsl
                .insertInto(USERS_TABLE)
                .set(USERS_TABLE.UUID, user.getId().toString())
                .set(USERS_TABLE.FIRSTNAME, user.getFirstName())
                .set(USERS_TABLE.LASTNAME, user.getLastName())
                .set(USERS_TABLE.USERNAME, user.getUserName())
                .set(USERS_TABLE.PASSWORD, user.getPassword())
                .set(USERS_TABLE.USERTYPE, user.getUserType())
                .execute();
    }

    public String getUserId(String userName) {
        return dsl
                .select(USERS_TABLE.UUID)
                .from(USERS_TABLE)
                .where(USERS_TABLE.USERNAME.eq(userName))
                .fetchOne(USERS_TABLE.UUID);
    }

    public int getUsernameCount(String userName) {
        return dsl
                .selectCount()
                .from(USERS_TABLE)
                .where(USERS_TABLE.USERNAME.eq(userName))
                .fetchOne(0, int.class);
    }



    public List<UsersTable> getUser(UUID userId) {
        return dsl
                .select()
                .from(USERS_TABLE)
                .where(USERS_TABLE.UUID.eq(userId.toString()))
                .fetch()
                .into(UsersTable.class);
    }
    */
}
