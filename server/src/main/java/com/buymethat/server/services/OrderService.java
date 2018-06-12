package com.buymethat.server.services;

import com.buymethat.db.tables.pojos.OrdersTable;
import com.buymethat.db.tables.UsersTable;
import com.buymethat.server.Order;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.buymethat.db.tables.OrdersTable.ORDERS_TABLE;
import static com.buymethat.db.tables.UsersTable.USERS_TABLE;

@JsonSerialize
@Service
public class OrderService {

    private DSLContext dsl;

    public OrderService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public int postOrder(Order order) {
        return dsl
                .insertInto(ORDERS_TABLE)
                .set(ORDERS_TABLE.NAME, order.getOrderName())
                .set(ORDERS_TABLE.DESCRIPTION, order.getOrderDescription())
                .set(ORDERS_TABLE.STATUS, order.getStatus())
                .set(ORDERS_TABLE.NEEDERID, order.getNeederID())
                .set(ORDERS_TABLE.FIRSTNAME, order.getNeederFirstName())
                .set(ORDERS_TABLE.LASTNAME, order.getNeederLastName())
                .set(ORDERS_TABLE.URL, order.getUrl())
                .set(ORDERS_TABLE.TIME, String.valueOf(order.getTime()))
                .execute();
    }

    public List<OrdersTable> getUserOrders(String userId) {
        return dsl
                .select()
                .from(ORDERS_TABLE)
                .where(ORDERS_TABLE.NEEDERID.eq(userId))
                .fetch()
                .into(OrdersTable.class);
    }


    
    public List<OrdersTable> getOpenOrders() {
        return dsl
                .select()
                .from(ORDERS_TABLE)
                .where(ORDERS_TABLE.STATUS.eq("Open"))
                .fetch()
                .into(OrdersTable.class);
    }

    public String getOrderNeeder(int orderId) {
        return dsl
                .select(ORDERS_TABLE.NEEDERID)
                .from(ORDERS_TABLE)
                .where(ORDERS_TABLE.ID.eq(orderId))
                .fetchOne(ORDERS_TABLE.NEEDERID);
    }

    public List<OrdersTable> getOrder(int orderId) {
        return dsl
                .select()
                .from(ORDERS_TABLE)
                .where(ORDERS_TABLE.ID.eq(orderId))
                .fetch()
                .into(OrdersTable.class);
    }

    public int getOrderCount(int orderId) {
        return dsl
                .selectCount()
                .from(ORDERS_TABLE)
                .where(ORDERS_TABLE.ID.eq(orderId))
                .fetchOne(0, int.class);
    }

    public String getOrderStatus(int orderId) {
        return dsl
                .select(ORDERS_TABLE.STATUS)
                .from(ORDERS_TABLE)
                .where(ORDERS_TABLE.ID.eq(orderId))
                .fetchOne(ORDERS_TABLE.STATUS);
    }
}

