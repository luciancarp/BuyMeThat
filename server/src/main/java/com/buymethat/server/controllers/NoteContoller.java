package com.buymethat.server.controllers;

import com.buymethat.db.tables.pojos.NotesTable;
import com.buymethat.server.Order;
import com.buymethat.server.VerifyIdentity;
import com.buymethat.server.services.NoteService;
import com.buymethat.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class NoteContoller {
    private final NoteService noteService;
    private final UserService userService;

    public NoteContoller(NoteService noteService, UserService userService) {
        this.noteService = noteService;
        this.userService = userService;
    }

    @RequestMapping(value = "/postNote", method = RequestMethod.POST)
    public ResponseEntity<?> postNote(@RequestBody String token, @RequestParam int orderId, @RequestParam String noteContent) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(userService.getUserType(identity.getId()) < 1) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm:ss yyyy/MM/dd");
        LocalDateTime now = LocalDateTime.now();
        String time = String.valueOf(dtf.format(now));

        NotesTable note = new NotesTable(1, orderId, identity.getId(), (identity.getFirstName()+" "+identity.getLastName()), time, noteContent);
        int response = noteService.postNote(note);
        if(response == 1) { return new ResponseEntity<>(HttpStatus.CREATED);
        } else{return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}
    }

    @RequestMapping(value = "/getOrderNotes", method = RequestMethod.POST)
    public ResponseEntity<List<NotesTable>> getOrderNotes(@RequestBody String token, @RequestParam int orderId) throws GeneralSecurityException, IOException {
        VerifyIdentity identity = new VerifyIdentity(token);
        if(identity.getId() == null) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}
        if(userService.getUserType(identity.getId()) < 1) {return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);}

        List<NotesTable> notes = noteService.getOrderNotes(orderId);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }
}
