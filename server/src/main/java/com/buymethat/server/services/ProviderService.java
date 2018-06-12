package com.buymethat.server.services;

import com.buymethat.db.tables.ExampleTable;
import static com.buymethat.db.tables.OrdersTable.ORDERS_TABLE;

import com.buymethat.db.tables.pojos.OrdersTable;
import com.buymethat.server.Order;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProviderService {

    private DSLContext dsl;

    public ProviderService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public int postOrderClaim(String providerId, String providerName, int orderId) {
        return dsl
                .update(ORDERS_TABLE)
                .set(ORDERS_TABLE.STATUS, "Accepted")
                .set(ORDERS_TABLE.PROVIDERID, providerId)
                .set(ORDERS_TABLE.PROVIDERNAME, providerName)
                .where(ORDERS_TABLE.ID.eq(orderId))
                .execute();
    }

    public int postOrderFlag(String providerId, String providerName, int orderId) {
        return dsl
                .update(ORDERS_TABLE)
                .set(ORDERS_TABLE.STATUS, "Flagged for Admin approval")
                .set(ORDERS_TABLE.PROVIDERID, providerId)
                .set(ORDERS_TABLE.PROVIDERNAME, providerName)
                .where(ORDERS_TABLE.ID.eq(orderId))
                .execute();
    }

    public List<OrdersTable> getManagedOrders(String providerId) {
        return dsl
                .select()
                .from(ORDERS_TABLE)
                .where(ORDERS_TABLE.PROVIDERID.eq(providerId))
                .andNot(ORDERS_TABLE.STATUS.eq("Open"))
                .andNot(ORDERS_TABLE.STATUS.eq("Closed"))
                .andNot(ORDERS_TABLE.STATUS.eq("Declined"))
                .fetch()
                .into(OrdersTable.class);
    }

    public int updateOrderStatus(String newStatus, int orderId) {
        return dsl
                .update(ORDERS_TABLE)
                .set(ORDERS_TABLE.STATUS, newStatus)
                .where(ORDERS_TABLE.ID.eq(orderId))
                .execute();
    }

}
