package com.buymethat.server;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Order {
    final private String neederID;
    final private String providerID;
    final private String providerName;
    final private String neederFirstName;
    final private String NeederLastName;
    final private Integer id;
    final private String orderName;
    final private String orderDescription;
    final private String status;
    final private String time;
    final private String url;
    final private String notes;

    public Order(String neederID, String neederFirstName, String neederLastName, String orderName, String orderDescription, String url) {
        this.neederID = neederID;
        this.neederFirstName = neederFirstName;
        this.NeederLastName = neederLastName;
        this.url = url;
        this.notes = "";
        this.providerID = null;
        this.providerName = null;
        this.id = 0;
        this.orderDescription = orderDescription;
        this.orderName = orderName;
        this.status = "Open";
        this.time = constructDate();

    }

    private String constructDate() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm:ss yyyy/MM/dd");
        LocalDateTime now = LocalDateTime.now();
        return String.valueOf(dtf.format(now));
    }

    public String getOrderName() {return orderName;}

    public Integer getId() {
        return id;
    }

    public String getOrderDescription() {
        return orderDescription;
    }

    public String getStatus() {
        return status;
    }

    public String getNeederID() {
        return neederID;
    }

    public String getNeederFirstName() {
        return neederFirstName;
    }

    public String getNeederLastName() {
        return NeederLastName;
    }

    public String getTime() {
        return time;
    }

    public String getUrl() {
        return url;
    }

    public String getNotes() {
        return notes;
    }
}
