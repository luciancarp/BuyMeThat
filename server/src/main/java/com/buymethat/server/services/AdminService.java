package com.buymethat.server.services;

import com.buymethat.db.tables.pojos.OrdersTable;
import com.buymethat.db.tables.pojos.UsersTable;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.buymethat.db.tables.OrdersTable.ORDERS_TABLE;
import static com.buymethat.db.tables.UsersTable.USERS_TABLE;

@Service
public class AdminService {
    private DSLContext dsl;

    public AdminService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public int postUpdateUserType(String email, int newUserType) {
        return dsl
                .update(USERS_TABLE)
                .set(USERS_TABLE.USERTYPE, newUserType)
                .where(USERS_TABLE.EMAIL.eq(email))
                .execute();
    }

    public List<OrdersTable> getFlaggedOrders() {
        return dsl
                .select()
                .from(ORDERS_TABLE)
                .where(ORDERS_TABLE.STATUS.eq("Flagged for Admin approval"))
                .fetch()
                .into(OrdersTable.class);
    }

    public List<UsersTable> getUnapprovedUsers() {
        return dsl
                .select()
                .from(USERS_TABLE)
                .where(USERS_TABLE.USERTYPE.eq(0))
                .fetch()
                .into(UsersTable.class);
    }
    public List<UsersTable> getApprovedUsers(String userId) {
        return dsl
                .select()
                .from(USERS_TABLE)
                .where(USERS_TABLE.USERTYPE.gt(0))
                .andNot(USERS_TABLE.ID.eq(userId))
                .fetch()
                .into(UsersTable.class);
    }

    public int deleteUser(String userId) {
        return dsl
                .delete(USERS_TABLE)
                .where(USERS_TABLE.ID.eq(userId))
                .execute();
    }

    public int renameOrdersWhereNeeder(String neederId) {
        return dsl
                .update(ORDERS_TABLE)
                .set(ORDERS_TABLE.NEEDERID, "000000000000000000000")
                .set(ORDERS_TABLE.FIRSTNAME, "User")
                .set(ORDERS_TABLE.LASTNAME, "Deleted")
                .where(ORDERS_TABLE.NEEDERID.eq(neederId))
                .execute();
    }

    public int renameOrdersWhereProvider(String providerId) {
        return dsl
                .update(ORDERS_TABLE)
                .set(ORDERS_TABLE.PROVIDERID, "000000000000000000000")
                .set(ORDERS_TABLE.PROVIDERNAME, "User Deleted")
                .where(ORDERS_TABLE.PROVIDERID.eq(providerId))
                .execute();
    }


}
