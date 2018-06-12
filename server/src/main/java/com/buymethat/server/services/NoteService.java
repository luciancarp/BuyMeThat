package com.buymethat.server.services;

import com.buymethat.db.tables.pojos.NotesTable;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.buymethat.db.tables.NotesTable.NOTES_TABLE;
@JsonSerialize
@Service
public class NoteService {
    private DSLContext dsl;

    public NoteService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public int postNote(NotesTable note) {
        return dsl
                .insertInto(NOTES_TABLE)
                .set(NOTES_TABLE.AUTHORID, note.getAuthorid())
                .set(NOTES_TABLE.AUTHORNAME, note.getAuthorname())
                .set(NOTES_TABLE.ORDERID, note.getOrderid())
                .set(NOTES_TABLE.CONTENT, note.getContent())
                .set(NOTES_TABLE.TIME, note.getTime())
                .execute();
    }

    public List<NotesTable> getOrderNotes(int orderId) {
        return dsl
                .select()
                .from(NOTES_TABLE)
                .where(NOTES_TABLE.ORDERID.eq(orderId))
                .fetch()
                .into(NotesTable.class);
    }
}
