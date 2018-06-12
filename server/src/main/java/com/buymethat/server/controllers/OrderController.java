package com.buymethat.server.controllers;

import com.buymethat.db.tables.pojos.OrdersTable;
import com.buymethat.server.Order;
import com.buymethat.server.VerifyIdentity;
import com.buymethat.server.services.OrderService;
import com.buymethat.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
public class OrderController {
    private final OrderService ordersService;
    private final UserService usersService;

    public OrderController(OrderService ordersService, UserService usersService) {
        this.ordersService = ordersService;
        this.usersService = usersService;
    }

    @RequestMapping(value = "/placeOrder", method = RequestMethod.POST)
    public ResponseEntity<?> placeOrder(@RequestBody String token, @RequestParam String orderName, @RequestParam String orderDescription, @RequestParam String orderUrl) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 1) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        Order order = new Order(identity.getId(), identity.getFirstName(), identity.getLastName(), orderName, orderDescription, orderUrl);
        int request = ordersService.postOrder(order);

        if(request == 1) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/getUserOrders", method = RequestMethod.POST)
    public ResponseEntity<List<OrdersTable>> getUserOrders(@RequestBody String token) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 1) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        List<OrdersTable> orders = ordersService.getUserOrders(identity.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @RequestMapping(value = "/getOpenOrders", method = RequestMethod.POST)
    public ResponseEntity<List<OrdersTable>> getOpenOrders(@RequestBody String token) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if (identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 1) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        int userType = usersService.getUserType(identity.getId());
        if(userType > 0) {
            return new ResponseEntity<>(ordersService.getOpenOrders(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/getOrder", method = RequestMethod.POST)
    public ResponseEntity<List<OrdersTable>> getOrder(@RequestBody String token, @RequestParam int orderId) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if (identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 1) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        int userType = usersService.getUserType(identity.getId());
        String orderNeeder = ordersService.getOrderNeeder(orderId);
        if (ordersService.getOrderCount(orderId) == 0) {return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}
        if (userType > 1 || orderNeeder.equals(identity.getId())) {
            return new ResponseEntity<>(ordersService.getOrder(orderId), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
