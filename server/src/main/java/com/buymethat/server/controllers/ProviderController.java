package com.buymethat.server.controllers;

import com.buymethat.server.VerifyIdentity;
import com.buymethat.server.services.OrderService;
import com.buymethat.server.services.ProviderService;
import com.buymethat.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
public class ProviderController {
    private final ProviderService providerService;
    private final OrderService orderService;
    private final UserService userService;

    public ProviderController(ProviderService providerService, OrderService orderService, UserService userService) {
        this.providerService = providerService;
        this.orderService = orderService;
        this.userService = userService;
    }

    @RequestMapping(value = "/claimOrder", method = RequestMethod.POST)
    public ResponseEntity<?> claimOrder(@RequestBody String token, @RequestParam int orderId) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(userService.getUserType(identity.getId()) < 2) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if (orderService.getOrderStatus(orderId).equals("Open")) {
            int response = providerService.postOrderClaim(identity.getId(), (identity.getFirstName() +" " + identity.getLastName()), orderId);
            if (response == 1) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/flagOrder", method = RequestMethod.POST)
    public ResponseEntity<?> flagOrder(@RequestBody String token, @RequestParam int orderId) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(userService.getUserType(identity.getId()) < 2) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if (orderService.getOrderStatus(orderId).equals("Open")) {
            int response = providerService.postOrderFlag(identity.getId(), (identity.getFirstName() +" " + identity.getLastName()), orderId);
            if (response == 1) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/getManagedOrders", method = RequestMethod.POST)
    public ResponseEntity<?> getManagedOrders(@RequestBody String token) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(userService.getUserType(identity.getId()) < 2) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        return new ResponseEntity<>(providerService.getManagedOrders(identity.getId()), HttpStatus.OK);
    }

    @RequestMapping(value = "/updateOrderStatus", method = RequestMethod.POST)
    public ResponseEntity<?> updateOrderStatus(@RequestBody String token, @RequestParam int orderId, @RequestParam int statusId) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(userService.getUserType(identity.getId()) < 2) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        String newStatus;
        if(statusId == 1) {
            newStatus = "Approved by Admin";
        }
        else if(statusId == 2) {
            newStatus = "Ordered";
        }
        else if(statusId == 3) {
            newStatus = "Delivered";
        }
        else if(statusId == 4) {
            newStatus = "Closed";
        }
        else if(statusId == 5) {
            newStatus = "Flagged for Admin approval";
        }
        else if(statusId == 6) {
            newStatus = "Declined";
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(providerService.updateOrderStatus(newStatus, orderId), HttpStatus.OK);
    }
}
