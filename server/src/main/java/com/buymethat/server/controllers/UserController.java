package com.buymethat.server.controllers;

import com.buymethat.server.VerifyIdentity;
import com.buymethat.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
public class UserController {
    private final UserService usersService;

    public UserController(UserService usersService) {
        this.usersService = usersService;
    }

    @RequestMapping(value = "onLogin", method = RequestMethod.POST)
    public ResponseEntity<?> onLogin(@RequestBody String token) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        if(usersService.userIdCount(identity.getId()) == 0) {
            usersService.postNewUser(token);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "getUserType", method = RequestMethod.POST)
    public ResponseEntity<?> getUserType(@RequestBody String token) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(usersService.getUserType(identity.getId()) < 0) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        return new ResponseEntity<>(usersService.getUserType(identity.getId()),HttpStatus.OK);
    }

}
