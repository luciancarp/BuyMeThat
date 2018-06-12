package com.buymethat.server.controllers;

import com.buymethat.db.tables.pojos.UsersTable;
import com.buymethat.db.tables.pojos.OrdersTable;
import com.buymethat.server.VerifyIdentity;
import com.buymethat.server.services.AdminService;
import com.buymethat.server.services.OrderService;
import com.buymethat.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
public class AdminController {
    private final AdminService adminService;
    private final UserService usersService;
    private final OrderService orderService;

    public AdminController(AdminService adminService, UserService usersService, OrderService orderService) {
        this.adminService = adminService;
        this.usersService = usersService;
        this.orderService = orderService;
    }

    @RequestMapping(value = "/setUserType", method = RequestMethod.POST)
    public ResponseEntity<?> setUserType(@RequestBody String token, @RequestParam int newUserType, @RequestParam String userEmail) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 3) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        return new ResponseEntity<>(adminService.postUpdateUserType(userEmail, newUserType), HttpStatus.OK);
    }

    @RequestMapping(value = "/getFlaggedOrders", method = RequestMethod.POST)
    public ResponseEntity<List<OrdersTable>> getFlaggedOrders(@RequestBody String token) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if (identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 3) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        int userType = usersService.getUserType(identity.getId());
        if(userType > 0) {
            return new ResponseEntity<>(adminService.getFlaggedOrders(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/getUnapprovedUsers", method = RequestMethod.POST)
    public ResponseEntity<List<UsersTable>> getUnapprovedUsers(@RequestBody String token) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if (identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 3) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        return new ResponseEntity<>(adminService.getUnapprovedUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/getApprovedUsers", method = RequestMethod.POST)
    public ResponseEntity<List<UsersTable>> getApprovedUsers(@RequestBody String token) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if (identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 3) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        return new ResponseEntity<>(adminService.getApprovedUsers(identity.getId()), HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    public ResponseEntity<List<UsersTable>> deleteUser(@RequestBody String token, @RequestParam String userId) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if (identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 3) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        adminService.renameOrdersWhereNeeder(userId);
        adminService.renameOrdersWhereProvider(userId);
        int response = adminService.deleteUser(userId);
        if(response == 1) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
